function Statistics(selectedTests) {
	var self = this;
	var frameSmoothing = 30, minMS, maxMS, frames, breaks,
	sumMS, currentFPS, maxFPS, minFPS, prevTime, fpsSamples, sumFPS, didbreak, measuredFrames, fpsArray = [], msArray = [];
	var fpsNode = document.getElementById('fps'), currentTestNode = document.getElementById('currentTest'), currentTestNumber = document.getElementById('currentTestNumber'), totalTests = document.getElementById('totalTests');
	var browserOject;
	var remainingFrames = selectedTests * testDuration, totalSkippedFrames = 0, totalSkippedTests = 0;
	remainingFramesNode = document.getElementById('remainingFrames'),
	skippedFramesNode = document.getElementById('skippedFrames'),
	skippedTestsNode = document.getElementById('skippedtests'),
	testResults = [], passedTests = [];

	this.addBrowser = function (browser) {
		browserOject = browser;
	},

	this.killTest = function () {
		runner.optimizeSequence(testSequence[currentTest].object, testSequence[currentTest].type);
		didbreak = true;
		totalSkippedFrames += remainingFramesTest;
		remainingFrames -= remainingFramesTest;
		window.stageObject.endAnimationTest();
		skippedFramesNode.innerHTML = "(Skipped Frames: " + totalSkippedFrames + ")";
	},

	this.optimize = function (num) {
		if (num > 0) {
			totalSkippedTests += num;
			skippedTestsNode.innerHTML = "(Skipped Tests because of poor performance: " + totalSkippedTests + ")";

		}
	},

	this.resetCounts = function() {
		minMS = Infinity, maxMS = 0, frames = 0, breaks = 0, measuredFrames = 0,
		sumMS = 0, sumFPS = 0, fpsSamples = 0, maxFPS = 0, minFPS = Infinity, prevTime = setTimestamp(), didbreak = false, fpsArray = [], msArray = [];
	},

	this.startTest = function () {
	 	self.resetCounts();
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
		msArray.push(frameTime);
		sumMS += frameTime;

		--remainingFrames;

		--remainingFramesTest;

		++ measuredFrames;
		++frames;
		var now = setTimestamp();
		
		
		if (frames > frameSmoothing) {
			
				currentFPS = Math.round((frames*1000) / (now - prevTime));
				if (currentFPS > 60) {currentFPS = 60;}
				if( currentFPS < breakUnderFPS) {
					++breaks;
					if (breaks > stopAfterBreaks) {
						self.killTest();
					}
				}

				if (currentFPS < breakImmediatelyFPS) {
					self.killTest();

				}
				fpsArray.push(currentFPS);
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
	this.endTest = function(num) {
		var testavgFPS = sumFPS/fpsSamples;

		if (isNaN(testavgFPS)) {testavgFPS = 0;}
		
		var testResult = {
			testDescription: testSequence[num],
			testNumber: testSequence[num].id,
			minMS: minMS,
			maxMS: maxMS,
			sumMS: sumMS,
			msDeviation: standard_deviation(msArray),
			minFPS: minFPS,
			maxFPS: maxFPS,
			avgFPS: testavgFPS,
			fpsDeviation: standard_deviation(fpsArray),
			testDidNotFinish: didbreak,
			measuredFrames: measuredFrames
		};
		
		if (!didbreak) {
			passedTests.push(currentTest);
		}
		testResults.push(testResult);
		
		/*Todo update more information in testresults */
		
	},
	this.send = function() {
 		var i = 0, points = 0;
 		
 		while (i<passedTests.length) {
 			points += testResults[passedTests[i]].avgFPS;
 			++i;
 		}
 		points = Math.round(points);
 		var maximumPoints = selectedTests * 60;
 		console.log(testResults);
		console.log(passedTests)
 		alert('your Browser archieved ' + points + ' of ' + maximumPoints + ' points')
	}
}