import { createProjectile, initGame } from './functions/coreFunctions.js'
const startGameBtn = document.querySelector('.actions button')

window.addEventListener('click', event => {
    const projectileDirectionX = event.clientX
    const projectileDirectionY = event.clientY

    // calculo el angulo entre el centro y el click y luego la hipotenusa para desplazar los proyectiles
    createProjectile(projectileDirectionX, projectileDirectionY)
})

startGameBtn.addEventListener('click', () => {
    initGame()
})
