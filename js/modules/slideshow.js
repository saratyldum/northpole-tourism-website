export default function Slideshow() {
	let currentInfoSlideIndex = 0;
	let currentImageIndex = 0;

	const slideshow = document.querySelector('.slideshow');
	const buttons = document.querySelectorAll('.slideshow__button');
	const infoText = document.querySelectorAll('.slideshow__info');
	const images = document.querySelectorAll('.slideshow__image');


	for (let index = 0; index < buttons.length; index +=1) {
		buttons[index].addEventListener('click', event => {
			handleButtonsClick(event, index)
		});
	};



	function handleButtonsClick(event, index) {
		changeCurrentIndex(index);
		renderHTML();
	}

	function changeCurrentIndex(index) {
		currentInfoSlideIndex = index;
		currentImageIndex = index;

	}


	function renderHTML() {
		for (const infoSlide of infoText) {
			infoSlide.classList.remove('slideshow__info--active');
		}

		for (const image of images) {
			image.classList.remove('slideshow__image--active');
		}

		infoText[currentInfoSlideIndex].scrollIntoView({
			behaviour: 'smooth',
			inline: 'center'
		});

		infoText[currentInfoSlideIndex].classList.add('slideshow__info--active');
		images[currentImageIndex].classList.add('slideshow__image--active');
	}
}