// ===================================
// DOM Ready
// ===================================
$(document).ready(function() {
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeSkillAnimations();
    initializeDownloadButton();
    initializeMobileMenu();
});

// ===================================
// Navigation
// ===================================
function initializeNavigation() {
    // Add scrolled class to navbar on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        
        if (target !== '#' && $(target).length) {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800, 'swing');
        }
    });
}

// ===================================
// Mobile Menu
// ===================================
function initializeMobileMenu() {
    const menuToggle = $('#menuToggle');
    const navLinks = $('.nav-links');

    menuToggle.on('click', function() {
        $(this).toggleClass('active');
        navLinks.toggleClass('active');
    });

    // Close menu when clicking on a link
    $('.nav-links a').on('click', function() {
        menuToggle.removeClass('active');
        navLinks.removeClass('active');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            menuToggle.removeClass('active');
            navLinks.removeClass('active');
        }
    });
}

// ===================================
// Scroll Animations
// ===================================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for children
                const children = entry.target.querySelectorAll('.feature-card, .timeline-item, .info-card, .hobby-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;
                    }, 0);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.features, .resume-section, .bio-section');
    sections.forEach(section => observer.observe(section));
}

// ===================================
// Scroll Effects
// ===================================
function initializeScrollEffects() {
    // Parallax effect for gradient orbs
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        
        $('.orb-1').css('transform', `translate(${scrolled * 0.3}px, ${scrolled * 0.2}px)`);
        $('.orb-2').css('transform', `translate(${-scrolled * 0.2}px, ${-scrolled * 0.3}px)`);
        $('.orb-3').css('transform', `translate(${scrolled * 0.15}px, ${-scrolled * 0.15}px)`);
    });

    // Hide scroll indicator on scroll
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.scroll-indicator').fadeOut(300);
        } else {
            $('.scroll-indicator').fadeIn(300);
        }
    });
}

// ===================================
// Skill Bar Animations
// ===================================
function initializeSkillAnimations() {
    const observerOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                
                skillBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, index * 100);
                });
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillSection = document.querySelector('.skills-list');
    if (skillSection) {
        skillObserver.observe(skillSection);
    }
}

// ===================================
// Download Button
// ===================================
function initializeDownloadButton() {
    $('#downloadBtn').on('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        const $btn = $(this);
        const originalText = $btn.html();
        
        $btn.html(`
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="animate-spin">
                <path d="M10 2V6M10 14V18M18 10H14M6 10H2M15.657 15.657L13.536 13.536M6.464 6.464L4.343 4.343M15.657 4.343L13.536 6.464M6.464 13.536L4.343 15.657" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Preparing...
        `).prop('disabled', true);
        
        // Simulate download process
        setTimeout(() => {
            // Show success message
            $btn.html(`
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Downloaded!
            `);
            
            // Create a notification
            showNotification('Resume downloaded successfully!', 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                $btn.html(originalText).prop('disabled', false);
            }, 2000);
        }, 1500);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    $('.notification').remove();
    
    // Create notification element
    const notification = $(`
        <div class="notification notification-${type}">
            <div class="notification-content">
                ${type === 'success' ? `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
                        <path d="M6 10L9 13L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                ` : ''}
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `);
    
    // Add styles if not already added
    if (!$('#notification-styles').length) {
        $('head').append(`
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: var(--shadow-xl);
                    z-index: 9999;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                }
                
                .notification-success {
                    border-left: 3px solid #22c55e;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--text-primary);
                }
                
                .notification-content svg {
                    color: #22c55e;
                    flex-shrink: 0;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                
                .notification-close:hover {
                    background: var(--bg-card-hover);
                    color: var(--text-primary);
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        `);
    }
    
    // Add to body
    $('body').append(notification);
    
    // Close button functionality
    notification.find('.notification-close').on('click', function() {
        notification.css('animation', 'slideOutRight 0.3s ease-out');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.css('animation', 'slideOutRight 0.3s ease-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// Interactive Card Effects
// ===================================
$(document).on('mouseenter', '.feature-card, .timeline-content, .info-card, .hobby-card', function() {
    $(this).css('transform', 'translateY(-4px) scale(1.01)');
});

$(document).on('mouseleave', '.feature-card, .timeline-content, .info-card, .hobby-card', function() {
    $(this).css('transform', '');
});

// ===================================
// Tag Click Effect
// ===================================
$(document).on('click', '.tag', function() {
    const tagText = $(this).text();
    
    // Add pulse animation
    $(this).css({
        'animation': 'pulse 0.4s ease-out',
        'background': 'var(--primary-500)',
        'color': 'white',
        'border-color': 'var(--primary-500)'
    });
    
    setTimeout(() => {
        $(this).css({
            'animation': '',
            'background': '',
            'color': '',
            'border-color': ''
        });
    }, 400);
    
    // Show notification
    showNotification(`Tag "${tagText}" selected`, 'info');
});

// Add pulse animation
if (!$('#pulse-animation').length) {
    $('head').append(`
        <style id="pulse-animation">
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        </style>
    `);
}

// ===================================
// Social Link Animations
// ===================================
$(document).on('click', '.social-link', function(e) {
    e.preventDefault();
    
    const $link = $(this);
    
    // Add ripple effect
    $link.css('transform', 'scale(0.9)');
    
    setTimeout(() => {
        $link.css('transform', '');
    }, 150);
});

// ===================================
// Feature Link Click Effect
// ===================================
$(document).on('click', '.feature-link', function(e) {
    if ($(this).attr('href') === '#') {
        e.preventDefault();
        showNotification('This feature is coming soon!', 'info');
    }
});

// ===================================
// Page Load Animation
// ===================================
$(window).on('load', function() {
    $('body').css('opacity', '0').animate({ opacity: 1 }, 400);
});

// ===================================
// Typing Effect for Hero Title (Optional)
// ===================================
function initializeTypingEffect() {
    const heroTitle = $('.hero-title');
    if (heroTitle.length && heroTitle.find('.gradient-text').length) {
        const gradientText = heroTitle.find('.gradient-text');
        const originalText = gradientText.text();
        gradientText.text('');
        
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < originalText.length) {
                gradientText.text(gradientText.text() + originalText[index]);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
}

// ===================================
// Contact Item Copy to Clipboard
// ===================================
$(document).on('click', '.contact-value', function() {
    const text = $(this).text();
    
    // Create temporary textarea to copy text
    const $temp = $('<textarea>');
    $('body').append($temp);
    $temp.val(text).select();
    document.execCommand('copy');
    $temp.remove();
    
    // Visual feedback
    $(this).css('color', 'var(--primary-400)');
    setTimeout(() => {
        $(this).css('color', '');
    }, 300);
    
    // Show notification
    showNotification('Copied to clipboard!', 'success');
});

// ===================================
// Print Resume Functionality
// ===================================
function printResume() {
    window.print();
}

// Add keyboard shortcut for print (Ctrl+P)
$(document).on('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        if ($('.resume-container').length) {
            e.preventDefault();
            printResume();
        }
    }
});

// ===================================
// Easter Egg - Konami Code
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

$(document).on('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    $('body').css({
        'animation': 'rainbow 2s linear infinite',
        'background': 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
    });
    
    showNotification('🎉 Easter egg activated! Refresh to return to normal.', 'success');
    
    if (!$('#rainbow-animation').length) {
        $('head').append(`
            <style id="rainbow-animation">
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            </style>
        `);
    }
}

// ===================================
// Accessibility - Focus Indicators
// ===================================
$(document).on('focus', 'a, button, input, textarea', function() {
    $(this).css('outline', '2px solid var(--primary-400)');
    $(this).css('outline-offset', '2px');
});

$(document).on('blur', 'a, button, input, textarea', function() {
    $(this).css('outline', '');
    $(this).css('outline-offset', '');
});

// ===================================
// Preload Images (if any)
// ===================================
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// ===================================
// Performance Monitoring
// ===================================
if (window.performance && window.performance.timing) {
    $(window).on('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; color: #7c58ed; font-weight: bold;');
console.log('%cLooking for something? Feel free to explore the code!', 'font-size: 14px; color: #a0a0b0;');
console.log('%cBuilt with ❤️ using HTML, CSS, jQuery, and JavaScript', 'font-size: 12px; color: #707080;');
