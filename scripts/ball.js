class Ball{
    constructor(config, paddle, scores){
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        this.radius = config.ball.radius
        this.paddle = paddle
        this.centerCoordinates = { x: 0, y: 0 }
        this.resetPosition()
        this.speed = config.ball.speed
        this.dx = this.speed
        this.dy = - this.speed
        this.collision = false
        this.color = config.ball.color
        this.scores = scores
        this.halt = false
    }

    update(){
        if(!this.halt){
            this.handleCollisions()
            this.centerCoordinates.x += this.dx
            this.centerCoordinates.y += this.dy
        }
    }

    draw(ctx){
        if(!this.halt){
            ctx.fillStyle = this.color
            ctx.beginPath();
            ctx.arc(this.centerCoordinates.x, this.centerCoordinates.y, this.radius, 0, 2*Math.PI);
            ctx.fill()
        }
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
     * Handles collisions of the ball with wall and paddle
     */
    handleCollisions(){
        let { topOfBall, bottomOfBall, leftOfBall, rightOfBall } = this.getBallCoordinates()
        let { topOfPaddle, rightOfPaddle, leftOfPaddle } = this.paddle.getPaddleCoordinates()

        let collidesWithVerticalWalls =
            rightOfBall > this.gameWidth ||
            leftOfBall < 0

        let collidesWithHarizontalWalls =
            bottomOfBall > this.gameHeight ||
            topOfBall < 0
        
        let collidesWithPaddle = 
            bottomOfBall > topOfPaddle &&
            rightOfBall > leftOfPaddle &&
            leftOfBall < rightOfPaddle

        if(collidesWithVerticalWalls == true){
            this.dx = -this.dx
        }

        if(collidesWithHarizontalWalls == true){
            this.dy = -this.dy
        }
        if(bottomOfBall > topOfPaddle){
            if(collidesWithPaddle == true){
                this.dy = -this.dy
            }else{
                this.resetPosition()
                this.scores.decrementLife()
                this.halt = !!!this.scores.life
            }
        }
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