let teamChrisArray = [
  "Arthi", 
  "Bruno", 
  "David", 
  "Fabian", 
  "Fi", 
  "Jens", 
  "Julio", 
  "Katrin", 
  "Luben", 
  "Malaiz", 
  "Marina", 
  "Samin", 
  "Sima", 
  "Sivak", 
  "Victor", 
  "Zan"
];

let messageArray = [
  "Hey,! How's it going?", 
  "Good morning,. What do you want to tell us?",
  "Hi,! Anything you want to share ...?",
  "How are you today,?", 
  "Hi hi,! what's up?",
  "Lucky you,. You're next.",
  "yay! it's you,. Grab the mic.",
  "Great to have you here with us,. How's it going?",
  "helloooo,! allow us to listen to you speaking.",
  "Hi there,! What's in your mind?",
  "G'day to you,! we'd love to hear from you too.",
  "There you are,. We're all ears.",
  "Guess who's next? .... Boom! it's you,.",
  "What's up,? Tell us anything about you.",
  "You want to go next,?",
  "One ... two ... three. Go,!"
]

// spinner
const center_x = 50;
const center_y = 50;
const radius = 60;
// // const dTheta= 0.001;

const nSize = 16;
let n_angles = 2*Math.PI/nSize;
const angle = 360/nSize; //
const minTheta = 2000;

let subSarray = teamChrisArray.slice(0,nSize);

// const newArray = subSarray.map(setPoints) 
// console.log(newArray);

function setPoints(index){
  let x1 = center_x + radius * Math.cos(index*n_angles);
  let y1 = center_y + radius * Math.sin(index*n_angles);
  let x2 = center_x + radius * Math.cos((index+1)*n_angles);
  let y2 = center_y + radius * Math.sin((index+1)*n_angles);
  return [x1, y1, x2, y2]
}

// const x1 = 218.54101966249684;
// const y1 = 257.0633909777092; 
// const x2 = 260;
// const y2 = 200;

divElement = document.querySelector(".svg");

// drawPolys(divElement, 16, false);

function drawTriangle(i){
  const name = subSarray[i];
  const [x1,y1,x2,y2] = setPoints(i);
  xt = ((x1+x2)/2 + center_x)/2;
  yt = ((y1+y2)/2 + center_y)/2;
  let clrlight = 50; 
  // i!==iselected && spinned? clrlight = 90:clrlight=50;
  // i!==iselected && spinned? clrlight = 90:clrlight=50;
  const triElement = 
  `
  <polygon id="student-${i}" points = "${center_x}, ${center_y} ${x1}, ${y1} ${x2}, ${y2}" style="fill:hsl(${i*angle}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5" />;
  <text transform="translate(${xt}, ${yt}) rotate(${i*angle})" text-anchor="middle" fill="white" font-size="5")>${name}</text>
  `;
  spinned = false;
  return triElement
}


let iselected = 6;
let spinned = false;
for (let i=0; i<nSize; i++){   
  divElement.innerHTML += drawTriangle(i);   
}

function grayOut(index){
  clrlight = 90;
  schosen = "student-"+String(index);
  document.getElementById(schosen).style.fill = "hsl("+index*angle+"," + 60+"%," + clrlight+"%)";    
  } 



function spinFor(){
  const randTheta = Math.random()*minTheta
  // document.getElementById('box').style.transform = "rotate("+minTheta + Math.random()*minTheta+"deg)";
  document.getElementById('box').style.transform = "rotate("+randTheta+"deg)";
  document.getElementById('box').classList.remove('animate');
  document.getElementById('box').classList.add('animate');
  
  spinned = true;
}

function doGrayAfterSpin(){
  spinFor();
  index = 4;
  timeout = 100000;
  setTimeout(grayOut(index), timeout)
  // setTimeout((index) => {
  //   clrlight = 90;
  //   schosen = "student-"+String(index);
  //   document.getElementById(schosen).style.fill = "hsl("+index*angle+"," + 60+"%," + clrlight+"%)"; 
  // }, timeout); 
  
  // grayOut(4);
}
const date = new Date();
document.getElementById("h3").innerText+= " " + date.toLocaleDateString();


// const randTheta = Math.random()*minTheta
// // not yet well-thought. Not functional either
// function getPolyCoordsAfterSpin(){
//   selected_theta = 360+10 - 360%randTheta  // 10 is an ok choice for size up to 16
// }








console.log(teamChrisArray);
console.log("-------")

const sArray = teamChrisArray.slice();
const mArray = messageArray.slice();

function choose_and_update(){
  let   n = sArray.length;
  ichosen = Math.floor(Math.random()*n)
  jchosen = Math.floor(Math.random()*n)
  sChosen = sArray[ichosen];
  mChosen = mArray[jchosen];

  const m_output = attachName(sChosen, mChosen);

  sArray.splice(ichosen, 1);
  mArray.splice(jchosen, 1);

  return m_output;
}

function attachName(mate, message){
  const split = message.split(",");
  return split[0] + ", " + mate + split[1];
}


console.log(teamChrisArray);
console.log("-------========-------");


