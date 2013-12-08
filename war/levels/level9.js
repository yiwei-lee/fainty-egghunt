var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.09750008583068848,"y":0.8137500286102295},{"x":0.09999999403953552,"y":0.8137500286102295},{"x":0.15749993920326233,"y":0.8587499856948853},{"x":-0.10000002384185791,"y":0.8587499856948853}],[{"x":0.32999998331069946,"y":0.10874998569488525},{"x":0.38999998569488525,"y":0.07124996185302734},{"x":0.6399999856948853,"y":0.07124996185302734},{"x":0.699999988079071,"y":0.10874998569488525}]],"circles":[{"cx":0.512499988079071,"cy":0.7012500166893005,"r":0.04249995946884155},{"cx":0.35499998927116394,"cy":0.5537500381469727,"r":0.04160827025771141},{"cx":0.512499988079071,"cy":0.5562500357627869,"r":0.049307771027088165},{"cx":0.6700000762939453,"cy":0.5562500357627869,"r":0.05062120780348778},{"cx":0.512499988079071,"cy":0.3962499797344208,"r":0.05482928082346916}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.10000002384185791,"y":0.8587499856948853},{"x":0.15749993920326233,"y":0.8587499856948853},{"x":0.09999999403953552,"y":0.8137500286102295},{"x":-0.09750008583068848,"y":0.8137500286102295}]},{"type":"POLYGON","vertices":[{"x":0.32999998331069946,"y":0.10874998569488525},{"x":0.38999998569488525,"y":0.07124996185302734},{"x":0.6399999856948853,"y":0.07124996185302734},{"x":0.699999988079071,"y":0.10874998569488525}]},{"type":"CIRCLE","vertices":[{"x":0.512499988079071,"y":0.7012500166893005},{"x":0.5499999523162842,"y":0.6812500357627869}]},{"type":"CIRCLE","vertices":[{"x":0.35499998927116394,"y":0.5537500381469727},{"x":0.37749990820884705,"y":0.518750011920929}]},{"type":"CIRCLE","vertices":[{"x":0.512499988079071,"y":0.5562500357627869},{"x":0.5375000834465027,"y":0.5137500166893005}]},{"type":"CIRCLE","vertices":[{"x":0.6700000762939453,"y":0.5562500357627869},{"x":0.6975001692771912,"y":0.5137500166893005}]},{"type":"CIRCLE","vertices":[{"x":0.512499988079071,"y":0.3962499797344208},{"x":0.5350000262260437,"y":0.44624996185302734}]}]}],"dynamicObjects":[]}');

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
    bodyDef.position.x = 410 / 30;
    bodyDef.position.y = 350 / 30;
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);
    endBody = body;
}
