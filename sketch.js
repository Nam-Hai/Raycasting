let walls = [];
let particle;

function setup() {
  createCanvas(500, 500);

  walls = [];

  for (let i = 0; i < 5; i++) {
    walls.push(new Boundary(random(0, 500), random(0, 500), random(0, 500), random(0, 500)))
  }
  particle = new Particle();
}

function draw() {
  background(0);
  particle.update(mouseX, mouseY);
  for (const wall of walls) {
    wall.show()
  }

  particle.show();
  particle.look(walls)

  // ray.show()
  // ray.setDir(mouseX, mouseY)

  // let pt = ray.cast(wall);



  // if (pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8)
  // }

  // let pt2 = ray.cast(wall2);
  // if (pt2) {
  //   fill(255);
  //   ellipse(pt2.x, pt2.y, 8, 8)
  // }
}