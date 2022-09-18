import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

$(function(){
    $('.carousel').owlCarousel({
        margin: 30,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 1000,
        autoplayHoverPause: true,
        nav: false,
        responsive: {
            0:{
                items: 1,
            },
            1500:{
                items: 2,
            },
            2000:{
                items: 3,
            }
        }
    });
});


window.addEventListener('load', function() {
//   const avatarImg = document.querySelector(".about .about-content.top .about-column-img img");
//   const avatarImg2 = document.querySelector(".about .about-content.bottom .about-column-img img");

//   gsap.timeline({
//     scrollTrigger: {
//       trigger: avatarImg,
//       start: () => "-=" + avatarImg.offsetWidth + " bottom",
//       end: () => "-=" + avatarImg.offsetWidth + " top",
//       // scrub: 4,
//       toggleActions: "play pause resume reverse",
//       // markers: true,
//     }
//   })
//   .from(".about .about-content.top .about-column-text h2", {x: -2000, opacity: 0, duration: 1})
//   .from(".about .about-content.top .about-column-text p", {x: -2000, opacity: 0, duration: 1}, 0)
//   .from(avatarImg, {y: 700, x: 700, duration: 1}, 0)
//   .from(".about .about-background2", {x: "200vw", duration: 0.5}, 0)
  
//   gsap.from(avatarImg2, {
//     scrollTrigger: {
//       trigger: avatarImg2,
//       start: () => "-=" + avatarImg2.offsetWidth + " 80%",
//       end: () => "-=" + avatarImg2.offsetWidth + " 50%",
//       scrub: 4,
//       // markers: true
//     },
//     y: 500,
//     x: -500,
//     duration: 1
//   });

//   ScrollTrigger.create({
//     trigger: ".home",
//     end: () => window.innerHeight - 200 + " 0",
//     // markers: true,
//     onEnterBack: () => goto("0")
//   });

//   ScrollTrigger.create({
//     trigger: ".about",
//     start: "10% bottom",
//     // end: "80% top",
//     // markers: true,
//     onEnter: () => goto(".about")
//   });

    /* ---- particles.js config ---- */
    // particlesJS.load('particles-js', 'particles-config.json');

    const canvas = document.querySelector("#particles-js");
    const backgroundColor = "#FFF";
    let model;
    const sizes = {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight
    }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
    camera.lookAt( scene.position );
    camera.position.set(0, 3, 15);
    
    const loader = new GLTFLoader();
    loader.load( '/src/NA.glb', function ( gltf ) {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.x = 5;
        
        scene.add( model );
    },undefined, function (error) {
        console.error(error);
    });
    
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    
    let d = 8.25;
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1500;
    dirLight.shadow.camera.left = d * -1;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = d * -1;
    scene.add(dirLight);
    
    let floorGeo = new THREE.PlaneGeometry(5000, 5000, 1, 1);
    let floorMat = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
      shininess: 0
    });
    let floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -11;
    scene.add(floor);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( sizes.width, sizes.height );
    canvas.appendChild( renderer.domElement );
    renderer.render( scene, camera );

    (function animate() {

        requestAnimationFrame( animate );
        renderer.render( scene, camera );

        if (model) model.rotation.y -= 0.005;
    })();

    window.addEventListener('resize', () =>
    {   
        model.position.x = (canvas.offsetWidth < 1000)? 0: 5;
        sizes.width = canvas.offsetWidth;
        sizes.height = canvas.offsetHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    document.addEventListener("mousemove", function (e) {
        let mousecoords = getMousePos(e);
        // console.log(mousecoords.y);
    });
    function getMousePos(e) {
        return { x: e.clientX, y: e.clientY };
    };
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

// function goto(where) { 
//   gsap.to(window, {
//     scrollTo: where,
//     duration: 1
//   });
// }

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

// window.addEventListener('load', function() {
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
//     element: document.querySelector('#matter-canvas'),
//     engine: engine,
//     options: {
//       width: 1000,
//       height: 600,
//       background: 'transparent',
//       wireframeBackground: 'transparent',
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
//     Bodies.rectangle(100 + space * 1, 150, 50, 50, { restitution: rest, angle: -Math.PI * 0.15, friction: 0.1, frictionAir: 0.001, restitution: 0}),
//     Bodies.rectangle(100 + space * 2, 150, 50, 50, { restitution: rest, angle: -Math.PI * 0.25, friction: 0.1, frictionAir: 0.001, restitution: 0}),
//     Bodies.circle(100 + space * 3, 150, 25, { restitution: rest }),
//     Bodies.rectangle(100 + space * 5, 150, 180, 20, { restitution: rest, angle: -Math.PI * 0.5, friction: 0.1, frictionAir: 0.001, restitution: 0}),
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
