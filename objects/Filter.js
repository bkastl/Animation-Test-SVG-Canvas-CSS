function Filter(type, i, filtertype, forceGPU) {
	var width = stageWidth / 3,
	height = stageHeight / 2,
	imageSrc = assets[3+i];
	var timeFromZero = testDuration/2;
	var filterMaxValueSelf,cssFilterUnit;
	
	switch (filtertype) {
		case "blur":
		filterMaxValueSelf = 20;
		cssFilterUnit = 'px';
		
		break;

		case "grayscale":
		case "brightness":
		case "opacity":
		case "sepia":
		filterMaxValueSelf = 100;
		cssFilterUnit = '%';
		break;

		case "hue-rotate":
		filterMaxValueSelf = 180;
		cssFilterUnit = 'deg';
		break;

	}
	
	var currentValue = 0;
	var direction = 1;


	switch(type) {
		case "canvas":
			var canvas = document.createElement("canvas");
				canvas.id = uid;
				canvas.setAttribute("width", width);
				canvas.setAttribute("height", height);
				stage.appendChild(canvas);
			var ctx = canvas.getContext("2d");
			
		break;
		case "svgfilters":
			var svg = document.createElementNS(svg_ns, "svg");
			svg.id = uid;
			svg.setAttribute("width", width);
			svg.setAttribute("height", height);
			stage.appendChild(svg);
		break;
		case "cssfilters":
			var domNode = document.createElement('img');
			domNode.src= imageSrc.src;
			domNode.className = "imagefilter";
			domNode.style.width = width + 'px';
			domNode.style.height = height + 'px';
			stage.appendChild(domNode);
			if (forceGPU) {
				domNode.style["-webkit-transform"] = "translate3d(0,0,0)";
				domNode.style["transform"] = "translate3d(0,0,0)";
				
			}
		break;
	}

	this.draw = function () {

		var nextValue = currentValue + filterMaxValueSelf / timeFromZero * direction;
		
		if (nextValue > filterMaxValueSelf) {
			direction = direction*-1;
		}
		switch (type) {
			case 'cssfilters':
				domNode.style['-webkit-filter'] = filtertype + "(" +nextValue + cssFilterUnit + ")";
				domNode.style['filter'] = filtertype + "(" +nextValue + cssFilterUnit + ")";
			break;


		}
		
		currentValue = nextValue;
	}

}