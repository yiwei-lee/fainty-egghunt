var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.10250011086463928,"y":0.7562500238418579},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":-0.10500004887580872,"y":0.8012499809265137}],[{"x":0.8175000548362732,"y":0.1312500238418579},{"x":0.877500057220459,"y":0.09375},{"x":1.127500057220459,"y":0.09375},{"x":1.127500057220459,"y":0.13124993443489075}],[{"x":0.3199997842311859,"y":0.6762498617172241},{"x":0.3674997389316559,"y":0.7687499523162842},{"x":0.21499976515769958,"y":0.6437499523162842}],[{"x":0.21499976515769958,"y":0.6437499523162842},{"x":0.33749979734420776,"y":0.6062499284744263},{"x":0.3199997842311859,"y":0.6762498617172241}],[{"x":0.21499976515769958,"y":0.6437499523162842},{"x":0.2524997591972351,"y":0.48124998807907104},{"x":0.3999997675418854,"y":0.4112500250339508},{"x":0.45499998331069946,"y":0.4737499952316284},{"x":0.4324997663497925,"y":0.5587499141693115},{"x":0.33749979734420776,"y":0.6062499284744263}],[{"x":0.7350000143051147,"y":0.5462499856948853},{"x":0.7100001573562622,"y":0.4287501871585846},{"x":0.8474999666213989,"y":0.5537500381469727}],[{"x":0.8474999666213989,"y":0.5537500381469727},{"x":0.8700001239776611,"y":0.6687500476837158},{"x":0.8300001621246338,"y":0.7562501430511475},{"x":0.7125002145767212,"y":0.7487500905990601},{"x":0.6400001049041748,"y":0.661250114440918},{"x":0.6725001335144043,"y":0.5962501764297485},{"x":0.7350000143051147,"y":0.5462499856948853}],[{"x":0.5725000500679016,"y":0.43125003576278687},{"x":0.49750012159347534,"y":0.35875004529953003},{"x":0.5750001072883606,"y":0.2787500321865082},{"x":0.6550000309944153,"y":0.3562500476837158}]],"circles":[{"cx":0.5024999380111694,"cy":0.6737500429153442,"r":0.043156638741493225},{"cx":0.7799999713897705,"cy":0.2862499952316284,"r":0.04160814359784126},{"cx":0.5600000619888306,"cy":0.5437500476837158,"r":0.04930773004889488},{"cx":0.36249980330467224,"cy":0.29875004291534424,"r":0.05062120780348778}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.10500004887580872,"y":0.8012499809265137},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":-0.10250011086463928,"y":0.7562500238418579}]},{"type":"POLYGON","vertices":[{"x":0.8175000548362732,"y":0.1312500238418579},{"x":0.877500057220459,"y":0.09375},{"x":1.127500057220459,"y":0.09375},{"x":1.127500057220459,"y":0.13124993443489075}]},{"type":"CIRCLE","vertices":[{"x":0.5024999380111694,"y":0.6737500429153442},{"x":0.544999897480011,"y":0.6662501096725464}]},{"type":"CIRCLE","vertices":[{"x":0.7799999713897705,"y":0.2862499952316284},{"x":0.8024996519088745,"y":0.2512499690055847}]},{"type":"CIRCLE","vertices":[{"x":0.5600000619888306,"y":0.5437500476837158},{"x":0.5850002765655518,"y":0.501250147819519}]},{"type":"CIRCLE","vertices":[{"x":0.36249980330467224,"y":0.29875004291534424},{"x":0.3899998068809509,"y":0.25624996423721313}]},{"type":"POLYGON","vertices":[{"x":0.3674997389316559,"y":0.7687499523162842},{"x":0.21499976515769958,"y":0.6437499523162842},{"x":0.2524997591972351,"y":0.48124998807907104},{"x":0.3999997675418854,"y":0.4112500250339508},{"x":0.45499998331069946,"y":0.4737499952316284},{"x":0.4324997663497925,"y":0.5587499141693115},{"x":0.33749979734420776,"y":0.6062499284744263},{"x":0.3199997842311859,"y":0.6762498617172241}]},{"type":"POLYGON","vertices":[{"x":0.7125002145767212,"y":0.7487500905990601},{"x":0.6400001049041748,"y":0.661250114440918},{"x":0.6725001335144043,"y":0.5962501764297485},{"x":0.7350000143051147,"y":0.5462499856948853},{"x":0.7100001573562622,"y":0.4287501871585846},{"x":0.8474999666213989,"y":0.5537500381469727},{"x":0.8700001239776611,"y":0.6687500476837158},{"x":0.8300001621246338,"y":0.7562501430511475}]},{"type":"POLYGON","vertices":[{"x":0.5725000500679016,"y":0.43125003576278687},{"x":0.49750012159347534,"y":0.35875004529953003},{"x":0.5750001072883606,"y":0.2787500321865082},{"x":0.6550000309944153,"y":0.3562500476837158}]}]}],"dynamicObjects":[]}');

var grounds = [1, 1, 1, 1];
var level_dynamic_obj = [];
var level_collectable_obj = [];
var level_collectable_score = [];
var startBody;
var endBody;

var start_impulse = [0, 15];

function loadLevel(world) {
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2AABB = Box2D.Collision.b2AABB,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
        b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;

    var fixDef = new b2FixtureDef;
    var bodyDef = new b2BodyDef;

    // Create grounds;
    fixDef.density = 1.0;
    fixDef.friction = 0.8;
    fixDef.restitution = 0.2;
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 2);
    bodyDef.position.Set(10, 16.8);
    if (grounds[0] == 1)
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(10, -1.8);
    if (grounds[1] == 1)
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    fixDef.shape.SetAsBox(2, 14);
    bodyDef.position.Set(-1.8, 13);
    if (grounds[2] == 1)
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(28.5, 13);
    if (grounds[3] == 1)
        world.CreateBody(bodyDef).CreateFixture(fixDef);

    // Load static scene;
    fixDef.density = 1.0;
    fixDef.friction = 0.8;
    fixDef.restitution = 0.2;
    fixDef.shape = new b2PolygonShape;
    bodyDef.type = b2Body.b2_staticBody;
    polygons = level_js.rigidBodies[0].polygons;
    for (var i = 0; i < polygons.length; i++) {
        var points = [];
        for (var j = 0; j < polygons[i].length; j++) {
            var vec = new b2Vec2();
            vec.Set(polygons[i][j].x * canvas.width / 30, (canvas.height - polygons[i][j].y * canvas.height) / 30);
            points[j] = vec;
        }
        points = points.reverse();
        fixDef.shape.SetAsArray(points, points.length);
        bodyDef.position.Set(0, 0);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    }

    fixDef.density = 0.9;
    fixDef.friction = 0.001;
    fixDef.restitution = 0.0;
    bodyDef.type = b2Body.b2_dynamicBody;

    for (var i = 0; i < 1; ++i) {
        fixDef.shape = new b2CircleShape(0.5);
        bodyDef.position.x = 1;
        bodyDef.position.y = 1;
        var body = startBody = world.CreateBody(bodyDef);
        level_dynamic_obj.push(body);
        body.CreateFixture(fixDef);
    }

    bodyDef.type = b2Body.b2_staticBody;
    fixDef.isSensor = true;
    fixDef.shape = new b2CircleShape(0.75);
    circles = level_js.rigidBodies[0].circles;
    for (var i = 0; i < circles.length; i++) {
        bodyDef.position.x = circles[i].cx * 800 / 30;
        bodyDef.position.y = (1.0 - circles[i].cy) * 450 / 30;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        level_collectable_obj.push(body);
        level_collectable_score.push(1);
    }

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(1, 1);
    bodyDef.position.x = 750 / 30;
    bodyDef.position.y = 350 / 30;
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);
    endBody = body;
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

var currentAnim = null;
var isStarted = false;

function level7() {
    cancelAnimationFrame(currentAnim);

    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2AABB = Box2D.Collision.b2AABB,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
        b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
        b2ContactListener = Box2D.Dynamics.b2ContactListener;

    var canvas = document.getElementById('canvas'),
        ctxCanvas = canvas.getContext('2d');

    var draw = document.getElementById('draw'),
        ctxDraw = draw.getContext('2d');

    var draggingObj;
    var startX, startY, lastX, lastY,
        scaledPoints = [],
        objPoints = [],
        toDestroy = [];

    var world = new b2World(new b2Vec2(0, 10), true);

    var fixDef = new b2FixtureDef;
    var bodyDef = new b2BodyDef;

    var level_complete = false;
    var score = 0;

    var listener = new b2ContactListener;
    listener.BeginContact = function(c) {
        var bodyA = c.GetFixtureA().GetBody();
        var bodyB = c.GetFixtureB().GetBody();
        if (bodyA == startBody && level_collectable_obj.indexOf(bodyB) != -1) {
            score += level_collectable_score[level_collectable_obj.indexOf(bodyB)];
            toDestroy.push(bodyB);
        } else if (bodyB == startBody && level_collectable_obj.indexOf(bodyA) != -1) {
            score += level_collectable_score[level_collectable_obj.indexOf(bodyA)];
            toDestroy.push(bodyA);
        } else if (bodyA == startBody && bodyB == endBody) {
            level_complete = true;
        } else if (bodyB == startBody && bodyA == endBody) {
            level_complete = true;
        }
    }
    world.SetContactListener(listener);

    loadLevel(world);

    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctxCanvas);
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    //mouse

    var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
    var canvasPosition = getElementPosition(canvas);

    function addMultipleEventListener(el, s, fn) {
        var evts = s.split(' ');
        for (var i = 0, iLen = evts.length; i < iLen; i++) {
            el.addEventListener(evts[i], fn, false);
        }
    }

    addMultipleEventListener(canvas, "mousedown touchstart", function(e) {
        e.preventDefault();
        draggingObj = null;
        isMouseDown = true;
        draw.width = draw.width;

        ctxDraw.strokeStyle = "#0f0"; // red

        if (e.type.charAt(0) == "m") {
            mouseX = (e.clientX - canvasPosition.x) / 30;
            mouseY = (e.clientY - canvasPosition.y) / 30;
        } else if (e.type.charAt(0) == "t") {
            var touch = e.changedTouches[0];
            mouseX = (touch.pageX - canvasPosition.x) / 30;
            mouseY = (touch.pageY - canvasPosition.y) / 30;
        }
        draggingObj = getBodyAtMouse();

        // handleMouseMove(e);
        addMultipleEventListener(canvas, "mousemove touchmove", handleMouseMove);

        // if (level_dynamic_obj.indexOf(draggingObj) == -1) {}
        if (draggingObj) {
            if (e.type == "mousedown") {
                startX = e.clientX - canvasPosition.x;
                startY = e.clientY - canvasPosition.y;
            } else if (e.type == "touchstart") {
                var touch = e.changedTouches[0];
                mouseX = (touch.pageX - canvasPosition.x) / 30;
                mouseY = (touch.pageY - canvasPosition.y) / 30;
            }
            return;
        } else {
            if (e.type == "mousedown") {
                ctxDraw.beginPath();
                ctxDraw.moveTo(e.clientX - canvasPosition.x, e.clientY - canvasPosition.y);
                startX = lastX = e.clientX - canvasPosition.x;
                startY = lastY = e.clientY - canvasPosition.y;
            } else if (e.type == "touchstart") {
                var touch = e.changedTouches[0];
                ctxDraw.beginPath();
                ctxDraw.moveTo(touch.pageX - canvasPosition.x, touch.pageY - canvasPosition.y);
                startX = lastX = touch.pageX - canvasPosition.x;
                startY = lastY = touch.pageY - canvasPosition.y;
            }
            scaledPoints = [];
            objPoints = [];
            objPoints.push({
                x: lastX,
                y: lastY
            });
        }
    });

    function applyImpulse(body, degree, power, timeout) {
        setTimeout(function() {
            body.ApplyImpulse(new b2Vec2(Math.cos(degree * (Math.PI / 180)) * power,
                    Math.sin(degree * (Math.PI / 180)) * power),
                body.GetWorldCenter());
        }, timeout);
    }

    addMultipleEventListener(canvas, "mouseup touchend", function(e) {
        e.preventDefault();
        canvas.removeEventListener("mousemove", handleMouseMove, false);
        canvas.removeEventListener("touchmove", handleMouseMove, false);
        isMouseDown = false;
        mouseX = undefined;
        mouseY = undefined;
        if (e.type == "mouseup") {
            distX = startX - e.clientX + canvasPosition.x;
            distY = startY - e.clientY + canvasPosition.y;
        } else if (e.type == "touchend") {
            var touch = e.changedTouches[0];
            distX = startX - touch.pageX + canvasPosition.x;
            distY = startY - touch.pageY + canvasPosition.y;
        }
        if (!draggingObj) {
            for (var i = 0; i < objPoints.length; i++) {
                scaledPoints.push(new b2Vec2((objPoints[i].x) / 30, (objPoints[i].y) / 30));
            }

            var fixDef;
            var bodyDef = new b2BodyDef;
            bodyDef.type = b2Body.b2_staticBody;
            bodyDef.position.Set(0, 0);
            var body = world.CreateBody(bodyDef);

            draw.width = draw.width;
            // Too little movement and not enough to draw a shape.
            if (objPoints.length < 3) {
                return;
            }
            // Drawing the shape.
            if (distX * distX + distY * distY > 6400) {
                // Draw as line; Ok just forget it.
                for (var i = 0; i < scaledPoints.length - 1; i++) {
                    line = new b2PolygonShape;
                    line.SetAsEdge(scaledPoints[i], scaledPoints[i + 1]);
                    fixDef = new b2FixtureDef;
                    fixDef.density = 1.0;
                    fixDef.restitution = 0.001;
                    fixDef.friction = 0.001;
                    fixDef.shape = line;
                    body.CreateFixture(fixDef);
                }
            } else {
                // Draw as polygon;
                ctxDraw.closePath();
                ctxDraw.stroke();
                var boxShape = new b2PolygonShape();

                // Turn the order of vertices to CCW;
                if (ClockWise(scaledPoints) === CLOCKWISE) {
                    scaledPoints.reverse();
                }

                // If the shape is concave, we need to triangulate it;
                if (Convex(scaledPoints) === CONCAVE) {
                    var tmpBodies = process(scaledPoints);
                    if (tmpBodies != null) {
                        for (var i = 0; i < tmpBodies.length; i = i + 3) {
                            triangle = new b2PolygonShape;
                            triangle.SetAsArray(new Array(tmpBodies[i], tmpBodies[i + 1], tmpBodies[i + 2]))
                            fixDef = new b2FixtureDef;
                            fixDef.density = 1.0;
                            fixDef.friction = 0.8;
                            fixDef.restitution = 0.7;
                            fixDef.shape = triangle;
                            body.CreateFixture(fixDef);
                        }
                    } else { //It probably interacts with it self;
                        draw.width = draw.width;
                    }
                } else {
                    shape = new b2PolygonShape;
                    shape.SetAsArray(scaledPoints)
                    fixDef = new b2FixtureDef;
                    fixDef.density = 1.0;
                    fixDef.friction = 0.8;
                    fixDef.restitution = 0.7;
                    fixDef.shape = shape;
                    body.CreateFixture(fixDef);
                }
            }
        } else {
            if (distX * distX + distY * distY < 100) {
                // toDestroy.push(draggingObj);
                if (draggingObj == startBody && !isStarted) {
                    isStarted = true;
                    applyImpulse(startBody, start_impulse[0], start_impulse[1], 250);
                }
            }
        }
    }, true);

    function handleMouseMove(e) {
        e.preventDefault();
        if (e.type.charAt(0) == "m") {
            if (!draggingObj) {
                var dist_x = e.clientX - canvasPosition.x - lastX;
                var dist_y = e.clientY - canvasPosition.y - lastY;
                if (dist_x * dist_x + dist_y * dist_y > 100) {
                    ctxDraw.lineTo(e.clientX - canvasPosition.x, e.clientY - canvasPosition.y);
                    ctxDraw.stroke();
                    lastX = e.clientX - canvasPosition.x;
                    lastY = e.clientY - canvasPosition.y;
                    objPoints.push({
                        x: lastX,
                        y: lastY
                    });
                }
            }
            mouseX = (e.clientX - canvasPosition.x) / 30;
            mouseY = (e.clientY - canvasPosition.y) / 30;
        } else if (e.type.charAt(0) == "t") {
            var touch = e.changedTouches[0];
            if (!draggingObj) {
                var dist_x = touch.pageX - canvasPosition.x - lastX;
                var dist_y = touch.pageY - canvasPosition.y - lastY;
                if (dist_x * dist_x + dist_y * dist_y > 100) {
                    ctxDraw.lineTo(touch.pageX - canvasPosition.x, touch.pageY - canvasPosition.y);
                    ctxDraw.stroke();
                    lastX = touch.pageX - canvasPosition.x;
                    lastY = touch.pageY - canvasPosition.y;
                    objPoints.push({
                        x: lastX,
                        y: lastY
                    });
                }
            }
            mouseX = (touch.pageX - canvasPosition.x) / 30;
            mouseY = (touch.pageY - canvasPosition.y) / 30;
        }
    };

    function getBodyAtMouse() {
        mousePVec = new b2Vec2(mouseX, mouseY);
        var aabb = new b2AABB();
        aabb.lowerBound.Set(mouseX - 0.01, mouseY - 0.01);
        aabb.upperBound.Set(mouseX + 0.01, mouseY + 0.01);

        // Query the world for overlapping shapes.

        selectedBody = null;
        world.QueryAABB(getBodyCB, aabb);
        return selectedBody;
    }

    function getBodyCB(fixture) {
        if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
            if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                selectedBody = fixture.GetBody();
                return false;
            }
        }
        return true;
    }

    function update() {
        // if (isMouseDown && (!mouseJoint)) {
        //     var body = getBodyAtMouse();
        //     if (body && level_dynamic_obj.indexOf(body) == -1) {
        //         var md = new b2MouseJointDef();
        //         md.bodyA = world.GetGroundBody();
        //         md.bodyB = body;
        //         md.target.Set(mouseX, mouseY);
        //         md.collideConnected = true;
        //         md.maxForce = 300.0 * body.GetMass();
        //         mouseJoint = world.CreateJoint(md);
        //         body.SetAwake(true);
        //     }
        // }

        // if (mouseJoint) {
        //     if (isMouseDown) {
        //         mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
        //     } else {
        //         world.DestroyJoint(mouseJoint);
        //         mouseJoint = null;
        //     }
        // }

        for (var i = 0; i < toDestroy.length; i++) {
            if (level_dynamic_obj.indexOf(toDestroy[i]) == -1)
                world.DestroyBody(toDestroy[i]);
        }
        toDestroy = [];

        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();

        if (level_complete) {
            level_complete = false;
            if (score >= 3) {
                alert("Level Complete!");
            } else {
                alert("Not enough score...");
            }
        }

        currentAnim = requestAnimFrame(update);
    };

    //helpers

    //http://js-tut.aardon.de/js-tut/tutorial/position.html

    function getElementPosition(element) {
        var elem = element,
            tagname = "",
            x = 0,
            y = 0;

        while ((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
            y += elem.offsetTop;
            x += elem.offsetLeft;
            tagname = elem.tagName.toUpperCase();

            if (tagname == "BODY")
                elem = 0;

            if (typeof(elem) == "object") {
                if (typeof(elem.offsetParent) == "object")
                    elem = elem.offsetParent;
            }
        }

        return {
            x: x,
            y: y
        };
    }

    requestAnimFrame(update);
}