const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function fetchBlogPostById(postId) {
  try {
    const response = await fetch(
      `https://mina-roseth.no/wp-json/wp/v2/posts/${postId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blogPost = await response.json();
    return blogPost;
  } catch (error) {
    throw new Error(`Error fetching blog post: ${error.message}`);
  }
}

function displayBlogPost(blogPost) {
  const titleElement = document.querySelector(".title");
  const imageElement = document.querySelector(".shopimagebig");
  const descriptionElement = document.getElementById("description");
  const releaseElement = document.getElementById("release");
  const genreElement = document.getElementById("genre");
  const ageElement = document.getElementById("age");

  titleElement.textContent = blogPost.title.rendered;
  imageElement.src = blogPost.better_featured_image.source_url;
  imageElement.alt = blogPost.title.rendered;
  descriptionElement.innerHTML = blogPost.content.rendered;
  releaseElement.textContent = `Date: ${blogPost.date}`;
  genreElement.textContent = `Tags: ${blogPost.tags
    .map((tag) => tag.name)
    .join(" ")}`;
  ageElement.textContent = "Frontend";

  document.title = blogPost.title.rendered;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogPostById(postId)
    .then((blogPost) => {
      displayBlogPost(blogPost);
    })
    .catch((error) => {
      console.error("Error in fetchBlogPostById:", error);
      // Handle error, e.g., display an error message on the page
    });
});
