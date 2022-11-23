import Hamburger from './modules/hamburger.js';
import Header from './modules/header.js';
import Explore from './modules/explore.js';
import Snow from './modules/snow.js';
import Slideshow from './modules/slideshow.js';
import Wishlist from './modules/wishlist.js';


Hamburger();
Header();
Explore();

for ( let count = 0; count < 10; count += 1) {
	Snow();
}

Slideshow();
Wishlist();