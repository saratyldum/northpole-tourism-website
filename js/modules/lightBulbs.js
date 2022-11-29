export default function LightBulbs() {
	const checkboxContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightSwitch = document.querySelector('.light-switch');
	const lightBulbContainer = document.querySelector('.light-bulbs');
	const lightBulbs = lightBulbContainer.querySelectorAll('.light-bulb');
	const intervalControl = document.querySelector('.interval-control');
	const lightSwitchState = document.querySelector('.light-switch-state');
	const lightSwitchLabels = {
		on: 'off',
		off: 'on'
	};

	checkboxContainer.addEventListener('click', handleCheckboxContainerClick);
	lightSwitch.addEventListener('change', handleLightSwitchChange);
	intervalControl.addEventListener('change', handleIntervalControlChange);

	function handleCheckboxContainerClick(event) {
		event.target.classList.toggle('light-bulb__checkbox-container--active')
		lightSwitch.click();
	}

	function handleLightSwitchChange() {
		lightBulbContainer.classList.toggle('on');
		lightSwitchState.textContent = lightSwitchLabels[lightSwitchState.textContent]
	}

	function handleIntervalControlChange(event) {
		const duration = event.target.value;
		lightBulbs.forEach(lightBulb => {
			console.log(lightBulb);
			lightBulb.style.animationDuration = `${duration}s`;
		});
	};
}