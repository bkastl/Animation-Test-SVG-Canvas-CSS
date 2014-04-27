function Sprite(type) {
	var spriteHeight = 38, spriteWidth = 280/5, animationPhases = 4;
	var uid = generateUID(),
	speedMovement = 1+ Math.random()*4,
	framesPerPhase = 3000 + Math.random()*1000,
	y = Math.random()*(stageHeight - spriteHeight), x = 0
	currentAnimationPhase = 0, currentFrame = 0, animationDuration = 0.5 + Math.random()*2 + 's';
	
	

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
		var spriteFrames = ["sprite__01.png","sprite__02.png","sprite__03.png","sprite__04.png","sprite__05.png"];
		var el = PIXI.Sprite.fromFrame(spriteFrames[0]);
		el.position.x = 0;
		el.position.y = y
		context.addChild(el);
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
			
        	case 'canvas':
        	case 'canvassvg':
        	case 'canvasbuffer':
        	

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
			case "webgl":
				el.setTexture(PIXI.Texture.fromFrame('sprite__0'+(currentAnimationPhase+1)+'.png'))
				el.position.x = nextX;

			break;
        }

        x = nextX;


	}
}