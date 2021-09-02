class reactionGame{
    constructor(){
        this.previousCircleClickedTime = 0;
        this.currentCircleClickedTime = 0;
        this.score = 0;
        this.maxScore = 0;
        this.numOfCircles = 2;
    }

    startGame(){
        let startScene = document.getElementById('start-scene');
        startScene.style.display = 'none';

        let scoreDisplay = document.getElementById('user-score')
        scoreDisplay.style.display = 'block';
        scoreDisplay.innerHTML = 'Number of circles clicked: 0 sec';
        
        this.createCircle();
        this.previousCircleClickedTime = Date.now();
        this.timer();
    }

    randomSize(){
        var r = Math.random() * 5 + 1;
        return r +'rem';
    }

    createCircle(){
        var circle =  document.createElement('div');
        circle.className = 'target-circle';
        circle.style.width = this.randomSize();
        circle.style.height = circle.style.width;
        circle.style.backgroundColor = this.randomColor();
        circle.style.borderRadius = '50%';
        let x = Math.random() * document.body.clientWidth ;
        let y = Math.random() * document.body.clientHeight;
        circle.style.position = 'absolute';
        circle.onclick = () => {
            this.circleOnClick(circle);
        };
        circle.style.transition = '0.5s'
        circle.animate([
            { transform: 'translate( calc('+x+'px + 5vh - 50vw) , calc('+y+'px + 5vh - 50vh) )' }
        ],{
            duration: 650,
            fill: "forwards"

        });
       
        document.body.appendChild(circle);
        
        
        
        
    }

    circleOnClick( circle ){
        this.currentCircleClickedTime = Date.now();
        var reactionTime = (this.currentCircleClickedTime - this.previousCircleClickedTime) / 1000;
        this.score++;
        let scoreDisplay = document.getElementById('user-score')
        scoreDisplay.innerHTML = 'Number of circles clicked: '+this.score +' <br> Your reaction time is '+reactionTime+' sec';
        
        this.previousCircleClickedTime = this.currentCircleClickedTime;
        circle.remove();
        this.nextRound();
        

    }

    nextRound(){
        var remainCircles = document.getElementsByClassName('target-circle');
        if( remainCircles.length <1 ){
            for(let i=0;i < this.numOfCircles;i++  ){
                this.createCircle();
            }
            this.numOfCircles++;
        }
       
    }


    randomColor(){
        var r = Math.random() * 256;
        var g = Math.random() * 256;
        var b = Math.random() * 256;
        var a = Math.random() * 0.5 + 0.5;

        return 'rgba('+ r+', '+g+' ,'+b+', '+a+')';
    }

    reset(){
        var endScene = document.getElementById('end-scene');
        endScene.innerHTML = '';
        this.previousCircleClickedTime = 0;
        this.currentCircleClickedTime = 0;
        document.getElementById('restart-button').remove();
        this.numOfCircles = 2;
        this.startGame();
    }

    clearTargetCircles(){
        var targetCircles =  document.getElementsByClassName('target-circle');
        while( targetCircles.length>0 ){
            targetCircles.item(0).remove();
        }
    }

    timer(){
        let timerDisplay = document.getElementById('timer');
        timerDisplay.style.display = 'block';
        var timeLimit = 30;   //secs
        var clock = setInterval( function(){
            document.body.style.backgroundColor = mainGame.randomColor();
            timerDisplay.innerHTML = 'Remanining '+ timeLimit+ ' secs <br>';
            timeLimit--;
            if( timeLimit === -1 ){
                var endScene = document.getElementById('end-scene');
                var maxScore = document.getElementById('max-score');
                maxScore.style.display = 'block';
                if( mainGame.score > mainGame.maxScore ){
                    mainGame.maxScore = mainGame.score;
                }
                mainGame.score =0;
                maxScore.innerHTML = 'Maximum clicks by far is '+ mainGame.maxScore;
                endScene.innerHTML = 'How many circles did you click? Is this all you got? Come on bro, try it again to beat your maximum score so far!'
                let restartButton = document.createElement('button');
                restartButton.innerHTML = 'Beat Myself !';
                restartButton.id = 'restart-button';
                restartButton.onclick = () => {
                    mainGame.reset();
                };
                document.getElementById('reaction-game').appendChild(restartButton);
                mainGame.clearTargetCircles();
                clearInterval(clock);
            }
        } ,1000);
        
    }


}

var mainGame;

function start(){
    //document.body.firstElementChild.remove();
    mainGame = new reactionGame();
    mainGame.startGame();
}

