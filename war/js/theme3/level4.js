var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.10250011086463928,"y":0.7562500238418579},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":-0.10500004887580872,"y":0.8012499809265137}],[{"x":0.8325000405311584,"y":0.2837500274181366},{"x":0.8925000429153442,"y":0.2462500035762787},{"x":1.1425000429153442,"y":0.2462500035762787},{"x":1.1425000429153442,"y":0.28374993801116943}],[{"x":0.260000079870224,"y":1.063750147819519},{"x":0.49250003695487976,"y":0.5612499713897705},{"x":0.7275000214576721,"y":1.0612499713897705}]],"circles":[{"cx":0.3875000476837158,"cy":0.5762501955032349,"r":0.04249995946884155},{"cx":0.4949999749660492,"cy":0.3412500023841858,"r":0.04160822182893753},{"cx":0.5975000262260437,"cy":0.5737500190734863,"r":0.049307771027088165},{"cx":0.8325000405311584,"cy":0.3737500011920929,"r":0.05062123388051987}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.10500004887580872,"y":0.8012499809265137},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":-0.10250011086463928,"y":0.7562500238418579}]},{"type":"POLYGON","vertices":[{"x":0.8325000405311584,"y":0.2837500274181366},{"x":0.8925000429153442,"y":0.2462500035762787},{"x":1.1425000429153442,"y":0.2462500035762787},{"x":1.1425000429153442,"y":0.28374993801116943}]},{"type":"CIRCLE","vertices":[{"x":0.3875000476837158,"y":0.5762501955032349},{"x":0.42500001192092896,"y":0.5562502145767212}]},{"type":"CIRCLE","vertices":[{"x":0.4949999749660492,"y":0.3412500023841858},{"x":0.5174998044967651,"y":0.3062499761581421}]},{"type":"CIRCLE","vertices":[{"x":0.5975000262260437,"y":0.5737500190734863},{"x":0.6225001215934753,"y":0.53125}]},{"type":"CIRCLE","vertices":[{"x":0.8325000405311584,"y":0.3737500011920929},{"x":0.8600001335144043,"y":0.3312499523162842}]},{"type":"POLYGON","vertices":[{"x":0.260000079870224,"y":1.063750147819519},{"x":0.49250003695487976,"y":0.5612499713897705},{"x":0.7275000214576721,"y":1.0612499713897705}]}]}],"dynamicObjects":[]}');

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
    bodyDef.position.y = 275 / 30;
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

function level4() {
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