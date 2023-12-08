class Particle {
    friction = 0.99

    constructor(x, y, radius, color, speed, canvasCtx) {
        this.x = x
        this.y = y
        this.color = color
        this.radius = radius
        this.speed = speed
        this.alpha = 1
        this.canvasCtx = canvasCtx
    }

    draw() {
        this.canvasCtx.save()
        this.canvasCtx.globalAlpha = this.alpha
        this.canvasCtx.beginPath()
        this.canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.canvasCtx.fillStyle = this.color
        this.canvasCtx.fill()
        this.canvasCtx.restore()
    }

    update() {
        this.draw()
        this.speed.x *= this.friction
        this.speed.y *= this.friction
        this.x = this.x + this.speed.x
        this.y = this.y + this.speed.y
        this.alpha -= 0.01
    }
}

export default Particle
