/**
 * AI Explanation Module - Generates farmer-friendly insights
 * 
 * This module creates simple, non-technical explanations of soil conditions
 * and nutrient deficiencies in language that farmers can understand.
 */
window.AiExplanation = {
    /**
     * Generates a farmer-friendly explanation of soil health
     * @param {Object} soil - Soil data with nutrient levels
     * @param {String} targetCrop - Target crop type (TOMATO, WHEAT, RICE, MAIZE)
     * @param {Object} logicResult - Result from LogicEngine.evaluate()
     * @returns {String} Farmer-friendly explanation text
     */
    generate(soil, targetCrop, logicResult) {
        if (!logicResult) return 'Upload data and select crop to generate insight.';
        
        const deficiencies = logicResult.health_metrics.critical_deficiencies;
        const spec = window.LogicEngine.CROP_SPECS[targetCrop];
        
        let explanation = `For your ${targetCrop} crop, `;

        if (deficiencies.length === 0) {
            explanation += `the soil nutrient levels are well balanced. pH is within ideal range (${spec.phMin}-${spec.phMax}). Continue regular monitoring for optimal growth.`;
        } else {
            explanation += `the analysis shows ${deficiencies.join(', ')} deficiency. `;
            
            if (deficiencies.some(d => d.includes('Nitrogen'))) {
                explanation += 'Nitrogen helps leaves grow green and strong – think of it as the “leaf fuel”. ';
            }
            if (deficiencies.some(d => d.includes('Phosphorus'))) {
                explanation += 'Phosphorus is vital for root development and flowers; it gives roots a strong start. ';
            }
            if (deficiencies.some(d => d.includes('Potassium'))) {
                explanation += 'Potassium protects against disease and helps fruit quality; it strengthens stems and fruits. ';
            }
            if (deficiencies.some(d => d.includes('critical'))) {
                explanation += `This is critical because ${targetCrop} has high demand for this nutrient. Without it, yields may drop significantly. `;
            }
        }

        // pH note
        if (soil.ph_level < spec.phMin || soil.ph_level > spec.phMax) {
            explanation += ` Note: pH is outside the ideal range (${spec.phMin}-${spec.phMax}); consider adjusting with lime or sulfur.`;
        }

        return explanation;
    }
};