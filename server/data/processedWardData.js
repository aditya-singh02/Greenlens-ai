import { wards } from "./wards.js";

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

export const processedWardData = wards.map((ward) => {
  const density = ward.densityPerSqKm || 0;

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

  const populationGrowthPercent = Number(
    (
      ((population2029 - population2021) /
        population2021) *
      100
    ).toFixed(2)
  );

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

    populationGrowthPercent
  };
});