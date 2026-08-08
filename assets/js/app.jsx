/**
 * Kenneth James Aguitong Portfolio - Main React 18 Application
 */

const { useState, useEffect, useRef } = React;

function App() {
    // 1. React States
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('portfolio-theme') || 'dark';
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectModalTab, setProjectModalTab] = useState('overview');
    const [portalAlert, setPortalAlert] = useState(null);
    const [portalAlertLoading, setPortalAlertLoading] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [cvModalOpen, setCvModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');

    // Hero Typing Effect State
    const [typingText, setTypingText] = useState('');
    const [titleIdx, setTitleIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Contact Form State
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // 2. Theme Toggle Effect
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            document.body.style.backgroundColor = '#f8fafc';
            document.body.style.color = '#0f172a';
            document.documentElement.classList.remove('dark');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.style.backgroundColor = '#0b0f19';
            document.body.style.color = '#f1f5f9';
            document.documentElement.classList.add('dark');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    // 3. Scroll Listener Effect
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPct = height > 0 ? (winScroll / height) * 100 : 0;
            setScrollProgress(scrolledPct);

            setScrolled(winScroll > 50);

            // Active section detection
            const sections = document.querySelectorAll('section[id]');
            let current = 'hero';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 130;
                if (winScroll >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 4. Hero Typing Animation Effect
    useEffect(() => {
        const titles = portfolioData.typingTitles || [];
        if (titles.length === 0) return;

        const currentTitle = titles[titleIdx];
        let timer;

        if (isDeleting) {
            timer = setTimeout(() => {
                setTypingText(currentTitle.substring(0, charIdx - 1));
                setCharIdx(prev => prev - 1);
            }, 50);
        } else {
            timer = setTimeout(() => {
                setTypingText(currentTitle.substring(0, charIdx + 1));
                setCharIdx(prev => prev + 1);
            }, 100);
        }

        if (!isDeleting && charIdx === currentTitle.length) {
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIdx === 0) {
            setIsDeleting(false);
            setTitleIdx(prev => (prev + 1) % titles.length);
        }

        return () => clearTimeout(timer);
    }, [charIdx, isDeleting, titleIdx]);

    // 5. Toast Timer Effect
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    // 6. Action Handlers
    const handlePortalAction = (portalName) => {
        setPortalAlertLoading(true);
        setPortalAlert(`Connecting to ${portalName} endpoint (Encrypted SSL Session)...`);

        setTimeout(() => {
            setPortalAlertLoading(false);
            setPortalAlert(`Accessing ${portalName} authentication portal... Redirecting to MSWDO secure server.`);
        }, 1200);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        if (!form.name.trim()) errors.name = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim() || !emailRegex.test(form.email.trim())) errors.email = true;
        if (!form.subject.trim()) errors.subject = true;
        if (!form.message.trim() || form.message.trim().length < 10) errors.message = true;

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setToast({
                show: true,
                message: 'Please fix the highlighted fields before submitting.',
                type: 'error'
            });
            return;
        }

        setFormErrors({});
        setFormSubmitting(true);

        setTimeout(() => {
            setFormSubmitting(false);
            setForm({ name: '', email: '', subject: '', message: '' });
            setToast({
                show: true,
                message: 'Thank you! Your message has been sent successfully. Kenneth will get back to you shortly.',
                type: 'success'
            });
        }, 1200);
    };

    const openProjectModal = (proj) => {
        setSelectedProject(proj);
        setProjectModalTab('overview');
        setPortalAlert(null);
        document.body.style.overflow = 'hidden';
    };

    const closeModals = () => {
        setSelectedProject(null);
        setSelectedCert(null);
        setCvModalOpen(false);
        document.body.style.overflow = '';
    };

    const filteredProjects = activeCategory === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter(p => p.category === activeCategory);

    return (
        <div className="relative min-h-screen">
            {/* Scroll Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Header Navigation */}
            <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-lg' : 'py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <a href="#hero" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-mono font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                            KA
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">Kenneth Aguitong</span>
                            <span className="font-mono text-[10px] text-cyan-400 tracking-wider">CYBERSEC // BSIT</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['hero', 'about', 'skills', 'certifications', 'projects', 'experience', 'contact'].map(sec => (
                            <a
                                key={sec}
                                href={`#${sec}`}
                                className={`nav-link text-sm font-medium transition-colors capitalize ${activeSection === sec ? 'active text-cyan-400 font-semibold' : 'text-slate-300 hover:text-cyan-400'}`}
                            >
                                {sec === 'experience' ? 'Timeline' : sec}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 text-amber-400 hover:text-amber-300 flex items-center justify-center transition-all shadow-md hover:scale-105 cursor-pointer relative z-50"
                            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                        >
                            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-600'} text-lg`} />
                        </button>

                        <button
                            type="button"
                            onClick={() => { setCvModalOpen(true); document.body.style.overflow = 'hidden'; }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-file-arrow-down" /> Resume
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 focus:outline-none cursor-pointer"
                    >
                        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`} />
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden glass-nav mt-3 border-b border-slate-800 py-4 px-6 space-y-3">
                        {['hero', 'about', 'skills', 'certifications', 'projects', 'experience', 'contact'].map(sec => (
                            <a
                                key={sec}
                                href={`#${sec}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="mobile-nav-link block text-sm font-semibold text-slate-200 hover:text-cyan-400 py-1 capitalize"
                            >
                                {sec === 'experience' ? 'Timeline' : sec}
                            </a>
                        ))}
                        <div className="pt-2 border-t border-slate-800 space-y-2">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-600'}`} />
                                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => { setMobileMenuOpen(false); setCvModalOpen(true); document.body.style.overflow = 'hidden'; }}
                                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <i className="fa-solid fa-file-arrow-down" /> Download Resume
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO SECTION */}
            <section id="hero" className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 font-mono text-xs">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                <span>Available for Entry-Level Roles & Internships</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                Hi, I'm <span className="gradient-text">{portfolioData.personal.name}</span>
                            </h1>

                            <div className="text-xl sm:text-2xl font-mono text-slate-300 font-medium h-12 flex items-center justify-center lg:justify-start">
                                <span className="text-cyan-400 font-semibold">{typingText}</span>
                                <span className="typing-cursor" />
                            </div>

                            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                {portfolioData.personal.bio}
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setCvModalOpen(true); document.body.style.overflow = 'hidden'; }}
                                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer group"
                                >
                                    <i className="fa-solid fa-file-arrow-down text-base group-hover:scale-110 transition-transform" /> Download CV
                                </button>
                                <a
                                    href="#projects"
                                    className="px-6 py-3.5 rounded-2xl glass-card border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-semibold text-sm transition-all flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-code" /> View Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-all border border-slate-800 flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-envelope" /> Contact Me
                                </a>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Connect:</span>
                                <a href={portfolioData.personal.socials.github} target="_blank" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all">
                                    <i className="fab fa-github text-lg" />
                                </a>
                                <a href={portfolioData.personal.socials.linkedin} target="_blank" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all">
                                    <i className="fab fa-linkedin-in text-lg" />
                                </a>
                                <a href={portfolioData.personal.socials.facebook} target="_blank" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all">
                                    <i className="fab fa-facebook-f text-lg" />
                                </a>
                                <a href={portfolioData.personal.socials.email} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all">
                                    <i className="fa-solid fa-envelope text-lg" />
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-2xl animate-pulse" />
                                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-slate-900/80 border-2 border-cyan-500/40 shadow-2xl overflow-hidden group">
                                    <img src="assets/images/profile.jpg" alt={portfolioData.personal.name} className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-2 right-6 w-12 h-12 rounded-2xl bg-slate-950 border border-cyan-500/60 text-cyan-400 flex items-center justify-center shadow-lg">
                                        <i className="fa-solid fa-shield-cat text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Background & Purpose</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">About Me</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="glass-card p-8 rounded-3xl space-y-4">
                                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                                    <i className="fa-solid fa-user-gear text-cyan-400" /> Professional Profile
                                </h3>
                                <p className="text-slate-300 leading-relaxed">
                                    I am an ambitious Information Technology student specializing in Cybersecurity and Systems Administration. Based in Cebu, Philippines, my academic journey is driven by a deep technical curiosity to understand how software, protocols, and hardware intersect under real-world threat vectors.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    Through hands-on lab environments, ethical hacking exercises, and practical full-stack web projects, I strive to bridge the gap between intuitive user experience and robust defense-in-depth architecture.
                                </p>
                                
                                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 mt-4">
                                    <h4 className="font-mono text-xs font-bold uppercase text-cyan-400 mb-1 flex items-center gap-2">
                                        <i className="fa-solid fa-quote-left" /> Cybersecurity Passion
                                    </h4>
                                    <p className="text-xs text-slate-300 italic">
                                        "{portfolioData.personal.passionStatement}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {portfolioData.personal.stats.map((st, idx) => (
                                    <div key={idx} className="glass-card p-6 rounded-3xl text-center border-t-2 border-t-cyan-400">
                                        <div className="font-mono text-4xl font-extrabold text-white mb-1 flex justify-center items-center">
                                            <span>{st.value}</span><span className="text-cyan-400">{st.suffix}</span>
                                        </div>
                                        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{st.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Technical Stack</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Skills & Competencies</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolioData.skills.map((sk, idx) => (
                            <div key={idx} className="glass-card p-4 rounded-2xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                                            <i className={sk.icon} />
                                        </div>
                                        <span className="font-semibold text-slate-200">{sk.name}</span>
                                    </div>
                                    <span className="font-mono text-sm text-cyan-400 font-bold">{sk.level}%</span>
                                </div>
                                <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
                                    <div className={`bg-gradient-to-r ${sk.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${sk.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CERTIFICATIONS SECTION */}
            <section id="certifications" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Verified Qualifications</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Certifications</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioData.certifications.map(cert => (
                            <div
                                key={cert.id}
                                onClick={() => { setSelectedCert(cert); document.body.style.overflow = 'hidden'; }}
                                className="glass-card p-6 rounded-3xl relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-cyan-500/50 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white text-xl shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                                        <i className={cert.badgeIcon} />
                                    </div>
                                    <div>
                                        <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-1">{cert.date}</span>
                                        <h3 className="font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">{cert.title}</h3>
                                        <p className="text-xs text-slate-400 font-medium">{cert.issuer}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300 line-clamp-2 mb-4">{cert.description}</p>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-cyan-400 font-mono">
                                    <span>ID: {cert.credentialId}</span>
                                    <span className="flex items-center gap-1">Details <i className="fa-solid fa-arrow-right text-xs" /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Portfolio Showcase</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Featured Projects</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    {/* Filter Category Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {[
                            { id: 'all', label: 'All Projects' },
                            { id: 'webapp', label: 'Web Applications' }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-2xl text-xs font-semibold font-mono transition-all cursor-pointer ${activeCategory === cat.id ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map(p => (
                            <div key={p.id} className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full border border-slate-800 hover:border-cyan-500/40 transition-all">
                                <div className="relative overflow-hidden h-52 bg-slate-950">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                                    <button
                                        type="button"
                                        onClick={() => openProjectModal(p)}
                                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all border border-slate-700 cursor-pointer"
                                        title="Expand Details"
                                    >
                                        <i className="fa-solid fa-expand text-sm" />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-grow justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase">{p.category}</span>
                                            {p.subtitle && <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/40">{p.subtitle}</span>}
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">{p.title}</h3>
                                        <p className="text-sm text-slate-400 mb-4 line-clamp-3">{p.shortDesc}</p>
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {p.technologies.map((tech, idx) => (
                                                <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 border border-slate-700/60">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                                            <button
                                                type="button"
                                                onClick={() => openProjectModal(p)}
                                                className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                            >
                                                <i className="fa-solid fa-circle-info" /> View Details & Demo
                                            </button>
                                            <a href={p.github} target="_blank" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-sm" title="GitHub Repo">
                                                <i className="fab fa-github" />
                                            </a>
                                            <a href={p.demo} target="_blank" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all text-sm" title="Live Preview">
                                                <i className="fa-solid fa-arrow-up-right-from-square" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section id="experience" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Career Roadmap</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Education & Experience</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="space-y-8">
                        {portfolioData.timeline.map((item, idx) => (
                            <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">{item.year}</span>
                                    <span className="text-xs text-slate-400 font-mono">{item.institution}</span>
                                </div>
                                <h3 className="font-bold text-xl text-slate-100 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Get In Touch</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Contact Me</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="glass-card p-8 rounded-3xl space-y-6">
                                <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    I am actively seeking entry-level roles, security internships, and web development opportunities. Feel free to send a message!
                                </p>
                                <div className="space-y-4 text-xs font-mono text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/50 text-cyan-400 flex items-center justify-center text-sm">
                                            <i className="fa-solid fa-envelope" />
                                        </div>
                                        <span>{portfolioData.personal.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/50 text-cyan-400 flex items-center justify-center text-sm">
                                            <i className="fa-solid fa-phone" />
                                        </div>
                                        <span>{portfolioData.personal.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/50 text-cyan-400 flex items-center justify-center text-sm">
                                            <i className="fa-solid fa-location-dot" />
                                        </div>
                                        <span>{portfolioData.personal.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <form onSubmit={handleFormSubmit} className="glass-card p-8 rounded-3xl space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${formErrors.name ? 'border-red-500' : 'border-slate-800'} text-slate-100 text-sm focus:outline-none focus:border-cyan-500`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${formErrors.email ? 'border-red-500' : 'border-slate-800'} text-slate-100 text-sm focus:outline-none focus:border-cyan-500`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                        placeholder="Project Collaboration / Internship Opportunity"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${formErrors.subject ? 'border-red-500' : 'border-slate-800'} text-slate-100 text-sm focus:outline-none focus:border-cyan-500`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-slate-300 mb-1">Message</label>
                                    <textarea
                                        rows="4"
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        placeholder="Write your message here..."
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${formErrors.message ? 'border-red-500' : 'border-slate-800'} text-slate-100 text-sm focus:outline-none focus:border-cyan-500`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formSubmitting}
                                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {formSubmitting ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin" /> Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane" /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 border-t border-slate-800/80 text-center text-xs font-mono text-slate-400">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© {new Date().getFullYear()} Kenneth James Aguitong. Engineered with React & Tailwind CSS.</p>
                </div>
            </footer>

            {/* REACT MODAL: Project Modal */}
            {selectedProject && (
                <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) closeModals(); }}>
                    <div className="modal-content glass-card max-w-4xl w-full mx-4 p-6 sm:p-8 rounded-3xl max-h-[90vh] overflow-y-auto relative border border-cyan-500/30">
                        <button
                            type="button"
                            onClick={closeModals}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-50"
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>

                        {/* Modal Tab Switcher */}
                        {selectedProject.id === 'dim-system' && (
                            <div className="mb-6 border-b border-slate-800 flex gap-4 text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setProjectModalTab('overview')}
                                    className={`pb-2.5 font-mono flex items-center gap-2 cursor-pointer ${projectModalTab === 'overview' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-cyan-300'}`}
                                >
                                    <i className="fa-solid fa-circle-info" /> Project Overview
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setProjectModalTab('demo')}
                                    className={`pb-2.5 font-mono flex items-center gap-2 cursor-pointer ${projectModalTab === 'demo' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-cyan-300'}`}
                                >
                                    <i className="fa-solid fa-desktop" /> Live MSWDO Portal Mockup
                                </button>
                            </div>
                        )}

                        {projectModalTab === 'overview' ? (
                            <div className="space-y-6">
                                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group max-h-80">
                                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-800/50">
                                            <i className="fa-solid fa-shield-cat mr-1" /> Data Privacy Act 2012 Compliant
                                        </span>
                                        <a href={selectedProject.image} target="_blank" className="px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-semibold backdrop-blur-md border border-cyan-500/40 transition-all flex items-center gap-1.5">
                                            <i className="fa-solid fa-expand" /> Full Image
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 uppercase font-semibold">{selectedProject.category}</span>
                                        {selectedProject.subtitle && <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800/40">{selectedProject.subtitle}</span>}
                                    </div>
                                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-3">{selectedProject.title}</h2>
                                    <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.fullDesc}</p>
                                </div>

                                {selectedProject.portals && (
                                    <div className="mb-6">
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold flex items-center gap-2">
                                            <i className="fa-solid fa-layer-group" /> Integrated Access Portals
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {selectedProject.portals.map((portal, pIdx) => (
                                                <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-3">
                                                    <div className={`w-9 h-9 rounded-xl ${portal.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : portal.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'} flex items-center justify-center text-base shrink-0`}>
                                                        <i className={`fa-solid ${portal.icon}`} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-xs text-slate-100">{portal.title}</h5>
                                                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{portal.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedProject.sectors && (
                                    <div className="mb-6">
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 font-semibold flex items-center gap-2">
                                            <i className="fa-solid fa-users-viewfinder" /> Supported Welfare Sectors
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.sectors.map((sector, secIdx) => (
                                                <span key={secIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-200 border border-slate-700/80">
                                                    <span className={`w-2 h-2 rounded-full ${sector === 'Senior Citizen' ? 'bg-blue-400' : sector === 'PWD' ? 'bg-emerald-400' : sector === 'Youth' ? 'bg-amber-400' : 'bg-purple-400'}`} />
                                                    {sector}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 font-semibold flex items-center gap-2">
                                        <i className="fa-solid fa-shield-halved" /> Key Highlights & Features
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                                        {selectedProject.highlights.map((h, hIdx) => (
                                            <li key={hIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                                <i className="fa-solid fa-check text-cyan-400 text-xs mt-0.5 shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
                                    {selectedProject.id === 'dim-system' ? (
                                        <button
                                            type="button"
                                            onClick={() => setProjectModalTab('demo')}
                                            className="px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                                        >
                                            <i className="fa-solid fa-desktop" /> Interactive Portal Demo
                                        </button>
                                    ) : <div />}
                                    <div className="flex items-center gap-3">
                                        <a href={selectedProject.github} target="_blank" className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all">
                                            <i className="fab fa-github text-sm" /> GitHub Repo
                                        </a>
                                        <a href={selectedProject.demo} target="_blank" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
                                            <i className="fa-solid fa-arrow-up-right-from-square text-xs" /> Live Project
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* LIVE MSWDO PORTAL REPLICA */
                            <div className="space-y-4 text-slate-800 font-sans">
                                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                                        
                                        {/* Left MSWDO Panel */}
                                        <div className="lg:col-span-6 p-8 bg-gradient-to-br from-[#082a2b] via-[#0b3c3b] to-[#041a1b] text-white flex flex-col justify-between relative overflow-hidden">
                                            <div className="space-y-6 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 font-bold">
                                                        <i className="fa-solid fa-shield-halved text-xl" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-base tracking-wider uppercase leading-none">MSWDO</h3>
                                                        <p className="text-[10px] text-emerald-300 font-semibold tracking-wide uppercase">Municipal Social Welfare and Development Office</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold px-2.5 py-1 rounded bg-white/10 border border-white/15">
                                                        Accessible Community Services
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
                                                    Social welfare support, made easier to access.
                                                </h2>

                                                <p className="text-xs text-slate-300 leading-relaxed">
                                                    Apply for programs, monitor requests, and receive assistance updates through one secure municipal portal.
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-blue-400" /> Senior Citizen
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> PWD
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-amber-400" /> Youth
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full bg-purple-400" /> Women
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 relative z-10">
                                                <span>Protected under the Data Privacy Act of 2012</span>
                                                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Online
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Access Portal Selection */}
                                        <div className="lg:col-span-6 p-8 bg-slate-50 flex flex-col justify-between text-slate-800">
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900">Sign in</h3>
                                                <p className="text-xs text-slate-500 mb-6">Choose your access portal to continue</p>

                                                <div className="space-y-3">
                                                    {/* Staff Portal Button */}
                                                    <div
                                                        onClick={() => handlePortalAction('Staff Portal')}
                                                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                                                    >
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm">
                                                                <i className="fa-solid fa-shield-halved" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Staff Portal</h4>
                                                                <p className="text-xs text-slate-500">For MSWDO staff and administrators</p>
                                                            </div>
                                                        </div>
                                                        <i className="fa-solid fa-chevron-right text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all text-xs" />
                                                    </div>

                                                    {/* Applicant Portal Button */}
                                                    <div
                                                        onClick={() => handlePortalAction('Applicant Portal')}
                                                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                                                    >
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm">
                                                                <i className="fa-solid fa-user-plus" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">Applicant Portal</h4>
                                                                <p className="text-xs text-slate-500">For registered welfare beneficiaries</p>
                                                            </div>
                                                        </div>
                                                        <i className="fa-solid fa-chevron-right text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all text-xs" />
                                                    </div>

                                                    {/* Program Application Button */}
                                                    <div
                                                        onClick={() => handlePortalAction('Program Application')}
                                                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                                                    >
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg shadow-sm">
                                                                <i className="fa-solid fa-file-lines" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">Program Application</h4>
                                                                <p className="text-xs text-slate-500">Submit a new application for MSWDO assistance</p>
                                                            </div>
                                                        </div>
                                                        <i className="fa-solid fa-chevron-right text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all text-xs" />
                                                    </div>
                                                </div>

                                                <div className="my-6 flex items-center gap-3">
                                                    <div className="h-px bg-slate-200 flex-1" />
                                                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">SECURE GOVERNMENT SYSTEM</span>
                                                    <div className="h-px bg-slate-200 flex-1" />
                                                </div>

                                                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                                                    <i className="fa-solid fa-shield-check text-emerald-600 text-lg mt-0.5 shrink-0" />
                                                    <div>
                                                        <h5 className="font-bold text-slate-900 text-xs">Your information is handled securely</h5>
                                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                                            Protected under the Data Privacy Act of 2012. For application or access assistance, contact your local MSWDO office.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-200">
                                                Republic of the Philippines - Municipal Government - © 2026
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {portalAlert && (
                                    <div className="p-3.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono text-center animate-pulse flex items-center justify-center gap-2">
                                        {portalAlertLoading ? <i className="fa-solid fa-circle-notch fa-spin text-cyan-400" /> : <i className="fa-solid fa-circle-check text-emerald-400" />}
                                        <span>{portalAlert}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* REACT MODAL: Certificate Modal */}
            {selectedCert && (
                <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) closeModals(); }}>
                    <div className="modal-content glass-card max-w-md w-full mx-4 p-6 rounded-3xl relative border border-cyan-500/30 text-center">
                        <button
                            type="button"
                            onClick={closeModals}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-50"
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-2xl mx-auto mb-4 border border-white/20">
                            <i className={selectedCert.badgeIcon} />
                        </div>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 mb-2 inline-block">Issued {selectedCert.date}</span>
                        <h2 className="text-2xl font-bold text-slate-100 mb-1">{selectedCert.title}</h2>
                        <p className="text-sm font-semibold text-slate-400 mb-4">{selectedCert.issuer}</p>

                        <div className="w-full glass-card p-4 rounded-2xl mb-6 text-left border border-slate-800">
                            <p className="text-slate-300 text-xs leading-relaxed mb-3">{selectedCert.description}</p>
                            <div className="text-xs font-mono text-cyan-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                                <span>Credential ID:</span>
                                <span className="text-slate-200 font-bold">{selectedCert.credentialId}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full">
                            <a href={selectedCert.linkedinUrl} target="_blank" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                                <i className="fab fa-linkedin text-sm" /> Verify on LinkedIn
                            </a>
                            <button type="button" onClick={closeModals} className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-all cursor-pointer">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REACT MODAL: Resume / CV Modal */}
            {cvModalOpen && (
                <div className="modal-overlay open" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) closeModals(); }}>
                    <div className="modal-content glass-card max-w-3xl w-full mx-4 p-6 sm:p-8 rounded-3xl max-h-[90vh] overflow-y-auto relative border border-cyan-500/30">
                        <button
                            type="button"
                            onClick={closeModals}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-50"
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Curriculum Vitae</h3>
                                    <p className="text-xs font-mono text-cyan-400">Kenneth James Aguitong — BSIT Student</p>
                                </div>
                                <a href="assets/images/profile.jpg" download="Kenneth_Aguitong_CV.jpg" className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all">
                                    <i className="fa-solid fa-download" /> Download Image
                                </a>
                            </div>

                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs space-y-4 text-slate-300">
                                <div className="border-b border-slate-800 pb-3">
                                    <h4 className="text-sm font-bold text-cyan-400">OBJECTIVE</h4>
                                    <p className="mt-1 text-slate-300 leading-relaxed font-sans">Highly motivated BSIT student specializing in Network Defense, Ethical Hacking, and Full-Stack Web Development seeking entry-level cybersecurity analyst or IT infrastructure associate roles.</p>
                                </div>
                                <div className="border-b border-slate-800 pb-3">
                                    <h4 className="text-sm font-bold text-cyan-400">EDUCATION</h4>
                                    <p className="font-bold text-slate-200 font-sans">Bachelor of Science in Information Technology (BSIT)</p>
                                    <p className="text-slate-400">Southwestern University PHINMA | Cebu, Philippines | 2022 - 2026 (Present)</p>
                                </div>
                                <div className="border-b border-slate-800 pb-3">
                                    <h4 className="text-sm font-bold text-cyan-400">CERTIFICATIONS</h4>
                                    <ul className="list-disc list-inside space-y-1 font-sans">
                                        <li>Cisco Ethical Hacker (2026)</li>
                                        <li>Fortinet Certified Associate Cybersecurity (2026)</li>
                                        <li>ISO/IEC 27001 Information Security Associate (2025)</li>
                                        <li>TESDA NC II Setting Up Computer Networks (2025)</li>
                                        <li>EnGenius Network Certifications (2025)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-cyan-400">CORE COMPETENCIES</h4>
                                    <p className="font-sans text-slate-300">Penetration Testing, Cisco Packet Tracer, Wireshark, Linux Admin, Python Scripting, HTML5, CSS3, Tailwind CSS, JavaScript, React, Firebase, Git.</p>
                                </div>
                            </div>

                            <div className="text-center pt-2">
                                <button type="button" onClick={closeModals} className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer">
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* REACT TOAST NOTIFICATION */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
                    <div className={`flex items-center gap-3 glass-card px-5 py-3.5 rounded-2xl border ${toast.type === 'success' ? 'border-emerald-500/40 bg-slate-900/90 text-slate-100' : 'border-rose-500/40 bg-slate-900/90 text-slate-100'} shadow-2xl`}>
                        {toast.type === 'success' ? (
                            <i className="fa-solid fa-circle-check text-emerald-400 text-lg" />
                        ) : (
                            <i className="fa-solid fa-triangle-exclamation text-rose-400 text-lg" />
                        )}
                        <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// Render React App
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
