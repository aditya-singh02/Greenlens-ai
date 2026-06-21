import { wards } from "./wardDensityData.js";
import { wardWaterData } from "./waterDensityData.js";
import { wardGreeneryData } from "./indoreGreenSpaceData.js"; // ADD

const TOTAL_POPULATION_2011 = 1994397;
const TOTAL_POPULATION_2021 = 3062657;
const totalDensity = wards.reduce((sum, ward) => sum + (ward.densityPerSqKm || 0), 0);
const growthRate = Math.pow(TOTAL_POPULATION_2021 / TOTAL_POPULATION_2011, 1 / 10) - 1;

// Real max open space for risk calculation
const maxOpenSpace = Math.max(
  ...wardGreeneryData.map(w => w.totalOpenSpace_m2 || 0)
);

const COVERAGE = {
  'Low': 30, 'Low-Medium': 50, 'High-Medium': 65, 'High': 80
}

export const processedWardData = wards.map((ward) => {
  const density = ward.densityPerSqKm || 0;

  // Null density ward handle karo
  if (!density) {
    return {
      wardId: ward.wardNumber,
      wardName: `Ward ${ward.wardNumber}`,
      densityClass: ward.densityClass || 'Low-Medium',
      densityPerSqKm: 0,
      population2011: 0, population2021: 0,
      population2024: 0, population2029: 0,
      populationGrowthPercent: 0,
      perCapitaOpenSpace_m2: null,
      totalOpenSpace_m2: null,
      greenSpaceCategory: 'Unknown',
      coveragePercent: 50,
      waterGap2029: 5,
      greenRiskScore: 50,
      stressScore: 50,
      stressLevel: 'Moderate',
      vacantLand: 1.0,
      recommendedTrees: 500
    }
  }

  // Population
  const population2011 = Math.round((density / totalDensity) * TOTAL_POPULATION_2011);
  const population2021 = Math.round((density / totalDensity) * TOTAL_POPULATION_2021);
  const population2024 = Math.round(population2021 * Math.pow(1 + growthRate, 3));
  const population2029 = Math.round(population2021 * Math.pow(1 + growthRate, 8));
  const populationGrowthPercent = population2021 > 0
    ? Number((((population2029 - population2021) / population2021) * 100).toFixed(2))
    : 0;

  // Real green data
  const greenWard = wardGreeneryData.find(w => w.wardNumber === ward.wardNumber);
  const perCapitaOpenSpace = greenWard?.perCapitaOpenSpace_m2 || null;
  const totalOpenSpace = greenWard?.totalOpenSpace_m2 || null;
  const greenSpaceCategory = greenWard?.perCapitaCategory || 'Unknown';

  // Real water data
  const waterWard = wardWaterData.find(w => w.wardNumber === ward.wardNumber);
  const waterGap = waterWard?.waterByYear?.['2029']?.supplyDemandGapIMC_MLD || 5;

  // Coverage
  const coveragePercent = COVERAGE[ward.densityClass] || 50;

  // Green Risk Score — real data se
  const perCapitaRisk = perCapitaOpenSpace !== null
    ? 100 - Math.min((perCapitaOpenSpace / 50) * 100, 100)
    : 70; // fallback

  const openSpaceRisk = totalOpenSpace !== null
    ? 100 - (totalOpenSpace / maxOpenSpace) * 100
    : 70;

  const growthRisk = Math.min(populationGrowthPercent, 100);

  const greenRiskScore = Number(
    (perCapitaRisk * 0.5 + openSpaceRisk * 0.2 + growthRisk * 0.3).toFixed(2)
  );

  // Final stress score — green + water + population
  const stressScore = Math.round(
    greenRiskScore * 0.5 +
    Math.min(waterGap * 10, 100) * 0.3 +
    growthRisk * 0.2
  );

  const stressLevel = stressScore > 65 ? 'Critical' :
    stressScore > 40 ? 'Moderate' : 'Stable';

  // Vacant land — outskirt wards mein zyada
  const vacantLand = ward.densityClass === 'Low' ? 2.5 :
    ward.densityClass === 'Low-Medium' ? 1.8 :
      ward.densityClass === 'High-Medium' ? 1.0 : 0.5;

  return {
    wardId: ward.wardNumber,
    wardName: ward.wardName || `Ward ${ward.wardNumber}`,
    densityClass: ward.densityClass,
    densityPerSqKm: ward.densityPerSqKm,
    population2011,
    population2021,
    population2024,
    population2029,
    populationGrowthPercent,
    // Real green data
    perCapitaOpenSpace_m2: perCapitaOpenSpace,
    totalOpenSpace_m2: totalOpenSpace,
    greenSpaceCategory,
    // Real water data
    waterGap2029: waterGap,
    coveragePercent,
    // Scores
    greenRiskScore,
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
  totalTrees: processedWardData.reduce((s, w) => s + w.recommendedTrees, 0),
  wardsBelowURDPFI: wardGreeneryData.filter(
    w => w.perCapitaOpenSpace_m2 !== null && w.perCapitaOpenSpace_m2 < 12
  ).length
}