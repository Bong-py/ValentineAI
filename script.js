const noBtn = document.getElementById('noBtn');
const teaseText = document.getElementById('teaseText');

if (noBtn) {
  const messages = [
    'Nice try 😂',
    'No button is on vacation ✈️',
    'That button has commitment issues 😅',
    'Maybe just press YES? 🥺',
  ];

  const moveNoButton = () => {
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 120 - 60;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    teaseText.textContent = messages[Math.floor(Math.random() * messages.length)];
  };

  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('click', moveNoButton);
}
