let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

// bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

const moveUp = ()=>{
    yPos -= 25;
}
document.addEventListener('keydown', moveUp);

let pipe = [];
pipe.push({
    x: cvs.width,
    y: 0,
})

let otstup = 100;
let score = 0;

const draw = ()=> {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, xPos, yPos);

    for(i in pipe){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + otstup);
        pipe[i].x--

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeUp.height) - pipeUp.height,
            })
        }

        if(xPos + bird.width >= pipe[i].x && 
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + otstup) ||
                yPos + bird.height >= cvs.height - fg.height
        ){
            location.reload();
        }
        if(pipe[i].x == 5) score++
    }

    yPos += grav;
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Score: ' + score, 10, cvs.height - 20);

    if(score == 5){
        alert('You won!!!');
        location.reload();
    }else{
        requestAnimationFrame(draw);
    }   
}
pipeBottom.onload = draw;