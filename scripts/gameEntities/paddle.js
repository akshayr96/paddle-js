class Paddle {
    constructor(config, gameState) {
        //global config
        this.gameWidth = config.game.width
        this.gameHeight = config.game.height
        //paddle config
        this.width = config.paddle.width
        this.height = config.paddle.height
        this.position = {
            x: (this.gameWidth / 2) - (this.width / 2),
            y: this.gameHeight - this.height
        }
        this.speed = 0
        this.maxSpeed = config.paddle.speed
        this.color = config.paddle.color
        //other entities
        this.gameState = gameState
    }

    update() {
        if(this.gameState.state == this.gameState.states.PLAY){
            this.position.x += this.speed
        }
    }

    draw(ctx) {
        ctx.fillStyle =this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    getPaddleCoordinates(){
        let leftOfPaddle = this.position.x
        let rightOfPaddle = this.position.x + this.width
        let topOfPaddle = this.gameHeight - this.height
        return { topOfPaddle, rightOfPaddle, leftOfPaddle }
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
  