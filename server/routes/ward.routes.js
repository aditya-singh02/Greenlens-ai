import express from 'express'
import { getAllWards, getWardById, getCityAQI } from '../controllers/ward.controller.js'
import { getRecommendation } from '../controllers/recommend.controller.js'

const router = express.Router()

router.get('/wards', getAllWards)
router.get('/ward/:id', getWardById)
router.get('/recommend/:id', getRecommendation)
router.get('/aqi', getCityAQI)

export default router