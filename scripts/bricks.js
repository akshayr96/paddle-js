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
        this.collisionTypes = { HARIZONTAL: 'HARIZONTAL', VERTICAL: 'VERTICAL'}
        this.totalBricks = this.getTotalBricks()
    }

    update(){
        const { topOfBall, bottomOfBall, leftOfBall, rightOfBall, centerCoordinates } = this.ball.getBallCoordinates()
        const bricksAreaHeight = this.height * this.levels[this.level].length
        //Checks if the ball is in the area of the bricks
        if(bricksAreaHeight > topOfBall || bricksAreaHeight > bottomOfBall){
            const topOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(centerCoordinates.x, topOfBall);
            const bottomOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(centerCoordinates.x, bottomOfBall);
            const leftOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(leftOfBall, centerCoordinates.y);
            const rightOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(rightOfBall.x, centerCoordinates.y);
            //collision detection for the top and bottom tips of the ball
            this.handleCollision(
                [topOfTheBallBrickIndex, bottomOfTheBallBrickIndex],
                this.collisionTypes.VERTICAL
            )
            //collision detection for the left and right and bottom tips of the ball
            this.handleCollision(
                [leftOfTheBallBrickIndex, rightOfTheBallBrickIndex],
                this.collisionTypes.HARIZONTAL
            )
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

    handleCollision(bricksIndices, collisionType){
        bricksIndices.forEach((brickIndex) => {
            const { x, y } = brickIndex
            if(this.levels[this.level][y] && this.levels[this.level][y][x]){
                this.levels[this.level][y][x] = 0
                if(collisionType == this.collisionTypes.VERTICAL){
                    this.ball.dy = - this.ball.dy
                }else if(collisionType == this.collisionTypes.HARIZONTAL){
                    this.ball.dx = - this.ball.dx
                }
            }
        })
    }

    mapCoordinatesToBrickIndex(x, y){
        return {
            x: truncateDecimals(x/this.width),
            y: truncateDecimals(y/this.height)
        }
    }

    getTotalBricks(){
        return this.levels[this.level].reduce((sum, row)=> {
            return sum + row.reduce((rowTotal, brick) => {
                return rowTotal + brick
            },0)
        },0)
    }
}

export default Bricks