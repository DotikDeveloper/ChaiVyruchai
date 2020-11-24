function modal() {

    const modalBg = document.querySelector(".overlay"),
        logoutBtn = document.querySelector("button[data-button=close-modal]"),
        loginBtn = document.querySelector("button[data-button=login]"),
        inputModal = document.querySelectorAll("input"),
        closeStatus = document.querySelector("[data-button=close-modal-status]"),
        errorModal = document.querySelector(".overlay.overlay__status");

    closeStatus.addEventListener('click', () => {
        if (!errorModal.classList.contains("hide")) {
            errorModal.classList.add("hide");
        }
    });


    logoutBtn.addEventListener("click", () => {
        modalBg.classList.add("hide");
        inputModal.forEach((i) => {
            if (true) {
                i.value = '';
            }
        });
    });


    loginBtn.addEventListener("click", (e) => {
        console.log(e.target);
        const modalPage = document.querySelector('.overlay');
        modalPage.classList.remove("hide");
    });



    const modalPassword = document.querySelector("#form__password"),
        btnShowPasswordImg = document.querySelector(".password-control img");

    btnShowPasswordImg.addEventListener("click", () => {
        if (modalPassword.getAttribute("type") === "password") {
            modalPassword.setAttribute("type", "text");
            btnShowPasswordImg.setAttribute("src", "img/modal/eye-open.svg");
        } else {
            modalPassword.setAttribute("type", "password");
            btnShowPasswordImg.setAttribute("src", "img/modal/eye-close.svg");
        }
    });

}

export default modal;