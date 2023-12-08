class Player {
    constructor(x, y, radius, color, canvasCtx) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.canvasCtx = canvasCtx
    }

    draw() {
        try {
            this.canvasCtx.beginPath()
            this.canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            this.canvasCtx.fillStyle = this.color
            this.canvasCtx.fill()
        } catch (error) {
            console.error(error)
        }
    }
}

export default Player
