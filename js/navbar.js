document.addEventListener("DOMContentLoaded", function () {
    // Select all anchor links in the navbar
    const links = document.querySelectorAll("nav ul li a");
  
    // Add click event listener to each link
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
  
        // Get the target section ID from the href attribute
        const targetId = this.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
  
        // Scroll smoothly to the target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  });
  