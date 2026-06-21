const calculateYearRisk = (
  yearData,
  basePopulation
) => {

  const coverageRisk =
    100 - yearData.coveragePercent;

  const gapRisk =
    (
      yearData.supplyDemandGapIMC_MLD /
      yearData.totalDemandIMC_MLD
    ) * 100;

  const growthRisk =
    Math.min(
      (
        (
          yearData.estimatedPopulation -
          basePopulation
        ) /
        basePopulation
      ) * 100,
      100
    );

  const score =
    (
      coverageRisk * 0.2 +
      gapRisk * 0.5 +
      growthRisk * 0.3
    );

  return Number(score.toFixed(2));
};

export const calculateWaterRiskScores = (
  waterByYear
) => {

  if (!waterByYear || !waterByYear["2011"]) {
    return null;
  }

  const basePopulation =
    waterByYear["2011"].estimatedPopulation;

  return {

    2011: calculateYearRisk(
      waterByYear["2011"],
      basePopulation
    ),

    2021: calculateYearRisk(
      waterByYear["2021"],
      basePopulation
    ),

    2024: calculateYearRisk(
      waterByYear["2024"],
      basePopulation
    ),

    2029: calculateYearRisk(
      waterByYear["2029"],
      basePopulation
    )

  };
};
