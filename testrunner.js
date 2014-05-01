function TestRunner(sequence, stageObject) {
	var hash = window.location.hash;
	var testselects = document.querySelectorAll('input[type="checkbox"]');
	var testselectsSingleTest = document.querySelectorAll('.selectsingletest');
	var testselectsAllTests = document.querySelectorAll('.selectsubgroup');
	var startButton = document.getElementById('run');
	var self = this;
	document.getElementById('start').className = "show";

	function parseHash(hash) {
		/*allow skipping of tests*/
		//Syntax :#tests=al
		//#tests=svg,canvas,etc.
		//#object=all
	}


	function testLength(key, method) {
		var j = 0,
		testLength = 0;
		
		while ( j < new TestSequence().length) {
			switch(method)
			{	
				case "type":
					if (new TestSequence()[j].type === key) {
				
						testLength++;
					}
				break;

				default:
					if (new TestSequence()[j].required === key) {
				
						testLength++;
					}
			
				break;
			}
			
			
			++j;
		}
		return testLength;
	}
	
	function clearSequence(key, param) {
		var j = 0,
		removed = 0;
		while ( j < sequence.length) {
			switch(param) {
				case "type":
					
				
					if (sequence[j].type === key) {
						sequence[j].leave = true;
					}
				break;
				default:
					if (sequence[j].required === key) {
						sequence[j].leave = true;
					}
				break;
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

	function clearCheckboxes(key) {
		
		Array.prototype.forEach.call(testselects, function(el, i){
			
			if (el.getAttribute('data-required').indexOf(key) > -1) {
				el.removeEventListener('click');
				el.setAttribute('disabled',true);
			}
		});
	}
	
	function selectTest(e) {
		if (e.target.className === "selectsubgroup") {
			var curValue = e.target.checked;
			var dest;
			if (curValue) {
				e.target.checked = true;
				dest = true;
			}
			else {
				e.target.checked = false;
				dest = false;
			}
			var children = e.target.nextElementSibling.nextElementSibling.querySelectorAll('input');
			
			Array.prototype.forEach.call(children, function(el, i){
				el.checked = dest;
			});

		}
		computeTests();
	}

	

	function getTestTypeCount() {
		var types  = [];
		var j = 0;
		while ( j < new TestSequence().length) {
			if (types.indexOf(new TestSequence()[j].type) == -1) {
				types.push(new TestSequence()[j].type)
			}
			++j;
		}
		
		var g = 0;
		var sumCounts = [];
		while( g < types.length) {

			var el = document.getElementById('select_'+types[g]);
			
			if (el != undefined) {
				var count = testLength(types[g],"type");
				el.setAttribute('data-count',count);
				el.nextElementSibling.innerHTML = el.nextElementSibling.innerHTML + " (" + count + ")";
			}
			g++;
		}

		Array.prototype.forEach.call(testselectsAllTests, function(el, i){
			var subTotalCount = 0;
			var elChildren =  el.nextElementSibling.nextElementSibling.querySelectorAll('input');
		
			Array.prototype.forEach.call(elChildren, function(el, i){
				
				subTotalCount += el.getAttribute('data-count')*1;
			});
			el.nextElementSibling.innerHTML = el.nextElementSibling.innerHTML + " (" + subTotalCount + ")";
		});


		
	}

	function computeTests() {
		
		sequence = new TestSequence();
		
		Array.prototype.forEach.call(testselectsSingleTest, function(el, i){
			if (!el.checked) {
				clearSequence(el.getAttribute('value'),'type');
			}
		});
		var runSequence = [];
		var j = 0;
		while (j< sequence.length) {
			if (!sequence[j].leave) {
				runSequence.push(sequence[j])
			}
			++j;
		} 
		sequence = runSequence;
		var estTestDuration = testDuration * sequence.length;

	}

	this.bindEvents = function() {
		
		Array.prototype.forEach.call(testselects, function(el, i){
			el.addEventListener('click',selectTest);
		});
		
		startButton.addEventListener('click',self.run);
		
		
	},

	this.checkSystemCapabilities = function() {
		var featureSet = [Modernizr.canvas, Modernizr.svg, Modernizr.smil, Modernizr.csstransforms, Modernizr.csstransforms3d, Modernizr.csstransitions, Modernizr.cssanimations];
		var featureSetLinks = ["canvas","svg","smil","csstransforms","useless","csstransitions","cssanimations"];
		var featureSetDescription = ["Canvas","SVG","SVG Animations","CSS Transforms 2D","CSS Transforms 3D","CSS Transitions","CSS Animations"];
		getTestTypeCount();
		var totalTests = new TestSequence().length, supportedTests;
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
				clearSequence(featureSetLinks[i],'required');
				clearCheckboxes(featureSetLinks[i]);
			}
			++i;

		}

		if (checkWebGL() == false) {
			clearSequence('webgl','required');
			clearCheckboxes('webgl');
		} 
		else {
			descriptiontoEnter = descriptiontoEnter + "WebGL";
		}
		descriptionNode.innerHTML = descriptiontoEnter ;
		supportedTests = sequence.length;
		supportedTestNode.innerHTML = supportedTests;
	
		computeTests();

	},
	this.run = function() {
		testSequence = sequence;
		document.getElementById('start').className = "";
		document.getElementById('testrunner').className = "show";
		statistics = new Statistics(sequence.length);
		stageObject = new Stage(stage, statistics);
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




