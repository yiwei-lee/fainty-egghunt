var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.10250011086463928,"y":0.7562500238418579},{"x":0.022500038146972656,"y":0.7562500238418579},{"x":0.07999998331069946,"y":0.8012499809265137},{"x":-0.10500004887580872,"y":0.8012499809265137}],[{"x":0.7599999308586121,"y":0.13625004887580872},{"x":0.8199999332427979,"y":0.0987500250339508},{"x":1.0699999332427979,"y":0.0987500250339508},{"x":1.0699999332427979,"y":0.13624995946884155}],[{"x":0.11250001192092896,"y":1.0537500381469727},{"x":0.36250001192092896,"y":0.5462499856948853},{"x":0.48499998450279236,"y":0.5462499856948853},{"x":0.7450000643730164,"y":1.0512499809265137}],[{"x":0.3649999797344208,"y":0.33375000953674316},{"x":0.3649999797344208,"y":0.28125},{"x":0.48249998688697815,"y":0.28125},{"x":0.48249998688697815,"y":0.33375000953674316}],[{"x":0.3675000071525574,"y":0.11375004053115845},{"x":0.20749995112419128,"y":-0.09125000238418579},{"x":0.6700000762939453,"y":-0.09624993801116943},{"x":0.49000000953674316,"y":0.11375001072883606}]],"circles":[{"cx":0.27000001072883606,"cy":0.48375001549720764,"r":0.04249995946884155},{"cx":0.5449999570846558,"cy":0.4412499964237213,"r":0.04160827025771141},{"cx":0.3124999701976776,"cy":0.2212499976158142,"r":0.049307771027088165},{"cx":0.5925000309944153,"cy":0.18375003337860107,"r":0.05062123388051987}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.10500004887580872,"y":0.8012499809265137},{"x":0.07999998331069946,"y":0.8012499809265137},{"x":0.022500038146972656,"y":0.7562500238418579},{"x":-0.10250011086463928,"y":0.7562500238418579}]},{"type":"POLYGON","vertices":[{"x":0.7599999308586121,"y":0.13625004887580872},{"x":0.8199999332427979,"y":0.0987500250339508},{"x":1.0699999332427979,"y":0.0987500250339508},{"x":1.0699999332427979,"y":0.13624995946884155}]},{"type":"CIRCLE","vertices":[{"x":0.27000001072883606,"y":0.48375001549720764},{"x":0.3074999749660492,"y":0.46375003457069397}]},{"type":"CIRCLE","vertices":[{"x":0.5449999570846558,"y":0.4412499964237213},{"x":0.5674998760223389,"y":0.4062499701976776}]},{"type":"CIRCLE","vertices":[{"x":0.3124999701976776,"y":0.2212499976158142},{"x":0.33750006556510925,"y":0.17874997854232788}]},{"type":"CIRCLE","vertices":[{"x":0.5925000309944153,"y":0.18375003337860107},{"x":0.6200001239776611,"y":0.14124998450279236}]},{"type":"POLYGON","vertices":[{"x":0.11250001192092896,"y":1.0537500381469727},{"x":0.36250001192092896,"y":0.5462499856948853},{"x":0.48499998450279236,"y":0.5462499856948853},{"x":0.7450000643730164,"y":1.0512499809265137}]},{"type":"POLYGON","vertices":[{"x":0.3649999797344208,"y":0.33375000953674316},{"x":0.3649999797344208,"y":0.28125},{"x":0.48249998688697815,"y":0.28125},{"x":0.48249998688697815,"y":0.33375000953674316}]},{"type":"POLYGON","vertices":[{"x":0.3675000071525574,"y":0.11375004053115845},{"x":0.20749995112419128,"y":-0.09125000238418579},{"x":0.6700000762939453,"y":-0.09624993801116943},{"x":0.49000000953674316,"y":0.11375001072883606}]}]}],"dynamicObjects":[]}');

var grounds = [1, 1, 1, 1];
var level_dynamic_obj = [];
var level_collectable_obj = [];
var level_collectable_score = [];
var startBody;
var endBody;

var start_impulse = [0, 7.5];

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
