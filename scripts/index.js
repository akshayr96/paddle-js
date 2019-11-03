//Game Entity imports
import Paddle from './paddle.js'
import Events from './events.js'
import Ball from './ball.js'
import Bricks from './bricks.js'
import Scores from "./scores"
//Collision Imports
import BallPaddleCollision from "./gameEngine/ballPaddle"
import BallWallCollision from "./gameEngine/ballWall"
//Static Imports
import config from './config.js'
import levels from "./levels.js"

let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')

canvas.width = config.game.width
canvas.height = config.game.height


let scores = new Scores(config)
let paddle = new Paddle(config)
let ball = new Ball(config, paddle, scores)
let bricks = new Bricks(config, levels, ball, scores)

let ballPaddleCollision = new BallPaddleCollision(config, ball, paddle, scores)
let ballWallCollision = new BallWallCollision(config, ball)
new Events(paddle)

const gameEntities = [paddle, ball, bricks, scores]
const gameEngine = [ballPaddleCollision, ballWallCollision]

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameEngine.forEach(entity => {
        entity.handleCollision()
    })

    gameEntities.forEach(entity => {
        entity.update()
        entity.draw(ctx)
    })

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
