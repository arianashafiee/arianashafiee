$(document).ready(function () {
    const svgSection = document.getElementById('svg-section');

    function updateSvgSectionFocus() {
        if (!svgSection) {
            return;
        }

        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const rect = svgSection.getBoundingClientRect();
        const isInView = scrollY >= viewportHeight * 0.45
            && rect.top <= viewportHeight * 0.2
            && rect.bottom >= viewportHeight * 0.6;

        document.body.classList.toggle('svg-section-in-view', isInView);
    }

    $(window).on('scroll resize', updateSvgSectionFocus);
    updateSvgSectionFocus();

    $(window).scroll(function () {
        if (this.scrollY > 1056.4000244140625) {
            $('.navbar').addClass('sticky');
            $('.dropdown').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
            $('.dropdown').removeClass('sticky');
        }
    });

    // Script to toggle menu and navbar
    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css('scrollBehavior', 'smooth');
    });

    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active')
        $('.menu-btn i').toggleClass('active');
    });
    $('.navbar .menu li a').click(function () {
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Typing Script
    var typed = new Typed('.typing', {
        strings: [
            "Full-Stack Dev",
            "Software Engineer",
            "Problem Solver",

        ],
        typeSpeed: 140,
        backSpeed: 100,
        loop: true,
    });
});