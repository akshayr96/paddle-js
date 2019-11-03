import { Paddle, Bricks, Scores, Ball } from './gameEntities'
import CollisionEngine from "./collisionEngine"
import config from './statics/config'
import levels from "./statics/levels"
import Events from './events'

//initialize canvas
let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')
canvas.width = config.game.width
canvas.height = config.game.height

// initialize game entitie
let scores = new Scores(config)
let paddle = new Paddle(config)
let ball = new Ball(config, paddle, scores)
let bricks = new Bricks(config, levels, ball, scores)
new Events(paddle)

const collisionEngine = new CollisionEngine(config, ball, paddle, scores)
const gameEntities = [paddle, ball, bricks, scores]

function gameLoop(){
    //resets the canvas for the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //detects and handles collision
    collisionEngine.handleCollision()

    //repaints the entities onto the canvas
    gameEntities.forEach(entity => {
        entity.update()
        entity.draw(ctx)
    })

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
