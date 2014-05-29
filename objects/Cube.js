function Cube(type) {
	var maxV = 500,
	velocity = maxV - Math.round(Math.random()*500) + 10,
	diameter = 5,
	x = 0,
	y = Math.random()*(stageHeight-diameter),
	direction = 1,
	color = getRandomColorHex(), uid = generateUID(), animationDuration = 1 + roundDecimal(Math.random()*1,100) + 's', iterations = 0, frame = 0;
	
	switch (type) {
		case "svg":
		case "svgtransforms":
		case "svgcsstransforms":
			var domNode = document.createElementNS(svg_ns, "rect");
			svg.appendChild(domNode);
			domNode.id = uid;
			domNode.setAttribute("x", x);
			domNode.setAttribute("y", y);
			domNode.setAttribute("width", diameter);
			domNode.setAttribute("height", diameter);
			domNode.setAttribute("fill", color);
		break;

		case "svganimations":
			var domNode = document.createElementNS(svg_ns, "rect");
			svg.appendChild(domNode);
			domNode.id = uid;
			domNode.setAttribute("x", x);
			domNode.setAttribute("y", y);
			domNode.setAttribute("width", diameter);
			domNode.setAttribute("height", diameter);
			domNode.setAttribute("fill", color);
			var animationNodeRight = document.createElementNS(svg_ns, "animate");
			animationNodeRight.setAttribute("attributeName","x");
			animationNodeRight.setAttribute("from",0);
			animationNodeRight.setAttribute("to",(stageWidth-diameter));
			animationNodeRight.setAttribute("dur",animationDuration);
			animationNodeRight.setAttribute("fill","freeze");
			animationNodeRight.id = uid +'_right';
			animationNodeRight.setAttribute("begin","0;"+uid +"_left.begin+" +animationDuration);
			domNode.appendChild(animationNodeRight);
			var animationNodeLeft = document.createElementNS(svg_ns, "animate");
			animationNodeLeft.setAttribute("attributeName","x");
			animationNodeLeft.setAttribute("from",(stageWidth-diameter));
			animationNodeLeft.setAttribute("to",0);
			animationNodeLeft.setAttribute("dur",animationDuration);
			animationNodeLeft.setAttribute("fill","freeze");
			animationNodeLeft.id = uid +'_left';
			animationNodeLeft.setAttribute("begin",uid + "_right.begin+"+animationDuration);
			domNode.appendChild(animationNodeLeft);
		break;
		case "html":
		case "htmlposition":
			var domNode = document.createElement('div');
			
			domNode.style.width = diameter + 'px';
			domNode.style.height = diameter + 'px';
			domNode.style.backgroundColor = color;
			domNode.style.top = y + 'px';
			domNode.style.left = x + 'px';
			
			domNode.id = uid;
			stage.appendChild(domNode);
		break;

		case "htmltransition":
			var domNode = document.createElement('div');
			
			domNode.style.width = diameter + 'px';
			domNode.style.height = diameter + 'px';
			domNode.style.backgroundColor = color;
			domNode.style.top = y + 'px';
			domNode.style.left = x + 'px';
			domNode.style['-webkit-transform'] = setTranslate(0,0);
			domNode.style['transform'] = setTranslate(0,0);

			domNode.style[Modernizr.prefixed('transition')] = "all "+animationDuration+ " linear";
			domNode.id = uid;
			domNode.addEventListener('webkitTransitionEnd',switchDirections);
			domNode.addEventListener('transitionend',switchDirections);
			stage.appendChild(domNode);
		break;

		case "htmlanimation":
			var domNode = document.createElement('div');
			domNode.style.width = diameter + 'px';
			domNode.style.height = diameter + 'px';
			domNode.style.backgroundColor = color;
			domNode.style.top = y + 'px';
			domNode.style.left = x + 'px';
			domNode.className = "cube-animation";
			
			domNode.style['-webkit-animation'] = "cube " +animationDuration +" linear 0s infinite alternate";
			domNode.style['animation'] = "cube "+animationDuration +" linear 0s infinite alternate";

			domNode.id = uid;
			stage.appendChild(domNode);
		break;
		case "svgtransition":
			var domNode = document.createElementNS(svg_ns, "rect");
			svg.appendChild(domNode);
			domNode.id = uid;
			domNode.setAttribute("x", x);
			domNode.setAttribute("y", y);
			domNode.setAttribute("width", diameter);
			domNode.setAttribute("height", diameter);
			domNode.setAttribute("fill", color);
			domNode.style['-webkit-transform'] = setTranslate(0,0);
			domNode.style['transform'] = setTranslate(0,0);

			domNode.style[Modernizr.prefixed('transition')] = "all "+animationDuration+ " linear";
			domNode.id = uid;
			domNode.addEventListener('webkitTransitionEnd',switchDirections);
			domNode.addEventListener('transitionend',switchDirections);
			
		break;
		case "webgl":
			var el = new PIXI.Graphics();
			el.lineStyle(0);
			el.beginFill('0x' + color.substr(1,color.length), 1);
			el.drawRect(x,y, diameter,diameter);
			el.cacheAsBitmap = true;
	

			context.addChild(el);
		break;

	}

	function switchDirections() {
		++iterations;
		if (iterations % 2 == 1) {
			domNode.style['-webkit-transform'] = setTranslate(0,0);
			domNode.style['transform'] = setTranslate(0,0);
		}
		else {
			domNode.style['-webkit-transform'] = setTranslate(stageWidth-diameter,0);
			domNode.style['transform'] = setTranslate(stageWidth-diameter,0);
			
		}
	}

	this.draw = function(timeOffset) {
		var nextX = x + direction * velocity * (timeOffset / 1000);
		if (nextX < 0 || nextX > (stageWidth-diameter)) {
			direction =  direction * -1;
			
			
		}

		switch (type) {
			case "canvas":
			case "canvasbuffer":
				context.fillStyle = color;
				context.beginPath();
				context.rect(nextX, y, diameter, diameter);
				context.fill();

			break;
			case "htmlposition":
				domNode.style.left = nextX + 'px';
			break;
			case "svg":
				domNode.setAttribute("x", nextX);
			break;
			case "svgtransforms":
				domNode.setAttribute("transform", "translate("+(nextX) +",0)");
			break;
			case "html":
			case "svgcsstransforms":
				domNode.style['-webkit-transform'] = setTranslate(nextX,0);
				domNode.style['transform'] = setTranslate(nextX,0);
			break;
			case "svgtransition":
				if (frame == 2) {
					domNode.style['-webkit-transform'] = setTranslate(stageWidth-diameter,0);
					domNode.style['transform'] = setTranslate(stageWidth-diameter,0);
				}
				
			break;

			case "htmltransition":
				if (frame == 2) {
					domNode.style['-webkit-transform'] = setTranslate(stageWidth-diameter,0);
					domNode.style['transform'] = setTranslate(stageWidth-diameter,0);
				}
			break;
			case "webgl":
				el.position.x = nextX;
			break;
		}
		++frame;
		x = nextX;
	}
}