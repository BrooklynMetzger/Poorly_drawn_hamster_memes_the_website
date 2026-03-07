document.addEventListener('DOMContentLoaded', () => {
    // --- CARD CLICK (COPY LINK) ---
  const card = document.querySelector('.card');

  card.addEventListener('click', async () => {
    // 1. Look for the image inside your frame
    const currentImage = imageFrame.querySelector('img');

    // 2. If an image exists, copy its source URL
    if (currentImage && currentImage.src) {
      try {
        // Bulletproof copy method (Works on https and local file:///)
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(currentImage.src);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = currentImage.src;
          textArea.style.position = "absolute";
          textArea.style.left = "-999999px";
          document.body.prepend(textArea);
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        
        // 3. Add the 'copied' class to trigger your CSS "Added !" effect
        card.classList.add('copied');
        
        // 4. Remove the class after 2 seconds to slide it back up
        setTimeout(() => {
          card.classList.remove('copied');
        }, 2000);

      } catch (err) {
        console.error('Failed to copy the link: ', err);
      }
    }
  });
});