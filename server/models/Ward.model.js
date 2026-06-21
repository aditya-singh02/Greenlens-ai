import mongoose from 'mongoose'

const wardSchema = new mongoose.Schema({
    wardId: Number,
    wardName: String,
    densityClass: String,
    densityPerSqKm: Number,
    population2011: Number,
    population2021: Number,
    population2024: Number,
    population2029: Number,
    populationGrowthPercent: Number,
    // Real green fields
    perCapitaOpenSpace_m2: Number,
    totalOpenSpace_m2: Number,
    greenSpaceCategory: String,
    // Water
    waterGap2029: Number,
    coveragePercent: Number,
    // Scores
    greenRiskScore: Number,
    stressScore: Number,
    stressLevel: String,
    vacantLand: Number,
    recommendedTrees: Number
})

export default mongoose.model('Ward', wardSchema)