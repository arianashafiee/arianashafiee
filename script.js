$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive

    // Navbar stickiness logic
    $(window).scroll(function () {
        const scrollY = this.scrollY;

        if (scrollY > 20) {
            $('.navbar').addClass('sticky');
            $('.dropdown').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
            $('.dropdown').removeClass('sticky');
        }

        // Auto-scroll logic
        if (homeActive && scrollY >= 219 && scrollY < 652) {
            $('#image-section-link')[0].click(); // Simulate click on Image Section
            updateState("image");
        } else if (imageActive && scrollY < 219) {
            $("#home-section-link")[0].click(); // Simulate click on Home Section
            updateState("home");
        } else if (imageActive && scrollY >= 1190 && scrollY < 1649) {
            $("#what-section-link")[0].click(); // Simulate click on What I Do Section
            updateState("whatIDo");
        } else if (whatIDoActive && scrollY < 1190) {
            $('#image-section-link')[0].click(); // Simulate click on Image Section
            updateState("image");
        }
    });

    // Update active states
    function updateState(activeSection) {
        homeActive = activeSection === "home";
        imageActive = activeSection === "image";
        whatIDoActive = activeSection === "whatIDo";
    }

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function () {
        $('html').css('scrollBehavior', 'smooth');
    });

    // Menu button toggle
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');

        // Reset active sections if menu is toggled
        updateState("home");
    });

    // Close menu on link click
    $('.navbar .menu li a').click(function () {
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Typing animation logic
    var typed = new Typed('.typing', {
        strings: [
            ' SWE intern',
            'Founding UX @ Otto',
        ],
        typeSpeed: 140,
        backSpeed: 100,
        loop: true,
    });
});
