function Sprite(type) {
	var spriteHeight = 38, spriteWidth = 280/5, animationPhases = 4;
	var uid = generateUID(),
	speedMovement = 1+ Math.random()*4,
	framesPerPhase = 200 + Math.random()*200,
	y = Math.random()*(stageHeight - spriteHeight), x = 0
	currentAnimationPhase = 0, currentFrame = 0, animationDuration = 0.5 + Math.random()*2 + 's';
	
	//Methods: SVG/Dom Translate, Backgroundposiiton, cnavas, WEbgL

	switch(type) {
	

	
		case "htmlanimation":
		var domNode = document.createElement('div');
	
		domNode.style.width = spriteWidth + 'px';
		domNode.style.height = spriteHeight + 'px';
		
		domNode.style.top = y + 'px';
		domNode.style.left = x + 'px';
		domNode.style.overflow = "hidden";
		var domNodeInner = document.createElement('div');
		domNodeInner.style.background = "transparent url(assets/sprites/sprite.png)";
		domNodeInner.style.width = spriteWidth*5 + 'px';
		domNodeInner.style.height = spriteHeight + 'px';
		domNodeInner.style['-webkit-animation'] = "sprite " +animationDuration +" steps(5, end) infinite";
		domNodeInner.style['animation'] = "sprite "+animationDuration +" steps(5, end) infinite";
		domNode.appendChild(domNodeInner);
	
		domNode.id = uid;
		stage.appendChild(domNode);
		
		break;

		case "htmlanimationsvg":
		var domNode = document.createElement('div');
	
		domNode.style.width = spriteWidth + 'px';
		domNode.style.height = spriteHeight + 'px';
		
		domNode.style.top = y + 'px';
		domNode.style.left = x + 'px';
		domNode.style.overflow = "hidden";
		var domNodeInner = document.createElement('div');
		domNodeInner.style.background = "transparent url(assets/sprites/sprite.svg)";
		domNodeInner.style.width = spriteWidth*5 + 'px';
		domNodeInner.style.height = spriteHeight + 'px';
		domNodeInner.style['-webkit-animation'] = "sprite " +animationDuration +" steps(5, end) infinite";
		domNodeInner.style['animation'] = "sprite "+animationDuration +" steps(5, end) infinite";
		domNode.appendChild(domNodeInner);
	
		domNode.id = uid;
		stage.appendChild(domNode);
		
		break;
		
		case "backgroundposition":
		var domNode = document.createElement('div');
	
		domNode.style.width = spriteWidth + 'px';
		domNode.style.height = spriteHeight + 'px';
		
		domNode.style.top = y + 'px';
		domNode.style.left = x + 'px';
		domNode.style.overflow = "hidden";
		var domNodeInner = document.createElement('div');
		domNodeInner.style.background = "transparent url(assets/sprites/sprite.png)";
		domNodeInner.style.width = spriteWidth + 'px';
		domNodeInner.style.height = spriteHeight + 'px';

		domNode.appendChild(domNodeInner);
	
		domNode.id = uid;
		stage.appendChild(domNode);

		break;
	
		case "webgl":
		
		break;

	}
	

 this.draw = function() {
		++currentFrame;
		if (currentFrame > framesPerPhase) {
			++ currentAnimationPhase;
			
			if (currentAnimationPhase > animationPhases) {
				currentAnimationPhase = 0;
			}
			currentFrame = 0;
		}
		var nextX = x + speedMovement;
		if (nextX > (stageWidth-spriteWidth)) {
			nextX = 0;
		}
		switch (type) {
			case 'htmlanimation':
			case 'htmlanimationsvg':
			domNode.style[Modernizr.prefixed('transform')] = setTranslate(nextX,0);
			break;
			case 'backgroundposition':
			domNode.style[Modernizr.prefixed('transform')] = setTranslate(nextX,0);
			domNodeInner.style.backgroundPosition = currentAnimationPhase*spriteWidth+ 'px 0px';
			break;
			case 'webgl':
         
        	

         	break;
        	case 'canvas':
        	case 'canvassvg':
        	

        	context.drawImage(
	           imageAsset,
	           currentAnimationPhase*spriteWidth,
	           0,
	           spriteWidth,
	           spriteHeight,
	           nextX,
	           y,
	           spriteWidth,
	           spriteHeight);
    		 
        	
        	
	        
			break;
        }

        x = nextX;


	}
}