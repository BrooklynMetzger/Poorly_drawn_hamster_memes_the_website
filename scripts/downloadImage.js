document.addEventListener('DOMContentLoaded', () => {
  // Find the button (Make sure your button has id="second-button" on any page you use it)
  const downloadBtn = document.getElementById('second-button');

  // ONLY run this code if the download button actually exists on the page
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      
      // Look for the frame. It will check for ID first, then fallback to class
      const imageFrame = document.querySelector('#hamster-frame') || document.querySelector('.image');
      
      if (!imageFrame) {
        console.error("Could not find the image frame on this page.");
        return;
      }

      const currentImage = imageFrame.querySelector('img');

      if (currentImage && currentImage.src) {
        const originalText = downloadBtn.innerText;
        downloadBtn.innerText = "Downloading... ⏳";

        try {
          const response = await fetch(currentImage.src);
          const blob = await response.blob();
          
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          // You can even extract the original file name if you want, but this is a safe default
          link.download = 'hamster_meme.png'; 
          
          document.body.appendChild(link);
          link.click();
          
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);

          downloadBtn.innerText = "Downloaded! ✅";

        } catch (error) {
          console.error("Download failed:", error);
          window.open(currentImage.src, '_blank');
          downloadBtn.innerText = "Opened in New Tab ↗️";
        }

        setTimeout(() => {
          downloadBtn.innerText = originalText;
        }, 2000);

      } else {
        const originalText = downloadBtn.innerText;
        downloadBtn.innerText = "No Hamster yet! :(";
        setTimeout(() => {
          downloadBtn.innerText = originalText;
        }, 2000);
      }
    });
  }
});