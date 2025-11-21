const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const colors = ["#16b716ff", "#153b15ff", "#3a5c19ff"]; // Toni di verde

// Imposta dimensioni canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Crea particelle
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rimbalzo ai bordi
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
  ctx.save(); // Salva lo stato del contesto
  ctx.fillStyle = this.color;
  ctx.shadowBlur = 20; // Valore moderato per sfocatura
  ctx.shadowColor = this.color; // Usa lo stesso colore della particella
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore(); // Ripristina lo stato del contesto
}
}

// Inizializza particelle
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

// Anima particelle
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();