class Scores{
    constructor(config){
        this.defaultScore = config.scores.score
        this.defaultLife = config.scores.life
        this.scores = this.defaultScore
        this.life = this.defaultLife
    }

    update(){}
    
    draw(){
        document.getElementById("scores").innerHTML = this.scores
        document.getElementById("life").innerHTML = this.life
    }

    incrementScore(){
        this.scores++
    }

    resetScore(){
        this.scores = this.defaultScore
    }

    decrementLife(){
        this.life = this.life ? this.life - 1 : this.life
    }

    resetLife(){
        this.life = this.defaultLife
    }
}

export default Scores