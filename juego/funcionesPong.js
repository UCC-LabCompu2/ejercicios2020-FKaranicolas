
var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-10;
var dx=2;
var dy=-2;

var sonidoDestruccion = document.getElementById("destruccion") ;
var sonidoV = document.getElementById("win");
var sonidoP = document.getElementById("lose");


var pelota = {
    radio: 10,
    dibujar: function () {
        ctx.beginPath();
        ctx.arc(x, y, this.radio, 0, 2 * Math.PI);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
};

var barra = {
    ancho: 75,
    alto: 10,
    posX: (canvas.width-75)/2,
    dibujar: function(){
        ctx.beginPath();
        ctx.fillRect(this.posX, 310, this.ancho, this.alto);
        ctx.fillStyle = "#0095DD";
        ctx.fill;
        ctx.closePath;
    }
};

var ladrillo = {
    alto: 20,
    ancho: 75,
};

var puntaje ={
    puntos:0,
    vidas: 3,
    dibujar: function () {
        ctx.font ="16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Puntaje: "+this.puntos, 8, 20);
    },
    dibujarVidas: function (){
        ctx.font ="16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Vidas: "+this.vidas, canvas.width-65, 20);
    }
};

var filas = 3;
var columnas = 5;
var espaciado =10;
var espacioSup = 30;
var espacioIzq = 30;

var matrizLadrillos = [];
for(c=0; c<columnas; c++){
    matrizLadrillos[c]=[];
    for(f=0;f<filas;f++){
        matrizLadrillos[c][f] = {x: 0, y: 0, status: 1};
    }
}
var ladrilloX;
var ladrilloY;

function dibujarLadrillos() {
    for(c=0;c<columnas;c++){
        for(f=0;f<filas;f++){
            if(matrizLadrillos[c][f].status == 1){
                ladrilloX = (c*(ladrillo.ancho+espaciado))+espacioIzq;
                ladrilloY = (f*(ladrillo.alto+espaciado))+espacioSup;
                matrizLadrillos[c][f].x = ladrilloX;
                matrizLadrillos[c][f].y = ladrilloY;
                ctx.beginPath();
                ctx.fillRect(ladrilloX, ladrilloY, ladrillo.ancho, ladrillo.alto);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function detectarColision() {
    for (c = 0; c < columnas; c++) {
        for (f = 0; f < filas; f++) {
            var b=matrizLadrillos[c][f];
            if(b.status == 1) {
                if (x >= b.x && x <= b.x + ladrillo.ancho && y >= b.y && y <= b.y + ladrillo.alto) {
                    dy = -dy;
                    b.status = 0;
                    sonidoDestruccion.destruccion;
                    puntaje.puntos++;

                    if (puntaje.puntos == filas * columnas) {
                        alert("VICTORY!!!");
                        sonidoV.win;
                        document.location.reload();
                    }
                }
            }
        }
    }
}

var derPresionado = false;
var izqPresionado = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode === 39){
        derPresionado = true;
    }else if (e.keyCode ===37){
        izqPresionado = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39){
        derPresionado = false;
    }else if (e.keyCode ===37){
        izqPresionado = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX-canvas.offsetLeft;
    if(relativeX>0+barra.ancho/2 && relativeX<canvas.width-barra.ancho/2){
        barra.posX = relativeX - barra.ancho/2;
    }

}

function dibujar() {
    canvas.width=canvas.width;

    //Rebotar izquierda y derecha
    if(x+dx<pelota.radio || x+dx>canvas.width-pelota.radio ){
        dx=-dx;
    }
    //Rebotar arriba  y abajo
    if(y+dy<pelota.radio){
        dy=-dy;
    }

    if ( y+dy>canvas.height-pelota.radio){
        if(x>barra.posX && x<barra.ancho+barra.posX){
            dy=-dy;
        }else{
            puntaje.vidas--;
            if(puntaje.vidas==0) {
                alert ("GAME OVER LOSER!");
                sonidoP.lose;
                document.location.reload();
            }else{
                x=canvas.width/2;
                y=canvas.height-10;
                barra.posX = (canvas.width-75)/2;
            }
        }
    }

    //Mover derecha o izquierda
    if(derPresionado && barra.posX < canvas.width-barra.ancho){
        barra.posX+=7;
    }else if (izqPresionado && barra.posX>0){
        barra.posX-=7;
    }

    pelota.dibujar();
    barra.dibujar();
    puntaje.dibujar();
    puntaje.dibujarVidas();
    dibujarLadrillos();
    detectarColision();
    x+=dx;
    y+=dy;
}
setInterval(dibujar, 10);