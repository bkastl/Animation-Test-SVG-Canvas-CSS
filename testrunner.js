function TestRunner(sequence) {
	
	var testselects = document.querySelectorAll('input[type="checkbox"]');
	var testselectsSingleTest = document.querySelectorAll('.selectsingletest');
	var testselectsAllTests = document.querySelectorAll('.selectsubgroup');
	var testselectsObjects = document.querySelectorAll('.selectobjecttype');
	var testselectsIterations = document.querySelectorAll('.selectiterations');
	var testselectsRequirements = document.querySelectorAll('.selectsubgroup, .selectsingletest');
	var startButton = document.getElementById('run');
	var browserFeatures;
	var self = this;
	document.getElementById('start').className = "show";

	


	function testLength(key, method) {
		var j = 0,
		testLength = 0;
		var tst = new TestSequence();
		while ( j < tst.length) {
			switch(method)
			{	
				case "type":
					if (tst[j].type === key) {
				
						testLength++;
					}
				break;

				case "object":
					if (tst[j].object === key) {
				
						testLength++;
					}
				break;

				case "category":
					if (tst[j].category === key) {
				
						testLength++;
					}
				break;

				default:
					if (tst[j].required === key) {
				
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
				case "object":
					
				
					if (sequence[j].object === key) {
						sequence[j].leave = true;
					}
				break;
				case "category":
					
				
					if (sequence[j].category === key) {
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
		
		Array.prototype.forEach.call(testselectsRequirements, function(el, i){
			el.removeAttribute('disabled');
			if (el.getAttribute('data-required').indexOf(key) > -1) {
				el.removeEventListener('click',selectTest);
				el.setAttribute('disabled',true);
				el.checked = false;
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
		var types  = [], testObjects = [];
		var j = 0;
		var tst = new TestSequence();
		while ( j < tst.length) {
			if (types.indexOf(tst[j].type) == -1) {
				types.push(tst[j].type)
			}
			if (testObjects.indexOf(tst[j].object) == -1) {
				testObjects.push(tst[j].object)
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
		var h = 0;
		while ( h < testObjects.length) {

			var el = document.getElementById('select_object_'+testObjects[h].toLowerCase());
			
			if (el != undefined) {
				var count = testLength(testObjects[h],"object");
				
				el.setAttribute('data-count',count);
				el.nextElementSibling.innerHTML = el.nextElementSibling.innerHTML + " (" + count + ")";
			}
			h++;
		}
		var testComplexities = ['low','medium','high','ultra'];
		var l = 0;
		while ( l < testComplexities.length) {

			var el = document.getElementById('select_iterations_'+testComplexities[l].toLowerCase());
			
			if (el != undefined) {
				var count = testLength(testComplexities[l],"category");
				
				el.setAttribute('data-count',count);
				el.nextElementSibling.innerHTML = el.nextElementSibling.innerHTML + " (" + count + ")";
			}
			l++;
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
		
		Array.prototype.forEach.call(testselectsObjects, function(el, i){
			if (!el.checked) {

				clearSequence(el.getAttribute('value'),'object');
			}
		});

		Array.prototype.forEach.call(testselectsSingleTest, function(el, i){
			if (!el.checked) {
				clearSequence(el.getAttribute('value'),'type');
			}
		});

		Array.prototype.forEach.call(testselectsIterations, function(el, i){
			if (!el.checked) {
				clearSequence(el.getAttribute('value'),'category');
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
		document.getElementById('estimatedtimetorun').innerHTML = Math.round(estTestDuration /60/60) +  " minutes / "  +Math.round(estTestDuration / 60) + " seconds";

	}

	this.bindEvents = function() {
		
		Array.prototype.forEach.call(testselects, function(el, i){
			el.addEventListener('click',selectTest);
		});
		
		startButton.addEventListener('click',self.run);
		
		
	},

	this.checkSystemCapabilities = function() {
		browserFeatures = new WhichBrowser();
		
		document.getElementById('browsername').innerHTML = browserFeatures.browser.name;
		
		if (browserFeatures.browser.version != null) {
			document.getElementById('browserversion').innerHTML = browserFeatures.browser.version.original;
		}
		else if (browserFeatures.engine.version != null) {
			document.getElementById('browserversion').innerHTML = browserFeatures.engine.version.original;
		}
		if (browserFeatures.device.type === "desktop") {
			document.getElementById('osname').innerHTML = browserFeatures.os.name;
			document.getElementById('osversion').innerHTML = browserFeatures.os.version.original;
		}
		else {
			document.getElementById('osname').innerHTML = browserFeatures.os.name;
			if (browserFeatures.os.version != null) {document.getElementById('osversion').innerHTML = browserFeatures.os.version.original;}
			if (browserFeatures.os.manufacturer != null) 
				{document.getElementById('devicetype').innerHTML = browserFeatures.device.manufacturer + " " + browserFeatures.device.model;}
			else {
				document.getElementById('devicetype').innerHTML = browserFeatures.device.type;
			}
		}
		

		

		var featureSet = [Modernizr.canvas, Modernizr.svg, Modernizr.smil, Modernizr.csstransforms, Modernizr.csstransforms3d, Modernizr.csstransitions, Modernizr.cssanimations, Modernizr.cssfilters,Modernizr.svgfilters];
		var featureSetLinks = ["canvas","svg","smil","csstransforms","useless","csstransitions","cssanimations","cssfilters","svgfilters"];
		var featureSetDescription = ["Canvas","SVG","SVG Animations","CSS Transforms 2D","CSS Transforms 3D","CSS Transitions","CSS Animations","CSS Filters","SVG Filters"];
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
		
		computeTests();
		descriptionNode.innerHTML = descriptiontoEnter;
		supportedTests = sequence.length;
		supportedTestNode.innerHTML = supportedTests;

	},
	this.run = function() {
		testSequence = sequence;
		if (sequence.length > 0) {
			document.getElementById('start').className = "";
			document.getElementById('testrunner').className = "show";
			statistics = new Statistics(sequence.length);
			statistics.addBrowser(browserFeatures);
			stageObject = new Stage(stage, statistics);
        	stageObject.prepareStage(sequence[currentTest].type, sequence[currentTest].offscreen, sequence[currentTest].createIndividualElements, sequence[currentTest].dontScale);
    	}
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
			
			if (sequence[l].type.indexOf(type) > -1 && sequence[l].subtest !== true) {
				sequence[l].skip = true;
				++skippedTestsCount;
				
			}
			++l;
		}
		statistics.optimize(skippedTestsCount);
	}


}




