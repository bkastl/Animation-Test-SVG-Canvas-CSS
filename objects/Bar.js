function Bar(type, count, i) {
	var width = stageWidth / count,
	maxHeight = stageHeight,
	color = getRandomColorHex(), uid = generateUID(),
	height = 0,
	maxV = 5,
	velocity = maxV - Math.random()*5 + 1, number = i
	x = number*width,
	y = stageHeight - height,
	startPercentage = 0;
	
	switch (type) {
		case "svg":
		var domNode = document.createElementNS(svg_ns, "rect");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("width",width);
		domNode.setAttribute("height",height);
		domNode.setAttribute("x", x);
		domNode.setAttribute("y", y);
		domNode.setAttribute("fill", color);
		break;
		case "svgtransforms":
		var domNode = document.createElementNS(svg_ns, "rect");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("width",width);
		domNode.setAttribute("height",maxHeight);
		domNode.setAttribute("x", x);
		domNode.setAttribute("fill", color);
		domNode.setAttribute("y", y);
		domNode.setAttribute("transform", "translate(0,"+(y)+") scale(1,"+startPercentage+")");
		break;
		case "svgcsstransforms":
		var domNode = document.createElementNS(svg_ns, "rect");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("width",width);
		domNode.setAttribute("height",maxHeight);
		domNode.setAttribute("x", x);
		domNode.setAttribute("fill", color);
		domNode.setAttribute("y", 0);
		domNode.removeAttribute("transform");
		domNode.style['-webkit-transform-origin-y'] = "100%";
		domNode.style['-moz-transform-origin-y'] = "100%";
		domNode.style['transform-origin-y'] = "100%";
		break;

		case "svganimations":
		var domNode = document.createElementNS(svg_ns, "rect");
		svg.appendChild(domNode);
		domNode.id = uid;
		domNode.setAttribute("width",width);
		domNode.setAttribute("height",height);
		domNode.setAttribute("x", x);
		domNode.setAttribute("y", y);
		domNode.setAttribute("fill", color);
		var animationDuration =(maxHeight/velocity/60) +'s';
		
		var animationNodeHeight = document.createElementNS(svg_ns, "animate");
		animationNodeHeight.setAttribute("attributeName","height");
		animationNodeHeight.setAttribute("from",0);
		animationNodeHeight.setAttribute("to",maxHeight);
		animationNodeHeight.setAttribute("dur",animationDuration);
		animationNodeHeight.setAttribute("repeatCount","indefinite");
		var animationNodeY = document.createElementNS(svg_ns, "animate");
		animationNodeY.setAttribute("attributeName","y");
		animationNodeY.setAttribute("from",maxHeight);
		animationNodeY.setAttribute("to",0);
		animationNodeY.setAttribute("dur",animationDuration);
		animationNodeY.setAttribute("repeatCount","indefinite");
		domNode.appendChild(animationNodeHeight);
		domNode.appendChild(animationNodeY);
		break;
		case "html":
		var domNode = document.createElement('div');
		
		domNode.style.width = width + 'px';
		domNode.style.height = maxHeight + 'px';
		domNode.style.backgroundColor = color;
		domNode.style.top = 0 + 'px';
		domNode.style.left = x + 'px';
		domNode.style['-webkit-transform-origin-y'] = "100%";
		domNode.style['-moz-transform-origin-y'] = "100%";
		domNode.style['transform-origin-y'] = "100%";
		domNode.id = uid;
		stage.appendChild(domNode);
		break;
	}

	 this.draw = function() {
			var nextHeight = height + velocity;
			
			if (nextHeight > maxHeight) {
				nextHeight = 0;
				
			}
			var nextY = stageHeight - nextHeight;
			var nextPercentage = nextHeight/maxHeight;
			switch(type) {

				case "canvas":
				
				context.fillStyle = color;
				context.beginPath();
				context.rect(number*width,nextY,width,nextHeight)
				context.fill();
				break;
				case "svg":
				domNode.setAttribute("height", nextHeight);
				domNode.setAttribute("y", nextY);
				break;
				case "svgtransforms":
				domNode.setAttribute("transform", "translate(0,"+(maxHeight-2*nextHeight)+") scale(1,"+nextPercentage+")");
				break;
				case "html":
				case "svgcsstransforms":
				domNode.style.webkitTransform = 'scaleY('+nextPercentage+')';
				domNode.style.mozTransform = 'scaleY('+nextPercentage+')';
				domNode.style.transform = 'scaleY('+nextPercentage+')';
				break;
				case "svganimations":
					/*Nothing to do */
				break;
			}
			y = nextY;
			height = nextHeight;
			
	}
}