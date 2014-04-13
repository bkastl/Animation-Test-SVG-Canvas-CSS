function Spinner(type, count, i) {
	var maximumSpace = (stageHeight*stageWidth)/count,
	size = Math.floor(Math.sqrt(maximumSpace)/2),
	endColor = getRandomColorRGB(), uid = generateUID(),
	steps = Math.round(Math.random()*15)+5, runnerIndex = 0, offsetIndex = 0,
	durationStep = Math.round(Math.random()*2)+5, currentStep = 0,
	startR = 255, startG = 255, startB = 255, destR = endColor[0], destG = endColor[1], destB = endColor[2];
	
	var elementsPerRow = Math.floor(stageWidth / (size*2));
	var row = Math.floor(i / elementsPerRow);
	var elementInRow = i-(row*elementsPerRow);
	x = elementInRow * size * 2;
	y = row * size * 2;
	
	switch(type) {
		case "canvasmulti":
			var canvas = document.createElement("canvas");
				canvas.id = uid;
				canvas.setAttribute("width", size);
				canvas.setAttribute("height", size);
				stage.appendChild(canvas);
			var ctx = canvas.getContext("2d");
			ctx.translate(size / 2, size / 2);
		break;
		case "svg":

		break;
	}
	
	function paintSpinnerFrame() {
		var fillColR,
	        fillColG,
	        fillColB,
	        rotAngle;
	       var paintIndex = 0;
	       ctx.clearRect( - size / 2, -size / 2, size, size);
	       offsetIndex++;
	       
	       while(paintIndex < steps)
			{

		        ctx.save();
		        fillColR = Math.floor((destR - startR) / steps * paintIndex) + startR;
		        fillColG = Math.floor((destG - startG) / steps * paintIndex) + startG;
		        fillColB = Math.floor((destB - startB) / steps * paintIndex) + startB;

		        ctx.strokeStyle = 'rgb(' + fillColR + ', ' + fillColG + ', ' + fillColB + ')';
		        ctx.lineWidth = Math.floor(size / 8);
		        ctx.lineCap = "round";

		        ctx.beginPath();
		        rotAngle = to_rad(360 / steps * paintIndex) + to_rad(360 / steps * offsetIndex);
		        ctx.rotate(rotAngle);

		        ctx.moveTo(0, -Math.floor(size / 8));
		        ctx.lineTo(0, -Math.floor(size / 3));


		        ctx.stroke();

		        ctx.restore();
		        ++paintIndex;
	        }
	}

	this.draw = function() {
		var rotAngle;


		
		switch (type) {
         	case 'svg':

        	break;

        	case 'canvasmulti':
        	
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