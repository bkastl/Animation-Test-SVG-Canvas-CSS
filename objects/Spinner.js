function Spinner(type, count, i) {
	var maximumSpace = Math.floor((stageHeight*stageWidth)/count),
	size = Math.floor(Math.sqrt(maximumSpace)),
	endColor = getRandomColorRGB(), uid = generateUID(),
	steps = Math.round(Math.random()*15)+5, runnerIndex = 0, offsetIndex = 0,
	durationStep = Math.round(Math.random()*2)+5, currentStep = 0,
	startR = 250, startG = 250, startB = 250, destR = endColor[0], destG = endColor[1], destB = endColor[2];
	
	var elementsPerRow = Math.floor(stageWidth / (size));
	var row = Math.floor(i / elementsPerRow);
	var elementInRow = Math.floor(i-(row*elementsPerRow));
	x = elementInRow * size;
	y = row * size;
	
	var animationDuration = durationStep*steps /60 + 's';
	

	switch(type) {
		case "canvas":
			var canvas = document.createElement("canvas");
				canvas.id = uid;
				canvas.setAttribute("width", size);
				canvas.setAttribute("height", size);
				stage.appendChild(canvas);
			var ctx = canvas.getContext("2d");
			ctx.translate(size / 2, size / 2);
		break;
		case "svg":
		case "svgtransforms":
		case "svganimations":
		case "htmlanimation":
			var svg = document.createElementNS(svg_ns, "svg");
			svg.id = uid;
			svg.setAttribute("width", size);
			svg.setAttribute("height", size);
			stage.appendChild(svg);
			var svgGroup = document.createElementNS(svg_ns, "g");
			svg.appendChild(svgGroup);
			paintSpinnerFrame();
		break;


	}
	
	if (type === "svganimations") {
		paintSpinnerFrame();
		var animationNodeR = document.createElementNS(svg_ns, "animateTransform");
		animationNodeR.setAttribute("attributeName","transform");
		animationNodeR.setAttribute('type',"rotate");
		animationNodeR.setAttribute('attributeType','xml');
		animationNodeR.setAttribute("from","0 "+(size/2)+" "+(size/2));
		animationNodeR.setAttribute("to","360 "+(size/2)+" "+(size/2));
		animationNodeR.setAttribute("dur",animationDuration);
		animationNodeR.setAttribute("repeatCount","indefinite");
		svgGroup.appendChild(animationNodeR);
		
	}

	else if (type === "htmlanimation") {
		svgGroup.style['-webkit-transform-origin'] = "50% 50%";
		svgGroup.style['-moz-transform-origin'] = "50% 50%";
		svgGroup.style.transformOrigin = (size/2)+'px ' + (size/2)+'px';
		svgGroup.style['-webkit-animation'] = "rotate " +animationDuration +" linear 0s infinite normal";
		svgGroup.style['animation'] = "rotate "+animationDuration +" linear 0s infinite normal";
	}


	function paintSpinnerFrame() {
		var fillColR,
	        fillColG,
	        fillColB,
	        rotAnglePaint;
	       var paintIndex = 0;
	      
	       if (type === "canvas") {
	       		ctx.clearRect( - size / 2, -size / 2, size, size);
	   		}
	       offsetIndex++;
	       
	       while(paintIndex < steps)
			{
				fillColR = Math.floor((destR - startR) / steps * paintIndex) + startR;
		        fillColG = Math.floor((destG - startG) / steps * paintIndex) + startG;
		        fillColB = Math.floor((destB - startB) / steps * paintIndex) + startB;
				switch (type) {
					case "svg":
					case "svgtransforms":
					case "svganimations":
					case "svgtransitions":
					case "htmlanimation":
					var domNode = document.createElementNS(svg_ns, "line");
					svgGroup.appendChild(domNode);
					domNode.setAttribute("stroke", 'rgb('+fillColR+','+fillColG+','+fillColB+')');
					domNode.setAttribute("stroke-width", Math.floor(size / 8));
					domNode.setAttribute("stroke-linecap","round");
					domNode.setAttribute('x1',Math.floor(size / 3));
					domNode.setAttribute('y1',size / 2);
					domNode.setAttribute('x2',Math.floor(size / 8));
					domNode.setAttribute('y2',size / 2);
					domNode.setAttribute('transform','rotate('+(360 / steps * paintIndex)+', '+(size/2)+', '+(size/2)+')');
					break;
					case "canvas":
					ctx.save();
		        

			        ctx.strokeStyle = 'rgb(' + fillColR + ', ' + fillColG + ', ' + fillColB + ')';
			        ctx.lineWidth = Math.floor(size / 8);
			        ctx.lineCap = "round";

			        ctx.beginPath();
			        rotAnglePaint = to_rad(360 / steps * paintIndex) + to_rad(360 / steps * offsetIndex);
			        ctx.rotate(rotAnglePaint);

			        ctx.moveTo(0, -Math.floor(size / 8));
			        ctx.lineTo(0, -Math.floor(size / 3));


			        ctx.stroke();

			        ctx.restore();
					break;
				}

		        ++paintIndex;
	        }
	}

	this.draw = function() {
		var rotAngle = (360 / steps * runnerIndex);

		
		switch (type) {
			case 'svg':
         	case 'svgtransforms':
         	if (currentStep === durationStep) {
        		currentStep = 0;
        		svgGroup.setAttribute('transform','rotate('+rotAngle+','+(size/2)+','+(size/2)+')');
        		++runnerIndex;
        	}
        	else {
        		++currentStep;
        	}
        	

         	break;
        	case 'canvas':
        	
        	
        	if (currentStep === durationStep) {
        		currentStep = 0;
        		paintSpinnerFrame();
        	}
        	else {
        		++currentStep;
        	}
        	
	        
			break;
        }


	}
}