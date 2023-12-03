console.log(8);

let blogData;
let visiblePosts = 10;

function showLoadingIndicator() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = "block";
  }
  const blogContainer = document.querySelector(".blogcontainer");
  if (blogContainer) {
    blogContainer.classList.add("grey-out");
  }
}

function hideLoadingIndicator() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
  const blogContainer = document.querySelector(".blogcontainer");
  if (blogContainer) {
    blogContainer.classList.remove("grey-out");
  }
}

async function fetchBlogPosts() {
  try {
    const response = await fetch(
      "https://mina-roseth.no/wp-json/wp/v2/posts?per_page=16"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    blogData = await response.json();
    return blogData;
  } catch (error) {
    throw new Error(`Error fetching blog posts: ${error.message}`);
  }
}

function createBlogPostElement(blog) {
  const blogItem = document.createElement("div");
  blogItem.classList.add("blogitem");

  const link = document.createElement("a");
  link.href = `/html/post.html?id=${blog.id}`;

  const image = document.createElement("img");
  image.src = blog.better_featured_image.source_url;
  image.alt = blog.better_featured_image.alt_text;
  image.classList.add("blogimage");

  // Add an event listener to the image to prevent the default behavior
  image.addEventListener("click", (event) => {
    event.preventDefault();
  });

  const title = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleLink.href = `/html/post.html?id=${blog.id}`;
  titleLink.textContent = blog.title.rendered;
  title.appendChild(titleLink);

  const description = document.createElement("p");
  description.classList.add("blog-description");
  description.innerHTML = blog.excerpt.rendered;

  link.appendChild(image);
  blogItem.appendChild(link);
  blogItem.appendChild(title);
  blogItem.appendChild(description);

  return blogItem;
}

function displayPosts() {
  showLoadingIndicator();

  const blogContainer = document.querySelector(".blogcontainer");
  if (blogContainer) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blogcontainer");

    // Display only the first 10 posts initially
    for (let i = 0; i < visiblePosts && i < blogData.length; i++) {
      const blogItem = createBlogPostElement(blogData[i]);
      postContainer.appendChild(blogItem);
    }

    blogContainer.appendChild(postContainer);

    if (visiblePosts < blogData.length) {
      const showMoreButton = document.createElement("button");
      showMoreButton.textContent = "View More";
      showMoreButton.id = "showMoreButton";
      showMoreButton.addEventListener("click", showMorePosts);
      blogContainer.appendChild(showMoreButton);
    }
  }

  hideLoadingIndicator();
}

function showMorePosts() {
  showLoadingIndicator();

  const blogContainer = document.querySelector(".blogcontainer");
  if (blogContainer) {
    const postContainer = blogContainer.querySelector(".blogcontainer");

    // Display all remaining posts when "View More" is clicked
    for (let i = visiblePosts; i < blogData.length; i++) {
      const blogItem = createBlogPostElement(blogData[i]);
      postContainer.appendChild(blogItem);
    }

    visiblePosts = blogData.length; // Update visiblePosts to the total number of posts

    const showMoreButton = document.getElementById("showMoreButton");
    if (showMoreButton) {
      showMoreButton.style.display = "none"; // Hide the button when all posts are displayed
    }
  }

  hideLoadingIndicator();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBlogPosts()
    .then(() => {
      displayPosts();
    })
    .catch((error) => {
      console.error("Error in fetchBlogPosts:", error);
      displayErrorMessage(
        "An error occurred while fetching blog posts. Please try again later."
      );
    });
});
