# AgriPulse · Precision Agriculture

**AI-powered soil intelligence for better crop yields**

AgriPulse is a web application that analyzes soil nutrient data and predicts crop suitability using hard-coded domain logic and LLM-generated explanations. Designed for small-scale farmers to translate raw soil test data into actionable agricultural recommendations.

---

## 🎯 Core Features

- 🌱 **Soil Data Analysis**: Parse CSV files with NPK (Nitrogen, Phosphorus, Potassium) and pH levels
- 🎯 **Crop Suitability Scoring**: Calculate 0-100% suitability score based on mandatory domain rules
- 📊 **Interactive Graphs**: Visualize nutrient profiles, comparisons, and health scores using Chart.js
- 🤖 **AI Explanations**: LLM-generated farmer-friendly insights for each crop
- 🔐 **User Authentication**: Secure login/register system with session management
- 🎨 **Field-Ready UI**: Color-coded dashboard (Green/Yellow/Red) for easy interpretation
- 📋 **JSON Schema Compliance**: Strict adherence to mandatory output format

---

## 📋 Evaluation Rubrics

| Criterion | Points | Implementation |
|-----------|--------|-----------------|
| **Logic Accuracy** | 35 | Scoring algorithm strictly follows domain rules with Critical Crop Penalty |
| **Schema Compliance** | 25 | JSON output matches mandatory schema exactly |
| **Field-Ready UI** | 15 | Color-coded dashboard with CSV upload capability |
| **GitHub & Codebase** | 15 | Well-structured, modularized code with clear comments |
| **AI Integration** | 10 | LLM generates relevant, chemically sound explanations |
| **TOTAL** | **100** | - |

---

## 🔧 Domain Logic (Mandatory Rules)

### A. Universal Nutrient Thresholds
| Nutrient | Threshold | Action |
|----------|-----------|--------|
| Nitrogen (N) | < 20 mg/kg | Apply Urea Fertilizer |
| Phosphorus (P) | < 15 mg/kg | Apply DAP (Diammonium Phosphate) |
| Potassium (K) | < 150 mg/kg | Apply MOP (Muriate of Potash) |

### B. Crop-Specific Ranges
| Crop | pH Range | Key Nutrient | High Demand |
|------|----------|--------------|-------------|
| TOMATO | 6.0–7.0 | Potassium (K) | < 200 mg/kg |
| WHEAT | 6.0–7.5 | Nitrogen (N) | < 30 mg/kg |
| RICE | 5.0–6.5 | Phosphorus (P) | < 25 mg/kg |
| MAIZE | 5.8–7.0 | Nitrogen (N) | < 35 mg/kg |

### C. Scoring Algorithm (0-100%)
```
Base Score: 100
- pH Penalty: -20 if outside ideal range
- Standard Deficiency: -15 for each nutrient (N, P, K) below universal threshold
- Critical Crop Penalty: -10 additional if key nutrient below high demand threshold
- Final Score: Clamped to 0-100 range
```

---

## 📁 Project Structure

```
agripulse22/
├── index.html              # Main application UI (Vue.js)
├── css/
│   └── styles.css          # Styling (dark theme, glass-morphism)
├── js/
│   ├── app.js              # Vue application & state management
│   ├── logicEngine.js       # ✨ Scoring algorithm (CRITICAL)
│   ├── csvParser.js        # CSV parsing with validation
│   ├── aiExplanation.js    # Farmer-friendly explanations
│   └── graphEngine.js      # Chart.js visualizations
├── lib/
│   ├── vue.global.js       # Vue.js framework
│   ├── chart.min.js        # Chart.js library
│   ├── vanilla-tilt.min.js  # 3D tilt effect
│   ├── font-awesome.min.css # Icons
│   └── webfonts/           # Font files
├── data/
│   └── sample_soil_data.csv # Test dataset
└── docs/
    └── architecture.md     # System architecture
```

---

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required (Static files)

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/agripulse22.git
cd agripulse22
```

### 2. Run Locally
```bash
# Option 1: Using Python (any version)
python -m http.server 8000
# Open http://localhost:8000

# Option 2: Using Node.js
npx http-server
# Open http://localhost:8080

# Option 3: Direct browser
# Open index.html directly in your browser
```

### 3. Login Credentials
- **Username**: `farmer`
- **Password**: `agripulse2026`

---

## 📊 Mandatory JSON Schema

All results must output this exact schema:

```json
{
  "soil_id": "SOIL_XXX",
  "target_crop": "CROP_NAME",
  "health_metrics": {
    "overall_health": "Optimal|Deficient|Critical",
    "critical_deficiencies": ["List", "of", "nutrients"]
  },
  "recommendation": {
    "fertilizer_plan": "Specific action text",
    "suitability_score": 0.0
  },
  "ai_explanation": "LLM generated farmer-friendly summary"
}
```

---

## 🧪 Testing with Sample Data

### Test Case 1: SOIL_001 (Tomato)
```csv
soil_id,nitrogen,phosphorus,potassium,ph_level
SOIL_001,25,20,180,6.5
```
**Expected for Tomato**:
- Overall Health: Optimal
- Suitability Score: 100%
- Critical Deficiencies: None

### Test Case 2: SOIL_002 (Wheat)
```csv
soil_id,nitrogen,phosphorus,potassium,ph_level
SOIL_002,12,18,160,6.2
```
**Expected for Wheat**:
- Overall Health: Critical
- Suitability Score: 55% (100 - 20pH - 15N - 10Critical)
- Critical Deficiencies: [Nitrogen (critical)]
- Recommendation: Apply Urea Fertilizer

---

## 🔑 Key Implementation Files

### logicEngine.js ⭐ (CRITICAL)
Implements the mandatory scoring algorithm with detailed comments:
- pH range validation with -20 point penalty
- Universal nutrient threshold checks (-15 each)
- Critical crop penalty (-10 additional for key nutrients)
- Health status determination (Optimal/Deficient/Critical)

### csvParser.js
Validates and parses CSV files with required headers:
- `soil_id`, `nitrogen`, `phosphorus`, `potassium`, `ph_level`
- Error handling for malformed data

### aiExplanation.js
Generates farmer-friendly explanations:
- Simple metaphors (e.g., "Nitrogen is leaf fuel")
- Biological reasoning for each nutrient
- Critical warning messages

### graphEngine.js
Creates interactive visualizations:
- Radar chart: Nutrient profile vs optimal
- Bar chart: Current levels vs deficiency thresholds
- Doughnut chart: Health score percentage

### app.js (Vue.js)
Main application logic:
- Authentication system
- CSV upload and processing
- Real-time evaluation and graph updates
- Session management

---

## 🎨 UI/UX Features

- **Color-Coded Health Status**:
  - 🟢 Green (≥75%): Optimal conditions
  - 🟡 Yellow (50-74%): Deficient
  - 🔴 Red (<50%): Critical

- **Interactive Dashboard**:
  - Real-time suitability score updates
  - Live graph visualizations
  - Scrollable fertilizer recommendations

- **3D Effects**:
  - Vanilla Tilt library for card interactions
  - Glass-morphism design

---

## 🔐 Disqualification Criteria

❌ **Will be DISQUALIFIED for**:
- Application not accessible or functional
- No CSV file upload capability
- JSON output doesn't match mandatory schema
- Logic ignores Critical Crop Penalty in scoring
- GitHub repository is private or incomplete
- Submission after deadline

✅ **Must include**:
- Clear setup instructions
- Well-commented code explaining domain logic
- CSV file upload functionality
- JSON schema visible in console or UI

---

## 📝 Example CSV Format

```csv
soil_id,nitrogen,phosphorus,potassium,ph_level
SOIL_001,25,20,180,6.5
SOIL_002,12,18,160,6.2
SOIL_003,18,10,120,7.2
SOIL_004,32,25,210,5.8
SOIL_005,8,12,90,6.8
```

---

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Vue.js 3 (Global build) |
| **Charting** | Chart.js 3.x |
| **Styling** | Custom CSS (Dark theme, Glass-morphism) |
| **Icons** | Font Awesome 6.4.0 |
| **3D Effects** | Vanilla Tilt |
| **Fonts** | Google Inter |
| **Hosting** | Static files (any web server) |

---

## 📞 Support & Documentation

- **Issue**: Application not loading?
  - Clear browser cache (Ctrl+Shift+Del)
  - Check browser console for errors (F12)
  - Verify all files are in correct directories

- **CSV Upload Issues**:
  - Ensure headers match exactly: `soil_id,nitrogen,phosphorus,potassium,ph_level`
  - Use comma separators (not semicolons)
  - Check for special characters in values

- **Graph Not Displaying**:
  - Verify `chart.min.js` is loaded (check Network tab in DevTools)
  - Ensure valid crop is selected
  - Check console for Chart.js errors

---

## 🏆 Hackarena 2026

**Sustainable Tech Challenge · AgriPulse**

Built for small-scale farmers to reduce global crop yield loss through AI-powered soil intelligence.

---

## 📄 License

Demo application for Hackarena 2026. Free to use and modify.

---

*Last Updated: March 6, 2026*
