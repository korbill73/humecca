/**
 * HUMECCA Hero Interactive Canvas V2 - Premium Cybernetic Flow
 * Features: Glowing Nodes, Data Packets, Mouse Spotlight, Parallax
 */
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Configuration
    const config = {
        particleCount: 80,
        connectionRadius: 180,
        mouseRadius: 250,
        color: '255, 255, 255', // Base color RGB
        accentColor: '239, 68, 68', // Brand Red RGB
        speed: 0.5
    };

    const mouse = { x: null, y: null };
    let particles = [];
    let pulses = []; // Moving data packets

    // Resize
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse Interaction (Window listener because canvas has pointer-events: none)
    window.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        // Calculate position relative to canvas
        // Only track if mouse is roughly over the hero section
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    });

    window.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.size = Math.random() * 2 + 1.5;
            this.baseAlpha = Math.random() * 0.3 + 0.1; // 0.1 - 0.4
            this.alpha = this.baseAlpha;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Screen wrap-around for continuous flow
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Mouse Interaction: Spotlight & Parallax
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Parallax shift (move away slightly)
                if (distance < config.mouseRadius) {
                    const force = (config.mouseRadius - distance) / config.mouseRadius;
                    this.x -= (dx / distance) * force * 1.5;
                    this.y -= (dy / distance) * force * 1.5;
                    // Brighten
                    this.alpha = Math.min(this.baseAlpha + 0.4, 1);
                } else {
                    this.alpha = this.baseAlpha;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${config.color}, ${this.alpha})`;

            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${config.color}, 0.5)`;

            ctx.fill();
            ctx.shadowBlur = 0; // Reset
        }
    }

    // Pulse Class (Data traveling on lines)
    class Pulse {
        constructor(startNode, endNode) {
            this.startNode = startNode;
            this.endNode = endNode;
            this.progress = 0;
            this.speed = 0.02 + Math.random() * 0.03; // Random speed
            this.active = true;
        }

        update() {
            this.progress += this.speed;
            if (this.progress >= 1) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active) return;

            // Interpolate position
            const currX = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
            const currY = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;

            ctx.beginPath();
            ctx.arc(currX, currY, 2.5, 0, Math.PI * 2); // Increased size from 1.5 to 2.5
            ctx.fillStyle = `rgba(${config.accentColor}, 1)`; // Full opacity
            ctx.shadowBlur = 12; // Stronger glow
            ctx.shadowColor = `rgba(${config.accentColor}, 1)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Main Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update Particles
        particles.forEach(p => p.update());

        // Update/Clean Pulses
        pulses = pulses.filter(p => {
            p.update();
            return p.active;
        });

        // Loop to Draw Connections & Generate Pulses
        for (let a = 0; a < particles.length; a++) {
            let pA = particles[a];

            // Draw Node
            pA.draw();

            // Connections
            for (let b = a + 1; b < particles.length; b++) {
                let pB = particles[b];
                let dx = pA.x - pB.x;
                let dy = pA.y - pB.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.connectionRadius) {
                    // Line opacity based on distance
                    let alpha = 1 - (dist / config.connectionRadius);

                    // Mouse Spotlight for lines
                    if (mouse.x != null) {
                        // Check distance from line center to mouse
                        let midX = (pA.x + pB.x) / 2;
                        let midY = (pA.y + pB.y) / 2;
                        let distMouse = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);

                        if (distMouse < 150) {
                            alpha = Math.min(alpha + 0.3, 0.8); // Highlight line
                            ctx.lineWidth = 1.5;
                        } else {
                            alpha *= 0.15; // Dim base lines
                            ctx.lineWidth = 0.5;
                        }
                    } else {
                        alpha *= 0.15; // Base dimness
                        ctx.lineWidth = 0.5;
                    }

                    if (alpha > 0) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${config.color}, ${alpha})`;
                        ctx.moveTo(pA.x, pA.y);
                        ctx.lineTo(pB.x, pB.y);
                        ctx.stroke();

                        // Randomly spawn a pulse (Data Packet) - INCREASED FREQUENCY
                        // Spawns even on dim lines for "busy network" feel
                        if (dist < config.connectionRadius * 0.8 && Math.random() < 0.005) {
                            pulses.push(new Pulse(pA, pB));
                        }
                    }
                }
            }
        }

        // Draw Pulses
        pulses.forEach(p => p.draw());

        requestAnimationFrame(animate);
    }

    init();
    animate();
});
