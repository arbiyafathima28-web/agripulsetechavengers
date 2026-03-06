/**
 * LogicEngine - Soil Suitability Scoring System
 * 
 * DOMAIN LOGIC (Mandatory Rules):
 * ================================
 * A. Universal Nutrient Thresholds (Deficiency Triggers)
 *    - Nitrogen (N): < 20 mg/kg → Apply Urea Fertilizer
 *    - Phosphorus (P): < 15 mg/kg → Apply DAP
 *    - Potassium (K): < 150 mg/kg → Apply MOP
 * 
 * B. Crop-Specific Ideal Ranges & Key Nutrients
 *    - TOMATO: pH 6.0-7.0, Key Nutrient: K (high demand < 200)
 *    - WHEAT: pH 6.0-7.5, Key Nutrient: N (high demand < 30)
 *    - RICE: pH 5.0-6.5, Key Nutrient: P (high demand < 25)
 *    - MAIZE: pH 5.8-7.0, Key Nutrient: N (high demand < 35)
 * 
 * C. Scoring Algorithm (0-100%)
 *    - Base Score: 100
 *    - pH Penalty: -20 if outside ideal range
 *    - Standard Deficiency: -15 for each nutrient below universal threshold
 *    - Critical Crop Penalty: -10 additional if key nutrient below high demand
 */
window.LogicEngine = {
    THRESHOLDS: {
        N: { deficiency: 20, action: 'Apply Urea Fertilizer' },
        P: { deficiency: 15, action: 'Apply DAP (Diammonium Phosphate)' },
        K: { deficiency: 150, action: 'Apply MOP (Muriate of Potash)' }
    },
    
    CROP_SPECS: {
        TOMATO: { phMin: 6.0, phMax: 7.0, keyNutrient: 'K', highDemand: 200 },
        WHEAT:  { phMin: 6.0, phMax: 7.5, keyNutrient: 'N', highDemand: 30 },
        RICE:   { phMin: 5.0, phMax: 6.5, keyNutrient: 'P', highDemand: 25 },
        MAIZE:  { phMin: 5.8, phMax: 7.0, keyNutrient: 'N', highDemand: 35 }
    },

    /**
     * Evaluates soil suitability for a target crop
     * @param {Object} soil - Soil data {nitrogen, phosphorus, potassium, ph_level}
     * @param {String} targetCrop - Target crop (TOMATO, WHEAT, RICE, MAIZE)
     * @returns {Object} Health metrics and recommendation with suitability_score
     */
    evaluate(soil, targetCrop) {
        if (!soil || !targetCrop || !this.CROP_SPECS[targetCrop]) {
            return null;
        }
        
        const spec = this.CROP_SPECS[targetCrop];
        const n = soil.nitrogen, p = soil.phosphorus, k = soil.potassium, ph = soil.ph_level;

        let score = 100; // Start with base score
        const deficiencies = [];
        const actions = [];

        // === pH Penalty: -20 if outside ideal range ===
        if (ph < spec.phMin || ph > spec.phMax) score -= 20;

        // === Standard Deficiency Checks: -15 each ===
        if (n < this.THRESHOLDS.N.deficiency) {
            deficiencies.push('Nitrogen');
            actions.push(this.THRESHOLDS.N.action);
            score -= 15;
        }
        if (p < this.THRESHOLDS.P.deficiency) {
            deficiencies.push('Phosphorus');
            actions.push(this.THRESHOLDS.P.action);
            score -= 15;
        }
        if (k < this.THRESHOLDS.K.deficiency) {
            deficiencies.push('Potassium');
            actions.push(this.THRESHOLDS.K.action);
            score -= 15;
        }

        // === Critical Crop Penalty: -10 additional ===
        // Check if key nutrient is below the crop's high demand threshold
        let keyBelow = false;
        if (spec.keyNutrient === 'N' && n < spec.highDemand) keyBelow = true;
        else if (spec.keyNutrient === 'P' && p < spec.highDemand) keyBelow = true;
        else if (spec.keyNutrient === 'K' && k < spec.highDemand) keyBelow = true;

        if (keyBelow) {
            score -= 10; // Critical penalty
            const keyName = spec.keyNutrient === 'N' ? 'Nitrogen' : 
                          (spec.keyNutrient === 'P' ? 'Phosphorus' : 'Potassium');
            // Mark as critical if not already in deficiencies
            if (!deficiencies.includes(keyName)) {
                deficiencies.push(`${keyName} (critical)`);
            }
        }

        // Ensure score stays within 0-100 range
        score = Math.max(0, Math.min(100, score));

        // Determine overall health status
        let overall = 'Optimal';
        if (deficiencies.length > 0) overall = 'Deficient';
        if (deficiencies.some(d => d.includes('critical'))) overall = 'Critical';

        // Generate fertilizer plan
        const uniqueActions = [...new Set(actions)];
        const fertilizerPlan = uniqueActions.length ? 
            uniqueActions.join('; ') : 
            'No fertilizer needed based on thresholds.';

        return {
            health_metrics: {
                overall_health: overall,
                critical_deficiencies: deficiencies
            },
            recommendation: {
                fertilizer_plan: fertilizerPlan,
                suitability_score: score
            }
        };
    }
};