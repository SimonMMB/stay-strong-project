<div wire:ignore class="space-y-3">
    <div class="relative" style="height: 220px;">
        <canvas id="myChart"></canvas>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
let chart;
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: @json($chartData['labels']).map((label, index) => 
                `Sesión ${index + 1}\n${label}`), 
            datasets: [{
                data: @json($chartData['weights']),
                backgroundColor: '#f97316aa',
                borderColor: '#f97316',
                borderWidth: 0.5,
                borderRadius: 3,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            const labelParts = context[0].label.split('\n');
                            return [`Sesión: ${labelParts[0].replace('Sesión ', '')}`, 
                                    `Fecha: ${labelParts[1]}`];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true,
                        text: 'Kg',
                        color: 'white',
                        font: {size: 12},
                    },
                    grid: { 
                        display: false,
                        color: 'rgba(255, 255, 255, 0.1)' 
                    },
                    ticks: { 
                        font: { size: 10 },
                        color: 'white' 
                    },
                    border: {
                        color: 'white' 
                    }
                },
                x: {
                    grid: { 
                        display: false,
                        color: 'rgba(255, 255, 255, 0.1)' 
                    },
                    ticks: { 
                        font: { size: 9 },
                        color: 'white', 
                        maxRotation: 30,
                        minRotation: 30,
                        callback: function(value) {
                            const parts = this.getLabelForValue(value).split('\n');
                            return [`${parts[0]}`, `${parts[1]}`];
                        }
                    },
                    border: {
                        color: 'white' 
                    }
                }
            },
            datasets: {
                bar: {
                    barThickness: 25,
                    categoryPercentage: 0.4,
                    barPercentage: 0.8
                }
            }
        }
    });
});

document.addEventListener('livewire:init', () => {
    Livewire.on('updateChart', (chartData) => {
        if (chart) {
            chart.data.labels = chartData.labels.map((label, index) => 
                `Sesión ${index + 1}\n${label}`);
            chart.data.datasets[0].data = chartData.weights;
            chart.update();
        }
    });
});
</script>