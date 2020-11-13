'use string';

import date from './modules/date';
import slides from './modules/slides';
import modal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    
    date('.footer__date');
    slides();
    modal();
});