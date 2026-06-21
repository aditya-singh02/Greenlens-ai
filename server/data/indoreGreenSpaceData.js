/**
 * Indore City — Ward-wise Open Space & Greenery Data (2021)
 * ---------------------------------------------------------------
 * Source: Kaur, P. (2024). Impact of Population Growth on Open
 * Space in Indore City. International Journal of Novel Research
 * and Development (IJNRD), 9(7).
 *
 * This is REAL, MEASURED ward-level data (not modeled/estimated
 * like the water-supply file) — the source author digitized actual
 * open-space polygons per ward using GIS software (Google Earth Pro,
 * Global Mapper, ArcGIS), achieving >95% accuracy, based on the 2021
 * IMC ward map and 9 open-space types: water bodies, dry beds of
 * water bodies, parks, playgrounds/maidans/vacant land,
 * crematorium/burial grounds, cultivated lands, orchards/city
 * forests, nurseries, and rocky outcrop/barren land.
 *
 * TWO METRICS ARE TRACKED PER WARD:
 *   1. totalOpenSpace_m2      — absolute open space area in the ward
 *   2. perCapitaOpenSpace_m2  — open space per resident (area ÷ ward
 *                                population). This is the metric used
 *                                to judge ADEQUACY against the URDPFI
 *                                national planning standard of
 *                                12 m²/person (WHO's global minimum
 *                                is 9 m²/person).
 *
 * A ward can be high on one metric and low on the other — e.g. a
 * large ward with a huge population can have lots of total open
 * space but still fail the per-capita adequacy standard.
 *
 * ====================== DATA COMPLETENESS ======================
 * - All 85 wards have a CATEGORY assigned for both metrics (5 total-
 *   area categories: Negligible/Very Low/Low/Medium/High; 6 per-
 *   capita categories: same plus "Very High"). These category
 *   assignments come from the source's own ward-number tables
 *   (Table 1 and Table 2) and are considered reliable.
 * - 80 of 85 wards also have an EXACT total area value (m²), and
 *   84 of 85 have an EXACT per-capita value (m²/person), pulled
 *   from the source's prose descriptions of named wards.
 * - Ward #25 has NO name in any available source and consequently
 *   no exact values — category only.
 * - Wards #4 (Haji Colony), #20 (Gauri Nagar), #49 (Tilak Nagar),
 *   #63 (Navlakha) are missing only their exact TOTAL AREA value
 *   (the source's prose didn't give an exact m² figure for the
 *   total-area metric for these, only for per-capita) — category
 *   range is still known.
 *
 * ====================== SOURCE DATA ISSUES FLAGGED ==============
 * Three inconsistencies were found WITHIN the source PDF itself
 * (not introduced by this processing) and are preserved/flagged on
 * the affected ward records rather than silently corrected:
 *
 * 1. Ward #16 "Nand Bagh": text states total area as "4,18,078 m²
 *    / 4.1 km²" — internally inconsistent, since 418,078 m² = only
 *    0.418 km². We use 4,180,780 m² (matches both the "Medium"
 *    category range and the stated 4.1 km²), flagged via
 *    `totalAreaSourceTypoFlag`.
 *
 * 2. Ward #18 "Sant Kabir": listed under the "Very High" per-capita
 *    category (101.56-777.35 m²/person) but given a value of only
 *    25.4 m²/person, which doesn't fit that range at all (and is
 *    barely above the separate "Medium" category's upper bound of
 *    23.71). Possibly a digit was dropped (e.g. intended ~254).
 *    Flagged via `categoryValueMismatchFlag`.
 *
 * 3. Ward #82 "Vrindavan": listed under the "Very Low" per-capita
 *    category (1.60-5.98 m²/person) in the source's own ward-number
 *    table, but its prose-stated value (7.7) actually falls in the
 *    "Low" category range instead. Flagged via
 *    `categoryValueMismatchFlag`.
 *
 * Additionally, two ward names — "Ravji Bajar" and "Laxman Singh
 * Chauhan" — each appear TWICE in the source's prose (once per
 * category section) with two different values, creating an
 * unresolvable collision for wards #30 and #62 respectively. Their
 * exact m² values were left null and flagged via
 * `nameCollisionFlag`, while their category-range data (which comes
 * from the more reliable ward-NUMBER tables) is preserved.
 * ================================================================
 */

// ---------------------------------------------------------------
// 1. WARD-WISE OPEN SPACE / GREENERY DATA (all 85 wards)
// ---------------------------------------------------------------
export const wardGreeneryData = [
  {
    "wardNumber": 1,
    "wardName": "Sirpur",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1571989,
    "perCapitaOpenSpace_m2": 41.13,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 2,
    "wardName": "Chandan Nagar",
    "totalOpenSpaceCategory": "Negligible",
    "totalOpenSpaceCategoryRange_m2": "2248-5542",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 2248,
    "perCapitaOpenSpace_m2": 0.05,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 3,
    "wardName": "Pashupati Nath",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 434734,
    "perCapitaOpenSpace_m2": 12.6,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 4,
    "wardName": "Haji Colony",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": 6.84,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 5,
    "wardName": "Raj Nagar",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 50285,
    "perCapitaOpenSpace_m2": 1.24,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 6,
    "wardName": "Malharganj",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 147441,
    "perCapitaOpenSpace_m2": 3.9,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 7,
    "wardName": "Janta Colony",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 491739,
    "perCapitaOpenSpace_m2": 13.31,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 8,
    "wardName": "Juna Risala",
    "totalOpenSpaceCategory": "Negligible",
    "totalOpenSpaceCategoryRange_m2": "2248-5542",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 3675,
    "perCapitaOpenSpace_m2": 0.09,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 9,
    "wardName": "Kushvah Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 371899,
    "perCapitaOpenSpace_m2": 9.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 10,
    "wardName": "Banganga",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 99261,
    "perCapitaOpenSpace_m2": 2.51,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 11,
    "wardName": "Bhagirathpura",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 659883,
    "perCapitaOpenSpace_m2": 18.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 12,
    "wardName": "Govind Colony",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 73006,
    "perCapitaOpenSpace_m2": 2.04,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 13,
    "wardName": "Sangam Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 139359,
    "perCapitaOpenSpace_m2": 3.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 14,
    "wardName": "Ashok Nagar",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1666646,
    "perCapitaOpenSpace_m2": 43.53,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 15,
    "wardName": "Bijasan",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 2178790,
    "perCapitaOpenSpace_m2": 538.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 16,
    "wardName": "Nand Bagh",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 4180780,
    "perCapitaOpenSpace_m2": 103.1,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false,
    "totalAreaSourceTypoFlag": true,
    "totalAreaSourceTypoNote": "Source PDF text states '4,18,078 m2 / 4.1 km2' for this ward, which is internally inconsistent (4,18,078 m2 = 0.418 km2, not 4.1 km2). Since this ward's category is 'Medium' (range 1,082,073-8,239,240 m2), only the larger interpretation (4,180,780 m2 / 4.1 km2) fits the category and matches the stated km2 value. We use 4,180,780 m2 here, but flag this as a likely digit-dropping typo in the original source."
  },
  {
    "wardNumber": 17,
    "wardName": "Sant Ravidas",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 316643,
    "perCapitaOpenSpace_m2": 8.75,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 18,
    "wardName": "Sant Kabir",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 5124136,
    "perCapitaOpenSpace_m2": 25.4,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": true,
    "categoryValueMismatchNote": "perCapitaOpenSpace_m2 (25.4) falls outside this ward's assigned perCapitaCategory range ('Very High', 101.56-777.35) per the source PDF's own ward-number list (Table 2). The prose text lists 25.4 under the 'Very High' category heading directly, which is internally contradictory (25.4 actually falls in the 'Medium' range, 13.05-23.71...just above it). This is an inconsistency within the source document itself, not introduced by this processing. Possible the source intended a value like 254 m2/person (typo dropping a digit)."
  },
  {
    "wardNumber": 19,
    "wardName": "Vishvakarma",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 3786704,
    "perCapitaOpenSpace_m2": 101.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 20,
    "wardName": "Gauri Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": 23.23,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 21,
    "wardName": "Shyam Nagar",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1198267,
    "perCapitaOpenSpace_m2": 38.8,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 22,
    "wardName": "Pandit Dindayal Upadhyay",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 166869,
    "perCapitaOpenSpace_m2": 5.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 23,
    "wardName": "Swargiya Rajesh Joshi",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 241571,
    "perCapitaOpenSpace_m2": 7.1,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 24,
    "wardName": "Sant Balajinath Maharaj",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 295446,
    "perCapitaOpenSpace_m2": 7.82,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 25,
    "wardName": null,
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": null,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 26,
    "wardName": "Jeen Mata",
    "totalOpenSpaceCategory": "Negligible",
    "totalOpenSpaceCategoryRange_m2": "2248-5542",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 4418,
    "perCapitaOpenSpace_m2": 0.14,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 27,
    "wardName": "Snehalata Ganj",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 557629,
    "perCapitaOpenSpace_m2": 13.7,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 28,
    "wardName": "Ma Tuleja Bhavani",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 224255,
    "perCapitaOpenSpace_m2": 6.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 29,
    "wardName": "Dr. S.P. Mukherjee",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 290414,
    "perCapitaOpenSpace_m2": 8.7,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 30,
    "wardName": "Ravji Bajar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": null,
    "nameCollisionFlag": true,
    "nameCollisionNote": "Ward name 'Ravji Bajar' appears twice in the source PDF's prose (once in each of two different category sections), with two different exact values. Since this ward's number-list category assignment doesn't match either prose value's implied category, the exact value could not be reliably attributed to THIS ward number. Category-level range is still reliable; exact m2 value is not.",
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 31,
    "wardName": "Maharaja Chatrasal",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 755069,
    "perCapitaOpenSpace_m2": 23.71,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 32,
    "wardName": "Atal Bihari Vajpeyi",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 541230,
    "perCapitaOpenSpace_m2": 17.67,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 33,
    "wardName": "Sukhliya",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 354736,
    "perCapitaOpenSpace_m2": 11.24,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 34,
    "wardName": "Shahid Bhagat Singh",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1136843,
    "perCapitaOpenSpace_m2": 36.94,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 35,
    "wardName": "Lasudiya Mori",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 1032196,
    "perCapitaOpenSpace_m2": 332.9,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 36,
    "wardName": "Nipaniya",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 1129329,
    "perCapitaOpenSpace_m2": 284.8,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 37,
    "wardName": "Sai Krupa",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1488931,
    "perCapitaOpenSpace_m2": 45.38,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 38,
    "wardName": "Nanda Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 155292,
    "perCapitaOpenSpace_m2": 4.79,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 39,
    "wardName": "Nahar Shahvali",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 3028560,
    "perCapitaOpenSpace_m2": 73.61,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 40,
    "wardName": "Khajrana Ganesh",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 248710,
    "perCapitaOpenSpace_m2": 8.06,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 41,
    "wardName": "Kailashpuri",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 598184,
    "perCapitaOpenSpace_m2": 17.04,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 42,
    "wardName": "Swami Vivekanand",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 258899,
    "perCapitaOpenSpace_m2": 8.29,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 43,
    "wardName": "Shri Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 100464,
    "perCapitaOpenSpace_m2": 3.24,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 44,
    "wardName": "H.I.G.",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 68212,
    "perCapitaOpenSpace_m2": 2.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 45,
    "wardName": "Bhim Rao Ambedkar",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 54101,
    "perCapitaOpenSpace_m2": 1.66,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 46,
    "wardName": "Somnath",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 28153,
    "perCapitaOpenSpace_m2": 0.89,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 47,
    "wardName": "Sardar Vallabhbhai Patel",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 418249,
    "perCapitaOpenSpace_m2": 11.34,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 48,
    "wardName": "Gita Bhavan",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 172177,
    "perCapitaOpenSpace_m2": 5.9,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 49,
    "wardName": "Tilak Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": 7.73,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 50,
    "wardName": "Brajeshwari",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1550389,
    "perCapitaOpenSpace_m2": 39.2,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 51,
    "wardName": "Bhagvati Nagar",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1234957,
    "perCapitaOpenSpace_m2": 33.6,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 52,
    "wardName": "Musakhedi",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 141832,
    "perCapitaOpenSpace_m2": 4.35,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 53,
    "wardName": "Dr. Maulana Azad",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 71314,
    "perCapitaOpenSpace_m2": 1.7,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 54,
    "wardName": "Residency",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1816063,
    "perCapitaOpenSpace_m2": 46.8,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 55,
    "wardName": "Sauth Tukoganj",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1082073,
    "perCapitaOpenSpace_m2": 34.9,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 56,
    "wardName": "Imli Bajar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 222386,
    "perCapitaOpenSpace_m2": 6.4,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 57,
    "wardName": "Devi Ahilya Bai",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 818662,
    "perCapitaOpenSpace_m2": 21.12,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 58,
    "wardName": "Loknayak Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 157850,
    "perCapitaOpenSpace_m2": 4.63,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 59,
    "wardName": "Harsiddhi",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 60531,
    "perCapitaOpenSpace_m2": 1.9,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 60,
    "wardName": "Ranipura",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 53712,
    "perCapitaOpenSpace_m2": 1.6,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 61,
    "wardName": "Tatya Sarwate",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 19766,
    "perCapitaOpenSpace_m2": 0.64,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 62,
    "wardName": "Laxman Singh Chauhan",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": null,
    "nameCollisionFlag": true,
    "nameCollisionNote": "Ward name 'Laxman Singh Chauhan' appears twice in the source PDF's prose (once in each of two different category sections), with two different exact values. Since this ward's number-list category assignment doesn't match either prose value's implied category, the exact value could not be reliably attributed to THIS ward number. Category-level range is still reliable; exact m2 value is not.",
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 63,
    "wardName": "Navlakha",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": null,
    "perCapitaOpenSpace_m2": 8.64,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 64,
    "wardName": "Chitavad",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1415412,
    "perCapitaOpenSpace_m2": 34.2,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 65,
    "wardName": "Sant Kanwarram",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 147441,
    "perCapitaOpenSpace_m2": 4.16,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 66,
    "wardName": "Shahid Hemu Colony",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 331133,
    "perCapitaOpenSpace_m2": 9.17,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 67,
    "wardName": "Maharaja Holkar",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 64879,
    "perCapitaOpenSpace_m2": 2.07,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 68,
    "wardName": "Bambai Bajar",
    "totalOpenSpaceCategory": "Very Low",
    "totalOpenSpaceCategoryRange_m2": "13159-99261",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 13159,
    "perCapitaOpenSpace_m2": 0.42,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 69,
    "wardName": "Sukhdev Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 111136,
    "perCapitaOpenSpace_m2": 3.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 70,
    "wardName": "Sudama Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 132227,
    "perCapitaOpenSpace_m2": 3.2,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 71,
    "wardName": "Dravid Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 248978,
    "perCapitaOpenSpace_m2": 7.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 72,
    "wardName": "Lokmanya Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 257534,
    "perCapitaOpenSpace_m2": 8.12,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 73,
    "wardName": "Jawahar Marg",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 146105,
    "perCapitaOpenSpace_m2": 4.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 74,
    "wardName": "Vishnupuri",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1947969,
    "perCapitaOpenSpace_m2": 47.6,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 75,
    "wardName": "Palda",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 8239240,
    "perCapitaOpenSpace_m2": 209.5,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 76,
    "wardName": "Mundala Nayata",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 2701906,
    "perCapitaOpenSpace_m2": 777.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 77,
    "wardName": "Bilawali",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 2170114,
    "perCapitaOpenSpace_m2": 525.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 78,
    "wardName": "Choithram",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 1755440,
    "perCapitaOpenSpace_m2": 43.61,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 79,
    "wardName": "Sukh Niwas",
    "totalOpenSpaceCategory": "High",
    "totalOpenSpaceCategoryRange_m2": "10321926-27019060",
    "perCapitaCategory": "Very High",
    "perCapitaCategoryRange_m2_per_person": "101.56-777.35",
    "totalOpenSpace_m2": 1564406,
    "perCapitaOpenSpace_m2": 378.0,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 80,
    "wardName": "Dr. Rajendra Prasad",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 714207,
    "perCapitaOpenSpace_m2": 17.37,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 81,
    "wardName": "Annapurna",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Medium",
    "perCapitaCategoryRange_m2_per_person": "13.05-23.71",
    "totalOpenSpace_m2": 527691,
    "perCapitaOpenSpace_m2": 13.05,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 82,
    "wardName": "Vrindavan",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Very Low",
    "perCapitaCategoryRange_m2_per_person": "1.60-5.98",
    "totalOpenSpace_m2": 281405,
    "perCapitaOpenSpace_m2": 7.7,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": true,
    "categoryValueMismatchNote": "perCapitaOpenSpace_m2 (7.7) falls outside this ward's assigned perCapitaCategory range ('Very Low', 1.60-5.98) per the source PDF's own ward-number list (Table 2). The prose text lists 7.7 under the 'Low' category heading (6.43-12.64) instead. This is an inconsistency within the source document itself, not introduced by this processing."
  },
  {
    "wardNumber": 83,
    "wardName": "Gumashta Nagar",
    "totalOpenSpaceCategory": "Low",
    "totalOpenSpaceCategoryRange_m2": "100464-920959",
    "perCapitaCategory": "Low",
    "perCapitaCategoryRange_m2_per_person": "6.43-12.64",
    "totalOpenSpace_m2": 281619,
    "perCapitaOpenSpace_m2": 6.8,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 84,
    "wardName": "Dwarkapuri",
    "totalOpenSpaceCategory": "Negligible",
    "totalOpenSpaceCategoryRange_m2": "2248-5542",
    "perCapitaCategory": "Negligible",
    "perCapitaCategoryRange_m2_per_person": "0.05-1.24",
    "totalOpenSpace_m2": 5542,
    "perCapitaOpenSpace_m2": 0.14,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  },
  {
    "wardNumber": 85,
    "wardName": "Prajapat Nagar",
    "totalOpenSpaceCategory": "Medium",
    "totalOpenSpaceCategoryRange_m2": "1082073-8239240",
    "perCapitaCategory": "High",
    "perCapitaCategoryRange_m2_per_person": "33.66-73.61",
    "totalOpenSpace_m2": 2927182,
    "perCapitaOpenSpace_m2": 50.14,
    "nameCollisionFlag": false,
    "categoryValueMismatchFlag": false
  }
];

// ---------------------------------------------------------------
// 2. CITY-LEVEL GREENERY CONTEXT — highest-greenery wards & the
//    maximum open-space value found within each defined category
// ---------------------------------------------------------------
export const cityGreenerySummary = {
  "city": "Indore",
  "totalWards": 85,
  "wardsBelowURDPFIStandard": 49,
  "urdpfiStandardM2PerCapita": 12,
  "whoMinimumM2PerCapita": 9,
  "standardSource": "Urban and Regional Development Plans Formulation and Implementation (URDPFI) guidelines",
  "perCapitaRangeAcrossCity_m2": {
    "min": 0.05,
    "max": 777.35
  },
  "dataYear": 2021,
  "dataCollectionMethod": "Ward-wise digitization of 9 open-space types (water bodies, dry beds of water bodies, parks, playgrounds/maidans/vacant land, crematorium/burial grounds, cultivated lands, orchards/city forests, nurseries, rocky outcrop/barren land) using Google Earth Pro, Global Mapper, and ArcGIS GIS software. Accuracy rate: >95%.",
  "highestGreeneryWards_byTotalArea": [
    {
      "wardNumber": 75,
      "wardName": "Palda",
      "totalOpenSpace_m2": 8239240
    },
    {
      "wardNumber": 18,
      "wardName": "Sant Kabir",
      "totalOpenSpace_m2": 5124136
    },
    {
      "wardNumber": 16,
      "wardName": "Nand Bagh",
      "totalOpenSpace_m2": 4180780
    },
    {
      "wardNumber": 19,
      "wardName": "Vishvakarma",
      "totalOpenSpace_m2": 3786704
    },
    {
      "wardNumber": 39,
      "wardName": "Nahar Shahvali",
      "totalOpenSpace_m2": 3028560
    },
    {
      "wardNumber": 85,
      "wardName": "Prajapat Nagar",
      "totalOpenSpace_m2": 2927182
    },
    {
      "wardNumber": 76,
      "wardName": "Mundala Nayata",
      "totalOpenSpace_m2": 2701906
    },
    {
      "wardNumber": 15,
      "wardName": "Bijasan",
      "totalOpenSpace_m2": 2178790
    },
    {
      "wardNumber": 77,
      "wardName": "Bilawali",
      "totalOpenSpace_m2": 2170114
    },
    {
      "wardNumber": 74,
      "wardName": "Vishnupuri",
      "totalOpenSpace_m2": 1947969
    }
  ],
  "highestGreeneryWards_byPerCapita": [
    {
      "wardNumber": 76,
      "wardName": "Mundala Nayata",
      "perCapitaOpenSpace_m2": 777.0
    },
    {
      "wardNumber": 15,
      "wardName": "Bijasan",
      "perCapitaOpenSpace_m2": 538.0
    },
    {
      "wardNumber": 77,
      "wardName": "Bilawali",
      "perCapitaOpenSpace_m2": 525.0
    },
    {
      "wardNumber": 79,
      "wardName": "Sukh Niwas",
      "perCapitaOpenSpace_m2": 378.0
    },
    {
      "wardNumber": 35,
      "wardName": "Lasudiya Mori",
      "perCapitaOpenSpace_m2": 332.9
    },
    {
      "wardNumber": 36,
      "wardName": "Nipaniya",
      "perCapitaOpenSpace_m2": 284.8
    },
    {
      "wardNumber": 75,
      "wardName": "Palda",
      "perCapitaOpenSpace_m2": 209.5
    },
    {
      "wardNumber": 16,
      "wardName": "Nand Bagh",
      "perCapitaOpenSpace_m2": 103.1
    },
    {
      "wardNumber": 19,
      "wardName": "Vishvakarma",
      "perCapitaOpenSpace_m2": 101.5
    },
    {
      "wardNumber": 39,
      "wardName": "Nahar Shahvali",
      "perCapitaOpenSpace_m2": 73.61
    }
  ],
  "maxOpenSpaceByCategory_totalArea_m2": {
    "Negligible": {
      "max": 5542,
      "wardNumber": 84,
      "wardName": "Dwarkapuri",
      "categoryRange": "2248-5542"
    },
    "Very Low": {
      "max": 99261,
      "wardNumber": 10,
      "wardName": "Banganga",
      "categoryRange": "13159-99261"
    },
    "Low": {
      "max": 818662,
      "wardNumber": 57,
      "wardName": "Devi Ahilya Bai",
      "categoryRange": "100464-920959"
    },
    "Medium": {
      "max": 8239240,
      "wardNumber": 75,
      "wardName": "Palda",
      "categoryRange": "1082073-8239240"
    },
    "High": {
      "max": 2701906,
      "wardNumber": 76,
      "wardName": "Mundala Nayata",
      "categoryRange": "10321926-27019060"
    }
  },
  "maxOpenSpaceByCategory_perCapita_m2PerPerson": {
    "Negligible": {
      "max": 1.24,
      "wardNumber": 5,
      "wardName": "Raj Nagar",
      "categoryRange": "0.05-1.24"
    },
    "Very Low": {
      "max": 7.7,
      "wardNumber": 82,
      "wardName": "Vrindavan",
      "categoryRange": "1.60-5.98",
      "note": "Value 7.7 technically falls outside this range; see categoryValueMismatchFlag on this ward's record."
    },
    "Low": {
      "max": 13.7,
      "wardNumber": 27,
      "wardName": "Snehalata Ganj",
      "categoryRange": "6.43-12.64"
    },
    "Medium": {
      "max": 23.71,
      "wardNumber": 31,
      "wardName": "Maharaja Chatrasal",
      "categoryRange": "13.05-23.71"
    },
    "High": {
      "max": 73.61,
      "wardNumber": 39,
      "wardName": "Nahar Shahvali",
      "categoryRange": "33.66-73.61"
    },
    "Very High": {
      "max": 777.0,
      "wardNumber": 76,
      "wardName": "Mundala Nayata",
      "categoryRange": "101.56-777.35"
    }
  }
};