let walls = [];
let particle;
let w = 500, h = 500;
let density = 10;
const shaderDensity = '# ';
let canvas;
let img;
let asciiBol = true;
function setup() {
  canvas = createCanvas(w, h);
  // pixelDensity(density)
  img = createImage(w, h);
  frameRate(30)
  walls = [];

  for (let i = 0; i < 5; i++) {
    walls.push(new Boundary(random(0, w), random(0, w), random(0, w), random(0, w)))
  }

  // wall on sides
  walls.push(new Boundary(-10, -10, -10, 510))
  walls.push(new Boundary(-10, 510, 510, 510))
  walls.push(new Boundary(510, 510, 510, -10))
  walls.push(new Boundary(510, -10, -10, -10))


  particle = new Particle();

  buttonToASCII = createButton('ASCII');
  buttonToASCII.mousePressed(toggleASCII);

  let div = createDiv();
  div.addClass('center');
  div.child(buttonToASCII)
}

function draw() {
  background(0);
  particle.update(mouseX, mouseY);
  for (const wall of walls) {
    wall.show()
  }

  particle.show();
  particle.look(walls)

  if (asciiBol) {
    toAscii()
  }
}

function toggleASCII() {
  asciiBol = !asciiBol
}

function toAscii() {
  let AsciiArray = []
  let c = get();
  image(c, 0, 0)

  let asciiW = w / density;
  let asciiH = h / density;
  loadPixels()
  // pixelDensity(density);
  for (let i = 0; i < asciiW; i++) {
    for (let j = 0; j < asciiH; j++) {
      const pixelIndex = (i * density + j * density * w) * 4;
      let r = 0;
      let b = 0;
      let g = 0;

      for (let i2 = 0; i2 < density; i2++) {
        for (let j2 = 0; j2 < density; j2++) {
          let index2 = 4 * ((j * density + j2) * w + (i * density + i2));

          if (pixels[index2] > r) r = pixels[index2]
          if (pixels[index2] > g) g = pixels[index2 + 1]
          if (pixels[index2] > b) b = pixels[index2 + 2]



        }
      }

      AsciiArray.push([r, g, b])
      // noStroke()


    }
  }
  // updatePixels()

  background(0)
  for (let i = 0; i < asciiW; i++) {
    for (let j = 0; j < asciiH; j++) {
      const r = AsciiArray[i * asciiW + j][0];
      const g = AsciiArray[i * asciiW + j][1];
      const b = AsciiArray[i * asciiW + j][2];

      noStroke()
      textSize(density);
      fill(r, g, b)
      text('#', i * density, j * density)
    }
  }
}