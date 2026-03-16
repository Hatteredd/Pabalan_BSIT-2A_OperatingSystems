/**
 * Glassmorphism UI - Theme Toggle & Animations
 * Rick Justine Pabalan | BSIT-S-2A | Operating Systems
 */

(function() {
  'use strict';

  // ============================================
  // Theme Management
  // ============================================
  
  const ThemeManager = {
    currentTheme: 'dark',
    
    init() {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme') || 'dark';
      this.setTheme(savedTheme);
      
      // Create theme toggle button
      this.createToggleButton();
      
      // Listen for system theme changes
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'light' : 'dark');
          }
        });
      }
    },
    
    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.updateToggleIcon();
    },
    
    toggle() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },
    
    createToggleButton() {
      // Find or create theme toggle
      let toggle = document.querySelector('.theme-toggle');
      
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        // Add to navbar
        const nav = document.querySelector('.nav-links');
        if (nav) {
          const li = document.createElement('li');
          li.appendChild(toggle);
          nav.appendChild(li);
        }
      }
      
      toggle.addEventListener('click', () => this.toggle());
      this.toggleButton = toggle;
      this.updateToggleIcon();
    },
    
    updateToggleIcon() {
      if (!this.toggleButton) return;
      
      const isDark = this.currentTheme === 'dark';
      this.toggleButton.innerHTML = isDark ? '☀️' : '🌙';
      this.toggleButton.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  
  const NavbarManager = {
    init() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      let lastScroll = 0;
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      }, { passive: true });
    }
  };

  // ============================================
  // Scroll Animations
  // ============================================
  
  const AnimationManager = {
    init() {
      // Add animate-on-scroll class to elements
      this.prepareElements();
      
      // Create intersection observer
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      // Observe elements
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        this.observer.observe(el);
      });
    },
    
    prepareElements() {
      // Add animation classes to various elements
      const selectors = [
        '.card',
        '.section-header',
        '.tutorial-header',
        '.tutorial-content',
        '.about-card'
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.classList.contains('animate-on-scroll')) {
            el.classList.add('animate-on-scroll');
          }
        });
      });
    },
    
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation
          // this.observer.unobserve(entry.target);
        }
      });
    }
  };

  // ============================================
  // Dropdown Menu Enhancement
  // ============================================
  
  const DropdownManager = {
    init() {
      // Add keyboard navigation support
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const links = menu?.querySelectorAll('a');
        
        if (!toggle || !menu) return;
        
        // Keyboard navigation
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown(dropdown);
          }
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.closeAllDropdowns();
          }
        });
        
        // Close on click outside
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
          }
        });
      });
    },
    
    toggleDropdown(dropdown) {
      const isActive = dropdown.classList.contains('active');
      this.closeAllDropdowns();
      if (!isActive) {
        dropdown.classList.add('active');
      }
    },
    
    closeAllDropdowns() {
      document.querySelectorAll('.dropdown.active').forEach(d => {
        d.classList.remove('active');
      });
    }
  };

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  
  const SmoothScrollManager = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
  };

  // ============================================
  // Card Hover Effects
  // ============================================
  
  const CardEffectsManager = {
    init() {
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
        card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
      });
    },
    
    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    },
    
    handleMouseLeave(card) {
      card.style.transform = '';
    }
  };

  // ============================================
  // Initialize Everything
  // ============================================
  
  function init() {
    ThemeManager.init();
    NavbarManager.init();
    AnimationManager.init();
    DropdownManager.init();
    SmoothScrollManager.init();
    CardEffectsManager.init();
    
    console.log('🎨 Glassmorphism UI initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose to global scope for debugging
  window.GlassUI = {
    ThemeManager,
    NavbarManager,
    AnimationManager,
    DropdownManager,
    SmoothScrollManager,
    CardEffectsManager
  };

})();
