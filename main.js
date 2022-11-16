const vBar = document.getElementById("bar");
const vNavItems = document.getElementById("nav-items");
const vHeader = document.getElementById("header");
const vLanding = document.getElementById("landing");
const vImg = document.getElementById("main-img");
const vBoxText = document.querySelector(".box-text");
const vName = document.getElementById("name");
const vJobName = document.getElementById("job-name");
const vTitle = document.getElementById("title");
const vTheme = document.getElementById("theme");
const vMoon = document.getElementById("moon");
const vFooter = document.getElementById("footer");
const vAmount = document.getElementById("amount");
const vPeriod = document.getElementById("period");
const vImg_1 = document.getElementById("img-1");
const vImg_2 = document.getElementById("img-2");
const vImg_3 = document.getElementById("img-3");
const vToUp = document.getElementById("to-up");
const vReviews = document.getElementById("reviews");
const vEndPrice = document.getElementById("end-price");
const vLoad = document.getElementById("load");
const vOptions = document.querySelector(".options");
const vAllImages = document.querySelectorAll(".images p");
const vDate = document.getElementById("date");
const vCity = document.getElementById("city");
const vTemp = document.getElementById("temp");
const vIcon = document.querySelector("#icon img");
const vWeather = document.getElementById("weather");
const vArrow = document.getElementById("arrow");
const vDesc = document.getElementById("desc");
const vH3 = document.querySelector(".section .text h3");

let isChecked = true;

let newDate = new Date().toString().split(" ").splice(0, 4).join(" ");
vDate.innerHTML = newDate;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  console.log("Not Suppoted");
}

function onSuccess(position) {
  const { latitude: lat, longitude: lon } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q&units=metric&lat=${lat}&lon=${lon}&appid=7e538f59f3a0414c21a85ed17a4b0552`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      vCity.innerHTML = weather.name;
      vTemp.innerHTML = `${weather.main.temp}<sup style="font-size: 40px;">&deg</sup><sup style="font-size: 45px;">c</sup>`;
      const { description, id } = weather.weather[0];
      vDesc.innerHTML = description;

      if (id == 800) {
        vIcon.src = "images/icons/clear.svg";
      } else if (id >= 200 && id <= 232) {
        vIcon.src = "images/icons/storm.svg";
      } else if (id >= 600 && id <= 622) {
        vIcon.src = "images/icons/snow.svg";
      } else if (id >= 701 && id <= 781) {
        vIcon.src = "images/icons/haze.svg";
      } else if (id >= 801 && id <= 804) {
        vIcon.src = "images/icons/cloud.svg";
      } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        vIcon.src = "images/icons/rain.svg";
      }
    });
}

function onError(error) {
  console.log(error);
  alert("You Most Open The GPS To See The Weather");
}

vArrow.addEventListener("click", () => {
  if (isChecked) {
    vWeather.style.left = "-125px";
    vArrow.classList.add("arrow-change");
    vArrow.title = "Click To Hide";
    isChecked = false;
  } else {
    vWeather.style.left = "-345px";
    vArrow.classList.remove("arrow-change");
    vArrow.title = "Click To See The Weather";
    isChecked = true;
  }
});

vBar.addEventListener("click", () => {
  if (isChecked) {
    vNavItems.style.top = "65px";
    isChecked = false;
  } else {
    vNavItems.style.top = "-300px";
    isChecked = true;
  }
});

vMoon.addEventListener("click", () => {
  if (isChecked) {
    vTheme.setAttribute("content", "dark");
    vLanding.style.backgroundImage = "url('images/build_1.jpg')";
    vFooter.style.background = "linear-gradient(to bottom, #121212, #4c9786)";
    vAmount.style.backgroundColor = "#757575";
    vPeriod.style.backgroundColor = "#757575";
    vLanding.style.backgroundColor = "transparent";
    vBoxText.style.backgroundColor = "#00000082";
    vBoxText.style.borderRadius = "10px";
    vH3.style.color = "white";
    vMoon.style.color = "yellow";
    isChecked = false;
  } else {
    vTheme.setAttribute("content", "light");
    vLanding.style.backgroundImage = "url('images/build_3.jpg')";
    vFooter.style.background = "linear-gradient(to bottom, #FFF, #ccf8ee)";
    vAmount.style.backgroundColor = "#fff";
    vPeriod.style.backgroundColor = "#fff";
    vLanding.style.backgroundColor = "#00ffc357";
    vBoxText.style.backgroundColor = "";
    vBoxText.style.borderRadius = "";
    vH3.style.color = "#013f33";
    vMoon.style.color = "white";
    isChecked = true;
  }
});

vAmount.addEventListener("change", () => {
  if (vAmount.value == "first") {
    vOptions[1].setAttribute("price", "$90900");
    vOptions[2].setAttribute("price", "$72345");
    vOptions[3].setAttribute("price", "$52310");
  } else if (vAmount.value == "second") {
    vOptions[1].setAttribute("price", "$33230");
    vOptions[2].setAttribute("price", "$17235");
    vOptions[3].setAttribute("price", "$10100");
  } else {
    vOptions[1].setAttribute("price", "$9480");
    vOptions[2].setAttribute("price", "$5345");
    vOptions[3].setAttribute("price", "$3500");
  }
  vPeriod.removeAttribute("disabled");
});

vPeriod.onchange = function () {
  if (this.selectedIndex == 1) {
    vEndPrice.innerHTML = vOptions[1].getAttribute("price");
  } else if (this.selectedIndex == 2) {
    vEndPrice.innerHTML = vOptions[2].getAttribute("price");
  } else if (this.selectedIndex == 3) {
    vEndPrice.innerHTML = vOptions[3].getAttribute("price");
  } else {
    vEndPrice.innerHTML = "$0";
  }
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= 10) {
    vWeather.style.transitionDuration = "0s";
  } else {
    setTimeout(() => {
      vWeather.style.transitionDuration = ".3s";
    }, 1000);
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    vHeader.classList.add("trans-header");
    setTimeout(() => {
      vWeather.style.top = "55px";
      vHeader.classList.add("pos-header");
      vLanding.classList.add("mar");
    }, 150);
  } else {
    vHeader.classList.add("else-header");
    vHeader.classList.remove("trans-header");
    setTimeout(() => {
      vWeather.style.top = "120px";
      vHeader.classList.remove("pos-header");
      vLanding.classList.remove("mar");
      vHeader.classList.remove("else-header");
    }, 150);
  }
});

function infofilling(counter) {
  fetch("info.json")
    .then((result) => {
      return result.json();
    })
    .then((myData) => {
      vTitle.innerHTML = myData.data[counter].title;
      vImg.src = myData.data[counter].img;
      vName.innerHTML = myData.data[counter].name;
      vJobName.innerHTML = myData.data[counter].job_name;
    });
}

infofilling(0);

vImg_1.addEventListener("click", () => {
  vTitle.style.opacity = 0;
  vImg.style.opacity = 0;
  vName.style.opacity = 0;
  vJobName.style.opacity = 0;
  setTimeout(() => {
    vTitle.style.opacity = 1;
    vImg.style.opacity = 1;
    vName.style.opacity = 1;
    vJobName.style.opacity = 1;
  }, 300);
  infofilling(0);
});

vImg_2.addEventListener("click", () => {
  vTitle.style.opacity = 0;
  vImg.style.opacity = 0;
  vName.style.opacity = 0;
  vJobName.style.opacity = 0;
  setTimeout(() => {
    vTitle.style.opacity = 1;
    vImg.style.opacity = 1;
    vName.style.opacity = 1;
    vJobName.style.opacity = 1;
  }, 300);
  infofilling(1);
});

vImg_3.addEventListener("click", () => {
  vTitle.style.opacity = 0;
  vImg.style.opacity = 0;
  vName.style.opacity = 0;
  vJobName.style.opacity = 0;
  setTimeout(() => {
    vTitle.style.opacity = 1;
    vImg.style.opacity = 1;
    vName.style.opacity = 1;
    vJobName.style.opacity = 1;
  }, 300);
  infofilling(2);
});

vAllImages.forEach((el) => {
  el.addEventListener("click", function () {
    vAllImages.forEach(function (el) {
      el.style.backgroundColor = "#00000082";
      el.classList.remove("animation");
      el.style.animation = "";
    });
    this.style.backgroundColor = "";
    this.classList.add("animation");
  });
});

fetch("info.json")
  .then((info) => {
    return info.json();
  })
  .then((myInfo) => {
    for (let i = 0; i < myInfo.latest_news.length; i++) {
      let reviews = `
      <div class="news">
        <img id="rev-img-1" class="imgs" src="${myInfo.latest_news[i].img}" alt="">
        <span id="rev-date-1">${myInfo.latest_news[i].date}</span>
        <h3 id="rev-opt-1">${myInfo.latest_news[i].option}</h3>
        <p id="rev-title-1">${myInfo.latest_news[i].title}</p>
      </div>
      `;
      vReviews.innerHTML += reviews;
    }
  });

window.addEventListener("scroll", () => {
  if (window.scrollY >= 400) {
    setTimeout(() => {
      vToUp.style.opacity = 1;
    }, 150);
    vToUp.style.display = "flex";
  } else {
    vToUp.style.display = "none";
    vToUp.style.opacity = 0;
  }
});

vToUp.addEventListener("click", () => {
  vToUp.style.transform = "translateY(-80px)";
  window.scrollTo(0, 0);
  setTimeout(() => {
    vToUp.style.opacity = 0;
  }, 500);
  setTimeout(() => {
    vToUp.style.display = "none";
    vToUp.style.transform = "translateY(0px)";
  }, 1000);
});

window.addEventListener("load", () => {
  window.scrollTo(top);
  vLoad.style.display = "flex";
  vLoad.classList.add("loader");
  vLoad.style.opacity = "1";
  setTimeout(() => {
    setTimeout(() => {
      vLoad.classList.remove("loader");
    }, 1800);
    vLoad.style.opacity = "0";
    setTimeout(() => {
      vLoad.style.display = "none";
    }, 2200);
  }, 2000);
});
