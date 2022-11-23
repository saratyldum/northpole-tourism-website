export default function Explore() {
	/**
	 * @todo MAKE IT SNOW
	 */
	
	const exploreButton = document.querySelector('.hero__explore-button');

	if (exploreButton !== null) {
		exploreButton.addEventListener('click', handleExploreButtonClick);
	}

	function handleExploreButtonClick(event) {
		let y = window.innerHeight;
		window.scrollTo({
			top: y,
			left: 0,
			behavior: "smooth"
		});
	}
}

