function TestSequence()

{

	var tests = [ 
		{id: 1, object: "Particle", maxObjects: 100, category: "low", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 2, object: "Particle", maxObjects: 100, category: "low", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 3, object: "Particle", maxObjects: 100, category: "low", type: "svgrebuild", description: "SVG with removing and inserting", required: ["svg"]},
		{id: 4, object: "Particle", maxObjects: 100, category: "low", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 5, object: "Particle", maxObjects: 100, category: "low", type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: ["svg","csstransforms"]},
		{id: 6, object: "Particle", maxObjects: 100, category: "low", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 7, object: "Particle", maxObjects: 100, category: "low", type: "htmlposition", description: "HTML with CSS Positioning", required: ["css"]},
		{id: 8, object: "Particle", maxObjects: 250, category: "medium", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 9, object: "Particle", maxObjects: 250, category: "medium", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 10, object: "Particle", maxObjects: 250, category: "medium", type: "svgrebuild", description: "SVG with removing and inserting", required: ["svg"]},
		{id: 11, object: "Particle", maxObjects: 250, category: "medium", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 12, object: "Particle", maxObjects: 250, category: "medium", type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: ["svg","csstransforms"]},
		{id: 13, object: "Particle", maxObjects: 250, category: "medium", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 14, object: "Particle", maxObjects: 250, category: "medium", type: "htmlposition", description: "HTML with CSS Positioning", required: ["css"]},
		{id: 15, object: "Particle", maxObjects: 1000, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"], offscreen: true},
		{id: 16, object: "Particle", maxObjects: 1000, category: "high", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"], offscreen: true},
		{id: 17, object: "Particle", maxObjects: 1000, category: "high", type: "svg", description: "SVG with attribute change", required: ["svg"], offscreen: true},
		{id: 18, object: "Particle", maxObjects: 1000, category: "high", type: "svgrebuild", description: "SVG with removing and inserting", required: ["svg"], offscreen: true},
		{id: 19, object: "Particle", maxObjects: 1000, category: "high", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"], offscreen: true},
		{id: 20, object: "Particle", maxObjects: 1000, category: "high", type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: ["svg","csstransforms"], offscreen: true},
		{id: 21, object: "Particle", maxObjects: 1000, category: "high", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"], offscreen: true},
		{id: 22, object: "Particle", maxObjects: 1000, category: "high", type: "htmlposition", description: "HTML with CSS Positioning", required: ["css"], offscreen: true},
		{id: 23, object: "Particle", maxObjects: 1000, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 24, object: "Particle", maxObjects: 1000, category: "high", type: "canvasbuffer", description: "Canvas 2D width buffering", required: ["canvas"]},
		{id: 25, object: "Particle", maxObjects: 1000, category: "high", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 26, object: "Particle", maxObjects: 1000, category: "high", type: "svgrebuild", description: "SVG with removing and inserting", required: ["svg"]},
		{id: 27, object: "Particle", maxObjects: 1000, category: "high", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 28, object: "Particle", maxObjects: 1000, category: "high", type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: ["svg","csstransforms"]},
		{id: 29, object: "Particle", maxObjects: 1000, category: "high", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 30, object: "Particle", maxObjects: 2500, category: "ultra", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 31, object: "Particle", maxObjects: 2500, category: "ultra", type: "canvasbuffer", description: "Canvas 2D width buffering", required: ["canvas"]},
		{id: 32, object: "Particle", maxObjects: 2500, category: "ultra", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 33, object: "Particle", maxObjects: 2500, category: "ultra", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 34, object: "Particle", maxObjects: 1000, category: "high", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"]},
		{id: 35, object: "Particle", maxObjects: 2500, category: "ultra", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"]},
		{id: 36, object: "Particle", maxObjects: 5000, category: "ultra", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"]},
		{id: 38, object: "Bar", maxObjects: 80, category: "low", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 39, object: "Bar", maxObjects: 80, category: "low", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 40, object: "Bar", maxObjects: 80, category: "low", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 41, object: "Bar", maxObjects: 80, category: "low", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 42, object: "Bar", maxObjects: 80, category: "low", type: "htmlheight", description: "HTML with height change", required: ["css"]},
		{id: 43, object: "Bar", maxObjects: 240, category: "medium", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 44, object: "Bar", maxObjects: 240, category: "medium", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 45, object: "Bar", maxObjects: 240, category: "medium", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 46, object: "Bar", maxObjects: 240, category: "medium", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 47, object: "Bar", maxObjects: 240, category: "medium", type: "htmlheight", description: "HTML with height change", required: ["css"]},
		{id: 48, object: "Bar", maxObjects: 240, category: "medium", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"]},
		{id: 49, object: "Bar", maxObjects: 800, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 50, object: "Bar", maxObjects: 800, category: "high", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 51, object: "Bar", maxObjects: 800, category: "high", type: "svgtransforms", description: "SVG with SVG Transformations", required: ["svg"]},
		{id: 52, object: "Bar", maxObjects: 800, category: "high", type: "html", description: "HTML with CSS Transforms (3D)", required: ["csstransforms"]},
		{id: 53, object: "Bar", maxObjects: 800, category: "high", type: "htmlheight", description: "HTML with height change", required: ["css"]},
		{id: 54, object: "Bar", maxObjects: 800, category: "high", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"]},
		{id: 55, object: "Pie", maxObjects: 100, category: "low", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 56, object: "Pie", maxObjects: 100, category: "low", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 57, object: "Pie", maxObjects: 250, category: "medium", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 58, object: "Pie", maxObjects: 250, category: "medium", type: "svg", description: "SVG with attribute change", required: ["svg"]},
		{id: 66, object: "Pie", maxObjects: 1000, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 67, object: "Pie", maxObjects: 1000, category: "high", type: "svg", description: "SVG with attribute chnage", required: ["svg"]},
		{id: 68, object: "Line", maxObjects: 20, category: "low", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 69, object: "Line", maxObjects: 20, category: "low", type: "svg", description: "SVG Transforms", required: ["svg"]},
		{id: 70, object: "Line", maxObjects: 50, category: "medium", type: "canvas", description: "Canvas 2D", required: ["canvas"]},
		{id: 71, object: "Line", maxObjects: 50, category: "medium", type: "svg", description: "SVG Transforms", required: ["svg"]},
		{id: 72, object: "Line", maxObjects: 100, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"]}, 
		{id: 73, object: "Line", maxObjects: 100, category: "high", type: "svg", description: "SVG Transforms", required: ["svg"]},
		{id: 74, object: "Spinner", maxObjects: 48, category: "low", type: "canvas", description: "Canvas 2D", required: ["canvas"], createIndividualElements: true},
		{id: 75, object: "Spinner", maxObjects: 48, category: "low", type: "svg", description: "SVG Transforms", required: ["svg"], createIndividualElements: true},
		{id: 78, object: "Spinner", maxObjects: 160, category: "medium", type: "canvas", description: "Canvas 2D", required: ["canvas"], createIndividualElements: true},
		{id: 79, object: "Spinner", maxObjects: 160, category: "medium", type: "svg", description: "SVG Transforms", required: ["svg"], createIndividualElements: true},
		{id: 82, object: "Spinner", maxObjects: 360, category: "high", type: "canvas", description: "Canvas 2D", required: ["canvas"], createIndividualElements: true},
		{id: 83, object: "Spinner", maxObjects: 360, category: "high", type: "svg", description: "SVG Transforms", required: ["svg"], createIndividualElements: true},
		{id: 87, object: "Sprite", maxObjects: 25, category: "low", type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: ["csstransforms"]},
		{id: 89, object: "Sprite", maxObjects: 25, category: "low", type: "canvassvg", description: "Canvas 2D (Spritefile SVG)", required: "canvas, svg", imageAsset: 2},
		{id: 90, object: "Sprite", maxObjects: 25, category: "low", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 92, object: "Sprite", maxObjects: 100, category: "medium", type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: ["csstransforms"]},
		{id: 94, object: "Sprite", maxObjects: 100, category: "medium", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 96, object: "Sprite", maxObjects: 250, category: "high", type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: ["csstransforms"]},
		{id: 97, object: "Sprite", maxObjects: 250, category: "high", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 98, object: "Sprite", maxObjects: 1000, category: "high", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 99, object: "Sprite", maxObjects: 1000, category: "high", type: "canvasbuffer", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 100, object: "Sprite", maxObjects: 5000, category: "ultra", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 101, object: "Sprite", maxObjects: 7500, category: "ultra", type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 102, object: "Sprite", maxObjects: 7500, category: "ultra", type: "canvasbuffer", description: "Canvas 2D (Spritefile PNG)", required: ["canvas"], imageAsset: 1},
		{id: 103, object: "Sprite", maxObjects: 1000, category: "ultra", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"], imageAsset: "assets/json/spritesheet.json"},
		{id: 104, object: "Sprite", maxObjects: 5000, category: "ultra", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"], imageAsset: "assets/json/spritesheet.json"},
		{id: 105, object: "Sprite", maxObjects: 15000, category: "ultra", type: "webgl", description: "Canvas (WebGL)", required: ["canvas","webgl"], imageAsset: "assets/json/spritesheet.json"},
		{id: 106, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['blur','blur','blur','blur','blur','blur']},
		{id: 107, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['grayscale','grayscale','grayscale','grayscale','grayscale','grayscale']},
		{id: 108, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['brightness','brightness','brightness','brightness','brightness','brightness']},
		{id: 109, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['hue-rotate','hue-rotate','hue-rotate','hue-rotate','hue-rotate','hue-rotate']},
		{id: 110, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['sepia','sepia','sepia','sepia','sepia','sepia']},
		{id: 111, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['opacity','opacity','opacity','opacity','opacity','opacity']},
		{id: 112, object: "Filter", maxObjects: 6, category: "high", type: "cssfilters", description: "CSS Filters (GPU Layers)", forceGPU: true, required: ["cssfilters"], filterSequence: ['blur','grayscale','brightness','hue-rotate','sepia','opacity']},
		{id: 106, object: "Filter", maxObjects: 6, category: "high", type: "html", description: "CSS opacity", required: [""], filterSequence: ['opacity','opacity','opacity','opacity','opacity','opacity']},
		
		{id: 111, object: "Cube", maxObjects: 300, category: "high", type: "htmlanimation", description: "CSS Filters (GPU Layers)", required: ["cssanimations"]}

	];

/*var tests = [
	{id: 111, object: "Filter", maxObjects: 6, category: "high", type: "canvas", description: "CSS Filters (GPU Layers)", required: ["cssanimations"], filterSequence: ['opacity','grayscale','sepia','brightness','grayscale','grayscale'], createIndividualElements: true}

]; */

/*var tests = [
	{id: 33, object: "Particle", maxObjects: 5, category: "ultra", type: "svghtmlwrap", description: "SVG with HTML Wrapping", required: ["svg"]},
];*/

var testsInFrames= [
		{id: 43, object: "Bar", maxObjects: 80, category: "low", type: "htmltransition", description: "HTML with CSS Transitions", required: ["csstransitions"]},
		{id: 44, object: "Bar", maxObjects: 80, category: "low", type: "htmlanimation", description: "HTML with CSS Animations", required: ["cssanimations"]},
		{id: 49, object: "Bar", maxObjects: 240, category: "medium", type: "svganimations", description: "SVG with SVG Animations", required: ["svg","smil"]},
		{id: 51, object: "Bar", maxObjects: 240, category: "medium", type: "htmltransition", description: "HTML with CSS Transitions", required: ["csstransitions"]},
		{id: 52, object: "Bar", maxObjects: 240, category: "medium", type: "htmlanimation", description: "HTML with CSS Animations", required: ["cssanimations"]},
		{id: 41, object: "Bar", maxObjects: 80, category: "low", type: "svganimations", description: "SVG with SVG Animations", required: ["svg","smil"]},
		{id: 58, object: "Bar", maxObjects: 800, category: "high", type: "svganimations", description: "SVG with SVG Animations", required: ["svg","smil"]},
		{id: 76, object: "Spinner", maxObjects: 48, category: "low", type: "svganimations", description: "SVG Animation", required: ["svg","smil"], createIndividualElements: true},
		{id: 77, object: "Spinner", maxObjects: 48, category: "low", type: "htmlanimation", description: "SVG with HTML Animation", required: ["svg","cssanimations"], createIndividualElements: true},
		{id: 80, object: "Spinner", maxObjects: 160, category: "medium",type: "svganimations", description: "SVG Animation", required: ["svg","smil"], createIndividualElements: true},
		{id: 81, object: "Spinner", maxObjects: 160, category: "medium", type: "htmlanimation", description: "SVG with HTML Animation", required: ["svg","cssanimations"], createIndividualElements: true},
		{id: 84, object: "Spinner", maxObjects: 360, category: "high", type: "svganimations", description: "SVG Animation", required: ["svg","smil"], createIndividualElements: true},
		{id: 85, object: "Spinner", maxObjects: 360, category: "high", type: "htmlanimation", description: "SVG with HTML Animation", required: ["svg","cssanimations"], createIndividualElements: true},
		{id: 86, object: "Sprite", maxObjects: 25, category: "low", type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: ["csstransforms","cssanimations"]},
		{id: 88, object: "Sprite", maxObjects: 25, category: "low", type: "htmlanimationsvg", description: "HTML with CSS Animations (Spritefile SVG)", required: ["csstransforms","cssanimations","svg"]},
		{id: 91, object: "Sprite", maxObjects: 100, category: "medium", type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: ["csstransforms","cssanimations"]},
		{id: 93, object: "Sprite", maxObjects: 100, category: "medium", type: "htmlanimationsvg", description: "HTML with CSS Animations (Spritefile SVG)", required: ["csstransforms","cssanimations","svg"]},
		{id: 95, object: "Sprite", maxObjects: 250, category: "high", type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: ["csstransforms","cssanimations"]},
		
		
];


	
 return tests;
}



