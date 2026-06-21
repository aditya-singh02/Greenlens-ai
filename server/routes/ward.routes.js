import express from 'express'
import { getAllWards, getWardById } from '../controllers/ward.controller.js'
import { getRecommendation } from '../controllers/recommend.controller.js'

const router = express.Router()

router.get('/wards', getAllWards)
router.get('/ward/:id', getWardById)
router.get('/recommend/:id', getRecommendation)

export default router