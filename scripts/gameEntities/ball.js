class Ball{
    constructor(config, paddle, gameState){
        //global config
        this.gameHeight = config.game.height
        this.speed = config.ball.speed
        //ball config
        this.radius = config.ball.radius
        this.centerCoordinates = { x: 0, y: 0 }
        this.color = config.ball.color
        this.dx = this.speed
        this.dy = - this.speed
        //game entities
        this.paddle = paddle
        this.gameState = gameState
        //other functions
        this.resetPosition()
    }

    update(){
        if(this.gameState.state == this.gameState.states.PLAY){
            this.centerCoordinates.x += this.dx
            this.centerCoordinates.y += this.dy
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.centerCoordinates.x, this.centerCoordinates.y, this.radius, 0, 2*Math.PI);
        ctx.fill()
    }

    /**
     * Returns the coordinates of the ball
     */
    getBallCoordinates(){
        let topOfBall = this.centerCoordinates.y - this.radius
        let bottomOfBall = this.centerCoordinates.y + this.radius
        let leftOfBall = this.centerCoordinates.x - this.radius
        let rightOfBall = this.centerCoordinates.x + this.radius
        return { topOfBall, bottomOfBall, leftOfBall, rightOfBall, centerCoordinates: this.centerCoordinates }
    }

    /**
     * Resets the position of the ball to the center of the paddle
     */
    resetPosition(){
        this.centerCoordinates = {
            x: 0 + this.paddle.position.x + (this.paddle.width/2),
            y: 0 + this.gameHeight - this.paddle.height - this.radius
        }
    }
}

export default Ball