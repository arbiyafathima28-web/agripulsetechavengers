# Sample Soil Data Analysis Guide

This document provides detailed analysis for the 10 soil samples according to AgriPulse domain logic.

---

## Universal Nutrient Thresholds
- **Nitrogen (N)**: < 20 mg/kg = Deficient (-15 points)
- **Phosphorus (P)**: < 15 mg/kg = Deficient (-15 points)
- **Potassium (K)**: < 150 mg/kg = Deficient (-15 points)

## Crop-Specific Requirements

| Crop | pH Range | Key Nutrient | High Demand Threshold |
|------|----------|--------------|----------------------|
| TOMATO | 6.0–7.0 | Potassium (K) | < 200 mg/kg |
| WHEAT | 6.0–7.5 | Nitrogen (N) | < 30 mg/kg |
| RICE | 5.0–6.5 | Phosphorus (P) | < 25 mg/kg |
| MAIZE | 5.8–7.0 | Nitrogen (N) | < 35 mg/kg |

## Scoring Algorithm
```
Base Score: 100
- pH Penalty: -20 if outside ideal range
- Standard Deficiency: -15 for each nutrient below universal threshold
- Critical Crop Penalty: -10 additional if key nutrient below high demand threshold
- Final Score: Clamped to 0-100 range
```

---

## Detailed Sample Analysis

### SOIL_001 (25N, 20P, 180K, pH 6.5)

**For TOMATO** (pH 6.0-7.0, Key: K < 200):
- pH: 6.5 ✅ (within range)
- N: 25 ✅ (≥ 20)
- P: 20 ✅ (≥ 15)
- K: 180 ⚠️ (< 200 high demand)
- **Calculation**: 100 - 10 (K critical) = **90%**
- **Status**: Deficient
- **Deficiencies**: [Potassium (critical)]
- **Recommendation**: Apply MOP (Muriate of Potash)

**For WHEAT** (pH 6.0-7.5, Key: N < 30):
- pH: 6.5 ✅ (within range)
- N: 25 ⚠️ (< 30 high demand)
- P: 20 ✅ (≥ 15)
- K: 180 ✅ (≥ 150)
- **Calculation**: 100 - 10 (N critical) = **90%**
- **Status**: Deficient
- **Deficiencies**: [Nitrogen (critical)]
- **Recommendation**: Apply Urea Fertilizer

---

### SOIL_002 (12N, 18P, 160K, pH 6.2)

**For WHEAT** (pH 6.0-7.5, Key: N < 30):
- pH: 6.2 ✅ (within range)
- N: 12 ❌ (< 20 universal, < 30 high demand)
- P: 18 ✅ (≥ 15)
- K: 160 ✅ (≥ 150)
- **Calculation**: 100 - 15 (N deficiency) - 10 (N critical) = **75%**
- **Status**: Deficient
- **Deficiencies**: [Nitrogen (critical)]
- **Recommendation**: Apply Urea Fertilizer

**For TOMATO** (pH 6.0-7.0, Key: K < 200):
- pH: 6.2 ✅ (within range)
- N: 12 ❌ (< 20)
- P: 18 ✅ (≥ 15)
- K: 160 ⚠️ (< 200 high demand)
- **Calculation**: 100 - 15 (N deficiency) - 10 (K critical) = **75%**
- **Status**: Deficient
- **Deficiencies**: [Nitrogen, Potassium (critical)]
- **Recommendation**: Apply Urea Fertilizer; Apply MOP (Muriate of Potash)

---

### SOIL_003 (30N, 10P, 140K, pH 5.5)

**For RICE** (pH 5.0-6.5, Key: P < 25):
- pH: 5.5 ✅ (within range)
- N: 30 ✅ (≥ 20)
- P: 10 ❌ (< 15 universal, < 25 high demand)
- K: 140 ❌ (< 150)
- **Calculation**: 100 - 15 (P deficiency) - 10 (P critical) - 15 (K deficiency) = **60%**
- **Status**: Deficient
- **Deficiencies**: [Phosphorus (critical), Potassium]
- **Recommendation**: Apply DAP (Diammonium Phosphate); Apply MOP (Muriate of Potash)

---

### SOIL_004 (18N, 22P, 155K, pH 6.8)

**For TOMATO** (pH 6.0-7.0, Key: K < 200):
- pH: 6.8 ✅ (within range)
- N: 18 ❌ (< 20)
- P: 22 ✅ (≥ 15)
- K: 155 ⚠️ (< 200 high demand)
- **Calculation**: 100 - 15 (N deficiency) - 10 (K critical) = **75%**
- **Status**: Deficient
- **Deficiencies**: [Nitrogen, Potassium (critical)]
- **Recommendation**: Apply Urea Fertilizer; Apply MOP (Muriate of Potash)

---

### SOIL_005 (40N, 12P, 170K, pH 7.0)

**For MAIZE** (pH 5.8-7.0, Key: N < 35):
- pH: 7.0 ✅ (within range)
- N: 40 ✅ (≥ 20, ≥ 35 high demand)
- P: 12 ❌ (< 15)
- K: 170 ✅ (≥ 150)
- **Calculation**: 100 - 15 (P deficiency) = **85%**
- **Status**: Deficient
- **Deficiencies**: [Phosphorus]
- **Recommendation**: Apply DAP (Diammonium Phosphate)

---

### SOIL_006 (22N, 16P, 130K, pH 5.9)

**For MAIZE** (pH 5.8-7.0, Key: N < 35):
- pH: 5.9 ✅ (within range)
- N: 22 ⚠️ (< 35 high demand)
- P: 16 ✅ (≥ 15)
- K: 130 ❌ (< 150)
- **Calculation**: 100 - 10 (N critical) - 15 (K deficiency) = **75%**
- **Status**: Deficient
- **Deficiencies**: [Nitrogen (critical), Potassium]
- **Recommendation**: Apply Urea Fertilizer; Apply MOP (Muriate of Potash)

---

### SOIL_007 (15N, 14P, 145K, pH 5.7)

**For RICE** (pH 5.0-6.5, Key: P < 25):
- pH: 5.7 ✅ (within range)
- N: 15 ❌ (< 20)
- P: 14 ❌ (< 15 universal, < 25 high demand)
- K: 145 ❌ (< 150)
- **Calculation**: 100 - 15 (N deficiency) - 15 (P deficiency) - 10 (P critical) - 15 (K deficiency) = **45%**
- **Status**: Critical
- **Deficiencies**: [Nitrogen, Phosphorus (critical), Potassium]
- **Recommendation**: Apply Urea Fertilizer; Apply DAP (Diammonium Phosphate); Apply MOP (Muriate of Potash)

---

### SOIL_008 (28N, 25P, 200K, pH 6.3)

**For TOMATO** (pH 6.0-7.0, Key: K < 200):
- pH: 6.3 ✅ (within range)
- N: 28 ✅ (≥ 20)
- P: 25 ✅ (≥ 15)
- K: 200 ✅ (≥ 200 high demand)
- **Calculation**: **100%**
- **Status**: Optimal
- **Deficiencies**: None
- **Recommendation**: No fertilizer needed based on thresholds.

---

### SOIL_009 (35N, 18P, 165K, pH 6.9)

**For WHEAT** (pH 6.0-7.5, Key: N < 30):
- pH: 6.9 ✅ (within range)
- N: 35 ✅ (≥ 20, ≥ 30 high demand)
- P: 18 ✅ (≥ 15)
- K: 165 ✅ (≥ 150)
- **Calculation**: **100%**
- **Status**: Optimal
- **Deficiencies**: None
- **Recommendation**: No fertilizer needed based on thresholds.

---

### SOIL_010 (10N, 8P, 120K, pH 5.2)

**For RICE** (pH 5.0-6.5, Key: P < 25):
- pH: 5.2 ✅ (within range)
- N: 10 ❌ (< 20)
- P: 8 ❌ (< 15 universal, < 25 high demand)
- K: 120 ❌ (< 150)
- **Calculation**: 100 - 15 (N deficiency) - 15 (P deficiency) - 10 (P critical) - 15 (K deficiency) = **45%**
- **Status**: Critical
- **Deficiencies**: [Nitrogen, Phosphorus (critical), Potassium]
- **Recommendation**: Apply Urea Fertilizer; Apply DAP (Diammonium Phosphate); Apply MOP (Muriate of Potash)

---

## Quick Reference Table

| Sample | Best Crop | Score | Status | Key Issues |
|--------|-----------|-------|--------|------------|
| SOIL_001 | TOMATO | 90% | Deficient | K critical |
| SOIL_002 | WHEAT | 75% | Deficient | N critical |
| SOIL_003 | RICE | 60% | Deficient | P critical, K deficient |
| SOIL_004 | TOMATO | 75% | Deficient | N deficient, K critical |
| SOIL_005 | MAIZE | 85% | Deficient | P deficient |
| SOIL_006 | MAIZE | 75% | Deficient | N critical, K deficient |
| SOIL_007 | RICE | 45% | Critical | Multiple deficiencies |
| SOIL_008 | TOMATO | 100% | Optimal | Perfect conditions |
| SOIL_009 | WHEAT | 100% | Optimal | Perfect conditions |
| SOIL_010 | RICE | 45% | Critical | Multiple deficiencies |

---

## Testing Instructions

1. **Upload CSV**: Use the AgriPulse dashboard to upload `sample_soil_data.csv`
2. **Test Each Sample**:
   - Select a sample from the dropdown
   - Choose the recommended crop from the table above
   - Verify the score, status, and deficiencies match expectations
3. **Validate Edge Cases**:
   - SOIL_008 & SOIL_009: Perfect 100% scores
   - SOIL_007 & SOIL_010: Critical cases with multiple deficiencies
   - SOIL_001 & SOIL_002: Single critical nutrient scenarios

---

*Generated for AgriPulse Hackarena 2026 Testing - March 6, 2026*
