function sumTips() {

    const btnPercent = document.querySelectorAll('.terminal__block--percent button.btn');
    let valueTips = document.querySelector('#valueTips'),
        valueCheck = document.querySelector('#valueCheck').lastChild.nodeValue;

        // valueTips.value = +Math.round(valueCheck * 0.1);

    btnPercent.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let ratio = e.target.dataset.percent / 100;
            valueTips.value = +Math.round(valueCheck * ratio);
            console.log(typeof valueTips.value);
        });
    });

}

export default sumTips;