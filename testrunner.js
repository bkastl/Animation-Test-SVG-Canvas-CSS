function TestRunner(sequence, stageObject) {

	
	function clearSequence(key) {
		var i=0;
		while ( i < sequence.length) {
			if (sequence[i].required.indexOf(key) != -1) {
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
	}
	this.run = function() {

        stageObject.prepareStage(sequence[currentTest].type);
	}
}




