$(function(){

  const header = document.querySelector('.nav');
    window.onscroll = () => {
        if (window.pageYOffset > 40) {
            header.classList.add('nav__active');
        } else {
            header.classList.remove('nav__active');
        }
    };

  $('.menu__btn').on('click', function(){
    $('.menu__btn').toggleClass('menu__btn--active');
    $('.menu__list').toggleClass('menu__list--active');
  });

  $('.menu__list-link').on('click', function(){
    $('.menu__btn').removeClass('menu__btn--active');
    $('.menu__list').removeClass('menu__list--active');
  });


});

// const anchors = document.querySelectorAll('a[href^="#"]');

// for(let anchor of anchors) {
//   anchor.addEventListener("click", function(e) {
//     e.preventDefault(); 
//     const blockID = anchor.getAttribute('href')
//     document.querySelector('' + blockID).scrollIntoView({
//       behavior: "smooth",
//       block: "start"
//     })
//   })
// }

(function () {

  const smoothScroll = function (targetEl, duration) {
      const headerElHeight =  document.querySelector('.nav').clientHeight;
      let target = document.querySelector(targetEl);
      let targetPosition = target.getBoundingClientRect().top - headerElHeight;
      // let targetPosition = target.getBoundingClientRect().top - 110;
      let startPosition = window.pageYOffset;
      let startTime = null;
  
      const ease = function(t,b,c,d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      };
  
      const animation = function(currentTime){
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, targetPosition, duration);
          window.scrollTo(0,run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);

  };

  const scrollTo = function () {
      const links = document.querySelectorAll('.js-scroll');
      links.forEach(each => {
          each.addEventListener('click', function () {
              const currentTarget = this.getAttribute('href');
              smoothScroll(currentTarget, 1000);
          });
      });
  };
  scrollTo();
}());


console.log('Init!');

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.form');

validation
  
  .addField('.input-name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Введите 2 и более символов',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Запрещено вводить более 15 символов',
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!',
    }
  ])
  .addField('.input-mail', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Введите корректный Email',
    },
  ])
  .addField('.input-tel', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();
    let modal = document.querySelector('.modal_thinks');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
          setTimeout(modal_start);
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();

    function modal_start() {
      modal.style.display = 'block';
    }
    function modal_end() {
      modal.style.display = 'none';
    }
    
    setTimeout(modal_end, 3000);
  });
