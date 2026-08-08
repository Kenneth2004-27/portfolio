/**
 * Interactive Particle & Ambient Cyber Background Engine
 */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 75;
        this.maxDistance = 140;
        this.mouse = { x: null, y: null, radius: 160 };

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
        this.particles = [];
        
        // Adjust particle count for mobile
        if (window.innerWidth < 768) {
            this.numParticles = 35;
            this.maxDistance = 100;
        } else {
            this.numParticles = 70;
            this.maxDistance = 140;
        }

        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(59, 130, 246, ',
                alpha: Math.random() * 0.5 + 0.3
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse interaction push
            if (this.mouse.x !== null && this.mouse.y !== null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    let force = (this.mouse.radius - dist) / this.mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    p.x -= Math.cos(angle) * force * 2;
                    p.y -= Math.sin(angle) * force * 2;
                }
            }

            // Draw particle point
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color + p.alpha + ')';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
            this.ctx.fill();

            // Connect nearby particles with glowing line
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.maxDistance) {
                    let alpha = (1 - dist / this.maxDistance) * 0.25;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork('particle-canvas');
});
