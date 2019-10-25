import { truncateDecimals } from "./utils.js"

class Bricks {
    constructor(config, levels, ball){
        this.gameWidth = config.game.width
        this.border = config.brick.border
        this.fill = config.brick.fill
        this.stroke = config.brick.stroke
        this.level = 0
        this.levels = levels
        this.ball = ball
        this.height = config.brick.height
        this.width = this.gameWidth / this.levels[this.level][0].length
    }

    update(){
        const { topOfBall, bottomOfBall, leftOfBall, rightOfBall, centerCoordinates } = this.ball.getBallCoordinates()
        const bricksAreaHeight = this.height * this.levels[this.level].length
        if(bricksAreaHeight > topOfBall || bricksAreaHeight > bottomOfBall){
           const { x, y } = this.mapCoordinatesToBrickIndex(centerCoordinates.x, topOfBall)
           if(this.levels[this.level][y][x]){
               this.levels[this.level][y][x] = 0
               this.ball.dy = - this.ball.dy
           }
        }
    }

    draw(ctx){
        this.levels[this.level].forEach((row, rowIndex) => {
            row.forEach((brick, columnIndex) => {
                if(brick){
                    const xCoordinate = columnIndex * this.width
                    const yCoordinate = rowIndex * this.height
                    //stroke
                    ctx.fillStyle = this.stroke
                    ctx.fillRect(xCoordinate, yCoordinate, this.width, this.height)
                    //fill
                    ctx.fillStyle = this.fill
                    ctx.fillRect(
                        xCoordinate + this.border,
                        yCoordinate + this.border,
                        this.width - (2 * this.border),
                        this.height - (2 * this.border)
                    )
                }
            })
        })
    }

    mapCoordinatesToBrickIndex(x, y){
        return {
            x: truncateDecimals(x/this.width),
            y: truncateDecimals(y/this.height)
        }
    }

}

export default Bricks