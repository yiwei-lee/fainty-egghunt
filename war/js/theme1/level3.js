function level3() {
	var levelNumber = 3;
	
	var   b2Vec2 = Box2D.Common.Math.b2Vec2,  	
	b2AABB = Box2D.Collision.b2AABB,	
	b2BodyDef = Box2D.Dynamics.b2BodyDef,	
	b2Body = Box2D.Dynamics.b2Body,	
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,	
	b2Fixture = Box2D.Dynamics.b2Fixture,	
	b2World = Box2D.Dynamics.b2World,	
	b2MassData = Box2D.Collision.Shapes.b2MassData,	
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,	
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,	
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw,  	
	b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
	b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2Settings = Box2D.Common.b2Settings
	;

	var world = new b2World(
       	new b2Vec2(0, 10),    //gravity
      	true                  //allow sleep
    );

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;

	var bodyDef = new b2BodyDef;

	var width = $("#canvas").width();
	var height = $("#canvas").height();
	var SCALE = 50.0;
	

	// create floor ceiling and walls
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;

	fixDef.shape.SetAsBox(7.5, 1);
	bodyDef.position.Set(7.5, height / SCALE + 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE / 2, -1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.shape.SetAsBox(1, height / SCALE / 2);
	bodyDef.position.Set(-1, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE + 1, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	//borders vertical
	fixDef.shape.SetAsBox(0.01, 7/2);
	bodyDef.position.Set(1, 4.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//2ers
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(2, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(3, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(3, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(4, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(5, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(6, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(6, 6);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(7, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(7, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(8, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(8, 8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(9, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(10, 8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 2/2);
	bodyDef.position.Set(11, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(5, 5.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//1ers
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(5, 5.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(8, 3.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(9, 4.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(10, 1.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(10, 5.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(13, 7.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(14, 3.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(14, 0.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 1/2);
	bodyDef.position.Set(12, 8.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//3ers
	fixDef.shape.SetAsBox(0.01, 3/2);
	bodyDef.position.Set(12, 2.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 3/2);
	bodyDef.position.Set(14, 7.5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//rest 
	fixDef.shape.SetAsBox(0.01, 4/2);
	bodyDef.position.Set(11, 6);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(0.01, 8/2);
	bodyDef.position.Set(15, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//borders horizontal
	//1ers
	fixDef.shape.SetAsBox(1/2, 0.01);
	bodyDef.position.Set(9.5, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(1/2, 0.01);
	bodyDef.position.Set(13.5, 3);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(1/2, 0.01);
	bodyDef.position.Set(13.5, 4);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(1/2, 0.01);
	bodyDef.position.Set(1.5, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(1/2, 0.01);
	bodyDef.position.Set(12.5, 4);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//2ers
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(13, 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(14, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(9, 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(10, 4);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(13, 6);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(12, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(2/2, 0.01);
	bodyDef.position.Set(5, 7);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//3ers
	fixDef.shape.SetAsBox(3/2, 0.01);
	bodyDef.position.Set(3.5, 6);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(3/2, 0.01);
	bodyDef.position.Set(7.5, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(3/2, 0.01);
	bodyDef.position.Set(2.5, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	//rest 
	fixDef.shape.SetAsBox(4/2, 0.01);
	bodyDef.position.Set(13, 5);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(4/2, 0.01);
	bodyDef.position.Set(9, 6);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(4/2, 0.01);
	bodyDef.position.Set(10, 3);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	
	fixDef.shape.SetAsBox(6/2, 0.01);
	bodyDef.position.Set(4, 3);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(6/2, 0.01);
	bodyDef.position.Set(5, 4);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	fixDef.shape.SetAsBox(6/2, 0.01);
	bodyDef.position.Set(4, 8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	// create the circles 
	fixDef.filter.groupIndex = 1;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.45);//radius
	bodyDef.position.Set(0.5, 8.5);
	var circleBody0 = world.CreateBody(bodyDef);
	circleBody0.CreateFixture(fixDef);
	
	//create the candy
	fixDef.isSensor = true;
	//bonbon
	bodyDef.userData = 'bonbon';	
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.3, 0.2);
	bodyDef.position.Set(13, 0.5);
	var bonbon = world.CreateBody(bodyDef);
	bonbon.CreateFixture(fixDef); 
	var vertices = [];
	vertices.push(new b2Vec2(0.6, -0.2));
	vertices.push(new b2Vec2(0.25, 0));
	vertices.push(new b2Vec2(0.6, 0.2));
	fixDef.shape.SetAsVector(vertices, vertices.count);	
	bonbon.CreateFixture(fixDef); 
	var vertices = [];
	vertices.push(new b2Vec2(-0.6, -0.2));
	vertices.push(new b2Vec2(-0.25, 0));
	vertices.push(new b2Vec2(-0.6, 0.2));
	fixDef.shape.SetAsVector(vertices, vertices.count);	
	bonbon.CreateFixture(fixDef); 

	//lolly
	bodyDef.userData = 'lolly';	
	fixDef.shape = new b2CircleShape(0.25);
	bodyDef.position.Set(14.55, 8);
	var lolly = world.CreateBody(bodyDef);
	lolly.CreateFixture(fixDef);
	fixDef.shape = new b2PolygonShape;
	var center = new b2Vec2(-0.2,0.3);
	var angle = 0.17 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.025, 0.25, center, angle);
	lolly.CreateFixture(fixDef);
	
	//drop
	bodyDef.userData = 'drop';	
	fixDef.shape = new b2CircleShape(0.3);
	bodyDef.position.Set(1.5, 7.5);
	var drop = world.CreateBody(bodyDef);
	drop.CreateFixture(fixDef);
	fixDef.isSensor = false;

	//setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(1);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	intervalID = window.setInterval(update, 1000 / 60); //intervalID should be defined in js file that calls this levelX.js

	//mouse

	var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	var canvasPosition = getElementPosition(document.getElementById("canvas"));

	document.addEventListener("mousedown", function(e) {
		isMouseDown = true;
		handleMouseMove(e);
		document.addEventListener("mousemove", handleMouseMove, true);
		//$("#debug").append("<br/>vertices.push(new b2Vec2(" + mouseX + ", " + mouseY + "));");
	}, true);

	document.addEventListener("mouseup", function() {
		document.removeEventListener("mousemove", handleMouseMove, true);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
	}, true);

	function handleMouseMove(e) {
		mouseX = (e.clientX - canvasPosition.x) / SCALE;
		mouseY = (e.clientY - canvasPosition.y) / SCALE;
	};

	function getBodyAtMouse() {
		mousePVec = new b2Vec2(mouseX, mouseY);
		var aabb = new b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

	    // Query the world for overlapping shapes.

	    selectedBody = null;
	    world.QueryAABB(getBodyCB, aabb);
	    // if(selectedBody == circleBody0 || selectedBody == circleBody1 || selectedBody == circleBody2)
	    // 	return null;
	    // else
	    	return selectedBody;
	}

	function getBodyCB(fixture) {
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
				selectedBody = fixture.GetBody();
				return false;
			}
		}
		return true;
	}

	//touch
	canvas = document.getElementById('canvas');
	
	canvas.addEventListener('touchstart', function(event) {
		isMouseDown = true;
		var touch = event.changedTouches[0];
		mouseX = (touch.pageX - canvasPosition.x) / SCALE;
		mouseY = (touch.pageY - canvasPosition.y) / SCALE;
			//alert("Touch x:" + touch.pageX + ", y:" + touch.pageY + ',len='+event.touches.length);
		}, false);

	canvas.addEventListener('touchend', function(event) {
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
			//alert('Tend' + event.touches.length);			
		}, false);


	canvas.addEventListener('touchmove', function(event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		mouseX = (touch.pageX - canvasPosition.x) / SCALE;
		mouseY = (touch.pageY - canvasPosition.y) / SCALE;
			//alert("MOve - Touch x:" + touch.pageX + ", y:" + touch.pageY);
		}, false);

	// collision detection
	var destroy_list = [];
	var colListener = new Box2D.Dynamics.b2ContactListener();
	var collectedCandy = new Array("0","0","0");
	
	colListener.BeginContact = function(contact) {
		 var fxA=contact.GetFixtureA();
		 var fxB=contact.GetFixtureB();
		 sA=fxA.IsSensor();
		 sB=fxB.IsSensor();
		 if((sA && !sB) || (sB && !sA))	{
			 if(sA)	{

				 destroy_list.push(contact.GetFixtureA().GetBody());

				 // make collected candy colorful
				 colorCandy(contact.GetFixtureA().GetBody().GetUserData());
				 
			 }
			 else	{

				 destroy_list.push(contact.GetFixtureB().GetBody());

				 // make collected candy colorful
				 colorCandy(contact.GetFixtureB().GetBody().GetUserData());
			 }
		 }
	 }	
	world.SetContactListener(colListener);

	
	
	//update
	var basketAABB = new b2AABB;
	basketAABB.lowerBound = new b2Vec2(15.5, 7.5);
	basketAABB.upperBound = new b2Vec2(16, 9);
	var bodies = [];
	var gameOver = false;
	function update() {

		if(isMouseDown && (!mouseJoint)) {
			var body = getBodyAtMouse();
			if(body) {
				var md = new b2MouseJointDef();
				md.bodyA = world.GetGroundBody();
				md.bodyB = body;
				md.target.Set(mouseX, mouseY);
				md.collideConnected = true;
				md.maxForce = 300.0 * body.GetMass();
				mouseJoint = world.CreateJoint(md);
				body.SetAwake(true);
			}
		}

		if(mouseJoint) {
			if(isMouseDown) {
				mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
			} else {
				world.DestroyJoint(mouseJoint);
				mouseJoint = null;
			}
		}

		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();

		world.QueryAABB(testIfEggsAreInBasket, basketAABB);
 
		// Destroy all bodies in destroy_list
		for (var i in destroy_list) {
			world.DestroyBody(destroy_list[i]);
		}
		// Reset the array
		destroy_list.length = 0;
    };

    function testIfEggsAreInBasket(fixture) {
    	
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			
			if(fixture.GetBody() == circleBody0) {
				if(bodies.indexOf(fixture.GetBody()) <= -1)
					bodies.push(fixture.GetBody());
				
				if(bodies.length >= 1 && !gameOver) {
					levelFinished();
					saveCollectedCandy();
					
					gameOver = true;
				}
				return true;
			}
		}
		return true;
	}

	function saveCollectedCandy() {
		var collectedCandyString = localStorage.collectedCandy;
		if(collectedCandyString != null) {
			var collectedCandyAllLevels = JSON.parse(collectedCandyString);
		}
		else {
			var collectedCandyAllLevels = new Array();
		}
		collectedCandyAllLevels[levelNumber-1] = JSON.stringify(collectedCandy);
		localStorage.collectedCandy = JSON.stringify(collectedCandyAllLevels);
	}
    
	//helpers

	//http://js-tut.aardon.de/js-tut/tutorial/position.html
	function getElementPosition(element) {
		var elem=element, tagname="", x=0, y=0;

		while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
			y += elem.offsetTop;
			x += elem.offsetLeft;
			tagname = elem.tagName.toUpperCase();

			if(tagname == "BODY")
				elem=0;

			if(typeof(elem) == "object") {
				if(typeof(elem.offsetParent) == "object")
					elem = elem.offsetParent;
			}
		}

		return {x: x, y: y};
	}


};


