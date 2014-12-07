function Particle(type) {
			
var angle = Math.PI * 2 * Math.random(),
maxV = 500,
velocity = maxV - Math.random()*500 + 10,
diameter = roundDecimal(Math.random()*10+5,10),
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
	case "svghtmlwrap":
	var domNode = document.createElement('div');
	domNode.style.top = y + 'px';
	domNode.style.left = x + 'px';
	domNode.id = uid;
	stage.appendChild(domNode);
	diameter = Math.round(diameter);
	var outerSVGnode = document.createElementNS(svg_ns, "svg");
	outerSVGnode.setAttribute('width',Math.ceil(diameter*2));
	outerSVGnode.setAttribute('height',Math.ceil(diameter*2));
	domNode.appendChild(outerSVGnode);
	var innerSVGnode = document.createElementNS(svg_ns, "circle");
	innerSVGnode.setAttribute("r", diameter);
	innerSVGnode.setAttribute("cx", diameter);
	innerSVGnode.setAttribute("cy", diameter);
	innerSVGnode.setAttribute("fill", color);
	outerSVGnode.appendChild(innerSVGnode);
	break;
	case "html":
	case "htmlposition":
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
	var translateX = (nextX-startX);
	var translateY = (nextY-startY);
	switch(type) {

		case "canvas":
		case "canvasbuffer":
		context.fillStyle = color;
		context.beginPath();
		context.arc(nextX, nextY, diameter, 0, Math.PI * 2, true);
		context.fill();
		break;
		case "webgl":
		el.position.x = nextX - (diameter*0.5);
		el.position.y = nextY - (diameter*0.5);
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
		case "svghtmlwrap":
		
		domNode.style['-webkit-transform'] = setTranslate(translateX,translateY);
		domNode.style['transform'] = setTranslate(translateX,translateY);
		break;

		case "htmlposition":
		domNode.style.top = nextY + 'px';
		domNode.style.left = nextX + 'px';
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