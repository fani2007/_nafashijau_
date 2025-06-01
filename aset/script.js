document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
  
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .testimonial-card, .hero-title, .hero-text').forEach(el => {
        observer.observe(el);
    });

    const communityCards = document.querySelectorAll('.community-section .card');
    communityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function handleJoinCommunity() {
        const joinButtons = document.querySelectorAll('[href="#"]:not(.nav-link)');
        joinButtons.forEach(button => {
            if (button.textContent.includes('Bergabung') || button.textContent.includes('Masuk')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    showJoinModal();
                });
            }
        });
    }

    function showJoinModal() {
        const modalHTML = `
            <div class="modal fade" id="joinModal" tabindex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="joinModalLabel">Bergabung dengan Komunitas Nafas Hijau</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="joinForm">
                                <div class="mb-3">
                                    <label for="fullName" class="form-label">Nama Lengkap</label>
                                    <input type="text" class="form-control" id="fullName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="city" class="form-label">Kota</label>
                                    <input type="text" class="form-control" id="city" required>
                                </div>
                                <div class="mb-3">
                                    <label for="interest" class="form-label">Minat Lingkungan</label>
                                    <select class="form-select" id="interest" required>
                                        <option value="">Pilih minat Anda</option>
                                        <option value="recycling">Daur Ulang</option>
                                        <option value="renewable">Energi Terbarukan</option>
                                        <option value="conservation">Konservasi Alam</option>
                                        <option value="sustainable">Gaya Hidup Berkelanjutan</option>
                                        <option value="education">Edukasi Lingkungan</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary" onclick="submitJoinForm()">Bergabung</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('joinModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        const modal = new bootstrap.Modal(document.getElementById('joinModal'));
        modal.show();
    }
  
    window.submitJoinForm = function() {
        const form = document.getElementById('joinForm');
        const formData = new FormData(form);
        
        if (form.checkValidity()) {
            const submitButton = document.querySelector('#joinModal .btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Memproses...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Selamat! Anda berhasil bergabung dengan komunitas Nafas Hijau. Kami akan menghubungi Anda segera.');
                bootstrap.Modal.getInstance(document.getElementById('joinModal')).hide();
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        } else {
            form.reportValidity();
        }
    };

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString('id-ID');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('id-ID');
                }
            }, 16);
        });
    }

    function handleNewsletterSubscription() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                alert(`Terima kasih! Email ${email} telah berhasil berlangganan newsletter Nafas Hijau.`);
                this.reset();
            });
        });
    }

    function initializeSearch() {
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                // Implement search logic here based on your content
                console.log('Searching for:', query);
            });
        });
    }
  
    function initializeSocialSharing() {
        const shareButtons = document.querySelectorAll('.social-share');
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.dataset.platform;
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Bergabung dengan komunitas Nafas Hijau untuk lingkungan yang lebih baik!');
                
                let shareUrl = '';
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${text} ${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    handleJoinCommunity();
    handleNewsletterSubscription();
    initializeSearch();
    initializeSocialSharing();

    window.loadMoreContent = function(section) {
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Memuat...';
        button.disabled = true;
        
        setTimeout(() => {
            console.log(`Loading more content for ${section}`);
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    };
  
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color, #28a745);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('Nafas Hijau Community Website loaded successfully!');
});

const additionalStyles = `
.fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.navbar-scrolled {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    background-color: rgba(255,255,255,0.95) !important;
    backdrop-filter: blur(10px);
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.back-to-top:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
`;
