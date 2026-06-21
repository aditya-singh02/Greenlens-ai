import axios from 'axios'
import Ward from '../models/Ward.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import { generateRecommendation } from '../services/gemini.service.js'

export const getRecommendation = asyncHandler(async (req, res) => {
    const ward = await Ward.findOne({ wardId: Number(req.params.id) })
    if (!ward) throw new ApiError(404, 'Ward not found')

    const prompt = `You are an urban sustainability expert for Indore city, India.

Ward: ${ward.wardName}
Stress Level: ${ward.stressLevel}
Population 2029: ${ward.population2029}
Population growth: ${ward.populationGrowthPercent}%

GREEN SPACE (Real GIS Data):
- Per capita open space: ${ward.perCapitaOpenSpace_m2} m²/person
- URDPFI standard: 12 m²/person (WHO minimum: 9 m²/person)
- Green space category: ${ward.greenSpaceCategory}
- Green risk score: ${ward.greenRiskScore}/100

WATER DATA:
- Water supply gap 2029: ${ward.waterGap2029} MLD
- Piped coverage: ${ward.coveragePercent}%

Vacant land: ${ward.vacantLand} hectares

Give exactly 3 specific actions:
1. 🌳 Trees: exact count + best 2 species for Indore (Neem, Peepal, Banyan, Arjun, Gulmohar)
2. 💧 Water: one priority conservation action
3. 🏛️ IMC/NGO: one specific recommendation

Be concise and data-driven.`

    const recommendation = await generateRecommendation(prompt)
    return res
    .json(
        new ApiResponse(
            200, 
            { recommendation, ward }, 
            'Done'
        ))
   }
)
