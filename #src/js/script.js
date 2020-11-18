'use string';

import date from './modules/date';
import modal from './modules/modal';
import registration from './modules/registration';
import slides from './modules/slides';
import filterDashboard from './modules/filterDashboard';
import charts from './modules/charts';
import userModeration from './modules/userModeration';
import selectMenuBtn from './modules/selectMenuBtn';
import openMenu from './modules/openMenu';


window.addEventListener('DOMContentLoaded', () => {

    date('.footer__date');
    try {
        modal();
    } catch (error) {
        console.log(error);
    }    
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
    try {
        filterDashboard();
    } catch (error) {
        console.log(error);
    }
    try {
        charts();
    } catch (error) {
        console.log(error);
    }
    try {
        userModeration('.moderation-requests__item');
    } catch (error) {
        console.log(error);
    }
    try {
        selectMenuBtn();
    } catch (error) {
        console.log(error);
    }
    try {
        openMenu();
    } catch (error) {
        console.log(error);
    }

});