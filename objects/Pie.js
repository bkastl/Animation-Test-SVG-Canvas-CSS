function Pie(type, count, i) {
	var maximumSpace = (stageHeight*stageWidth)/count,
	radius = Math.floor(Math.sqrt(maximumSpace)/2),
	number = i, x, y,
	color = getRandomColorHex(), uid = generateUID(),
	maxV = 10,
	angle = 0, pi = Math.PI,
	velocity = maxV - Math.random()*maxV + 1, 
	startRadians = -pi/2, divison = angle/360,
	direction = Math.floor(Math.random()*2) == 1 ? 1 : -1;
	
	velocity = velocity * direction;

	var elementsPerRow = Math.floor(stageWidth / (radius*2));
	var row = Math.floor(i / elementsPerRow);
	var elementInRow = i-(row*elementsPerRow);
	x = elementInRow * radius * 2;
	y = row * radius * 2;
	
			
	switch (type) {
		case "svg":
		case "svgtransforms":
		var domNode = document.createElementNS(svg_ns, "path");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("fill", color);
		domNode.setAttribute('transform','translate('+x+','+y+')');
		break;
	}

	this.draw = function() {
		divison = angle / 360;
		nextAngle = angle + velocity;
		if (nextAngle > 360) {
			nextAngle = 0;
		}
		if (angle < 0) {
			nextAngle = 360;
		}
		var divisonToRadians = divison * pi * 2,
		otherHalf = startRadians + divisonToRadians,
		x1 = radius * Math.cos(startRadians) + radius,
		y1 = radius * Math.sin(startRadians) + radius,
		x2 = radius * Math.cos(otherHalf) + radius,
		y2 = radius * Math.sin(otherHalf) + radius,
		d = [
            "M", radius, radius,
            "L", x1, y1,
            "A", radius, radius, 0, divisonToRadians > pi ? 1 : 0, 1, x2, y2,
            "Z"
          ];
         switch (type) {
         	case 'svg':
        	case 'svgtransforms':
        	domNode.setAttribute('d',d.join(" "));
        	break;

        	case "canvas":
        	context.beginPath();
        	context.moveTo(x+radius, y+radius);
        	context.arc(x+radius, y+radius, radius, 0, divisonToRadians, false);
        	context.closePath();
        	context.fillStyle = color;
        	context.fill();
			break;
        }
        angle = nextAngle;
		 
	}
}