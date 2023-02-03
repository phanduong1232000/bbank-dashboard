const bind1 = document.querySelector.bind(document)
const bind2 = document.querySelectorAll.bind(document)

const toggleNavMobile = () => {
    bind1('.soft-menu').classList.toggle('open')
    bind1('.soft-menu__list').classList.toggle('open')
}

bind2('.soft-menu__item').forEach((element) => {
  element.onclick = () => {
    toggleNavMobile()
  }
})

bind1('.scroll-to-top').onclick = () => {
    window.scrollTo({
        top: 0,
        left: 100,
        behavior: 'smooth'
    });
}

// handle animation number
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, 17)

    function updateNumber() {
        if (currentNumber >= finalNumber) {
            clearInterval(interval)
        } else {
            let inc = Math.ceil(finalNumber / (duration / 17))
            if (currentNumber + inc > finalNumber) {
                currentNumber = finalNumber
                clearInterval(interval)
            } else {
                currentNumber += inc
            }
            callback(currentNumber)
        }
    }
}

// loading animation
window.addEventListener('load', (event) => {
  bind1('.loading').style.display = "none"

  // animateNumber(6186056420, 2000, 0, function(number) {
  //   const formattedNumber = number.toLocaleString()
  //   document.getElementById('total-staking').innerText = '$' + formattedNumber;
  // })
});


// SLIDER
var swiperLogoText = new Swiper(".swiper-logo-text", {
    slidesPerView: 3,
    spaceBetween: 10,
    // auto
    autoplay: {
        delay: 100,
        disableOnInteraction: false,
    },
    loop: true,
    loopedSlides: 50,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    speed: 4000,
    breakpoints: {
        // when window width is >= 480px
        120: {
        slidesPerView: 3,
        spaceBetween: 20
        },
        // when window width is >= 640px
       // when window width is >= 640px
        740: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1023: {
            slidesPerView: 8,
            spaceBetween: 60
        },
        1444: {
            slidesPerView: 10,
            spaceBetween: 80
        }
    },
});