async function getData(url) {
    var response = await fetch(url)
    return response.json()
}
async function main() {
    var dataZ = await getData('/gz')
    var dataKeys = Object.keys(dataZ)
    var ztfValues = Object.values(dataZ)

    var dataD = await getData('/gd')
    var dfeValues = Object.values(dataD)

    var dataN = await getData('/gn')
    var nngValues = Object.values(dataN)

    var dataY = await getData('/gy')
    var yvnValues = Object.values(dataY)

    var ctx = document.getElementById('myChart');
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataKeys,
            datasets: [{
                label: 'ZTF',
                data: ztfValues,
                borderColor: '#4b778d',
                borderWidth: 15,
                fill: false
            }, {
                label: 'DFE',
                data: dfeValues,
                borderColor: '#28b5b5',
                borderWidth: 15,
                fill: false
            },
            {
                label: 'NNG',
                data: nngValues,
                borderColor: '#8fd9a8',
                borderWidth: 15,
                fill: false
            },
            {
                label: 'YVN',
                data: yvnValues,
                borderColor: '#d2e69c',
                fill: false,
                borderWidth: 15
            }]
        },
        options: {
            responsive: true,
            title: {
                display: false,
                fontFamilty: 'sans-serif',
                text: 'FUND PERFOMANCE',
                fontSize: 32,
                fontColor: '#8fd6e1'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontFamilty: 'sans-serif',
                        fontSize: 32,
                        fontColor: '#8fd6e1'
                    },
                    gridLines: {
                        zeroLineColor: '#8fd6e1'
                    },
                    ticks: {
                        fontSize: 23,
                        fontColor: '#8fd6e1',
                        padding: 20,
                        maxTicksLimit: 20,
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    display: true,
                    tickColor: '#8fd6e1',
                    scaleLabel: {
                        display: true,
                        fontFamilty: 'sans-serif',
                        fontSize: 32,
                        fontColor: '#8fd6e1'
                    },
                    gridLines: {
                        zeroLineColor: '#8fd6e1'
                    },
                    ticks: {
                        fontSize: 22,
                        fontColor: '#8fd6e1',
                        padding: 20,
                        maxTicksLimit: 10,
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: '#8fd6e1',
                    fontFamilty: 'sans-serif',
                    fontSize: 32,
                }
            }
        }
    });
}
main()