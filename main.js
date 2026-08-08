/**
 * Kenneth James Aguitong - Portfolio Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initTypingEffect();
    initMobileMenu();
    initScrollHeader();
    initScrollProgress();
    initScrollReveal();
    renderSkills();
    renderCertifications();
    renderProjects();
    renderTimeline();
    initContactForm();
    initModals();
    initDynamicYear();
});

/* 1. Preloader Handler */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500);
    });
    // Fallback hide
    setTimeout(() => {
        if (!preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
        }
    }, 2500);
}

/* 2. Custom Cursor Glow */
function initCustomCursor() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;
    
    // Only activate cursor glow on desktop pointers
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    } else {
        cursorGlow.style.display = 'none';
    }
}

/* 3. Hero Animated Typing Effect */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || !portfolioData || !portfolioData.typingTitles) return;

    const titles = portfolioData.typingTitles;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full title
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* 4. Mobile Menu Toggle */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('hidden');
        if (isOpen) {
            menu.classList.remove('hidden');
            btn.innerHTML = '<i class="fa-solid fa-xmark text-2xl text-cyan-400"></i>';
        } else {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars-staggered text-2xl text-cyan-400"></i>';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars-staggered text-2xl text-cyan-400"></i>';
        });
    });
}

/* 5. Navbar Scroll Styling & Active Section Highlighting */
function initScrollHeader() {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header Backdrop effect
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'py-3', 'shadow-lg');
            navbar.classList.remove('py-5');
        } else {
            navbar.classList.remove('glass-nav', 'shadow-lg');
            navbar.classList.add('py-5');
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* 6. Scroll Progress Bar at Top */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

/* 7. Scroll Reveal & Skill Progress Trigger */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Skill Bar Fill if this element is a skill container
                if (entry.target.id === 'skills-container') {
                    animateSkillBars();
                    animateCircularSkills();
                }
                
                // Trigger Counter stats animation
                if (entry.target.id === 'stats-container') {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, #skills-container, #stats-container').forEach(el => {
        revealObserver.observe(el);
    });
}

/* 8. Render Skills Section & Progress Bars */
function renderSkills() {
    const skillList = document.getElementById('linear-skills-list');
    const circularList = document.getElementById('circular-skills-list');

    if (skillList && portfolioData.skills) {
        skillList.innerHTML = portfolioData.skills.map(skill => `
            <div class="glass-card p-4 rounded-2xl">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                            <i class="${skill.icon}"></i>
                        </div>
                        <span class="font-semibold text-slate-200">${skill.name}</span>
                    </div>
                    <span class="font-mono text-sm text-cyan-400 font-bold">${skill.level}%</span>
                </div>
                <div class="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
                    <div class="skill-bar-inner bg-gradient-to-r ${skill.color} h-full rounded-full w-0 transition-all duration-1000 ease-out" data-level="${skill.level}"></div>
                </div>
            </div>
        `).join('');
    }

    if (circularList && portfolioData.circularSkills) {
        circularList.innerHTML = portfolioData.circularSkills.map(cSkill => {
            const radius = 38;
            const circumference = 2 * Math.PI * radius;
            return `
                <div class="glass-card p-6 rounded-3xl flex flex-col items-center justify-center group hover:border-cyan-500/40">
                    <div class="relative w-28 h-28 flex items-center justify-center mb-3">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                            <circle class="circle-bg" cx="45" cy="45" r="${radius}"></circle>
                            <circle class="circle-progress" cx="45" cy="45" r="${radius}" 
                                stroke="${cSkill.color}" 
                                stroke-dasharray="${circumference}" 
                                stroke-dashoffset="${circumference}"
                                data-offset="${circumference - (cSkill.level / 100) * circumference}">
                            </circle>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <i class="fa-solid ${cSkill.icon} text-xl text-cyan-400 mb-0.5 group-hover:scale-110 transition-transform"></i>
                            <span class="font-mono font-bold text-lg text-white">${cSkill.level}%</span>
                        </div>
                    </div>
                    <h4 class="font-semibold text-slate-200 text-sm text-center">${cSkill.name}</h4>
                </div>
            `;
        }).join('');
    }
}

function animateSkillBars() {
    document.querySelectorAll('.skill-bar-inner').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
    });
}

function animateCircularSkills() {
    document.querySelectorAll('.circle-progress').forEach(circle => {
        const targetOffset = circle.getAttribute('data-offset');
        circle.style.strokeDashoffset = targetOffset;
    });
}

/* 9. Counter Animation */
function animateCounters() {
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, stepTime);
    });
}

/* 10. Certifications Render & Viewer */
function renderCertifications() {
    const container = document.getElementById('certifications-grid');
    if (!container || !portfolioData.certifications) return;

    container.innerHTML = portfolioData.certifications.map(cert => `
        <div class="glass-card p-6 rounded-3xl relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-cyan-500/50" onclick="openCertModal('${cert.id}')">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
            <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                    <i class="${cert.badgeIcon}"></i>
                </div>
                <div>
                    <span class="inline-block text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-1">${cert.date}</span>
                    <h3 class="font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">${cert.title}</h3>
                    <p class="text-xs text-slate-400 font-medium">${cert.issuer}</p>
                </div>
            </div>
            <p class="text-sm text-slate-300 line-clamp-2 mb-4">${cert.description}</p>
            <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-cyan-400 font-mono">
                <span>Credential ID: ${cert.credentialId}</span>
                <span class="flex items-center gap-1 group-hover:translate-x-1 transition-transform">LinkedIn <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></span>
            </div>
        </div>
    `).join('');
}

/* 11. Projects Filter & Grid Render */
function renderProjects(filterCategory = 'all') {
    const grid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.project-filter-btn');

    if (!grid || !portfolioData.projects) return;

    // Update active filter button state
    filterBtns.forEach(btn => {
        const cat = btn.getAttribute('data-filter');
        if (cat === filterCategory) {
            btn.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/20');
            btn.classList.remove('bg-slate-800/60', 'text-slate-300');
        } else {
            btn.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/20');
            btn.classList.add('bg-slate-800/60', 'text-slate-300');
        }
    });

    const filtered = filterCategory === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter(p => p.category === filterCategory);

    grid.innerHTML = filtered.map(p => `
        <div class="glass-card rounded-3xl overflow-hidden group flex flex-col h-full border border-slate-800 hover:border-cyan-500/40">
            <div class="relative overflow-hidden h-48 bg-slate-950">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                <button onclick="openProjectModal('${p.id}')" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all border border-slate-700">
                    <i class="fa-solid fa-expand text-sm"></i>
                </button>
            </div>
            <div class="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 class="font-bold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">${p.title}</h3>
                    <p class="text-sm text-slate-400 mb-4 line-clamp-3">${p.shortDesc}</p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-5">
                        ${p.technologies.map(tech => `
                            <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 border border-slate-700/60">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                        <button onclick="openProjectModal('${p.id}')" class="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
                            <i class="fa-solid fa-circle-info"></i> Details
                        </button>
                        <a href="${p.github}" target="_blank" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-sm" title="View Source Code">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${p.demo}" target="_blank" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all text-sm" title="Live Preview">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Bind filter click event
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-filter-btn')) {
        const cat = e.target.getAttribute('data-filter');
        renderProjects(cat);
    }
});

/* 12. Vertical Timeline Render */
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || !portfolioData.timeline) return;

    container.innerHTML = portfolioData.timeline.map((item, index) => `
        <div class="relative pl-8 md:pl-0 mb-10 group">
            <div class="md:grid md:grid-cols-5 md:gap-8 items-center">
                <!-- Left col / Year badge -->
                <div class="md:col-span-2 ${index % 2 === 0 ? 'md:text-right' : 'md:col-span-2 md:order-last'} mb-2 md:mb-0">
                    <span class="inline-block font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">${item.year}</span>
                    <h4 class="font-semibold text-slate-300 text-sm mt-1">${item.institution}</h4>
                </div>

                <!-- Center Circle Node -->
                <div class="absolute left-0 md:left-1/2 top-1.5 md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-xs shadow-lg shadow-cyan-500/20 group-hover:scale-125 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all z-10">
                    <i class="fa-solid ${item.icon}"></i>
                </div>

                <!-- Right col / Content Card -->
                <div class="md:col-span-2 ${index % 2 === 0 ? 'md:order-last' : 'md:text-right'}">
                    <div class="glass-card p-5 rounded-2xl text-left border border-slate-800 hover:border-cyan-500/40">
                        <h3 class="font-bold text-lg text-slate-100 mb-1">${item.title}</h3>
                        <p class="text-xs text-slate-400 leading-relaxed">${item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* 13. Contact Form Validation & Toast */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('contact-toast');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');

        let isValid = true;

        // Reset errors
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (input) input.classList.remove('border-red-500');
        });

        if (!nameInput.value.trim()) {
            nameInput.classList.add('border-red-500');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('border-red-500');
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectInput.classList.add('border-red-500');
            isValid = false;
        }

        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            messageInput.classList.add('border-red-500');
            isValid = false;
        }

        if (!isValid) {
            showToast("Please fix the highlighted fields before submitting.", "error");
            return;
        }

        // Simulate successful email dispatch
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            showToast("Thank you! Your message has been sent successfully. I will get back to you shortly.", "success");
        }, 1200);
    });
}

function showToast(message, type = "success") {
    const toast = document.getElementById('contact-toast');
    if (!toast) return;

    const icon = type === "success" 
        ? '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>' 
        : '<i class="fa-solid fa-triangle-exclamation text-rose-400 text-lg"></i>';

    toast.innerHTML = `
        <div class="flex items-center gap-3 glass-card px-5 py-3.5 rounded-2xl border ${type === "success" ? "border-emerald-500/40 bg-slate-900/90 text-slate-100" : "border-rose-500/40 bg-slate-900/90 text-slate-100"} shadow-2xl">
            ${icon}
            <span class="text-sm font-medium">${message}</span>
        </div>
    `;

    toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
}

/* 14. Modals Controller (Project, Certificate, CV Preview) */
function initModals() {
    // Global close listeners
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('open');
    });
    document.body.style.overflow = '';
}

function openProjectModal(projectId) {
    const p = portfolioData.projects.find(item => item.id === projectId);
    if (!p) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-body');

    content.innerHTML = `
        <div class="relative h-64 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-slate-800">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>
        <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase">${p.category}</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-100 mb-3">${p.title}</h2>
        <p class="text-slate-300 text-sm leading-relaxed mb-6">${p.fullDesc}</p>
        
        <h4 class="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">Key Highlights & Architecture</h4>
        <ul class="space-y-2 mb-6 text-sm text-slate-300">
            ${p.highlights.map(h => `<li class="flex items-start gap-2"><i class="fa-solid fa-shield-halved text-cyan-400 text-xs mt-1"></i> <span>${h}</span></li>`).join('')}
        </ul>

        <h4 class="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">Technologies Used</h4>
        <div class="flex flex-wrap gap-2 mb-8">
            ${p.technologies.map(tech => `<span class="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">${tech}</span>`).join('')}
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <a href="${p.github}" target="_blank" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all">
                <i class="fab fa-github text-sm"></i> GitHub Repo
            </a>
            <a href="${p.demo}" target="_blank" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
                <i class="fa-solid fa-up-right-from-square text-xs"></i> Live Project
            </a>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openCertModal(certId) {
    const c = portfolioData.certifications.find(item => item.id === certId);
    if (!c) return;

    const modal = document.getElementById('cert-modal');
    const content = document.getElementById('cert-modal-body');

    content.innerHTML = `
        <div class="flex flex-col items-center text-center p-4">
            <div class="w-20 h-20 rounded-3xl bg-gradient-to-br ${c.badgeColor} flex items-center justify-center text-white text-3xl shadow-2xl mb-4 border border-white/20">
                <i class="${c.badgeIcon}"></i>
            </div>
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 mb-2">Issued ${c.date}</span>
            <h2 class="text-2xl font-bold text-slate-100 mb-1">${c.title}</h2>
            <p class="text-sm font-semibold text-slate-400 mb-4">${c.issuer}</p>

            <div class="w-full glass-card p-4 rounded-2xl mb-6 text-left border border-slate-800">
                <p class="text-slate-300 text-xs leading-relaxed mb-3">${c.description}</p>
                <div class="text-xs font-mono text-cyan-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span>Credential ID:</span>
                    <span class="text-slate-200 font-bold">${c.credentialId}</span>
                </div>
            </div>

            <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">Core Competencies Verified</h4>
            <div class="flex flex-wrap justify-center gap-2 mb-6">
                ${c.topics.map(topic => `<span class="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700/80">${topic}</span>`).join('')}
            </div>

            <div class="flex items-center gap-3 w-full">
                <a href="${c.linkedinUrl}" target="_blank" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                    <i class="fab fa-linkedin text-sm"></i> Verify on LinkedIn
                </a>
                <button onclick="closeAllModals()" class="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-all">
                    Close
                </button>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openCVModal() {
    const modal = document.getElementById('cv-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/* 15. Dynamic Year */
function initDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
