// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');

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
    });
});