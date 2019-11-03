class PaddleWallCollision {
    constructor(config, paddle){
        this.gameWidth = config.game.width
        this.paddle = paddle
    }

    handleCollision(){
        if(this.paddle.position.x < 0){
            this.paddle.position.x = 0
        }else if(this.paddle.position.x + this.paddle.width > this.gameWidth){
            this.paddle.position.x = this.gameWidth - this.paddle.width
        }
    }
}

export default PaddleWallCollision