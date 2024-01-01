"use strict";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //creates an object representating 2d rendering context. Can be webgl for 3d renders

const canvasWidth = (canvas.width = 600); //width & height are already set in stylesheet.
const canvasHeight = (canvas.height = 600);

const dogImg = new Image();
dogImg.src = "img/shadow_dog.png";
const dogWidth = 575;
const dogHeight = 523;

let dogLocations = []; //this array stores the various sates of teh dog along with its xy coordiinates
let animationState = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "land", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "hit", frames: 12 },
  { name: "getHit", frames: 4 },
];

animationState.forEach((state, index) => {
  let framesLoc = {
    location: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let x = i * dogWidth;
    let y = index * dogHeight;
    framesLoc.location.push({ x: x, y: y });
  }
  dogLocations[state.name] = framesLoc;
});
console.log(dogLocations);

let dogFrame = 0;
let staggerFrames = 5;
const speed = document.getElementById("speed");
speed.addEventListener("change", function (e) {
  staggerFrames = e.target.value;
});

let dogState = "idle";
const states = document.getElementById("states");
states.addEventListener("change", function (e) {
  dogState = e.target.value;
});

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); //use this to clear the canvas. Reccommended everytime at the start
  let position =
    Math.floor(dogFrame / staggerFrames) %
    dogLocations[dogState].location.length; //this limits the frames to a specific frame number to prevent animating blank frames. Number is according to the number of frames drawn for the dog in the sprite sheet
  //logic is copied from another codebase. Can implement own code but it would be too messy
  let x = position * dogWidth;
  let y = dogLocations[dogState].location[position].y;
  ctx.drawImage(dogImg, x, y, dogWidth, dogHeight, 0, 0, dogWidth, dogHeight);
  dogFrame++;
  requestAnimationFrame(animate); //requests browser to perform an animation
}

animate();
