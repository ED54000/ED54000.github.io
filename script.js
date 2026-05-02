document.addEventListener('DOMContentLoaded', () => {

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const themeToggle = document.getElementById('theme-toggle');
    const htmlRoot = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlRoot.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
        if (isDark) {
            htmlRoot.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            htmlRoot.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const sectionObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, sectionObserverOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                    if (target > 10) stat.textContent += '+';
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.section-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Fetch GitHub repositories count
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/ED54000');
            const data = await response.json();
            const reposElement = document.getElementById('github-repos');
            if (reposElement && data.public_repos) {
                reposElement.textContent = data.public_repos + '+';
            }
        } catch (error) {
            console.log('GitHub API not available, keeping static value');
            const reposElement = document.getElementById('github-repos');
            if (reposElement) {
                reposElement.textContent = '34+';
            }
        }
    }

    // Call when DOM is loaded
    fetchGitHubRepos();

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero::before');
        if (hero && scrolled < window.innerHeight) {
            document.querySelector('.hero').style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        height: 3px;
        background: var(--color-accent);
        z-index: 10001;
        transition: width 0.2s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    let konamiCode = [];
    const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    window.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === pattern.join(',')) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(event, modalId) {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
        closeModalForce(modalId);
    }
}

function closeModalForce(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);