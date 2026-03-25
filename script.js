const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
const downloadBtn = document.getElementById('download-btn');
const imageUpload = document.getElementById('image-upload');

// 1. Open Lightbox
galleryGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-item')) {
        lightboxImg.src = e.target.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
});

// 2. Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
}

closeBtn.addEventListener('click', closeLightbox);

// Close on background click (works for mouse and touch)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Close with keyboard (for laptops/desktops)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// 3. Upload Image via FileReader
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const newImg = document.createElement('img');
            newImg.src = event.target.result; 
            newImg.alt = "Uploaded image";
            newImg.classList.add('gallery-item');
            
            // Add to the top of the grid
            galleryGrid.prepend(newImg);
        };
        
        reader.readAsDataURL(file);
        e.target.value = ''; 
    }
});

// 4. Download Image
downloadBtn.addEventListener('click', () => {
    const currentImgSrc = lightboxImg.src;
    
    const link = document.createElement('a');
    link.href = currentImgSrc;
    link.download = `moment-${Date.now()}.jpg`; 
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});