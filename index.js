function setPoints(index, n_angles){
  const x1 = center_x + radius * Math.cos(index * n_angles);
  const y1 = center_y + radius * Math.sin(index * n_angles);
  const x2 = center_x + radius * Math.cos((index + 1) * n_angles);
  const y2 = center_y + radius * Math.sin((index + 1) * n_angles);
  let xtxt = center_x + scale*radius * Math.cos((index+0.5) * n_angles);
  let ytxt = center_y + scale*radius * Math.sin((index+0.5) * n_angles);
  return [x1,y1,x2,y2,xtxt,ytxt]
}


function drawSector(sarray, index) {

  const nsize = sarray.length
  const n_angles = (2 * Math.PI) / nsize;
  const name = sarray[index];
  scale = 0.4;
  
  // <circle id="student-0" cx=${center_x} ${center_y}  r=${radius} style="fill:hsl(${1/nsize*360}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5"/>
  
  if (classArray.length<=1){
    console.log('yeah');
    const [x1,y1,x2,y2,xtxt,ytxt] = setPoints(1, n_angles);
    const secElement = 
    `
    <ellipse id="student-${index}" cx=${center_x} cy=${center_y} rx=${radius}  ry=${radius} style="fill:hsl(${index/nsize*360}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5"/>
    <text transform="translate(${1.5*xtxt}, ${1.5*ytxt}) rotate(${1/nsize * 360 + nsize})" fill="white" font-size="5")>${name}</text>
    `
    return secElement; 
  }
  else{
    const [x1,y1,x2,y2,xtxt,ytxt] = setPoints(index, n_angles)      
    const secElement = 
    `
    <path id="student-${index}" d="M ${center_x} ${center_y} ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}Z" style="fill:hsl(${index/nsize*360}, 60%, ${clrlight}%);stroke:black;stroke-width:0.5"/>
    
    <text transform="translate(${xtxt}, ${ytxt}) rotate(${index/nsize * 360 + nsize})" fill="white" font-size="5")>${name}</text>
    `
    return secElement;
  }

}



function combineSectors(sarray) {
  // // to remove a row on click
  // document.querySelector('table').onclick = function(ev) {
  //   const index = ev.target.parentElement.rowIndex;
  //   document.getElementById("myTable").deleteRow(index);
  //   classArray.splice(index,1);
  // }

  const rscale = 0.15;
  for (let i = 0; i < sarray.length; i++) {
    svg.innerHTML += drawSector(sarray, i);
  }
  svg.innerHTML += `
  <g onclick="spin()">
  <ellipse id="clickme-svg-button" cx=${center_x} cy=${center_y} rx=${rscale*radius}  ry=${rscale*radius} style="fill:white; stroke:black;stroke-width:1.0"/>
  <text transform="translate(${center_x}, ${center_y})" fill="black" font-size="5"
    text-anchor="middle" alignment-baseline="middle" font-weight="bold"
  >Click</text>
  </g>
  `
  
}

function reIndex(sarray, theta) {
  const angle = 360 / sarray.length; //
  const x = [...Array(sarray.length).keys()];
  const y = x.map((i) => (angle * i + theta) % 360);
  let index = y.indexOf(Math.min(...y));
  // !index ? (index = x.length - 2) : (index -= 1);
  return (sarray.length+index-1)%sarray.length
}

function grayOutAllButIdx(sarray, idx) {
  for (let i = 0; i < sarray.length; i++) {
    document.getElementById(`student-${i}`).classList.remove("delayed-grey");
    if (i !== idx) {
      document.getElementById(`student-${i}`).classList.add("delayed-grey")
    }
  }
}



function spin(){ 
  if (classArray.length){
    svg.innerHTML = "";
    // table.innerHTML+=addRow(sarray,i)
    combineSectors(classArray);
    theta +=Math.random() * theta;
    svg.style.transform = `rotate(${theta}deg)`;
    let iwon = reIndex(classArray, theta);
    if(iwon==-1){iwon+=1}
    if (visited.length>0){
      document.getElementById("myTable").deleteRow(visited[0]+1);
      visited.pop();
    }
    visited.push(iwon);
    console.log(visited);
    console.log(classArray.length)
    console.log(iwon)
    grayOutAllButIdx(classArray, iwon);//xxxxxxxxxxxxxx
    const chosen = classArray[iwon]
    
    setTimeout(() => {
      nrmlz = classArray.length+1
      
      const rowchosen = document.getElementById(chosen)
      rowchosen.style.backgroundColor=`hsl(${iwon/nrmlz*360}, 60%, ${clrlight}%)`;
      rowchosen.style.fontWeight = 'bold'

    }, 3100)
    // document.getElementById(chosen).style.backgroundColor='red';
    classArray.splice(iwon,1);
  }
  
}

// document.querySelector('table').onclick = function(ev) {
//   const index = ev.target.parentElement.rowIndex;
//   document.getElementById("myTable").deleteRow(index);
//   classArray.splice(index,1);
//   combineSectors(classArray);
// }

function addRow(x, index){

  rowElement = `
    <tr id=${x}>
      <td> ${index+1}. </td>
      <td> ${x} </td>
      <td> Pending </td>
    </tr>
  `
  return rowElement
}

function removeMe(event){
  console.log(event)
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
const radius = 60;
let theta = 2000;
let clrlight = 50;
let svg = document.querySelector("svg");
let table = document.querySelector("table");
classArray.map((x,i) => table.innerHTML+=addRow(x,i))
const date = new Date();
document.getElementById("h3").innerText += " " + date.toLocaleDateString();

combineSectors(classArray);
