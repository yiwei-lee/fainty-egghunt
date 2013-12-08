var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.12250006198883057,"y":0.8037499189376831},{"x":0.047500014305114746,"y":0.8037499189376831},{"x":0.12250000238418579,"y":0.8437499403953552},{"x":-0.12250006198883057,"y":0.8437499403953552}],[{"x":0.9375000596046448,"y":0.6362500190734863},{"x":1.1349999904632568,"y":0.6362500190734863},{"x":1.1349999904632568,"y":0.6712499260902405},{"x":0.8625000715255737,"y":0.6712499260902405}]],"circles":[{"cx":0.28749996423721313,"cy":0.7987500429153442,"r":0.043011587113142014},{"cx":0.4724999964237213,"cy":0.7087500095367432,"r":0.04776240885257721},{"cx":0.7799999713897705,"cy":0.48874998092651367,"r":0.046970635652542114},{"cx":0.8650000095367432,"cy":0.8387500047683716,"r":0.0443001426756382}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.12250006198883057,"y":0.8437499403953552},{"x":0.12250000238418579,"y":0.8437499403953552},{"x":0.047500014305114746,"y":0.8037499189376831},{"x":-0.12250006198883057,"y":0.8037499189376831}]},{"type":"POLYGON","vertices":[{"x":0.8625000715255737,"y":0.6712499260902405},{"x":1.1349999904632568,"y":0.6712499260902405},{"x":1.1349999904632568,"y":0.6362500190734863},{"x":0.9375000596046448,"y":0.6362500190734863}]},{"type":"CIRCLE","vertices":[{"x":0.28749996423721313,"y":0.7987500429153442},{"x":0.32249993085861206,"y":0.7737500667572021}]},{"type":"CIRCLE","vertices":[{"x":0.4724999964237213,"y":0.7087500095367432},{"x":0.5049999952316284,"y":0.6737500429153442}]},{"type":"CIRCLE","vertices":[{"x":0.7799999713897705,"y":0.48874998092651367},{"x":0.8224998712539673,"y":0.46875}]},{"type":"CIRCLE","vertices":[{"x":0.8650000095367432,"y":0.8387500047683716},{"x":0.9075000286102295,"y":0.8262499570846558}]}]}],"dynamicObjects":[]}');

var grounds = [1, 1, 1, 1];
var level_dynamic_obj = [];
var level_collectable_obj = [];
var level_collectable_score = [];
var startBody;
var endBody;

var start_impulse = [0, 7];

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
