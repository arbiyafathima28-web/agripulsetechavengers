/**
 * CSV Parser - Parses soil nutrient data from CSV files
 * 
 * Required CSV Headers:
 *  - soil_id: Unique identifier for the soil sample
 *  - nitrogen: Nitrogen content in mg/kg
 *  - phosphorus: Phosphorus content in mg/kg
 *  - potassium: Potassium content in mg/kg
 *  - ph_level: Soil pH level (0-14 scale)
 */
window.CsvParser = {
    /**
     * Parses CSV text and returns array of soil data objects
     * @param {String} csvText - CSV content with headers and data rows
     * @returns {Array} Array of soil data objects
     * @throws {Error} If required headers are missing
     */
    parse(csvText) {
        const lines = csvText.trim().split(/\r?\n/);
        if (lines.length < 2) throw new Error('CSV must have headers + data');
        
        const headers = lines[0].split(',').map(h => h.trim());
        const required = ['soil_id', 'nitrogen', 'phosphorus', 'potassium', 'ph_level'];
        
        const missing = required.filter(r => !headers.includes(r));
        if (missing.length) throw new Error(`Missing headers: ${missing.join(', ')}`);

        const rows = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length !== headers.length) continue;
            
            const obj = {};
            headers.forEach((h, idx) => {
                if (h === 'soil_id') {
                    obj[h] = values[idx];
                } else {
                    // Parse numeric values for nutrient levels
                    obj[h] = parseFloat(values[idx]) || 0;
                }
            });
            rows.push(obj);
        }
        return rows;
    }
};