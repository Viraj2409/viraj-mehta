import './style.css'

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.link-card, .news-item');
    
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
  document.querySelectorAll('.link-card, .news-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run animation on load and scroll
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // CTA button hover effects
  const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.boxShadow = 'none';
    });
    
    button.addEventListener('click', (e) => {
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
    });
  });

  // Current year for copyright
  const yearElement = document.querySelector('.copyright p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
  }
});