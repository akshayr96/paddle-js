import { truncateDecimals } from "../statics/utils"

class Bricks {
    constructor(config, levels, ball, gameState){
        //global config
        this.gameWidth = config.game.width
        this.level = 0
        this.levels = levels
        this.currentLevel = []
        this.setLevel()
        //brick config
        this.width = this.gameWidth / this.levels[this.level][0].length
        this.height = config.brick.height
        this.border = config.brick.border
        this.fill = config.brick.fill
        this.stroke = config.brick.stroke
        this.totalBricks = this.getTotalBricks()
        this.activeBrickCount = this.totalBricks
        //other entities
        this.ball = ball
        this.gameState = gameState
        //constants
        this.collisionTypes = { 
            HARIZONTAL: 'HARIZONTAL',
            VERTICAL: 'VERTICAL'
        }
    }

    /**
     * Update - Lifecycle method
     */
    update(){
        if(this.gameState.state == this.gameState.states.GAME_OVER && this.level > 0){
            this.setLevel(0)
        }
        const { topOfBall, bottomOfBall, leftOfBall, rightOfBall, centerCoordinates } = this.ball.getBallCoordinates()
        const bricksAreaHeight = this.height * this.levels[this.level].length
        //Checks if the ball is in the area of the bricks
        if(bricksAreaHeight > topOfBall || bricksAreaHeight > bottomOfBall){
            const topOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(centerCoordinates.x, topOfBall);
            const bottomOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(centerCoordinates.x, bottomOfBall);
            const leftOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(leftOfBall, centerCoordinates.y);
            const rightOfTheBallBrickIndex = this.mapCoordinatesToBrickIndex(rightOfBall, centerCoordinates.y);
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
            if(this.activeBrickCount == 0 && this.levels[this.level + 1]){
                this.ball.resetPosition()
                this.level++
                this.setLevel()
                this.totalBricks = this.getTotalBricks()
                this.activeBrickCount = this.totalBricks
            }
        }
    }

    /**
     * Draw - lifecycle method
     * @param {*} ctx canvas context
     */
    draw(ctx){
        this.currentLevel.forEach((row, rowIndex) => {
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

    /**
     * Handles collision betweem the ball and the bricks
     * @param {{ x: number, y: number }[]} bricksIndices 
     * @param {string} collisionType 
     * @returns {number} returns the number of collisions detected
     */
    handleCollision(bricksIndices, collisionType){
        bricksIndices.forEach((brickIndex) => {
            const { x, y } = brickIndex
            if(this.currentLevel[y] && this.currentLevel[y][x]){
                if( this.currentLevel[y][x]){
                    this.currentLevel[y][x] = 0
                    this.gameState.incrementScore()
                    this.activeBrickCount--
                }
                if(collisionType == this.collisionTypes.VERTICAL){
                    this.ball.dy = - this.ball.dy
                }else if(collisionType == this.collisionTypes.HARIZONTAL){
                    this.ball.dx = - this.ball.dx
                }
            }
        })
    }

    /**
     * returns the the 2D Array index of brick that has the given coordinate
     * @param {number} x coordinate
     * @param {number} y coordinate
     */
    mapCoordinatesToBrickIndex(x, y){
        return {
            x: truncateDecimals(x/this.width),
            y: truncateDecimals(y/this.height)
        }
    }

    /**
     * Returns initial count of the bricks in the current level
     */
    getTotalBricks(){
        return this.levels[this.level].reduce((sum, row)=> {
            return sum + row.reduce((rowTotal, brick) => {
                return rowTotal + brick
            },0)
        },0)
    }

    /**
     * sets the current level to a particular level
     */
    setLevel(level = this.level){
        const nextLevel = this.levels[level] ? level : 0
        this.level = nextLevel
        this.currentLevel = JSON.parse(JSON.stringify(this.levels[nextLevel]))
    }
}

export default Bricks