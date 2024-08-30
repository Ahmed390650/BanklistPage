'use strict';
///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav__links = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelectorAll('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const scrollTo = function () {
  section1.scrollIntoView({ behavior: 'smooth' });
};
btnScollTo.addEventListener('click', scrollTo);
nav__links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.forEach(t =>
  t.addEventListener('click', e => {
    const clicked = e.target.closest('.operations__tab');
    if (clicked) {
      tabs.forEach(t => t.classList.remove('operations__tab--active'));
      clicked.classList.add('operations__tab--active');
      tabsContent.forEach(t =>
        t.classList.remove('operations__content--active')
      );
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
    }
  })
);
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', e => {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imageObserver.observe(img));

const slider = document.querySelector('.slider');
const dotContainer = slider.querySelector('.dots');
const slides = document.querySelectorAll('.slide');
slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
  // s.closest('.dots').textContent = `<div class="dots dots__dot"></div>`;
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slider="${i}"></button>`
  );
});
let currSlide = 0;
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');
const activeDotButton = slider => {
  dotContainer
    .querySelectorAll('button')
    .forEach(b => b.classList.remove('dots__dot--active'));
  dotContainer
    .querySelector(`.dots__dot[data-slider="${slider}"]`)
    .classList.add('dots__dot--active');
};
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%) `;
  });
  activeDotButton(slide);
};
goToSlide(0);
const nextSlide = function () {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};
const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};
btnSlideRight.addEventListener('click', nextSlide);
btnSlideLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => {
  if (e.target.closest('.slider')) {
    e.key === 'ArrowRight' && nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slider } = e.target.dataset;
    goToSlide(slider);
  }
});

document.addEventListener('DOMContentLoaded', e => {
  console.log(e);
});
document.addEventListener('load', e => {
  console.log('e');
});
