function selectMenuBtn() {
    try {
        const menuBtn = () => {
            const btn = document.querySelectorAll('button.menu__item');
   
            const leftTop = document.querySelector('[data-itemDashboard="leftTop"]'),
                rightTop = document.querySelector('[data-itemDashboard="rightTop"]'),
                leftDown = document.querySelector('[data-itemDashboard="leftDown"]'),
                rightDown = document.querySelector('[data-itemDashboard="rightDown"]'),
                restoransAdd = document.querySelector('[data-itemDashboard="restoransAdd"]'),
                message = document.querySelector('[data-itemDashboard="message"]'),
                settings = document.querySelector('[data-itemDashboard="settings"]'),
                businessCard = document.querySelector('[data-itemDashboard="businessCard"]');
   
            function tabBigContent(selectorBig) {
                if (!selectorBig.classList.contains('hide')) {
                    selectorBig.classList.add('dashboard__item--big');
                } else {
                    selectorBig.classList.remove('hide');
                    selectorBig.classList.add('dashboard__item--big');
                }
            }
   
            function tabHideContent(selectorHide) {
                if (!selectorHide.classList.contains('dashboard__item--big')) {
                    selectorHide.classList.add('hide');
                } else {
                    selectorHide.classList.remove('dashboard__item--big');
                    selectorHide.classList.add('hide');
                }
            }
   
            try {
                const userMessages = function (selector) {
                    const reqUser = document.querySelectorAll(selector);
                    reqUser.forEach((user) => {
                        user.addEventListener('click', (e) => {
                            if (e.target.getAttribute('data-req') == "yes") {
                                user.style.backgroundColor = 'rgba(111, 149, 145, 0.25)';
                                user.style.border = '5px solid rgba(111, 149, 145, 0.25)';
                            }
                            if (e.target.getAttribute('data-req') == "no") {
                                user.style.backgroundColor = 'rgba(202, 88, 62, 0.25)';
                                user.style.border = '5px solid rgba(202, 88, 62, 0.25)';
                            } else {
                                console.log('не нажата кнопка модерации');
                            }
                        });
                    });
                };
                userMessages('.messages__item');
            } catch (error) {
                console.log(error);
            }
   
            btn.forEach((item) => {
   
                item.addEventListener('click', (e) => {

                    try {
                        switch (e.target.dataset.btnmenu) {
                            case 'dashboard':
                                location.href = location.href;
                                tabHideContent(restoransAdd);
                                tabHideContent(message);
                                tabHideContent(settings);
                                tabHideContent(businessCard);
                                break;
                            case 'restorans':
                                console.log('restorans');
                                tabBigContent(restoransAdd);
                                tabHideContent(leftTop);
                                tabHideContent(rightTop);
                                tabHideContent(leftDown);
                                tabHideContent(rightDown);
                                tabHideContent(message);
                                tabHideContent(settings);
                                tabHideContent(businessCard);
                                break;
                            case 'waiters':
                                console.log('запрос на модерацию');
                                tabHideContent(restoransAdd);
                                tabHideContent(leftTop);
                                tabHideContent(rightTop);
                                tabBigContent(leftDown);
                                tabHideContent(rightDown);
                                tabHideContent(message);
                                tabHideContent(settings);
                                tabHideContent(businessCard);
                                break;
                            case 'messages':
                                console.log('messages');
                                tabHideContent(restoransAdd);
                                tabHideContent(leftTop);
                                tabHideContent(rightTop);
                                tabHideContent(leftDown);
                                tabHideContent(rightDown);
                                tabBigContent(message);
                                tabHideContent(settings);
                                tabHideContent(businessCard);
                                break;
                            case 'settings':
                                console.log('settings');
                                tabHideContent(restoransAdd);
                                tabHideContent(leftTop);
                                tabHideContent(rightTop);
                                tabHideContent(leftDown);
                                tabHideContent(rightDown);
                                tabHideContent(message);
                                tabBigContent(settings);
                                tabHideContent(businessCard);
                                break;
                            case 'businessCard':
                                console.log('businessCard');
                                tabHideContent(restoransAdd);
                                tabHideContent(leftTop);
                                tabHideContent(rightTop);
                                tabHideContent(leftDown);
                                tabHideContent(rightDown);
                                tabHideContent(message);
                                tabHideContent(settings);
                                tabBigContent(businessCard);
                                break;
       
                            default:
                                console.log('error');
                                break;
                        }
                    } catch (error) {
                        console.log(error);
                    }
   
                    
                });
            });
        };
   
        menuBtn();
   
    } catch (error) {
        console.log(error);
    }
}

export default selectMenuBtn;