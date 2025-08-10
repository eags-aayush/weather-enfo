const settingsIcon = document.getElementById('settingsIcon');
const navLinks = document.getElementById('navLinks');
const icon = document.querySelector("#icon");

settingsIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    icon.classList.toggle("fa-xmark");
});

//temperature
const temp = () => {
    let tempSelectedUnit = "C"; // Default

    const tempUnitButtons = document.querySelectorAll(".temp-unit");

    tempUnitButtons.forEach(button => {
        button.addEventListener("click", () => {
            tempUnitButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            tempSelectedUnit = button.dataset.unit;
            console.log("Selected:", tempSelectedUnit);
        });
    });
};

temp();

//time
let timeSelectedUnit = "12";

const timeUnitButtons = document.querySelectorAll(".time-unit");

timeUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        timeUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        timeSelectedUnit = button.dataset.unit;
        console.log("Selected:", timeSelectedUnit);
    });
});

//speed
let speedSelectedUnit = "kmph";

const speedUnitButtons = document.querySelectorAll(".speed-unit");

speedUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        speedUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        speedSelectedUnit = button.dataset.unit;
        console.log("Selected:", speedSelectedUnit);
    });
});

//pressure
let pressureSelectedUnit = "kmph";

const pressureUnitButtons = document.querySelectorAll(".pressure-unit");

pressureUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        pressureUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        pressureSelectedUnit = button.dataset.unit;
        console.log("Selected:", pressureSelectedUnit);
    });
});

//theme
let themeSelectedUnit = "light";

const themeUnitButtons = document.querySelectorAll(".theme-unit");

themeUnitButtons.forEach(button => {
    button.addEventListener("click", () => {
        themeUnitButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        themeSelectedUnit = button.dataset.unit;
        console.log("Selected:", themeSelectedUnit);
    });
});