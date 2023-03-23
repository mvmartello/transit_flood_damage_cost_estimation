//Initalize global variables
var return_period = 0;
var aep = 0.000;
var slr = 0;
var event_type = "";
//Dropdown button functionality
function dropdown_click() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//Import the report value-scenario key
d3.csv("Input/scenarios.csv", function(data) {
        //Using the unary plus operator, convert from text to number
        data.forEach(function(d){
        d.value = +d.value;
        d.SLR = +d.SLR;
        d.CFEP = +d.CFEP;
        d.return_period = +d.return_period;
    });
        
    window.scenarios = data;
});

//Function to load selected scenario results for viewing
function load_result(value) {
    //Load the results for the secnario of interest
    plot_build(value);
    //Get the return period, AEP, SLR for the scenario of interest
    return_period = scenarios.filter(function(data) {return data.value == value;})[0].return_period;
    aep = Math.round(100*scenarios.filter(function(data) {return data.value == value;})[0].CFEP);
    //Specify the event type
    slr = (scenarios.filter(function(data) {return data.value == value;})[0].SLR).toFixed(2);
    event_type = "coastal";
    //Check to see if 1996 flood selected, if not, assume coastal flood event
    if (value == 19961) {
        event_type = "precipitation-based";
    }
    //Change the caption for figure 2
    document.getElementById("fig2_caption").innerHTML = '<p style="top: 0; height: 8%; text-align: center; padding-top: 3%; margin-bottom: 0%; font-family: Arial; font-size: 125%"> <b>Fig. 2. </b> Flooding of Interconnected MBTA Rapid Transit Tunnels under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)</p>";
}

window.len_depth_data = [];
//Function to compile length-depth data across all scenarios
function len_depth_all() {
    var itr = 1;
    setInterval(function() {
      console.log(itr);
      load_result(itr);
      itr += 1;
      if (itr == 37) {
        JSON.stringify(len_depth_data);
      }
    },6000);
  
}