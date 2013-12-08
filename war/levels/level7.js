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
