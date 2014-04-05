function Stage(stage, statistics) {
	var self = this,
	tick = null, 
	previousTimeStamp = null, framesPainted = 0, stageElements = [];
	this.prepareStage = function (type) {
		framesPainted = 0;
		currentType = type;
		
		switch(type) {
			case "canvas":
				var canvas = document.createElement("canvas");
				canvas.id = "canvas";
				canvas.setAttribute("width", stageWidth);
				canvas.setAttribute("height", stageHeight);
				stage.appendChild(canvas);
				context = canvas.getContext("2d");
			break;
			case "svg":
			case "svgtransforms":
			case "svgcsstransforms":
			case "svganimations":
			case "svgrebuild":
				svg = document.createElementNS(svg_ns, "svg");
				svg.id = "svgcontainer";
				svg.setAttribute("width", stageWidth);
				svg.setAttribute("height", stageHeight);
				stage.appendChild(svg);
				
			break;
			case "html":
			case "htmlposition":
				stage.style.width = stageWidth + 'px';
				stage.style.height = stageHeight + 'px';
			break;
			case "webgl":

				context = new PIXI.Stage(0xFFFFFF, true);
				
				webglRenderer = PIXI.autoDetectRenderer(stageWidth, stageHeight, null, true);
				webglRenderer.view.style.display = "block";
				
				stage.appendChild(webglRenderer.view);
			break;
		}

		this.buildStage();
		
		
	},

	this.buildStage = function() {
		
		for (var i = 0; i < testSequence[currentTest].maxObjects; i++)
		{	
			switch(testSequence[currentTest].object) {
				case 'Particle':
					stageElements.push(new Particle(currentType));
				break;
				case 'Bar':
					stageElements.push(new Bar(currentType,testSequence[currentTest].maxObjects,i));
				break;
				case 'Pie':
					stageElements.push(new Pie(currentType,testSequence[currentTest].maxObjects,i));
				break;
			}
			
		}
		
		
		statistics.startTest();

		this.animateStage();
		
		
	},

	this.animateStage = function() {

		tick = requestAnimationFrame(self.animateStage);
		var frameStartTimeStamp = setTimestamp();
		var currentTime = +new Date;

		var timeOffset = currentTime - previousTimeStamp;

		if (previousTimeStamp === null)
		{
			timeOffset = 0;
		}
		
		switch(currentType) {
			case 'canvas':
				context.clearRect(0, 0, stageWidth, stageHeight);
			break;
			case 'svgrebuild':
				while (svg.hasChildNodes()) {
					svg.removeChild(svg.lastChild);
				}
			break;
			case 'webgl':
				webglRenderer.render(context);
			
			break;
			
		}
		for (var stageElement in stageElements)
		{
			stageElements[stageElement].draw(timeOffset);
		}

		
		var paintTime = setTimestamp() - frameStartTimeStamp;
		
		
		++framesPainted;
		statistics.update(paintTime, previousTimeStamp);

		previousTimeStamp = currentTime;
		if (framesPainted > (testDuration -1)) {
			self.endAnimationTest();
		}
	},

	this.endAnimationTest= function() {
			cancelAnimationFrame(tick);
			tick = null;
			clearStage();
			statistics.endTest();
			++currentTest;
			if (currentTest < testSequence.length) {
				self.prepareStage(testSequence[currentTest].type);
			}
			else {
				statistics.send();
			}
	}

	function clearStage() {
		while (stage.hasChildNodes()) {
			stage.removeChild(stage.lastChild);
		}
		framesPainted = 0, context = null, svg = null, previousTimeStamp = null, stageElements = [], webglRenderer = null;
	}

}