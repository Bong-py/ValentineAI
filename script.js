const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hintText');
const revealSection = document.getElementById('yesReveal');
const revealFinal = document.getElementById('revealFinal');
const replayBtn = document.getElementById('replayBtn');
const beatSound = document.getElementById('beatSound');
const bgMusic = document.getElementById('bgMusic');
const bgHearts = document.getElementById('bgHearts');
const particles = document.getElementById('particles');
const scrollSections = Array.from(document.querySelectorAll('.scroll-section'));
const alwaysScreen = document.getElementById('alwaysScreen');

let noAttempts = 0;
let noX = 0;
let noY = 0;

const noMessages = [
  'Are you sure?',
  'Think once more?',
  'I’ll wait.',
  'You don’t mean that.',
];

function tryPlayMusic() {
  bgMusic.volume = 0.14;
  bgMusic.play().catch(() => {});
}

function spawnAmbient(container, className, symbol, count) {
  for (let i = 0; i < count; i += 1) {
    const item = document.createElement('span');
    item.className = className;
    item.textContent = symbol;
    item.style.left = `${Math.random() * 100}vw`;
    item.style.fontSize = `${0.6 + Math.random() * 1.1}rem`;
    item.style.animationDuration = `${9 + Math.random() * 8}s`;
    item.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(item);
  }
}

function softConfetti() {
  const colors = ['#ffd5de', '#ffc2d1', '#e0bbff', '#fff'];

  for (let i = 0; i < 36; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'spark';
    piece.style.position = 'fixed';
    piece.style.top = '-12px';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = '7px';
    piece.style.height = '10px';
    piece.style.borderRadius = '999px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = '0.9';
    piece.style.animation = `drift ${2.8 + Math.random() * 1.6}s linear forwards`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4600);
  }
}

function moveNoButtonSlightly() {
  if (window.innerWidth < 700) return;

  noAttempts += 1;
  hintText.textContent = noMessages[noAttempts % noMessages.length];
  noBtn.textContent = noMessages[noAttempts % noMessages.length];

  noX += Math.random() * 80 - 40;
  noY += Math.random() * 50 - 25;

  const pad = 16;
  const maxX = window.innerWidth - noBtn.offsetWidth - pad;
  const maxY = window.innerHeight - noBtn.offsetHeight - 80;

  const currentLeft = noBtn.offsetLeft + noX;
  const currentTop = noBtn.offsetTop + noY;

  const left = Math.max(pad, Math.min(maxX, currentLeft));
  const top = Math.max(pad, Math.min(maxY, currentTop));

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;

  if (noAttempts >= 5) {
    noBtn.classList.add('tiny');
  }

  if (noAttempts >= 8) {
    noBtn.classList.add('gone');
    hintText.textContent = 'I think your heart already said YES. 💞';
  }
}

function revealFlow() {
  document.body.classList.add('yes-mode');
  softConfetti();

  beatSound.volume = 0.18;
  beatSound.play().catch(() => {});

  revealSection.classList.remove('hidden');
  scrollSections.forEach((section) => section.classList.remove('hidden'));
  alwaysScreen.classList.remove('hidden');

  setTimeout(() => {
    revealFinal.classList.add('show');
  }, 1500);

  setTimeout(() => {
    revealSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function resetAll() {
  noAttempts = 0;
  noX = 0;
  noY = 0;

  noBtn.classList.remove('tiny', 'gone');
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noBtn.textContent = '😢 NO';
  hintText.textContent = '';

  revealFinal.classList.remove('show');
  revealSection.classList.add('hidden');
  scrollSections.forEach((section) => {
    section.classList.add('hidden');
    section.classList.remove('visible');
  });
  alwaysScreen.classList.add('hidden');

  document.body.classList.remove('yes-mode');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupScrollFade() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.45 }
  );

  document.querySelectorAll('.fade-on-scroll').forEach((el) => observer.observe(el));
}

window.addEventListener('contextmenu', (event) => event.preventDefault());
window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'y') {
    alert('See? Even the keyboard knows the answer 😉');
  }
});

noBtn.addEventListener('mouseenter', moveNoButtonSlightly);
noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  moveNoButtonSlightly();
});

yesBtn.addEventListener('click', revealFlow);
replayBtn.addEventListener('click', resetAll);

spawnAmbient(bgHearts, 'heart', '💗', 16);
spawnAmbient(particles, 'spark', '•', 24);
setupScrollFade();

['click', 'touchstart', 'keydown'].forEach((evt) => {
  window.addEventListener(evt, tryPlayMusic, { once: true });
});

tryPlayMusic();
