particles = [];

canvas = document.getElementById("life").getContext("2d");

rule = ( particles1, particles2, g ) => {
    for (let i = 0; i < particles1.length; i++) {
        fx = 0;
        fy = 0;
        for (let j = 0; j < particles2.length; j++) {
          a = particles1[i];
          b = particles2[j];
          dx = a.x - b.x;
          dy = a.y - b.y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d > 0 && d < 80) {
            F = (g * 1) / d;
            fx += F * dx;
            fy += F * dy;
          }
        }
        a.vx = (a.vx + fx) * 0.5;
        a.vy = (a.vy + fy) * 0.5;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= 500) { a.vx *= -1; }
        if (a.y <= 0 || a.y >= 500) { a.vy *= -1; }
    }
}

draw = (x, y, c, s) => {
    canvas.fillStyle = c;
    canvas.fillRect(x, y, s, s);
}

particle = (x, y, c) => {
    return {
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        color: c
    }
}

random = () => {
    return Math.random() * 400 + 50;
}

create = (number, color) => {
    group  = []
    for(let i = 0; i < number ; i++){
        group.push(particle(random(), random(), color))
        particles.push(group[i])
    }
    return group;
}

yellow = create(1000, "yellow");

update = () => {
    rule(yellow, yellow, 1);
    canvas.clearRect(0, 0, 500, 500);
    draw(0, 0, "black", 500);
    for(i = 0; i < particles.length; i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 5);
    }
    requestAnimationFrame(update);
}

update();