/**
 * Закрепленное к верху меню навигации
 *
 */
const fixedNavigationMenu = () => {
  const navigation = document.querySelector('.navigation');
  window.onscroll = () => {
    if(window.pageYOffset > 100) {
      navigation.style.backgroundColor = 'black';
      navigation.style.paddingTop = '0';
    } else {
      navigation.style.backgroundColor = '';
      navigation.style.paddingTop = '';
    }
  }
}

fixedNavigationMenu()
