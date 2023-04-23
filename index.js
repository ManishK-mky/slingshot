let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine:engine,
    options : {
        width : 1340 ,
        height : 650,
        wireframe : false 
    }
});


// in rectangle class the first and the second i.e 400 and 600 represents the 
// position (co-ordinates that where the recatngle is going to be placed )


//whereas the 3rd and the 4th number position represents
// the length and the breadth of the rectangle respectively


let ground = Matter.Bodies.rectangle(1050,400,500,30, { isStatic: true, 
render : {
    fillStyle : 'red',
    strokeStyle : 'aqua',
    lineWidth : 10
}})


let mouse = Matter.Mouse.create(render.canvas)
let mouseConstraint = Matter.MouseConstraint.create(engine,{
    mouse:mouse,
    constraint: {
        render: {visible: true}
    }
})
render.mouse = mouse



//ball and sling for firing---->

let ball = Matter.Bodies.circle(300,500,20)
let sling = Matter.Constraint.create({
    pointA: {x:300 , y:500},
    bodyB : ball,    //the object we want to sling matlab ki ball ko slomg se attach karana hai 
    stiffness : 0.05  //stiffness maeans ball  ko kitna strecth kar skte hai
})

//creating a stack //matter.js provide a class called composites
//  the first two numbersi.e 200 200 is the cordinates from where the stack is going to be placed
// first 200 is for x -axis and --------- the second 200 is for y-axis agar value y -axis ki choti 
//hogi toh woh utne hi upar se  girega

/**
   the 3rd and the 4th number i.e 4,4 is represting the stack of size matlab total 16 blocks banenge
   aur woh 4x4 k arrangement honge
 */

/**
  the 5th and 6 th number is used t represent the gap between the blocks
 */

let stack = Matter.Composites.stack(950,100,4,4,0,0, function(x,y){
    return Matter.Bodies.polygon(x,y,8,30)
})

//program for firing 

//here enddrag is an event

let firing = false
Matter.Events.on(mouseConstraint,'enddrag', function(e){
    if(e.body==ball)
    {
        firing=true
    }

})

Matter.Events.on(engine, 'afterUpdate', function(){
    if(firing && Math.abs(ball.position.x-300)<20 && Math.abs(ball.position.y-500)<20){
        ball= Matter.Bodies.circle(300,500,20)
        Matter.World.add(engine.world,ball)
        sling.bodyB = ball
        firing= false
    }
})


Matter.World.add(engine.world,[ball,sling,stack,ground,mouseConstraint])
Matter.Engine.run(engine);
Matter.Render.run(render);