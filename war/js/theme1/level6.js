function level6() {

	var levelNumber = 6;
	
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
	b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
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
	bodyDef.position.Set(2, height / SCALE + 0.75);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE / 2, -0.75);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	fixDef.shape.SetAsBox(1, height / SCALE / 2);
	bodyDef.position.Set(-0.75, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	bodyDef.position.Set(width / SCALE + 0.75, height / SCALE / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);


	
	// create some circles
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(1.5, 5.5);
	var anchorBody0 = world.CreateBody(bodyDef);
	anchorBody0.CreateFixture(fixDef); 

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(1);//radius
	bodyDef.position.Set(1.5, 5.5);
	var circleBody0 = world.CreateBody(bodyDef);
	circleBody0.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(4, 5.5);
	var anchorBody1 = world.CreateBody(bodyDef);
	anchorBody1.CreateFixture(fixDef); 

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(1);//radius
	bodyDef.position.Set(4, 5.5);
	var circleBody1 = world.CreateBody(bodyDef);
	circleBody1.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(6.5, 5.5);
	var anchorBody2 = world.CreateBody(bodyDef);
	anchorBody2.CreateFixture(fixDef); 

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(1);//radius
	bodyDef.position.Set(6.5, 5.5);
	var circleBody2 = world.CreateBody(bodyDef);
	circleBody2.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(2.75, 6.4);
	var anchorBody3 = world.CreateBody(bodyDef);
	anchorBody3.CreateFixture(fixDef); 

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(2.75, 6.4);
	var circleBody3 = world.CreateBody(bodyDef);
	circleBody3.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.01, 0.01);
	bodyDef.position.Set(5.25, 6.4);
	var anchorBody4 = world.CreateBody(bodyDef);
	anchorBody4.CreateFixture(fixDef); 

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(5.25, 6.4);
	var circleBody4 = world.CreateBody(bodyDef);
	circleBody4.CreateFixture(fixDef);

	//Joints

	var revJointDef = new b2RevoluteJointDef;
	revJointDef.Initialize(anchorBody0, circleBody0, new b2Vec2(1.5, 5.5));
	revJointDef.maxMotorTorque = 10.0; // motor is to have friction in the joint
	revJointDef.motorSpeed = 0.0;
	revJointDef.enableMotor = true;
	var revJoint0 = world.CreateJoint(revJointDef);

	revJointDef.Initialize(anchorBody1, circleBody1, new b2Vec2(4,5.5));
	var revJoint1 = world.CreateJoint(revJointDef);

	revJointDef.Initialize(anchorBody2, circleBody2, new b2Vec2(6.5,5.5));
	var revJoint2 = world.CreateJoint(revJointDef);

	revJointDef.Initialize(anchorBody3, circleBody3, new b2Vec2(2.75, 6.4));
	var revJoint3 = world.CreateJoint(revJointDef);

	revJointDef.Initialize(anchorBody4, circleBody4, new b2Vec2(5.25, 6.4));
	var revJoint4 = world.CreateJoint(revJointDef);

	def = new Box2D.Dynamics.Joints.b2GearJointDef();
	def.bodyA = circleBody0;
	def.bodyB = circleBody3;
	def.joint1 = revJoint0;
	def.joint2 = revJoint3;
	def.ratio = 0.5;
	world.CreateJoint(def);

	def.bodyA = circleBody3;
	def.bodyB = circleBody1;
	def.joint1 = revJoint3;
	def.joint2 = revJoint1;
	def.ratio = 2;
	world.CreateJoint(def);

	def.bodyA = circleBody1;
	def.bodyB = circleBody4;
	def.joint1 = revJoint1;
	def.joint2 = revJoint4;
	def.ratio = 0.5;
	world.CreateJoint(def);

	def.bodyA = circleBody4;
	def.bodyB = circleBody2;
	def.joint1 = revJoint4;
	def.joint2 = revJoint2;
	def.ratio = 2;
	world.CreateJoint(def);

	//create basket
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(2, 0.25);
	bodyDef.position.Set(2.16, 4.2);
	var basketBody = world.CreateBody(bodyDef);
	basketBody.CreateFixture(fixDef); 
	var center = new b2Vec2(-2,-1.5);
	var angle = 0 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.25, 1.5, center, angle);
	basketBody.CreateFixture(fixDef);
	var center = new b2Vec2(2,-0.2);
	var angle = 0 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.25, 0.2, center, angle);
	basketBody.CreateFixture(fixDef);

	//create obstacle
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.25, 1.5);
	bodyDef.position.Set(9.4, 1.6);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef); 

	// create the circles

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(1.06, 3.4);
	var eggBody0 = world.CreateBody(bodyDef);
	eggBody0.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(1.06, 3.4);
	var eggBody1 = world.CreateBody(bodyDef);
	eggBody1.CreateFixture(fixDef);

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(1.06, 3.4);
	var eggBody2 = world.CreateBody(bodyDef);
	eggBody2.CreateFixture(fixDef);

	//create the candy
	fixDef.isSensor = true;
	//bonbon
	bodyDef.userData = 'bonbon';	
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.3, 0.2);
	bodyDef.position.Set(7.52, 2);
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
	bodyDef.position.Set(5.24, 2);
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
	bodyDef.position.Set(14.88, 7.1);
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
	    if(selectedBody == eggBody0 || selectedBody == eggBody1 || selectedBody == eggBody2 || selectedBody == basketBody)
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
			if(sA && contact.GetFixtureB().GetBody() != basketBody)	{

				destroy_list.push(contact.GetFixtureA().GetBody());

				// make collected candy colorful
				colorCandy(contact.GetFixtureA().GetBody().GetUserData());
				 
			}
			else if(sB && contact.GetFixtureA().GetBody() != basketBody) {

				destroy_list.push(contact.GetFixtureB().GetBody());

				// make collected candy colorful
				colorCandy(contact.GetFixtureB().GetBody().GetUserData());
			}
		 }
	 }	
	world.SetContactListener(colListener);

	
	
	//update
	var basketAABB = new b2AABB;
	basketAABB.lowerBound = new b2Vec2(10, 9);
	basketAABB.upperBound = new b2Vec2(15.6, 10.7);
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
    	//$("#debug").append("<br/>Here" + fixture.GetBody().GetWorldCenter().x + "_" +  fixture.GetBody().GetWorldCenter().y);
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			
			if(fixture.GetBody() == eggBody0 || fixture.GetBody() == eggBody1 || fixture.GetBody() == eggBody2) {
				if(bodies.indexOf(fixture.GetBody()) <= -1)
					bodies.push(fixture.GetBody());
				
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


