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
    }

    update(){
        this.handleCollisions()
        this.centerCoordinates.x += this.dx
        this.centerCoordinates.y += this.dy
    }

    draw(ctx){
        ctx.fillStyle ='red'
        ctx.beginPath();
        ctx.arc(this.centerCoordinates.x, this.centerCoordinates.y, this.radius, 0, 2*Math.PI);
        ctx.fill()
    }

    handleCollisions(){
        let collidesWithHarizontalWalls =
            this.centerCoordinates.x + this.radius > this.gameWidth ||
            this.centerCoordinates.x - this.radius < 0

        let collidesWithVerticalWalls =
            this.centerCoordinates.y + this.radius > this.gameHeight ||
            this.centerCoordinates.y - this.radius < 0

        if(collidesWithHarizontalWalls == true){
            this.dx = -this.dx
        }

        if(collidesWithVerticalWalls == true){
            this.dy = -this.dy
        }

        let bottomOfBall = this.centerCoordinates.y + this.radius
        let leftOfBall = this.centerCoordinates.x - this.radius
        let rightOfBall = this.centerCoordinates.x + this.radius
        let leftOfPaddle = this.paddle.position.x
        let rightOfPaddle = this.paddle.position.x + this.paddle.width
        let topOfPaddle = this.gameHeight - this.paddle.height
        
        let collidesWithPaddle = 
            bottomOfBall > topOfPaddle &&
            leftOfBall > leftOfPaddle &&
            rightOfBall < rightOfPaddle

        if(collidesWithPaddle == true){
            this.dy = -this.dy
        }
    }
}

export default Ball