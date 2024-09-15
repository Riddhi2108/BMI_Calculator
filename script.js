document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
    const chartContainer = document.getElementById('chartContainer');
    let bmiChart = null; // Variable to store the chart instance

    calculateBtn.addEventListener('click', function() {
        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        // Clear previous result classes
        result.className = 'mt-6 text-center text-xl font-semibold';

        // Validate inputs
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            result.textContent = "Please enter valid height and weight values.";
            result.classList.add('text-red-500');
            // Hide chart if invalid input
            chartContainer.classList.add('hidden');
            return;
        }

        // Calculate BMI
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

        // Determine BMI category
        let category = "";
        let colorClass = '';

        if (bmi < 18.5) {
            category = "Underweight";
            colorClass = 'text-yellow-500';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal weight";
            colorClass = 'text-green-500';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
            colorClass = 'text-orange-500';
        } else {
            category = "Obesity";
            colorClass = 'text-red-500';
        }

        // Display BMI and category
        result.textContent = `Your BMI is ${bmi} (${category})`;
        result.classList.add(colorClass);

        // Show chart container
        chartContainer.classList.remove('hidden');

        // Create or update pie chart
        const ctx = document.getElementById('bmiChart').getContext('2d');

        if (bmiChart) {
            // Update existing chart
            bmiChart.data.datasets[0].data = [bmi, 40 - bmi]; // Adjust the second value for chart balance
            bmiChart.update();
        } else {
            // Create new chart
            bmiChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Your BMI', 'Remaining'],
                    datasets: [{
                        data: [bmi, 40 - bmi], // Adjust the second value for chart balance
                        backgroundColor: ['#ff6384', '#e0e0e0'],
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (context.parsed) {
                                        label += ': ' + context.parsed.toFixed(2) + ' kg/m²'; // Added units
                                    }
                                    return label;
                                }
                            }
                        },
                        datalabels: {
                            color: '#000000',
                            display: true,
                            formatter: (value) => `${value.toFixed(2)} kg/m²`, // Display values directly on segments
                            font: {
                                weight: 'bold',
                                size: 14
                            }
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                color: '#000000',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutBounce'
                    }
                }
            });
        }
    });
});
