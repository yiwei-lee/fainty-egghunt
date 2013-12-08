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
    b2ContactListener = Box2D.Dynamics.b2ContactListener;

function applyImpulse(body, degree, power, timeout) {
    setTimeout(function() {
        body.ApplyImpulse(new b2Vec2(Math.cos(degree * (Math.PI / 180)) * power,
                Math.sin(degree * (Math.PI / 180)) * power),
            body.GetWorldCenter());
    }, timeout);
}

function speedUp(body, perc) {
	speed = body.GetLinearVelocity();
	body.SetLinearVelocity(new b2Vec2(speed.x*(1+perc/100.0), speed.y*(1+perc/100.0)));
}