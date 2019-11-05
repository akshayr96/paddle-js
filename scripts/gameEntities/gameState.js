class GameState {
    constructor(config) {
        this.defaultScore = config.scores.score
        this.defaultLife = config.scores.life
        this.scores = this.defaultScore
        this.life = this.defaultLife
        this.states = { PAUSE: 'PAUSE', PLAY: 'PLAY', GAME_OVER: 'GAME_OVER' }
        this.state = this.states.PAUSE
        this.addGameStateShiftListener()
        this.setScoresToTemplate()
        this.setLifeToTemplate()
    }

    incrementScore() {
        this.scores++
        this.setScoresToTemplate()
    }

    resetScore() {
        this.scores = this.defaultScore
        this.setScoresToTemplate()
    }

    setScoresToTemplate() {
        document.getElementById("scores").innerHTML = this.scores
    }

    decrementLife() {
        this.life = this.life ? this.life - 1 : this.life
        this.setLifeToTemplate()
        if (this.life == 0) {
            this.state = this.states.GAME_OVER
        }
    }

    resetLife() {
        this.life = this.defaultLife
        this.setLifeToTemplate()
    }

    setLifeToTemplate() {
        document.getElementById("life").innerHTML = "❤️".repeat(this.life)
    }

    addGameStateShiftListener(){
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 32) {
                if (this.state == this.states.PLAY) this.state = this.states.PAUSE
                else if (this.state == this.states.PAUSE) this.state = this.states.PLAY
                else if (this.state == this.states.GAME_OVER) {
                    this.resetScore()
                    this.resetLife()
                    this.state = this.states.PLAY
                }
            }
        })
    }
}

export default GameState