import BallPaddleCollision from "./ballPaddle"
import BallWallCollision from "./ballWall"
import PaddleWallCollision from "./paddleWall"

class CollisionEngine {
    constructor(config, ball, paddle, gameState){
        this.collisionHandlers = [
            new BallPaddleCollision(config, ball, paddle, gameState),
            new BallWallCollision(config, ball),
            new PaddleWallCollision(config, paddle)
        ]
    }

    handleCollision(){
        this.collisionHandlers.forEach(collisionHandler => {
            collisionHandler.handleCollision()
        })
    }
}

export default CollisionEngine