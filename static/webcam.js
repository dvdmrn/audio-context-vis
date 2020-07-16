
var startTime = new Date().getTime()
var speed = 0.02;
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
canvas.width  = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = "screen";



class floatyIcon {
	constructor(src){
		this.img = new Image();
		this.img.src = src;
		this.img.classList.add("particle")
		this.dt = 0.5; 
	}

	update(){

	    let t = new Date().getTime()
	    let yPos = Math.sin(t * 0.005)*20 
	    ctx.drawImage(this.img,(t-startTime)*speed,yPos + 40);
	}
}


class Circle{
	constructor(x,y,dx,dy,rad,color){
	    this.x = x;
	    this.y = y;
	    this.dx = dx;
	    this.dy = dy;
	    this.rad = rad;
	    var minRad = rad;
	    var maxRad = (rad * 2);
	    this.color = color;

	}
    // Draw circle function
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    
    // Update circle position for animation
    
    update() {
        
        // Move circle to top once it reaches bottom
        
        if(this.y + this.rad > canvas.width) {
            this.y = 0;
        }
        
        // Increment position (x,y)
        
        this.x += this.dx;
        this.y += this.dy;
        
        // Draw Circle
        
        this.draw();
        
    };
}



let singleIcon = new floatyIcon("test.png")

circles = []

for(var i = 0; i < 100; i++) {
    var rad = (Math.floor(Math.random() * 4)) + 1;
    var x = canvas.width/2
    var y = canvas.height/2
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var color = "#ffe7f8";
    circles.push(new Circle(x,y,dx,dy,rad,color));
}







function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    singleIcon.update()

    for(var i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    setTimeout(requestAnimationFrame(draw), 1000/video.frameRate);
}


navigator.mediaDevices.getUserMedia({
    video: {
      width:     640,
      height:    480,
      frameRate: 30
    }
  }
).then(function(stream) {


  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };


  video.addEventListener('play', function() {
  	startTime = new Date().getTime()

  	draw()
	}, false);

}).catch(function(err) {
  alert("error: ",err)

});


  // //javascript


  // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // // video 'play' event listener
  // video.addEventListener('play', function() {
  //   ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  // }, false);)

