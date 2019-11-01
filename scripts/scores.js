class Scores{
    constructor(){
        this.scores = 0
    }

    incrementScore(){
        this.scores++
        document.getElementById("scores").innerHTML = this.scores
    }

    resetScore(){
        this.scores = 0
    }
}

export default Scores