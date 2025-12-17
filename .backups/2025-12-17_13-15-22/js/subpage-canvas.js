/**
 * HUMECCA Subpage Visual Effects V2 - Ultra Premium
 * Distinct, high-quality canvas animations for each service category.
 */
document.addEventListener('DOMContentLoaded', function () {
    initSubpageEffect();
});

function initSubpageEffect() {
    const path = window.location.pathname;

    // Select Hero
    const heroSelectors = ['.cloud-hero', '.idc-hero', '.sw-hero', '.sub-visual'];
    let hero = null;
    for (const sel of heroSelectors) {
        hero = document.querySelector(sel);
        if (hero) break;
    }
    if (!hero) return;

    // Inject Canvas (if not exists)
    if (hero.querySelector('.subpage-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'subpage-canvas';
    // Force styles
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Click-through
    canvas.style.zIndex = '0'; // Behind content (10), above bg

    hero.insertBefore(canvas, hero.firstChild);

    // Make sure hero has relative positioning
    const style = window.getComputedStyle(hero);
    if (style.position === 'static') {
        hero.style.position = 'relative';
    }

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Global Mouse Tracking
    const mouse = { x: null, y: null };
    window.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        } else {
            mouse.x = null;
            mouse.y = null;
        }
    });

    // Effect Router
    if (path.includes('addon')) {
        // NEW: Purple Light Ray for Addon Services
        runPurpleLightRayEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else if (path.includes('db') || path.includes('database')) {
        runDataRingsEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else if (path.includes('security') || path.includes('vpn') || path.includes('sec_') || path.includes('ssl') || path.includes('firewall')) {
        runCyberShieldEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else if (path.includes('hosting') || path.includes('server')) {
        runDigitalStreamsEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else if (path.includes('colocation')) {
        // NEW: Infinite Tunnel for Colocation
        runInfiniteTunnelEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else if (path.includes('idc')) {
        // NEW: Tech HUD for IDC Intro
        runTechBlueprintEffect(ctx, () => ({ w: width, h: height }), mouse);
    } else {
        // Cloud / Default
        runNeuronalNebulaEffect(ctx, () => ({ w: width, h: height }), mouse);
    }
}

/* ================= ULTRA PREMIUM EFFECTS ================= */

/**
 * 1. Digital Data Streams (Hosting)
 * - Added: Mouse interaction (stream highlight)
 */
function runDigitalStreamsEffect(ctx, getSize, mouse) {
    const chars = "10";
    const streams = [];
    const fontSize = 14;

    function init() {
        const { w } = getSize();
        const count = Math.floor(w / 20); // Density
        streams.length = 0;
        for (let i = 0; i < count; i++) {
            streams.push({
                x: Math.random() * w,
                y: Math.random() * -500,
                speed: Math.random() * 3 + 1,
                len: Math.floor(Math.random() * 20 + 10),
                opacity: Math.random() * 0.5 + 0.1,
                size: Math.random() < 0.2 ? fontSize * 1.5 : fontSize
            });
        }
    }
    init();
    window.addEventListener('resize', init);

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);

        streams.forEach(s => {
            // Mouse Interaction: Glitch/Highlight
            let isHover = false;
            if (mouse.x != null && Math.abs(mouse.x - s.x) < 50) {
                isHover = true;
            }

            ctx.font = s.size + 'px monospace';
            const char = chars[Math.floor(Math.random() * 2)];

            for (let j = 0; j < s.len; j++) {
                const yPos = s.y - (j * s.size);
                if (yPos > h + 50) continue;

                const alpha = s.opacity * (1 - j / s.len);
                // Hover effect: Turn Red
                ctx.fillStyle = isHover ? `rgba(239, 68, 68, ${alpha + 0.3})` : `rgba(56, 189, 248, ${alpha})`;

                if (j === 0) {
                    ctx.fillStyle = isHover ? '#ef4444' : `rgba(255, 255, 255, ${s.opacity + 0.2})`;
                    ctx.shadowBlur = isHover ? 10 : 5;
                    ctx.shadowColor = isHover ? 'red' : '#38bdf8';
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, s.x, yPos);
            }

            s.y += s.speed;
            if (s.y - (s.len * s.size) > h) {
                s.y = 0;
                s.x = Math.random() * w;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 2. Cyber Shield (Security)
 * - Added: Mouse Radar Tracking
 */
function runCyberShieldEffect(ctx, getSize, mouse) {
    let tick = 0;

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);
        tick += 0.02;

        const centerX = w * 0.75;
        const centerY = h / 2;

        // Use Mouse as Pulse Center if active
        const pulseX = (mouse.x != null) ? mouse.x : centerX;
        const pulseY = (mouse.y != null) ? mouse.y : centerY;

        const hexSize = 30;
        const rows = Math.ceil(h / (hexSize * 1.5)) + 1;
        const cols = Math.ceil(w / (hexSize * Math.sqrt(3))) + 1;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const xOffset = (r % 2) * (hexSize * Math.sqrt(3) / 2);
                const x = c * (hexSize * Math.sqrt(3)) + xOffset - 50;
                const y = r * (hexSize * 1.5) - 50;

                const dx = x - pulseX;
                const dy = y - pulseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let active = false;
                let alpha = 0.05;

                // Mouse/Radar Wave
                const wavePos = (tick * 100) % 1000;
                if (Math.abs(dist - wavePos) < 50) {
                    alpha += 0.4 * (1 - Math.abs(dist - wavePos) / 50);
                    active = true;
                }

                // Hover Highlight
                if (dist < 100) {
                    alpha += 0.3;
                    active = true;
                }

                if (active || Math.random() < 0.001) {
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        ctx.lineTo(x + hexSize * Math.cos(i * Math.PI / 3), y + hexSize * Math.sin(i * Math.PI / 3));
                    }
                    ctx.closePath();
                    ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
                    ctx.fill();
                    ctx.strokeStyle = `rgba(239, 68, 68, ${alpha + 0.2})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 3. Infinite Tunnel (Colocation) - NEW
 * Perspective tunnel effect simulating high speed data travel
 */
function runInfiniteTunnelEffect(ctx, getSize, mouse) {
    const walls = [];
    const speed = 5;

    function init() {
        walls.length = 0;
        for (let i = 0; i < 15; i++) {
            walls.push({ z: i * (1000 / 15) });
        }
    }
    init();
    window.addEventListener('resize', init);

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        // Mouse parallax
        let mx = 0, my = 0;
        if (mouse.x != null) {
            mx = (mouse.x - cx) * 0.5;
            my = (mouse.y - cy) * 0.5;
        }

        walls.forEach(wall => {
            wall.z -= speed;
            if (wall.z <= 0) wall.z = 1000;

            const scale = 500 / wall.z;
            const x = cx + mx * (1 / scale); // Parallax inverse
            const y = cy + my * (1 / scale);

            const size = 100 * scale;

            if (Math.random() < 0.1) {
                // Flash effect
                ctx.strokeStyle = `rgba(239, 68, 68, ${1 - wall.z / 1000})`;
                ctx.lineWidth = 4 * scale;
            } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - wall.z / 1000)})`;
                ctx.lineWidth = 1 * scale;
            }

            ctx.beginPath();
            ctx.strokeRect(x - size / 2, y - size / 2, size, size);

            // Connecting lines to center
            ctx.beginPath();
            ctx.moveTo(0, 0); ctx.lineTo(x - size / 2, y - size / 2);
            ctx.moveTo(w, 0); ctx.lineTo(x + size / 2, y - size / 2);
            ctx.moveTo(0, h); ctx.lineTo(x - size / 2, y + size / 2);
            ctx.moveTo(w, h); ctx.lineTo(x + size / 2, y + size / 2);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
            ctx.stroke();
        });

        // Fast Particles
        for (let i = 0; i < 5; i++) {
            const pz = (Date.now() % 1000 + i * 200) % 1000;
            const pScale = 500 / (1000 - pz);
            const pSize = 5 * pScale;
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(cx + (Math.random() - 0.5) * pScale * 400, cy + (Math.random() - 0.5) * pScale * 400, pSize, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 4. Tech Blueprint HUD (IDC Intro) - NEW
 * Technical drawing effect with scanning lines
 */
function runTechBlueprintEffect(ctx, getSize, mouse) {
    const lines = [];
    const points = [];

    function init() {
        const { w, h } = getSize();
        lines.length = 0;
        points.length = 0;
        // Grid lines
        for (let x = 0; x < w; x += 100) lines.push({ x: x, y: 0, type: 'v' });
        for (let y = 0; y < h; y += 100) lines.push({ x: 0, y: y, type: 'h' });

        // Random points
        for (let i = 0; i < 10; i++) points.push({ x: Math.random() * w, y: Math.random() * h, label: 'SRV-' + Math.floor(Math.random() * 99) });
    }
    init();
    window.addEventListener('resize', init);

    let scanY = 0;

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);

        scanY += 2;
        if (scanY > h) scanY = 0;

        // Draw Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        lines.forEach(l => {
            ctx.beginPath();
            if (l.type == 'v') { ctx.moveTo(l.x, 0); ctx.lineTo(l.x, h); }
            else { ctx.moveTo(0, l.y); ctx.lineTo(w, l.y); }
            ctx.stroke();
        });

        // Scanline
        ctx.beginPath();
        ctx.moveTo(0, scanY); ctx.lineTo(w, scanY);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Points
        points.forEach(p => {
            // Twinkle
            ctx.fillStyle = Math.random() < 0.9 ? 'white' : 'red';
            ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();

            // Connecting line to scan
            if (Math.abs(p.y - scanY) < 100) {
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, scanY);
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
                ctx.stroke();

                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.font = '10px monospace';
                ctx.fillText(p.label, p.x + 5, p.y - 5);
            }

            // Mouse interaction
            if (mouse.x != null && Math.abs(mouse.x - p.x) < 50 && Math.abs(mouse.y - p.y) < 50) {
                ctx.strokeStyle = '#ef4444';
                ctx.strokeRect(p.x - 20, p.y - 10, 60, 20);
                ctx.fillText("ANALYZING...", p.x - 20, p.y - 15);
            }
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 5. Neuronal Nebula (Cloud/Default)
 * - Added: RED DATA PULSES + Mouse Spotlight
 */
function runNeuronalNebulaEffect(ctx, getSize, mouse) {
    const nodes = [];
    let pulses = []; // Packets

    // Pulse Class
    class Pulse {
        constructor(a, b) {
            this.a = a; this.b = b; this.p = 0; this.active = true;
            this.speed = 0.02 + Math.random() * 0.02;
        }
        update() { this.p += this.speed; if (this.p >= 1) this.active = false; }
        draw() {
            if (!this.active) return;
            const x = this.a.x + (this.b.x - this.a.x) * this.p;
            const y = this.a.y + (this.b.y - this.a.y) * this.p;
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444'; ctx.shadowBlur = 10; ctx.shadowColor = 'red';
            ctx.fill(); ctx.shadowBlur = 0;
        }
    }

    function init() {
        nodes.length = 0;
        const { w, h } = getSize();
        for (let i = 0; i < 60; i++) {
            nodes.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    init();
    window.addEventListener('resize', init);

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);

        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0) n.x = w; if (n.x > w) n.x = 0; if (n.y < 0) n.y = h; if (n.y > h) n.y = 0;

            // Mouse Interaction: Avoid/Brighten
            let distM = 999;
            if (mouse.x != null) {
                distM = Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2);
                if (distM < 200) {
                    // Gentle repulsion
                    const angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
                    n.x += Math.cos(angle) * 0.5;
                    n.y += Math.sin(angle) * 0.5;
                }
            }

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fillStyle = distM < 200 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
            ctx.fill();
        });

        // Connection
        pulses = pulses.filter(p => { p.update(); return p.active; });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);

                if (dist < 150) {
                    // Check mouse proximity to line center
                    let midX = (nodes[i].x + nodes[j].x) / 2;
                    let midY = (nodes[i].y + nodes[j].y) / 2;
                    let mDist = 999;
                    if (mouse.x != null) mDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);

                    let alpha = 0.1 * (1 - dist / 150);
                    let isHover = false;
                    if (mDist < 150) { alpha += 0.3; isHover = true; }

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255,255,255, ${alpha})`;
                    ctx.lineWidth = isHover ? 1.5 : 0.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();

                    // Active Data Flow
                    if ((isHover && Math.random() < 0.05) || Math.random() < 0.003) {
                        pulses.push(new Pulse(nodes[i], nodes[j]));
                    }
                }
            }
        }

        pulses.forEach(p => p.draw());
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 6. Data Rings (Database)
 * - Added: Mouse tilts rings
 */
function runDataRingsEffect(ctx, getSize, mouse) {
    const rings = [];
    function init() {
        rings.length = 0;
        for (let i = 0; i < 5; i++) {
            rings.push({
                y: 100 + i * 60, radius: 100 + i * 40,
                speed: (i % 2 == 0 ? 1 : -1) * (0.005 + Math.random() * 0.005),
                angle: Math.random() * 6, particles: Array(10).fill(0).map(() => Math.random() * 6)
            });
        }
    }
    init();
    window.addEventListener('resize', init);

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.7;
        const cy = h / 2;

        rings.forEach(r => {
            r.angle += r.speed;
            if (mouse.x != null) r.angle += (mouse.x - cx) * 0.00001; // Twist with mouse

            ctx.beginPath(); ctx.ellipse(cx, cy, r.radius, r.radius * 0.4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; ctx.stroke();

            r.particles.forEach(p => {
                const a = p + r.angle;
                const px = cx + Math.cos(a) * r.radius;
                const py = cy + Math.sin(a) * (r.radius * 0.4);
                const isFront = Math.sin(a) > 0;

                ctx.beginPath();
                ctx.arc(px, py, isFront ? 3 : 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(239, 68, 68, ${isFront ? 0.8 : 0.2})`;
                if (isFront) { ctx.shadowBlur = 10; ctx.shadowColor = 'red'; }
                ctx.fill(); ctx.shadowBlur = 0;
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 7. Purple Light Ray (Addon Services) - NEW
 * VPN-style light ray effect with purple color scheme
 */
function runPurpleLightRayEffect(ctx, getSize, mouse) {
    const STAR_COUNT = 150;
    const COMET_SPEED = 0.3;
    const TRAIL_RATE = 12;
    const SPARK_RATE = 6;

    const stars = [];
    const particles = [];
    const sparks = [];
    const comet = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        angle: 0,
        autoMode: true
    };

    class Star {
        constructor() {
            this.reset();
            const { h } = getSize();
            this.y = Math.random() * h;
        }
        reset() {
            const { w } = getSize();
            this.x = Math.random() * w;
            this.y = -10;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.alpha = Math.random();
            this.twinkleDir = Math.random() > 0.5 ? 0.02 : -0.02;
        }
        update() {
            const { w, h } = getSize();
            this.y += this.speed;
            this.alpha += this.twinkleDir;
            if (this.alpha > 1 || this.alpha < 0.2) this.twinkleDir *= -1;
            if (this.y > h) {
                this.y = -10;
                this.x = Math.random() * w;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class TrailParticle {
        constructor(x, y, angle) {
            this.x = x;
            this.y = y;
            this.life = 1.0;
            this.decay = Math.random() * 0.005 + 0.005;

            const spread = (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 0.2;

            this.vx = Math.cos(angle + Math.PI + spread) * speed;
            this.vy = Math.sin(angle + Math.PI + spread) * speed;

            this.size = Math.random() * 4 + 1;
            const r = Math.random();
            this.color = r > 0.6 ? '#A78BFA' : (r > 0.3 ? '#C084FC' : '#E0E7FF');
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            if (this.size > 0.5) this.size *= 0.98;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life * 0.8;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    class Spark {
        constructor(x, y, angle) {
            this.x = x;
            this.y = y;
            this.life = 1.0;
            this.decay = Math.random() * 0.04 + 0.02;

            const ejectAngle = angle + Math.PI + (Math.random() - 0.5) * 2.5;
            const speed = Math.random() * 4 + 2;

            this.vx = Math.cos(ejectAngle) * speed;
            this.vy = Math.sin(ejectAngle) * speed;

            this.size = Math.random() * 3 + 1;
            this.color = Math.random() > 0.5 ? '#DDD6FE' : '#C4B5FD';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size *= 0.95;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    function init() {
        const { w, h } = getSize();
        stars.length = 0;
        for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

        if (comet.x === 0) {
            comet.x = -50;
            comet.y = h * 0.5;
        }
    }
    init();
    window.addEventListener('resize', init);

    function animate() {
        const { w, h } = getSize();
        ctx.clearRect(0, 0, w, h);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        if (mouse.x != null && mouse.y != null) {
            comet.targetX = mouse.x;
            comet.targetY = mouse.y;
            comet.autoMode = false;
        } else {
comet.autoMode = true;
        }

        if (comet.autoMode) {
            const t = Date.now() / 1000;
            const speedPixelPerSec = w * 0.3;
            comet.targetX = (t * speedPixelPerSec) % (w + 300) - 150;

            comet.targetY = (h * 0.5) 
                + Math.sin(t * 1.2) * (h * 0.15)
                + Math.cos(t * 2.5) * (h * 0.08);

            if (comet.targetX < -140 && comet.x > w) {
                comet.x = comet.targetX;
                comet.y = comet.targetY;
            }
        }

        const dx = comet.targetX - comet.x;
        const dy = comet.targetY - comet.y;

        if (Math.abs(dx) > w * 0.9) {
            comet.x = comet.targetX;
            comet.y = comet.targetY;
        } else {
            comet.x += dx * (comet.autoMode ? 0.2 : COMET_SPEED);
            comet.y += dy * (comet.autoMode ? 0.2 : COMET_SPEED);
        }

        comet.angle = Math.atan2(dy, dx);
        const vTotal = Math.sqrt(dx * dx + dy * dy);

        for (let i = 0; i < TRAIL_RATE; i++) {
            const p = Math.random();
            const jx = comet.x - (Math.cos(comet.angle) * vTotal * p * 0.5);
            const jy = comet.y - (Math.sin(comet.angle) * vTotal * p * 0.5);
            particles.push(new TrailParticle(jx, jy, comet.angle));
        }

        const sparkCount = SPARK_RATE + Math.floor(vTotal * 0.2);
        for (let i = 0; i < sparkCount; i++) {
            sparks.push(new Spark(comet.x, comet.y, comet.angle));
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
            sparks[i].update();
            if (sparks[i].life <= 0) {
                sparks.splice(i, 1);
            } else {
                sparks[i].draw();
            }
        }

        ctx.fillStyle = '#F5F3FF';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        requestAnimationFrame(animate);
    }

    animate();
}