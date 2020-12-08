const $imageContainer = document.getElementById('image-container');
const $loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'bE4fLreLcYRmRVEM9AUWr1pu4Lm3G9-pMzyLqVpJeZc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if All images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        $loader.hidden = true;
        imagesLoaded = 0;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
};

// Helper Function to Set Attributes on DOM Elements

const setAttributes = (element, attribute) => {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
};

// Create Elements For Links & Photos, Add to DOM

const displayPhotos = (photos) => {
    totalImages = photos.length;
    // Run function for each object in photosArray
    photos.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Craete <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, sheck when each is finiched loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put bpth inside imageContainer Element
        item.appendChild(img);
        $imageContainer.appendChild(item);
    });
};

// Get photos from Unsplash API

const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        const photosArray = await response.json();
        displayPhotos(photosArray);
    } catch (error) {
        // Catch Error Here
    }
};

// Check to see if scroling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
