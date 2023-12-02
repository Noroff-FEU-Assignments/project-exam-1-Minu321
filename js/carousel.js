document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");

  // Fetch blog posts from the provided API
  fetch(
    "https://www.mina-roseth.no/wp-json/wp/v2/posts?_embed&per_page=12&_sort=-date"
  )
    .then((response) => response.json())
    .then((data) => {
      const blogPosts = data.map((post) => ({
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        image:
          post._embedded["wp:featuredmedia"][0].media_details.sizes.medium
            .source_url,
        link: post.link,
      }));

      initCarousel(blogPosts);
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Initialize the carousel
  function initCarousel(blogPosts) {
    // Duplicate the blog posts to create a seamless loop
    const duplicatedPosts = [
      ...blogPosts,
      ...blogPosts,
      ...blogPosts,
      ...blogPosts,
    ];

    duplicatedPosts.forEach((post, index) => {
      const card = document.createElement("div");
      card.classList.add("carousel-card");
      card.innerHTML = `
        <a href="${post.link}" target="_blank">
          <img src="${post.image}" alt="${post.title}">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
        </a>
      `;
      carousel.appendChild(card);
    });

    // Add event listeners for navigation arrows
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;

    // Handle next button click
    nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 4) % duplicatedPosts.length;
      updateCarousel();
    });

    // Handle previous button click
    prevBtn.addEventListener("click", function () {
      currentIndex =
        (currentIndex - 4 + duplicatedPosts.length) % duplicatedPosts.length;
      updateCarousel();
    });

    // Function to update the carousel based on the current index
    function updateCarousel() {
      const translateValue = -currentIndex * (100 / 4) + "%";
      carousel.style.transform = `translateX(${translateValue})`;
    }
  }
});
