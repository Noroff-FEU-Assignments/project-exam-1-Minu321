console.log(8);

let visiblePosts = 10;
const postsPerPage = 10; // Adjust as needed

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
    const response = await fetch("https://mina-roseth.no/wp-json/wp/v2/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blogData = await response.json();
    return blogData;
  } catch (error) {
    throw new Error(`Error fetching blog posts: ${error.message}`);
  }
}

function createBlogPostElement(blog) {
  const blogItem = document.createElement("div");
  blogItem.classList.add("blogitem");

  const link = document.createElement("a");
  link.href = `/product.html?id=${blog.id}`;

  const image = document.createElement("img");
  image.src = blog.better_featured_image.source_url;
  image.alt = `Image for the blog post: ${blog.title.rendered}`;
  image.classList.add("blogimage");

  const title = document.createElement("h2");
  title.textContent = blog.title.rendered;

  const description = document.createElement("p");
  description.textContent = blog.excerpt.rendered.replace(/<\/?p>/g, "");

  link.appendChild(image);
  blogItem.appendChild(link);
  blogItem.appendChild(title);
  blogItem.appendChild(description);

  return blogItem;
}

function displayErrorMessage(message) {
  const errorContainer = document.getElementById("error-container");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = message;
  if (errorContainer) {
    errorContainer.style.display = "block";
  }
}

function hideErrorMessage() {
  const errorContainer = document.getElementById("error-container");
  if (errorContainer) {
    errorContainer.style.display = "none";
  }
}

function showMorePosts(blogData, blogContainer) {
  showLoadingIndicator(); // Show loading indicator when loading more posts

  for (
    let i = visiblePosts;
    i < visiblePosts + postsPerPage && i < blogData.length;
    i++
  ) {
    const blogItem = createBlogPostElement(blogData[i]);
    blogContainer.appendChild(blogItem);
  }
  visiblePosts += postsPerPage;

  if (visiblePosts >= blogData.length) {
    // If all posts are displayed, hide the "Show More" button
    const showMoreButton = document.getElementById("showMoreButton");
    if (showMoreButton) {
      showMoreButton.style.display = "none";
    }
  }

  hideLoadingIndicator(); // Hide loading indicator after loading more posts
}

fetchBlogPosts()
  .then((blogData) => {
    const blogContainer = document.querySelector(".blogcontainer");

    // Wrap all the blog items in a container
    const postContainer = document.createElement("div");
    postContainer.classList.add("blogcontainer");

    hideLoadingIndicator();

    for (let i = 0; i < visiblePosts && i < blogData.length; i++) {
      const blogItem = createBlogPostElement(blogData[i]);
      postContainer.appendChild(blogItem);
    }

    // Append the post container to the blog container
    blogContainer.appendChild(postContainer);

    if (visiblePosts < blogData.length) {
      // If there are more posts, display the "Show More" button
      const showMoreButton = document.createElement("button");
      showMoreButton.textContent = "Show More";
      showMoreButton.id = "showMoreButton";
      showMoreButton.addEventListener("click", () =>
        showMorePosts(blogData, blogContainer)
      );
      blogContainer.appendChild(showMoreButton);
    }
  })
  .catch((error) => {
    console.error("Error in fetchBlogPosts:", error);
    displayErrorMessage(
      "An error occurred while fetching blog posts. Please try again later."
    );
  });
