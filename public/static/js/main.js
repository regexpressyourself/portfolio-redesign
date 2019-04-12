let focusPortfolioItem = (id, isBody = false) => {
  let style = [
    'background-color: rebeccapurple',
    'font-size: 64px'
  ].join(';');

  let el = document.querySelector(`#${id}`);
  if (isBody && el.classList.contains('portfolio__item--active')) { return;}
  switch (id) {
    case 'personalist':
      break;
    case 'orderup-hookup':
      break;
    case 'twitch-tracker':
      break;
    case 'git-flow':
      break;
    case 'practice-buddy':
      break;
    case 'blog':
      break;
    default:
      break;
  }
  if (el.classList.contains('portfolio__item--active')) {
    setTimeout(() => {
      el.classList.remove('portfolio__item--active');
    }, 50);
  }
  else {
    el.classList.add('portfolio__item--active');
  }
}


let scrollDownTo = (className) => {
  let el = document.querySelector(`.${className}`);
  el.scrollIntoView({
    behavior: 'smooth'
  });
}

let openContactForm = () => {
  let form = document.querySelector('.contact-form');
  let section = document.querySelector('.contact-section');
  let buttons = document.querySelectorAll('.btn');
  for (let button of buttons) {
    if (!button.classList.contains('btn--form')) {
    button.blur();
    button.style.opacity = 0;
    }
  }

  form.classList.add('contact-form--active');
  section.classList.add('contact-section--active');
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
      isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
      closeContactForm();
    }
  };
}

let closeContactForm = () => {
  let form = document.querySelector('.contact-form');
  let section = document.querySelector('.contact-section');
  let buttons = document.querySelectorAll('.btn');
  for (let button of buttons) {
    button.blur();
    button.style.opacity = 1;
  }
  section.classList.add('contact-section--active--out-trans');
  form.classList.add('contact-form--active--out-trans');

  setTimeout(() => {
    form.classList.remove('contact-form--active--out-trans');
    form.classList.remove('contact-form--active');
    section.classList.remove('contact-section--active--out-trans');
    section.classList.remove('contact-section--active');
  }, 500);

}
let onInputFocus = () => {
    alert("ASDF");
}

(() => {
  document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('click', () => { el.focus(); });
  });
  for (let el of document.querySelectorAll('.portfolio__item')) {

    for (let child of el.childNodes) {
      if (child.classList === undefined) {continue;}

      if (child.classList.contains('portfolio__item__x'))  {
        child.onclick = () => { focusPortfolioItem(el.id) };
        child.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize-2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>';
        break;
      }
      if (child.classList.contains('item__img-container')) {
        child.onclick = () => { focusPortfolioItem(el.id, false) };
        break;
      }
    } // end for child
  } // end for el

  document.getElementById("cr-date").innerHTML = new Date().getFullYear();
})()
