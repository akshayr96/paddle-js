class BallPaddleCollision {
    constructor(config, ball, paddle, gameState){
        //game config
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        //game entities
        this.ball = ball
        this.paddle = paddle
        this.gameState = gameState
    }

    handleCollision(){
        let { bottomOfBall, leftOfBall, rightOfBall } = this.ball.getBallCoordinates()
        let { topOfPaddle, rightOfPaddle, leftOfPaddle } = this.paddle.getPaddleCoordinates()

        let collidesWithPaddle = 
            bottomOfBall > topOfPaddle &&
            rightOfBall > leftOfPaddle &&
            leftOfBall < rightOfPaddle

        if(bottomOfBall > topOfPaddle){
            if(collidesWithPaddle == true){
                this.ball.dy = -this.ball.dy
            }else{
                this.ball.resetPosition()
                this.gameState.decrementLife()
            }
        }
    }
}

export default BallPaddleCollision