import { wards } from "./wardDensityData.js";
import { wardWaterData } from "./waterDensityData.js";

const TOTAL_POPULATION_2011 = 1994397;
const TOTAL_POPULATION_2021 = 3062657;

const totalDensity = wards.reduce(
  (sum, ward) => sum + (ward.densityPerSqKm || 0),
  0
);

const growthRate =
  Math.pow(
    TOTAL_POPULATION_2021 / TOTAL_POPULATION_2011,
    1 / 10
  ) - 1;

const GREEN = { 'Low': 18, 'Low-Medium': 10, 'High-Medium': 6, 'High': 3 }
const COVERAGE = { 'Low': 30, 'Low-Medium': 50, 'High-Medium': 65, 'High': 80 }
const VACANT = { 'Low': 2.5, 'Low-Medium': 1.8, 'High-Medium': 1.0, 'High': 0.5 }


export const processedWardData = wards.map((ward) => {
  const density = ward.densityPerSqKm || 0;

  if (!density || density === 0) {
    return {
      wardId: ward.wardNumber,
      wardName: ward.wardName || `Ward ${ward.wardNumber}`,
      densityPerSqKm: 0,
      densityClass: ward.densityClass || 'Low-Medium',
      population2011: 0,
      population2021: 0,
      population2024: 0,
      population2029: 0,
      populationGrowthPercent: 0,
      greenCover: 10,
      coveragePercent: 50,
      waterGap2029: 5,
      stressScore: 45,
      stressLevel: 'Moderate',
      vacantLand: 1.0,
      recommendedTrees: 500
    }
  }


  const population2011 = Math.round(
    (density / totalDensity) *
      TOTAL_POPULATION_2011
  );

  const population2021 = Math.round(
    (density / totalDensity) *
      TOTAL_POPULATION_2021
  );

  const population2024 = Math.round(
    population2021 *
      Math.pow(1 + growthRate, 3)
  );

  const population2029 = Math.round(
    population2021 *
      Math.pow(1 + growthRate, 8)
  );

  const populationGrowthPercent = population2021 > 0
    ? Number((((population2029 - population2021) / population2021) * 100).toFixed(2))
    : 0 

  const waterWard = wardWaterData.find(w => w.wardNumber === ward.wardNumber)
  const waterGap = waterWard?.waterByYear?.['2029']?.supplyDemandGapIMC_MLD || 5
  const greenCover = GREEN[ward.densityClass] || 10
  const coveragePercent = COVERAGE[ward.densityClass] || 50
  const vacantLand = VACANT[ward.densityClass] || 1

  const stressScore = Math.round(
    (populationGrowthPercent / 100) * 40 +
    (100 - greenCover) * 0.3 +
    (100 - coveragePercent) * 0.3
  )
  
  const stressLevel = stressScore > 65 ? 'Critical' : stressScore > 40 ? 'Moderate' : 'Stable'

  return {
    wardId: ward.wardNumber,

    wardName:
      ward.wardName || `Ward ${ward.wardNumber}`,

    densityPerSqKm:
      ward.densityPerSqKm,

    densityClass:
      ward.densityClass,

    population2011,

    population2021,

    population2024,

    population2029,

    populationGrowthPercent,

    greenCover,
    coveragePercent,
    waterGap2029: waterGap,
    stressScore,
    stressLevel,
    vacantLand,
    recommendedTrees: Math.round(vacantLand * 500)
  };
});

export const citySummary = {
  totalWards: processedWardData.length,
  criticalWards: processedWardData.filter(w => w.stressLevel === 'Critical').length,
  moderateWards: processedWardData.filter(w => w.stressLevel === 'Moderate').length,
  stableWards: processedWardData.filter(w => w.stressLevel === 'Stable').length,
  totalTrees: processedWardData.reduce((s, w) => s + w.recommendedTrees, 0)
}