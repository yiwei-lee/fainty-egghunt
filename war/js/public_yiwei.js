function init(level_no) {
    $.getScript("levels/level" + level_no + ".js", function() {
        isStarted = false;
        cancelAnimationFrame(currentAnim);
        $("#startBtn .ui-btn-text").text("Start");

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

        inLevel = level_no;

        // var background = new Image();
        // background.src = "levels/level1.png";
        // background.onload = function() {
        //     ctxCanvas.drawImage(background, 0, 0);
        // }

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
                    startX = e.clientX;
                    startY = e.clientY;
                } else if (e.type == "touchstart") {
                    var touch = e.changedTouches[0];
                    mouseX = (touch.pageX - canvasPosition.x) / 30;
                    mouseY = (touch.pageY - canvasPosition.y) / 30;
                }
                return;
            } else {
                if (e.type == "mousedown") {
                    ctxDraw.beginPath();
                    ctxDraw.moveTo(e.clientX, e.clientY);
                    startX = lastX = e.clientX;
                    startY = lastY = e.clientY;
                } else if (e.type == "touchstart") {
                    var touch = e.changedTouches[0];
                    ctxDraw.beginPath();
                    ctxDraw.moveTo(touch.pageX, touch.pageY);
                    startX = lastX = touch.pageX;
                    startY = lastY = touch.pageY;
                }
                scaledPoints = [];
                objPoints = [];
                objPoints.push({
                    x: lastX,
                    y: lastY
                });
            }
        });

        addMultipleEventListener(canvas, "mouseup touchend", function(e) {
            e.preventDefault();
            canvas.removeEventListener("mousemove", handleMouseMove, false);
            canvas.removeEventListener("touchmove", handleMouseMove, false);
            isMouseDown = false;
            mouseX = undefined;
            mouseY = undefined;
            if (e.type == "mouseup") {
                distX = startX - e.clientX;
                distY = startY - e.clientY;
            } else if (e.type == "touchend") {
                var touch = e.changedTouches[0];
                distX = startX - touch.pageX;
                distY = startY - touch.pageY;
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
                    toDestroy.push(draggingObj);
                }
            }
        }, true);

        function handleMouseMove(e) {
            e.preventDefault();
            if (e.type.charAt(0) == "m") {
                if (!draggingObj) {
                    var dist_x = e.clientX - lastX;
                    var dist_y = e.clientY - lastY;
                    if (dist_x * dist_x + dist_y * dist_y > 100) {
                        ctxDraw.lineTo(e.clientX, e.clientY);
                        ctxDraw.stroke();
                        lastX = e.clientX;
                        lastY = e.clientY;
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
                    var dist_x = touch.pageX - lastX;
                    var dist_y = touch.pageY - lastY;
                    if (dist_x * dist_x + dist_y * dist_y > 100) {
                        ctxDraw.lineTo(touch.pageX, touch.pageY);
                        ctxDraw.stroke();
                        lastX = touch.pageX;
                        lastY = touch.pageY;
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
    });


};
