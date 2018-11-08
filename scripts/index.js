import Paddle from './paddle.js'
import Events from './events.js'
import Ball from './ball.js'
import config from './config.js'

let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')

canvas.width = config.game.width
canvas.height = config.game.height

let paddle = new Paddle(config)
let ball = new Ball(config)
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
