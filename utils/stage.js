function Stage(stage, statistics) {
	var self = this,
	tick = null, 
	previousTimeStamp = null, framesPainted = 0, stageElements = [], individualObjects = false, buffer = undefined, displayContext = undefined;

	this.prepareStage = function (type, offscreen, createIndividualElements) {
		framesPainted = 0;
		currentType = type;
		
		if (createIndividualElements != undefined) {
			individualObjects = createIndividualElements;
		}
		else {
			individualObjects = false;
		}
		if (!individualObjects) {
		switch(type) {
			case "canvas":
			case "canvassvg":
			case "canvasbuffer":
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
			case "svgtransition":
				svg = document.createElementNS(svg_ns, "svg");
				svg.id = "svgcontainer";
				svg.setAttribute("width", stageWidth);
				svg.setAttribute("height", stageHeight);
				stage.appendChild(svg);
				
			break;
			case "html":
			case "htmlposition":
			case "htmltransition":
			case "htmlanimation":
			case "htmlanimationsvg":
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
		}
		if (offscreen) {
			stage.style.visibility = "hidden";
		}
		else {
			stage.style.visibility = "visible";
		}

		if (type === "canvasbuffer") {
				buffer = document.createElement("canvas");
				buffer.id = "canvasbuffer";
				buffer.setAttribute("width", stageWidth);
				buffer.setAttribute("height", stageHeight);
				context = buffer.getContext("2d");
				displayContext = canvas.getContext("2d");
		}

		if (testSequence[currentTest].imageAsset != undefined) {
			imageAsset = new Image();
			imageAsset.src = testSequence[currentTest].imageAsset;
		}

		this.buildStage();
		
		
	},

	this.buildStage = function() {
		if (testSequence[currentTest].skip == true) {
			statistics.startTest();
			self.endAnimationTest();
			return false;
		}
		
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
				case 'Line':
					stageElements.push(new Line(currentType,testSequence[currentTest].maxObjects,i));
				break;
				case 'Spinner':
					stageElements.push(new Spinner(currentType,testSequence[currentTest].maxObjects,i));
				break;
				case 'Sprite':
					stageElements.push(new Sprite(currentType));
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

		
		if (!individualObjects) {
		switch(currentType) {
			case 'canvas':
			case 'canvasbuffer':
			case 'canvassvg':
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
		}
		for (var stageElement in stageElements)
		{
			stageElements[stageElement].draw(timeOffset);
		}

		if (currentType === "canvasbuffer") {
			displayContext.clearRect(0, 0, stageWidth, stageHeight);
			displayContext.drawImage(buffer,0,0);
		}
		var paintTime = setTimestamp() - frameStartTimeStamp;
		
		
		++framesPainted;
		statistics.update(paintTime);

		previousTimeStamp = currentTime;


		if (framesPainted > (testDuration -1)) {
			self.endAnimationTest();
		}
	},

	this.endAnimationTest= function() {
			cancelAnimationFrame(tick);
			tick = null;
			clearStage();
			statistics.endTest(currentTest);
			++currentTest;
			if (currentTest < testSequence.length) {
				self.prepareStage(testSequence[currentTest].type, testSequence[currentTest].offscreen, testSequence[currentTest].createIndividualElements);
			}
			else {
				statistics.send();
			}
	}

	function clearStage() {
		if (buffer !== undefined) {
			buffer = undefined;
			copySource = undefined;
			displayContext = undefined;
		}
		while (stage.hasChildNodes()) {
			stage.removeChild(stage.lastChild);
		}
		framesPainted = 0, context = null, svg = null, previousTimeStamp = null, stageElements = [], webglRenderer = null, individualObjects = false, imageAsset = null;
	}

}