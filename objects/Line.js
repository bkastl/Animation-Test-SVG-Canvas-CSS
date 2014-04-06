function Line(type, count, i) {
	var maximumHeight = stageHeight /count,
	number = i, x = 0, y = number * maximumHeight,
	color = getRandomColorHex(), uid = generateUID(),
	maxV = 10,
	velocity = Math.round(maxV - Math.random()*maxV + 1), 
	value = Math.round(Math.random()*maximumHeight),
	values = [],
	direction = Math.floor(Math.random()*2) == 1 ? 1 : -1, step = 0, xWidth = stageWidth/testDuration;
	switch (type) {
	
		case "svg":
		case "svgtransforms":
		var domNode = document.createElementNS(svg_ns, "polyline");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("fill", 'transparent');
		domNode.setAttribute('transform','translate(0,'+y+')');
		domNode.setAttribute("stroke",color);
		domNode.setAttribute("strokeWidth",1);
		break;
	
	}
	values.push([step +" "+ value]);
	while (i<stageWidth) {
		generateValue();
		++i;
	}
	function generateValue() {
		var nextValue = value + velocity*direction;
		if (nextValue > maximumHeight || nextValue < 0) {
			direction = -direction;
			velocity = Math.round(maxV - Math.random()*maxV + 1);
			nextValue = value + velocity*direction;
		}
		step +=xWidth;
		values.push([step +" "+ nextValue]);
		value = nextValue;
	}
	this.draw = function() {
		x += xWidth;
		
		values.splice(0,1);
		switch (type) {
         	case 'svg':
        	case 'svgtransforms':
        	domNode.setAttribute("points",values.join(","));
        	domNode.setAttribute('transform','translate('+(-x)+','+y+')');
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
        generateValue();
	}
}