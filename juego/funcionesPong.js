
var canvas = document.getElementById("pongCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-10;
var dx=2;
var dy=-2;

var pelota = {
    radio: 10,
    dibujar: function () {
        ctx.beginPath();
        ctx.arc(x, y, this.radio, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
};

pelota.dibujar;

function dibujar() {
    canvas.width=canvas.width;

    //Rebotar izquierda y derecha
    if(x+dx<pelota.radio || x+dx>canvas.width-pelota.radio ){
        dx=-dx;
    }
    //Rebotar arriba y abajp
    if(y+dy<pelota.radio|| y+dy>canvas.height-pelota.radio){
        dy=-dy;
    }
    pelota.dibujar();

    x+=dx;
    y+=dy;
}
setInterval(dibujar, 10);
