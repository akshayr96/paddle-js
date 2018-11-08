class Ball{
    constructor(config){
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
    }
}

export default Ball