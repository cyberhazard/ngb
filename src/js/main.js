/**
 * Пост запрос формы обратной связи
 */
var sendMail = function sendMail(selector) {
  return fetch('/mail.php', {
    method: 'POST',
    body: new FormData(document.querySelector(selector))
  }).catch(function (error) {
    alertify.error("Ошибка. Повторите отправку позже");
  });
};
/**
 * Отправка заявки футер
 */
var footerForm = function(){
  const submit = document.querySelector('.footer__submit')
  const checkbox = document.querySelector('.confirm__label input')
  document.querySelector(".footer__form").onsubmit = function(e){
    e.preventDefault();
    if(!checkbox.checked){
      alertify.error("Вы не приняли соглашение об обработке персональных данных");
    } else {
      sendMail('.footer__form').then(_ => alertify.success("Ваша заявка отправленна"))

    }
  }
}
footerForm();

const callBackFormSend = () => {
  const form = document.querySelector('.call__form');
  form.onsubmit = e => (e.preventDefault(), sendMail('.call__form').then(_ => alertify.success("Ваша заявка отправленна")))
}


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
  beforeOpen: function() {
    document.querySelector('body').style.paddingRight= window.innerWidth - document.body.clientWidth + 'px';
    document.querySelector('body').style.overflow= 'hidden';
    document.querySelector('.tingle-modal').style.background="rgba(0, 0, 0, .9)";
    document.querySelector('.tingle-modal').style.zIndex="4000";
    document.querySelector('.tingle-modal-box').style.background="none";
  },
  onOpen: function() {
    callBackFormSend();
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
                  <button class="button call__submit" type="submit"> Записаться </button>
                </form>
              </div>
            </div>
          </div>
        `
};

const politic = `<div style="color: white; font-size: 2rem;">
<h1>Политика конфиденциальности</h1>
<p>Настоящий документ «Политика конфиденциальности» представляет собой правила использования [наименование владельца сайта] персональной информации Пользователя.</p>
<p>Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:</p>
<ul>
  <li>Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта, оказания услуг, обработку запросов и заявок от Пользователя.</li>
  <li>Осуществление клиентской поддержки</li>
  <li>Получения Пользователем информации о маркетинговых событиях</li>
  <li>Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых услуг</li>
</ul>
<h2>Персональная информация</h2>
<p>Под персональными данными подразумевается любая информация, предоставляемая пользователем самостоятельно, включая персональные данные пользователя, такие как:</p>
<ul>
<li>Фамилия, Имя, Отчество</li>
<li>Контактный телефон</li>
<li>Адрес электронной почты</li>
</ul>
А также данные, которые передаются в автоматическом режиме.
<p>Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.</p>
<p>Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением следующего случая:</p>
<ul>
<li>По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ.</li>
</ul>
<p> Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на Сайте.
</p></div>
`

/**
 * Функция вызова модальных окон
 */
var callBack = function(){
  const callBackButton = Array.prototype.slice.call(document.querySelectorAll('.callback'));
  if(!callBackButton) return null;
  callBackButton.forEach((el) => el.onclick = function(e){
    e.preventDefault();
    modal.setContent(callBackWrap());
    modal.open();
    [...document.querySelectorAll('input[type="tel"]')].forEach(input => new Inputmask('+7 (999) 999-99-99').mask(input));
  })
}

var showPolitics = function(){
  modal.setContent(politic);
  modal.open();
}
/**
 * Вызов политики конф в футер форме
 */
var openFooterPolitics = function(){
  const button = document.querySelector('#politics')
  button.onclick = function(){
    showPolitics();
  }
}
openFooterPolitics();

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
  const markers = [...document.querySelectorAll('.geography #markers g[class^="p"]')];
  const buttons = [...document.querySelectorAll('.geography__item')];
  buttons.forEach(button => {
    button.onmouseover = () => {
      if (button.classList.contains('geography__item_selected')) return null
      const tag = button.getAttribute('data-tag');
      buttons.forEach(b => b.classList.remove('geography__item_selected'))
      button.classList.add('geography__item_selected');
      if (tag === 'pa') return markers.forEach(m => m.style.display = '');
      // markers.forEach(m => m.style.display = m.classList.contains(tag)? '' : 'none' );
      markers.forEach(m => m.style.display = m.getAttribute('class').indexOf(tag) != -1? '' : 'none' );
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
  items.forEach( el => el.onclick = () => menu.style.transform = '');
  hamburger.onclick = () => (menu.style.transform = 'translateX(-100%)', document.body.style.overflow='hidden')
  close.onclick = () => (menu.style.transform = '', document.body.style.overflow='')
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
};

/**
 * Блок слайдера с данными бирж
 *
 */
const getQuotations = (interval) => {
  const makeBlock = ({ label, value, change }) => `<div class="quotations__block swiper-slide"><span><div class="quotations__label">${label}</div><div class="quotations__index">Индекс:<span class="quotations__index_regular">${value}</span><span class="quotations__index_${change.charAt(0) === '+'? 'green' : 'red'}">${change}</span></div><div class="quotations__time"><!--?xml version="1.0" encoding="UTF-8"?-->
  <svg viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Desktop" transform="translate(-436.000000, -1049.000000)" fill-rule="nonzero" fill="#808080">
              <g id="#2" transform="translate(390.000000, 763.000000)">
                  <g id="quotations" transform="translate(0.000000, 160.000000)">
                      <g id="item_1" transform="translate(43.000000, 30.000000)">
                          <g id="time" transform="translate(3.000000, 93.000000)">
                              <g id="clock" transform="translate(0.000000, 3.000000)">
                                  <path d="M6.49763825,0 C8.29193615,0 9.91650316,0.729322034 11.0958021,1.90341404 C12.2703776,3.08254237 13,4.70644068 13,6.5 C13,8.29355932 12.2703776,9.91745763 11.0958021,11.096586 C9.91618826,12.270678 8.29193615,13 6.49763825,13 C4.70334036,13 3.07908824,12.270678 1.90451275,11.096586 C0.724898869,9.91745763 0,8.29387409 0,6.5 C0,4.70644068 0.724583969,3.08254237 1.90419785,1.90341404 C3.07908824,0.729322034 4.70334036,0 6.49763825,0 L6.49763825,0 Z M9.8116416,6.14525424 C10.0065644,6.14525424 10.161495,6.30515738 10.161495,6.5 C10.161495,6.69484262 10.0065644,6.85474576 9.8116416,6.85474576 L6.50771504,6.85474576 L6.49763825,6.85474576 C6.36758472,6.85474576 6.25264637,6.77983051 6.19281544,6.67501211 L6.18777705,6.66997579 L6.18777705,6.66997579 L6.18273866,6.65990315 L6.18273866,6.65990315 L6.18273866,6.65486683 L6.18273866,6.65486683 L6.17770026,6.64479419 L6.17770026,6.64479419 L6.17266187,6.63472155 L6.17266187,6.63472155 L6.17266187,6.62968523 L6.17266187,6.62968523 L6.16762348,6.61961259 L6.16762348,6.61961259 L6.16258508,6.61457627 L6.16258508,6.61457627 L6.16258508,6.60450363 L6.16258508,6.60450363 L6.15754669,6.59443099 L6.15754669,6.59443099 L6.15754669,6.58939467 L6.15754669,6.58939467 L6.1525083,6.57932203 L6.1525083,6.57932203 L6.1525083,6.56924939 L6.1525083,6.56924939 L6.1525083,6.56421308 L6.1525083,6.55917676 L6.1474699,6.55414044 L6.1474699,6.55414044 L6.1474699,6.5440678 L6.1474699,6.5440678 L6.1474699,6.53399516 L6.1474699,6.53399516 L6.1474699,6.5251816 L6.1474699,6.5251816 L6.1474699,6.52014528 L6.1474699,6.52014528 L6.1474699,6.51007264 L6.1474699,6.51007264 L6.1474699,6.5 L6.1474699,6.5 L6.1474699,2.26823245 C6.1474699,2.07338983 6.3024005,1.918523 6.49732335,1.918523 C6.6922462,1.918523 6.8522152,2.07338983 6.8522152,2.26823245 L6.8522152,6.14525424 L9.8116416,6.14525424 Z M10.5960565,2.40326877 C9.54649614,1.35414044 8.0970133,0.709491525 6.49763825,0.709491525 C4.89826321,0.709491525 3.44878037,1.35382567 2.39922002,2.40326877 C1.35469806,3.45239709 0.704745295,4.90128329 0.704745295,6.5 C0.704745295,8.09871671 1.35438316,9.54760291 2.39922002,10.597046 C3.44878037,11.6461743 4.89826321,12.2908232 6.49763825,12.2908232 C8.0970133,12.2908232 9.54649614,11.6461743 10.5960565,10.597046 C11.6456168,9.54791768 12.2955696,8.09903148 12.2955696,6.5 C12.2955696,4.90128329 11.6459317,3.45239709 10.5960565,2.40326877 L10.5960565,2.40326877 Z" id="Shape"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
  </svg>
  ${new Date().toLocaleString()}</div></span></div>`

  fetch('/api/indexes.php').then(r => r.json()).then(data => {
    const wrapper = document.querySelector('.quotations__slider');
    wrapper.innerHTML = data.map(makeBlock).join('');
    new Swiper('.quotations__blocks', {
      slidesPerView: 4,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: '.quotations__circle.left',
        nextEl: '.quotations__circle.right'
      },
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        676: {
          slidesPerView: 2
        },
        360: {
          slidesPerView: 1
        }
      }
    })
  }).catch(console.log);
  // setTimeout(() => getQuotations(interval), interval)
};

[...document.querySelectorAll('input[type="tel"]')].forEach(input => new Inputmask('+7 (999) 999-99-99').mask(input))

fixedNavigationMenu();
productsBlock();
mobileMenu();
geographyBlock();
callBack();
momentsBlock();
getQuotations(30000);



