	const images = ["img1", "img2", "img3", "img4", "img5"];
    const container = document.getElementById("imageContainer");
    const resetBtn = document.getElementById("reset");
    const verifyBtn = document.getElementById("verify");
    const message = document.getElementById("para");

    let selectedImages = [];

    function shuffleImages() {
      const duplicate = images[Math.floor(Math.random() * images.length)];
      const imageSet = [...images, duplicate];
      imageSet.sort(() => Math.random() - 0.5);

      container.innerHTML = "";
      imageSet.forEach((cls, index) => {
        const img = document.createElement("img");
        img.className = cls;
        img.dataset.id = cls + index;
        img.addEventListener("click", handleImageClick);
        container.appendChild(img);
      });
    }

    function handleImageClick(event) {
      const img = event.target;
      if (selectedImages.includes(img)) return;

      img.classList.add("selected");
      selectedImages.push(img);

      if (selectedImages.length === 1) {
        resetBtn.style.display = "inline-block";
      }

      if (selectedImages.length === 2) {
        verifyBtn.style.display = "inline-block";
      }

      if (selectedImages.length > 2) {
        selectedImages[0].classList.remove("selected");
        selectedImages.shift();
      }
    }

    resetBtn.addEventListener("click", () => {
      selectedImages.forEach(img => img.classList.remove("selected"));
      selectedImages = [];
      resetBtn.style.display = "none";
      verifyBtn.style.display = "none";
      message.textContent = "";
    });

    verifyBtn.addEventListener("click", () => {
      const [first, second] = selectedImages;
      if (first.className === second.className) {
        message.textContent = "You are a human. Congratulations!";
      } else {
        message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyBtn.style.display = "none";
    });

    shuffleImages();