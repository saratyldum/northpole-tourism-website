export default function Hamburger() {
	const menu = document.querySelector('.navigation__menu');
	const menuItems = document.querySelectorAll('.navigation__menu--link');
	const hamburgerIcon = document.querySelector('.navigation__hamburger-button');
	const closeIcon = document.querySelector('.navigation__close-button');

	hamburgerIcon.addEventListener('click', toggleMenu);
	closeIcon.addEventListener('click', toggleMenu)

	/**
	 * Toggles the visibility of the navigation menu when the hamburger icon or close icon is clicked
	 */
	function toggleMenu() {;
		if (menu.classList.contains('showMenu')) {
			menu.classList.remove('showMenu');
			closeIcon.style.display = 'none';
		}else {
			menu.classList.add('showMenu');
			closeIcon.style.display = 'block'
		}
	}

	for (let index = 0; index < menuItems.length; index +=1) {
		menuItems[index].addEventListener('click', toggleMenu);
	};
}