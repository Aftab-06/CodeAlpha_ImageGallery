  
        document.addEventListener('DOMContentLoaded', function() {
            // Category Filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.dataset.filter;
                    
                    // Filter items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Image Filter Effects
            const imageFilterButtons = document.querySelectorAll('.image-filter-btn');
            const images = document.querySelectorAll('.image-filter');
            
            imageFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    imageFilterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.dataset.filter;
                    
                    // Apply filters to images
                    images.forEach(image => {
                        switch(filter) {
                            case 'grayscale':
                                image.style.filter = 'grayscale(100%)';
                                break;
                            case 'sepia':
                                image.style.filter = 'sepia(100%)';
                                break;
                            case 'blur':
                                image.style.filter = 'blur(2px)';
                                break;
                            case 'brightness':
                                image.style.filter = 'brightness(150%)';
                                break;
                            default:
                                image.style.filter = 'none';
                        }
                    });
                });
            });
            
            // Lightbox functionality
            const lightbox = document.querySelector('.lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxTitle = document.getElementById('lightbox-title');
            const lightboxDesc = document.getElementById('lightbox-desc');
            const closeLightbox = document.getElementById('close-lightbox');
            const nextBtn = document.getElementById('next-btn');
            const prevBtn = document.getElementById('prev-btn');
            
            let currentIndex = 0;
            let filteredItems = Array.from(galleryItems);
            
            // Open lightbox when clicking on gallery item
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // Get currently visible items based on active filter
                    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
                    filteredItems = Array.from(galleryItems).filter(item => {
                        return activeFilter === 'all' || item.dataset.category === activeFilter;
                    }).filter(item => item.style.display !== 'none');
                    
                    // Find the index of the clicked item in the filtered list
                    currentIndex = filteredItems.findIndex(filteredItem => filteredItem === item);
                    
                    // Update lightbox content
                    updateLightbox();
                    
                    // Show lightbox
                    lightbox.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close lightbox
            closeLightbox.addEventListener('click', () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
            
            // Next image
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % filteredItems.length;
                updateLightbox();
            });
            
            // Previous image
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                updateLightbox();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('show')) {
                    if (e.key === 'Escape') {
                        lightbox.classList.remove('show');
                        document.body.style.overflow = 'auto';
                    } else if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % filteredItems.length;
                        updateLightbox();
                    } else if (e.key === 'ArrowLeft') {
                        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                        updateLightbox();
                    }
                }
            });
            
            // Update lightbox content
            function updateLightbox() {
                const currentItem = filteredItems[currentIndex];
                const imgSrc = currentItem.querySelector('img').src;
                const title = currentItem.querySelector('h3').textContent;
                const desc = currentItem.querySelector('p').textContent;
                
                lightboxImage.src = imgSrc;
                lightboxImage.alt = title;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
            }
            
            // Close lightbox when clicking on backdrop
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        });
   