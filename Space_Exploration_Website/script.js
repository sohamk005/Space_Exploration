document.addEventListener("DOMContentLoaded", function () {
const applyBtn = document.getElementById("applyBtn");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");
const gameForm = document.getElementById("gameForm");
const spaceContainer = document.getElementById("space-container");
const usernameDisplay = document.getElementById("username-display");
const spaceship = document.getElementById("spaceship");
const distanceDisplay = document.getElementById("distance-traveled");

document.body.style.overflow = "hidden"; 
spaceship.style.display = "none";

// Show popup when Apply button is clicked
applyBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

// Close popup when X button is clicked
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Start game on form submit
gameForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Preventing page refresh
    const username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Please enter a username.");
        return;
    }

    popup.style.display = "none";
    alert(`Exploration starting for ${username}!`);

    startGame(username);
});

function generateStars() {
  for (let i = 0; i < 15000; i++) {
      let star = document.createElement("div");
      star.classList.add("star");
      star.style.left = Math.random() * 2000 + "vw";
      star.style.top = Math.random() * 2000 + "vh";
      star.style.animationDuration = (Math.random() * 1.5 + 1) + "s";
      spaceContainer.appendChild(star);
  }
}

function startGame(username) {
    document.body.style.overflow = "auto";
    spaceship.style.display = "block";
    console.log(`Starting game for ${username}...`);
    generateStars();
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight / 2, behavior: "smooth" });
  }, 500);
    usernameDisplay.textContent = `Player: ${username}`;
}


let spaceshipX = window.innerWidth / 2;
let spaceshipY = window.innerHeight / 2;
let targetX = spaceshipX;
let targetY = spaceshipY;

document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY + window.scrollY; 
});


let lastScrollY = window.scrollY;
let distance = 0;

window.addEventListener("scroll", () => {
    let scrollDiff = Math.abs(window.scrollY - lastScrollY);
    distance += scrollDiff;
    lastScrollY = window.scrollY;

    distanceDisplay.textContent = `Distance: ${distance}m`;
});

function updateSpaceship() {
  spaceshipX += (targetX - spaceshipX) * 0.2; 
  spaceshipY += (targetY - spaceshipY) * 0.2;

  spaceship.style.transform = `translate(${spaceshipX}px, ${spaceshipY}px)`;

  requestAnimationFrame(updateSpaceship); //updating 
}

updateSpaceship(); //animation loop
let lastMoveTime = 0;

document.addEventListener("mousemove", (event) => {
    const now = performance.now();
    if (now - lastMoveTime < 5) return; //delay
    lastMoveTime = now;

    targetX = event.clientX;
    targetY = event.clientY + window.scrollY;
});

const planetsContainer = document.getElementById("planets-container");
const planetData = [
    { name: "Mercury", image: "images/planets/mercury.png", size: 80, info: "Smallest planet, closest to the sun."},
    { name: "Venus", image: "images/planets/venus.png", size: 100, info: "Hottest planet with thick atmosphere." },
    { name: "Earth", image: "images/planets/earth.png", size: 120, info: "Only planet known to support life." },
    { name: "Mars", image: "images/planets/mars.png", size: 90, info: "Known as the Red Planet." },
    { name: "Jupiter", image: "images/planets/jupiter.png", size: 150, info: "Largest planet, has a Great Red Spot." },
    { name: "Saturn", image: "images/planets/saturn.png", size: 140, info: "Famous for its rings." },
    { name: "Uranus", image: "images/planets/uranus.png", size: 110, info: "Rotates on its side." },
    { name: "Neptune", image: "images/planets/neptune.png", size: 105, info: "Coldest planet, with supersonic winds." },
];

const planetGap = 800; 
let lastPlanetY = window.innerHeight;
const infoPopup = document.createElement("div");
infoPopup.id = "planet-info";
document.body.appendChild(infoPopup);

document.querySelectorAll(".planet").forEach(planet => {
  planet.addEventListener("mouseenter", function () {
      console.log("Hovered on:", this.dataset.name);
  });
});


//adding a planet
function addPlanet(planet, index) {
    const planetElement = document.createElement("img");
    planetElement.src = planet.image;
    planetElement.alt = planet.name;
    planetElement.className = "planet";
    
    planetElement.style.width = `${planet.size}px`;
    planetElement.style.position = "absolute";
    planetElement.style.left = `${Math.random() * (window.innerWidth - planet.size)}px`;
    planetElement.style.top = `${lastPlanetY + planetGap}px`;
    planetElement.style.opacity = "0";
    planetsContainer.appendChild(planetElement);
    
    setTimeout(() => {
        planetElement.style.transition = "opacity 1.5s ease-in-out";
        planetElement.style.opacity = "1";
    }, index * 500); 

    lastPlanetY += planetGap;
}

applyBtn.addEventListener("click", () => {
    planetData.forEach((planet, index) => {
        addPlanet(planet, index);
    });
});

function showFinalMessage() {
  document.getElementById("final-message").style.display = "block";
  let finalMessage = document.createElement("div");
  finalMessage.id = "final-message";
  finalMessage.innerHTML = `
      <h1>Congratulations! You explored the entire Solar System! 🚀</h1>
      <p>Stay tuned for more space explorations.</p>
      <button id="continue">Continue Exploring</button>
      <button id="restart">Start Again</button>
  `;
  document.body.appendChild(finalMessage);

  document.getElementById("continue").addEventListener("click", () => {
    document.getElementById("final-message").style.display = "none";
  });

  document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("final-message").style.display = "none";
    const username1 = document.getElementById("username").value;
    startGame(username1);
  });
}

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("Reached the bottom!");
      showFinalMessage(); 
  }
});

});

