function fetchProducts() {
  const apiUrl = "https://mina-roseth.no/wp-json/wp/v2/posts/";

  return fetch(apiUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);

      return data;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      throw error;
    });
}

export { fetchProducts };
