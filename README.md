Animation-Test-SVG-Canvas-CSS
=============================

A test suite to compare browser performance in animating things.

It tests various methods of animation:

* Canvas
* SVG
* HTML with CSS Transforms
* HTML with CSS Transitions
* HTML with CSS Animations
* HTML with absolute positioning
* 2D Canvas accelerated with WebGL

There are 7 testobjects with the following focus:

* Particle Animation (general animation performance)
* Bar Chart (general animation performance)
* Pie Chart (drawing performance)
* Line Chart (drawing performance)
* Spinner (animation performance)
* Sprite (bitmap / spriting 
* Filter (filter effects (work in progress))

The tests are demanding and you cause crashes or slowdowns, especially on mobile devices. If your device crashes on mobile, try to deactivate the WebGL tests.

The calculations for all tests are very similar regardless the type of animation.

Particle mostly based on http://www.themaninblue.com/writing/perspective/2010/03/22/

Accelerated WebGL based on pixi.js (http://www.pixijs.com/)

Browser detection based on Whichbrowser (https://github.com/NielsLeenheer/WhichBrowser)

Feature detection based on Modernizr (http://www.modernizr.com)



