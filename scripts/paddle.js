class Paddle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = 75
        this.height = 10
        this.position = {
            x: (this.gameWidth / 2) - (this.width / 2),
            y: this.gameHeight - this.height
        }
        this.speed = 0
        this.maxSpeed = 7
    }

    update() {
        this.handleCollisions()
        this.position.x += this.speed
    }

    draw(ctx) {
        ctx.fillStyle ='#66ccff'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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
  