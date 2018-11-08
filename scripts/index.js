import Paddle from './paddle.js'
import Events from './events.js'
import Ball from './ball.js'

let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')

let gameWidth = 400
let gameHeight = 500

canvas.width = gameWidth
canvas.height = gameHeight

let paddle = new Paddle(gameWidth, gameHeight)
let ball = new Ball(gameWidth, gameHeight)
new Events(paddle)

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    paddle.update()
    paddle.draw(ctx)
    ball.update()
    ball.draw(ctx)
    
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
