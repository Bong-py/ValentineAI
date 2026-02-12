const defaultPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=800&q=80',
    caption: 'Our favorite memory 💕',
  },
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Date night vibes ✨',
  },
  {
    src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
    caption: 'Flowers for you 🌹',
  },
];

const gallery = document.getElementById('gallery');
const uploadPreview = document.getElementById('uploadPreview');
const uploadInput = document.getElementById('uploadInput');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseText = document.getElementById('responseText');

function renderPhotos(container, photos) {
  container.innerHTML = photos
    .map(
      ({ src, caption }) => `
      <article class="photo-card">
        <img src="${src}" alt="${caption}">
        <p>${caption}</p>
      </article>
    `
    )
    .join('');
}

renderPhotos(gallery, defaultPhotos);

yesBtn.addEventListener('click', () => {
  responseText.textContent = 'Yay! Best Valentine ever! 🎉💖';
});

noBtn.addEventListener('mouseenter', () => {
  noBtn.style.transform = `translate(${Math.random() * 30 - 15}px, ${Math.random() * 20 - 10}px)`;
});

noBtn.addEventListener('click', () => {
  responseText.textContent = 'I will ask again tomorrow 😄';
});

uploadInput.addEventListener('change', () => {
  const files = Array.from(uploadInput.files || []);
  if (!files.length) {
    uploadPreview.innerHTML = '';
    return;
  }

  const previews = files.map((file) => ({
    src: URL.createObjectURL(file),
    caption: file.name,
  }));

  renderPhotos(uploadPreview, previews);
});
