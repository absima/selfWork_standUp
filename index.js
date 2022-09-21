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
// "2 pi radian is 360 degrees
const numberOfSegments = teamChrisArray.length;
const oneRadian = 180/ Math.PI;
const oneSegment = 360 / numberOfSegments;

const studentsPlusDegree = teamChrisArray.map((name, index) => {
  return {  
    name: name,
    degrees: index * oneSegment
  }
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

function spinTheWheel() {
  const randomPerson = sample(studentsPlusDegree);

  console.log(randomPerson);
}

spinTheWheel()
