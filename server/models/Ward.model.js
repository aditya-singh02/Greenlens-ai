import mongoose from 'mongoose'

const wardSchema = new mongoose.Schema({
    wardId: Number,
    wardName: String,
    densityClass: String,
    densityPerSqKm: Number,
    population2021: Number,
    population2029: Number,
    populationGrowthPercent: Number,
    greenCover: Number,
    coveragePercent: Number,
    waterGap2029: Number,
    stressScore: Number,
    stressLevel: String,
    vacantLand: Number,
    recommendedTrees: Number
})

export default mongoose.model('Ward', wardSchema)