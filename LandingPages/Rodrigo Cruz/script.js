document.addEventListener('DOMContentLoaded', function() {
    
    // Button click handler
    const supportBtn = document.querySelector('.support-btn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            // You can add your support/donation logic here
            console.log('Support button clicked!');
            
            // Example: redirect to support page
            // window.location.href = '/support';
        });
    }
    
    // Smooth scroll behavior for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for video
    const video = document.querySelector('.video-background');
    if (video) {
        video.addEventListener('loadstart', function() {
            console.log('Video started loading');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can play');
        });
        
        video.addEventListener('error', function(e) {
            console.log('Video error:', e);
            // Fallback to background gradient if video fails
            video.style.display = 'none';
        });
    }
    
    // Counter animation (optional - for future enhancement)
    function animateCounter() {
        const counter = document.querySelector('.counter-text');
        if (counter) {
            const target = 4500;
            const duration = 2000; // 2 seconds
            const start = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                counter.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    }
    
    // Trigger counter animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Uncomment to enable counter animation
                // animateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const counterElement = document.querySelector('.counter-text');
    if (counterElement) {
        observer.observe(counterElement);
    }
    
    // Responsive text sizing adjustment
    function adjustTextSize() {
        const container = document.querySelector('.container2');
        const containerWidth = container.offsetWidth;
        
        // Dynamic font size adjustment based on container width
        if (containerWidth < 480) {
            document.documentElement.style.setProperty('--main-text-size', '1.5rem');
            document.documentElement.style.setProperty('--counter-text-size', '1.75rem');
        } else if (containerWidth < 768) {
            document.documentElement.style.setProperty('--main-text-size', '2rem');
            document.documentElement.style.setProperty('--counter-text-size', '2.25rem');
        } else {
            document.documentElement.style.setProperty('--main-text-size', '3.5rem');
            document.documentElement.style.setProperty('--counter-text-size', '3.75rem');
        }
    }
    
    // Initial adjustment and on resize
    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);
    
    console.log('EcoMar website loaded successfully!');
});



const s = document.querySelector('.section2');
if (s) {
    const observer = new IntersectionObserver(([entry]) => {
        const r = entry.intersectionRatio;
        const rect = entry.boundingClientRect;

        // Only apply transform when section is entering the viewport from below (above the scroll)
        if (rect.top > 0) {  
            // visible portion 0 → 0.6 mapped to 0.60 → 1.00 scale
            const p = Math.min(1, r / 0.60);
            const scale = 0.80 + 0.20 * p;
            const ty = (1 - scale) * 280;
            s.style.transform = `translate3d(0,${ty.toFixed(4)}px,0) scale(${scale},${scale})`;
        } else {
            // Once it's past (above viewport), lock to final state
            s.style.transform = `translate3d(0,0,0) scale(1,1)`;
        }
    }, { threshold: Array.from({ length: 101 }, (_, i) => i * 0.01) });

    observer.observe(s);
}


/*  Slide-in first, then count  */
const block  = document.querySelector('.middle-container');
const counterEl = document.querySelector('.counter-text');

window.addEventListener('load', () => {
    setTimeout(() => block.classList.add('slide-in'), 150); // slight delay for paint

    setTimeout(() => {               // count starts after slide-in finishes (~800 ms)
        if (!counterEl) return;
        const target   = 4500;
        const duration = 1700;       // 2-second run
        const step     = target / (duration / 16);
        let current    = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                counterEl.textContent = '4500+';
            } else {
                counterEl.textContent = Math.floor(current);
            }
        }, 16);
    }, 900);
});

/*  0 → 120+  and  0 → 5000+  after 60 % of .container3 is visible  */
function runCount(elId, target, suffix, dur = 1700) {
    const el = document.getElementById(elId);
    if (!el) return;
    const step = target / (dur / 16);
    let n = 0;
    const t = setInterval(() => {
        n += step;
        if (n >= target) { clearInterval(t); el.textContent = target + suffix; }
        else el.textContent = Math.floor(n);
    }, 16);
}

const container3 = document.querySelector('.container3');
if (container3) {   
    new IntersectionObserver((e, o) => {
        if (e[0].intersectionRatio >= 0.40) {   // 60 % visible
            runCount('stat1', 120, '+');
            runCount('stat3', 5000, '+');
            o.unobserve(container3);            // run once
        }
    }, { threshold: 0.40 }).observe(container3);
}


/*  30 % in  →  100 % out  */
const textObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(en => {
            if (en.intersectionRatio >= 0.30) {
                en.target.classList.add('in-view');      // show
            }
            if (en.intersectionRatio === 0) {
                en.target.classList.remove('in-view');   // hide only when fully out
            }
        });
    },
    { threshold: [0, 0.30, 1] }   // watch 0 %, 30 % and 100 %
);

document.querySelectorAll('.text-container, .right-box').forEach(box => {
    const txt = box.querySelector('.main-text');
    if (txt) textObserver.observe(txt);
});

const textObserver2 = new IntersectionObserver(
    (entries) => {
        entries.forEach(en => {
            if (en.intersectionRatio >= 0.30) {
                en.target.classList.add('in-view');
            }
            if (en.intersectionRatio === 0) {
                en.target.classList.remove('in-view');
            }
        });
    },
    { threshold: [0, 0.30, 1] }
);

document.querySelectorAll('.main-text2').forEach(el => textObserver2.observe(el));