// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the buttons
    const resumeButton = document.querySelector(".resume .neon-btn");
    const contactButton = document.querySelector(".contact a");

    // Add event listeners for button clicks
    if (resumeButton) {
        resumeButton.addEventListener("click", function (event) {
            // Prevent default link behavior
            event.preventDefault();
            
            // Open the resume in a new tab
            const resumeUrl = "assets/Anthony Sky Ng-Thow-Hing resume.pdf";
            window.open(resumeUrl, "_blank");
        });
    }

    if (contactButton) {
        contactButton.addEventListener("click", function (event) {
            // Smooth scroll to the contact section
            event.preventDefault();
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
