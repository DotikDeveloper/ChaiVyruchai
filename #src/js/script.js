'use string';

import date from './modules/date';
import modal from './modules/modal';
import registration from './modules/registration';
import slides from './modules/slides';
import charts from './modules/charts';

window.addEventListener('DOMContentLoaded', () => {

    date('.footer__date');
    modal();
    try {
        slides();
    } catch (error) {
        console.log(error);
    }
    try {
        registration('.registration__tabs-container', '.registration__btn', '.registration__form', 'active');
    } catch (error) {
        console.log(error);
    }

    charts();
    

});