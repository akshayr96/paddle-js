class Ball{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.radius = 5
        this.position = {
            x: 0 + this.radius,
            y: 0 + this.radius
        }
        this.speed = 5
        this.dx = this.speed
        this.dy = this.speed
        this.collision = false
    }

    update(){
        //collision detection on walls
        if(this.position.x + this.radius > this.gameWidth || this.position.x - this.radius < 0 ){
            this.dx = -this.dx
        }
        if(this.position.y + this.radius > this.gameHeight || this.position.y - this.radius < 0 ){
            this.dy = -this.dy
        }
        this.position.x += this.dx
        this.position.y += this.dy
    }

    draw(ctx){
        ctx.fillStyle ='red'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        ctx.fill()
    }
}

export default Ball