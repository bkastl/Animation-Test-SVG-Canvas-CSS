var testSequence = [ 
	{id: 1, object: "Particle", maxObjects: 100, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 2, object: "Particle", maxObjects: 100, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 3, object: "Particle", maxObjects: 100, type: "svgrebuild", description: "SVG with removing and inserting", required: "svg"},
	{id: 4, object: "Particle", maxObjects: 100, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 5, object: "Particle", maxObjects: 100, type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: "svg, csstransforms"},
	{id: 6, object: "Particle", maxObjects: 100, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 7, object: "Particle", maxObjects: 100, type: "htmlposition", description: "HTML with CSS Positioning", required: 'css'},
	{id: 8, object: "Particle", maxObjects: 100, type: "htmlposition", description: "HTML with CSS Positioning", required: 'css'},
	{id: 9, object: "Particle", maxObjects: 250, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 10, object: "Particle", maxObjects: 250, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 11, object: "Particle", maxObjects: 250, type: "svgrebuild", description: "SVG with removing and inserting", required: "svg"},
	{id: 12, object: "Particle", maxObjects: 250, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 13, object: "Particle", maxObjects: 250, type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: "svg,csstransforms"},
	{id: 14, object: "Particle", maxObjects: 250, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 15, object: "Particle", maxObjects: 250, type: "htmlposition", description: "HTML with CSS Positioning", required: 'css'},
	{id: 16, object: "Particle", maxObjects: 1000, type: "canvas", description: "Canvas 2D", required: "canvas", offscreen: true},
	{id: 17, object: "Particle", maxObjects: 1000, type: "webgl", description: "Canvas (WebGL)", required: "canvas, webgl", offscreen: true},
	{id: 18, object: "Particle", maxObjects: 1000, type: "svg", description: "SVG with attribute change", required: "svg", offscreen: true},
	{id: 19, object: "Particle", maxObjects: 1000, type: "svgrebuild", description: "SVG with removing and inserting", required: "svg", offscreen: true},
	{id: 20, object: "Particle", maxObjects: 1000, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg", offscreen: true},
	{id: 21, object: "Particle", maxObjects: 1000, type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: "svg,csstransforms", offscreen: true},
	{id: 22, object: "Particle", maxObjects: 1000, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms", offscreen: true},
	{id: 23, object: "Particle", maxObjects: 1000, type: "htmlposition", description: "HTML with CSS Positioning", required: 'css', offscreen: true},
	{id: 24, object: "Particle", maxObjects: 1000, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 25, object: "Particle", maxObjects: 1000, type: "canvasbuffer", description: "Canvas 2D width buffering", required: "canvas"},
	{id: 26, object: "Particle", maxObjects: 1000, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 27, object: "Particle", maxObjects: 1000, type: "svgrebuild", description: "SVG with removing and inserting", required: "svg"},
	{id: 28, object: "Particle", maxObjects: 1000, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 29, object: "Particle", maxObjects: 1000, type: "svgcsstransforms", description: "SVG with CSS Transforms (3D)", required: "svg, csstransforms"},
	{id: 30, object: "Particle", maxObjects: 1000, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 31, object: "Particle", maxObjects: 2500, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 32, object: "Particle", maxObjects: 2500, type: "canvasbuffer", description: "Canvas 2D width buffering", required: "canvas"},
	{id: 33, object: "Particle", maxObjects: 2500, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 34, object: "Particle", maxObjects: 2500, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 35, object: "Particle", maxObjects: 1000, type: "webgl", description: "Canvas (WebGL)", required: "webgl, canvas"},
	{id: 36, object: "Particle", maxObjects: 2500, type: "webgl", description: "Canvas (WebGL)", required: "webgl, canvas"},
	{id: 37, object: "Particle", maxObjects: 5000, type: "webgl", description: "Canvas (WebGL)", required: "webgl, canvas"},
	{id: 38, object: "Bar", maxObjects: 80, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 39, object: "Bar", maxObjects: 80, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 40, object: "Bar", maxObjects: 80, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 41, object: "Bar", maxObjects: 80, type: "svganimations", description: "SVG with SVG Animations", required: "svg, smil"},
	{id: 42, object: "Bar", maxObjects: 80, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 43, object: "Bar", maxObjects: 80, type: "htmltransition", description: "HTML with CSS Transitions", required: "csstransitions"},
	{id: 44, object: "Bar", maxObjects: 80, type: "htmlanimation", description: "HTML with CSS Animations", required: "cssanimations"},
	{id: 45, object: "Bar", maxObjects: 240, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 46, object: "Bar", maxObjects: 240, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 47, object: "Bar", maxObjects: 240, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 48, object: "Bar", maxObjects: 240, type: "svganimations", description: "SVG with SVG Animations", required: "svg, smil"},
	{id: 49, object: "Bar", maxObjects: 240, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 50, object: "Bar", maxObjects: 240, type: "htmltransition", description: "HTML with CSS Transitions", required: "csstransitions"},
	{id: 51, object: "Bar", maxObjects: 240, type: "htmlanimation", description: "HTML with CSS Animations", required: "cssanimations"},
	{id: 52, object: "Bar", maxObjects: 240, type: "webgl", description: "Canvas (WebGL)", required: "canvas, webgl"},
	{id: 53, object: "Bar", maxObjects: 800, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 54, object: "Bar", maxObjects: 800, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 55, object: "Bar", maxObjects: 800, type: "svgtransforms", description: "SVG with SVG Transformations", required: "svg"},
	{id: 56, object: "Bar", maxObjects: 800, type: "svganimations", description: "SVG with SVG Animations", required: "svg, smil"},
	{id: 57, object: "Bar", maxObjects: 800, type: "html", description: "HTML with CSS Transforms (3D)", required: "csstransforms"},
	{id: 58, object: "Bar", maxObjects: 800, type: "webgl", description: "Canvas (WebGL)", required: "canvas, webgl"},
	{id: 59, object: "Pie", maxObjects: 100, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 60, object: "Pie", maxObjects: 100, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 61, object: "Pie", maxObjects: 250, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 62, object: "Pie", maxObjects: 250, type: "svg", description: "SVG with attribute change", required: "svg"},
	{id: 63, object: "Pie", maxObjects: 1000, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 64, object: "Pie", maxObjects: 1000, type: "svg", description: "SVG with attribute chnage", required: "svg"},
	{id: 65, object: "Line", maxObjects: 20, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 66, object: "Line", maxObjects: 20, type: "svg", description: "SVG Transforms", required: "svg"},
	{id: 67, object: "Line", maxObjects: 50, type: "canvas", description: "Canvas 2D", required: "canvas"},
	{id: 68, object: "Line", maxObjects: 50, type: "svg", description: "SVG Transforms", required: "svg"},
	{id: 69, object: "Line", maxObjects: 100, type: "canvas", description: "Canvas 2D", required: "canvas"}, 
	{id: 70, object: "Line", maxObjects: 100, type: "svg", description: "SVG Transforms", required: "svg"},
	{id: 71, object: "Spinner", maxObjects: 48, type: "canvas", description: "Canvas 2D", required: "canvas", createIndividualElements: true},
	{id: 72, object: "Spinner", maxObjects: 48, type: "svg", description: "SVG Transforms", required: "svg", createIndividualElements: true},
	{id: 73, object: "Spinner", maxObjects: 48, type: "svganimations", description: "SVG Animation", required: "svg, smil", createIndividualElements: true},
	{id: 74, object: "Spinner", maxObjects: 48, type: "htmlanimation", description: "SVG with HTML Animation", required: "svg, cssanimations", createIndividualElements: true},
	{id: 75, object: "Spinner", maxObjects: 160, type: "canvas", description: "Canvas 2D", required: "canvas", createIndividualElements: true},
	{id: 76, object: "Spinner", maxObjects: 160, type: "svg", description: "SVG Transforms", required: "svg", createIndividualElements: true},
	{id: 77, object: "Spinner", maxObjects: 160, type: "svganimations", description: "SVG Animation", required: "svg, smil", createIndividualElements: true},
	{id: 78, object: "Spinner", maxObjects: 160, type: "htmlanimation", description: "SVG with HTML Animation", required: "svg, cssanimations", createIndividualElements: true},
	{id: 79, object: "Spinner", maxObjects: 360, type: "canvas", description: "Canvas 2D", required: "canvas", createIndividualElements: true},
	{id: 80, object: "Spinner", maxObjects: 360, type: "svg", description: "SVG Transforms", required: "svg", createIndividualElements: true},
	{id: 81, object: "Spinner", maxObjects: 360, type: "svganimations", description: "SVG Animation", required: "svg, smil", createIndividualElements: true},
	{id: 82, object: "Spinner", maxObjects: 360, type: "htmlanimation", description: "SVG with HTML Animation", required: "svg, cssanimations", createIndividualElements: true},
	{id: 83, object: "Sprite", maxObjects: 25, type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: "csstransforms, cssanimations"},
	{id: 84, object: "Sprite", maxObjects: 25, type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: "csstransforms"},
	{id: 85, object: "Sprite", maxObjects: 25, type: "htmlanimationsvg", description: "HTML with CSS Animations (Spritefile SVG)", required: "csstransforms, cssanimations, svg"},
	{id: 86, object: "Sprite", maxObjects: 25, type: "canvassvg", description: "Canvas 2D (Spritefile SVG)", required: "canvas, svg", imageAsset: "assets/sprites/sprite.svg"},
	{id: 87, object: "Sprite", maxObjects: 25, type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: "canvas", imageAsset: "assets/sprites/sprite.png"},
	{id: 88, object: "Sprite", maxObjects: 100, type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: "csstransforms, cssanimations"},
	{id: 89, object: "Sprite", maxObjects: 100, type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: "csstransforms"},
	{id: 90, object: "Sprite", maxObjects: 100, type: "htmlanimationsvg", description: "HTML with CSS Animations (Spritefile SVG)", required: "csstransforms, cssanimations, svg"},
	{id: 90, object: "Sprite", maxObjects: 100, type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: "canvas", imageAsset: "assets/sprites/sprite.png"},
	{id: 92, object: "Sprite", maxObjects: 250, type: "htmlanimation", description: "HTML with CSS Animations (Spritefile PNG)", required: "csstransforms, cssanimations"},
	{id: 93, object: "Sprite", maxObjects: 250, type: "backgroundposition", description: "HTML with background-position (Spritefile PNG)", required: "csstransforms"},
	{id: 94, object: "Sprite", maxObjects: 250, type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: "canvas", imageAsset: "assets/sprites/sprite.png"},
	{id: 95, object: "Sprite", maxObjects: 1000, type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: "canvas", imageAsset: "assets/sprites/sprite.png"},
	{id: 96, object: "Sprite", maxObjects: 5000, type: "canvas", description: "Canvas 2D (Spritefile PNG)", required: "canvas", imageAsset: "assets/sprites/sprite.png"},
	
];

