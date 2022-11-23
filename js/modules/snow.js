export default function Snow() {
	const button = document.querySelector('.hero__explore-button');
	const body = document.querySelector('body');
  
	
	button.addEventListener('click', handleButtonClick);
  
	function handleButtonClick() {
	  addSnow();
  
	  const snowfall = setInterval(() => {
		  for (let index = 1; index < 10; index++) {
			
			addSnow();
		  }
	  }, 3000);

	  setTimeout(function() {clearInterval(snowfall); }, 10000)
	}
  
  
	function addSnow(event) {
	  const snow = document.createElement('div');
	  snow.classList.add('snow');
  
	  const screenWidth = window.innerWidth;
  
	  const size = Math.floor(Math.random() * 20);
	  const left = Math.random()* screenWidth;
	  const delay = Math.random()*5;

	  let y = window.innerHeight;

  
	  document.documentElement.style.setProperty('--y-start', y + 'px');
  
	  
	  snow.style.width = size + 'px';
	  snow.style.height = size + 'px';
	  snow.style.left = left + 'px'
	  snow.style.animationDelay = delay + 's'
  
	  body.appendChild(snow);
	}
}