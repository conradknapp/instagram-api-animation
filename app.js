const REQUEST_URL =
  "https://api.instagram.com/v1/users/self/media/recent/?access_token=7095386667.1677ed0.27c4cb0a84814f4a90d01335a6cdef62";

const imageContainer = document.querySelector("#images");
const images = document.getElementsByTagName("li");

fetch(REQUEST_URL)
  .then(res => res.json())
  .then(({ data }) => {
    [...data].map(el => {
      // prettier-ignore
      imageContainer.innerHTML += `
        <li>
          <a class="main-image">
           <img src=${el.images.standard_resolution.url} alt=${
        JSON.stringify(el.caption.text)
      } />
          </a>
          <div class="caption">
            <h4 id="text">${el.caption.text}</h4>
          </div>
        </li>
      `;

      addImageHandlers();
    });
  });

var addImageHandlers = () => {
  const images = document.querySelectorAll(".main-image");

  [...images].map(image => {
    image.addEventListener("mouseover", function(event) {
      changeTextColor(event, this);
      addClass(event, this, "in");
    });

    image.addEventListener("mouseout", function(event) {
      addClass(event, this, "out");
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
    d === 0 ? "up" : 
    d === 1 ? "right" : 
    d === 2 ? "down" : 
    d === 3 ? "left" : null;
  return direction;
};

var changeTextColor = (event, obj) => {
  var alt = obj.children[0].alt;

  if (alt.indexOf("Water") !== -1) {
    setTimeout(() => (imageContainer.style.color = "orange"), 300);
  } else if (alt.indexOf("Tree") !== -1) {
    setTimeout(() => (imageContainer.style.color = "navy"), 300);
  } else if (alt.indexOf("parasol") !== -1) {
    setTimeout(() => (imageContainer.style.color = "white"), 300);
  } else if (alt.indexOf("Bridge") !== -1) {
    setTimeout(() => (imageContainer.style.color = "yellow"), 300);
  }
  // let alt = event.target.alt;
  // if (!alt) return;
  // let textColor = document.getElementById("text").style.color;
  // console.log(alt);
  // if (alt.indexOf("Tree") !== -1) {
  //   console.log(alt);
  //   textColor = "blue";
  // } else if (alt.indexOf("Woman") !== -1) {
  //   textColor = "yellow";
  // }
};

var addClass = (event, obj, state) => {
  obj = obj.parentNode;
  obj.className = "";
  var direction = getMouseDirection(event, obj);
  var animationName = `${state}-${direction}`;
  obj.className = animationName;
};

[...images].map((el, i) => {
  if (i >= 0 && i <= 3) {
    el.style.animationDelay = `${i + 1}00ms`;
  } else {
    el.style.animationDelay = `${i - 3}00ms`;
  }
});
