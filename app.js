const REQUEST_URL =
  "https://api.instagram.com/v1/users/self/media/recent/?access_token=7095386667.1677ed0.27c4cb0a84814f4a90d01335a6cdef62";

const images = document.querySelector("#images");

fetch(REQUEST_URL)
  .then(res => res.json())
  .then(({ data }) => {
    [...data].map(image => {
      images.innerHTML = `
      <main class="view">
      <img src=${image.images.standard_resolution.url} class="main-image" />
      <h4 class="image-caption">${image.caption.text}</h4>
      </main>
      `;
    });
  });
