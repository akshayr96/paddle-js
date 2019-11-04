import { Paddle, Bricks, GameState, Ball, Explainer } from './gameEntities'
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
let gameState = new GameState(config)
let paddle = new Paddle(config, gameState)
let ball = new Ball(config, paddle, gameState)
let bricks = new Bricks(config, levels, ball, gameState)
let explainer = new Explainer(gameState)
new Events(paddle, explainer)

//Initialize game engine and game objects
const collisionEngine = new CollisionEngine(config, ball, paddle, gameState)
const gameEntities = [paddle, ball, bricks, explainer]

//Main game loop
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
