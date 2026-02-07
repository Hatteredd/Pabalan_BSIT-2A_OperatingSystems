/**
 * OS Installation Tutorials - Main JavaScript
 * Rick Justine Pabalan | BSIT-S-2A | Operating Systems
 */

document.addEventListener('DOMContentLoaded', function() {
  // Dropdown toggle functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});
