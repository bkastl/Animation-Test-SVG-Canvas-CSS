function TestRunner(sequence, stageObject) {
	var hash = window.location.hash;

	function parseHash(hash) {
		/*allow skipping of tests*/
		//Syntax :#tests=al
		//#tests=svg,canvas,etc.
		//#object=all
	}

	function getSequenceLength() {
		return sequence.length;

	}
	
	function clearSequence(key) {
		var j = 0;
		while ( j < sequence.length) {
			if (sequence[j].required.indexOf(key) > -1) {
				sequence.splice(j,1)
			}
			
			++j;
		}
	}

	function checkWebGL() {
		try {
	        return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
	    } catch(e) {
	        return false;
	    }
		
	}
	

	this.checkSystemCapabilities = function() {
		var featureSet = [Modernizr.canvas, Modernizr.svg, Modernizr.smil, Modernizr.csstransforms, Modernizr.csstransforms3d, Modernizr.csstransitions, Modernizr.cssanimations];
		var featureSetLinks = ["canvas","svg","smil","csstransforms","useless","csstransitions","cssanimations"];
		var featureSetDescription = ["Canvas","SVG","SVG Animations","CSS Transforms 2D","CSS Transforms 3D","CSS Transitions","CSS Animations"];
		var totalTests = getSequenceLength(), supportedTests;
		var descriptiontoEnter = ""; 
		var descriptionNode = document.getElementById('supportedfeatures');
		var totalTestNode = document.getElementById('totaltests');
		var supportedTestNode = document.getElementById('supportedtests');
		var i = 0;
		totalTestCount = totalTests;
		totalTestNode.innerHTML = totalTests;
		while ( i < featureSet.length) {
			
			if (featureSet[i]) {
				
				descriptiontoEnter = descriptiontoEnter + featureSetDescription[i] + ", ";

			}
			else {
				clearSequence(featureSetLinks[i]);
			}
			++i;

		}

		if (checkWebGL() == false) {
			clearSequence('webgl');
		} 
		else {
			descriptiontoEnter = descriptiontoEnter + "WebGL";
		}
		descriptionNode.innerHTML = descriptiontoEnter ;
		supportedTests = getSequenceLength();
		supportedTestNode.innerHTML = supportedTests;
	


	},
	this.run = function() {
        stageObject.prepareStage(sequence[currentTest].type, sequence[currentTest].offscreen, sequence[currentTest].createIndividualElements);
	},
	this.optimizeSequence = function(object, type) {
		
		var k = currentTest;
		var maxTestIndex = k;
		while ( k < sequence.length) {
			if (sequence[k].object.indexOf(object) > -1) {
				maxTestIndex = k;
			}
			
			++k;
		}

		var l = currentTest;
		var skippedTestsCount = 0;
		while (l < maxTestIndex) {
			
			if (sequence[l].type.indexOf(type) > -1) {
				sequence[l].skip = true;
				++skippedTestsCount;
				
			}
			++l;
		}
		statistics.optimize(skippedTestsCount);
	}


}




