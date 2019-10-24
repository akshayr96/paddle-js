class Paddle {
    constructor(config) {
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        this.width = config.paddle.width
        this.height = config.paddle.height
        this.position = {
            x: (this.gameWidth / 2) - (this.width / 2),
            y: this.gameHeight - this.height
        }
        this.speed = 0
        this.maxSpeed = config.paddle.speed
    }

    update() {
        this.handleCollisions()
        this.position.x += this.speed
    }

    draw(ctx) {
        ctx.fillStyle ='#66ccff'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    getPaddleCoordinates(){
        let leftOfPaddle = this.position.x
        let rightOfPaddle = this.position.x + this.width
        let topOfPaddle = this.gameHeight - this.height
        return { topOfPaddle, rightOfPaddle, leftOfPaddle }
    }

    handleCollisions(){
        if(this.position.x < 0){
            this.position.x = 0
        }else if(this.position.x + this.width > this.gameWidth){
            this.position.x = this.gameWidth - this.width
        }
    }

    moveLeft(){
        this.speed = -this.maxSpeed
    }

    moveRight(){
        this.speed = this.maxSpeed
    }

    stop(){
        this.speed = 0
    }
}
  
  export default Paddle
  