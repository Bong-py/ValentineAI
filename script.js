const proposal = document.getElementById('proposal');
const reveal = document.getElementById('reveal');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hintText');
const typedText = document.getElementById('typedText');
const replayBtn = document.getElementById('replayBtn');
const countdown = document.getElementById('countdown');
const bgMusic = document.getElementById('bgMusic');
const beatSound = document.getElementById('beatSound');
const bgHearts = document.getElementById('bgHearts');
const particles = document.getElementById('particles');

let noAttempts = 0;
let yesScale = 1;

const noMessages = [
  'Are you sure? 🥺',
  'Think again 😏',
  'Really???',
  'You can’t escape 😌',
  'That’s illegal 🚨',
  'Try clicking YES instead 😇',
];

const revealLines = [
  'You just made me the happiest person alive ❤️',
  '',
  'From the moment you came into my life…',
  'Everything became brighter.',
  'You’re my favorite notification.',
  'My calm in chaos.',
  'My best friend.',
  'My always.',
];

const confettiColors = ['#ff5d8f', '#ffd166', '#e0bbff', '#8be9fd', '#ffccd5'];

function tryPlayMusic() {
  bgMusic.volume = 0.15;
  bgMusic.play().catch(() => {});
}

function createFloatingLayer(container, className, symbol, count) {
  for (let i = 0; i < count; i += 1) {
    const node = document.createElement('span');
    node.className = className;
    node.textContent = symbol;
    node.style.left = `${Math.random() * 100}vw`;
    node.style.animationDuration = `${8 + Math.random() * 10}s`;
    node.style.animationDelay = `${Math.random() * 6}s`;
    node.style.fontSize = `${0.7 + Math.random() * 1.3}rem`;
    container.appendChild(node);
  }
}

function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const nextValentine = new Date(year, 1, 14, 0, 0, 0);
  const target = now > nextValentine ? new Date(year + 1, 1, 14, 0, 0, 0) : nextValentine;
  const diff = target - now;

  if (diff <= 0) {
    countdown.textContent = 'It is Valentine’s Day today! 🌹';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  countdown.textContent = `Countdown to Valentine’s Day: ${d}d ${h}h ${m}m 💞`;
}

function moveNoButton() {
  noAttempts += 1;

  if (noAttempts >= 10) {
    noBtn.textContent = 'Okay fine… I’ll choose YES for you 💘';
  } else {
    noBtn.textContent = noMessages[Math.floor(Math.random() * noMessages.length)];
  }

  const maxX = window.innerWidth - noBtn.offsetWidth - 12;
  const maxY = window.innerHeight - noBtn.offsetHeight - 64;
  const x = Math.max(8, Math.random() * Math.max(8, maxX));
  const y = Math.max(8, Math.random() * Math.max(8, maxY));

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const scale = Math.max(0.55, 1 - noAttempts * 0.04);
  noBtn.style.transform = `scale(${scale})`;

  hintText.textContent = noMessages[noAttempts % noMessages.length];

  if (noAttempts >= 5) {
    yesScale += 0.08;
    yesBtn.style.setProperty('--grow', yesScale.toFixed(2));
    yesBtn.classList.add('yes-grow');
  }
}

function burstHearts(x, y) {
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.className = 'cursor-heart';
    heart.style.left = `${x + (Math.random() * 120 - 60)}px`;
    heart.style.top = `${y + (Math.random() * 100 - 50)}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  }
}

function confettiBlast() {
  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'spark';
    piece.style.position = 'fixed';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = '-10px';
    piece.style.width = '8px';
    piece.style.height = '12px';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.opacity = '0.9';
    piece.style.borderRadius = '3px';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.animation = `drift ${2 + Math.random() * 2}s linear forwards`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

function typeRevealLines() {
  typedText.textContent = '';
  const full = revealLines.join('\n');
  let idx = 0;
  const timer = setInterval(() => {
    typedText.textContent += full[idx];
    idx += 1;
    if (idx >= full.length) {
      clearInterval(timer);
    }
  }, 40);
}

function onYesClick() {
  document.body.classList.add('romantic-mode');
  confettiBlast();
  burstHearts(window.innerWidth / 2, window.innerHeight / 2);

  beatSound.volume = 0.22;
  beatSound.play().catch(() => {});

  proposal.classList.remove('active');
  reveal.classList.add('active');
  reveal.setAttribute('aria-hidden', 'false');

  typeRevealLines();
}

function addCursorHeartTrail(event) {
  if (Math.random() < 0.7) return;
  const heart = document.createElement('span');
  heart.textContent = '💗';
  heart.className = 'cursor-heart';
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
}

function resetProposal() {
  noAttempts = 0;
  yesScale = 1;
  noBtn.style = '';
  noBtn.textContent = '😢 NO';
  yesBtn.classList.remove('yes-grow');
  yesBtn.style.removeProperty('--grow');
  hintText.textContent = '';

  reveal.classList.remove('active');
  reveal.setAttribute('aria-hidden', 'true');
  proposal.classList.add('active');
}

window.addEventListener('contextmenu', (event) => event.preventDefault());
window.addEventListener('mousemove', addCursorHeartTrail);
window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'y') {
    alert('See? Even the keyboard knows the answer 😉');
  }
});

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', () => {
  alert("Error 404: 'No' not found in your heart 💞");
  moveNoButton();
});
yesBtn.addEventListener('click', onYesClick);
replayBtn.addEventListener('click', resetProposal);

createFloatingLayer(bgHearts, 'heart', '💗', 24);
createFloatingLayer(particles, 'spark', '•', 32);
updateCountdown();
setInterval(updateCountdown, 60000);

['click', 'touchstart', 'keydown'].forEach((evt) => {
  window.addEventListener(evt, tryPlayMusic, { once: true });
});

tryPlayMusic();
