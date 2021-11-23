let url = "http://api.exchangeratesapi.io/v1";
let symbolsCurrency = {
    symbols: 'USD, GBP, EUR, VND', start_date: "2021-11-22",
    end_date: "2021-11-23",
};

function params(paramsObj) {
    return new URLSearchParams({
        access_key: 'a956ccbcf3e9f7fefdf538fdc6611a41',
        ...paramsObj
    });
};

async function getLastest() {
    const res = await fetch(`${url}/latest?${params(symbolsCurrency)}`)
    const data = await res.json();
    console.log(data.rates)
    
    const obj = data.rates;
    let USD = (obj['VND'] / obj['USD']).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let GBP = (obj['VND'] / obj['GBP']).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let EUR = (obj['VND'] / obj['EUR']).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    console.log('USD -> VND: ' + USD);
    console.log('GBP -> VND: ' + GBP);
    console.log('EUR -> VND: ' + EUR);

    document.getElementById('currency-USD').innerHTML = USD;
    document.getElementById('currency-GBP').innerHTML = GBP;
    document.getElementById('currency-EUR').innerHTML = EUR;
};
getLastest();

const ctx = document.getElementById("chart").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["17/11", "18/11", "19/11",
            "20/11", "21/11", "22/11", "23/11"],
        datasets: [{
            label: 'USD',
            borderColor: 'rgb(253, 81, 130)',
            data: [22120, 22430, 22460, 23134, 23133, 23132, 23632, 22680],
        },
        {
            label: 'GBP',
            borderColor: 'rgb(0, 196, 194)',
            data: [30340, 29730, 28320, 29045, 29290, 29132, 29903, 30340],
        },
        {
            label: 'EUR',
            borderColor: 'rgb(0, 159, 235)',
            data: [24732, 24983, 25028, 25738, 24320, 25258, 24732, 25538],
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    },
});