function level8() {
	var levelNumber = 8;
	
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

	fixDef.shape.SetAsBox(width / SCALE / 2, 1);
	bodyDef.position.Set(width / SCALE / 2, height / SCALE + 1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE / 2, -1);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.shape.SetAsBox(1, height / SCALE / 2);
	bodyDef.position.Set(-1, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE + 1, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.filter.groupIndex = 1;
	fixDef.shape = new b2PolygonShape;
	var vertices = [];
	vertices.push(new b2Vec2(0.04, 2.04));
	vertices.push(new b2Vec2(4.08, 3.68));
	vertices.push(new b2Vec2(0, 6));
	fixDef.shape.SetAsVector(vertices, vertices.count);
	bodyDef.position.Set(0,0);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.filter.groupIndex = 1;
	fixDef.shape = new b2PolygonShape;
	var vertices = [];
	vertices.push(new b2Vec2(-0.08, 7.2));
	vertices.push(new b2Vec2(6.3, 3.52));
	vertices.push(new b2Vec2(6.3, 9));
	vertices.push(new b2Vec2(-0.08, 9.24));

	fixDef.shape.SetAsVector(vertices, vertices.count);
	bodyDef.position.Set(0,0);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	//create basket
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(1, 0.125);
	bodyDef.position.Set(15, 2.5);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef); 
	var center = new b2Vec2(-1.25,-0.3);
	var angle = 0.75 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.125, 0.5, center, angle);
	body1.CreateFixture(fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(1.5, 0.125);
	bodyDef.position.Set(14.5, 5);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef); 
	var center = new b2Vec2(-1.75,-0.3);
	var angle = 0.75 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.125, 0.5, center, angle);
	body1.CreateFixture(fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(2, 0.125);
	bodyDef.position.Set(14, 7.5);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef); 
	var center = new b2Vec2(-2.25,-0.3);
	var angle = 0.75 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.125, 0.5, center, angle);
	body1.CreateFixture(fixDef);

	// create the bolts
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(3.68, 4.4);
	var anchorBody = world.CreateBody(bodyDef);
	anchorBody.CreateFixture(fixDef);

	fixDef.filter.groupIndex = 1;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	var center = new b2Vec2(0,0);
	var angle = 0.5 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.25, 1, center, angle);
	bodyDef.position.Set(2.98, 4.9);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef);

	def = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
	def.bodyA = anchorBody;
	def.bodyB = body1;
	def.localAxisA = new b2Vec2(0.1,-0.06);
	def.referenceAngle = 0.83 * b2Settings.b2_pi;
	def.localAnchorA = new b2Vec2(0,0);
	def.localAnchorB = new b2Vec2(0,0);
	def.enableLimit = true;
	def.lowerTranslation = -5/SCALE;
	def.upperTranslation = 5/SCALE; 
	var joint = world.CreateJoint(def);
	
	// create the circles
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(0.58, 1.54);
	var circleBody0 = world.CreateBody(bodyDef);
	circleBody0.CreateFixture(fixDef);

	bodyDef.position.Set(1.7, 2.04);
	var circleBody1 = world.CreateBody(bodyDef);
	circleBody1.CreateFixture(fixDef);

	bodyDef.position.Set(2.92, 2.58);
	var circleBody2 = world.CreateBody(bodyDef);
	circleBody2.CreateFixture(fixDef);

	//create the candy
	fixDef.isSensor = true;
	//bonbon
	bodyDef.userData = 'bonbon';	
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.3, 0.2);
	bodyDef.position.Set(14.68, 1.58);
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
	bodyDef.position.Set(13.68, 4.06);
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
	bodyDef.position.Set(12.68, 6.64);
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
	    if(selectedBody == circleBody0 || selectedBody == circleBody1 || selectedBody == circleBody2)
	    	return null;
	    else
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
	var basketAABB1 = new b2AABB;
	basketAABB1.lowerBound = new b2Vec2(13.74, 1.3);
	basketAABB1.upperBound = new b2Vec2(16, 2.42);
	var basketAABB2 = new b2AABB;
	basketAABB2.lowerBound = new b2Vec2(13.2, 4.14);
	basketAABB2.upperBound = new b2Vec2(16, 5);
	var basketAABB3 = new b2AABB;
	basketAABB3.lowerBound = new b2Vec2(12.14, 6.9);
	basketAABB3.upperBound = new b2Vec2(16, 7.44);
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

		world.QueryAABB(testIfEggsAreInBasket, basketAABB1);
		world.QueryAABB(testIfEggsAreInBasket, basketAABB2);
		world.QueryAABB(testIfEggsAreInBasket, basketAABB3);
 
		// Destroy all bodies in destroy_list
		for (var i in destroy_list) {
			world.DestroyBody(destroy_list[i]);
		}
		// Reset the array
		destroy_list.length = 0;
    };

    function testIfEggsAreInBasket(fixture) {
    	//$("#debug").append("<br/>Here" + fixture.GetBody().GetWorldCenter().x + "_" +  fixture.GetBody().GetWorldCenter().y);
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			
			if(fixture.GetBody() == circleBody0 || fixture.GetBody() == circleBody1 || fixture.GetBody() == circleBody2) {
				if(bodies.indexOf(fixture.GetBody()) <= -1) {
					bodies.push(fixture.GetBody());
				}
				
				if(bodies.length >= 3 && !gameOver) {
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


