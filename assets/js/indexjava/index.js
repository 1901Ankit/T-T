// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// countdown
function animateNumber(id, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    document.getElementById(id).textContent = Math.floor(
      progress * (end - start) + start
    ).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
function startAnimation(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateNumber("number1", 0, 48874, 2000);
      animateNumber("number2", 0, 5198, 2000);
      animateNumber("number3", 0, 1132, 2000);
      observer.unobserve(entry.target);
    }
  });
}
const observer = new IntersectionObserver(startAnimation, options);
const section = document.querySelector(".single-about-info");
observer.observe(section);

function sendCase() {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;
  let message = document.getElementById("message").value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mobileRegex = /^\+?\d{1,3}?[- .]?\(?\d{1,3}\)?[- .]?\d{1,4}[- .]?\d{4}$/;
  if (
    firstname === "" ||
    lastname === "" ||
    email === "" ||
    mobile === "" ||
    message === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }
  if (
    mobile.startsWith("1") ||
    mobile.startsWith("2") ||
    mobile.startsWith("3") ||
    mobile.startsWith("4") ||
    mobile.startsWith("5")
  ) {
    alert("Mobile number cannot start with digits 1 to 5.");
    return;
  }
  emailjs.init("m1feBx_DdRLLSv5N0");
  let params = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
    message: message,
  };
  let serviceID = "service_uf8trek";
  let templateID = "template_vtk55qk";

  emailjs
    .send(serviceID, templateID, params)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      document.getElementById("emailForm").reset();
      setTimeout(function () {
        window.location.href = "thank-you.html";
      }, 1000);
    })
    .catch(function (error) {
      console.log("FAILED...", error);
      alert("Error sending email. Please try again later.");
    });
}
document.getElementById("mobile").addEventListener("input", function (event) {
  let mobileInput = event.target.value;
  if (
    mobileInput.startsWith("1") ||
    mobileInput.startsWith("2") ||
    mobileInput.startsWith("3") ||
    mobileInput.startsWith("4") ||
    mobileInput.startsWith("5")
  ) {
    event.target.value = mobileInput.slice(0, -1);
  }
});

//faq[
let toggles = document.getElementsByClassName("togglefq");
let contentDiv = document.getElementsByClassName("contentfq");
let icons = document.getElementsByClassName("icon");

for (let i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener("click", () => {
    if (parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight) {
      contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
      toggles[i].style.backgroundColor = "#55acee";
      toggles[i].style.color = "white";
      icons[i].classList.remove("fa-plus");
      icons[i].classList.add("fa-minus");
    } else {
      contentDiv[i].style.height = "0px";
      toggles[i].style.backgroundColor = "";
      toggles[i].style.color = "#111130";
      icons[i].classList.remove("fa-minus");
      icons[i].classList.add("fa-plus");
    }

    for (let j = 0; j < contentDiv.length; j++) {
      if (j !== i) {
        contentDiv[j].style.height = 0;
        toggles[j].style.backgroundColor = "";
        toggles[j].style.color = "#111130";
        icons[j].classList.remove("fa-minus");
        icons[j].classList.add("fa-plus");
      }
    }

    toggles[i].scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
   
