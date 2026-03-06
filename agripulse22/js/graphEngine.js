/**
 * GraphEngine - Visualization of soil metrics and crop suitability
 * 
 * This module creates interactive charts using Chart.js to display:
 * 1. Nutrient Profile (Radar chart)
 * 2. Nutrient Comparison vs Thresholds (Bar chart)
 * 3. Soil Health Score (Doughnut chart)
 */
// Graph/Chart Engine for visualizing soil metrics
window.GraphEngine = {
    chartInstances: {},

    initNutrientChart(canvasId, soil) {
        if (!soil) return;
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'pH Level'],
                datasets: [{
                    label: 'Current Levels',
                    data: [
                        Math.min(soil.nitrogen / 40 * 100, 100),  // Scale to 0-100
                        Math.min(soil.phosphorus / 30 * 100, 100),
                        Math.min(soil.potassium / 230 * 100, 100),
                        soil.ph_level * 14.28  // Scale 0-7 to 0-100
                    ],
                    borderColor: '#46B45A',
                    backgroundColor: 'rgba(70, 180, 90, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#46B45A',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }, {
                    label: 'Optimal Range (100%)',
                    data: [100, 100, 100, 100],
                    borderColor: 'rgba(200, 200, 200, 0.4)',
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ddd',
                            font: { size: 12, family: "'Inter', sans-serif" }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Soil Nutrient Profile',
                        color: '#fff',
                        font: { size: 14, weight: 'bold', family: "'Inter', sans-serif" }
                    }
                },
                scales: {
                    r: {
                        max: 100,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        },
                        ticks: {
                            color: '#aaa',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });

        this.chartInstances[canvasId] = chart;
    },

    initComparisonChart(canvasId, thresholds, currentValues, crop = '') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
                datasets: [
                    {
                        label: 'Current Level',
                        data: [currentValues.n, currentValues.p, currentValues.k],
                        backgroundColor: '#46B45A',
                        borderColor: '#2d8a3a',
                        borderWidth: 1
                    },
                    {
                        label: 'Deficiency Threshold',
                        data: [
                            thresholds.N.deficiency,
                            thresholds.P.deficiency,
                            thresholds.K.deficiency
                        ],
                        backgroundColor: '#FF6B6B',
                        borderColor: '#cc5555',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: undefined,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ddd',
                            font: { size: 12, family: "'Inter', sans-serif" }
                        }
                    },
                    title: {
                        display: true,
                        text: `Nutrient Comparison${crop ? ` - ${crop}` : ''}`,
                        color: '#fff',
                        font: { size: 14, weight: 'bold', family: "'Inter', sans-serif" }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#aaa',
                            font: { size: 10 }
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#aaa',
                            font: { size: 10 }
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        }
                    }
                }
            }
        });

        this.chartInstances[canvasId] = chart;
    },

    initHealthScoreChart(canvasId, score) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }

        const color = score >= 75 ? '#46B45A' : (score >= 50 ? '#FFD93D' : '#FF6B6B');

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Health Score', 'Remaining'],
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: [color, 'rgba(100, 100, 100, 0.2)'],
                    borderColor: ['#fff', 'rgba(200, 200, 200, 0.3)'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Soil Health: ${Math.round(score)}%`,
                        color: '#fff',
                        font: { size: 14, weight: 'bold', family: "'Inter', sans-serif" },
                        padding: 20
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });

        this.chartInstances[canvasId] = chart;
    },

    clearCharts() {
        Object.values(this.chartInstances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.chartInstances = {};
    }
};
