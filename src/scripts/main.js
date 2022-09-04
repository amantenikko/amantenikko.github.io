gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// $(function(){
//   $("#app").load("./src/content.txt"); 
// });

window.addEventListener('load', function() {
  const avatarImg = document.querySelector(".about .about-content.top .about-column-img img");
  const avatarImg2 = document.querySelector(".about .about-content.bottom .about-column-img img");

  gsap.timeline({
    scrollTrigger: {
      trigger: avatarImg,
      start: () => "-=" + avatarImg.offsetWidth + " bottom",
      end: () => "-=" + avatarImg.offsetWidth + " top",
      // scrub: 4,
      toggleActions: "play pause resume reverse",
      // markers: true,
    }
  })
  .from(".about .about-content.top .about-column-text h2", {x: -2000, opacity: 0, duration: 1})
  .from(".about .about-content.top .about-column-text p", {x: -2000, opacity: 0, duration: 1}, 0)
  .from(avatarImg, {y: 700, x: 700, duration: 1}, 0)
  .from(".about .about-background2", {x: "200vw", duration: 0.5}, 0)
  
  gsap.from(avatarImg2, {
    scrollTrigger: {
      trigger: avatarImg2,
      start: () => "-=" + avatarImg2.offsetWidth + " 80%",
      end: () => "-=" + avatarImg2.offsetWidth + " 50%",
      scrub: 4,
      // markers: true
    },
    y: 500,
    x: -500,
    duration: 1
  });

  ScrollTrigger.create({
    trigger: ".home",
    end: () => window.innerHeight - 200 + " 0",
    // markers: true,
    onEnterBack: () => goto("0")
  });

  ScrollTrigger.create({
    trigger: ".about",
    start: "10% bottom",
    // end: "80% top",
    // markers: true,
    onEnter: () => goto(".about")
  });
});

// gsap.set(".cursor", {xPercent: -50, yPercent: -50});

// let xTo = gsap.quickTo(".cursor", "x", {duration: 1, ease: "power3"}),
//     yTo = gsap.quickTo(".cursor", "y", {duration: 1, ease: "power3"});

// window.addEventListener("mousemove", e => {
//   if (e.pageY < window.innerHeight) {
//     xTo(e.pageX);
//     yTo(e.pageY);
//   }
// });

function goto(where) { 
  gsap.to(window, {
    scrollTo: where,
    duration: 1
  });
}

// const menuBtns = document.querySelectorAll(".navbar .menu .menu-btn");
// console.log(menuBtns);
// menuBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     gsap.to(window, {
//       scrollTo: "#" + btn.innerText.toString().toLowerCase(),
//       duration: 1
//     });
//   })
// });


// const firstElem = document.querySelector(".home");
// ScrollTrigger.create({
//   trigger: firstElem,
//   start: () => "top top",
//   markers: true,
//   onEnter: () => {
//     gsap.to(window, {
//       scrollTo: "#about",
//       duration: 1
//     });
//   }
// });

// const firstElem = document.querySelector(".panel");

// function goToSection(i) {
//   gsap.to(window, {
//     // scrollTo: {y: i*innerHeight + firstElem.offsetTop, autoKill: false},
//     scrollTo: {y: i*innerHeight, autoKill: false},
//     duration: 1
//   });
// }

// gsap.utils.toArray(".panel").forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     onEnter: () => goToSection(i)
//   });
  
//   ScrollTrigger.create({
//     trigger: panel,
//     start: "bottom bottom",
//     markers: true,
//     onEnterBack: () => goToSection(i)
//   });
// });

// window.addEventListener('load', function() {q
//   // module aliases
//   let Engine = Matter.Engine,
//       Render = Matter.Render,
//       Runner = Matter.Runner,
//       Bodies = Matter.Bodies,
//       Composite = Matter.Composite,
//       MouseConstraint = Matter.MouseConstraint,
//       Mouse = Matter.Mouse;
  
//   // create an engine
//   let engine = Engine.create(),
//       world = engine.world;
  
//   // create a renderer
//   let render = Render.create({
//     // element: document.body,
//     element: document.querySelector('#matter-canvas'),
//     // element: document.querySelector('.skills'),
//     engine: engine,
//     options: {
//       width: 1000,
//       height: 600,
//       background: '#fff',
//       showAngleIndicator: false,
//       wireframes: false
//     } 
//   });
//   Render.run(render);

//   // create runner
//   let runner = Runner.create();
//   Runner.run(runner, engine);
  
//   // add bodies
//   var rest = 0.2, 
//       space = 600 / 5;
  
//   Composite.add(world, [
//     Bodies.rectangle(100 + space * 0, 150, 50, 50, { restitution: rest }),
//     Bodies.rectangle(100 + space * 1, 150, 50, 50, { restitution: rest, angle: -Math.PI * 0.15 }),
//     Bodies.rectangle(100 + space * 2, 150, 50, 50, { restitution: rest, angle: -Math.PI * 0.25 }),
//     Bodies.circle(100 + space * 3, 150, 25, { restitution: rest }),
//     Bodies.rectangle(100 + space * 5, 150, 180, 20, { restitution: rest, angle: -Math.PI * 0.5 }),
//     // walls
//     Bodies.rectangle(400, -210, 1150, 500, { isStatic: true }),   //top
//     Bodies.rectangle(400, 810, 1150, 500, { isStatic: true }),    //down 
//     Bodies.rectangle(1000, 300, 50, 1600, { isStatic: true }),     //right
//     Bodies.rectangle(0, 300, 50, 1600, { isStatic: true })         //left
//   ]);

//   let mouse = Mouse.create(render.canvas),
//       mouseConstraint = MouseConstraint.create(engine, {
//         mouse: mouse,
//         constraint: {
//           stiffness: 0.2,
//           render: {
//             visible: false
//           }
//         }
//       });

//   mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
//   mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

//   Composite.add(world, mouseConstraint);
  
//   // keep the mouse in sync with rendering
//   render.mouse = mouse;
  
//   // fit the render viewport to the scene
//   // Render.lookAt(render, {
//   //   min: { x: 0, y: 0 },
//   //   max: { x: 1000, y: 600 }
//   // });
// });
