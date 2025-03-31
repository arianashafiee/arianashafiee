// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the buttons
    const resumeButton = document.getElementById("resume-button");
    const contactButton = document.getElementById("contact-button");

    // Add event listener for the RESUME button
    if (resumeButton) {
        resumeButton.addEventListener("click", function (event) {
            // Prevent default behavior
            event.preventDefault();

            // Open the resume in a new tab
            const resumeUrl = "assets/shafiee-resume.pdf";
            window.open(resumeUrl, "_blank");
        });
    }

    // Add event listener for the CONTACT button
    if (contactButton) {
        contactButton.addEventListener("click", function (event) {
            // Prevent default behavior
            event.preventDefault();

            // Smooth scroll to the contact section
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
