// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden fixed inset-0 bg-primary z-40 transform transition-transform duration-300 translate-x-full';
    mobileMenu.innerHTML = `
        <div class="p-4 border-b border-border flex justify-between items-center">
            <h1 class="text-2xl font-bold">CherifsMagazine</h1>
            <button class="text-2xl close-menu">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <nav class="p-4">
            <ul class="space-y-4">
                <li><a href="#" class="block py-2 hover:text-accent-hover">Home</a></li>
                <li><a href="#" class="block py-2 hover:text-accent-hover">Our Story</a></li>
                <li><a href="#" class="block py-2 hover:text-accent-hover">Write</a></li>
                <li><a href="#" class="block py-2 hover:text-accent-hover">Sign In</a></li>
                <li>
                    <button class="w-full bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-full transition-colors">
                        Get Started
                    </button>
                </li>
            </ul>
        </nav>
    `;
    document.body.appendChild(mobileMenu);

    const closeMenuButton = mobileMenu.querySelector('.close-menu');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    // Close mobile menu
    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe all articles and sidebar items
    document.querySelectorAll('article, .tag').forEach(el => {
        observer.observe(el);
    });

    // Enhanced hover effects
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });

    // Add smooth transitions to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.transition = 'transform 0.3s ease';
        });
    });
});

// Reading Time Calculator
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
}
