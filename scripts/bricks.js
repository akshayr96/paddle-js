class Bricks {
    constructor(config, levels){
        this.gameWidth = config.game.width
        this.height = config.brick.height
        this.border = config.brick.border
        this.fill = config.brick.fill
        this.stroke = config.brick.stroke
        this.level = 0
        this.levels = levels
    }

    update(){
        //collision detection with the brick goes here
    }

    draw(ctx){
        this.levels[this.level].forEach((row, rowIndex) => {
            row.forEach((brick, columnIndex) => {
                if(brick){
                    const brickWidth = this.gameWidth / row.length
                    const xCoordinate = columnIndex * brickWidth
                    const yCoordinate = rowIndex * this.height
                    //stroke
                    ctx.fillStyle = this.stroke
                    ctx.fillRect(xCoordinate, yCoordinate, brickWidth, this.height)
                    //fill
                    ctx.fillStyle = this.fill
                    ctx.fillRect(
                        xCoordinate + this.border,
                        yCoordinate + this.border,
                        brickWidth - (2 * this.border),
                        this.height - (2 * this.border)
                    )
                }
            })
        })
    }
}

export default Bricks