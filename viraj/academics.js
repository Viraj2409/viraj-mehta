document.addEventListener('DOMContentLoaded', () => {
    // Program Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
      });
    });
    
    // Calendar Tabs
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const calendarContents = document.querySelectorAll('.calendar-content');
    
    calendarTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        calendarTabs.forEach(t => t.classList.remove('active'));
        calendarContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const termId = tab.getAttribute('data-term');
        document.getElementById(`${termId}-content`).classList.add('active');
      });
    });
    
    // Faculty Slider
    const slides = document.querySelectorAll('.faculty-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides and remove active class from dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide and add active class to corresponding dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }
    
    // Initialize slider
    showSlide(0);
    
    // Event listeners for dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
      });
    });
    
    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
    
    // Auto-advance slider every 5 seconds
    setInterval(() => {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    }, 5000);
    
    // College buttons
    const collegeBtns = document.querySelectorAll('.college-btn');
    
    collegeBtns.forEach(button => {
      button.addEventListener('click', () => {
        const collegeType = button.getAttribute('data-college');
        showNotification(`Information about the ${formatCollegeName(collegeType)} programs will be sent to your email after you submit the contact form.`);
      });
    });
    
    // Resource links
    const resourceLinks = document.querySelectorAll('.resource-link');
    
    resourceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const resourceType = link.textContent;
        showNotification(`You will be redirected to the ${resourceType} page.`);
      });
    });
    
    // Global education links
    const globalLinks = document.querySelectorAll('.global-link');
    
    globalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('You will be redirected to our global education portal.');
      });
    });
    
    // Form submission handling
    const academicsForm = document.getElementById('academics-form');
    
    if (academicsForm) {
      academicsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(academicsForm);
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
        const submitButton = academicsForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        setTimeout(() => {
          // Reset form
          academicsForm.reset();
          
          // Show success message
          showNotification('Thank you! Your information request has been submitted successfully. We will send program details to your email shortly.');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Request';
        }, 1500);
      });
    }
    
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
          if (button.textContent.includes('Appointment')) {
            showNotification('You will be redirected to our appointment scheduling system.');
          }
        }
      });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.college-card, .program-item, .resource-card, .global-card');
      
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
    document.querySelectorAll('.college-card, .program-item, .resource-card, .global-card').forEach(element => {
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
  
  function formatCollegeName(collegeType) {
    switch(collegeType) {
      case 'arts-sciences':
        return 'College of Arts & Sciences';
      case 'business':
        return 'School of Business';
      case 'engineering':
        return 'College of Engineering';
      case 'health':
        return 'School of Health Sciences';
      case 'education':
        return 'College of Education';
      case 'fine-arts':
        return 'School of Fine Arts';
      default:
        return collegeType;
    }
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