class Projectile {
    constructor(x, y, radius, color, speed, canvasCtx) {
        this.x = x
        this.y = y
        this.color = color
        this.radius = radius
        this.speed = speed
        this.canvasCtx = canvasCtx
    }

    draw() {
        this.canvasCtx.beginPath()
        this.canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.canvasCtx.fillStyle = this.color
        this.canvasCtx.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.speed.x
        this.y = this.y + this.speed.y
    }
}

export default Projectile
