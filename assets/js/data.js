/**
 * Data module for Kenneth James Aguitong Portfolio
 */

window.portfolioData = {
    personal: {
        name: "Kenneth James Aguitong",
        role: "BSIT Student | Aspiring Cybersecurity Analyst",
        location: "Dalaguete, Cebu City, Philippines",
        email: "kennethaguitong@gmail.com",
        phone: "+63 9708193654",
        bio: "Passionate Bachelor of Science in Information Technology (BSIT) student (Class of 2026) dedicated to hardening digital infrastructures, network defense, ethical penetration testing, and building secure web applications.",
        passionStatement: "In an increasingly interconnected world, security is not just a feature—it is the foundation of digital trust. My goal is to protect digital assets, proactively identify vulnerabilities, and build resilient network systems.",
        socials: {
            github: "https://github.com/KennethAguitong",
            linkedin: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            facebook: "https://www.facebook.com/share/19AX7aREjk/",
            email: "mailto:kennethaguitong@gmail.com"
        },
        stats: [
            { label: "Completed Projects", value: 2, suffix: "" },
            { label: "Certifications", value: 5, suffix: "" },
            { label: "Lab Hours Completed", value: 400, suffix: "+" },
            { label: "Vulnerabilities Patched", value: 50, suffix: "+" }
        ]
    },
    typingTitles: [
        "BSIT Student (2026)",
        "Aspiring Cybersecurity Professional",
        "Ethical Hacking Enthusiast",
        "Network Security Practitioner",
        "Web Developer"
    ],
    skills: [
        { name: "HTML5", level: 95, category: "frontend", icon: "fab fa-html5", color: "from-orange-500 to-amber-500" },
        { name: "CSS3", level: 90, category: "frontend", icon: "fab fa-css3-alt", color: "from-blue-500 to-cyan-400" },
        { name: "Tailwind CSS", level: 92, category: "frontend", icon: "fa-solid fa-wind", color: "from-cyan-400 to-teal-300" },
        { name: "JavaScript", level: 85, category: "frontend", icon: "fab fa-js-square", color: "from-yellow-400 to-amber-500" },
        { name: "Supabase", level: 85, category: "backend", icon: "fa-solid fa-database", color: "from-emerald-400 to-green-500" },
        { name: "Firebase", level: 78, category: "backend", icon: "fa-solid fa-fire", color: "from-amber-500 to-orange-600" },
        { name: "Python", level: 85, category: "backend", icon: "fab fa-python", color: "from-blue-400 to-indigo-500" },
        { name: "Git/GitHub", level: 90, category: "tools", icon: "fab fa-git-alt", color: "from-red-500 to-orange-500" },
        { name: "Networking", level: 88, category: "security", icon: "fa-solid fa-network-wired", color: "from-emerald-400 to-teal-500" },
        { name: "Cybersecurity", level: 85, category: "security", icon: "fa-solid fa-shield-halved", color: "from-cyan-400 to-blue-600" },
        { name: "Penetration Testing", level: 80, category: "security", icon: "fa-solid fa-bug-slash", color: "from-red-400 to-rose-600" },
        { name: "Linux", level: 60, category: "tools", icon: "fab fa-linux", color: "from-amber-400 to-yellow-600" }
    ],
    circularSkills: [
        { name: "Cybersecurity", level: 85, color: "#06b6d4", icon: "fa-shield-halved" },
        { name: "Networking", level: 88, color: "#3b82f6", icon: "fa-network-wired" },
        { name: "Penetration Testing", level: 80, color: "#f43f5e", icon: "fa-bug-slash" },
        { name: "Web Development", level: 92, color: "#10b981", icon: "fa-code" }
    ],
    certifications: [
        {
            id: "cisco-eth",
            title: "Cisco Ethical Hacker",
            issuer: "Cisco Networking Academy",
            date: "2026",
            badgeIcon: "fa-solid fa-user-ninja",
            badgeColor: "from-cyan-500 to-blue-600",
            description: "Demonstrated skills in offensive security fundamentals, vulnerability assessment, reconnaissance, and exploitation techniques following ethical guidelines.",
            credentialId: "CSCO-EH-2026-9041",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            topics: ["Ethical Hacking", "Footprinting", "Network Scanning", "Vulnerability Scanning", "System Hacking"]
        },
        {
            id: "fortinet-fca",
            title: "Fortinet Certified Associate Cybersecurity",
            issuer: "Fortinet NSE Institute",
            date: "2026",
            badgeIcon: "fa-solid fa-shield-cat",
            badgeColor: "from-red-500 to-pink-600",
            description: "Certified in cybersecurity awareness, threat landscape evaluation, enterprise firewall architecture, and secure threat management.",
            credentialId: "FTNT-FCA-2026-5519",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            topics: ["Firewalls", "Threat Landscape", "Zero Trust Architecture", "Cloud Security", "Endpoint Defense"]
        },
        {
            id: "iso-27001",
            title: "ISO/IEC 27001 Information Security Associate",
            issuer: "SkillFront / Global Security Standard",
            date: "2025",
            badgeIcon: "fa-solid fa-file-contract",
            badgeColor: "from-blue-600 to-indigo-700",
            description: "Validated understanding of Information Security Management System (ISMS) frameworks, compliance audits, and risk assessment methodologies.",
            credentialId: "ISO-27001-ISA-2025-4402",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            topics: ["ISMS Standards", "Risk Management", "Security Auditing", "Data Compliance", "Incident Controls"]
        },
        {
            id: "tesda-net",
            title: "TESDA Setting Up Computer Networks",
            issuer: "TESDA National Certificate II",
            date: "2025",
            badgeIcon: "fa-solid fa-diagram-project",
            badgeColor: "from-emerald-500 to-teal-600",
            description: "Practical qualification in LAN configuration, router/switch setup, structured cabling, IP subnetting, and network troubleshooting.",
            credentialId: "TESDA-NC2-NET-2025-9912",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            topics: ["IPv4/IPv6 Subnetting", "Structured Cabling", "Router & Switch Setup", "Network Diagnostics", "Server Setup"]
        },
        {
            id: "engenius-net",
            title: "EnGenius Network Certifications",
            issuer: "EnGenius Academy",
            date: "2025",
            badgeIcon: "fa-solid fa-wifi",
            badgeColor: "from-violet-500 to-purple-600",
            description: "Mastery in cloud-managed Wireless Access Points, PoE switches, RF coverage optimization, and enterprise Wi-Fi security protocols.",
            credentialId: "ENG-ENC-2025-7734",
            linkedinUrl: "https://www.linkedin.com/in/kenneth-james-aguitong-8a3263274",
            topics: ["Cloud Networking", "Wi-Fi 6 Security", "RF Site Survey", "WPA3 Enterprise", "VLAN Mapping"]
        }
    ],
    projects: [
        {
            id: "dim-system",
            title: "Digital Information Management System",
            subtitle: "MSWDO Municipal Social Welfare Portal",
            category: "webapp",
            image: "assets/images/project-1.jpg",
            shortDesc: "Centralized Municipal Social Welfare & Development Office (MSWDO) portal with multi-tier access for Staff, Beneficiaries, and Assistance Applicants.",
            fullDesc: "Designed and developed an end-to-end Digital Information Management System for the Municipal Social Welfare and Development Office (MSWDO)in Carmen Cebu. The platform delivers role-based portals for Staff Administrators, Registered Welfare Beneficiaries, and New Program Applicants. Fully compliant with the Data Privacy Act of 2012, it streamlines social welfare assistance tracking across Senior Citizen, PWD, Youth, and Women community sectors.",
            technologies: ["React", "HTML5", "Supabase"],
            github: "https://github.com/KennethAguitong/digital-information-management-system",
            demo: "https://kennethaguitong.github.io/digital-information-management-system",
            portals: [
                { title: "Staff Portal", desc: "For MSWDO staff and administrators", icon: "fa-shield-halved", color: "blue" },
                { title: "Applicant Portal", desc: "For registered welfare beneficiaries", icon: "fa-user-plus", color: "emerald" },
                { title: "Program Application", desc: "Submit a new application for MSWDO assistance", icon: "fa-file-lines", color: "purple" }
            ],
            sectors: ["Senior Citizen", "PWD", "Youth", "Women"],
            highlights: [
                "Multi-Portal Access Control: Isolated login flows for Staff Administrators, Registered Beneficiaries, and New Applicants.",
                "Targeted Beneficiary Sectors: Dedicated welfare assistance workflows for Senior Citizens, PWDs, Youth, and Women.",
                "Data Privacy Act of 2012 Compliance: Encrypted records storage, administrative audit trails, and privacy compliance.",
                "Real-Time Monitoring & Telemetry: Live system status badges and automated request tracking."
            ]
        },
        {
            id: "cresst-glass",
            title: "CREST GLASS",
            category: "webapp",
            image: "assets/images/project-2.jpg",
            shortDesc: "A modern glassmorphic web application built for institutional data tracking, telemetry monitoring, and interactive analytics.",
            fullDesc: "Engineered CRESST GLASS, a high-performance web application featuring a modern glassmorphism design system. Designed to visualize real-time telemetry metrics, track operational status, and present intuitive dashboard views for administrative decision-making.",
            technologies: ["Typesccript", "HTML5", "Supabase"],
            github: "https://github.com/KennethAguitong/cresst-glass",
            demo: "https://github.com/Kenneth2004-27/web-crest-glass.git",
            highlights: [
                "Sleek dark theme with frosted glassmorphism visual components.",
                "Interactive data charts and status monitoring gauges.",
                "Modular architecture built with responsive UI components."
            ]
        }
    ],
    timeline: [
        {
            year: "2022 - 2026 (Present)",
            title: "Bachelor of Science in Information Technology (BSIT)",
            institution: "Southwestern University Phin",
            type: "education",
            icon: "fa-graduation-cap",
            description: "Specializing in Network Administration, Systems Security, and Cyber Forensics. Maintaining top academic standing with emphasis on practical lab implementations."
        },
        {
            year: "2026",
            title: "Cisco & Fortinet Security Certifications",
            institution: "Cisco Academy & Fortinet NSE Institute",
            type: "certification",
            icon: "fa-certificate",
            description: "Completed rigorous coursework in Ethical Hacking, Network Security, and Enterprise Firewall Architecture verified on LinkedIn."
        },
        {
            year: "2025 - 2026",
            title: "Lead Full-Stack Academic Developer",
            institution: "Capstone & Systems Development Projects",
            type: "experience",
            icon: "fa-laptop-code",
            description: "Architected and delivered the Digital Beneficiary Registration and Barangay Document Management System, earning high project distinction."
        },
        {
            year: "2025",
            title: "TESDA & EnGenius Networking Qualifications",
            institution: "TESDA & EnGenius Academy",
            type: "certification",
            icon: "fa-award",
            description: "Certified in Setting Up Computer Networks (NC II) and Enterprise Cloud Wi-Fi deployment."
        },
        {
            year: "2025 - 2026",
            title: "Cybersecurity & IT Infrastructure Intern (Practicum)",
            institution: "Regional IT Enterprise / Cybersecurity Lab",
            type: "experience",
            icon: "fa-user-shield",
            description: "Assisted in vulnerability scans, router & switch provisioning, firewall rule updates, and security awareness training."
        }
    ]
};
var portfolioData = window.portfolioData;

if (typeof module !== 'undefined') {
    module.exports = window.portfolioData;
}
