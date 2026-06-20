/**
 * Indore City — Ward-wise Population Density & City Population Data
 * Source: Kaur, P. (2024). Population Growth and Changing Land-use
 * Patterns in Indore City. International Journal of Novel Research
 * and Development (IJNRD), 9(8).
 *
 * NOTE ON WARD DATA:
 * The source lists ward NUMBERS and ward NAMES as two separate arrays
 * per density class (Low / Low-Medium / High-Medium / High), ordered
 * together (lowest density first). They were paired positionally
 * (1st number <-> 1st name, etc.) to build per-ward records below.
 * This pairing is an INFERENCE, not an explicit mapping in the source.
 *
 * - 84 of 85 wards have a matched name + density value.
 * - Ward #25 has no name available (source lists 21 ward numbers in
 *   the High-Medium class but only 20 named wards) — its wardName
 *   and densityPerSqKm are null, but densityClass is still known.
 */

export const wards = [
  {
    "wardNumber": 1,
    "wardName": "Sirpur",
    "densityPerSqKm": 13552,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 2,
    "wardName": "Chandan Nagar",
    "densityPerSqKm": 178726,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": "Highest density ward in the city, mainly due to having the smallest area of all wards"
  },
  {
    "wardNumber": 3,
    "wardName": "Pashupati Nath",
    "densityPerSqKm": 30430,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 4,
    "wardName": "Haji Colony",
    "densityPerSqKm": 41487,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 5,
    "wardName": "Raj Nagar",
    "densityPerSqKm": 76347,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 6,
    "wardName": "Malharganj",
    "densityPerSqKm": 48183,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 7,
    "wardName": "Janta Colony",
    "densityPerSqKm": 27774,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 8,
    "wardName": "Juna Risala",
    "densityPerSqKm": 134177,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 9,
    "wardName": "Kushvah Nagar",
    "densityPerSqKm": 35856,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 10,
    "wardName": "Banganga",
    "densityPerSqKm": 66338,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 11,
    "wardName": "Bhagirathpura",
    "densityPerSqKm": 28693,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 12,
    "wardName": "Govind Colony",
    "densityPerSqKm": 61669,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 13,
    "wardName": "Sangam Nagar",
    "densityPerSqKm": 22305,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 14,
    "wardName": "Ashok Nagar",
    "densityPerSqKm": 12272,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 15,
    "wardName": "Bijasan",
    "densityPerSqKm": 1575,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 16,
    "wardName": "Nand Bagh",
    "densityPerSqKm": 6589,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 17,
    "wardName": "Sant Ravidas",
    "densityPerSqKm": 36945,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 18,
    "wardName": "Sant Kabir",
    "densityPerSqKm": 3167,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 19,
    "wardName": "Vishvakarma",
    "densityPerSqKm": 5615,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 20,
    "wardName": "Gauri Nagar",
    "densityPerSqKm": 21317,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 21,
    "wardName": "Shyam Nagar",
    "densityPerSqKm": 14103,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 22,
    "wardName": "Pandit Dindayal Upadhyay",
    "densityPerSqKm": 48625,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 23,
    "wardName": "Swargiya Rajesh Joshi",
    "densityPerSqKm": 28074,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 24,
    "wardName": "Sant Balajinath Maharaj",
    "densityPerSqKm": 47205,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 25,
    "wardName": null,
    "densityPerSqKm": null,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 26,
    "wardName": "Jeen Mata",
    "densityPerSqKm": 109868,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 27,
    "wardName": "Snehalata Ganj",
    "densityPerSqKm": 30905,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 28,
    "wardName": "Ma Tuleja Bhavani",
    "densityPerSqKm": 50531,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 29,
    "wardName": "Dr. S.P. Mukherjee",
    "densityPerSqKm": 16542,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 30,
    "wardName": "Ravji Bajar",
    "densityPerSqKm": 38023,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 31,
    "wardName": "Maharaja Chatrasal",
    "densityPerSqKm": 13607,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 32,
    "wardName": "Atal Bihari Vajpeyi",
    "densityPerSqKm": 19763,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 33,
    "wardName": "Sukhliya",
    "densityPerSqKm": 30058,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 34,
    "wardName": "Shahid Bhagat Singh",
    "densityPerSqKm": 10723,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 35,
    "wardName": "Lasudiya Mori",
    "densityPerSqKm": 2123,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 36,
    "wardName": "Nipaniya",
    "densityPerSqKm": 2588,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 37,
    "wardName": "Sai Krupa",
    "densityPerSqKm": 10550,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 38,
    "wardName": "Nanda Nagar",
    "densityPerSqKm": 47061,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 39,
    "wardName": "Nahar Shahvali",
    "densityPerSqKm": 8811,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 40,
    "wardName": "Khajrana Ganesh",
    "densityPerSqKm": 23553,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 41,
    "wardName": "Kailashpuri",
    "densityPerSqKm": 21026,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 42,
    "wardName": "Swami Vivekanand",
    "densityPerSqKm": 22794,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 43,
    "wardName": "Shri Nagar",
    "densityPerSqKm": 25607,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 44,
    "wardName": "H.I.G.",
    "densityPerSqKm": 47466,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 45,
    "wardName": "Bhim Rao Ambedkar",
    "densityPerSqKm": 67890,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 46,
    "wardName": "Somnath",
    "densityPerSqKm": 95939,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 47,
    "wardName": "Sardar Vallabhbhai Patel",
    "densityPerSqKm": 19313,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 48,
    "wardName": "Gita Bhavan",
    "densityPerSqKm": 28158,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 49,
    "wardName": "Tilak Nagar",
    "densityPerSqKm": 28336,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 50,
    "wardName": "Brajeshwari",
    "densityPerSqKm": 11640,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 51,
    "wardName": "Bhagvati Nagar",
    "densityPerSqKm": 15746,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 52,
    "wardName": "Musakhedi",
    "densityPerSqKm": 58191,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 53,
    "wardName": "Dr. Maulana Azad",
    "densityPerSqKm": 70016,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 54,
    "wardName": "Residency",
    "densityPerSqKm": 11034,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 55,
    "wardName": "Sauth Tukoganj",
    "densityPerSqKm": 9231,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 56,
    "wardName": "Imli Bajar",
    "densityPerSqKm": 31662,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 57,
    "wardName": "Devi Ahilya Bai",
    "densityPerSqKm": 16150,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 58,
    "wardName": "Loknayak Nagar",
    "densityPerSqKm": 31860,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 59,
    "wardName": "Harsiddhi",
    "densityPerSqKm": 50503,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 60,
    "wardName": "Ranipura",
    "densityPerSqKm": 62069,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 61,
    "wardName": "Tatya Sarwate",
    "densityPerSqKm": 82827,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 62,
    "wardName": "Laxman Singh Chauhan",
    "densityPerSqKm": 39832,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 63,
    "wardName": "Navlakha",
    "densityPerSqKm": 19494,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 64,
    "wardName": "Chitavad",
    "densityPerSqKm": 14361,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 65,
    "wardName": "Sant Kanwarram",
    "densityPerSqKm": 27877,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 66,
    "wardName": "Shahid Hemu Colony",
    "densityPerSqKm": 27997,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 67,
    "wardName": "Maharaja Holkar",
    "densityPerSqKm": 62634,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 68,
    "wardName": "Bambai Bajar",
    "densityPerSqKm": 118362,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 69,
    "wardName": "Sukhdev Nagar",
    "densityPerSqKm": 41094,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 70,
    "wardName": "Sudama Nagar",
    "densityPerSqKm": 33389,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 71,
    "wardName": "Dravid Nagar",
    "densityPerSqKm": 26975,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 72,
    "wardName": "Lokmanya Nagar",
    "densityPerSqKm": 27334,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 73,
    "wardName": "Jawahar Marg",
    "densityPerSqKm": 40125,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 74,
    "wardName": "Vishnupuri",
    "densityPerSqKm": 10140,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 75,
    "wardName": "Palda",
    "densityPerSqKm": 3332,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 76,
    "wardName": "Mundala Nayata",
    "densityPerSqKm": 1121,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": "Lowest density ward in the city"
  },
  {
    "wardNumber": 77,
    "wardName": "Bilawali",
    "densityPerSqKm": 1590,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 78,
    "wardName": "Choithram",
    "densityPerSqKm": 9148,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 79,
    "wardName": "Sukh Niwas",
    "densityPerSqKm": 1941,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  },
  {
    "wardNumber": 80,
    "wardName": "Dr. Rajendra Prasad",
    "densityPerSqKm": 19669,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 81,
    "wardName": "Annapurna",
    "densityPerSqKm": 25754,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 82,
    "wardName": "Vrindavan",
    "densityPerSqKm": 35040,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null
  },
  {
    "wardNumber": 83,
    "wardName": "Gumashta Nagar",
    "densityPerSqKm": 26338,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null
  },
  {
    "wardNumber": 84,
    "wardName": "Dwarkapuri",
    "densityPerSqKm": 72160,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null
  },
  {
    "wardNumber": 85,
    "wardName": "Prajapat Nagar",
    "densityPerSqKm": 13139,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null
  }
];

export const cityPopulationSummary = {
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",

  location: {
    latitude: "22°43' N",
    longitude: "76°43' E",
    altitudeMeters: 548.64
  },

  administration: {
    totalZones: 19,
    totalWards: 85,
    governanceForm: "Mayor-council"
  },

  area: {
    totalAreaSqKm: 279.78
  },

  population2021: {
    total: 3062657,
    densityPerSqKm: 10977
  },

  populationGrowthHistory: [
    { year: 1901, population: 97804, growthPercent: null },
    { year: 1911, population: 54112, growthPercent: -44.65 },
    { year: 1921, population: 105317, growthPercent: 94.52 },
    { year: 1931, population: 142524, growthPercent: 35.33 },
    { year: 1941, population: 203695, growthPercent: 42.92 },
    { year: 1951, population: 310859, growthPercent: 52.61 },
    { year: 1961, population: 394941, growthPercent: 27.05 },
    { year: 1971, population: 560937, growthPercent: 42.03 },
    { year: 1981, population: 829327, growthPercent: 47.8 },
    { year: 1991, population: 1109056, growthPercent: 33.78 },
    { year: 2001, population: 1506062, growthPercent: 35.80 },
    { year: 2011, population: 1994397, growthPercent: 32.4 },
    { year: 2021, population: 3062657, growthPercent: 53.5 }
  ],

  areaGrowthHistory: [
    { year: 1901, areaSqKm: 19.57, areaIncreasedSqKm: null, percentVariation: null },
    { year: 1931, areaSqKm: 27.27, areaIncreasedSqKm: 7.7, percentVariation: 39.34 },
    { year: 1951, areaSqKm: 55.80, areaIncreasedSqKm: 28.53, percentVariation: 104.62 },
    { year: 1973, areaSqKm: 82.60, areaIncreasedSqKm: 26.80, percentVariation: 48.02 },
    { year: 1976, areaSqKm: 113.52, areaIncreasedSqKm: 30.92, percentVariation: 37.43 },
    { year: 1982, areaSqKm: 130.17, areaIncreasedSqKm: 16.67, percentVariation: 14.68 },
    { year: 2014, areaSqKm: 279.78, areaIncreasedSqKm: 149.61, percentVariation: 114.93 }
  ],

  villagesAddedIn2014Expansion: [
    "Nipaniya", "Piplyakumar", "Kanadiya", "Tigriyarao", "Bicholi Hapsi",
    "Bicholi Mardana", "Nayata Mundala", "Palda", "Limbodi", "Bilawali",
    "Fatan Khedi", "Kailud Kartal", "Nihalpur Mundi", "Hukumakhedi",
    "Sukh Niwas", "Ahirkhedi", "Chhota Bangarda", "Tigriya Badshah",
    "Rawati", "Bedari", "Bhourasala", "Kumedi", "Bhangarh", "Shakkarkhedi",
    "Tilawali Chanda", "Aranya", "Lasudiya Mori", "Mayakhedi", "Bada Bangarda"
  ],

  landUse2021: {
    totalAreaSqKm: 279,
    categories: [
      { category: "Built-up", areaSqKm: 198, percent: 71 },
      { category: "Agriculture Land", areaSqKm: 67.5, percent: 24 },
      { category: "Water Bodies", areaSqKm: 6.7, percent: 2.4 },
      { category: "Barren Land/Rocky outcrop", areaSqKm: 3.8, percent: 1.3 },
      { category: "Forest", areaSqKm: 3.1, percent: 1.1 }
    ],
    greenSpaceShortfall: {
      areaExcludingAgricultureSqKm: 211.6,
      builtUpPercentOfNonAgriculturalArea: 94,
      openSpacePercentOfNonAgriculturalArea: 6,
      recommendedOpenSpacePercent: 20,
      recommendedOpenSpaceSqKm: 42.3,
      actualOpenSpaceSqKm: 12.6,
      shortfallSqKm: 29.7,
      guidelineSource: "The Urban Greening Guidelines, 2014"
    }
  },

  wardDensityClassSummary: [
    { class: "Low", densityRangePerSqKm: "1121-13607", totalWards: 22, note: "Outermost areas of the city; significant potential for future growth and development." },
    { class: "Low-Medium", densityRangePerSqKm: "14103-27877", totalWards: 21, note: "Between the central and middle parts of the city; includes areas near the City Museum, Mahatma Gandhi Medical Hospital, and CHL CARE Hospital, plus many wards along National Highway 47." },
    { class: "High-Medium", densityRangePerSqKm: "27997-47061", totalWards: 21, note: "Adjacent to the high-density CBD wards; well-developed in markets, hospitals, and educational institutes." },
    { class: "High", densityRangePerSqKm: "47205-178726", totalWards: 21, note: "Located in the CBD, its surroundings, and scattered across the central part of the city; home to Rajwada Bajar, Kothari Bajar, and Khajuri Bajar." }
  ],

  source: "Kaur, P. (2024). Population Growth and Changing Land-use Patterns in Indore City. International Journal of Novel Research and Development (IJNRD), 9(8)."
};