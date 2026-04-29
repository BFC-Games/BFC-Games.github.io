const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.6,
    vy:(Math.random()-0.5)*0.6
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.fillStyle="#00ff99";
    ctx.fillRect(p.x,p.y,2,2);

    particles.forEach(p2=>{
      let dx=p.x-p2.x;
      let dy=p.y-p2.y;
      let dist=Math.sqrt(dx*dx+dy*dy);

      if(dist<100){
        ctx.strokeStyle="rgba(0,255,153,0.1)";
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(draw);
}
draw();
