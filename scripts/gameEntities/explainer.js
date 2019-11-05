class Explainer {
    constructor(gameState){
        this.gameState = gameState
        this.pauseTemplate = document.getElementById("pause-screen")
        this.gameOverTemplate = document.getElementById("game-over-screen")
    }

    update(){
        if(this.gameState.state == this.gameState.states.GAME_OVER){
            this.gameOverTemplate.style.visibility = "visible"
            document.getElementById("final-score").innerHTML = this.gameState.scores
        }else{
            this.gameOverTemplate.style.visibility = "hidden"
            switch(this.gameState.state){
                case this.gameState.states.PAUSE:
                    this.pauseTemplate.style.visibility = "visible"
                    break
                case this.gameState.states.PLAY:
                    this.pauseTemplate.style.visibility = "hidden"
                    break
            }
        }
    }

    draw(){}

}

export default Explainer