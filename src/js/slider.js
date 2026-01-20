 const slider = document.getElementById("productSlider");
      const nextBtn = document.querySelector(".next-btn");
      const prevBtn = document.querySelector(".prev-btn");
      nextBtn.addEventListener("click", () => {
        slider.scrollBy({
          left: slider.querySelector(".product-card").offsetWidth + 16,
          behavior: "smooth",
        });
      });

      prevBtn.addEventListener("click", () => {
        slider.scrollBy({
          left: -(slider.querySelector(".product-card").offsetWidth + 16),
          behavior: "smooth",
        });
      });

    document.getElementById("go-whatsapp").addEventListener('click',()=>{
      const whatsappURL = `https://wa.me/919205957977?text=Hello! DriveDNA`;
    window.open(whatsappURL, "_blank");
    })
      