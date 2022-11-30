export default function Slideshow() {
	let currentInfoSlideIndex = 0;
	let currentImageIndex = 0;
	let isPlacesVisible;
	let isCrewVisible;

	const slideshow = document.querySelectorAll('.slideshow');
	const buttons = document.querySelectorAll('.slideshow__button');
	const dots = document.querySelectorAll('.slideshow__dot');
	const infoText = document.querySelectorAll('.slideshow__info');
	const images = document.querySelectorAll('.slideshow__image');

	if (slideshow !== null) {
		for (let index = 0; index < buttons.length; index +=1) {
			buttons[index].addEventListener('click', event => {
				handleButtonsClick(event, index)
			});
		};

		for (let index = 0; index < dots.length; index +=1) {
			dots[index].addEventListener('click', event => {
				handleDotsClick(event, index)
			});
		};
	}


	function handleButtonsClick(event, index) {
		changeCurrentIndex(index);
		isPlacesInViewport();
		isCrewInViewport();
		renderHTML(index);
	}

	function handleDotsClick(event, index) {
		changeCurrentIndexDots(index);
		isCrewInViewport();
		isPlacesInViewport();

		renderHTML(index);
	}

	function changeCurrentIndexDots(index) {
		currentInfoSlideIndex = index + 4;
		currentImageIndex = index + 4;
	}
	function changeCurrentIndex(index) {
		currentInfoSlideIndex = index;
		currentImageIndex = index;
	}

	function isPlacesInViewport() {
		let slideshowPlacesPosition = slideshow[0].getBoundingClientRect();

		isPlacesVisible = slideshowPlacesPosition.top + (slideshowPlacesPosition.height/2) > 0 && slideshowPlacesPosition.left + (slideshowPlacesPosition.width/2) > 0 && slideshowPlacesPosition.top + (slideshowPlacesPosition.height/2) < (window.innerHeight || document.documentElement.clientHeight) && slideshowPlacesPosition.left + (slideshowPlacesPosition.width/2) < (window.innerWidth || document.documentElement.clientWidth);

		return isPlacesVisible;
	}

	function isCrewInViewport() {
		let slideshowCrewPosition = slideshow[1].getBoundingClientRect();

		isCrewVisible = slideshowCrewPosition.top + (slideshowCrewPosition.height/2) > 0 && slideshowCrewPosition.left + (slideshowCrewPosition.width/2) > 0 && slideshowCrewPosition.top + (slideshowCrewPosition.height/2) < (window.innerHeight || document.documentElement.clientHeight) && slideshowCrewPosition.left + (slideshowCrewPosition.width/2) < (window.innerWidth || document.documentElement.clientWidth)	
		;

		return isCrewVisible;
	}


	function renderHTML() {
		const infoTextArray = Array.from(infoText);
		const infoTextPlaces = infoTextArray.slice(0, 4);
		const infoTextCrew = infoTextArray.slice(-4);
		
		const imageArray = Array.from(images);
		const imagePlaces = imageArray.slice(0, 4);
		const imageCrew = imageArray.slice(-4);

		if(isPlacesVisible) {
			for (const infoSlide of infoTextPlaces) {
				infoSlide.classList.remove('slideshow__info--active');
			}
	
			for (const image of imagePlaces) {
				image.classList.remove('slideshow__image--active');
			}

		}else if(isCrewVisible){
			for (const infoSlide of infoTextCrew) {
				infoSlide.classList.remove('slideshow__info--active');
			}
	
			for (const image of imageCrew) {
				image.classList.remove('slideshow__image--active');
			}
		}

	
			infoText[currentInfoSlideIndex].scrollIntoView({
				behaviour: 'smooth',
				inline: 'center'
			});
	
			images[currentImageIndex].scrollIntoView({
				behaviour: 'smooth',
				inline: 'center'
			});
	
			infoText[currentInfoSlideIndex].classList.add('slideshow__info--active');
			images[currentImageIndex].classList.add('slideshow__image--active');
		
	}
}