class Explainer {
    constructor(gameState){
        this.gameState = gameState
        this.overlay = document.getElementById("overlay")
    }

    update(){
        if(this.gameState.life > 0){
            switch(this.gameState.state){
                case this.gameState.states.PAUSE:
                    this.overlay.style.visibility = "visible"
                    break
                case this.gameState.states.PLAY:
                    this.overlay.style.visibility = "hidden"
                    break
            }
        }
    }

    draw(){}

}

export default Explainer