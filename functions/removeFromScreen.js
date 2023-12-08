export const removeParticles = particles => {
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })
}

export const removeProjectiles = (projectiles, canvas) => {
    projectiles.forEach((projectile, index) => {
        projectile.update()

        if (
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
        ) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })
}

export const removeEnemies = (enemy, enemies, enemyIndex, projectiles, projectileIndex) => {
    if (enemy.radius - 10 > 10) {
        gsap.to(enemy, {
            radius: enemy.radius - 10,
        })

        setTimeout(() => {
            projectiles.splice(projectileIndex, 1)
        }, 0)
    } else {
        setTimeout(() => {
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
        }, 0)
    }
}
