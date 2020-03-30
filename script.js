
const getData = async (country,type) => {
    const response = await fetch(`https://corona.lmao.ninja/v2/historical/${country.toLowerCase()}`)
    const json = await response.json();
    let labels = Object.keys(json.timeline.deaths)
    let valuesDeaths = Object.values(json.timeline.deaths)
    let valuesCases = Object.values(json.timeline.cases)

    if(type == "Cases") {
            var ctx = document.getElementById(type).getContext('2d');
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, // Our labels
                datasets: [{
                label: `Current cases in ${country.toUpperCase()}`, // Name the series
                data: valuesCases, // Our values
                backgroundColor: [ // Specify custom colors
                    'rgba(255, 201, 132, 1)'    
                ],
                borderColor: [ // Add custom color borders
                    'rgba(255,128,132,1)'
                ],
                borderWidth: 2 // Specify bar border width
                }]
            },
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
            }
        });
        document.getElementById(type).style.display = 'block'
    } else {
        var ctx = document.getElementById(type).getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels, // Our labels
            datasets: [{
              label: `Current deaths in ${country.toUpperCase()}`, // Name the series
              data: valuesDeaths, // Our values
              backgroundColor: [ // Specify custom colors
                'rgba(255, 99, 132, 1)'
              ],
              borderColor: [ // Add custom color borders
                'rgba(255,128,132,1)'
              ],
              borderWidth: 2 // Specify bar border width
            }]
          },
          options: {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
          }
        });
        document.getElementById(type).style.display = 'block'
    }
    
    
}

window.addEventListener('load',()=> {
    document.getElementById('country').value = ""
})


let btnSrch = document.getElementById('btnSrch')
btnSrch.addEventListener('click',async ()=> {
    let country = document.getElementById('country').value
    const response = await fetch(`https://corona.lmao.ninja/v2/historical/${country.toLowerCase()}`)
    const json = await response.json()
    let err = Object.values(json)[0]
    if(err != "Country not found or doesn't have any historical data") {
        getData(country,"Cases") 
        getData(country,"Death")
    } else {
        alert(err)
    }
    
     
})
