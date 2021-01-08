// 'use string';


import date from './modules/date';
import modal from './modules/modal';
import registration from './modules/registration';
import slides from './modules/slides';
import filterDashboard from './modules/filterDashboard';
import charts from './modules/charts';
import userModeration from './modules/userModeration';
import selectMenuBtn from './modules/selectMenuBtn';
import openMenu from './modules/openMenu';
import sumTips from './modules/sumTips';
import checkReviews from './modules/checkReviews';
import qrCode from './modules/qrcode';
// import ajaxsend from './modules/ajaxsend';
import test from './modules/test';



window.addEventListener('DOMContentLoaded', () => {

    date('.footer__date');
    try {
        modal();
    } catch (error) {
        console.log('не работает modal', error);
    }
    try {
        slides();
    } catch (error) {
        console.log('не работает slides', error);
    }
    try {
        registration('.registration__tabs-container', '.registration__btn', '.registration__form', 'active');
    } catch (error) {
        console.log('не работает registration', error);
    }
    try {
        filterDashboard();
    } catch (error) {
        console.log('не работает filterDashboard', error);
    }
    try {
        charts();
    } catch (error) {
        console.log('не работает charts', error);
    }
    try {
        userModeration('.moderation-requests__item');
    } catch (error) {
        console.log('не работает userModeration', error);
    }
    try {
        selectMenuBtn();
    } catch (error) {
        console.log('не работает selectMenuBtn', error);
    }
    try {
        openMenu();
    } catch (error) {
        console.log('не работает openMenu', error);
    }
    try {
        sumTips();
    } catch (error) {
        console.log('не работает sumTips', error);
    }
    try {
        checkReviews();
    } catch (error) {
        console.log('не работает checkReviews', error);
    }
    try {
        qrCode();
    } catch (error) {
        console.log('не работает qrCode', error);
    }
    try {
        test();
    } catch (error) {
        console.log('не работает test', error);
    }
    // try {
    //     ajaxsend();
    // } catch (error) {
    //     console.log(error);
    // }
});
