document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
    
    // Initialize the first FAQ item as open
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
    
    // Form submission handling
    const admissionsForm = document.getElementById('admissions-form');
    
    if (admissionsForm) {
      admissionsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(admissionsForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validate form (simple validation)
        let isValid = true;
        let errorMessage = '';
        
        if (!formValues.name.trim()) {
          isValid = false;
          errorMessage = 'Please enter your name.';
        } else if (!formValues.email.trim()) {
          isValid = false;
          errorMessage = 'Please enter your email address.';
        } else if (!isValidEmail(formValues.email)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        }
        
        if (!isValid) {
          alert(errorMessage);
          return;
        }
        
        // Simulate form submission
        const submitButton = admissionsForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        setTimeout(() => {
          // Reset form
          admissionsForm.reset();
          
          // Show success message
          showNotification('Thank you! Your information request has been submitted successfully. We will contact you soon.');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Request';
        }, 1500);
      });
    }
    
    // Program buttons
    const programButtons = document.querySelectorAll('.program-btn');
    
    programButtons.forEach(button => {
      button.addEventListener('click', () => {
        const programType = button.textContent.split(' ')[0].toLowerCase();
        showNotification(`${programType} requirements information will be sent to your email after you submit the contact form.`);
      });
    });
    
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (!button.closest('form')) {
          e.preventDefault();
          
          // Create ripple effect
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          button.appendChild(ripple);
          
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
          ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
          
          ripple.classList.add('active');
          
          setTimeout(() => {
            ripple.remove();
          }, 500);
          
          // Show appropriate message based on button text
          if (button.textContent.includes('Financial Aid')) {
            showNotification('You will be redirected to our financial aid application portal.');
          } else if (button.textContent.includes('Campus Visit')) {
            showNotification('You will be redirected to our campus visit scheduling system.');
          }
        }
      });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.timeline-item, .program-card, .aid-item, .faq-item');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.timeline-item, .program-card, .aid-item, .faq-item').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Current year for copyright
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
  });
  
  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }