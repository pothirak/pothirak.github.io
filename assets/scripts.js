document.addEventListener('DOMContentLoaded', () => {
    const galleryNav = document.getElementById('nav-gallery');
    const infoNav = document.getElementById('nav-info');
    const gallerySection = document.getElementById('gallery');
    const infoSection = document.getElementById('info');

    // Handle tab switching
    function switchTab(tab) {
        if (tab === 'gallery') {
            galleryNav.classList.add('active');
            infoNav.classList.remove('active');
            
            infoSection.classList.remove('active-section');
            // Small timeout to allow display change before animation
            setTimeout(() => {
                gallerySection.classList.add('active-section');
            }, 10);
            
            window.location.hash = 'gallery';
        } else if (tab === 'info') {
            infoNav.classList.add('active');
            galleryNav.classList.remove('active');
            
            gallerySection.classList.remove('active-section');
            // Small timeout to allow display change before animation
            setTimeout(() => {
                infoSection.classList.add('active-section');
            }, 10);
            
            window.location.hash = 'info';
        }
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event listeners
    galleryNav.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('gallery');
    });

    infoNav.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab('info');
    });

    // Check hash on load
    if (window.location.hash === '#info') {
        switchTab('info');
    } else {
        switchTab('gallery');
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Image Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    // Handle clicks on cards to open modal instead of new tab
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent opening in new tab
            
            const imgSrc = this.getAttribute('href');
            const title = this.querySelector('.card-title').textContent;
            
            modalImg.src = imgSrc;
            captionText.textContent = title;
            
            modal.style.display = 'flex';
            // Slight delay to allow display: flex to apply before transitioning opacity
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Disable body scrolling
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match the transition duration
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === captionText) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});