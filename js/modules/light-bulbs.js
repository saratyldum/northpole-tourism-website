export default function LightBulbs() {
	let duration;
	let intervalChanging = false;

	const checkboxContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightSwitch = document.querySelector('.light-switch');
	const lightSwitchContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightBulbContainer = document.querySelector('.light-bulbs');
	const lightBulbs = document.querySelectorAll('.light-bulb');
	const intervalControl = document.querySelector('.interval-control');
	const lightSwitchState = document.querySelector('.light-bulb__switch--state');
	const lightSwitchLabels = {
		on: 'off',
		off: 'on'
	};

	if (checkboxContainer !== null) {
		checkboxContainer.addEventListener('click', handleCheckboxContainerClick);
		intervalControl.addEventListener('change', handleIntervalControlChange);
	}

	function handleCheckboxContainerClick() {
		intervalChanging = false;
		renderHTML()
	}

	function handleIntervalControlChange(event) {
		intervalChanging = true;
		renderHTML(event);
	}

	/**
	 * Add the 'on' class to the light bulbs and changes the text of the on/off button
	 */
	function controlLightsOnOff() {
		lightBulbContainer.classList.toggle('on');
		lightSwitchState.textContent = lightSwitchLabels[lightSwitchState.textContent]	
	}

	/**
	 * Takes the value of the interval changer and makes that the duration time in the animation
	 * 
	 * @param {number} event gives us the value of the interval element
	 */
	function controlLightIntervals(event) {
		duration = event.target.value;
		
		lightBulbs.forEach(lightBulb => {
			lightBulb.style.animationDuration = `${duration}s`;
		});
	}

	/**
	 * The only functin that makes changes to the DOM. Runs the relevat functions depending on what is being cicked.
	 * 
	 * @param {number} event gives us the value of the interval element
	 */
	function renderHTML(event) {
		if (!intervalChanging) {
			controlLightsOnOff();
		} else if(intervalChanging) {
			controlLightIntervals(event);
		}
	}

}