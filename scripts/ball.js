class Ball{
    constructor(config, paddle){
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        this.radius = config.ball.radius
        this.centerCoordinates = {
            x: 0 + this.radius,
            y: 0 + this.radius
        }
        this.speed = config.ball.speed
        this.dx = this.speed
        this.dy = this.speed
        this.collision = false
        this.paddle = paddle
        this.color = config.ball.color
    }

    update(){
        this.handleCollisions()
        this.centerCoordinates.x += this.dx
        this.centerCoordinates.y += this.dy
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.centerCoordinates.x, this.centerCoordinates.y, this.radius, 0, 2*Math.PI);
        ctx.fill()
    }

    getBallCoordinates(){
        let topOfBall = this.centerCoordinates.y - this.radius
        let bottomOfBall = this.centerCoordinates.y + this.radius
        let leftOfBall = this.centerCoordinates.x - this.radius
        let rightOfBall = this.centerCoordinates.x + this.radius
        return { topOfBall, bottomOfBall, leftOfBall, rightOfBall, centerCoordinates: this.centerCoordinates }
    }

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
            }
        }
    }

    resetPosition(){
        this.centerCoordinates = {
            x: 0 + this.radius,
            y: 0 + this.radius
        }
    }
}

export default Ball