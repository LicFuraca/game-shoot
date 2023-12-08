export const updateScore = score => {
    return (score += 100)
}

export const createParticle = (enemy, particles, Particle, projectile, canvasCtx) => {
    for (let i = 0; i < enemy.radius * 2; i++) {
        const randomRadius = Math.random() * 2
        particles.push(
            new Particle(
                projectile.x,
                projectile.y,
                randomRadius,
                enemy.color,
                {
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8),
                },
                canvasCtx
            )
        )
    }
}
