import Hamburger from './modules/hamburger.js';
import Header from './modules/header.js';
import Explore from './modules/explore.js';
import Snow from './modules/snow.js';
import Slideshow from './modules/slideshow.js';
import Wishlist from './modules/wishlist.js';
import Dragdown from './modules/countdown-dragdown.js';
import Countdown from './modules/countdown.js';
import LightBulbs from './modules/light-bulbs.js';


Hamburger();
Header();
Explore();

for ( let count = 0; count < 5; count += 1) {
	Snow();
}

Slideshow();
Wishlist();
Dragdown();
Countdown();
LightBulbs();