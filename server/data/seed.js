import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Ward from '../models/Ward.model.js'
import { processedWardData } from './processedWardData.js'

await mongoose.connect(process.env.MONGODB_URI)
await Ward.deleteMany()
await Ward.insertMany(processedWardData)
console.log(`✅ Seeded ${processedWardData.length} wards`)
process.exit()