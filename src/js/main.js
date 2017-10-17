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
}

fixedNavigationMenu();
productsBlock();
