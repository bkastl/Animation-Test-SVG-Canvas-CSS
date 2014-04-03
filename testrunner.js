function prepareStage(type) {
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
			stage.style.width = stageWidth + 'px';
			stage.style.height = stageHeight + 'px';
		break;
	}

	buildStage();
	
	
}

function buildStage() {
	
	for (var i = 0; i < testSequence[currentTest].maxObjects; i++)
	{	
		switch(testSequence[currentTest].object) {
			case 'Particle':
				stageElements.push(new Particle(currentType));
			break;
			case 'Bar':
				stageElements.push(new Bar(currentType,testSequence[currentTest].maxObjects,i));
			break;
		}
		
	}
	
	
	statistics.startTest();

	animateStage();
	
	
}

function animateStage() {
	tick = requestAnimationFrame(animateStage);
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
		endAnimationTest();
	}
}

function endAnimationTest() {
		cancelAnimationFrame(tick);
		tick = null;
		clearStage();
		statistics.endTest();
		++currentTest;
		if (currentTest < testSequence.length) {
			prepareStage(testSequence[currentTest].type);
		}
		else {
			statistics.send();
		}
}

function clearStage() {
	while (stage.hasChildNodes()) {
		stage.removeChild(stage.lastChild);
	}
	framesPainted = 0, context = null, svg = null, previousTimeStamp = null, stageElements = [];
}

function Statistics() {

	var frameSmoothing = 30, minMS, maxMS, frames, breaks,
	sumMS, currentFPS, maxFPS, minFPS, prevTime, fpsSamples, sumFPS;
	var fpsNode = document.getElementById('fps'), currentTestNode = document.getElementById('currentTest'), currentTestNumber = document.getElementById('currentTestNumber'), totalTests = document.getElementById('totalTests');
	var remainingFrames = testSequence.length * testDuration, totalSkippedFrames = 0,
	remainingFramesNode = document.getElementById('remainingFrames'),
	skippedFramesNode = document.getElementById('skippedFrames'),
	testResults = [], passedTests = [];


	function killTest() {
		dnf = true;
		totalSkippedFrames += remainingFramesTest;
		remainingFrames -= remainingFramesTest;
		endAnimationTest();
		skippedFramesNode.innerHTML = "(Skipped Frames: " + totalSkippedFrames + ")";
	}

	this.startTest = function () {
	 	minMS = Infinity, maxMS = 0, frames = 0, breaks = 0,
		sumMS = 0, sumFPS = 0, fpsSamples = 0, maxFPS = 0, minFPS = Infinity, prevTime = setTimestamp(), didbreak = false;
		currentTestNode.innerHTML = testSequence[currentTest].object+ "*"+testSequence[currentTest].maxObjects +" ("+testSequence[currentTest].description+")";
		currentTestNumber.innerHTML = currentTest+1, remainingFramesTest = testDuration;
		totalTests.innerHTML = testSequence.length;
		fpsNode.innerHTML = 'Calculating Frames...';
	},
	this.update = function(frameTime) {
		minMS = Math.min(minMS, frameTime);
		maxMS = Math.max(maxMS, frameTime);
		
		sumMS += frameTime;

		--remainingFrames;

		--remainingFramesTest;

		++frames;
		var now = setTimestamp();
		
		if (frames > frameSmoothing) {
			
				currentFPS = Math.round((frames*1000) / (now - prevTime));
				if( currentFPS < breakUnderFPS) {
					++breaks;
					if (breaks > stopAfterBreaks) {
						killTest();
					}
				}

				if (currentFPS < breakImmediatly) {
					killTest();
				}
				sumFPS += currentFPS;
				++fpsSamples;
				maxFPS = Math.max(maxFPS, currentFPS);
				minFPS = Math.min(minFPS, currentFPS);
				prevTime = now;
				frames = 0;
				fpsNode.innerHTML = currentFPS +" fps (min "+minFPS+ " / max "+maxFPS+ ")";
		}
		remainingFramesNode.innerHTML = remainingFrames;
	
		

		
	},
	this.endTest = function() {
		
		var testResult = {
			testNumber: currentTest,
			minMS: minMS,
			maxMS: maxMS,
			sumMS: sumMS,
			minFPS: minFPS,
			maxFPS: maxFPS,
			avgFPS: sumFPS/fpsSamples,
			testDidNotFinish: didbreak
		};
		
		if (!didbreak) {
			passedTests.push(currentTest);
		}
		testResults.push(testResult);
		
	},
	this.send = function() {
 		var i = 0, points = 0;
 		
 		while (i<passedTests.length) {
 			points += testResults[passedTests[i]].avgFPS;
 			++i;
 		}
 		points = Math.round(points);
 		var maximumPoints = testSequence.length * 60;
 		alert('your Browser archieved ' + points + ' of ' + maximumPoints + ' points')
	}
}
