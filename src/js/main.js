/**
 * Закрепленное к верху меню навигации
 */
const fixedNavigationMenu = () => {
  const navigation = document.querySelector('.navigation');
  window.onscroll = () => {
    if(window.pageYOffset > 10) {
      navigation.style.backgroundColor = 'black';
      navigation.style.paddingTop = '0';
    } else {
      navigation.style.backgroundColor = '';
      navigation.style.paddingTop = '';
    }
  }
};

/**
 * Модальные окна для заказа обратного звонка
 */

/**
 * Инициализация
 */
// var scrollW = window.innerWidth - document.body.clientWidth;
var modal = new tingle.modal({
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  beforeClose: function() {
    document.querySelector('body').style.overflow= 'auto';
    document.querySelector('body').style.paddingRight= 0 + 'px';
    return true; // close the modal
  },
  cssClass: ['custom-class-1', 'custom-class-2']
});

/**
 * Форма обратного звонка
 */
var callBackWrap = () => {
  return`<div class="call">
            <div class="g-wrapper">
              <div class="call__content">
                <div class="call__title"> Заказать звонок</div>
                <form class="call__form">
                  <div class="call__item">
                    <label class="call__field"> * Ваше имя:</label>
                    <input class="call__input" type="text" required name="name" placeholder="Например, Антон" />
                  </div>
                  <div class="call__item">
                    <label class="call__field"> * Ваш телефон:</label>
                    <input class="call__input" type="tel" required name="phone" placeholder="+7 (999) 999-99-99" />
                  </div>
                  <button class="button call__submit"> Записаться </button>
                </form>
              </div>
            </div>
          </div>
        `
};

/**
 * Функция вызова модальных окон
 */
var callBack = function(){
  const callBackButton = Array.prototype.slice.call(document.querySelectorAll('.callback'));
  if(!callBackButton) return null;
  callBackButton.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(callBackWrap());
    document.querySelector('body').style.paddingRight= window.innerWidth - document.body.clientWidth + 'px';
    document.querySelector('body').style.overflow= 'hidden';
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal').style.zIndex="1000000";
    document.querySelector('.tingle-modal-box').style.background="none";
    modal.open();
  })
}

/**
 * Блок с выбором продуктов. Отображение активных продуктов при наведении.
 * Весь контент находится в папке vendor, файл products.json
 */
const productsBlock = () => {
  const title = document.querySelector('.products__title');
  const text = document.querySelector('.products__text');
  const circles = [...document.querySelectorAll('.products .circle')]
  fetch('/vendor/products.json').then(r => r.json()).then(products => {
    circles.forEach((c, i) => {
      c.onmouseover = () => {
        title.innerHTML = products[i].title;
        text.innerHTML = products[i].text;
      }
    })
  })
};

/**
 * Скрипт блока с картой. Соответствие класса в SVG маркерах с data-tag блока .geography__item
 *
 */
const geographyBlock = () => {
  const markers = [...document.querySelector('.geography #markers').children];
  const buttons = [...document.querySelectorAll('.geography__item')];
  buttons.forEach(button => {
    button.onclick = () => {
      if (button.classList.contains('geography__item_selected')) return null
      const tag = button.getAttribute('data-tag');
      buttons.forEach(b => b.classList.remove('geography__item_selected'))
      button.classList.add('geography__item_selected');
      if (tag === 'pa') return markers.forEach(m => m.style.display = '');
      markers.forEach(m => m.style.display = m.classList.contains(tag)? '' : 'none' );
    }
  })
}

/**
 * Плавный скролл
 */
new SmoothScroll('a[href*="#"]', { speed: 1500 })

/**
 * мобильное меню
 */
const mobileMenu = () => {
  const hamburger = document.querySelector('.mobile__hamburger');
  const close = document.querySelector('.mob-menu__close');
  const menu = document.querySelector('.mob-menu');
  const buttonScroll = document.querySelector('.button__scroll');
  const items = [...document.querySelectorAll('.mob-menu__item'), buttonScroll ];
  items.forEach( el => el.onclick = () => menu.style.bottom = '');
  hamburger.onclick = () => menu.style.bottom = 0;
  close.onclick = () => menu.style.bottom = '';
}

/**
 * Блок с фото. Контент в /vendor/moments.json
 *
 */
const momentsBlock = () => {
  const buttonsBlock = document.querySelector('.moments__line');
  const imageWrapper = document.querySelector('.moments__photowrapper img');
  const year = document.querySelector('.moments__year');
  const text = document.querySelector('.moments__text');
  fetch('/vendor/moments.json').then(r => r.json()).then(content => {
    buttonsBlock.innerHTML = content.map((el, i) => `
    <div class="moments__item ${i === 0? 'moments__item_active' : ''}" data-tag="${i}">
      <div class="moments__circle"></div>
      <div class="moments__label">${el.label}</div>
    </div>
    `).join('');
    imageWrapper.src = content[0].photo;
    year.innerHTML = content[0].label;
    text.innerHTML = content[0].text;
    const buttons = [...document.querySelectorAll('.moments__item')];
    buttons.forEach(button => {
      button.onclick = (e) => {
        if (e.currentTarget.classList.contains('moments__item_active')) return null;
        buttons.forEach(b => b.classList.remove('moments__item_active'))
        const tag = e.currentTarget.getAttribute('data-tag');
        e.currentTarget.classList.add('moments__item_active')
        imageWrapper.src = content[tag].photo;
        year.innerHTML = content[tag].label;
        text.innerHTML = content[tag].text;
      }
    })
  })
}

fixedNavigationMenu();
productsBlock();
mobileMenu();
geographyBlock();
callBack();
momentsBlock();

