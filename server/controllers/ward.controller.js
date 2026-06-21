import Ward from '../models/Ward.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import {getIndoreAQI} from '../services/openaq.service.js'

// GET /api/wards — sabhi wards
export const getAllWards = asyncHandler(async (req, res) => {
    const wards = await Ward.find().select(
        'wardId wardName densityClass stressLevel stressScore greenCover population2029'
    )
    return res.json(new ApiResponse(200, wards, 'Wards fetched'))
})

// GET /api/ward/:id — ek ward detail
export const getWardById = asyncHandler(async (req, res) => {
    const ward = await Ward.findOne({ wardId: Number(req.params.id) })
    if (!ward) throw new ApiError(404, 'Ward not found')
    return res.json(new ApiResponse(200, ward, 'Ward fetched'))
})

export const getCityAQI = asyncHandler(async (req, res) => {
    const aqi = await getIndoreAQI()
    return res.json(new ApiResponse(200, aqi, 'City AQI fetched'))
})

