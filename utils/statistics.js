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
		stageObject.endAnimationTest();
		skippedFramesNode.innerHTML = "(Skipped Frames: " + totalSkippedFrames + ")";
	}

	this.startTest = function () {
	 	minMS = Infinity, maxMS = 0, frames = 0, breaks = 0,
		sumMS = 0, sumFPS = 0, fpsSamples = 0, maxFPS = 0, minFPS = Infinity, prevTime = setTimestamp(), didbreak = false;
		currentTestNode.innerHTML = testSequence[currentTest].object+ "*"+testSequence[currentTest].maxObjects +" ("+testSequence[currentTest].description+")";
		currentTestNumber.innerHTML = currentTest+1, remainingFramesTest = testDuration;
		totalTests.innerHTML = testSequence.length;
		fpsNode.innerHTML = 'Calculating Frames...';
		if (testSequence[currentTest].offscreen) {
			currentTestNode.innerHTML = currentTestNode.innerHTML + " Offscreen Test, no Test result visible";
		}
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
		var testavgFPS = sumFPS/fpsSamples;
		if (isNaN(testavgFPS)) {testavgFPS = 0;}
		var testResult = {
			testNumber: currentTest,
			minMS: minMS,
			maxMS: maxMS,
			sumMS: sumMS,
			minFPS: minFPS,
			maxFPS: maxFPS,
			avgFPS: testavgFPS,
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