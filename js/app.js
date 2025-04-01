// Mobile Menu Toggle and UI Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Setup
    setupMobileMenu();
    
    // Load Content
    loadArticles();
    loadWriters();
    
    // Setup Animations
    setupAnimations();
});

// API Functions
async function loadArticles() {
    try {
        const response = await fetch('/api/articles');
        const articles = await response.json();
        renderArticles(articles);
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

async function loadWriters() {
    try {
        const response = await fetch('/api/writers');
        const writers = await response.json();
        renderWriters(writers);
    } catch (error) {
        console.error('Error loading writers:', error);
    }
}

// Render Functions
function renderArticles(articles) {
    const featuredArticle = articles[0];
    const regularArticles = articles.slice(1);

    // Render featured article
    const mainContent = document.querySelector('.flex-1.max-w-content');
    if (mainContent && featuredArticle) {
        const featuredSection = document.createElement('article');
        featuredSection.className = 'mb-12 hover-scale article-card rounded-xl overflow-hidden';
        featuredSection.innerHTML = `
            <div class="featured-image rounded-lg overflow-hidden mb-6">
                <img src="${featuredArticle.image}" alt="${featuredArticle.title}" 
                    class="w-full h-[450px] object-cover transform transition-transform duration-700 hover:scale-105">
            </div>
            <div class="flex items-center space-x-2 text-subtext mb-4">
                <img src="${featuredArticle.author.avatar}" alt="${featuredArticle.author.name}" 
                    class="w-10 h-10 rounded-full">
                <span>${featuredArticle.author.name}</span>
                <span>·</span>
                <span>${featuredArticle.readTime}</span>
            </div>
            <h2 class="text-3xl font-bold mb-4 hover:text-accent-hover cursor-pointer">
                ${featuredArticle.title}
            </h2>
            <p class="text-lg text-subtext mb-4">${featuredArticle.description}</p>
            <div class="flex items-center space-x-4 text-subtext">
                ${featuredArticle.tags.map(tag => 
                    `<span class="bg-secondary px-3 py-1 rounded-full">${tag}</span>`
                ).join('')}
            </div>
        `;
        mainContent.innerHTML = '';
        mainContent.appendChild(featuredSection);

        // Create and append regular articles section
        const articlesSection = document.createElement('div');
        articlesSection.className = 'space-y-8';
        articlesSection.innerHTML = regularArticles.map(article => `
            <article class="flex gap-6 hover-scale article-card p-4 rounded-xl">
                <div class="flex-1">
                    <div class="flex items-center space-x-2 text-subtext mb-2">
                        <img src="${article.author.avatar}" alt="${article.author.name}" 
                            class="w-7 h-7 rounded-full">
                        <span>${article.author.name}</span>
                        <span>·</span>
                        <span>${article.readTime}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2 hover:text-accent-hover cursor-pointer">
                        ${article.title}
                    </h3>
                    <p class="text-subtext">${article.description}</p>
                </div>
                <img src="${article.image}" alt="${article.title}" 
                    class="w-[200px] h-[134px] object-cover rounded-lg">
            </article>
        `).join('');
        mainContent.appendChild(articlesSection);
    }
}

function renderWriters(writers) {
    const writersSection = document.querySelector('.border-t.border-border.pt-8');
    if (writersSection) {
        const writersContainer = document.createElement('div');
        writersContainer.className = 'space-y-6';
        writersContainer.innerHTML = writers.map(writer => `
            <div class="flex items-center justify-between hover-scale p-3 rounded-xl transition-all duration-200 hover:bg-secondary">
                <div class="flex items-center space-x-3">
                    <img src="${writer.avatar}" alt="${writer.name}" class="w-10 h-10 rounded-full">
                    <div>
                        <p class="font-bold">${writer.name}</p>
                        <p class="text-sm text-subtext">${writer.role}</p>
                    </div>
                </div>
                <button class="text-accent hover:text-accent-hover px-4 py-1 rounded-full border border-accent hover:bg-accent hover:text-white transition-all duration-200">
                    Follow
                </button>
            </div>
        `).join('');
        writersSection.querySelector('.space-y-4')?.remove();
        writersSection.appendChild(writersContainer);
    }
}

// UI Setup Functions
function setupMobileMenu() {
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

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
}

function setupAnimations() {
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

    document.querySelectorAll('article, .tag').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.transition = 'transform 0.3s ease';
        });
    });
}
