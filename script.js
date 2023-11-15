const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// first page animation
function firstPageAnimation() {
  let tl = gsap.timeline();

  // nav animation
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut,
  })
    // heding animation
    .to(".boundingtext", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    // hero-footer animation
    .from("#hero-footer", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}
firstPageAnimation();

let timeout;
// when mouse moves the we skew the white mini circle which is moves with cursor
function miniCircleSkew() {
  // define defalut scale value
  let xscale = 1;
  let yscale = 1;

  let xPreValue = 0;
  let yPreValue = 0;

  window.addEventListener("mousemove", (dets) => {
    // when there is any existing timeout this line clears the timeout
    clearTimeout(timeout);

    /**when mouse moves the cursor has new location and here this new value is
        is in dets.clientX subtract to cursor's initial value which is stored
        in xPreValue*/
    let xDiffrence = dets.clientX - xPreValue;
    let yDiffrence = dets.clientY - yPreValue;

    xscale = gsap.utils.clamp(0.8, 1.2, xDiffrence);
    yscale = gsap.utils.clamp(0.8, 1.2, yDiffrence);

    //location of mouse in x axis is clientX, the value of mouse location stores in xPreValue
    xPreValue = dets.clientX;
    yPreValue = dets.clientY;

    // console.log(xDiffrence, yDiffrence);

    circleMouseFollower(xscale, yscale);

    /**we make a function it runs after 100 mili seconds
     * and we stored this value in global variable timeout
     * if we don't move cursor again then after the 100 mili seconds this function will run
     * and our minicircle comes to our original scale"scale(1, 1)""
     * if we continusly moves cursor the previous timeout will clears again and again though "clearTimeout(timeout)";*/
    timeout = setTimeout(() => {
      const miniCircle = document.querySelector("#minicircle");
      miniCircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}
miniCircleSkew();

// cursor mover on windows animation
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    // console.log(dets.clientX, dets.clientY);
    const miniCircle = document.querySelector("#minicircle");
    miniCircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
circleMouseFollower();

//  const textImage = document.querySelectorAll(".first-text")
//  let rotate = 0;
//  let diffRot = 0;

//   textImage.forEach((text) => {
//     text.addEventListener("mousemove", (dets) => {
//         // details of particular element, here details.clientY means value of where cursor is on screen from top
//         // and text.getBoundingClientRect means value of div where image element is lies from top
//         //  when we subtarct it here we get acurate value of cursor wher in dives
//         // we get accurat value of cuesor in first image dive the valre is calculate from top
//         // console.log(details.clientY - text.getBoundingClientRect().top);

//         let diffrence = dets.clientY - text.getBoundingClientRect().top;

//         diffRot =  dets.clientX - rotate;
//         rotate = dets.clientX;

//         // we select on any elements not only document
//         gsap.to(text.querySelector("img"), {
//             opacity: 1,
//             ease: Power3,
//             top: diffrence,
//             left: dets.clientX,
//             rotate: gsap.utils.clamp(-20, 20, diffRot * .5)
//         })
//     })
// })

document.querySelectorAll(".first-text").forEach((text) => {
  console.log(text);
  let rotate = 0;
  let diffRotate = 0;

  text.addEventListener("mousemove", (dets) => {
    let diffrence = dets.clientY - text.getBoundingClientRect().top;
    diffRotate = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(text.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diffrence,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate, 0.5),
    });
  });

  text.addEventListener("mouseleave", (dets) => {
    gsap.to(text.querySelector("img"), {
      opacity: 0,
      duration: 0.7,
      ease: Power3,
    });
  });
  
});

// animation on text 
const firstContainer = document.getElementById("first-cont");
const secondContainer = document.getElementById("second-cont");
const thirdContainer = document.getElementById("third-cont");

const firstText = document.getElementById("firsttext");
const secondText = document.getElementById("secondtext");
const thirdText = document.getElementById("thirdtext");

// define the timeline
const tl = gsap.timeline();


firstContainer.addEventListener('mouseenter', () => {
  tl.to("#firsttext",{
    x: 80,
    duration: .5,
    opacity: .3,
  })
})
firstContainer.addEventListener('mouseleave', () => {
  tl.to("#firsttext", {
    x: 0, 
    duration:.5,
    opacity: 1
  })
})


secondContainer.addEventListener('mouseenter', () => {
  tl.to("#secondtext",{
    x: 80,
    opacity: .3,
  })
})

secondContainer.addEventListener('mouseleave', () => {
  tl.to("#secondtext", {
    x: 0,
    opacity: 1
  })
})


thirdContainer.addEventListener('mouseenter', () => {
  tl.to("#thirdtext",{
    x: 80,
    opacity: .3,
  })
})

thirdContainer.addEventListener('mouseleave', () => {
  tl.to("#thirdtext", {
    x: 0,
    opacity:1,
  })
})
