function TestRunner(sequence, stageObject) {
	var hash = window.location.hash;

	function parseHash(hash) {
		/*allow skipping of tests*/
		//Syntax :#tests=al
		//#tests=svg,canvas,etc.
		//#object=all
	}
	
	function clearSequence(key) {
		var i=0;
		while ( i < sequence.length) {
			if (sequence[i].required.indexOf(key) != -1) {
				sequence.splice(i,1)
			}
			++i;
		}
	}

	function clearObjects(key) {
		var i=0;
		while ( i < sequence.length) {
			if (sequence[i].object.indexOf(key) != -1) {
				sequence.splice(i,1)
			}
			++i;
		}
	}

	this.checkSystemCapabilities = function() {

		if (!Modernizr.svg) {
			clearSequence('svg');
		}
		if (!Modernizr.canvas) {
			clearSequence('canvas');
		}

		if (!Modernizr.smil) {
			clearSequence('smil');
		}

		if (!Modernizr.webgl) {
			clearSequence('webgl');
		}

		if (!Modernizr.csstransforms && !Modernizr.csstransforms3d) {
			clearSequence('csstransforms');
		}

		if (!Modernizr.csstransitions) {
			clearSequence('csstransitions');
		}

		if (!Modernizr.cssanimations) {
			clearSequence('cssanimations');
		}
	}
	this.run = function() {

        stageObject.prepareStage(sequence[currentTest].type, sequence[currentTest].offscreen);
	}
}




