import { Controller } from "@hotwired/stimulus"

// Physics Constants
const FRICTION = 0.98
const MOUSE_RADIUS = 150
const RIPPLE_RADIUS = 300
const RIPPLE_FORCE = 15

export default class extends Controller {
    static targets = ["canvas", "ui", "timeLabel", "coordinates", "hint"]

    connect() {
        this.canvas = this.canvasTarget
        this.ctx = this.canvas.getContext('2d')
        this.particles = []
        this.count = 1000
        this.mouse = { x: null, y: null, active: false }
        this.ripples = [] // Array to store active ripples

        // Time Mapper Configuration
        this.timeState = this.detectTimeState()
        this.palette = this.getPalette(this.timeState)

        this.resize()
        this.initParticles()
        this.bindEvents()

        this.animate = this.animate.bind(this)
        requestAnimationFrame(this.animate)

        setTimeout(() => {
            this.uiTargets.forEach(el => el.classList.remove('opacity-0'))
            this.updateTimeDisplay()
        }, 100)

        setTimeout(() => {
            if (this.hasHintTarget) this.hintTarget.classList.remove('opacity-0')
        }, 2000)
    }

    detectTimeState() {
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 8) return 'DAWN'
        if (hour >= 8 && hour < 17) return 'DAY'
        if (hour >= 17 && hour < 20) return 'DUSK'
        return 'VOID'
    }

    getPalette(state) {
        const palettes = {
            DAWN: ['rgba(255, 183, 178, ', 'rgba(255, 218, 193, ', 'rgba(226, 240, 203, '],
            DAY: ['rgba(168, 230, 207, ', 'rgba(220, 237, 193, ', 'rgba(255, 211, 182, '],
            DUSK: ['rgba(255, 148, 114, ', 'rgba(189, 178, 255, ', 'rgba(160, 196, 255, '],
            VOID: ['rgba(255, 255, 255, ', 'rgba(100, 116, 139, ', 'rgba(71, 85, 105, ']
        }
        return palettes[state] || palettes.VOID
    }

    updateTimeDisplay() {
        const now = new Date()
        if (this.hasTimeLabelTarget) this.timeLabelTarget.textContent = `${this.timeState} // ${now.toLocaleTimeString()}`
        if (Math.random() > 0.95 && this.hasCoordinatesTarget) {
            const lat = (37.5665 + (Math.random() - 0.5) * 0.001).toFixed(4)
            this.coordinatesTarget.textContent = `${lat}° N, 126.9780° E`
        }
        setTimeout(() => this.updateTimeDisplay(), 1000)
    }

    bindEvents() {
        window.addEventListener('resize', this.resize.bind(this))
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x
            this.mouse.y = e.y
            this.mouse.active = true
            if (this.hasHintTarget && !this.hintTarget.classList.contains('opacity-0')) {
                this.hintTarget.classList.add('opacity-0')
            }
        })

        // Ripple Effect (Doc 207 Task 4)
        window.addEventListener('click', (e) => {
            this.ripples.push({
                x: e.x,
                y: e.y,
                age: 0,
                maxAge: 30
            })
        })

        window.addEventListener('mouseout', () => {
            this.mouse.active = false
            this.mouse.x = null
            this.mouse.y = null
        })
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.initParticles()
    }

    initParticles() {
        this.particles = []
        for (let i = 0; i < this.count; i++) {
            // Doc 207 Task 2: Random Initial State
            this.particles.push(new Particle(this.canvas.width, this.canvas.height, this.palette))
        }
    }

    animate() {
        // Trail Effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        // Critical: Ensure composite operation is set for glow
        this.ctx.globalCompositeOperation = 'lighter'

        // Update Ripples
        this.ripples.forEach((ripple, index) => {
            ripple.age++
            if (ripple.age > ripple.maxAge) {
                this.ripples.splice(index, 1)
            }
            // Draw Ripple Ring
            this.ctx.beginPath()
            this.ctx.arc(ripple.x, ripple.y, ripple.age * 5 + 10, 0, Math.PI * 2)
            this.ctx.strokeStyle = `rgba(100, 255, 255, ${1 - ripple.age / ripple.maxAge})`
            this.ctx.lineWidth = 2
            this.ctx.stroke()
        })

        this.particles.forEach(p => {
            p.update(this.mouse, this.ripples)
            p.draw(this.ctx)
        })

        // Draw Constellation Lines near mouse
        if (this.mouse.active && this.mouse.x) {
            this.drawConstellation()
        }

        this.ctx.globalCompositeOperation = 'source-over' // Reset

        requestAnimationFrame(this.animate)
    }

    drawConstellation() {
        // Optimized: Only check particles near mouse (simple distance check)
        // For performance, we limit this to a subset or spatial partition if needed,
        // but for <1000 particles, O(N) naive check for "near mouse" is okay.
        // O(N^2) total connection is too slow.

        const nearby = []
        const CONNECT_RADIUS = 150

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i]
            const dx = this.mouse.x - p.x
            const dy = this.mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < CONNECT_RADIUS) {
                nearby.push(p)
                // Draw line to mouse
                this.ctx.beginPath()
                this.ctx.moveTo(this.mouse.x, this.mouse.y)
                this.ctx.lineTo(p.x, p.y)
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / CONNECT_RADIUS)})`
                this.ctx.lineWidth = 0.5
                this.ctx.stroke()
            }
        }
    }
}

class Particle {
    constructor(w, h, palette) {
        this.w = w
        this.h = h
        this.x = Math.random() * w
        this.y = Math.random() * h

        // Boost velocity for high DPI
        const dpr = window.devicePixelRatio || 1
        this.vx = (Math.random() - 0.5) * 1.5 * dpr
        this.vy = (Math.random() - 0.5) * 1.5 * dpr

        this.baseVx = this.vx
        this.baseVy = this.vy

        // Increase Size
        this.size = (Math.random() * 3 + 2) * dpr
        const colorBase = palette[Math.floor(Math.random() * palette.length)]
        this.alpha = Math.random() * 0.5 + 0.4
        // Store RGB components for burst manipulation
        this.colorBase = colorBase // e.g., 'rgba(255, 100, 100, '
        this.currentAlpha = this.alpha
        this.burstMode = false
    }

    update(mouse, ripples) {
        // 1. Basic Movement
        this.x += this.vx
        this.y += this.vy

        // 2. Wall Bounce
        if (this.x < 0 || this.x > this.w) this.vx *= -1
        if (this.y < 0 || this.y > this.h) this.vy *= -1

        // 3. Mouse Interaction (Repulsion + Swirl)
        if (mouse.active) {
            const dx = mouse.x - this.x
            const dy = mouse.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < MOUSE_RADIUS) {
                const forceDirectionX = dx / distance
                const forceDirectionY = dy / distance
                const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS

                // Push + slight rotation (Swirl)
                const repulseX = forceDirectionX * force * 2.0
                const repulseY = forceDirectionY * force * 2.0

                this.vx -= repulseX
                this.vy -= repulseY
            }
        }

        // 4. Ripple Interaction (Burst)
        ripples.forEach(ripple => {
            const dx = ripple.x - this.x
            const dy = ripple.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < RIPPLE_RADIUS) {
                const force = (RIPPLE_RADIUS - distance) / RIPPLE_RADIUS

                // Explode out
                this.vx -= (dx / distance) * force * RIPPLE_FORCE * 0.5
                this.vy -= (dy / distance) * force * RIPPLE_FORCE * 0.5

                // Color Burst
                this.burstMode = true
                this.currentAlpha = 1.0
            }
        })

        // 5. Friction & Easing
        this.vx = this.vx * FRICTION + this.baseVx * (1 - FRICTION)
        this.vy = this.vy * FRICTION + this.baseVy * (1 - FRICTION)

        // 6. Burst Decay
        if (this.burstMode) {
            this.currentAlpha -= 0.05
            if (this.currentAlpha <= this.alpha) {
                this.currentAlpha = this.alpha
                this.burstMode = false
            }
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        // If burst, use White/Cyan, else base color
        if (this.burstMode) {
            ctx.fillStyle = `rgba(200, 255, 255, ${this.currentAlpha})`
        } else {
            ctx.fillStyle = this.colorBase + this.currentAlpha + ')'
        }

        ctx.fill()
    }
}
