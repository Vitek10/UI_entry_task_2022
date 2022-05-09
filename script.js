const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
});

function changeDate(obj){
    if(obj.name=="buttonChangeDate"){
        var currentDate = document.getElementsByName('date')[0].value;
        //console.log(currentDate);
        var date = new Date(currentDate);
        var day = date.getDate();
        console.log(day);
        var month = date.getMonth()+1;
        console.log(month);
        var year = date.getFullYear();
        console.log(year);
        var xmlHttp = new XMLHttpRequest();
        var url = `https://www.metaweather.com/api/location/44418/${year}/${month}/${day}`;
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(this.responseText);

 if(0 < data.length){
         var temp = "";
         data.forEach((u)=>{
            var dateFormat = new Date(u.created);
            temp += "<tr>";
            temp += "<td>"+dateFormat.toLocaleString('en-GB')+"</td>";
            temp += "<td>"+u.weather_state_name+"</td>";
            temp += "<td>"+Math.round(u.the_temp)+"</td>";
            temp += "<td>"+u.air_pressure+"</td>";
            temp += "<td>"+u.humidity+"</td></tr>";
            })
        document.getElementById('getdata').innerHTML = temp;
 }

 var dateTime = data.map(function(elem)
    {
            var dateFormat = new Date(elem.created);
            return dateFormat.toLocaleString('en-GB');
        });
        var theTemp = data.map(function(elem)
        {
            return Math.round(elem.the_temp);
        });
const ctx = document.getElementById('canvas').getContext('2d');
if (Chart.getChart("canvas"))
   {
        Chart.getChart("canvas").destroy();
    }

myChart = new Chart(ctx,
  {
    type: 'line',
    data: 
    {
        labels: dateTime,
        datasets: [{
            label: '# of Votes',
            data: theTemp,
            backgroundColor: 'transparent',
            borderColor: 'blue',
            borderWidth: 4 
        }]
    },
    options: 
    {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

        }  

    }

  } 
}

function calculate(obj)
 {
 if(obj.name=="button")
    {
     var temperature=document.getElementsByName('temperature_TextBox_Value')[0].value;
     var humidity=document.getElementsByName('humidity_TextBox_Value')[0].value;
     var switch_Units = document.getElementsByName("temp_Units");
     var tempAir = Number(temperature);
     var rh = Number(humidity);

    function resultHeatIndex(temp, hum)
        {
           return -42.379 + (2.04901523 * temp) + (10.14333127 * hum) - (0.22475541 * temp * hum) - (6.83783 * 0.001 * Math.pow(temp, 2)) - (5.481717 * 0.01 * Math.pow(hum, 2)) + (1.22874 * 0.001 * Math.pow(temp, 2) * hum) + (8.5282 * 0.0001 * temp * Math.pow(hum, 2)) - (1.99 * 0.000001 * Math.pow(temp, 2) * Math.pow(hum, 2));
        }
    if (switch_Units[0].checked == true) 
        {
         if (tempAir >= 26.7)
            {
                var tempair_in_fahrenheit = 9/5 * tempAir + 32;
                var result_in_fahrenheit = resultHeatIndex(tempair_in_fahrenheit, rh);
                var tempair_in_celcius = 5/9 * (result_in_fahrenheit - 32);
                document.getElementsByName('result_heatIndex')[0].value = tempair_in_celcius;
            }
        else
            {
                alert('Please note that Heat Index value cannot be calculated for temperatures less than 26.7°C !');
            }
                
        }
    else if (switch_Units[1].checked == true)
        {
         if (tempAir >= 80)
            {
                document.getElementsByName('result_heatIndex')[0].value = resultHeatIndex(tempAir,rh);
            }
        else
            {
                alert('Please note that Heat Index value cannot be calculated for temperatures less than 80°F !');
            }
        }
    }

}






