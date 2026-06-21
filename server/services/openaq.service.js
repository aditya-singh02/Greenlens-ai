import axios from 'axios'

const INDORE_CENTER = { lat: 22.7196, lon: 75.8577 }
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 min — AQI itni jaldi nahi badalta, station bhi rate-limited hai

let cache = { data: null, fetchedAt: 0 }

// CPCB sub-index breakpoints for PM2.5 (24hr avg, µg/m³) — yehi formula AQI apps use karte hain
const PM25_BREAKPOINTS = [
    { cLo: 0, cHi: 30, iLo: 0, iHi: 50 },
    { cLo: 31, cHi: 60, iLo: 51, iHi: 100 },
    { cLo: 61, cHi: 90, iLo: 101, iHi: 200 },
    { cLo: 91, cHi: 120, iLo: 201, iHi: 300 },
    { cLo: 121, cHi: 250, iLo: 301, iHi: 400 },
    { cLo: 251, cHi: 380, iLo: 401, iHi: 500 },
]

function pm25ToAqi(pm25) {
    const bp = PM25_BREAKPOINTS.find(b => pm25 >= b.cLo && pm25 <= b.cHi)
        || PM25_BREAKPOINTS[PM25_BREAKPOINTS.length - 1]
    const aqi = ((bp.iHi - bp.iLo) / (bp.cHi - bp.cLo)) * (pm25 - bp.cLo) + bp.iLo
    return Math.round(aqi)
}

function categoryFor(aqi) {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Satisfactory'
    if (aqi <= 200) return 'Moderate'
    if (aqi <= 300) return 'Poor'
    if (aqi <= 400) return 'Very Poor'
    return 'Severe'
}

export const getIndoreAQI = async () => {
    if (cache.data && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
        return cache.data
    }

    // 1. Find real OpenAQ stations within 25km of Indore center (max radius allowed)
    const locRes = await axios.get('https://api.openaq.org/v3/locations', {
        headers: { 'X-API-Key': process.env.OPENAQ_API_KEY },
        params: { coordinates: `${INDORE_CENTER.lat},${INDORE_CENTER.lon}`, radius: 25000, limit: 10 },
    })

    const stations = locRes.data?.results || []
    if (!stations.length) throw new Error('No OpenAQ stations found near Indore')

    // 2. Pull latest PM2.5 reading from each station's sensors, average across stations
    const readings = []
    for (const station of stations) {
        const pm25Sensor = station.sensors?.find(s => s.parameter?.name === 'pm25')
        if (!pm25Sensor) continue
        try {
            const latestRes = await axios.get(
                `https://api.openaq.org/v3/locations/${station.id}/latest`,
                { headers: { 'X-API-Key': process.env.OPENAQ_API_KEY } }
            )
            const reading = latestRes.data?.results?.find(r => r.sensorsId === pm25Sensor.id)
            if (reading?.value != null) readings.push(reading.value)
        } catch {
            continue // ek station fail ho to baaki se kaam chala lo
        }
    }

    if (!readings.length) throw new Error('No live PM2.5 readings available right now')

    const avgPm25 = readings.reduce((a, b) => a + b, 0) / readings.length
    const aqi = pm25ToAqi(avgPm25)

    cache = {
        data: {
            aqi,
            category: categoryFor(aqi),
            pm25: Number(avgPm25.toFixed(1)),
            stationsUsed: readings.length,
            scope: 'city-wide', // important: yeh ward-specific nahi hai
            updatedAt: new Date().toISOString(),
        },
        fetchedAt: Date.now(),
    }
    return cache.data
}