import axios from 'axios'
import Ward from '../models/Ward.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import { generateRecommendation } from '../services/gemini.service.js'

export const getRecommendation = asyncHandler(async (req, res) => {
    const ward = await Ward.findOne({ wardId: Number(req.params.id) })
    if (!ward) throw new ApiError(404, 'Ward not found')
    const prompt = `You are an urban sustainability expert for Indore city, India, writing a short PREDICTIVE action plan for "GreenLens AI" — a platform that flags environmental stress BEFORE it becomes a crisis, not after.

Ward: ${ward.wardName} (Ward ID ${ward.wardId})
Current Stress Level: ${ward.stressLevel} (score: ${ward.stressScore}/100)

PREDICTED TRAJECTORY (2024 → 2029):
- Population: growing ${ward.populationGrowthPercent}% → ${ward.population2029} people by 2029
- Per capita open space TODAY: ${ward.perCapitaOpenSpace_m2} m²/person (URDPFI standard: 12 m², WHO minimum: 9 m²) — category: ${ward.greenSpaceCategory}, risk score ${ward.greenRiskScore}/100
- Water supply gap projected for 2029: ${ward.waterGap2029} MLD (current piped coverage: ${ward.coveragePercent}%)
- Vacant land still available right now (won't stay vacant as population grows): ${ward.vacantLand} hectares
- Trees this ward needs, calculated from available land: ${ward.recommendedTrees} (use this exact number, never recalculate it)

Your job: explain what happens to THIS ward by 2029 if nothing changes, and what must be done NOW — while land is still vacant and the gap is still closeable — to prevent it. Write exactly 3 points:

1. 🌳 Trees (act before land disappears): State "${ward.recommendedTrees} trees" exactly, recommend the 2 best species from Neem, Peepal, Banyan, Arjun, Gulmohar for Indore's climate, and note that this vacant land won't stay available as the ward grows ${ward.populationGrowthPercent}% by 2029 — planting now is the only window.
2. 💧 Water (close the gap before it widens): one priority conservation action sized to the projected ${ward.waterGap2029} MLD 2029 gap and current ${ward.coveragePercent}% coverage — frame it as preventing a future shortage, not fixing a current one.
3. 🏛️ IMC/NGO (intervene before crisis, not after): one specific next step for IMC and/or an NGO to act on the ${ward.vacantLand} hectares now, before rising density (${ward.populationGrowthPercent}% growth) forecloses the option.

Rules:
- Always frame this as preventing a 2029 outcome, not describing a 2024 problem — use words like "by 2029", "before", "will face" rather than past/present-only framing.
- Never invent the tree count — always use ${ward.recommendedTrees} exactly.
- Use the actual numbers given, no vague words like "significant" or "many".
- Be concise: 2-3 sentences per point, no preamble, no markdown headers — just the 3 numbered points.`

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
