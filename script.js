// Show the "Certificate image goes here" placeholder until the certificate image file exists.
const imageIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.6"/><path d="m21 16-5-5-9 9"/></svg>';

document.querySelectorAll('.frame-cert img').forEach((img) => {
  const showPlaceholder = () => {
    const box = document.createElement('div');
    box.className = 'placeholder';
    box.innerHTML = imageIcon + '<span>Certificate image goes here</span>';
    img.replaceWith(box);
  };
  if (img.complete && img.naturalWidth === 0) showPlaceholder();
  else img.addEventListener('error', showPlaceholder, { once: true });
});


// ---------- Videos ----------
// Each .card-video can use a YouTube ID (data-youtube) or a file path (data-src).
// If both are empty, a "Video goes here" placeholder is shown.
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

document.querySelectorAll('.card-video').forEach((card) => {
  const box = card.querySelector('.video-box');
  const yt = (card.dataset.youtube || '').trim();
  const src = (card.dataset.src || '').trim();
  const title = card.querySelector('h3').textContent;

  if (yt) {
    box.innerHTML = '<button class="video-thumb" type="button" aria-label="Play video: ' + title + '">' +
      '<img src="https://img.youtube.com/vi/' + yt + '/hqdefault.jpg" alt="" loading="lazy">' +
      '<span class="play">' + playIcon + '</span></button>';
    box.querySelector('button').addEventListener('click', () => {
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0" ' +
        'title="' + title + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  } else if (src) {
    box.innerHTML = '<video controls preload="metadata" playsinline src="' + src + '"></video>';
  } else {
    box.innerHTML = '<div class="placeholder">' + imageIcon.replace('<rect', '<rect') + '<span>Video goes here</span></div>';
  }
});
