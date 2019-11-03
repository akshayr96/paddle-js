class BallWallCollision {
    constructor(config, ball){
        //game config
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        //game entities
        this.ball = ball
    }

    handleCollision(){
        let { topOfBall, bottomOfBall, leftOfBall, rightOfBall } = this.ball.getBallCoordinates()

        let collidesWithVerticalWalls =
            rightOfBall > this.gameWidth ||
            leftOfBall < 0

        let collidesWithHarizontalWalls =
            bottomOfBall > this.gameHeight ||
            topOfBall < 0
        
        if(collidesWithVerticalWalls == true){
            this.ball.dx = -this.ball.dx
        }

        if(collidesWithHarizontalWalls == true){
            this.ball.dy = -this.ball.dy
        }
    }
}

export default BallWallCollision