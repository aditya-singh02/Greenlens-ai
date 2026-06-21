export const calculateGreenRiskScore = ({
  totalOpenSpace_m2,
  perCapitaOpenSpace_m2,
  populationGrowthPercent,
  maxOpenSpace
}) => {

  const perCapitaRisk =
    100 -
    Math.min(
      (
        perCapitaOpenSpace_m2 / 50
      ) * 100,
      100
    );

  const openSpaceRisk =
    100 -
    (
      totalOpenSpace_m2 /
      maxOpenSpace
    ) * 100;

  const growthRisk =
    Math.min(
      populationGrowthPercent,
      100
    );

  const score =
    (
      perCapitaRisk * 0.5 +
      openSpaceRisk * 0.2 +
      growthRisk * 0.3
    );

  return Number(
    score.toFixed(2)
  );
};