$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // emailjs contact form
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        // Remove previous errors
        $(".error-message").remove();
        $("input, textarea").removeClass("error-border");

        const name = $("input[name='name']").val().trim();
        const email = $("input[name='email']").val().trim();
        const phone = $("input[name='phone']").val().trim();
        const message = $("textarea[name='message']").val().trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        let valid = true;
        let toastMessages = [];

        // Name validation
        if (name === "") {
            $("input[name='name']").addClass("error-border");
            toastMessages.push("Please enter your name");
            valid = false;
        }

        // Message validation
        if (message === "") {
            $("textarea[name='message']").addClass("error-border");
            toastMessages.push("Please enter your message");
            valid = false;
        }

        // Email validation
        if (!emailPattern.test(email)) {
            $("input[name='email']").addClass("error-border");
            toastMessages.push("Email is not valid");
            valid = false;
        }

        // Phone validation
        if (phone && !phonePattern.test(phone)) {
            $("input[name='phone']").addClass("error-border");
            toastMessages.push("Phone number is not valid (10 digits only)");
            valid = false;
        }

        // Show all validation errors as toasts
        if (toastMessages.length > 0) {
            toastMessages.forEach(msg => showToast(msg, "error"));
        }

        if (!valid) return;

        // Hide icon and show "Sending..."
        const button = $(".button-area button");
        const icon = button.find(".submit-icon");
        icon.hide();
        button.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith("Sending...");

        // Send email via EmailJS
        emailjs.init("tv3_UbPgWyRKYrjkE");
        emailjs.sendForm("service_x2sm0u6", "template_gxh2fx1", "#contact-form")
            .then(function (response) {
                $("#contact-form")[0].reset();
                showToast("Message sent successfully!", "success");
            }, function (error) {
                showToast("Message failed to send. Try again later.", "error");
            })
            .finally(function () {
                icon.show();
                button.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith("Submit");
            });
    });

});

// Change tab title and favicon when tab inactive
document.addEventListener('visibilitychange', function () {
    document.title = "Portfolio | Thejesh Chowdary";
    $("#favicon").attr("href", "assets/images/favicon.png");

});

// Typed.js text animation
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// SKILLS SECTION (inline data)
function showSkills() {
    const skills = [
        { name: "ReactJS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
        { name: "Next.js", icon: "https://img.icons8.com/color/48/000000/nextjs.png" },
        { name: "NodeJS", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "Android", icon: "https://img.icons8.com/fluency/48/000000/android-os.png" },
        { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/48px-Tailwind_CSS_Logo.png" },
        { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png" },
        { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "TypeScript", icon: "https://img.icons8.com/color/48/000000/typescript.png" },
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "Kotlin", icon: "https://img.icons8.com/color/48/000000/kotlin.png" },
        { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
        { name: "MySQL", icon: "https://img.icons8.com/color/48/000000/mysql-logo.png" },
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png" },
        { name: "WordPress", icon: "https://img.icons8.com/color/48/000000/wordpress.png" },
        { name: "Flutter", icon: "https://img.icons8.com/color/48/000000/flutter.png" }
    ];

    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";

    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });

    skillsContainer.innerHTML = skillHTML;
}
showSkills();

// PROJECTS FETCH
function showProjects() {
    const projects = [
        {
            name: "RacketPro Website",
            desc: "A professional PickleBall coaching and academy management platform built with modern web technologies and an interactive UI.",
            image: "racketpro",
            links: {
                view: "https://www.racketpro.org",
                code: ""
            },
            category: "basicweb"
        },
        {
            name: "BigBasket Clone",
            desc: "A responsive grocery shopping website inspired by BigBasket, developed using HTML, CSS, and JavaScript with product listing, cart, and checkout features.",
            image: "bigbasket",
            links: {
                view: "https://thejeshchowdary.github.io/Bigbasket/",
                code: "https://github.com/ThejeshChowdary/Bigbasket"
            },
            category: "basicweb"
        },
        {
            name: "Currency Converter",
            desc: "A web application built with HTML, CSS, and JavaScript that uses a real-time exchange rate API to convert between global currencies instantly.",
            image: "currencyconverter",
            links: {
                view: "https://thejeshchowdary.github.io/Currency-Converter/",
                code: "https://github.com/ThejeshChowdary/Currency-Converter"
            },
            category: "basicweb"
        },
    ];

    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";

    projects.forEach(project => {
        projectHTML += `
    <div class="box tilt ${project.category}">
        <img draggable="false" class="tilt" src="./assets/images/projects/${project.image}.png" alt="${project.name}" />
        <div class="content">
            <div class="tag"><h3>${project.name}</h3></div>
            <div class="desc">
                <p>${project.desc}</p>
                <div class="btns">
                    <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    ${project.links.code ? `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>` : ""}
                </div>
            </div>
        </div>
    </div>`;
    });


    projectsContainer.innerHTML = projectHTML;

    // Apply tilt animation to all boxes
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15, speed: 400, glare: true, "max-glare": 0.3 });

    // Scroll animation
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });
    srtop.reveal('#work .box', { interval: 200 });
}

showProjects();


// Tilt animation
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// Disable developer tools
document.onkeydown = function (e) {
    if (
        e.keyCode == 123 ||
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))
    ) {
        return false;
    }
};

// Tawk.to live chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// ScrollReveal Animations
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

//Toast

function showToast(message, type = "success", duration = 3000) {
    const toast = $('<div class="toast"></div>')
        .text(message)
        .addClass(type === "success" ? "success" : "error");

    $("#toast-container").append(toast);

    setTimeout(() => toast.addClass("show"), 100);

    setTimeout(() => {
        toast.removeClass("show");
        setTimeout(() => toast.remove(), 500);
    }, duration);
}


srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
