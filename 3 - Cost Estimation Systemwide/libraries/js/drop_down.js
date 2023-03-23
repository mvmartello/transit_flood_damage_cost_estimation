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
    //Display the flood depth summary for the event of interest
    document.getElementById("map_img").src="Input/Reports/Flood Depth Summary/D"+String(value)+"_flood_summary.png";
    //Load the results for the secnario of interest
    plot_build(value);
    //Get the return period, AEP, SLR for the scenario of interest
    return_period = scenarios.filter(function(data) {return data.value == value;})[0].return_period;
    aep = (100*scenarios.filter(function(data) {return data.value == value;})[0].CFEP).toFixed(1);
    //Specify the event type
    slr = (scenarios.filter(function(data) {return data.value == value;})[0].SLR).toFixed(2);
    event_type = "coastal";
    //Check to see if 1996 flood selected, if not, assume coastal flood event
    if (value == 19961) {
        event_type = "precipitation-based";
    }
    //Change the caption for figures
    document.getElementById("title").innerHTML =    "<b>Scenario A."+String(value)+".</b>" + ' 1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig1_caption").innerHTML = '<b>Fig. A.'+String(value)+'.1. </b> Projected tunnel inflow volumes and flood depths across the MBTA rail rapid transit system under the 1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig2_caption").innerHTML = '<b>Fig. A.'+String(value)+'.2. </b> Flood depths along Red Line alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig3_caption").innerHTML = '<b>Fig. A.'+String(value)+'.3. </b> Flood depths along Red Line (Ashmont Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig4_caption").innerHTML = '<b>Fig. A.'+String(value)+'.4. </b> Flood depths along Orange Line alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig5_caption").innerHTML = '<b>Fig. A.'+String(value)+'.5. </b> Flood depths along Blue Line alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig6_caption").innerHTML = '<b>Fig. A.'+String(value)+'.6. </b> Flood depths along Green Line (Main Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig7_caption").innerHTML = '<b>Fig. A.'+String(value)+'.7. </b> Flood depths along Green Line (B Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig8_caption").innerHTML = '<b>Fig. A.'+String(value)+'.8. </b> Flood depths along Green Line (C Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig9_caption").innerHTML = '<b>Fig. A.'+String(value)+'.9. </b> Flood depths along Green Line (D Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig10_caption").innerHTML = '<b>Fig. A.'+String(value)+'.10. </b> Flood depths along Green Line (E Branch) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig11_caption").innerHTML = '<b>Fig. A.'+String(value)+'.11. </b> Flood depths along Silver Line (underground) alignment under  1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";
    document.getElementById("fig12_caption").innerHTML = '<b>Fig. A.'+String(value)+'.12. </b> MBTA rail rapid transit damage costs under   1-' + return_period + " year (" + aep + "% AEP) " + event_type + " flood event with +" + slr + "m of sea level rise (SLR)";

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