var level_js = JSON.parse('{"rigidBodies":[{"name":"Name","imagePath":null,"origin":{"x":0,"y":0},"polygons":[[{"x":-0.10250011086463928,"y":0.7562500238418579},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":-0.10500004887580872,"y":0.8012499809265137}],[{"x":0.8050000071525574,"y":0.13125011324882507},{"x":0.8650000095367432,"y":0.09375008940696716},{"x":1.1150000095367432,"y":0.09375008940696716},{"x":1.1150000095367432,"y":0.1312500238418579}],[{"x":0.27000001072883606,"y":0.6537500619888306},{"x":0.3525000214576721,"y":0.6687500476837158},{"x":-0.047500014305114746,"y":0.6687500476837158}],[{"x":-0.047500014305114746,"y":0.6687500476837158},{"x":0.19999998807907104,"y":0.6187499761581421},{"x":0.27000001072883606,"y":0.6537500619888306}],[{"x":-0.047500014305114746,"y":0.6687500476837158},{"x":0.14499998092651367,"y":0.5687499046325684},{"x":0.19999998807907104,"y":0.6187499761581421}],[{"x":-0.047500014305114746,"y":0.6687500476837158},{"x":0.10749998688697815,"y":0.48874998092651367},{"x":0.14499998092651367,"y":0.5687499046325684}],[{"x":-0.047500014305114746,"y":0.6687500476837158},{"x":-0.09000003337860107,"y":0.20374998450279236},{"x":0.10250002145767212,"y":0.3962499797344208},{"x":0.10749998688697815,"y":0.48874998092651367}],[{"x":-0.09000003337860107,"y":0.20374998450279236},{"x":0.1300000250339508,"y":0.32124993205070496},{"x":0.10250002145767212,"y":0.3962499797344208}],[{"x":-0.09000003337860107,"y":0.20374998450279236},{"x":0.1875,"y":0.25874996185302734},{"x":0.1300000250339508,"y":0.32124993205070496}],[{"x":-0.09000003337860107,"y":0.20374998450279236},{"x":0.2749999761581421,"y":0.2162499725818634},{"x":0.1875,"y":0.25874996185302734}],[{"x":-0.09000003337860107,"y":0.20374998450279236},{"x":0.33750003576278687,"y":0.20374998450279236},{"x":0.2749999761581421,"y":0.2162499725818634}]],"circles":[{"cx":0.3024999797344208,"cy":0.8112499713897705,"r":0.04249995946884155},{"cx":0.6924999952316284,"cy":0.6912500262260437,"r":0.04160827025771141},{"cx":0.29749995470046997,"cy":0.3462499976158142,"r":0.049307771027088165},{"cx":0.8200000524520874,"cy":0.2162500023841858,"r":0.05062123388051987}],"shapes":[{"type":"POLYGON","vertices":[{"x":-0.10500004887580872,"y":0.8012499809265137},{"x":0.15249991416931152,"y":0.8012499809265137},{"x":0.09499996900558472,"y":0.7562500238418579},{"x":-0.10250011086463928,"y":0.7562500238418579}]},{"type":"POLYGON","vertices":[{"x":0.8050000071525574,"y":0.13125011324882507},{"x":0.8650000095367432,"y":0.09375008940696716},{"x":1.1150000095367432,"y":0.09375008940696716},{"x":1.1150000095367432,"y":0.1312500238418579}]},{"type":"CIRCLE","vertices":[{"x":0.3024999797344208,"y":0.8112499713897705},{"x":0.3399999439716339,"y":0.7912499904632568}]},{"type":"CIRCLE","vertices":[{"x":0.6924999952316284,"y":0.6912500262260437},{"x":0.7149999141693115,"y":0.65625}]},{"type":"CIRCLE","vertices":[{"x":0.29749995470046997,"y":0.3462499976158142},{"x":0.3225000500679016,"y":0.3037499785423279}]},{"type":"CIRCLE","vertices":[{"x":0.8200000524520874,"y":0.2162500023841858},{"x":0.8475001454353333,"y":0.17374995350837708}]},{"type":"POLYGON","vertices":[{"x":-0.047500014305114746,"y":0.6687500476837158},{"x":0.3525000214576721,"y":0.6687500476837158},{"x":0.27000001072883606,"y":0.6537500619888306},{"x":0.19999998807907104,"y":0.6187499761581421},{"x":0.14499998092651367,"y":0.5687499046325684},{"x":0.10749998688697815,"y":0.48874998092651367},{"x":0.10250002145767212,"y":0.3962499797344208},{"x":0.1300000250339508,"y":0.32124993205070496},{"x":0.1875,"y":0.25874996185302734},{"x":0.2749999761581421,"y":0.2162499725818634},{"x":0.33750003576278687,"y":0.20374998450279236},{"x":-0.09000003337860107,"y":0.20374998450279236}]}]}],"dynamicObjects":[]}');

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
