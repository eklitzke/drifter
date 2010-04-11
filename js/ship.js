function Ship (width, height, baseHeight) {
	this.width = width;
	this.height = height;
	this.baseHeight = baseHeight;
	this.pos = 0;
	this.velocity = 0;

	this.moveTime = (new Date()).valueOf();
	this.bonus = 0;

	this.draw = function (ctx) {
		var w = this.width / 2;
		var h = this.height / 2;
		ctx.beginPath();
		/*
		// left side
		ctx.moveTo(this.pos - w, this.baseHeight);
		ctx.lineTo(this.pos - w, this.baseHeight + this.height * 0.2);
		ctx.lineTo(this.pos - 2 * w / 3, this.baseHeight + this.height * 0.5);
		ctx.lineTo(this.pos - w, this.baseHeight + this.height * 0.8);
		ctx.lineTo(this.pos - w, this.baseHeight + this.height);

		// top
		ctx.lineTo(this.pos - 2 * w / 3, this.baseHeight + this.height * 0.8);
		ctx.lineTo(this.pos + 2 * w / 3, this.baseHeight + this.height * 0.8);
		ctx.lineTo(this.pos + w, this.baseHeight + this.height);

		// right side
		ctx.lineTo(this.pos + w, this.baseHeight + this.height);
		ctx.lineTo(this.pos + w, this.baseHeight + this.height * 0.8);
		ctx.lineTo(this.pos + 2 * w / 3, this.baseHeight + this.height * 0.5);
		ctx.lineTo(this.pos + w, this.baseHeight + this.height * 0.2);
		ctx.lineTo(this.pos + w, this.baseHeight);

		ctx.fill();
		*/
		ctx.beginPath();
		ctx.moveTo(this.pos - 10, 10);
		ctx.lineTo(this.pos - 10, 35);
		ctx.arc(this.pos - 5, 35, 5, Math.PI, Math.PI / 2, true);
		ctx.lineTo(this.pos + 5, 40);
		ctx.arc(this.pos + 5, 35, 5, Math.PI / 2, 0, true);
		ctx.lineTo(this.pos + 10, 15);
		ctx.arc(this.pos + 5, 10, 5, 0, Math.PI * 1.5, true);
		ctx.lineTo(this.pos - 5, 5);
		ctx.arc(this.pos - 5, 10, 5, Math.PI * 1.5, Math.PI, true);
		ctx.fill();
	};

	this.lhs = function () {
		return this.pos - this.width / 2;
	};
	this.rhs = function () {
		return this.pos + this.width / 2;
	};
	this.accelerate = function (direction) {
		this.moveTime = (new Date()).valueOf();
		this.velocity += direction * (0.30 + Math.random() * 0.10)
	};
	this.move = function () {
		this.pos += this.velocity;
	};
	this.getBonus = function () {
		var now = (new Date()).valueOf();
		if ((now - this.moveTime) / 1000 - this.bonus >= 1) {
			this.bonus++;
			switch (this.bonus) {
			case 1:
				return 1.1;
			case 2:
				return 1.25;
			default:
				return 2;
			}
		}
		return 1;
	}
}
