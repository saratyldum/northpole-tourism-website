export default function Hamburger() {
	let menuVisible = false;

	const menu = document.querySelector('.navigation__menu');
	const menuItems = document.querySelectorAll('.navigation__menu--link');
	const hamburgerIcon = document.querySelector('.navigation__hamburger-button');
	const closeIcon = document.querySelector('.navigation__close-button');
	const mobileDevice = window.matchMedia('(max-width: 768px)');


	hamburgerIcon.addEventListener('click', handleHamburgerIconClick);
	closeIcon.addEventListener('click', handleCloseIconClick)


	function handleHamburgerIconClick() {
		toggleMenu();
	};

	function handleCloseIconClick() {
		toggleMenu();
	};

	/**
	 * Toggles the visibility of the navigation menu when the hamburger icon or close icon is clicked
	 */
	function toggleMenu() {;
		menuVisible = !menuVisible;
		if (!menuVisible) {
			menu.classList.remove('showMenu');
			closeIcon.style.display = 'none';
		}else {
			menu.classList.add('showMenu');
			closeIcon.style.display = 'block'
		}
	}

	//makes menu close when menu items are clicked
	if(window.innerWidth < 768) {
		for (let index = 0; index < menuItems.length; index +=1) {
			menuItems[index].addEventListener('click', toggleMenu);
		};
	}
}