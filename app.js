const REQUEST_URL =
  "https://api.instagram.com/v1/users/self/media/recent/?access_token=7095386667.1677ed0.27c4cb0a84814f4a90d01335a6cdef62";

const imageContainer = document.querySelector("#images");

fetch(REQUEST_URL)
  .then(res => res.json())
  .then(({ data }) => {
    [...data].map(el => {
      // prettier-ignore
      imageContainer.innerHTML = `
        <div class="view">
          <img src=${el.images.standard_resolution.url} class="main-image" />
          <h4 class="image-caption">${el.caption.text}</h4>
        </div>
      `;

      addImageHandlers();
    });
  });

var addImageHandlers = () => {
  const images = document.querySelectorAll(".main-image");

  [...images].map(image => {
    image.addEventListener("mouseover", function(event) {
      getMouseDirection(event, this);
    });

    image.addEventListener("mouseout", function(event) {
      getMouseDirection(event, this);
    });
  });
};

var getMouseDirection = (event, obj) => {
  var w = obj.offsetWidth;
  var h = obj.offsetHeight;
  var x = event.pageX - obj.offsetLeft - w / 2 * (w > h ? h / w : 1);
  var y = event.pageY - obj.offsetTop - h / 2 * (h > w ? w / h : 1);
  var d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

  // prettier-ignore
  const direction =
    d === 0 ? "down" : 
    d === 1 ? "left" : 
    d === 2 ? "up" : 
    d === 3 ? "right" : null;
  console.log(direction);
};
