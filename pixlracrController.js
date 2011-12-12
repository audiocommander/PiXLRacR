/* Controller with Input Controls */
/* Creates window.onload and attaches all functions */


var p;
var debug = true;

window.onload = function() {
	// debug
	var log = document.querySelector('#debug p');
	if(debug) {
		document.querySelector('#debug').style.display = 'block';
	}
	// create one pixl
	p = new pixl();
	
	// +++++ KEYBOARD CONTROL +++++
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
	
	
	// +++++ MOUSE CONTROL +++++
	var mouseX = 0;
	var mouseY = 0;
	window.onmousedown = function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
	window.onmousemove = function(e) {
//		log.textContent = "Mouse move x:" + e.clientX + ", y:" + e.clientY;
		// delete all previous directions
		p.stop();
		// now get the new direction
		if(mouseX > e.clientX) {
			p.left(true);
		} else if(mouseX < e.clientX) {
			p.right(true);
		}
		if(mouseY > e.clientY) {
			p.up(true);
		} else if(mouseY < e.clientY) {
			p.down(true);
		}
		mouseX = e.clientX;
		mouseY = e.clientY;
		log.textContent = "Mouse " + p.isMoving();
	};

	window.onmouseup = function(e) {
//		log.textContent = "Touch End";
		p.stop();
	}
	
	window.onscroll = function(e) {
		// Not really well supported in Safari
		log.textContent = "Scrolling...";
	}
		
	
	
	// +++++ TOUCH CONTROL +++++
	var touchX = 0;
	var touchY = 0;
	var touchThreshold = 0;		// min px diff to change direction
	window.ontouchstart = function(e) {
//		log.textContent = "Touch Start";
		if(e.targetTouches.length) {
			var touch = e.targetTouches[0];
			touchX = touch.pageX;
			touchY = touch.pageY;
		}
	}
	window.ontouchmove = function(e) {
		if(e.targetTouches.length) {
			var touch = e.targetTouches[0];
			// delete all previous directions
			p.stop();
			// now get the new direction
			if(touchX > (touch.pageX + touchThreshold)) {
				p.left(true);
			} else if(touchX < (touch.pageX - touchThreshold)) {
				p.right(true);
			}
			if(touchY > (touch.pageY + touchThreshold)) {
				p.up(true);
			} else if(touchY < (touch.pageY - touchThreshold)) {
				p.down(true);
			}
			touchX = touch.pageX;
			touchY = touch.pageY;
		}
		log.textContent = "Touch " + p.isMoving();
		e.preventDefault();
	};

	window.ontouchend = function(e) {
//		log.textContent = "Touch End";
		p.stop();
	}
	
//	window.ongesturestart = function(e) {
	window.ongesturechange = function(e) {
//		log.textContent = "Gesture: e.scale = " + e.scale + " e.rotation = " + e.rotation;
		// pinch to set size
		if(e.scale != 1.0) {
			if(e.scale < 1.0) {
				p.decreaseSize();
			} else {
				p.increaseSize();
			}
		}
		/*// rotate to set speed
		if(e.rotation < 0) {
			p.increaseSpeed();
		} else {
			p.decreaseSpeed();
		}*/
	}

	
	
	// +++++ TILT CONTROL +++++
	window.onorientationchange = function(e) {
		var orientation;
		switch(window.orientation) {
	    	case 0:
	        	orientation += "Portrait";
		        break;
			case -90:
				orientation += "Landscape (right, screen turned clockwise)";
				break;
			case 90:
				orientation += "Landscape (left, screen turned counterclockwise)";
				break;
			case 180:
				orientation += "Portrait (upside-down portrait)";
				break;
		}
		log.textContent = "New orientation: " + orientation;
	}
	
	
	// +++++ ANIMATION +++++
	
	// setup animation by creating a timer
	var timer = setInterval( function() {
		p.move();
//		log.textContent += ".";
//		log.textContent = ( "x: "+document.querySelector('#pixl').style.left);
//		log.textContent+= (" y: "+document.querySelector('#pixl').style.top);		
	}, 100);
	
	// set the focus on the window to receive all key events
	window.focus();
}

