function Particle(type) {
			
var angle = Math.PI * 2 * Math.random(),
maxV = 500,
velocity = maxV - Math.random()*500 + 10,
diameter = Math.random()*10+5,
x = Math.random()*stageWidth,
y = Math.random()*stageHeight,
startX = x, startY = y,
color = getRandomColorHex(), uid = generateUID();


switch (type) {
	case "svg":
	case "svgtransforms":
	case "svgcsstransforms":
	var domNode = document.createElementNS(svg_ns, "circle");
	svg.appendChild(domNode);
	domNode.id = uid;
	domNode.setAttribute("cx", x + diameter);
	domNode.setAttribute("cy", y + diameter);
	domNode.setAttribute("r", diameter);
	domNode.setAttribute("fill", color);
	break;
	case "html":
	
	var domNode = document.createElement('div');
	
	domNode.style.width = diameter*2 + 'px';
	domNode.style.height = diameter*2 + 'px';
	domNode.style.backgroundColor = color;
	domNode.style.top = y + 'px';
	domNode.style.left = x + 'px';
	domNode.style.borderRadius = "50%";
	
	domNode.id = uid;
	stage.appendChild(domNode);
	break;

	case "webgl":
	var el = new PIXI.Graphics();
	el.lineStyle(0);
	el.beginFill('0x' + color.substr(1,color.length), 1);
	el.drawCircle(x-diameter*0.5,y-diameter*0.5, diameter);
	el.cacheAsBitmap = true;
	

	context.addChild(el);
	break;

}

this.draw = function (timeOffset) {
	var nextX = x + Math.cos(angle) * velocity * (timeOffset / 1000),
	nextY = y + Math.sin(angle) * velocity * (timeOffset / 1000);

	switch (true) {
		case (nextX < 0):
			if ((angle > Math.PI / 2 && angle < Math.PI))
			{
				angle = Math.PI - angle;
			}
			
			else if (angle > Math.PI && angle < Math.PI / 2 * 3)
			{
				angle = angle + (Math.PI / 2 * 3 - angle) * 2
			}
		break;

		case (nextY < 0):
			if ((angle > Math.PI && angle < Math.PI * 2))
			{
				angle = angle - (angle - Math.PI) * 2;
			}
		break;

		case (nextX + diameter * 2 > stageWidth):
			
			if ((angle >= 0 && angle < Math.PI / 2))
			{
				angle = Math.PI - angle;
			}
			else if (angle > Math.PI / 2 * 3)
			{
				angle = angle - (angle - Math.PI / 2 * 3) * 2
			}
		break;

		case (nextY + diameter * 2 > stageHeight):
			if ((angle > 0 && angle < Math.PI))
			{
				angle = Math.PI * 2 - angle;
			}
		break;

	}
	switch(type) {

		case "canvas":
		context.fillStyle = color;
		context.beginPath();
		context.arc(nextX, nextY, diameter, 0, Math.PI * 2, true);
		context.fill();
		break;
		case "webgl":
		el.position.x = nextX -diameter;
		el.position.y = nextY -diameter;
		break;
		case "svg":
		domNode.setAttribute("cx", nextX + diameter);
		domNode.setAttribute("cy", nextY + diameter);
		break;

		case "svgtransforms":
		domNode.setAttribute("transform", "translate("+(nextX-startX) +","+(nextY-startY)+")");
		break;
		case "html":
		case "svgcsstransforms":
		var translateX = (nextX-startX);
		var translateY = (nextY-startY);
		domNode.style.webkitTransform = setTranslate(translateX,translateY);
		domNode.style.mozTransform = setTranslate(translateX,translateY);
		domNode.style.transform = setTranslate(translateX,translateY);
		break;

		case "svgrebuild":

		domNode = document.createElementNS(svg_ns, "circle");
		
		svg.appendChild(domNode);
		
		domNode.setAttribute("cx", nextX + diameter);
		domNode.setAttribute("cy", nextY + diameter);
		domNode.setAttribute("r", diameter);
		domNode.setAttribute("fill", color);
		break;
	}

	x = nextX;
	y = nextY;
} 
}