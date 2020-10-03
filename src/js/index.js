const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imageCounter = 0;
let imageLoader = 0;
let totalImages = 0;


// !Unplase API
let count = 10;
const apiKey = "x6ySrvkiRTTnhdIVrYNge2L4llZ5Oi4Aktg69eoPxWM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Load Image
function loadImage() {
  imageLoader++;
  if (imageLoader === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30
  }
}

// !Create Elements for links and photos
const displayPhotos = () => {
  // Count Photos
  imageLoader = 0;
  totalImages = photosArray.length;

  // TODO: Run function for each object in PhotosArray
  photosArray.forEach((photo) => {
    // Put the Element
    imageCounter++;
    let newHTML = `<div class="image"><img id="image-${imageCounter}" src="${photo.urls.small}" alt="${photo.alt_description}" /><a href="${photo.links.download}" target: "_blank">&darr; Download</a></div>`;
    imageContainer.insertAdjacentHTML("beforeend", newHTML);

    // add load
    let photoLoad = document.getElementById(`image-${imageCounter}`);
    photoLoad.addEventListener("load", loadImage);
  });
};

// !Get Photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

//! Check to see if scrolling near bottom of page, load more photo
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      document.querySelector(".wrapper").offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// on Load
getPhotos();
