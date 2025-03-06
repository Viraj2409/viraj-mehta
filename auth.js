// Form validation and submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically make an API call to authenticate
            console.log('Login attempt:', { email });
            
            // For demo purposes, redirect to dashboard
            window.location.href = 'index.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic validation
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }

            // Here you would typically make an API call to register the user
            console.log('Signup attempt:', { fullName, email });
            
            // For demo purposes, redirect to login
            window.location.href = 'login.html';
        });
    }

    // Password visibility toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle';
        toggleButton.innerHTML = '👁️';
        toggleButton.style.position = 'absolute';
        toggleButton.style.right = '1rem';
        toggleButton.style.top = '50%';
        toggleButton.style.transform = 'translateY(-50%)';
        toggleButton.style.border = 'none';
        toggleButton.style.background = 'none';
        toggleButton.style.cursor = 'pointer';
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(toggleButton);

        toggleButton.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
            toggleButton.innerHTML = input.type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
});