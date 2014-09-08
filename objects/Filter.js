function Filter(type, i, filtertype, forceGPU) {
	var width = stageWidth / 3,
	height = stageHeight / 2,
	imageSrc = assets[3+i], uid = generateUID();
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
			var img = document.createElement('img');
			img.src= imageSrc.src;
			
			
		break;
		case "svgfilters":
			var svg = document.createElementNS(svg_ns, "svg");
			svg.id = uid;
		
			svg.setAttribute("width", width);
			svg.setAttribute("height", height);
			stage.appendChild(svg);
			var defs = document.createElementNS(svg_ns,"defs");
			svg.appendChild(defs);
			var domNode = document.createElementNS(svg_ns,"image");
			domNode.setAttribute("x",0);
			domNode.setAttribute("y",0);
			domNode.setAttribute('fill','red');
			domNode.setAttribute("width",width);
			domNode.setAttribute("height",height);
			domNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageSrc.src);
			svg.appendChild(domNode);
			switch (filtertype) {
				case "blur":
				var filterNodeOuter = document.createElementNS(svg_ns,'filter');
				filterNodeOuter.id = "filtereffects";
				defs.appendChild(filterNodeOuter);
				var filterInner = document.createElementNS(svg_ns,'feGaussianBlur');
				filterInner.setAttribute('stdDeviation',0);
				filterNodeOuter.appendChild(filterInner);
				domNode.style.filter = "url(#filtereffects)";
				break;
				case "hue-rotate":
				var filterNodeOuter = document.createElementNS(svg_ns,'filter');
				filterNodeOuter.id = "filtereffects";
				defs.appendChild(filterNodeOuter);
				var filterInner = document.createElementNS(svg_ns,'feColorMatrix');
				filterInner.setAttribute('type','hueRotate');
				filterNodeOuter.appendChild(filterInner);
				domNode.style.filter = "url(#filtereffects)";
				break;
				case "grayscale":
				var filterNodeOuter = document.createElementNS(svg_ns,'filter');
				filterNodeOuter.id = "filtereffects";
				defs.appendChild(filterNodeOuter);
				var filterInner = document.createElementNS(svg_ns,'feColorMatrix');
				filterInner.setAttribute('type','saturate');
				filterNodeOuter.appendChild(filterInner);
				domNode.style.filter = "url(#filtereffects)";
				break;
				case "sepia":
				var filterNodeOuter = document.createElementNS(svg_ns,'filter');
				filterNodeOuter.id = "filtereffects";
				defs.appendChild(filterNodeOuter);
				var filterInner = document.createElementNS(svg_ns,'feColorMatrix');
				filterInner.setAttribute('type','matrix');
				filterNodeOuter.appendChild(filterInner);
				domNode.style.filter = "url(#filtereffects)";
				
				break;
				case "brightness":
				var filterNodeOuter = document.createElementNS(svg_ns,'filter');
				filterNodeOuter.id = "filtereffects";
				defs.appendChild(filterNodeOuter);
				var filterInner = document.createElementNS(svg_ns,'feComponentTransfer');
				filterInner.setAttribute('type','saturate');
				filterNodeOuter.appendChild(filterInner);
				var filterInnerR = document.createElementNS(svg_ns,'feFuncR');
				filterInnerR.setAttribute('type','linear');
				filterInner.appendChild(filterInnerR);
				var filterInnerG = document.createElementNS(svg_ns,'feFuncG');
				filterInnerG.setAttribute('type','linear');
				filterInner.appendChild(filterInnerG);
				var filterInnerB = document.createElementNS(svg_ns,'feFuncB');
				filterInnerB.setAttribute('type','linear');
				filterInner.appendChild(filterInnerB);
				domNode.style.filter = "url(#filtereffects)";
				break;
			}
			
		break;
		case "html":
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

	var CanvasFilters = {};

	CanvasFilters.grayscale = function(pixels, strength) {
		var d = pixels.data;
		for (var i=0; i<d.length; i+=4) {
			var r = d[i];
			var g = d[i+1];
			var b = d[i+2];
		
			//final Value
			var v = 0.2126*r + 0.7152*g + 0.0722*b;
			
			d[i] = Math.round(r*(1-strength)+v*strength);
			d[i+1] = Math.round(g*(1-strength)+v*strength);
			d[i+2] = Math.round(b*(1-strength)+v*strength);
		
		}
		return pixels;
	};

	CanvasFilters.sepia = function(pixels, strength) {
		var d = pixels.data;
		for (var i=0; i<d.length; i+=4) {
			var r = d[i];
			var g = d[i+1];
			var b = d[i+2];
		
			//final Value
			var v = 0.3*r + 0.59*g + 0.11*b;
			
			d[i] = Math.round(r*(1-strength)+(v+60)*strength);
			d[i+1] = Math.round(g*(1-strength)+(v+20)*strength);
			d[i+2] = Math.round(b*(1-strength)+(v-10)*strength);
		
		}
		return pixels;
	};

	CanvasFilters.brightness = function(pixels, strength) {
		var d = pixels.data;
		for (var i=0; i<d.length; i+=4) {
			var r = d[i];
			var g = d[i+1];
			var b = d[i+2];
		
			//final Value
			
			
			d[i] = Math.round(r-(strength-1)*2.55);
			d[i+1] = Math.round(g-(strength-1)*2.55);
			d[i+2] = Math.round(b-(strength-1)*2.55);
		
		}
		return pixels;
	};

	CanvasFilters.hueRotate = function(pixels, strength) {
		var d = pixels.data;
		
		for (var i=0; i<d.length; i+=4) {
			var hsl = rgbToHsl(d[i], d[i+1], d[i+2]);
			hsl[0] = hsl[0] + strength;
			if (hsl[0] > 1) {
				hsl[0] -= 1;
			}
			
			
			var rgb = hslToRgb(hsl[0],hsl[1],hsl[2]);
			d[i] = rgb[0];
			d[i+1] = rgb[1];
			d[i+2] = rgb[2];
		
		}
		return pixels;
	};

	this.draw = function () {

		var nextValue = currentValue + filterMaxValueSelf / timeFromZero * direction;
		
		if (nextValue > filterMaxValueSelf) {
			direction = direction*-1;
		}
		


		switch (type) {
			case 'canvas':
				ctx.clearRect(0,0,width,height);
				switch(filtertype) {
					case "opacity":
						
						ctx.globalAlpha = roundDecimal(nextValue/100,100);
						ctx.drawImage(img,0,0);
					break;

					case "grayscale":
						
						ctx.drawImage(img,0,0);
						var imageData = ctx.getImageData(0,0,width,height);
						
						var processedData = CanvasFilters.grayscale(imageData,nextValue/100);
						
						
						ctx.putImageData(processedData, 0,0)
					break;

					case "sepia":
						
						ctx.drawImage(img,0,0);
						var imageData = ctx.getImageData(0,0,width,height);
						
						var processedData = CanvasFilters.sepia(imageData,nextValue/100);
						
						
						ctx.putImageData(processedData, 0,0)
					break;

					case "brightness":
						
						ctx.drawImage(img,0,0);
						var imageData = ctx.getImageData(0,0,width,height);
						
						var processedData = CanvasFilters.brightness(imageData,nextValue);
						
						
						ctx.putImageData(processedData, 0,0)
					break;
					
					case "hue-rotate":
						
						ctx.drawImage(img,0,0);
						var imageData = ctx.getImageData(0,0,width,height);
						
						var processedData = CanvasFilters.hueRotate(imageData,(nextValue/180)*0.5);
						
						
						ctx.putImageData(processedData, 0,0)
					break;
					

				}
			break;
			case 'cssfilters':
				domNode.style['-webkit-filter'] = filtertype + "(" +nextValue + cssFilterUnit + ")";
				domNode.style['filter'] = filtertype + "(" +nextValue + cssFilterUnit + ")";
			break;
			case 'html':
				domNode.style['opacity'] = roundDecimal(nextValue/100,100);
			break;
			case 'svgfilters':
				switch(filtertype) {
					case "opacity":
						domNode.setAttribute('opacity',roundDecimal(nextValue/100,100));
					break;
					case "blur":
						filterInner.setAttribute('stdDeviation',nextValue);
					break;
					case "hue-rotate":
						filterInner.setAttribute('values',nextValue);
					break;
					case "grayscale":
						filterInner.setAttribute('values',1-roundDecimal(nextValue/100,100));
					break;
					case "sepia":
						var amount = roundDecimal(nextValue/100,100);
						var value11 = (0.393 + 0.607 * (1 - amount));
						var value12 = (0.769 - 0.769 * (1 - amount));
						var value13 = (0.189 - 0.189 * (1 - amount));
						var value21 = (0.349 - 0.349 * (1 - amount));
						var value22 = (0.686 + 0.314 * (1 - amount));
						var value23 = (0.168 - 0.168 * (1 - amount));
						var value31 = (0.272 - 0.272 * (1 - amount));
						var value32 = (0.534 - 0.534 * (1 - amount));
						var value33 = (0.131 + 0.869 * (1 - amount));
						filterInner.setAttribute('values',
							value11 + " " + value12 + " " + value13 + " 0 0 " + 
							value21 + " " + value22 + " " + value23 + " 0 0 " +
							value31 + " " + value32 + " " + value33 + " 0 0 " +
							"0 0 0 1 0")

					break;

					case 'brightness':
						var amount = roundDecimal(nextValue/100,100);
						filterInnerR.setAttribute('slope',amount);
						filterInnerG.setAttribute('slope',amount);
						filterInnerB.setAttribute('slope',amount);
					break;
				}


			break;

		}
		
		currentValue = nextValue;
	}

}