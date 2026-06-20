/**
 * Indore City — Ward-wise Water Supply & Demand Estimates
 * (2011 / 2021 / 2024 / 2029)
 * ---------------------------------------------------------------
 * Sources:
 * 1. Kaur, P. (2024). Population Growth and Changing Land-use
 *    Patterns in Indore City. IJNRD, 9(8). [ward density, population]
 * 2. City water profile (IMC / CPHEEO / CPCB figures, ~2008-09
 *    baseline) — city-wide water supply, demand, leakage, coverage.
 *
 * ====================== READ THIS FIRST ======================
 * THIS IS A MODELED / ESTIMATED DATASET, NOT MEASURED DATA.
 * Neither source contains ward-wise water supply or demand figures.
 * Only CITY-WIDE water totals exist. Everything ward-level below is
 * derived using the assumptions documented here. If you obtain real
 * IMC ward-wise water records, replace this file with that data.
 *
 * ESTIMATION METHOD:
 *
 * 1. WARD POPULATION (2021 baseline)
 *    Source gives per-ward DENSITY (people/sq km) for 84 of 85 wards,
 *    but not ward AREA or ward POPULATION directly, and not for ward
 *    #25 (density backfilled using its density-class average).
 *    Since individual ward areas aren't available, ward population
 *    is estimated by assuming roughly equal ward areas and splitting
 *    the city's known 2021 total population (3,062,657) in proportion
 *    to each ward's density:
 *        wardPopulation = (wardDensity / sum(allWardDensities)) × cityPopulation2021
 *    This reproduces the city total exactly but will understate
 *    population in physically large wards and overstate it in small
 *    ones if their areas differ a lot from the city average.
 *
 * 2. WARD POPULATION (2011 / 2024 / 2029)
 *    Each ward's 2021 share of city population is held constant, and
 *    applied to the city-wide population in other years:
 *      - 2011 actual city population: 1,994,397 (census)
 *      - CAGR 2011→2021 computed from census figures: ≈4.38%/yr
 *        (reproduces the source's reported 53.5% decadal growth)
 *      - 2024 and 2029 city population projected forward from 2021
 *        using this same CAGR (compounding)
 *    This assumes every ward grows at the SAME rate as the city
 *    average — in reality, fringe/low-density wards (recently annexed
 *    villages) are growing faster than core CBD wards, so this likely
 *    UNDERSTATES growth in Low-density wards and OVERSTATES it in
 *    High-density wards.
 *
 * 3. PER-WARD WATER SUPPLY (LPCD — litres per capita per day)
 *    The source's city-wide actual field-surveyed supply is 87 LPCD
 *    (after accounting for the real-world 35% leakage rate), with
 *    only 54% of the city's population having piped water access at
 *    all, and explicit documentation that "city fringes, mostly
 *    poorer areas" are excluded from the main Narmada pipeline.
 *    To reflect this documented inequality, each ward's density CLASS
 *    is given a different per-capita supply (LPCD) and piped-water
 *    coverage %, scaled so the population-weighted city average
 *    still equals 87 LPCD:
 *        Low          → 38.8 LPCD, 30% coverage  (fringe/outermost)
 *        Low-Medium   → 59.9 LPCD, 50% coverage  (transitional)
 *        High-Medium  → 81.1 LPCD, 65% coverage  (established)
 *        High         → 102.2 LPCD, 80% coverage (CBD core)
 *    These multipliers and coverage percentages are this analysis's
 *    own estimates, not figures from either source. They are a
 *    reasonable, directionally-correct way to distribute the known
 *    citywide inequality, but the exact split is not verified.
 *    The same LPCD/coverage figures are applied across all 4 years
 *    (i.e. this model does NOT assume infrastructure improves over
 *    time — supply per person in a given ward class stays flat,
 *    so the gap grows as population grows. If you have real
 *    augmentation project timelines — e.g. Narmada Phase III — apply
 *    those manually to adjust LPCD upward in later years).
 *
 * 4. PER-WARD WATER DEMAND
 *    Two standard per-capita demand norms are applied uniformly to
 *    every ward (these are official benchmarks, not ward-specific
 *    estimates):
 *        IMC norm:     135 LPCD
 *        CPHEEO norm:  175 LPCD (national urban water supply standard)
 *    totalDemandMLD = norm_LPCD × wardPopulation / 1,000,000
 *
 * 5. SUPPLY-DEMAND GAP
 *    supplyDemandGapMLD = totalDemandMLD − totalSupplyMLD
 *    (positive = shortfall, negative = surplus)
 *
 * VALIDATION: City-wide totals from this model were checked against
 * the source's known 2008-09 baseline (204 MLD supplied, 243 MLD IMC
 * demand) and 2011 CPHEEO demand projection (394 MLD) — this model's
 * 2011 figures (≈173 MLD supply, ≈349 MLD CPHEEO demand) land in a
 * plausible range given the population was still below 2011 levels
 * pre-2008. This is a plausibility check, not a precision guarantee.
 * ================================================================
 */

// ---------------------------------------------------------------
// 1. WARD-WISE WATER SUPPLY & DEMAND BY YEAR (2011/2021/2024/2029)
// ---------------------------------------------------------------
export const wardWaterData = [
  {
    "wardNumber": 1,
    "wardName": "Sirpur",
    "densityPerSqKm": 13552,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 9173,
        "populationServedPipedWater": 2752,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.356,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.238,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.605,
        "supplyDemandGapIMC_MLD": 0.882,
        "supplyDemandGapCPHEEO_MLD": 1.249
      },
      "2021": {
        "estimatedPopulation": 14087,
        "populationServedPipedWater": 4226,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.547,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.902,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.465,
        "supplyDemandGapIMC_MLD": 1.355,
        "supplyDemandGapCPHEEO_MLD": 1.918
      },
      "2024": {
        "estimatedPopulation": 16022,
        "populationServedPipedWater": 4807,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.622,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.163,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.804,
        "supplyDemandGapIMC_MLD": 1.541,
        "supplyDemandGapCPHEEO_MLD": 2.182
      },
      "2029": {
        "estimatedPopulation": 19854,
        "populationServedPipedWater": 5956,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.77,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.68,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.474,
        "supplyDemandGapIMC_MLD": 1.91,
        "supplyDemandGapCPHEEO_MLD": 2.704
      }
    }
  },
  {
    "wardNumber": 2,
    "wardName": "Chandan Nagar",
    "densityPerSqKm": 178726,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": "Highest density ward in the city, mainly due to having the smallest area of all wards",
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 120983,
        "populationServedPipedWater": 96786,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 12.364,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 16.333,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 21.172,
        "supplyDemandGapIMC_MLD": 3.969,
        "supplyDemandGapCPHEEO_MLD": 8.808
      },
      "2021": {
        "estimatedPopulation": 185785,
        "populationServedPipedWater": 148628,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 18.987,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 25.081,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 32.512,
        "supplyDemandGapIMC_MLD": 6.094,
        "supplyDemandGapCPHEEO_MLD": 13.525
      },
      "2024": {
        "estimatedPopulation": 211299,
        "populationServedPipedWater": 169039,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 21.595,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 28.525,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 36.977,
        "supplyDemandGapIMC_MLD": 6.93,
        "supplyDemandGapCPHEEO_MLD": 15.382
      },
      "2029": {
        "estimatedPopulation": 261842,
        "populationServedPipedWater": 209474,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 26.76,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 35.349,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 45.822,
        "supplyDemandGapIMC_MLD": 8.589,
        "supplyDemandGapCPHEEO_MLD": 19.062
      }
    }
  },
  {
    "wardNumber": 3,
    "wardName": "Pashupati Nath",
    "densityPerSqKm": 30430,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 20599,
        "populationServedPipedWater": 13389,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.671,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.781,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.605,
        "supplyDemandGapIMC_MLD": 1.11,
        "supplyDemandGapCPHEEO_MLD": 1.934
      },
      "2021": {
        "estimatedPopulation": 31632,
        "populationServedPipedWater": 20561,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.565,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.27,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.536,
        "supplyDemandGapIMC_MLD": 1.705,
        "supplyDemandGapCPHEEO_MLD": 2.971
      },
      "2024": {
        "estimatedPopulation": 35976,
        "populationServedPipedWater": 23384,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.918,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.857,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.296,
        "supplyDemandGapIMC_MLD": 1.939,
        "supplyDemandGapCPHEEO_MLD": 3.378
      },
      "2029": {
        "estimatedPopulation": 44582,
        "populationServedPipedWater": 28978,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.616,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.019,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.802,
        "supplyDemandGapIMC_MLD": 2.403,
        "supplyDemandGapCPHEEO_MLD": 4.186
      }
    }
  },
  {
    "wardNumber": 4,
    "wardName": "Haji Colony",
    "densityPerSqKm": 41487,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 28084,
        "populationServedPipedWater": 18255,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.278,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.791,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.915,
        "supplyDemandGapIMC_MLD": 1.513,
        "supplyDemandGapCPHEEO_MLD": 2.637
      },
      "2021": {
        "estimatedPopulation": 43126,
        "populationServedPipedWater": 28032,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.498,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.822,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.547,
        "supplyDemandGapIMC_MLD": 2.324,
        "supplyDemandGapCPHEEO_MLD": 4.049
      },
      "2024": {
        "estimatedPopulation": 49048,
        "populationServedPipedWater": 31881,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.978,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.621,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.583,
        "supplyDemandGapIMC_MLD": 2.643,
        "supplyDemandGapCPHEEO_MLD": 4.605
      },
      "2029": {
        "estimatedPopulation": 60781,
        "populationServedPipedWater": 39508,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.929,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.205,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.637,
        "supplyDemandGapIMC_MLD": 3.276,
        "supplyDemandGapCPHEEO_MLD": 5.708
      }
    }
  },
  {
    "wardNumber": 5,
    "wardName": "Raj Nagar",
    "densityPerSqKm": 76347,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 51681,
        "populationServedPipedWater": 41345,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.282,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.977,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.044,
        "supplyDemandGapIMC_MLD": 1.695,
        "supplyDemandGapCPHEEO_MLD": 3.762
      },
      "2021": {
        "estimatedPopulation": 79363,
        "populationServedPipedWater": 63490,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.111,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.714,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 13.889,
        "supplyDemandGapIMC_MLD": 2.603,
        "supplyDemandGapCPHEEO_MLD": 5.778
      },
      "2024": {
        "estimatedPopulation": 90262,
        "populationServedPipedWater": 72210,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.225,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 12.185,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 15.796,
        "supplyDemandGapIMC_MLD": 2.96,
        "supplyDemandGapCPHEEO_MLD": 6.571
      },
      "2029": {
        "estimatedPopulation": 111853,
        "populationServedPipedWater": 89482,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 11.431,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 15.1,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 19.574,
        "supplyDemandGapIMC_MLD": 3.669,
        "supplyDemandGapCPHEEO_MLD": 8.143
      }
    }
  },
  {
    "wardNumber": 6,
    "wardName": "Malharganj",
    "densityPerSqKm": 48183,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 32616,
        "populationServedPipedWater": 26093,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.333,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.403,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.708,
        "supplyDemandGapIMC_MLD": 1.07,
        "supplyDemandGapCPHEEO_MLD": 2.375
      },
      "2021": {
        "estimatedPopulation": 50086,
        "populationServedPipedWater": 40069,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.119,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.762,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.765,
        "supplyDemandGapIMC_MLD": 1.643,
        "supplyDemandGapCPHEEO_MLD": 3.646
      },
      "2024": {
        "estimatedPopulation": 56964,
        "populationServedPipedWater": 45571,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.822,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.69,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.969,
        "supplyDemandGapIMC_MLD": 1.868,
        "supplyDemandGapCPHEEO_MLD": 4.147
      },
      "2029": {
        "estimatedPopulation": 70590,
        "populationServedPipedWater": 56472,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.214,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.53,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.353,
        "supplyDemandGapIMC_MLD": 2.316,
        "supplyDemandGapCPHEEO_MLD": 5.139
      }
    }
  },
  {
    "wardNumber": 7,
    "wardName": "Janta Colony",
    "densityPerSqKm": 27774,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 18801,
        "populationServedPipedWater": 9400,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.126,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.538,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.29,
        "supplyDemandGapIMC_MLD": 1.412,
        "supplyDemandGapCPHEEO_MLD": 2.164
      },
      "2021": {
        "estimatedPopulation": 28871,
        "populationServedPipedWater": 14436,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.729,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.898,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.052,
        "supplyDemandGapIMC_MLD": 2.169,
        "supplyDemandGapCPHEEO_MLD": 3.323
      },
      "2024": {
        "estimatedPopulation": 32836,
        "populationServedPipedWater": 16418,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.967,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.433,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.746,
        "supplyDemandGapIMC_MLD": 2.466,
        "supplyDemandGapCPHEEO_MLD": 3.779
      },
      "2029": {
        "estimatedPopulation": 40690,
        "populationServedPipedWater": 20345,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.437,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.493,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.121,
        "supplyDemandGapIMC_MLD": 3.056,
        "supplyDemandGapCPHEEO_MLD": 4.684
      }
    }
  },
  {
    "wardNumber": 8,
    "wardName": "Juna Risala",
    "densityPerSqKm": 134177,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 90827,
        "populationServedPipedWater": 72662,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.283,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 12.262,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 15.895,
        "supplyDemandGapIMC_MLD": 2.979,
        "supplyDemandGapCPHEEO_MLD": 6.612
      },
      "2021": {
        "estimatedPopulation": 139477,
        "populationServedPipedWater": 111582,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 14.255,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 18.829,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 24.408,
        "supplyDemandGapIMC_MLD": 4.574,
        "supplyDemandGapCPHEEO_MLD": 10.153
      },
      "2024": {
        "estimatedPopulation": 158631,
        "populationServedPipedWater": 126905,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 16.212,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 21.415,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 27.76,
        "supplyDemandGapIMC_MLD": 5.203,
        "supplyDemandGapCPHEEO_MLD": 11.548
      },
      "2029": {
        "estimatedPopulation": 196577,
        "populationServedPipedWater": 157262,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 20.09,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 26.538,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 34.401,
        "supplyDemandGapIMC_MLD": 6.448,
        "supplyDemandGapCPHEEO_MLD": 14.311
      }
    }
  },
  {
    "wardNumber": 9,
    "wardName": "Kushvah Nagar",
    "densityPerSqKm": 35856,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 24271,
        "populationServedPipedWater": 15776,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.968,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.277,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.247,
        "supplyDemandGapIMC_MLD": 1.309,
        "supplyDemandGapCPHEEO_MLD": 2.279
      },
      "2021": {
        "estimatedPopulation": 37272,
        "populationServedPipedWater": 24227,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.023,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.032,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.523,
        "supplyDemandGapIMC_MLD": 2.009,
        "supplyDemandGapCPHEEO_MLD": 3.5
      },
      "2024": {
        "estimatedPopulation": 42391,
        "populationServedPipedWater": 27554,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.438,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.723,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.418,
        "supplyDemandGapIMC_MLD": 2.285,
        "supplyDemandGapCPHEEO_MLD": 3.98
      },
      "2029": {
        "estimatedPopulation": 52531,
        "populationServedPipedWater": 34145,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.26,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.092,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.193,
        "supplyDemandGapIMC_MLD": 2.832,
        "supplyDemandGapCPHEEO_MLD": 4.933
      }
    }
  },
  {
    "wardNumber": 10,
    "wardName": "Banganga",
    "densityPerSqKm": 66338,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 44905,
        "populationServedPipedWater": 35924,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.589,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.062,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.858,
        "supplyDemandGapIMC_MLD": 1.473,
        "supplyDemandGapCPHEEO_MLD": 3.269
      },
      "2021": {
        "estimatedPopulation": 68958,
        "populationServedPipedWater": 55166,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.048,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.309,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.068,
        "supplyDemandGapIMC_MLD": 2.261,
        "supplyDemandGapCPHEEO_MLD": 5.02
      },
      "2024": {
        "estimatedPopulation": 78428,
        "populationServedPipedWater": 62742,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.015,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.588,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 13.725,
        "supplyDemandGapIMC_MLD": 2.573,
        "supplyDemandGapCPHEEO_MLD": 5.71
      },
      "2029": {
        "estimatedPopulation": 97188,
        "populationServedPipedWater": 77750,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.933,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 13.12,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 17.008,
        "supplyDemandGapIMC_MLD": 3.187,
        "supplyDemandGapCPHEEO_MLD": 7.075
      }
    }
  },
  {
    "wardNumber": 11,
    "wardName": "Bhagirathpura",
    "densityPerSqKm": 28693,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 19423,
        "populationServedPipedWater": 12625,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.575,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.622,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.399,
        "supplyDemandGapIMC_MLD": 1.047,
        "supplyDemandGapCPHEEO_MLD": 1.824
      },
      "2021": {
        "estimatedPopulation": 29826,
        "populationServedPipedWater": 19387,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.419,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.027,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.22,
        "supplyDemandGapIMC_MLD": 1.608,
        "supplyDemandGapCPHEEO_MLD": 2.801
      },
      "2024": {
        "estimatedPopulation": 33922,
        "populationServedPipedWater": 22049,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.751,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.579,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.936,
        "supplyDemandGapIMC_MLD": 1.828,
        "supplyDemandGapCPHEEO_MLD": 3.185
      },
      "2029": {
        "estimatedPopulation": 42036,
        "populationServedPipedWater": 27323,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.409,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.675,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.356,
        "supplyDemandGapIMC_MLD": 2.266,
        "supplyDemandGapCPHEEO_MLD": 3.947
      }
    }
  },
  {
    "wardNumber": 12,
    "wardName": "Govind Colony",
    "densityPerSqKm": 61669,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 41745,
        "populationServedPipedWater": 33396,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.266,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.636,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.305,
        "supplyDemandGapIMC_MLD": 1.37,
        "supplyDemandGapCPHEEO_MLD": 3.039
      },
      "2021": {
        "estimatedPopulation": 64105,
        "populationServedPipedWater": 51284,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.552,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.654,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 11.218,
        "supplyDemandGapIMC_MLD": 2.102,
        "supplyDemandGapCPHEEO_MLD": 4.666
      },
      "2024": {
        "estimatedPopulation": 72908,
        "populationServedPipedWater": 58326,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.451,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.843,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.759,
        "supplyDemandGapIMC_MLD": 2.392,
        "supplyDemandGapCPHEEO_MLD": 5.308
      },
      "2029": {
        "estimatedPopulation": 90349,
        "populationServedPipedWater": 72279,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.234,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 12.197,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 15.811,
        "supplyDemandGapIMC_MLD": 2.963,
        "supplyDemandGapCPHEEO_MLD": 6.577
      }
    }
  },
  {
    "wardNumber": 13,
    "wardName": "Sangam Nagar",
    "densityPerSqKm": 22305,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 15099,
        "populationServedPipedWater": 7550,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.904,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.038,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.642,
        "supplyDemandGapIMC_MLD": 1.134,
        "supplyDemandGapCPHEEO_MLD": 1.738
      },
      "2021": {
        "estimatedPopulation": 23186,
        "populationServedPipedWater": 11593,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.389,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.13,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.058,
        "supplyDemandGapIMC_MLD": 1.741,
        "supplyDemandGapCPHEEO_MLD": 2.669
      },
      "2024": {
        "estimatedPopulation": 26370,
        "populationServedPipedWater": 13185,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.58,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.56,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.615,
        "supplyDemandGapIMC_MLD": 1.98,
        "supplyDemandGapCPHEEO_MLD": 3.035
      },
      "2029": {
        "estimatedPopulation": 32678,
        "populationServedPipedWater": 16339,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.957,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.412,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.719,
        "supplyDemandGapIMC_MLD": 2.455,
        "supplyDemandGapCPHEEO_MLD": 3.762
      }
    }
  },
  {
    "wardNumber": 14,
    "wardName": "Ashok Nagar",
    "densityPerSqKm": 12272,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 8307,
        "populationServedPipedWater": 2492,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.322,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.121,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.454,
        "supplyDemandGapIMC_MLD": 0.799,
        "supplyDemandGapCPHEEO_MLD": 1.132
      },
      "2021": {
        "estimatedPopulation": 12757,
        "populationServedPipedWater": 3827,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.495,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.722,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.232,
        "supplyDemandGapIMC_MLD": 1.227,
        "supplyDemandGapCPHEEO_MLD": 1.737
      },
      "2024": {
        "estimatedPopulation": 14509,
        "populationServedPipedWater": 4353,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.563,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.959,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.539,
        "supplyDemandGapIMC_MLD": 1.396,
        "supplyDemandGapCPHEEO_MLD": 1.976
      },
      "2029": {
        "estimatedPopulation": 17980,
        "populationServedPipedWater": 5394,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.698,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.427,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.147,
        "supplyDemandGapIMC_MLD": 1.729,
        "supplyDemandGapCPHEEO_MLD": 2.449
      }
    }
  },
  {
    "wardNumber": 15,
    "wardName": "Bijasan",
    "densityPerSqKm": 1575,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 1066,
        "populationServedPipedWater": 320,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.041,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.144,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.187,
        "supplyDemandGapIMC_MLD": 0.103,
        "supplyDemandGapCPHEEO_MLD": 0.146
      },
      "2021": {
        "estimatedPopulation": 1637,
        "populationServedPipedWater": 491,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.064,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.221,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.286,
        "supplyDemandGapIMC_MLD": 0.157,
        "supplyDemandGapCPHEEO_MLD": 0.222
      },
      "2024": {
        "estimatedPopulation": 1862,
        "populationServedPipedWater": 559,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.072,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.251,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.326,
        "supplyDemandGapIMC_MLD": 0.179,
        "supplyDemandGapCPHEEO_MLD": 0.254
      },
      "2029": {
        "estimatedPopulation": 2307,
        "populationServedPipedWater": 692,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.09,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.311,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.404,
        "supplyDemandGapIMC_MLD": 0.221,
        "supplyDemandGapCPHEEO_MLD": 0.314
      }
    }
  },
  {
    "wardNumber": 16,
    "wardName": "Nand Bagh",
    "densityPerSqKm": 6589,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 4460,
        "populationServedPipedWater": 1338,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.173,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.602,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.78,
        "supplyDemandGapIMC_MLD": 0.429,
        "supplyDemandGapCPHEEO_MLD": 0.607
      },
      "2021": {
        "estimatedPopulation": 6849,
        "populationServedPipedWater": 2055,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.266,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.925,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.199,
        "supplyDemandGapIMC_MLD": 0.659,
        "supplyDemandGapCPHEEO_MLD": 0.933
      },
      "2024": {
        "estimatedPopulation": 7790,
        "populationServedPipedWater": 2337,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.302,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.052,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.363,
        "supplyDemandGapIMC_MLD": 0.75,
        "supplyDemandGapCPHEEO_MLD": 1.061
      },
      "2029": {
        "estimatedPopulation": 9653,
        "populationServedPipedWater": 2896,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.375,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.303,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.689,
        "supplyDemandGapIMC_MLD": 0.928,
        "supplyDemandGapCPHEEO_MLD": 1.314
      }
    }
  },
  {
    "wardNumber": 17,
    "wardName": "Sant Ravidas",
    "densityPerSqKm": 36945,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 25009,
        "populationServedPipedWater": 16256,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.028,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.376,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.377,
        "supplyDemandGapIMC_MLD": 1.348,
        "supplyDemandGapCPHEEO_MLD": 2.349
      },
      "2021": {
        "estimatedPopulation": 38404,
        "populationServedPipedWater": 24963,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.115,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.185,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.721,
        "supplyDemandGapIMC_MLD": 2.07,
        "supplyDemandGapCPHEEO_MLD": 3.606
      },
      "2024": {
        "estimatedPopulation": 43678,
        "populationServedPipedWater": 28391,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.542,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.897,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.644,
        "supplyDemandGapIMC_MLD": 2.355,
        "supplyDemandGapCPHEEO_MLD": 4.102
      },
      "2029": {
        "estimatedPopulation": 54126,
        "populationServedPipedWater": 35182,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.39,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.307,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.472,
        "supplyDemandGapIMC_MLD": 2.917,
        "supplyDemandGapCPHEEO_MLD": 5.082
      }
    }
  },
  {
    "wardNumber": 18,
    "wardName": "Sant Kabir",
    "densityPerSqKm": 3167,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 2144,
        "populationServedPipedWater": 643,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.083,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.289,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.375,
        "supplyDemandGapIMC_MLD": 0.206,
        "supplyDemandGapCPHEEO_MLD": 0.292
      },
      "2021": {
        "estimatedPopulation": 3292,
        "populationServedPipedWater": 988,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.128,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.444,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.576,
        "supplyDemandGapIMC_MLD": 0.316,
        "supplyDemandGapCPHEEO_MLD": 0.448
      },
      "2024": {
        "estimatedPopulation": 3744,
        "populationServedPipedWater": 1123,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.145,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.505,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.655,
        "supplyDemandGapIMC_MLD": 0.36,
        "supplyDemandGapCPHEEO_MLD": 0.51
      },
      "2029": {
        "estimatedPopulation": 4640,
        "populationServedPipedWater": 1392,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.18,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.626,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.812,
        "supplyDemandGapIMC_MLD": 0.446,
        "supplyDemandGapCPHEEO_MLD": 0.632
      }
    }
  },
  {
    "wardNumber": 19,
    "wardName": "Vishvakarma",
    "densityPerSqKm": 5615,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 3801,
        "populationServedPipedWater": 1140,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.147,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.513,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.665,
        "supplyDemandGapIMC_MLD": 0.366,
        "supplyDemandGapCPHEEO_MLD": 0.518
      },
      "2021": {
        "estimatedPopulation": 5837,
        "populationServedPipedWater": 1751,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.226,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.788,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.021,
        "supplyDemandGapIMC_MLD": 0.562,
        "supplyDemandGapCPHEEO_MLD": 0.795
      },
      "2024": {
        "estimatedPopulation": 6639,
        "populationServedPipedWater": 1992,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.258,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.896,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.162,
        "supplyDemandGapIMC_MLD": 0.638,
        "supplyDemandGapCPHEEO_MLD": 0.904
      },
      "2029": {
        "estimatedPopulation": 8227,
        "populationServedPipedWater": 2468,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.319,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.111,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.44,
        "supplyDemandGapIMC_MLD": 0.792,
        "supplyDemandGapCPHEEO_MLD": 1.121
      }
    }
  },
  {
    "wardNumber": 20,
    "wardName": "Gauri Nagar",
    "densityPerSqKm": 21317,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 14430,
        "populationServedPipedWater": 7215,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.864,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.948,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.525,
        "supplyDemandGapIMC_MLD": 1.084,
        "supplyDemandGapCPHEEO_MLD": 1.661
      },
      "2021": {
        "estimatedPopulation": 22159,
        "populationServedPipedWater": 11080,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.327,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.991,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.878,
        "supplyDemandGapIMC_MLD": 1.664,
        "supplyDemandGapCPHEEO_MLD": 2.551
      },
      "2024": {
        "estimatedPopulation": 25202,
        "populationServedPipedWater": 12601,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.51,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.402,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.41,
        "supplyDemandGapIMC_MLD": 1.892,
        "supplyDemandGapCPHEEO_MLD": 2.9
      },
      "2029": {
        "estimatedPopulation": 31231,
        "populationServedPipedWater": 15616,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.871,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.216,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.465,
        "supplyDemandGapIMC_MLD": 2.345,
        "supplyDemandGapCPHEEO_MLD": 3.594
      }
    }
  },
  {
    "wardNumber": 21,
    "wardName": "Shyam Nagar",
    "densityPerSqKm": 14103,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 9547,
        "populationServedPipedWater": 4774,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.572,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.289,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.671,
        "supplyDemandGapIMC_MLD": 0.717,
        "supplyDemandGapCPHEEO_MLD": 1.099
      },
      "2021": {
        "estimatedPopulation": 14660,
        "populationServedPipedWater": 7330,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.878,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.979,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.566,
        "supplyDemandGapIMC_MLD": 1.101,
        "supplyDemandGapCPHEEO_MLD": 1.688
      },
      "2024": {
        "estimatedPopulation": 16673,
        "populationServedPipedWater": 8336,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.999,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.251,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.918,
        "supplyDemandGapIMC_MLD": 1.252,
        "supplyDemandGapCPHEEO_MLD": 1.919
      },
      "2029": {
        "estimatedPopulation": 20662,
        "populationServedPipedWater": 10331,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.238,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.789,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.616,
        "supplyDemandGapIMC_MLD": 1.551,
        "supplyDemandGapCPHEEO_MLD": 2.378
      }
    }
  },
  {
    "wardNumber": 22,
    "wardName": "Pandit Dindayal Upadhyay",
    "densityPerSqKm": 48625,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 32915,
        "populationServedPipedWater": 26332,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.364,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.444,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.76,
        "supplyDemandGapIMC_MLD": 1.08,
        "supplyDemandGapCPHEEO_MLD": 2.396
      },
      "2021": {
        "estimatedPopulation": 50546,
        "populationServedPipedWater": 40437,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.166,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.824,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.846,
        "supplyDemandGapIMC_MLD": 1.658,
        "supplyDemandGapCPHEEO_MLD": 3.68
      },
      "2024": {
        "estimatedPopulation": 57487,
        "populationServedPipedWater": 45990,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.875,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.761,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.06,
        "supplyDemandGapIMC_MLD": 1.886,
        "supplyDemandGapCPHEEO_MLD": 4.185
      },
      "2029": {
        "estimatedPopulation": 71239,
        "populationServedPipedWater": 56991,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.281,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.617,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.467,
        "supplyDemandGapIMC_MLD": 2.336,
        "supplyDemandGapCPHEEO_MLD": 5.186
      }
    }
  },
  {
    "wardNumber": 23,
    "wardName": "Swargiya Rajesh Joshi",
    "densityPerSqKm": 28074,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 19004,
        "populationServedPipedWater": 12353,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.541,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.566,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.326,
        "supplyDemandGapIMC_MLD": 1.025,
        "supplyDemandGapCPHEEO_MLD": 1.785
      },
      "2021": {
        "estimatedPopulation": 29183,
        "populationServedPipedWater": 18969,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.367,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.94,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.107,
        "supplyDemandGapIMC_MLD": 1.573,
        "supplyDemandGapCPHEEO_MLD": 2.74
      },
      "2024": {
        "estimatedPopulation": 33191,
        "populationServedPipedWater": 21574,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.692,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.481,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.808,
        "supplyDemandGapIMC_MLD": 1.789,
        "supplyDemandGapCPHEEO_MLD": 3.116
      },
      "2029": {
        "estimatedPopulation": 41130,
        "populationServedPipedWater": 26734,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.336,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.553,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.198,
        "supplyDemandGapIMC_MLD": 2.217,
        "supplyDemandGapCPHEEO_MLD": 3.862
      }
    }
  },
  {
    "wardNumber": 24,
    "wardName": "Sant Balajinath Maharaj",
    "densityPerSqKm": 47205,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 31954,
        "populationServedPipedWater": 25563,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.266,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.314,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.592,
        "supplyDemandGapIMC_MLD": 1.048,
        "supplyDemandGapCPHEEO_MLD": 2.326
      },
      "2021": {
        "estimatedPopulation": 49069,
        "populationServedPipedWater": 39255,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.015,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.624,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.587,
        "supplyDemandGapIMC_MLD": 1.609,
        "supplyDemandGapCPHEEO_MLD": 3.572
      },
      "2024": {
        "estimatedPopulation": 55808,
        "populationServedPipedWater": 44646,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.704,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.534,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.766,
        "supplyDemandGapIMC_MLD": 1.83,
        "supplyDemandGapCPHEEO_MLD": 4.062
      },
      "2029": {
        "estimatedPopulation": 69157,
        "populationServedPipedWater": 55326,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.068,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.336,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.102,
        "supplyDemandGapIMC_MLD": 2.268,
        "supplyDemandGapCPHEEO_MLD": 5.034
      }
    }
  },
  {
    "wardNumber": 25,
    "wardName": null,
    "densityPerSqKm": 34251,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": true,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 23185,
        "populationServedPipedWater": 15070,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.88,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.13,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.057,
        "supplyDemandGapIMC_MLD": 1.25,
        "supplyDemandGapCPHEEO_MLD": 2.177
      },
      "2021": {
        "estimatedPopulation": 35604,
        "populationServedPipedWater": 23143,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.887,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.807,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.231,
        "supplyDemandGapIMC_MLD": 1.92,
        "supplyDemandGapCPHEEO_MLD": 3.344
      },
      "2024": {
        "estimatedPopulation": 40493,
        "populationServedPipedWater": 26320,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.284,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.467,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.086,
        "supplyDemandGapIMC_MLD": 2.183,
        "supplyDemandGapCPHEEO_MLD": 3.802
      },
      "2029": {
        "estimatedPopulation": 50180,
        "populationServedPipedWater": 32617,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.07,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.774,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.781,
        "supplyDemandGapIMC_MLD": 2.704,
        "supplyDemandGapCPHEEO_MLD": 4.711
      }
    }
  },
  {
    "wardNumber": 26,
    "wardName": "Jeen Mata",
    "densityPerSqKm": 109868,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 74372,
        "populationServedPipedWater": 59498,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.601,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.04,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 13.015,
        "supplyDemandGapIMC_MLD": 2.439,
        "supplyDemandGapCPHEEO_MLD": 5.414
      },
      "2021": {
        "estimatedPopulation": 114208,
        "populationServedPipedWater": 91366,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 11.672,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 15.418,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 19.986,
        "supplyDemandGapIMC_MLD": 3.746,
        "supplyDemandGapCPHEEO_MLD": 8.314
      },
      "2024": {
        "estimatedPopulation": 129892,
        "populationServedPipedWater": 103914,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 13.275,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 17.535,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 22.731,
        "supplyDemandGapIMC_MLD": 4.26,
        "supplyDemandGapCPHEEO_MLD": 9.456
      },
      "2029": {
        "estimatedPopulation": 160963,
        "populationServedPipedWater": 128770,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 16.45,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 21.73,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 28.169,
        "supplyDemandGapIMC_MLD": 5.28,
        "supplyDemandGapCPHEEO_MLD": 11.719
      }
    }
  },
  {
    "wardNumber": 27,
    "wardName": "Snehalata Ganj",
    "densityPerSqKm": 30905,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 20920,
        "populationServedPipedWater": 13598,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.697,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.824,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.661,
        "supplyDemandGapIMC_MLD": 1.127,
        "supplyDemandGapCPHEEO_MLD": 1.964
      },
      "2021": {
        "estimatedPopulation": 32126,
        "populationServedPipedWater": 20882,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.605,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.337,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.622,
        "supplyDemandGapIMC_MLD": 1.732,
        "supplyDemandGapCPHEEO_MLD": 3.017
      },
      "2024": {
        "estimatedPopulation": 36538,
        "populationServedPipedWater": 23750,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.963,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.933,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.394,
        "supplyDemandGapIMC_MLD": 1.97,
        "supplyDemandGapCPHEEO_MLD": 3.431
      },
      "2029": {
        "estimatedPopulation": 45278,
        "populationServedPipedWater": 29431,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.672,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.113,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.924,
        "supplyDemandGapIMC_MLD": 2.441,
        "supplyDemandGapCPHEEO_MLD": 4.252
      }
    }
  },
  {
    "wardNumber": 28,
    "wardName": "Ma Tuleja Bhavani",
    "densityPerSqKm": 50531,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 34205,
        "populationServedPipedWater": 27364,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.496,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.618,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.986,
        "supplyDemandGapIMC_MLD": 1.122,
        "supplyDemandGapCPHEEO_MLD": 2.49
      },
      "2021": {
        "estimatedPopulation": 52527,
        "populationServedPipedWater": 42022,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.368,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.091,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.192,
        "supplyDemandGapIMC_MLD": 1.723,
        "supplyDemandGapCPHEEO_MLD": 3.824
      },
      "2024": {
        "estimatedPopulation": 59740,
        "populationServedPipedWater": 47792,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.105,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.065,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.454,
        "supplyDemandGapIMC_MLD": 1.96,
        "supplyDemandGapCPHEEO_MLD": 4.349
      },
      "2029": {
        "estimatedPopulation": 74031,
        "populationServedPipedWater": 59225,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.566,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.994,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.955,
        "supplyDemandGapIMC_MLD": 2.428,
        "supplyDemandGapCPHEEO_MLD": 5.389
      }
    }
  },
  {
    "wardNumber": 29,
    "wardName": "Dr. S.P. Mukherjee",
    "densityPerSqKm": 16542,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 11197,
        "populationServedPipedWater": 5598,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.671,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.512,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.959,
        "supplyDemandGapIMC_MLD": 0.841,
        "supplyDemandGapCPHEEO_MLD": 1.288
      },
      "2021": {
        "estimatedPopulation": 17195,
        "populationServedPipedWater": 8598,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.03,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.321,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.009,
        "supplyDemandGapIMC_MLD": 1.291,
        "supplyDemandGapCPHEEO_MLD": 1.979
      },
      "2024": {
        "estimatedPopulation": 19556,
        "populationServedPipedWater": 9778,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.171,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.64,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.422,
        "supplyDemandGapIMC_MLD": 1.469,
        "supplyDemandGapCPHEEO_MLD": 2.251
      },
      "2029": {
        "estimatedPopulation": 24234,
        "populationServedPipedWater": 12117,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.452,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.272,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.241,
        "supplyDemandGapIMC_MLD": 1.82,
        "supplyDemandGapCPHEEO_MLD": 2.789
      }
    }
  },
  {
    "wardNumber": 30,
    "wardName": "Ravji Bajar",
    "densityPerSqKm": 38023,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 25739,
        "populationServedPipedWater": 16730,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.087,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.475,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.504,
        "supplyDemandGapIMC_MLD": 1.388,
        "supplyDemandGapCPHEEO_MLD": 2.417
      },
      "2021": {
        "estimatedPopulation": 39525,
        "populationServedPipedWater": 25691,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.205,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.336,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.917,
        "supplyDemandGapIMC_MLD": 2.131,
        "supplyDemandGapCPHEEO_MLD": 3.712
      },
      "2024": {
        "estimatedPopulation": 44953,
        "populationServedPipedWater": 29219,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.646,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.069,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.867,
        "supplyDemandGapIMC_MLD": 2.423,
        "supplyDemandGapCPHEEO_MLD": 4.221
      },
      "2029": {
        "estimatedPopulation": 55706,
        "populationServedPipedWater": 36209,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.518,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.52,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.749,
        "supplyDemandGapIMC_MLD": 3.002,
        "supplyDemandGapCPHEEO_MLD": 5.231
      }
    }
  },
  {
    "wardNumber": 31,
    "wardName": "Maharaja Chatrasal",
    "densityPerSqKm": 13607,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 9211,
        "populationServedPipedWater": 2763,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.357,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.243,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.612,
        "supplyDemandGapIMC_MLD": 0.886,
        "supplyDemandGapCPHEEO_MLD": 1.255
      },
      "2021": {
        "estimatedPopulation": 14144,
        "populationServedPipedWater": 4243,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.549,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.909,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.475,
        "supplyDemandGapIMC_MLD": 1.36,
        "supplyDemandGapCPHEEO_MLD": 1.926
      },
      "2024": {
        "estimatedPopulation": 16086,
        "populationServedPipedWater": 4826,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.624,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.172,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.815,
        "supplyDemandGapIMC_MLD": 1.548,
        "supplyDemandGapCPHEEO_MLD": 2.191
      },
      "2029": {
        "estimatedPopulation": 19934,
        "populationServedPipedWater": 5980,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.773,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.691,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.488,
        "supplyDemandGapIMC_MLD": 1.918,
        "supplyDemandGapCPHEEO_MLD": 2.715
      }
    }
  },
  {
    "wardNumber": 32,
    "wardName": "Atal Bihari Vajpeyi",
    "densityPerSqKm": 19763,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 13378,
        "populationServedPipedWater": 6689,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.801,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.806,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.341,
        "supplyDemandGapIMC_MLD": 1.005,
        "supplyDemandGapCPHEEO_MLD": 1.54
      },
      "2021": {
        "estimatedPopulation": 20544,
        "populationServedPipedWater": 10272,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.231,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.773,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.595,
        "supplyDemandGapIMC_MLD": 1.542,
        "supplyDemandGapCPHEEO_MLD": 2.364
      },
      "2024": {
        "estimatedPopulation": 23365,
        "populationServedPipedWater": 11682,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.4,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.154,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.089,
        "supplyDemandGapIMC_MLD": 1.754,
        "supplyDemandGapCPHEEO_MLD": 2.689
      },
      "2029": {
        "estimatedPopulation": 28954,
        "populationServedPipedWater": 14477,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.734,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.909,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.067,
        "supplyDemandGapIMC_MLD": 2.175,
        "supplyDemandGapCPHEEO_MLD": 3.333
      }
    }
  },
  {
    "wardNumber": 33,
    "wardName": "Sukhliya",
    "densityPerSqKm": 30058,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 20347,
        "populationServedPipedWater": 13226,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.65,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.747,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.561,
        "supplyDemandGapIMC_MLD": 1.097,
        "supplyDemandGapCPHEEO_MLD": 1.911
      },
      "2021": {
        "estimatedPopulation": 31245,
        "populationServedPipedWater": 20309,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.534,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.218,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.468,
        "supplyDemandGapIMC_MLD": 1.684,
        "supplyDemandGapCPHEEO_MLD": 2.934
      },
      "2024": {
        "estimatedPopulation": 35536,
        "populationServedPipedWater": 23098,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.882,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.797,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.219,
        "supplyDemandGapIMC_MLD": 1.915,
        "supplyDemandGapCPHEEO_MLD": 3.337
      },
      "2029": {
        "estimatedPopulation": 44036,
        "populationServedPipedWater": 28623,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.571,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.945,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.706,
        "supplyDemandGapIMC_MLD": 2.374,
        "supplyDemandGapCPHEEO_MLD": 4.135
      }
    }
  },
  {
    "wardNumber": 34,
    "wardName": "Shahid Bhagat Singh",
    "densityPerSqKm": 10723,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 7259,
        "populationServedPipedWater": 2178,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.282,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.98,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.27,
        "supplyDemandGapIMC_MLD": 0.698,
        "supplyDemandGapCPHEEO_MLD": 0.988
      },
      "2021": {
        "estimatedPopulation": 11147,
        "populationServedPipedWater": 3344,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.433,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.505,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.951,
        "supplyDemandGapIMC_MLD": 1.072,
        "supplyDemandGapCPHEEO_MLD": 1.518
      },
      "2024": {
        "estimatedPopulation": 12678,
        "populationServedPipedWater": 3803,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.492,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.712,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.219,
        "supplyDemandGapIMC_MLD": 1.22,
        "supplyDemandGapCPHEEO_MLD": 1.727
      },
      "2029": {
        "estimatedPopulation": 15710,
        "populationServedPipedWater": 4713,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.61,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.121,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.749,
        "supplyDemandGapIMC_MLD": 1.511,
        "supplyDemandGapCPHEEO_MLD": 2.139
      }
    }
  },
  {
    "wardNumber": 35,
    "wardName": "Lasudiya Mori",
    "densityPerSqKm": 2123,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 1437,
        "populationServedPipedWater": 431,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.056,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.194,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.251,
        "supplyDemandGapIMC_MLD": 0.138,
        "supplyDemandGapCPHEEO_MLD": 0.195
      },
      "2021": {
        "estimatedPopulation": 2207,
        "populationServedPipedWater": 662,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.086,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.298,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.386,
        "supplyDemandGapIMC_MLD": 0.212,
        "supplyDemandGapCPHEEO_MLD": 0.3
      },
      "2024": {
        "estimatedPopulation": 2510,
        "populationServedPipedWater": 753,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.097,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.339,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.439,
        "supplyDemandGapIMC_MLD": 0.242,
        "supplyDemandGapCPHEEO_MLD": 0.342
      },
      "2029": {
        "estimatedPopulation": 3111,
        "populationServedPipedWater": 933,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.121,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.42,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.544,
        "supplyDemandGapIMC_MLD": 0.299,
        "supplyDemandGapCPHEEO_MLD": 0.423
      }
    }
  },
  {
    "wardNumber": 36,
    "wardName": "Nipaniya",
    "densityPerSqKm": 2588,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 1752,
        "populationServedPipedWater": 526,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.068,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.237,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.307,
        "supplyDemandGapIMC_MLD": 0.169,
        "supplyDemandGapCPHEEO_MLD": 0.239
      },
      "2021": {
        "estimatedPopulation": 2690,
        "populationServedPipedWater": 807,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.104,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.363,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.471,
        "supplyDemandGapIMC_MLD": 0.259,
        "supplyDemandGapCPHEEO_MLD": 0.367
      },
      "2024": {
        "estimatedPopulation": 3059,
        "populationServedPipedWater": 918,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.119,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.413,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.535,
        "supplyDemandGapIMC_MLD": 0.294,
        "supplyDemandGapCPHEEO_MLD": 0.416
      },
      "2029": {
        "estimatedPopulation": 3791,
        "populationServedPipedWater": 1137,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.147,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.512,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.663,
        "supplyDemandGapIMC_MLD": 0.365,
        "supplyDemandGapCPHEEO_MLD": 0.516
      }
    }
  },
  {
    "wardNumber": 37,
    "wardName": "Sai Krupa",
    "densityPerSqKm": 10550,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 7142,
        "populationServedPipedWater": 2143,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.277,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.964,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.25,
        "supplyDemandGapIMC_MLD": 0.687,
        "supplyDemandGapCPHEEO_MLD": 0.973
      },
      "2021": {
        "estimatedPopulation": 10967,
        "populationServedPipedWater": 3290,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.426,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.481,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.919,
        "supplyDemandGapIMC_MLD": 1.055,
        "supplyDemandGapCPHEEO_MLD": 1.493
      },
      "2024": {
        "estimatedPopulation": 12473,
        "populationServedPipedWater": 3742,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.484,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.684,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.183,
        "supplyDemandGapIMC_MLD": 1.2,
        "supplyDemandGapCPHEEO_MLD": 1.699
      },
      "2029": {
        "estimatedPopulation": 15457,
        "populationServedPipedWater": 4637,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.6,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.087,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.705,
        "supplyDemandGapIMC_MLD": 1.487,
        "supplyDemandGapCPHEEO_MLD": 2.105
      }
    }
  },
  {
    "wardNumber": 38,
    "wardName": "Nanda Nagar",
    "densityPerSqKm": 47061,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 31857,
        "populationServedPipedWater": 20707,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.584,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.301,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.575,
        "supplyDemandGapIMC_MLD": 1.717,
        "supplyDemandGapCPHEEO_MLD": 2.991
      },
      "2021": {
        "estimatedPopulation": 48920,
        "populationServedPipedWater": 31798,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.967,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.604,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.561,
        "supplyDemandGapIMC_MLD": 2.637,
        "supplyDemandGapCPHEEO_MLD": 4.594
      },
      "2024": {
        "estimatedPopulation": 55638,
        "populationServedPipedWater": 36165,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.512,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.511,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.737,
        "supplyDemandGapIMC_MLD": 2.999,
        "supplyDemandGapCPHEEO_MLD": 5.225
      },
      "2029": {
        "estimatedPopulation": 68947,
        "populationServedPipedWater": 44816,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 5.592,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.308,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.066,
        "supplyDemandGapIMC_MLD": 3.716,
        "supplyDemandGapCPHEEO_MLD": 6.474
      }
    }
  },
  {
    "wardNumber": 39,
    "wardName": "Nahar Shahvali",
    "densityPerSqKm": 8811,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 5964,
        "populationServedPipedWater": 1789,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.231,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.805,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.044,
        "supplyDemandGapIMC_MLD": 0.574,
        "supplyDemandGapCPHEEO_MLD": 0.813
      },
      "2021": {
        "estimatedPopulation": 9159,
        "populationServedPipedWater": 2748,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.355,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.236,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.603,
        "supplyDemandGapIMC_MLD": 0.881,
        "supplyDemandGapCPHEEO_MLD": 1.248
      },
      "2024": {
        "estimatedPopulation": 10417,
        "populationServedPipedWater": 3125,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.404,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.406,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.823,
        "supplyDemandGapIMC_MLD": 1.002,
        "supplyDemandGapCPHEEO_MLD": 1.419
      },
      "2029": {
        "estimatedPopulation": 12909,
        "populationServedPipedWater": 3873,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.501,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.743,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.259,
        "supplyDemandGapIMC_MLD": 1.242,
        "supplyDemandGapCPHEEO_MLD": 1.758
      }
    }
  },
  {
    "wardNumber": 40,
    "wardName": "Khajrana Ganesh",
    "densityPerSqKm": 23553,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 15943,
        "populationServedPipedWater": 7972,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.955,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.152,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.79,
        "supplyDemandGapIMC_MLD": 1.197,
        "supplyDemandGapCPHEEO_MLD": 1.835
      },
      "2021": {
        "estimatedPopulation": 24483,
        "populationServedPipedWater": 12242,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.467,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.305,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.285,
        "supplyDemandGapIMC_MLD": 1.838,
        "supplyDemandGapCPHEEO_MLD": 2.818
      },
      "2024": {
        "estimatedPopulation": 27845,
        "populationServedPipedWater": 13922,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.668,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.759,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.873,
        "supplyDemandGapIMC_MLD": 2.091,
        "supplyDemandGapCPHEEO_MLD": 3.205
      },
      "2029": {
        "estimatedPopulation": 34506,
        "populationServedPipedWater": 17253,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.067,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.658,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.039,
        "supplyDemandGapIMC_MLD": 2.591,
        "supplyDemandGapCPHEEO_MLD": 3.972
      }
    }
  },
  {
    "wardNumber": 41,
    "wardName": "Kailashpuri",
    "densityPerSqKm": 21026,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 14233,
        "populationServedPipedWater": 7116,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.853,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.921,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.491,
        "supplyDemandGapIMC_MLD": 1.068,
        "supplyDemandGapCPHEEO_MLD": 1.638
      },
      "2021": {
        "estimatedPopulation": 21856,
        "populationServedPipedWater": 10928,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.309,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.951,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.825,
        "supplyDemandGapIMC_MLD": 1.642,
        "supplyDemandGapCPHEEO_MLD": 2.516
      },
      "2024": {
        "estimatedPopulation": 24857,
        "populationServedPipedWater": 12428,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.489,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.356,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.35,
        "supplyDemandGapIMC_MLD": 1.867,
        "supplyDemandGapCPHEEO_MLD": 2.861
      },
      "2029": {
        "estimatedPopulation": 30803,
        "populationServedPipedWater": 15402,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.845,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.158,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.391,
        "supplyDemandGapIMC_MLD": 2.313,
        "supplyDemandGapCPHEEO_MLD": 3.546
      }
    }
  },
  {
    "wardNumber": 42,
    "wardName": "Swami Vivekanand",
    "densityPerSqKm": 22794,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 15429,
        "populationServedPipedWater": 7714,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.924,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.083,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.7,
        "supplyDemandGapIMC_MLD": 1.159,
        "supplyDemandGapCPHEEO_MLD": 1.776
      },
      "2021": {
        "estimatedPopulation": 23694,
        "populationServedPipedWater": 11847,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.419,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.199,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.146,
        "supplyDemandGapIMC_MLD": 1.78,
        "supplyDemandGapCPHEEO_MLD": 2.727
      },
      "2024": {
        "estimatedPopulation": 26948,
        "populationServedPipedWater": 13474,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.614,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.638,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.716,
        "supplyDemandGapIMC_MLD": 2.024,
        "supplyDemandGapCPHEEO_MLD": 3.102
      },
      "2029": {
        "estimatedPopulation": 33394,
        "populationServedPipedWater": 16697,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.0,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.508,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.844,
        "supplyDemandGapIMC_MLD": 2.508,
        "supplyDemandGapCPHEEO_MLD": 3.844
      }
    }
  },
  {
    "wardNumber": 43,
    "wardName": "Shri Nagar",
    "densityPerSqKm": 25607,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 17334,
        "populationServedPipedWater": 8667,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.038,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.34,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.033,
        "supplyDemandGapIMC_MLD": 1.302,
        "supplyDemandGapCPHEEO_MLD": 1.995
      },
      "2021": {
        "estimatedPopulation": 26618,
        "populationServedPipedWater": 13309,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.594,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.593,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.658,
        "supplyDemandGapIMC_MLD": 1.999,
        "supplyDemandGapCPHEEO_MLD": 3.064
      },
      "2024": {
        "estimatedPopulation": 30273,
        "populationServedPipedWater": 15136,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.813,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.087,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.298,
        "supplyDemandGapIMC_MLD": 2.274,
        "supplyDemandGapCPHEEO_MLD": 3.485
      },
      "2029": {
        "estimatedPopulation": 37515,
        "populationServedPipedWater": 18758,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.247,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.065,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.565,
        "supplyDemandGapIMC_MLD": 2.818,
        "supplyDemandGapCPHEEO_MLD": 4.318
      }
    }
  },
  {
    "wardNumber": 44,
    "wardName": "H.I.G.",
    "densityPerSqKm": 47466,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 32131,
        "populationServedPipedWater": 25705,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.284,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.338,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.623,
        "supplyDemandGapIMC_MLD": 1.054,
        "supplyDemandGapCPHEEO_MLD": 2.339
      },
      "2021": {
        "estimatedPopulation": 49341,
        "populationServedPipedWater": 39473,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.043,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.661,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.635,
        "supplyDemandGapIMC_MLD": 1.618,
        "supplyDemandGapCPHEEO_MLD": 3.592
      },
      "2024": {
        "estimatedPopulation": 56117,
        "populationServedPipedWater": 44894,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.735,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.576,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.82,
        "supplyDemandGapIMC_MLD": 1.841,
        "supplyDemandGapCPHEEO_MLD": 4.085
      },
      "2029": {
        "estimatedPopulation": 69540,
        "populationServedPipedWater": 55632,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.107,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.388,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.169,
        "supplyDemandGapIMC_MLD": 2.281,
        "supplyDemandGapCPHEEO_MLD": 5.062
      }
    }
  },
  {
    "wardNumber": 45,
    "wardName": "Bhim Rao Ambedkar",
    "densityPerSqKm": 67890,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 45956,
        "populationServedPipedWater": 36765,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.697,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.204,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.042,
        "supplyDemandGapIMC_MLD": 1.507,
        "supplyDemandGapCPHEEO_MLD": 3.345
      },
      "2021": {
        "estimatedPopulation": 70572,
        "populationServedPipedWater": 56458,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.212,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.527,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.35,
        "supplyDemandGapIMC_MLD": 2.315,
        "supplyDemandGapCPHEEO_MLD": 5.138
      },
      "2024": {
        "estimatedPopulation": 80264,
        "populationServedPipedWater": 64211,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.203,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.836,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 14.046,
        "supplyDemandGapIMC_MLD": 2.633,
        "supplyDemandGapCPHEEO_MLD": 5.843
      },
      "2029": {
        "estimatedPopulation": 99463,
        "populationServedPipedWater": 79570,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 10.165,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 13.428,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 17.406,
        "supplyDemandGapIMC_MLD": 3.263,
        "supplyDemandGapCPHEEO_MLD": 7.241
      }
    }
  },
  {
    "wardNumber": 46,
    "wardName": "Somnath",
    "densityPerSqKm": 95939,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 64943,
        "populationServedPipedWater": 51954,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.637,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.767,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 11.365,
        "supplyDemandGapIMC_MLD": 2.13,
        "supplyDemandGapCPHEEO_MLD": 4.728
      },
      "2021": {
        "estimatedPopulation": 99728,
        "populationServedPipedWater": 79782,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 10.192,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 13.463,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 17.452,
        "supplyDemandGapIMC_MLD": 3.271,
        "supplyDemandGapCPHEEO_MLD": 7.26
      },
      "2024": {
        "estimatedPopulation": 113424,
        "populationServedPipedWater": 90739,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 11.592,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 15.312,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 19.849,
        "supplyDemandGapIMC_MLD": 3.72,
        "supplyDemandGapCPHEEO_MLD": 8.257
      },
      "2029": {
        "estimatedPopulation": 140555,
        "populationServedPipedWater": 112444,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 14.365,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 18.975,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 24.597,
        "supplyDemandGapIMC_MLD": 4.61,
        "supplyDemandGapCPHEEO_MLD": 10.232
      }
    }
  },
  {
    "wardNumber": 47,
    "wardName": "Sardar Vallabhbhai Patel",
    "densityPerSqKm": 19313,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 13073,
        "populationServedPipedWater": 6536,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.783,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.765,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.288,
        "supplyDemandGapIMC_MLD": 0.982,
        "supplyDemandGapCPHEEO_MLD": 1.505
      },
      "2021": {
        "estimatedPopulation": 20076,
        "populationServedPipedWater": 10038,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.203,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.71,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.513,
        "supplyDemandGapIMC_MLD": 1.507,
        "supplyDemandGapCPHEEO_MLD": 2.31
      },
      "2024": {
        "estimatedPopulation": 22833,
        "populationServedPipedWater": 11416,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.368,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.082,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.996,
        "supplyDemandGapIMC_MLD": 1.714,
        "supplyDemandGapCPHEEO_MLD": 2.628
      },
      "2029": {
        "estimatedPopulation": 28295,
        "populationServedPipedWater": 14148,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.695,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.82,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.952,
        "supplyDemandGapIMC_MLD": 2.125,
        "supplyDemandGapCPHEEO_MLD": 3.257
      }
    }
  },
  {
    "wardNumber": 48,
    "wardName": "Gita Bhavan",
    "densityPerSqKm": 28158,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 19061,
        "populationServedPipedWater": 12390,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.546,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.573,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.336,
        "supplyDemandGapIMC_MLD": 1.027,
        "supplyDemandGapCPHEEO_MLD": 1.79
      },
      "2021": {
        "estimatedPopulation": 29270,
        "populationServedPipedWater": 19026,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.374,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.951,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.122,
        "supplyDemandGapIMC_MLD": 1.577,
        "supplyDemandGapCPHEEO_MLD": 2.748
      },
      "2024": {
        "estimatedPopulation": 33290,
        "populationServedPipedWater": 21638,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.7,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.494,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.826,
        "supplyDemandGapIMC_MLD": 1.794,
        "supplyDemandGapCPHEEO_MLD": 3.126
      },
      "2029": {
        "estimatedPopulation": 41253,
        "populationServedPipedWater": 26814,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.346,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.569,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.219,
        "supplyDemandGapIMC_MLD": 2.223,
        "supplyDemandGapCPHEEO_MLD": 3.873
      }
    }
  },
  {
    "wardNumber": 49,
    "wardName": "Tilak Nagar",
    "densityPerSqKm": 28336,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 19181,
        "populationServedPipedWater": 12468,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.556,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.589,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.357,
        "supplyDemandGapIMC_MLD": 1.033,
        "supplyDemandGapCPHEEO_MLD": 1.801
      },
      "2021": {
        "estimatedPopulation": 29455,
        "populationServedPipedWater": 19146,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.389,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.976,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.155,
        "supplyDemandGapIMC_MLD": 1.587,
        "supplyDemandGapCPHEEO_MLD": 2.766
      },
      "2024": {
        "estimatedPopulation": 33500,
        "populationServedPipedWater": 21775,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.717,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.522,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.862,
        "supplyDemandGapIMC_MLD": 1.805,
        "supplyDemandGapCPHEEO_MLD": 3.145
      },
      "2029": {
        "estimatedPopulation": 41513,
        "populationServedPipedWater": 26983,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.367,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.604,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.265,
        "supplyDemandGapIMC_MLD": 2.237,
        "supplyDemandGapCPHEEO_MLD": 3.898
      }
    }
  },
  {
    "wardNumber": 50,
    "wardName": "Brajeshwari",
    "densityPerSqKm": 11640,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 7879,
        "populationServedPipedWater": 2364,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.306,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.064,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.379,
        "supplyDemandGapIMC_MLD": 0.758,
        "supplyDemandGapCPHEEO_MLD": 1.073
      },
      "2021": {
        "estimatedPopulation": 12100,
        "populationServedPipedWater": 3630,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.469,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.633,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.118,
        "supplyDemandGapIMC_MLD": 1.164,
        "supplyDemandGapCPHEEO_MLD": 1.649
      },
      "2024": {
        "estimatedPopulation": 13762,
        "populationServedPipedWater": 4129,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.534,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.858,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.408,
        "supplyDemandGapIMC_MLD": 1.324,
        "supplyDemandGapCPHEEO_MLD": 1.874
      },
      "2029": {
        "estimatedPopulation": 17054,
        "populationServedPipedWater": 5116,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.662,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.302,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.984,
        "supplyDemandGapIMC_MLD": 1.64,
        "supplyDemandGapCPHEEO_MLD": 2.322
      }
    }
  },
  {
    "wardNumber": 51,
    "wardName": "Bhagvati Nagar",
    "densityPerSqKm": 15746,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 10659,
        "populationServedPipedWater": 5330,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.638,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.439,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.865,
        "supplyDemandGapIMC_MLD": 0.801,
        "supplyDemandGapCPHEEO_MLD": 1.227
      },
      "2021": {
        "estimatedPopulation": 16368,
        "populationServedPipedWater": 8184,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.98,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.21,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.864,
        "supplyDemandGapIMC_MLD": 1.23,
        "supplyDemandGapCPHEEO_MLD": 1.884
      },
      "2024": {
        "estimatedPopulation": 18616,
        "populationServedPipedWater": 9308,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.115,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.513,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.258,
        "supplyDemandGapIMC_MLD": 1.398,
        "supplyDemandGapCPHEEO_MLD": 2.143
      },
      "2029": {
        "estimatedPopulation": 23069,
        "populationServedPipedWater": 11534,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.382,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.114,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.037,
        "supplyDemandGapIMC_MLD": 1.732,
        "supplyDemandGapCPHEEO_MLD": 2.655
      }
    }
  },
  {
    "wardNumber": 52,
    "wardName": "Musakhedi",
    "densityPerSqKm": 58191,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 39390,
        "populationServedPipedWater": 31512,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.026,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.318,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.893,
        "supplyDemandGapIMC_MLD": 1.292,
        "supplyDemandGapCPHEEO_MLD": 2.867
      },
      "2021": {
        "estimatedPopulation": 60489,
        "populationServedPipedWater": 48391,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.182,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.166,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.586,
        "supplyDemandGapIMC_MLD": 1.984,
        "supplyDemandGapCPHEEO_MLD": 4.404
      },
      "2024": {
        "estimatedPopulation": 68796,
        "populationServedPipedWater": 55037,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.031,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.287,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.039,
        "supplyDemandGapIMC_MLD": 2.256,
        "supplyDemandGapCPHEEO_MLD": 5.008
      },
      "2029": {
        "estimatedPopulation": 85252,
        "populationServedPipedWater": 68202,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.713,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 11.509,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 14.919,
        "supplyDemandGapIMC_MLD": 2.796,
        "supplyDemandGapCPHEEO_MLD": 6.206
      }
    }
  },
  {
    "wardNumber": 53,
    "wardName": "Dr. Maulana Azad",
    "densityPerSqKm": 70016,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 47395,
        "populationServedPipedWater": 37916,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.844,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.398,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.294,
        "supplyDemandGapIMC_MLD": 1.554,
        "supplyDemandGapCPHEEO_MLD": 3.45
      },
      "2021": {
        "estimatedPopulation": 72781,
        "populationServedPipedWater": 58225,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.438,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.825,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.737,
        "supplyDemandGapIMC_MLD": 2.387,
        "supplyDemandGapCPHEEO_MLD": 5.299
      },
      "2024": {
        "estimatedPopulation": 82776,
        "populationServedPipedWater": 66221,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.46,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 11.175,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 14.486,
        "supplyDemandGapIMC_MLD": 2.715,
        "supplyDemandGapCPHEEO_MLD": 6.026
      },
      "2029": {
        "estimatedPopulation": 102576,
        "populationServedPipedWater": 82061,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 10.483,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 13.848,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 17.951,
        "supplyDemandGapIMC_MLD": 3.365,
        "supplyDemandGapCPHEEO_MLD": 7.468
      }
    }
  },
  {
    "wardNumber": 54,
    "wardName": "Residency",
    "densityPerSqKm": 11034,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 7469,
        "populationServedPipedWater": 2241,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.29,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.008,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.307,
        "supplyDemandGapIMC_MLD": 0.718,
        "supplyDemandGapCPHEEO_MLD": 1.017
      },
      "2021": {
        "estimatedPopulation": 11470,
        "populationServedPipedWater": 3441,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.445,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.548,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.007,
        "supplyDemandGapIMC_MLD": 1.103,
        "supplyDemandGapCPHEEO_MLD": 1.562
      },
      "2024": {
        "estimatedPopulation": 13045,
        "populationServedPipedWater": 3914,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.506,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.761,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.283,
        "supplyDemandGapIMC_MLD": 1.255,
        "supplyDemandGapCPHEEO_MLD": 1.777
      },
      "2029": {
        "estimatedPopulation": 16166,
        "populationServedPipedWater": 4850,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.627,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.182,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.829,
        "supplyDemandGapIMC_MLD": 1.555,
        "supplyDemandGapCPHEEO_MLD": 2.202
      }
    }
  },
  {
    "wardNumber": 55,
    "wardName": "Sauth Tukoganj",
    "densityPerSqKm": 9231,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 6249,
        "populationServedPipedWater": 1875,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.242,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.844,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.094,
        "supplyDemandGapIMC_MLD": 0.602,
        "supplyDemandGapCPHEEO_MLD": 0.852
      },
      "2021": {
        "estimatedPopulation": 9596,
        "populationServedPipedWater": 2879,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.372,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.295,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.679,
        "supplyDemandGapIMC_MLD": 0.923,
        "supplyDemandGapCPHEEO_MLD": 1.307
      },
      "2024": {
        "estimatedPopulation": 10914,
        "populationServedPipedWater": 3274,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.423,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.473,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.91,
        "supplyDemandGapIMC_MLD": 1.05,
        "supplyDemandGapCPHEEO_MLD": 1.487
      },
      "2029": {
        "estimatedPopulation": 13524,
        "populationServedPipedWater": 4057,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.525,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.826,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.367,
        "supplyDemandGapIMC_MLD": 1.301,
        "supplyDemandGapCPHEEO_MLD": 1.842
      }
    }
  },
  {
    "wardNumber": 56,
    "wardName": "Imli Bajar",
    "densityPerSqKm": 31662,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 21433,
        "populationServedPipedWater": 13931,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.738,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.893,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.751,
        "supplyDemandGapIMC_MLD": 1.155,
        "supplyDemandGapCPHEEO_MLD": 2.013
      },
      "2021": {
        "estimatedPopulation": 32913,
        "populationServedPipedWater": 21393,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.669,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.443,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.76,
        "supplyDemandGapIMC_MLD": 1.774,
        "supplyDemandGapCPHEEO_MLD": 3.091
      },
      "2024": {
        "estimatedPopulation": 37433,
        "populationServedPipedWater": 24331,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.036,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.053,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.551,
        "supplyDemandGapIMC_MLD": 2.017,
        "supplyDemandGapCPHEEO_MLD": 3.515
      },
      "2029": {
        "estimatedPopulation": 46387,
        "populationServedPipedWater": 30152,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.762,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.262,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.118,
        "supplyDemandGapIMC_MLD": 2.5,
        "supplyDemandGapCPHEEO_MLD": 4.356
      }
    }
  },
  {
    "wardNumber": 57,
    "wardName": "Devi Ahilya Bai",
    "densityPerSqKm": 16150,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 10932,
        "populationServedPipedWater": 5466,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.655,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.476,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.913,
        "supplyDemandGapIMC_MLD": 0.821,
        "supplyDemandGapCPHEEO_MLD": 1.258
      },
      "2021": {
        "estimatedPopulation": 16788,
        "populationServedPipedWater": 8394,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.006,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.266,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.938,
        "supplyDemandGapIMC_MLD": 1.26,
        "supplyDemandGapCPHEEO_MLD": 1.932
      },
      "2024": {
        "estimatedPopulation": 19093,
        "populationServedPipedWater": 9546,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.144,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.578,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.341,
        "supplyDemandGapIMC_MLD": 1.434,
        "supplyDemandGapCPHEEO_MLD": 2.197
      },
      "2029": {
        "estimatedPopulation": 23661,
        "populationServedPipedWater": 11830,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.417,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.194,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.141,
        "supplyDemandGapIMC_MLD": 1.777,
        "supplyDemandGapCPHEEO_MLD": 2.724
      }
    }
  },
  {
    "wardNumber": 58,
    "wardName": "Loknayak Nagar",
    "densityPerSqKm": 31860,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 21566,
        "populationServedPipedWater": 14018,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.749,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.911,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.774,
        "supplyDemandGapIMC_MLD": 1.162,
        "supplyDemandGapCPHEEO_MLD": 2.025
      },
      "2021": {
        "estimatedPopulation": 33118,
        "populationServedPipedWater": 21527,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.686,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.471,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.796,
        "supplyDemandGapIMC_MLD": 1.785,
        "supplyDemandGapCPHEEO_MLD": 3.11
      },
      "2024": {
        "estimatedPopulation": 37666,
        "populationServedPipedWater": 24483,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.055,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.085,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.592,
        "supplyDemandGapIMC_MLD": 2.03,
        "supplyDemandGapCPHEEO_MLD": 3.537
      },
      "2029": {
        "estimatedPopulation": 46676,
        "populationServedPipedWater": 30339,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.785,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.301,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.168,
        "supplyDemandGapIMC_MLD": 2.516,
        "supplyDemandGapCPHEEO_MLD": 4.383
      }
    }
  },
  {
    "wardNumber": 59,
    "wardName": "Harsiddhi",
    "densityPerSqKm": 50503,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 34187,
        "populationServedPipedWater": 27350,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 3.494,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.615,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.983,
        "supplyDemandGapIMC_MLD": 1.121,
        "supplyDemandGapCPHEEO_MLD": 2.489
      },
      "2021": {
        "estimatedPopulation": 52498,
        "populationServedPipedWater": 41998,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.365,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.087,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.187,
        "supplyDemandGapIMC_MLD": 1.722,
        "supplyDemandGapCPHEEO_MLD": 3.822
      },
      "2024": {
        "estimatedPopulation": 59707,
        "populationServedPipedWater": 47766,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.102,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.06,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.449,
        "supplyDemandGapIMC_MLD": 1.958,
        "supplyDemandGapCPHEEO_MLD": 4.347
      },
      "2029": {
        "estimatedPopulation": 73990,
        "populationServedPipedWater": 59192,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.562,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.989,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.948,
        "supplyDemandGapIMC_MLD": 2.427,
        "supplyDemandGapCPHEEO_MLD": 5.386
      }
    }
  },
  {
    "wardNumber": 60,
    "wardName": "Ranipura",
    "densityPerSqKm": 62069,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 42016,
        "populationServedPipedWater": 33613,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.294,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.672,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.353,
        "supplyDemandGapIMC_MLD": 1.378,
        "supplyDemandGapCPHEEO_MLD": 3.059
      },
      "2021": {
        "estimatedPopulation": 64521,
        "populationServedPipedWater": 51617,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.594,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.71,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 11.291,
        "supplyDemandGapIMC_MLD": 2.116,
        "supplyDemandGapCPHEEO_MLD": 4.697
      },
      "2024": {
        "estimatedPopulation": 73382,
        "populationServedPipedWater": 58706,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.5,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.907,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.842,
        "supplyDemandGapIMC_MLD": 2.407,
        "supplyDemandGapCPHEEO_MLD": 5.342
      },
      "2029": {
        "estimatedPopulation": 90935,
        "populationServedPipedWater": 72748,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.294,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 12.276,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 15.914,
        "supplyDemandGapIMC_MLD": 2.982,
        "supplyDemandGapCPHEEO_MLD": 6.62
      }
    }
  },
  {
    "wardNumber": 61,
    "wardName": "Tatya Sarwate",
    "densityPerSqKm": 82827,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 56067,
        "populationServedPipedWater": 44854,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 5.73,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.569,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 9.812,
        "supplyDemandGapIMC_MLD": 1.839,
        "supplyDemandGapCPHEEO_MLD": 4.082
      },
      "2021": {
        "estimatedPopulation": 86098,
        "populationServedPipedWater": 68878,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.799,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 11.623,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 15.067,
        "supplyDemandGapIMC_MLD": 2.824,
        "supplyDemandGapCPHEEO_MLD": 6.268
      },
      "2024": {
        "estimatedPopulation": 97922,
        "populationServedPipedWater": 78338,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 10.008,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 13.219,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 17.136,
        "supplyDemandGapIMC_MLD": 3.211,
        "supplyDemandGapCPHEEO_MLD": 7.128
      },
      "2029": {
        "estimatedPopulation": 121345,
        "populationServedPipedWater": 97076,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 12.401,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 16.382,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 21.235,
        "supplyDemandGapIMC_MLD": 3.981,
        "supplyDemandGapCPHEEO_MLD": 8.834
      }
    }
  },
  {
    "wardNumber": 62,
    "wardName": "Laxman Singh Chauhan",
    "densityPerSqKm": 39832,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 26963,
        "populationServedPipedWater": 17526,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.187,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.64,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.719,
        "supplyDemandGapIMC_MLD": 1.453,
        "supplyDemandGapCPHEEO_MLD": 2.532
      },
      "2021": {
        "estimatedPopulation": 41405,
        "populationServedPipedWater": 26913,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.358,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.59,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.246,
        "supplyDemandGapIMC_MLD": 2.232,
        "supplyDemandGapCPHEEO_MLD": 3.888
      },
      "2024": {
        "estimatedPopulation": 47091,
        "populationServedPipedWater": 30609,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.819,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.357,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.241,
        "supplyDemandGapIMC_MLD": 2.538,
        "supplyDemandGapCPHEEO_MLD": 4.422
      },
      "2029": {
        "estimatedPopulation": 58356,
        "populationServedPipedWater": 37931,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.733,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.878,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.212,
        "supplyDemandGapIMC_MLD": 3.145,
        "supplyDemandGapCPHEEO_MLD": 5.479
      }
    }
  },
  {
    "wardNumber": 63,
    "wardName": "Navlakha",
    "densityPerSqKm": 19494,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 13196,
        "populationServedPipedWater": 6598,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.79,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.781,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.309,
        "supplyDemandGapIMC_MLD": 0.991,
        "supplyDemandGapCPHEEO_MLD": 1.519
      },
      "2021": {
        "estimatedPopulation": 20264,
        "populationServedPipedWater": 10132,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.214,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.736,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.546,
        "supplyDemandGapIMC_MLD": 1.522,
        "supplyDemandGapCPHEEO_MLD": 2.332
      },
      "2024": {
        "estimatedPopulation": 23047,
        "populationServedPipedWater": 11524,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.381,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.111,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.033,
        "supplyDemandGapIMC_MLD": 1.73,
        "supplyDemandGapCPHEEO_MLD": 2.652
      },
      "2029": {
        "estimatedPopulation": 28560,
        "populationServedPipedWater": 14280,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.711,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.856,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.998,
        "supplyDemandGapIMC_MLD": 2.145,
        "supplyDemandGapCPHEEO_MLD": 3.287
      }
    }
  },
  {
    "wardNumber": 64,
    "wardName": "Chitavad",
    "densityPerSqKm": 14361,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 9721,
        "populationServedPipedWater": 4860,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.582,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.312,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.701,
        "supplyDemandGapIMC_MLD": 0.73,
        "supplyDemandGapCPHEEO_MLD": 1.119
      },
      "2021": {
        "estimatedPopulation": 14928,
        "populationServedPipedWater": 7464,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.894,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.015,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.612,
        "supplyDemandGapIMC_MLD": 1.121,
        "supplyDemandGapCPHEEO_MLD": 1.718
      },
      "2024": {
        "estimatedPopulation": 16978,
        "populationServedPipedWater": 8489,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.017,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.292,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.971,
        "supplyDemandGapIMC_MLD": 1.275,
        "supplyDemandGapCPHEEO_MLD": 1.954
      },
      "2029": {
        "estimatedPopulation": 21039,
        "populationServedPipedWater": 10520,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.26,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.84,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.682,
        "supplyDemandGapIMC_MLD": 1.58,
        "supplyDemandGapCPHEEO_MLD": 2.422
      }
    }
  },
  {
    "wardNumber": 65,
    "wardName": "Sant Kanwarram",
    "densityPerSqKm": 27877,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 18870,
        "populationServedPipedWater": 9435,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.13,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.547,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.302,
        "supplyDemandGapIMC_MLD": 1.417,
        "supplyDemandGapCPHEEO_MLD": 2.172
      },
      "2021": {
        "estimatedPopulation": 28978,
        "populationServedPipedWater": 14489,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.736,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.912,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.071,
        "supplyDemandGapIMC_MLD": 2.176,
        "supplyDemandGapCPHEEO_MLD": 3.335
      },
      "2024": {
        "estimatedPopulation": 32958,
        "populationServedPipedWater": 16479,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.974,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.449,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.768,
        "supplyDemandGapIMC_MLD": 2.475,
        "supplyDemandGapCPHEEO_MLD": 3.794
      },
      "2029": {
        "estimatedPopulation": 40841,
        "populationServedPipedWater": 20420,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.446,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.514,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.147,
        "supplyDemandGapIMC_MLD": 3.068,
        "supplyDemandGapCPHEEO_MLD": 4.701
      }
    }
  },
  {
    "wardNumber": 66,
    "wardName": "Shahid Hemu Colony",
    "densityPerSqKm": 27997,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 18952,
        "populationServedPipedWater": 12319,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.537,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.559,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.317,
        "supplyDemandGapIMC_MLD": 1.022,
        "supplyDemandGapCPHEEO_MLD": 1.78
      },
      "2021": {
        "estimatedPopulation": 29103,
        "populationServedPipedWater": 18917,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.36,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.929,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.093,
        "supplyDemandGapIMC_MLD": 1.569,
        "supplyDemandGapCPHEEO_MLD": 2.733
      },
      "2024": {
        "estimatedPopulation": 33100,
        "populationServedPipedWater": 21515,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.684,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.468,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.793,
        "supplyDemandGapIMC_MLD": 1.784,
        "supplyDemandGapCPHEEO_MLD": 3.109
      },
      "2029": {
        "estimatedPopulation": 41017,
        "populationServedPipedWater": 26661,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.326,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.537,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.178,
        "supplyDemandGapIMC_MLD": 2.211,
        "supplyDemandGapCPHEEO_MLD": 3.852
      }
    }
  },
  {
    "wardNumber": 67,
    "wardName": "Maharaja Holkar",
    "densityPerSqKm": 62634,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 42398,
        "populationServedPipedWater": 33918,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.333,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.724,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.42,
        "supplyDemandGapIMC_MLD": 1.391,
        "supplyDemandGapCPHEEO_MLD": 3.087
      },
      "2021": {
        "estimatedPopulation": 65108,
        "populationServedPipedWater": 52086,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 6.654,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.79,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 11.394,
        "supplyDemandGapIMC_MLD": 2.136,
        "supplyDemandGapCPHEEO_MLD": 4.74
      },
      "2024": {
        "estimatedPopulation": 74049,
        "populationServedPipedWater": 59239,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.568,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 9.997,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 12.959,
        "supplyDemandGapIMC_MLD": 2.429,
        "supplyDemandGapCPHEEO_MLD": 5.391
      },
      "2029": {
        "estimatedPopulation": 91762,
        "populationServedPipedWater": 73410,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 9.378,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 12.388,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 16.058,
        "supplyDemandGapIMC_MLD": 3.01,
        "supplyDemandGapCPHEEO_MLD": 6.68
      }
    }
  },
  {
    "wardNumber": 68,
    "wardName": "Bambai Bajar",
    "densityPerSqKm": 118362,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 80121,
        "populationServedPipedWater": 64097,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.188,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.816,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 14.021,
        "supplyDemandGapIMC_MLD": 2.628,
        "supplyDemandGapCPHEEO_MLD": 5.833
      },
      "2021": {
        "estimatedPopulation": 123037,
        "populationServedPipedWater": 98430,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 12.574,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 16.61,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 21.531,
        "supplyDemandGapIMC_MLD": 4.036,
        "supplyDemandGapCPHEEO_MLD": 8.957
      },
      "2024": {
        "estimatedPopulation": 139934,
        "populationServedPipedWater": 111947,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 14.301,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 18.891,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 24.488,
        "supplyDemandGapIMC_MLD": 4.59,
        "supplyDemandGapCPHEEO_MLD": 10.187
      },
      "2029": {
        "estimatedPopulation": 173406,
        "populationServedPipedWater": 138725,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 17.722,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 23.41,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 30.346,
        "supplyDemandGapIMC_MLD": 5.688,
        "supplyDemandGapCPHEEO_MLD": 12.624
      }
    }
  },
  {
    "wardNumber": 69,
    "wardName": "Sukhdev Nagar",
    "densityPerSqKm": 41094,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 27817,
        "populationServedPipedWater": 18081,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.256,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.755,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.868,
        "supplyDemandGapIMC_MLD": 1.499,
        "supplyDemandGapCPHEEO_MLD": 2.612
      },
      "2021": {
        "estimatedPopulation": 42717,
        "populationServedPipedWater": 27766,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.464,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.767,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.475,
        "supplyDemandGapIMC_MLD": 2.303,
        "supplyDemandGapCPHEEO_MLD": 4.011
      },
      "2024": {
        "estimatedPopulation": 48583,
        "populationServedPipedWater": 31579,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.94,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.559,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.502,
        "supplyDemandGapIMC_MLD": 2.619,
        "supplyDemandGapCPHEEO_MLD": 4.562
      },
      "2029": {
        "estimatedPopulation": 60205,
        "populationServedPipedWater": 39133,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.883,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 8.128,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.536,
        "supplyDemandGapIMC_MLD": 3.245,
        "supplyDemandGapCPHEEO_MLD": 5.653
      }
    }
  },
  {
    "wardNumber": 70,
    "wardName": "Sudama Nagar",
    "densityPerSqKm": 33389,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 22602,
        "populationServedPipedWater": 14691,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.833,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.051,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.955,
        "supplyDemandGapIMC_MLD": 1.218,
        "supplyDemandGapCPHEEO_MLD": 2.122
      },
      "2021": {
        "estimatedPopulation": 34708,
        "populationServedPipedWater": 22560,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.815,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.686,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.074,
        "supplyDemandGapIMC_MLD": 1.871,
        "supplyDemandGapCPHEEO_MLD": 3.259
      },
      "2024": {
        "estimatedPopulation": 39474,
        "populationServedPipedWater": 25658,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.201,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.329,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.908,
        "supplyDemandGapIMC_MLD": 2.128,
        "supplyDemandGapCPHEEO_MLD": 3.707
      },
      "2029": {
        "estimatedPopulation": 48917,
        "populationServedPipedWater": 31796,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.967,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.604,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.56,
        "supplyDemandGapIMC_MLD": 2.637,
        "supplyDemandGapCPHEEO_MLD": 4.593
      }
    }
  },
  {
    "wardNumber": 71,
    "wardName": "Dravid Nagar",
    "densityPerSqKm": 26975,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 18260,
        "populationServedPipedWater": 9130,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.094,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.465,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.196,
        "supplyDemandGapIMC_MLD": 1.371,
        "supplyDemandGapCPHEEO_MLD": 2.102
      },
      "2021": {
        "estimatedPopulation": 28040,
        "populationServedPipedWater": 14020,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.68,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.785,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.907,
        "supplyDemandGapIMC_MLD": 2.105,
        "supplyDemandGapCPHEEO_MLD": 3.227
      },
      "2024": {
        "estimatedPopulation": 31891,
        "populationServedPipedWater": 15946,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.91,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.305,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.581,
        "supplyDemandGapIMC_MLD": 2.395,
        "supplyDemandGapCPHEEO_MLD": 3.671
      },
      "2029": {
        "estimatedPopulation": 39519,
        "populationServedPipedWater": 19760,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.367,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.335,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.916,
        "supplyDemandGapIMC_MLD": 2.968,
        "supplyDemandGapCPHEEO_MLD": 4.549
      }
    }
  },
  {
    "wardNumber": 72,
    "wardName": "Lokmanya Nagar",
    "densityPerSqKm": 27334,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 18503,
        "populationServedPipedWater": 9252,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.108,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.498,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.238,
        "supplyDemandGapIMC_MLD": 1.39,
        "supplyDemandGapCPHEEO_MLD": 2.13
      },
      "2021": {
        "estimatedPopulation": 28414,
        "populationServedPipedWater": 14207,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.702,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.836,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.972,
        "supplyDemandGapIMC_MLD": 2.134,
        "supplyDemandGapCPHEEO_MLD": 3.27
      },
      "2024": {
        "estimatedPopulation": 32316,
        "populationServedPipedWater": 16158,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.936,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.363,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.655,
        "supplyDemandGapIMC_MLD": 2.427,
        "supplyDemandGapCPHEEO_MLD": 3.719
      },
      "2029": {
        "estimatedPopulation": 40046,
        "populationServedPipedWater": 20023,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.399,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.406,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.008,
        "supplyDemandGapIMC_MLD": 3.007,
        "supplyDemandGapCPHEEO_MLD": 4.609
      }
    }
  },
  {
    "wardNumber": 73,
    "wardName": "Jawahar Marg",
    "densityPerSqKm": 40125,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 27161,
        "populationServedPipedWater": 17655,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.203,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.667,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.753,
        "supplyDemandGapIMC_MLD": 1.464,
        "supplyDemandGapCPHEEO_MLD": 2.55
      },
      "2021": {
        "estimatedPopulation": 41710,
        "populationServedPipedWater": 27112,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.383,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.631,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.299,
        "supplyDemandGapIMC_MLD": 2.248,
        "supplyDemandGapCPHEEO_MLD": 3.916
      },
      "2024": {
        "estimatedPopulation": 47438,
        "populationServedPipedWater": 30835,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.847,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.404,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.302,
        "supplyDemandGapIMC_MLD": 2.557,
        "supplyDemandGapCPHEEO_MLD": 4.455
      },
      "2029": {
        "estimatedPopulation": 58785,
        "populationServedPipedWater": 38210,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.767,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 7.936,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 10.287,
        "supplyDemandGapIMC_MLD": 3.169,
        "supplyDemandGapCPHEEO_MLD": 5.52
      }
    }
  },
  {
    "wardNumber": 74,
    "wardName": "Vishnupuri",
    "densityPerSqKm": 10140,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 6864,
        "populationServedPipedWater": 2059,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.266,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.927,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.201,
        "supplyDemandGapIMC_MLD": 0.661,
        "supplyDemandGapCPHEEO_MLD": 0.935
      },
      "2021": {
        "estimatedPopulation": 10541,
        "populationServedPipedWater": 3162,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.409,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.423,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.845,
        "supplyDemandGapIMC_MLD": 1.014,
        "supplyDemandGapCPHEEO_MLD": 1.436
      },
      "2024": {
        "estimatedPopulation": 11989,
        "populationServedPipedWater": 3597,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.465,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.619,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.098,
        "supplyDemandGapIMC_MLD": 1.154,
        "supplyDemandGapCPHEEO_MLD": 1.633
      },
      "2029": {
        "estimatedPopulation": 14856,
        "populationServedPipedWater": 4457,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.576,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.006,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.6,
        "supplyDemandGapIMC_MLD": 1.43,
        "supplyDemandGapCPHEEO_MLD": 2.024
      }
    }
  },
  {
    "wardNumber": 75,
    "wardName": "Palda",
    "densityPerSqKm": 3332,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 2256,
        "populationServedPipedWater": 677,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.088,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.305,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.395,
        "supplyDemandGapIMC_MLD": 0.217,
        "supplyDemandGapCPHEEO_MLD": 0.307
      },
      "2021": {
        "estimatedPopulation": 3464,
        "populationServedPipedWater": 1039,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.134,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.468,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.606,
        "supplyDemandGapIMC_MLD": 0.334,
        "supplyDemandGapCPHEEO_MLD": 0.472
      },
      "2024": {
        "estimatedPopulation": 3940,
        "populationServedPipedWater": 1182,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.153,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.532,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.69,
        "supplyDemandGapIMC_MLD": 0.379,
        "supplyDemandGapCPHEEO_MLD": 0.537
      },
      "2029": {
        "estimatedPopulation": 4882,
        "populationServedPipedWater": 1465,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.189,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.659,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.854,
        "supplyDemandGapIMC_MLD": 0.47,
        "supplyDemandGapCPHEEO_MLD": 0.665
      }
    }
  },
  {
    "wardNumber": 76,
    "wardName": "Mundala Nayata",
    "densityPerSqKm": 1121,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": "Lowest density ward in the city",
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 759,
        "populationServedPipedWater": 228,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.029,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.102,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.133,
        "supplyDemandGapIMC_MLD": 0.073,
        "supplyDemandGapCPHEEO_MLD": 0.104
      },
      "2021": {
        "estimatedPopulation": 1165,
        "populationServedPipedWater": 350,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.045,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.157,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.204,
        "supplyDemandGapIMC_MLD": 0.112,
        "supplyDemandGapCPHEEO_MLD": 0.159
      },
      "2024": {
        "estimatedPopulation": 1325,
        "populationServedPipedWater": 398,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.051,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.179,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.232,
        "supplyDemandGapIMC_MLD": 0.128,
        "supplyDemandGapCPHEEO_MLD": 0.181
      },
      "2029": {
        "estimatedPopulation": 1642,
        "populationServedPipedWater": 493,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.064,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.222,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.287,
        "supplyDemandGapIMC_MLD": 0.158,
        "supplyDemandGapCPHEEO_MLD": 0.223
      }
    }
  },
  {
    "wardNumber": 77,
    "wardName": "Bilawali",
    "densityPerSqKm": 1590,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 1076,
        "populationServedPipedWater": 323,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.042,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.145,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.188,
        "supplyDemandGapIMC_MLD": 0.103,
        "supplyDemandGapCPHEEO_MLD": 0.146
      },
      "2021": {
        "estimatedPopulation": 1653,
        "populationServedPipedWater": 496,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.064,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.223,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.289,
        "supplyDemandGapIMC_MLD": 0.159,
        "supplyDemandGapCPHEEO_MLD": 0.225
      },
      "2024": {
        "estimatedPopulation": 1880,
        "populationServedPipedWater": 564,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.073,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.254,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.329,
        "supplyDemandGapIMC_MLD": 0.181,
        "supplyDemandGapCPHEEO_MLD": 0.256
      },
      "2029": {
        "estimatedPopulation": 2330,
        "populationServedPipedWater": 699,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.09,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.315,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.408,
        "supplyDemandGapIMC_MLD": 0.225,
        "supplyDemandGapCPHEEO_MLD": 0.318
      }
    }
  },
  {
    "wardNumber": 78,
    "wardName": "Choithram",
    "densityPerSqKm": 9148,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 6192,
        "populationServedPipedWater": 1858,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.24,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.836,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.084,
        "supplyDemandGapIMC_MLD": 0.596,
        "supplyDemandGapCPHEEO_MLD": 0.844
      },
      "2021": {
        "estimatedPopulation": 9509,
        "populationServedPipedWater": 2853,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.369,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.284,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.664,
        "supplyDemandGapIMC_MLD": 0.915,
        "supplyDemandGapCPHEEO_MLD": 1.295
      },
      "2024": {
        "estimatedPopulation": 10815,
        "populationServedPipedWater": 3244,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.42,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.46,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.893,
        "supplyDemandGapIMC_MLD": 1.04,
        "supplyDemandGapCPHEEO_MLD": 1.473
      },
      "2029": {
        "estimatedPopulation": 13402,
        "populationServedPipedWater": 4021,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.52,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.809,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.345,
        "supplyDemandGapIMC_MLD": 1.289,
        "supplyDemandGapCPHEEO_MLD": 1.825
      }
    }
  },
  {
    "wardNumber": 79,
    "wardName": "Sukh Niwas",
    "densityPerSqKm": 1941,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 1314,
        "populationServedPipedWater": 394,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.051,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.177,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.23,
        "supplyDemandGapIMC_MLD": 0.126,
        "supplyDemandGapCPHEEO_MLD": 0.179
      },
      "2021": {
        "estimatedPopulation": 2018,
        "populationServedPipedWater": 605,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.078,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.272,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.353,
        "supplyDemandGapIMC_MLD": 0.194,
        "supplyDemandGapCPHEEO_MLD": 0.275
      },
      "2024": {
        "estimatedPopulation": 2295,
        "populationServedPipedWater": 688,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.089,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.31,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.402,
        "supplyDemandGapIMC_MLD": 0.221,
        "supplyDemandGapCPHEEO_MLD": 0.313
      },
      "2029": {
        "estimatedPopulation": 2844,
        "populationServedPipedWater": 853,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.11,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 0.384,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 0.498,
        "supplyDemandGapIMC_MLD": 0.274,
        "supplyDemandGapCPHEEO_MLD": 0.388
      }
    }
  },
  {
    "wardNumber": 80,
    "wardName": "Dr. Rajendra Prasad",
    "densityPerSqKm": 19669,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 13314,
        "populationServedPipedWater": 6657,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 0.798,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.797,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.33,
        "supplyDemandGapIMC_MLD": 0.999,
        "supplyDemandGapCPHEEO_MLD": 1.532
      },
      "2021": {
        "estimatedPopulation": 20446,
        "populationServedPipedWater": 10223,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.225,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.76,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.578,
        "supplyDemandGapIMC_MLD": 1.535,
        "supplyDemandGapCPHEEO_MLD": 2.353
      },
      "2024": {
        "estimatedPopulation": 23254,
        "populationServedPipedWater": 11627,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.393,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.139,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.069,
        "supplyDemandGapIMC_MLD": 1.746,
        "supplyDemandGapCPHEEO_MLD": 2.676
      },
      "2029": {
        "estimatedPopulation": 28816,
        "populationServedPipedWater": 14408,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.726,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.89,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.043,
        "supplyDemandGapIMC_MLD": 2.164,
        "supplyDemandGapCPHEEO_MLD": 3.317
      }
    }
  },
  {
    "wardNumber": 81,
    "wardName": "Annapurna",
    "densityPerSqKm": 25754,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 17433,
        "populationServedPipedWater": 8716,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.044,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.353,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.051,
        "supplyDemandGapIMC_MLD": 1.309,
        "supplyDemandGapCPHEEO_MLD": 2.007
      },
      "2021": {
        "estimatedPopulation": 26771,
        "populationServedPipedWater": 13386,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.604,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.614,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.685,
        "supplyDemandGapIMC_MLD": 2.01,
        "supplyDemandGapCPHEEO_MLD": 3.081
      },
      "2024": {
        "estimatedPopulation": 30447,
        "populationServedPipedWater": 15224,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.824,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.11,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.328,
        "supplyDemandGapIMC_MLD": 2.286,
        "supplyDemandGapCPHEEO_MLD": 3.504
      },
      "2029": {
        "estimatedPopulation": 37731,
        "populationServedPipedWater": 18866,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.26,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.094,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.603,
        "supplyDemandGapIMC_MLD": 2.834,
        "supplyDemandGapCPHEEO_MLD": 4.343
      }
    }
  },
  {
    "wardNumber": 82,
    "wardName": "Vrindavan",
    "densityPerSqKm": 35040,
    "densityClass": "High-Medium",
    "densityClassRange": "27997-47061",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 23719,
        "populationServedPipedWater": 15417,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 1.924,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.202,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.151,
        "supplyDemandGapIMC_MLD": 1.278,
        "supplyDemandGapCPHEEO_MLD": 2.227
      },
      "2021": {
        "estimatedPopulation": 36424,
        "populationServedPipedWater": 23676,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 2.954,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.917,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.374,
        "supplyDemandGapIMC_MLD": 1.963,
        "supplyDemandGapCPHEEO_MLD": 3.42
      },
      "2024": {
        "estimatedPopulation": 41426,
        "populationServedPipedWater": 26927,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 3.36,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.593,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 7.25,
        "supplyDemandGapIMC_MLD": 2.233,
        "supplyDemandGapCPHEEO_MLD": 3.89
      },
      "2029": {
        "estimatedPopulation": 51335,
        "populationServedPipedWater": 33368,
        "coveragePercent": 65,
        "perCapitaSupplyLPCD": 81.1,
        "totalSupplyMLD": 4.163,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.93,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.984,
        "supplyDemandGapIMC_MLD": 2.767,
        "supplyDemandGapCPHEEO_MLD": 4.821
      }
    }
  },
  {
    "wardNumber": 83,
    "wardName": "Gumashta Nagar",
    "densityPerSqKm": 26338,
    "densityClass": "Low-Medium",
    "densityClassRange": "14103-27877",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 17829,
        "populationServedPipedWater": 8914,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.068,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.407,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.12,
        "supplyDemandGapIMC_MLD": 1.339,
        "supplyDemandGapCPHEEO_MLD": 2.052
      },
      "2021": {
        "estimatedPopulation": 27378,
        "populationServedPipedWater": 13689,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.64,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 3.696,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 4.791,
        "supplyDemandGapIMC_MLD": 2.056,
        "supplyDemandGapCPHEEO_MLD": 3.151
      },
      "2024": {
        "estimatedPopulation": 31138,
        "populationServedPipedWater": 15569,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 1.865,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 4.204,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 5.449,
        "supplyDemandGapIMC_MLD": 2.339,
        "supplyDemandGapCPHEEO_MLD": 3.584
      },
      "2029": {
        "estimatedPopulation": 38586,
        "populationServedPipedWater": 19293,
        "coveragePercent": 50,
        "perCapitaSupplyLPCD": 59.9,
        "totalSupplyMLD": 2.311,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 5.209,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 6.753,
        "supplyDemandGapIMC_MLD": 2.898,
        "supplyDemandGapCPHEEO_MLD": 4.442
      }
    }
  },
  {
    "wardNumber": 84,
    "wardName": "Dwarkapuri",
    "densityPerSqKm": 72160,
    "densityClass": "High",
    "densityClassRange": "47205-178726",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 48846,
        "populationServedPipedWater": 39077,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 4.992,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 6.594,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 8.548,
        "supplyDemandGapIMC_MLD": 1.602,
        "supplyDemandGapCPHEEO_MLD": 3.556
      },
      "2021": {
        "estimatedPopulation": 75010,
        "populationServedPipedWater": 60008,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 7.666,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 10.126,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 13.127,
        "supplyDemandGapIMC_MLD": 2.46,
        "supplyDemandGapCPHEEO_MLD": 5.461
      },
      "2024": {
        "estimatedPopulation": 85311,
        "populationServedPipedWater": 68249,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 8.719,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 11.517,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 14.929,
        "supplyDemandGapIMC_MLD": 2.798,
        "supplyDemandGapCPHEEO_MLD": 6.21
      },
      "2029": {
        "estimatedPopulation": 105718,
        "populationServedPipedWater": 84574,
        "coveragePercent": 80,
        "perCapitaSupplyLPCD": 102.2,
        "totalSupplyMLD": 10.804,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 14.272,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 18.501,
        "supplyDemandGapIMC_MLD": 3.468,
        "supplyDemandGapCPHEEO_MLD": 7.697
      }
    }
  },
  {
    "wardNumber": 85,
    "wardName": "Prajapat Nagar",
    "densityPerSqKm": 13139,
    "densityClass": "Low",
    "densityClassRange": "1121-13607",
    "note": null,
    "densityEstimated": false,
    "waterByYear": {
      "2011": {
        "estimatedPopulation": 8894,
        "populationServedPipedWater": 2668,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.345,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.201,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 1.556,
        "supplyDemandGapIMC_MLD": 0.856,
        "supplyDemandGapCPHEEO_MLD": 1.211
      },
      "2021": {
        "estimatedPopulation": 13658,
        "populationServedPipedWater": 4097,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.53,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 1.844,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.39,
        "supplyDemandGapIMC_MLD": 1.314,
        "supplyDemandGapCPHEEO_MLD": 1.86
      },
      "2024": {
        "estimatedPopulation": 15534,
        "populationServedPipedWater": 4660,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.603,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.097,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 2.718,
        "supplyDemandGapIMC_MLD": 1.494,
        "supplyDemandGapCPHEEO_MLD": 2.115
      },
      "2029": {
        "estimatedPopulation": 19249,
        "populationServedPipedWater": 5775,
        "coveragePercent": 30,
        "perCapitaSupplyLPCD": 38.8,
        "totalSupplyMLD": 0.747,
        "perCapitaDemandIMC_LPCD": 135,
        "totalDemandIMC_MLD": 2.599,
        "perCapitaDemandCPHEEO_LPCD": 175,
        "totalDemandCPHEEO_MLD": 3.369,
        "supplyDemandGapIMC_MLD": 1.852,
        "supplyDemandGapCPHEEO_MLD": 2.622
      }
    }
  }
];

// ---------------------------------------------------------------
// 2. CITY-WIDE WATER SUMMARY (real figures from source, ~2008-09
//    baseline, plus this analysis's city-level projections)
// ---------------------------------------------------------------
export const cityWaterSummary = {
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",

  baselineYear: "2008-09",

  // --- Actual reported figures (from source, NOT estimated) ---
  reportedBaseline: {
    totalWaterSuppliedMLD: 204,
    perCapitaSupplyLPCD: 113,
    perCapitaSupplyFieldSurveyLPCD: 87,
    leakageLossPercent: 35,
    actualSupplyAfterLeakageMLD: 133,
    perCapitaSupplyAfterLeakageLPCD: 74,
    populationServedPercent: 54,
    householdsWithoutPipedWaterPercent: 46,
    waterAvailabilityHoursPerDay: 0.75,
    supplyFrequency: "Alternate days",

    demandIMC_MLD: 243,
    perCapitaDemandIMC_LPCD: 135,
    demandCPHEEO_MLD: 315,
    perCapitaDemandCPHEEO_LPCD: 175,
    demandSupplyGapPercent: 16,

    sources: {
      surfaceWaterPercent: 94,
      groundwaterPercent: 6,
      narmadaRiver: { distanceKm: 70, capacityMLD: 210, supplyMLD: 160 },
      yashwantSagar: { distanceKm: 21, capacityMLD: 38, supplyMLD: 27 },
      bilawaliTank: { distanceKm: 5, capacityMLD: 9, supplyMLD: 4 },
      groundwaterTubewells: { capacityMLD: 27, supplyMLD: 13 }
    },

    treatmentCapacityMLD: 185,
    actualTreatmentMLD: 182,

    waterEmergency: {
      declaredYear: 2009,
      triggerYear: 2008,
      significance: "First city in India to declare a water emergency",
      rainfall2008mm: 517,
      regionAverageRainfallMm: 1092
    }
  },

  // --- City-wide totals for the 4 model years (sum of ward estimates above) ---
  // Population figures: 2011 & 2021 are census-actual; 2024 & 2029 are
  // CAGR-projected (≈4.38%/yr, derived from the 2011→2021 census trend).
  modeledCityTotals: {
    "2011": {
      population: 1994397,
      totalSupplyMLD: 173.5,
      totalDemandIMC_MLD: 269.2,
      totalDemandCPHEEO_MLD: 349.0,
      note: "Population is census-actual; water figures are this model's ward-level rollup, not source-reported."
    },
    "2021": {
      population: 3062657,
      totalSupplyMLD: 266.5,
      totalDemandIMC_MLD: 413.5,
      totalDemandCPHEEO_MLD: 536.0,
      note: "Population is census-actual; water figures are this model's ward-level rollup, not source-reported."
    },
    "2024": {
      population: 3483248,
      totalSupplyMLD: 303.1,
      totalDemandIMC_MLD: 470.2,
      totalDemandCPHEEO_MLD: 609.6,
      note: "Population and water figures are both projected/modeled — no source data exists for this year."
    },
    "2029": {
      population: 4316460,
      totalSupplyMLD: 375.6,
      totalDemandIMC_MLD: 582.7,
      totalDemandCPHEEO_MLD: 755.4,
      note: "Population and water figures are both projected/modeled — no source data exists for this year."
    }
  },

  populationProjection: {
    method: "Compound Annual Growth Rate (CAGR) derived from 2011-2021 census figures",
    cagrPercent: 4.383,
    basis: "pop_2011=1,994,397 -> pop_2021=3,062,657 (matches source's reported 53.5% decadal growth)"
  },

  futureSupplyPlans: {
    narmadaPhaseIII: {
      fundingSource: "ADB (Asian Development Bank)",
      estimatedCostINRCrore: 670,
      additionalSupplyMLD: 365,
      totalSupplyAfterCompletionMLD: 585,
      originallyPlannedCompletionYear: 2009,
      designedToMeetDemandForYear: 2039,
      status: "Delayed; first two phases received only about one-third of the water projected in original plans"
    },
    yashwantSagarUpgrade: {
      proposal: "Build an RCC barrage and double capacity to 90 MLD",
      limitation: "Dependent on adequate rainfall, which has been poor in recent years"
    },
    bilawaliTankProject: {
      costINRCrore: 26,
      scope: "8 overhead service reservoirs, ~20 km of feeder/distribution mains, a 9-MLD treatment plant",
      status: "Near complete but underutilised due to insufficient source water from poor rainfall"
    },
    note: "If Narmada Phase III or other augmentation projects complete, actual future supply could be significantly higher than this model's flat-LPCD projection assumes. This dataset does NOT factor in planned augmentation — it projects forward assuming current (2008-09 baseline) per-capita supply levels stay flat while population grows."
  },

  source: "City water and sewage profile compiled from IMC, CPHEEO and CPCB data (~2008-09 baseline), combined with: Kaur, P. (2024). Population Growth and Changing Land-use Patterns in Indore City. IJNRD, 9(8)."
};

// ---------------------------------------------------------------
// 3. ESTIMATION PARAMETERS USED (for transparency / re-use)
// ---------------------------------------------------------------
export const estimationParameters = {
  wardSupplyLPCDByDensityClass: {
    "Low": 38.8,
    "Low-Medium": 59.9,
    "High-Medium": 81.1,
    "High": 102.2
  },
  wardCoveragePercentByDensityClass: {
    "Low": 30,
    "Low-Medium": 50,
    "High-Medium": 65,
    "High": 80
  },
  demandNormsLPCD: {
    IMC: 135,
    CPHEEO: 175
  },
  populationCAGRPercent: 4.383,
  note: "These parameters were calibrated so the population-weighted average across all wards reproduces the source's actual city-wide field-surveyed supply of 87 LPCD. Adjust here if better ward-level data becomes available — all ward records were generated using these exact values."
};