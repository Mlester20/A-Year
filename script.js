const correctPasscode = "122423";
let currentPasscode = "";
let attempts = 0;
const maxAttempts = 3;

function updateDisplay() {
    const digits = document.querySelectorAll('.digit');
    digits.forEach((digit, index) => {
        if (index < currentPasscode.length) {
            digit.classList.add('filled');
        } else {
            digit.classList.remove('filled');
        }
    });
}

function showSuccessAnimation() {
    const successAnim = document.querySelector('.success-animation');
    successAnim.style.display = 'block';
    document.querySelector('.container').style.display = 'none';
}

function checkPasscode() {
    const message = document.getElementById('message');
    
    if (currentPasscode === correctPasscode) {
        message.style.color = "#28a745";
        message.textContent = "Correct passcode! ❤️";
        showSuccessAnimation();
        setTimeout(() => {
            window.location.href = 'decision.html';
        }, 3000); // Increased to 3 seconds to show the animation
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            message.innerHTML = "Too many incorrect attempts.<br><br><strong>Here's another hint: The day we met ❤️</strong>";
        } else {
            message.textContent = `Incorrect passcode. ${maxAttempts - attempts} attempts remaining.`;
        }
        currentPasscode = "";
        updateDisplay();
    }
}

// Add event listeners for number buttons
document.querySelectorAll('.num-button').forEach(button => {
    button.addEventListener('click', () => {
        if (currentPasscode.length < 6) {
            currentPasscode += button.getAttribute('data-number');
            updateDisplay();
        }
    });
});

// Clear button functionality
document.querySelector('.clear-button').addEventListener('click', () => {
    currentPasscode = "";
    updateDisplay();
});

// Enter button functionality
document.querySelector('.enter-button').addEventListener('click', () => {
    if (currentPasscode.length === 6) {
        checkPasscode();
    }
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        if (currentPasscode.length < 6) {
            currentPasscode += event.key;
            updateDisplay();
        }
    } else if (event.key === 'Enter') {
        if (currentPasscode.length === 6) {
            checkPasscode();
        }
    } else if (event.key === 'Backspace') {
        currentPasscode = "";
        updateDisplay();
    }
});