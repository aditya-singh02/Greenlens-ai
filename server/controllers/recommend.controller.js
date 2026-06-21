import axios from 'axios'
import Ward from '../models/Ward.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getRecommendation = asyncHandler(async (req, res) => {
    const ward = await Ward.findOne({ wardId: Number(req.params.id) })
    if (!ward) throw new ApiError(404, 'Ward not found')

    const prompt = `You are an urban sustainability expert for Indore, India.

Ward: ${ward.wardName} | Stress: ${ward.stressLevel}
Population 2029: ${ward.population2029} | Growth: ${ward.populationGrowthPercent}%
Green Cover: ${ward.greenCover}% | Vacant Land: ${ward.vacantLand} ha
Water Gap 2029: ${ward.waterGap2029} MLD | Coverage: ${ward.coveragePercent}%

Give EXACTLY 3 action points (short, specific):
1. 🌳 Trees: exact number + best 2 species for Indore climate
2. 💧 Water: one priority conservation action
3. 🏛️ Action: one recommendation for IMC or local NGO`

    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
    )

    const text = response.data.candidates[0].content.parts[0].text
    return res.json(new ApiResponse(200, { recommendation: text, ward }, 'Done'))
})