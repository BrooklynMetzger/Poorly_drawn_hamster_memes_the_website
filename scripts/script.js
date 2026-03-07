const databaseUrl = './stickers.json'; 

async function loadStickers() {
  try {
    const response = await fetch(databaseUrl);
    const stickers = await response.json();
    
    const container = document.getElementById('sticker-container');
    
    // Select Modal Elements
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const copyBtn = document.getElementById('modal-copy-btn');
    const downloadBtn = document.getElementById('modal-download-btn');

    let currentStickerUrl = ''; // Keeps track of which image is currently in the modal

    // 1. GENERATE THE GALLERY
    stickers.forEach(sticker => {
      const img = document.createElement('img');
      img.src = sticker.url; 
      img.alt = sticker.name;
      img.className = 'sticker'; // Applies your new CSS

      // When an image is clicked, open the modal and pass the URL
      img.addEventListener('click', () => {
        currentStickerUrl = sticker.url;
        modalImage.src = sticker.url;
        modal.style.display = 'flex'; // Un-hide the modal
      });

      container.appendChild(img);
    });

    // 2. MODAL CLOSE LOGIC
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal if user clicks the dark background outside the modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // 3. COPY LINK LOGIC
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(currentStickerUrl);
        } else {
          // Fallback for local testing
          const textArea = document.createElement("textarea");
          textArea.value = currentStickerUrl;
          textArea.style.position = "absolute";
          textArea.style.left = "-999999px";
          document.body.prepend(textArea);
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied! ✅";
        setTimeout(() => copyBtn.innerText = originalText, 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });

    // 4. DOWNLOAD LOGIC
    downloadBtn.addEventListener('click', async () => {
      const originalText = downloadBtn.innerText;
      downloadBtn.innerText = "Downloading... ⏳";
      
      try {
        const res = await fetch(currentStickerUrl);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'beautiful-hamster.png';
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        
        downloadBtn.innerText = "Downloaded! ✅";
      } catch (err) {
        console.error("Download blocked:", err);
        window.open(currentStickerUrl, '_blank');
        downloadBtn.innerText = "Opened in New Tab ↗️";
      }
      
      setTimeout(() => downloadBtn.innerText = originalText, 2000);
    });

  } catch (error) {
    console.error('Failed to load the sticker database:', error);
  }
}

loadStickers();