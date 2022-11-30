export default function LightBulbs() {
	const checkboxContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightSwitch = document.querySelector('.light-switch');
	const lightBulbContainer = document.querySelector('.light-bulbs');
	const lightBulbs = document.querySelectorAll('.light-bulb');
	const intervalControl = document.querySelector('.interval-control');
	const lightSwitchState = document.querySelector('.light-switch-state');
	const lightSwitchLabels = {
		on: 'off',
		off: 'on'
	};

	if (checkboxContainer !== null) {
		checkboxContainer.addEventListener('click', handleCheckboxContainerClick);
		intervalControl.addEventListener('change', handleIntervalControlChange);
	}

	function handleCheckboxContainerClick() {
		controlLights();
	}

	function handleIntervalControlChange(event) {
		controlInterval(event);
	}


	function controlLights() {
		lightBulbContainer.classList.toggle('on');
		lightSwitchState.textContent = lightSwitchLabels[lightSwitchState.textContent]
	}

	function controlInterval(event) {
		const duration = event.target.value;
		lightBulbs.forEach(lightBulb => {
			console.log(lightBulb);
			lightBulb.style.animationDuration = `${duration}s`;
		});
	};
}