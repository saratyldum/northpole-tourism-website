export default function Header() {
	// const mediaQuery = window.matchMedia('max-width: 992px')
	const headerVisibleThreshold = 200;

	let currentScrollDirection = null;
	let previousScrollPosition = 0;
	
	const navigation = document.querySelector('.navigation');
	const logo = document.querySelector('.logo');

	if (navigation !== null /*&& mediaQuery.matches*/) {
		window.addEventListener('scroll', handleWindowScroll);
	}

	function handleWindowScroll(event) {
		toggleNavigationVisibility();
	}

	/**
	 * shows navigation when user is scrolling up and hides it when scrolling down
	 */
	function toggleNavigationVisibility() {
		const scrollY = window.scrollY;
		let yPos = window.pageYOffset + 16;

		if (scrollY > previousScrollPosition) {
			currentScrollDirection = 'down';
		} else {
			currentScrollDirection = 'up';
		}

		if (currentScrollDirection === 'down' && scrollY >= headerVisibleThreshold) {
			navigation.style.top = 0 + 'px'
		} else {
			navigation.style.top = yPos + 'px';
		}
		previousScrollPosition = scrollY;
	}

}