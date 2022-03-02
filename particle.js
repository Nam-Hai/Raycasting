class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];

        for (let a = 0; a < 360; a += 5) {
            this.rays.push(new Ray(this.pos, radians(a)))
        }
    }

    show() {
        fill(255);
        circle(this.pos.x, this.pos.y, 10);
    }

    update(x, y) {
        this.pos.set(x, y);
    }


    // looks if rays intersect a wall, checks if it's the closest and show le line
    look(walls) {
        for (let ray of this.rays) {
            let directRay = null;
            let record = Infinity;
            for (const wall of walls) {
                const pt = ray.cast(wall);

                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        directRay = pt;
                    }
                }
            }
            if (directRay) {
                line(this.pos.x, this.pos.y, directRay.x, directRay.y);

            }
        }
    }
}