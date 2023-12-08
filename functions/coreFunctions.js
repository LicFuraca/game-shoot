import Player from '../core/Player.js'
import Enemy from '../core/Enemy.js'
import Projectile from '../core/Projectile.js'
import Particle from '../core/Particle.js'

import { removeEnemies, removeParticles, removeProjectiles } from './removeFromScreen.js'
import { updateScore, createParticle } from './projectileHits.js'

const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')
const gameOver = document.querySelector('.modal')
const modalScore = document.querySelector('.modal-container h2')
const scoreElement = document.querySelector('#score')

canvas.width = innerWidth
canvas.height = innerHeight

const centerPositionX = canvas.width / 2
const centerPositionY = canvas.height / 2

let player = new Player(centerPositionX, centerPositionY, 15, '#f3f3f3', canvasCtx)

let particles = []
let enemies = []
let projectiles = []
let animationId
let score = 0

export const initGame = () => {
    player = new Player(centerPositionX, centerPositionY, 15, '#f3f3f3', canvasCtx)
    enemies = []
    projectiles = []
    particles = []
    score = 0

    scoreElement.innerHTML = score
    modalScore.innerHTML = score
    gameOver.style.display = 'none'

    spawnEnemies()
    animate()
}

const spawnEnemies = () => {
    setInterval(() => {
        const radius = Math.random() * (40 - 5) + 5
        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const randomColor = Math.random() * 360
        const color = `hsl(${randomColor}, 50%, 50%)`
        const angle = Math.atan2(centerPositionY - y, centerPositionX - x)
        const speed = { x: Math.cos(angle) * 2, y: Math.sin(angle) * 2 }

        enemies.push(new Enemy(x, y, radius, color, speed, canvasCtx))
    }, 1000)
}

const animate = () => {
    animationId = requestAnimationFrame(animate)
    canvasCtx.fillStyle = 'rgba(34, 34, 34, 0.3)'
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()

    removeParticles(particles)
    removeProjectiles(projectiles, canvas)

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        const distanceFromPlayer = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if (distanceFromPlayer - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            modalScore.innerHTML = score
            gameOver.style.display = 'flex'
        }

        // Enemy hit.
        projectiles.forEach((projectile, projectileIndex) => {
            const distanceFromProjectiles = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (distanceFromProjectiles - enemy.radius - projectile.radius < 1) {
                score = updateScore(score, scoreElement)
                scoreElement.innerHTML = score

                createParticle(enemy, particles, Particle, projectile, canvasCtx)
                removeEnemies(enemy, enemies, enemyIndex, projectiles, projectileIndex)
            }
        })
    })
}

export const createProjectile = (projectileDirectionX, projectileDirectionY) => {
    const angle = Math.atan2(projectileDirectionY - centerPositionY, projectileDirectionX - centerPositionX)
    const speed = { x: Math.cos(angle) * 4, y: Math.sin(angle) * 4 }

    projectiles.push(new Projectile(centerPositionX, centerPositionY, 5, '#f3f3f3', speed, canvasCtx))
}
