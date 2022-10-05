function setPoints(sarray, index) {
  const radius = R+(sarray.length<7)*(7-sarray.length)*10;
  const n_angles = (2 * Math.PI) / sarray.length;
  let x1 = center_x + radius * Math.cos(index * n_angles);
  let y1 = center_y + radius * Math.sin(index * n_angles);
  let x2 = center_x + radius * Math.cos((index + 1) * n_angles);
  let y2 = center_y + radius * Math.sin((index + 1) * n_angles);
  return [x1, y1, x2, y2];
}
  
function drawTriangle(sarray, i) {
  const name = sarray[i];
  const angle = 360 / sarray.length; //
  const [x1, y1, x2, y2] = setPoints(sarray, i);
  let xt = ((x1 + x2) / 2 + center_x) / 2;
  let yt = ((y1 + y2) / 2 + center_y) / 2;
  let clrlight = 50;

  if (sarray.length>2){
    
    const triElement = 
    `
    <polygon id="student-${i}" points = "${center_x}, ${center_y} ${x1}, ${y1} ${x2}, ${y2}" style="fill:hsl(${i * angle}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5" />;
    
    <text transform="translate(${xt}, ${yt+1}) rotate(${i * angle + sarray.length})" fill="white" font-size="5")>${name}</text>
    `;
    return triElement;
  }

  // else if (sarray==2){
  //   const radius = R+(sarray.length<7)*(7-sarray.length)*10;
  //   const triElement = 
  //   `
  //   <path id="student-${i}" d="M ${center_x} ${center_y} L ${center_x - radius} ${center_y} A ${center_x} ${center_y} 0 ${(i+1)%2} ${i} ${center_x + radius} ${center_y} L ${center_x - radius} ${center_y}"   style="fill:hsl(${i * angle}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5" />;
    
    
  //   <text transform="translate(${center_x}, ${center_y + 1}) rotate(${i * angle + sarray.length})" fill="white" font-size="5")>${name}</text>
  //   `;
  //   return triElement;
  // }

  // else if (sarray==1){
  //   const triElement = 
  //   `<circle id="student-${i}" cx="${center_x}" cy="${center_y}" r=50% style="fill:hsl(${i * angle}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5"/>; 
    
  //   <text transform="translate(${center_x}, ${center_y + 1}) rotate(${i * angle + 16})" fill="white" font-size="5")>${name}</text>
  //   `;
  //   return triElement;
  // }

  // else{

  // } 
}



function combineTriangles(sarray) {
  for (let i = 0; i < sarray.length; i++) {
    svg.innerHTML += drawTriangle(sarray, i);
  }
}

function spin(){
  
  svg.innerHTML = "";
  combineTriangles(classArray);
  
  const theta = Math.random() * minTheta;
  svg.style.transform = `rotate(${theta}deg)`;
  const iwon = reIndex(classArray, theta);
  const chosen = classArray[iwon];
  visited.push(chosen);
  grayOutAllButIdx(classArray, iwon);//xxxxxxxxxxxxxx
  classArray.splice(iwon,1);


  function reIndex(sarray, theta) {
    const angle = 360 / sarray.length; //
    const x = [...Array(sarray.length).keys()];
    const y = x.map((i) => (angle * i + theta) % 360);
    let index = y.indexOf(Math.min(...y));
    !index ? (index = x.length - 2) : (index -= 1);
    return index
  }
   
  
  

  // const x1 = 218.54101966249684;
  // const y1 = 257.0633909777092;
  // const x2 = 260;
  // const y2 = 200;
  
  
  
  function grayOutAllButIdx(sarray, idx) {
    console.log(sarray.length)
    console.log(sarray)
    for (let i = 0; i < sarray.length; i++) {
      document.getElementById(`student-${i}`).classList.remove("delayed-grey");
      if (i !== idx) {
        setTimeout(
          () =>
            document.getElementById(`student-${i}`).classList.add("delayed-grey"),
          0
        );
      }
    }
  }
  
}

let classArray = [
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

const visited = [];
const center_x = 50;
const center_y = 50;
const R = 60;
const minTheta = 2000;

let svg = document.querySelector("svg");

const date = new Date();
document.getElementById("h3").innerText += " " + date.toLocaleDateString();

document.querySelector("#spin").addEventListener("click", spin);

combineTriangles(classArray);

