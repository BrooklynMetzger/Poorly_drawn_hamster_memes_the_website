document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.button');
  const imageFrame = document.querySelector('.image');

  button.addEventListener('click', async () => {

    // 1. DISABLE THE BUTTON IMMEDIATELY
    button.disabled = true;

    // 2. RE-ENABLE IT AFTER 2 SECONDS (2000 milliseconds)
    setTimeout(() => {
      button.disabled = false;
    }, 2000);
    
    imageFrame.innerHTML = '<div class="loader"></div>';

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    try {
      const response = await fetch('./stickers.json');
      const stickers = await response.json();

      const randomIndex = Math.floor(Math.random() * stickers.length);
      const randomSticker = stickers[randomIndex];

      const imageUrl = randomSticker.url || randomSticker.src || randomSticker;

     setTimeout(() => {
        imageFrame.innerHTML = `
          <img 
            src="${imageUrl}" 
            alt="Random Hamster" 
            class="fade-in"
            style="width: 100%; height: 100%; object-fit: contain;"
          />
        `;
      }, 1500);
      
    } catch (error) {
      console.error("Error loading hamster stickers:", error);
      imageFrame.innerHTML = `<span class="text">Oops! Couldn't load the hamster.</span>`;
    }
  });

  // CARD CLICK / COPY LINK
  const card = document.querySelector('.card');

  card.addEventListener('click', async () => {
    //Look for the image inside frame
    const currentImage = imageFrame.querySelector('img');

    if (currentImage && currentImage.src) {
      try {
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
        
        card.classList.add('copied');
        
        setTimeout(() => {
          card.classList.remove('copied');
        }, 2000);

      } catch (err) {
        console.error('Failed to copy the link: ', err);
      }
    }
  });
});