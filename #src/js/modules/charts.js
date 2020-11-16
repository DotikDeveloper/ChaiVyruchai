function charts() {
    console.log('charts');

    // Общая статистика
    var ctx = document.getElementById('totalStats').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            datasets: [{
                label: 'Сборы за месяц',
                backgroundColor: '#ca583e',
                borderColor: '#ca583e',
                data: [0, 10, 15, 20, 25, 30, 54, 53, 37, 35, 28, 20, 30, 45, 50, 68, 56, 29, 112, 130, 145, 110, 101, 125, 124, 120, 130, 145, 120, 130, 145]
            }]
        },

        // Configuration options go here
        options: {}
    });

    // Статистика по компаниям

    var ctx = document.getElementById('companyStatistics').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {

            labels: [
                'Finnegan\'s',
                'Beer House',
                'Italy'
            ],

            datasets: [{
                data: [56, 21, 23],
                backgroundColor: [
                    '#ca583e',
                    '#709591',
                    '#696666'
                ]
            }]
        },

        // Configuration options go here
        options: {}
    });

}

export default charts;