/*	
	pixlracr
	Revealing Module Pattern
	(cc)2011 Michael Markert, audiocommander.de
*/


var pixl = function () {
	
	// this is all private stuff
	
	var pixl = document.querySelector("#pixl");
	var sound = document.querySelector("#sound");
	var spansize = document.querySelector("#size");
	var spanspeed = document.querySelector("#speed");
	var spanmoving = document.querySelector("#moving");
	
	var x = 250;
	var y = 250;
	var size = 4;
	var speed = 20;
	var goLeft = false;
	var goRight = false;
	var goUp = false;
	var goDown = false;
	
	// init
	setSize(4);
	setSpeed(10);
	x = pixl.offsetLeft;
	y = pixl.offsetTop;
	
	function getPixl() {
		return pixl;
	}
	
	function getSize() {
		return size;
	}
	
	function applySize() {
		pixl.style.width = size + "px";
		pixl.style.height = size + "px";
		spansize.textContent = size;
	}
	function setSize(newSize) {
		if(newSize > 0) {
			size = newSize;
			applySize();
		}
	}
	function increaseSize() {
		size++;
		applySize();
	}
	function decreaseSize() {
		size--;
		if(size < 1) { size = 1; }
		applySize();
	}
	
	function setSpeed(newSpeed) {
		if(newSpeed > 0) {
			speed = newSpeed;
			spanspeed.textContent = speed;
		}
	}
	function increaseSpeed() {
		if(speed < 100) { setSpeed(speed+1); }
	}
	function decreaseSpeed() {
		var newSpeed = speed-1;
		if(newSpeed < 1) { newSpeed = 1; }
		setSpeed(newSpeed);
	}
	
	function move() {
		// move up or down
		if(goUp) {
			y = y - speed;
			if(y < (0-size)) { 
				y = window.innerHeight; 
			}
		} else if(goDown) {
			y = y + speed;
			if(y > window.innerHeight) {
				y = 0;
			}
		}
		// move left or right
		if(goLeft) {
			x = x - speed;
			if(x < (0-size)) {
				x = window.innerWidth;
			}
		} else if(goRight) {
			x = x + speed;
			if(x > window.innerWidth) {
				x = 0;
			}
		}
		// move the pixl
		// Note: Mobile Safari is quite picky about the "px"
		if(goUp || goDown) {
			pixl.style.top = y + "px";
		}
		if(goLeft || goRight) {
			pixl.style.left = x + "px";
		}
		// update show if moving
		if(goLeft || goRight || goUp || goDown) {
			spanmoving.textContent = 1;
			sound.volume = 0.75;
		} else {
			spanmoving.textContent = 0;
			sound.volume = 0.1;
		}
	}
	
	function moveUp(eventBegins) {
		(eventBegins ? goUp = true : goUp = false);
		//if(directionY) { move(); }
	}
	function moveDown(eventBegins) {
		(eventBegins ? goDown = true : goDown = false);
		//if(directionY) { move(); }
	}
	function moveLeft(eventBegins) {
		(eventBegins ? goLeft = true : goLeft = false);
		//if(directionX) { move(); }
	}
	function moveRight(eventBegins) {
		(eventBegins ? goRight = true : goRight = false);
		//if(directionX) { move(); }
	}
	function isMovingInDirection() {
		return "moving " + (goUp?"up ":"") + (goDown?"down ":"") + (goLeft?"left ":"") + (goRight?"right ":"");
	}
	function stop() {
		goUp = false;
		goDown = false;
		goLeft = false;
		goRight = false;
	}
	
	// publicly exposed functions
	return {
		pixl:getPixl,
		size:getSize,
		setSize:setSize,
		increaseSize:increaseSize,
		decreaseSize:decreaseSize,
		setSpeed:setSpeed,
		increaseSpeed:increaseSpeed,
		decreaseSpeed:decreaseSpeed,
		move:move,
		isMoving:isMovingInDirection,
		up:moveUp,
		down:moveDown,
		left:moveLeft,
		right:moveRight,
		stop:stop
	}

}
