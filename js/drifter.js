var Drifter = {keepGoing: false};
var ctx;

function init () {
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		Drifter.width = canvas.width;
		Drifter.height = canvas.height;
		Drifter.walls = {};
		Drifter.walls.left = [
			{x: -100, y: 0},
			{x: -70, y: 400},
			{x: -70, y: 700}
		];
		Drifter.walls.right = [
			{x: 100, y: 0},
			{x: 70, y: 400},
			{x: 70, y: 700}
		];

		Drifter.pos = 0;
		Drifter.velocity = 0;
		Drifter.score = 0;

		document.onkeydown = function (e) {
			// add a random component, to make arrow presses asymmetric
			if (Drifter.keepGoing) {
				var velocity = 0.15 + Math.random() * 0.01;
				if (e.which == 37) {
					Drifter.velocity -= velocity;
				} else if (e.which == 39) {
					Drifter.velocity += velocity;
				}
			}
		}

		ctx = canvas.getContext("2d");
		ctx.lineJoin = 'round';
		ctx.lineWidth = 2;
		ctx.fillStyle = "rgb(57, 55, 80)";
		ctx.strokeStyle = "rgb(244, 251, 64)";

		// make the button visible that starts the game
		document.getElementById("toggleGame").style.visibility = "visible";
		tick();
	}
}

// Set the inner text of a DOM element
function setInnerText(element, text) {
	if ('innerText' in element)
		element.innerText = text;
	else if ('textContent' in element)
		element.textContent = text;
	else
		throw "i give up";
}


function toggleGame() {
	var b = document.getElementById("toggleGame");
	if (Drifter.keepGoing) {
		Drifter.keepGoing = false;
		setInnerText(b, "start");
	} else {
		Drifter.keepGoing = true;
		setInnerText(b, "stop");
		tick();
	}
}

function renderWall (wall, delta) {
	var i, p;
	p = wall[0];
	ctx.beginPath();
	ctx.moveTo(p.x, p.y);
	ctx.strokeStyle = "rgb(244, 251, 64)";
	for (i = 1; i < wall.length; i++) {
		p = wall[i];
		ctx.lineTo(p.x, p.y);
	}
	ctx.stroke();
	shiftWall(wall, delta);
}

/* Shift a wall down, possibly adding/removing segments */
function shiftWall (wall, delta) {
	var i, p, negCount = 0;
	delta = delta | 5;
	for (i = 0; i < wall.length; i++) {
		p = wall[i];
		p.y -= delta;
		if (p.y < 0)
			negCount++;
	}
	if (negCount >= 2)
		wall.splice(0, negCount - 1);
	if (p.y <= Drifter.height) {
		var bias;
		if (Math.random () < 0.5) {
			bias = 1;
		} else {
			bias = -1;
		}
		var newPoint = {};
		newPoint.x = p.x + bias * 10 * Math.random();
		newPoint.y = p.y + 50 + 100 * Math.random();
		wall.push(newPoint);
	}
}

function drawShip () {
	ctx.beginPath();
	ctx.moveTo(Drifter.pos - 10, 10);
	ctx.lineTo(Drifter.pos - 10, 35);
	ctx.arc(Drifter.pos - 5, 35, 5, Math.PI, Math.PI / 2, true);
	ctx.lineTo(Drifter.pos + 5, 40);
	ctx.arc(Drifter.pos + 5, 35, 5, Math.PI / 2, 0, true);
	ctx.lineTo(Drifter.pos + 10, 15);
	ctx.arc(Drifter.pos + 5, 10, 5, 0, Math.PI * 1.5, true);
	ctx.lineTo(Drifter.pos - 5, 5);
	ctx.arc(Drifter.pos - 5, 10, 5, Math.PI * 1.5, Math.PI, true);
	ctx.fill();
}

function tick () {
	var px, py;

	ctx.fillStyle = "rgb(57, 55, 80)";
	ctx.strokeStyle = "rgb(244, 251, 64)";

	ctx.clearRect(0, 0, Drifter.width, Drifter.height);
	ctx.fillRect(0, 0, Drifter.width, Drifter.height);

	ctx.save();
	ctx.setTransform(1, 0, 0, -1, Drifter.width / 2, Drifter.height, false);

	ctx.fillStyle = "rgb(244, 251, 64)";
	drawShip();
	renderWall(Drifter.walls.left);
	renderWall(Drifter.walls.right);


	if (Drifter.keepGoing) {
		/* Update the position */
		Drifter.pos += Drifter.velocity;
		window.setTimeout('tick()', 10);
	}
	ctx.restore();
	Drifter.score += 10;

	ctx.font = "12pt sans";
	ctx.fillStyle = "rgb(244, 251, 64)";
	ctx.fillText(Drifter.score, Drifter.width * 0.85, 20);
}
