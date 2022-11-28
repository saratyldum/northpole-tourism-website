export default function Snow() {
	let checked = false;
	let snowIntervalTimer = null;

	const button = document.querySelector('.hero__explore-button');
	const body = document.querySelector('body');
	const checkBox = document.querySelector('.toggle-snow__checkbox')
	const checkBoxDiv = document.querySelector('.toggle-snow');
  
	if ( button !== null) {
		button.addEventListener('click', handleButtonClick);
		checkBox.addEventListener('click', handleCheckBoxClick)

	}
  
	function handleButtonClick() {
	  //addSnowfall();
	  toggleSnow();
	}

	function handleCheckBoxClick() {
		toggleSnow();
	}

	/**
	 * Loops the addSnow funciton to create several snow flakes every three seconds, for a total of 10 seconds
	 * 
	 * @see addSnow()
	 */
	function addSnowfall() {
		addSnow();

		snowIntervalTimer = setInterval(() => {
			for (let index = 1; index < 10; index++) {
				addSnow();
			}
		}, 3000);
 
		setTimeout(() => {
			clearInterval(snowIntervalTimer); 
		}, 10000);
	}
  
	/**
	 * Creates snowflakes with different sizes and place them on random start points with random delay to make them fall at different times.
	 * 
	 * @param {*} event 
	 */
	function addSnow(event) {
	  const snow = document.createElement('div');
	  snow.classList.add('snow');
  
	  const screenWidth = window.innerWidth;
  
	  const size = Math.floor(Math.random() * 17);
	  const left = Math.random()* screenWidth;
	  const leftEnd = Math.random()*150;
	  const leftStart = Math.random()*50;
	  const delay = Math.random()*5;

	  let y = window.innerHeight;

  
	  document.documentElement.style.setProperty('--y-start', y + 'px');
	//   document.documentElement.style.setProperty('--left-start', leftStart + 'px');
	  document.documentElement.style.setProperty('--left-end', leftEnd + 'px');


  
	  
	  snow.style.width = size + 'px';
	  snow.style.height = size + 'px';
	  snow.style.left = left + 'px'
	  snow.style.animationDelay = delay + 's'
  
	  body.appendChild(snow);
	}

	/**
	 * starts and stops the snowfall when toggle button is clicked
	 * 
	 *@todo fiks så man kan stoppe før intervallen er ferdig
	 */
	function toggleSnow() {
		checked = !checked;
		checkBox.checked = true;
		checkBoxDiv.style.display = 'block'

		if (checked === false) {
			const snowfall = document.querySelectorAll('.snow');

			snowfall.forEach(snow => {
				snow.remove();
			})

			checkBox.checked = false;

			clearInterval(snowIntervalTimer);
		} else {
			addSnowfall();
		}
	}
}