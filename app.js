document.addEventListener('DOMContentLoaded', () => {

  // ================= Custom Cursor =================
  const cursor = document.querySelector('.custom-cursor');
  const cursorHover = document.querySelector('.custom-cursor-hover');
  
  if (cursor && cursorHover) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let cursorHoverX = 0, cursorHoverY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the inner point
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });
    
    // Smooth trailing effect for outer circle
    const animateCursor = () => {
      const xp = 0.15; // interpolation factor
      
      cursorHoverX += (mouseX - cursorHoverX) * xp;
      cursorHoverY += (mouseY - cursorHoverY) * xp;
      
      cursorHover.style.left = `${cursorHoverX}px`;
      cursorHover.style.top = `${cursorHoverY}px`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Expand cursor on hovering interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .work-item, .faq-trigger, select, input, textarea');
    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.backgroundColor = 'var(--color-accent-purple)';
        cursorHover.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorHover.style.borderColor = 'var(--color-accent-amber)';
      });
      elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'var(--color-accent-amber)';
        cursorHover.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorHover.style.borderColor = 'var(--color-accent-purple)';
      });
    });
  }

  // ================= Portfolio Hover Image Preview =================
  const workItems = document.querySelectorAll('.work-item');
  const previewContainer = document.querySelector('.hover-preview-container');
  const previewImg = document.querySelector('.hover-preview-img');
  
  if (workItems.length > 0 && previewContainer && previewImg) {
    workItems.forEach(item => {
      const imgPath = item.getAttribute('data-image');
      
      item.addEventListener('mouseenter', () => {
        previewImg.src = imgPath;
        previewContainer.style.opacity = '1';
        previewContainer.style.transform = 'scale(1)';
      });
      
      item.addEventListener('mousemove', (e) => {
        // Offset the preview window so it follows but doesn't block the cursor
        const offset = 25;
        previewContainer.style.left = `${e.clientX + offset}px`;
        previewContainer.style.top = `${e.clientY + offset}px`;
      });
      
      item.addEventListener('mouseleave', () => {
        previewContainer.style.opacity = '0';
        previewContainer.style.transform = 'scale(0.8)';
      });
    });
  }

  // ================= FAQ Accordion =================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open FAQs
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ================= Mobile Navigation Menu =================
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu) {
    const toggleMenu = () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ================= Navbar Active Link Tracker =================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      
      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  });

  // ================= Contact Form Submission =================
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <span class="arrow">⌛</span>';
      
      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! <span class="arrow">✓</span>';
        submitBtn.style.backgroundColor = 'var(--color-accent-amber)';
        submitBtn.style.color = 'var(--color-bg)';
        
        // Show overlay or temporary toast message
        const toast = document.createElement('div');
        toast.className = 'submit-toast';
        toast.innerHTML = `
          <div class="toast-content">
            <h4>Shakara Effect Activated!</h4>
            <p>Your message has been received. We will get in touch with you shortly.</p>
          </div>
        `;
        document.body.appendChild(toast);
        
        // Toast styles injected dynamically
        const style = document.createElement('style');
        style.innerHTML = `
          .submit-toast {
            position: fixed;
            bottom: 40px;
            right: 40px;
            background: #18181B;
            border: 1px solid var(--color-accent-amber);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            color: #fff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 99999;
            animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .toast-content h4 {
            color: var(--color-accent-amber);
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
            text-transform: uppercase;
          }
          .toast-content p {
            font-size: 0.9rem;
            color: #C4C4C7;
          }
          @keyframes slideIn {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
        
        form.reset();
        
        // Cleanup toast after 5s
        setTimeout(() => {
          toast.style.animation = 'fadeOut 0.5s forwards';
          setTimeout(() => toast.remove(), 500);
          
          // Restore button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 5000);
        
      }, 1500);
    });
  }

});
