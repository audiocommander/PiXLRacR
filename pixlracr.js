/*	
	pixlracr
	Revealing Module Pattern
	(cc)2011 Michael Markert, audiocommander.de
*/


var pixl = function () {
	
	// this is all private stuff
	
	var pixl = document.getElementById("pixl");
	var sound = document.getElementById("sound");
	var spansize = document.getElementById("size");
	var spanspeed = document.getElementById("speed");
	var spanmoving = document.getElementById("moving");
	
	var x = 250;
	var y = 250;
	var size = 4;
	var speed = 4;
	var directionY = false;
	var directionX = false;
	
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
		pixl.style.width = size;
		pixl.style.height = size;
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
		if(directionY == "up") {
			y = y - speed;
			if(y < 0) { 
				y = window.innerHeight; 
			} else if(y > window.innerHeight) {
				y = 0;
			}
			pixl.style.top = y;
		} else if(directionY == "down") {
			y = y + speed;
			if(y < 0) { 
				y = window.innerHeight-size;
			} else if(y > window.innerHeight-size) {
				y = 0;
			}
			pixl.style.top = y;
		}
		// move left or right
		if(directionX == "left") {
			x = x - speed;
			if(x < 0) {
				x = window.innerWidth;
			} else if(x > window.innerWidth) {
				x = 0;
			}
			pixl.style.left = x;
		} else if (directionX == "right") {
			x = x + speed;
			if(x < 0) {
				x = window.innerWidth-size;
			} else if(x > window.innerWidth-size) {
				x = 0;
			}
			pixl.style.left = x;
		}
		// update show if moving
		if(directionX || directionY) {
			spanmoving.textContent = 1;
			sound.volume = 0.75;
		} else {
			spanmoving.textContent = 0;
			sound.volume = 0.1;
		}
	}
	
	function moveUp(isKeyDownEvent) {
		(isKeyDownEvent ? directionY = "up" : directionY = false);
		//if(directionY) { move(); }
	}
	function moveDown(isKeyDownEvent) {
		(isKeyDownEvent ? directionY = "down" : directionY = false);
		//if(directionY) { move(); }
	}
	function moveLeft(isKeyDownEvent) {
		(isKeyDownEvent ? directionX = "left" : directionX = false);
		//if(directionX) { move(); }
	}
	function moveRight(isKeyDownEvent) {
		(isKeyDownEvent ? directionX = "right" : directionX = false);
		//if(directionX) { move(); }
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
		up:moveUp,
		down:moveDown,
		left:moveLeft,
		right:moveRight
	}

}



var p;
	
window.onload = function() {
	// create one pixl
	p = new pixl();
	// add keyEvent
	window.onkeydown = function(e) {
		//console.log("KeyDown: " + e);
		switch (e.keyCode) {
//			case 32: // SPACE
			case 37: // LEFT
				p.left(true);
				break;
			case 38: // UP
				p.up(true);
				break;
			case 39: // RIGHT
				p.right(true);
				break;
			case 40: // DOWN
				p.down(true);
				break;
				
			case 187:	// +
				p.increaseSize();
				break;
			case 189:	// -
				p.decreaseSize();
				break;
			case 190:	// .
				p.increaseSpeed();
				break;
			case 188:	// ,
				p.decreaseSpeed();
				break;
		};
		// suppress default key behaviour
		e.preventDefault();
	};
	window.onkeyup = function(e) {
		switch (e.keyCode) {
			case 37: // LEFT
				p.left(false);
				break;
			case 38: // UP
				p.up(false);
				break;
			case 39: // RIGHT
				p.right(false);
				break;
			case 40: // DOWN
				p.down(false);
				break;
		}
		// suppress default key behaviour
		e.preventDefault();
	};
	
	// setup animation by creating a timer
	var timer = setInterval( function() {
		p.move();
	}, 100);
	
	// set the focus on the window to receive all key events
	window.focus();
}
	