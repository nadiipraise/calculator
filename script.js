document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            // Remove 'error' class from all buttons
            buttons.forEach(btn => btn.classList.remove('error'));

            // Add feedback to the clicked button
            e.target.classList.add('active');
            setTimeout(() => e.target.classList.remove('active'), 100);

            if (value === 'C') {
                currentInput = '';
                display.innerText = '0';
            } else if (value === '=') {
                try {
                    const result = evaluateExpression(currentInput);
                    display.innerText = result;
                    currentInput = result;
                } catch (e) {
                    display.innerText = 'Error';
                    display.classList.add('error');
                }
            } else {
                if (display.innerText === '0' && value !== '.') {
                    currentInput = value;
                    display.innerText = currentInput;
                } else {
                    currentInput += value;
                    display.innerText = currentInput;
                }
            }
        });
    });

    function evaluateExpression(expression) {
        // Remove potential multiple operators (e.g., --, ++) and spaces
        expression = expression.replace(/\s+/g, '');
        expression = expression.replace(/--/g, '+');
        expression = expression.replace(/\+\+/g, '+');
        expression = expression.replace(/(\d)([\+\-\*\/])(\d)/g, '$1 $2 $3');
        
        // Handle the case of an empty expression or invalid characters
        if (!expression) throw new Error('Invalid expression');

        // Calculate the result
        return new Function('return ' + expression)();
    }
});

