/* =========================================================
   ICT251 ACTIVITY 3
   INTERACTIVE PERSONAL WEBSITE
   ========================================================= */


/* =========================================================
   FEATURE 1: EXPANDABLE PROJECT DETAILS
   ========================================================= */

// Find all buttons used for showing project details
const detailButtons = document.querySelectorAll(".details-button");

// Add a click event to every Show Details button
detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Find the project containing the clicked button
        const project = button.closest(".project");

        // Find the details paragraph inside that project
        const details = project.querySelector(".project-details");

        // Show or hide the details
        details.classList.toggle("show");

        // Change the button text
        if (details.classList.contains("show")) {
            button.textContent = "Hide Details";
        } else {
            button.textContent = "Show Details";
        }

    });

});


/* =========================================================
   FEATURE 2: CONTACT FORM VALIDATION AND PREVIEW
   ========================================================= */

// Get the contact form
const contactForm = document.getElementById("contactForm");

// Get the feedback area
const formFeedback = document.getElementById("formFeedback");


// Check whether an email address has a reasonable format
function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// Show an error message beside a form field
function showFieldError(field, message) {

    // Add error styling
    field.classList.add("field-error");

    // Check whether an error message already exists
    let errorMessage = field.parentElement.querySelector(".error-message");

    // Create an error message if one does not exist
    if (!errorMessage) {

        errorMessage = document.createElement("p");

        errorMessage.className = "error-message";

        field.parentElement.appendChild(errorMessage);
    }

    // Add the error text
    errorMessage.textContent = message;

}


// Remove the error message from a form field
function clearFieldError(field) {

    field.classList.remove("field-error");

    const errorMessage =
        field.parentElement.querySelector(".error-message");

    if (errorMessage) {
        errorMessage.remove();
    }

}


// Listen for form submission
if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();


        // Get values from the form
        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const topic =
            document.getElementById("topic").value;

        const message =
            document.getElementById("message").value.trim();


        // Get the form fields
        const nameField =
            document.getElementById("name");

        const emailField =
            document.getElementById("email");

        const messageField =
            document.getElementById("message");


        // Clear previous errors
        clearFieldError(nameField);
        clearFieldError(emailField);
        clearFieldError(messageField);

        formFeedback.textContent = "";

        formFeedback.className = "";


        // Store whether the form is valid
        let formIsValid = true;


        /* -----------------------------------------
           NAME VALIDATION
           ----------------------------------------- */

        if (name === "") {

            showFieldError(
                nameField,
                "Please enter your name."
            );

            formIsValid = false;
        }


        /* -----------------------------------------
           EMAIL VALIDATION
           ----------------------------------------- */

        if (email === "") {

            showFieldError(
                emailField,
                "Please enter your email address."
            );

            formIsValid = false;

        } else if (!isValidEmail(email)) {

            showFieldError(
                emailField,
                "Please enter a valid email address."
            );

            formIsValid = false;
        }


        /* -----------------------------------------
           MESSAGE VALIDATION
           ----------------------------------------- */

        if (message === "") {

            showFieldError(
                messageField,
                "Please enter a message."
            );

            formIsValid = false;
        }


        /* -----------------------------------------
           DISPLAY RESULT
           ----------------------------------------- */

        if (!formIsValid) {

            formFeedback.textContent =
                "Please correct the errors above before submitting the form.";

            formFeedback.classList.add("form-error");

            return;
        }


        /* -----------------------------------------
           VALID FORM SUMMARY
           ----------------------------------------- */

        formFeedback.classList.add("form-success");

        formFeedback.textContent =
            "Form validated successfully. " +
            "Name: " + name +
            " | Email: " + email +
            " | Topic: " +
            (topic || "Not selected") +
            " | Message: " + message +
            ". No data has been sent to a server.";


        // The form is NOT actually sent to a server.
        // Activity 3 only requires validation and preview.
    });

}


/* =========================================================
   FEATURE 3: PHOTO GALLERY VIEWER
   ========================================================= */

// Find all images inside the photo gallery
const galleryImages =
    document.querySelectorAll(".photo-gallery img");


// Only create the gallery viewer if photos exist
if (galleryImages.length > 0) {

    // Store the image paths
    const imageSources = [];

    // Store the image alternative text
    const imageAlts = [];


    // Put all gallery information into arrays
    galleryImages.forEach(function (image) {

        imageSources.push(image.src);

        imageAlts.push(image.alt);

    });


    // Keep track of the currently displayed image
    let currentImage = 0;


    // Create the gallery viewer
    const galleryViewer =
        document.createElement("div");

    galleryViewer.className = "gallery-viewer";


    // Create large image
    const viewerImage =
        document.createElement("img");

    viewerImage.src = imageSources[currentImage];

    viewerImage.alt = imageAlts[currentImage];


    // Create controls container
    const galleryControls =
        document.createElement("div");

    galleryControls.className = "gallery-controls";


    // Create Previous button
    const previousButton =
        document.createElement("button");

    previousButton.type = "button";

    previousButton.textContent = "Previous";


    // Create Next button
    const nextButton =
        document.createElement("button");

    nextButton.type = "button";

    nextButton.textContent = "Next";


    // Add buttons to controls
    galleryControls.appendChild(previousButton);

    galleryControls.appendChild(nextButton);


    // Add image and controls to viewer
    galleryViewer.appendChild(viewerImage);

    galleryViewer.appendChild(galleryControls);


    // Add the viewer after the original photo gallery
    const photoGallery =
        document.querySelector(".photo-gallery");

    photoGallery.parentElement.appendChild(galleryViewer);


    // Update the gallery image
    function updateGallery() {

        viewerImage.src =
            imageSources[currentImage];

        viewerImage.alt =
            imageAlts[currentImage];


        // Disable Previous at the first image
        if (currentImage === 0) {
            previousButton.disabled = true;
        } else {
            previousButton.disabled = false;
        }


        // Disable Next at the last image
        if (currentImage === imageSources.length - 1) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }

    }


    // Previous button
    previousButton.addEventListener("click", function () {

        if (currentImage > 0) {

            currentImage--;

            updateGallery();
        }

    });


    // Next button
    nextButton.addEventListener("click", function () {

        if (currentImage < imageSources.length - 1) {

            currentImage++;

            updateGallery();
        }

    });


    // Set the initial state
    updateGallery();

}


/* =========================================================
   FEATURE 4: THEME SWITCH
   ========================================================= */

// Create the theme button
const themeButton =
    document.createElement("button");

themeButton.type = "button";

themeButton.textContent = "Switch to Dark Theme";

themeButton.className = "theme-button";


// Find the header
const header =
    document.querySelector("header");


// Put the theme button inside the header
if (header) {

    header.appendChild(themeButton);

}


// Theme button click event
themeButton.addEventListener("click", function () {

    // Add or remove dark theme
    document.body.classList.toggle("dark-theme");


    // Change button text
    if (document.body.classList.contains("dark-theme")) {

        themeButton.textContent =
            "Switch to Light Theme";

    } else {

        themeButton.textContent =
            "Switch to Dark Theme";

    }

});
