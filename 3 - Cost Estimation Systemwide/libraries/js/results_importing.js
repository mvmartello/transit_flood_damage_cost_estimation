//Key List
window.key_list = ["RL","RLd","OL","BL","GL","GL_B","GL_C","GL_D","GL_E","SL"];
window.flood_points = [];

//Report plotting function
function add_report_data(destination, plot_i, line_key, height = height2, margin = margin2, width = width2, lin_wt = 1.5, x_min = x_min3, x_max = x_max3, y_min = y_min3, y_max = y_max3) {

        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min, x_max]).range([ 0, width ]);
        // Establish Y axis scale
        var y_scale = d3.scale.linear().domain([y_max, y_min]).range([ 0, height ]);
        
    //Select the plot of interest in the location of interest, transform coordinates to prepare for data addition
    plot_i  = d3.select(destination)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");

    //Set the default flood colors
    var flood_fill = "rgba(0, 30, 2550,0.35)";
    var flood_line = "rgba(0, 30, 2550,0.55)";
   
    //Add the data of interest
        plot_i.append("path").datum(rpt_elev[line_key]).attr("class", "line").attr("fill", flood_fill).attr("stroke", flood_line).attr("stroke-width", lin_wt).attr("z-index", 0).attr("clip-path","url(#clip)").attr("d", d3.svg.area()
			.x(function(d) {if (isNaN(d.x) == false) {return x_scale(d.x);  }})
			.y0(function(d) {if (isNaN(d.y0) == false) { return y_scale(d.y0); }})
   .y1(function(d) {if (isNaN(d.y1) == false) { return y_scale(d.y1); }})
		);
}

//At-grade flood depth variable creation
 d3.csv("Input/Reports/at-grade_flood_elev.csv", function(data) {
    data.forEach(function(d){
      d.Node = +d.Node;
      d.x = +d.x;
      d["1"] = +d["1"]; d["2"] = +d["2"]; d["3"] = +d["3"]; d["4"] = +d["4"]; d["5"] = +d["5"]; d["6"] = +d["6"]; d["7"] = +d["7"]; d["8"] = +d["8"]; d["9"] = +d["9"]; d["10"] = +d["10"]; d["11"] = +d["11"]; d["12"] = +d["12"]; d["13"] = +d["13"]; d["14"] = +d["14"]; d["15"] = +d["15"]; d["16"] = +d["16"]; d["17"] = +d["17"]; d["18"] = +d["18"]; d["19"] = +d["19"]; d["20"] = +d["20"]; d["19961"] = +d["19961"];
    });
    at_grade_flood_elev = data;
    //Sort by x value, break down into separate sub-arrays for each line
    at_grade_flood_elev = _.sortBy(at_grade_flood_elev,'x');
    //at_grade_flood_elev = _.groupBy(at_grade_flood_elev,'Line');
 });

//////////////////////////////
async function import_results(rpt_numbr) {
    //Reset plots
    //d3.select("#svg2").selectAll("*").remove();
    //d3.select("#svg3").selectAll("*").remove();
    //d3.select("#svg4").selectAll("*").remove();
    //d3.select("#svg5").selectAll("*").remove();
    //d3.select("#svg6").selectAll("*").remove();
    
    //Reset plots
    //plot_build();
    
    //Check to see if the report number is specified as a string
    if (typeof rpt_numbr != "string") {
        //if it isn't, then convert to string
        rpt_numbr = rpt_numbr.toString();
    }
    
    rpt_compilr(rpt_numbr).then( setTimeout(
      function() {line_builder();},
    200));
    
    setTimeout( function() {
       //Sort by x value, break down into separate sub-arrays for each line
       rpt_elev = _.sortBy(rpt_elev,'x');
       rpt_elev = _.groupBy(rpt_elev,'Line');
       
       
       //Add the reuslts to the report
       
       //Red Line
       add_report_data("#svgRL1",RL_plot1,"RL",height2,margin2,width2,1.5,0,16000,-100,50);
       add_report_data("#svgRL2",RL_plot1,"RL",height2,margin2,width2,1.5,16000,32000,-100,50);
       add_report_data("#svgRL3",RL_plot1,"RL",height2,margin2,width2,1.5,30500,46500,-100,50);
       add_report_data("#svgRL4",RL_plot1,"RL",height2,margin2,width2,1.5,46000,62000,-50,100);
       add_report_data("#svgRL5",RL_plot1,"RL",height2,margin2,width2,1.5,62000,78000,-50,100);
       add_report_data("#svgRL6",RL_plot1,"RL",height2,margin2,width2,1.5,78000,94000,-50,100);
       add_report_data("#svgRL7",RL_plot1,"RL",height3,margin3,width3,1.5,94000,110000,-50,100);
       
       add_report_data("#svgRLd1",RLd_plot1,"RLd",height2,margin2,width2,1.5,46000,62000,-50,100);
       add_report_data("#svgRLd2",RLd_plot2,"RLd",height3,margin3,width3,1.5,62000,78000,-50,100);
       
       //Orange Line
       add_report_data("#svgOL1",OL_plot1,"OL",height2,margin2,width2,1.5,0,16000,-100,50);
       add_report_data("#svgOL2",OL_plot2,"OL",height2,margin2,width2,1.5,16000,32000,-100,50);
       add_report_data("#svgOL3",OL_plot3,"OL",height2,margin2,width2,1.5,26000,42000,-100,50);
       add_report_data("#svgOL4",OL_plot4,"OL",height2,margin2,width2,1.5,42000,58000,-100,50);
       add_report_data("#svgOL5",OL_plot5,"OL",height3,margin3,width3,1.5,58000,74000,-100,50);

       //Blue Line
       add_report_data("#svgBL1",BL_plot1,"BL",height2,margin2,width2,1.5,5000,21000,-100,50);
       add_report_data("#svgBL2",BL_plot2,"BL",height2,margin2,width2,1.5,21000,37000,-100,50);
       add_report_data("#svgBL3",BL_plot3,"BL",height3,margin3,width3,1.5,37000,53000,-100,50);
       
       //Green Line
       add_report_data("#svgGL1",GL_plot1,"GL",height2,margin2,width2,1.5,0,16000,-100,50);
       add_report_data("#svgGL2",GL_plot2,"GL",height3,margin3,width3,1.5,16000,32000,-100,50);
       
       add_report_data("#svgGL_B1",GL_B_plot1,"GL_B",height2,margin2,width2,1.5,0,16000,-50,100);
       add_report_data("#svgGL_B2",GL_B_plot2,"GL_B",height3,margin3,width3,1.5,12000,28000,50,200);
       
       add_report_data("#svgGL_C1",GL_C_plot1,"GL_C",height3,margin3,width3,1.5,0,16000,-25,125);
      
       add_report_data("#svgGL_D1",GL_D_plot1,"GL_D",height2,margin2,width2,1.5,0,16000,-25,125);
       add_report_data("#svgGL_D2",GL_D_plot2,"GL_D",height2,margin2,width2,1.5,16000,32000,50,200);
       add_report_data("#svgGL_D3",GL_D_plot3,"GL_D",height2,margin2,width2,1.5,32000,48000,50,200);
       add_report_data("#svgGL_D4",GL_D_plot4,"GL_D",height3,margin3,width3,1.5,48000,64000,50,200);
       
       add_report_data("#svgGL_E1",GL_E_plot1,"GL_E",height3,margin3,width3,1.5,0,16000,-50,100);
       
       add_report_data("#svgSL1",SL_plot1,"SL",height3,margin3,width3,1.5,0,16000,-100,50);
       
    },1500);


    
}

//Compile the at-grade and underground flood depths for the report number of interest
async function rpt_compilr(rpt_numbr) {
  
    //Initialize the report output variables
    window.rpt_out = [];
    window.rpt_elev = [];
    //Initialize at-grade output variable
    var at_grade_out = [];
    //Get at-grade out info
    at_grade_flood_elev.forEach(function(d){
      at_grade_out.push({"Node": d.Node, "Maximum HGL Feet": d[rpt_numbr], "x": d.x, "Line": d.Line});
    });
    //Read the hydraulic model report file specified
    d3.csv("Input/Reports/Report" + rpt_numbr + ".csv", function(data) {
        //Using the unary plus operator, convert from text to number
        data.forEach(function(d){
        d.Node = +d.Node;
        d["Average Depth Feet"] = +d["Average Depth Feet"];
        d["Maximum Depth Feet"] = +d["Maximum Depth Feet"];
        d["Maximum HGL Feet"] = parseFloat(d["Maximum HGL Feet"]);
        d["Time of Max Occurence days"] = +d["Time of Max Occurence days"];
        d[" Reported Max Depth Feet"] = +d[" Reported Max Depth Feet"];
        });
        //Create the relevant global variable, filtering out the empty rows
        rpt_out = data.filter(function(d) { return d.Node != 0; });
        //Merge with junction_locations to map nodes to x values
        rpt_out = merge_object_arrays(JSON.parse(JSON.stringify(jct_locations)),rpt_out,"Node");
        rpt_out = merge_object_arrays(JSON.parse(JSON.stringify(at_grade_out)),rpt_out,"Node");
        //Sort by x value, break down into separate sub-arrays for each line
        rpt_out = _.sortBy(rpt_out,'x');
        rpt_out = _.groupBy(rpt_out,'Line');
        
        //asyncForLoop(key_list.length, async function(ind){
        //    var key = key_list[ind];
        //    rpt_out[key] = merge_object_arrays(rpt_out[key],invert_elev[key],'x');
        //    rpt_out[key].forEach(function(d) {rpt_out[key].push(d);});
        //    rpt_out[key] = _.sortBy(rpt_out[key],'x');
        // });
        
        //key_list.forEach(function(key){
        //  rpt_out[key] = merge_object_arrays(rpt_out[key],invert_elev[key],'x');
        //  rpt_out[key] = merge_object_arrays(rpt_out[key],crown_elev[key],'x');
        //  rpt_out[key] = _.sortBy(rpt_out[key],'x');   
        //});
        
        async function merge_Promise(key){
          rpt_out[key] = merge_object_arrays(rpt_out[key],JSON.parse(JSON.stringify(invert_elev[key])),'x');
          //rpt_out[key] = merge_object_arrays(rpt_out[key],crown_elev[key],'x');
        };
        
        key_list.forEach(function(key){
              merge_Promise(key).then(function() {
              rpt_out[key].forEach(function(d) {rpt_out[key].push(d);});
              console.log(key);
              rpt_out[key] = _.sortBy(rpt_out[key],'x');           
          });

        });
        
         //Double all entries as to match up with invert and crown variables
         //rpt_out[key].forEach(function(d) {rpt_out[key].push(d);});
        //console.log(rpt_numbr);
        //console.log(rpt_out);

    });
    
    return rpt_out;
}

//async function rpt_out_buildr() {
////Add other points, invert elev.
//  key_list.forEach(function(key){
//      rpt_out[key] = merge_object_arrays(rpt_out[key],invert_elev[key],'x');
//      //rpt_out[key] = merge_object_arrays(rpt_out[key],crown_elev[key],'x');
//      rpt_out[key] = _.sortBy(rpt_out[key],'x');
//  });
//  console.log(rpt_out);
//  return Promise.resolve(rpt_out);
//}

    async function line_builder() {
     console.log(rpt_out);
    //For each line
    await asyncForLoop(key_list.length, async function(ind) {
        var key = key_list[ind];
        console.log(key);
        
        //await flood_pts_get(key);
        
      async function data_extract() {
        //And for each point
        await asyncForLoop(rpt_out[key].length, async function(index) {
          //If the flood elevation is not included at the point
          if (rpt_out[key][index]["Maximum HGL Feet"] == undefined) {
            //Get adjacent lower and upper result points
            var loc_o_i = rpt_out[key][index].x;
            window.adj_low = _.find(rpt_out[key].reverse(),function(pt) { return pt.x <= loc_o_i && pt["Maximum HGL Feet"] != undefined && pt.Node != undefined;});
            window.adj_high = _.find(rpt_out[key].reverse(),function(pt) { return pt.x >= loc_o_i && pt["Maximum HGL Feet"] != undefined && pt.Node != undefined;});
            //Check to see if one is undefined, if so then
            if (adj_low == undefined && adj_high != undefined) {
              //Set undefined one to equal point of interest
              adj_low = adj_high;
            //If the adj_high is undefined, then
            } else if (adj_high == undefined && adj_low != undefined) {
              //Set undefined one to equal point of interest
              adj_high = adj_low;
            }
            console.log(loc_o_i);
            console.log(adj_low);
            console.log(adj_high);
            
            //First, check to see if the "Max depth" variable exists and is equal to zero, else go through this nonsense below
            if (adj_low["Maximum Depth Feet"] == 0) {
               rpt_out[key][index]["Maximum HGL Feet"] = rpt_out[key][index].invert_elev;
            //Else, if the flood depth at both adjacent points is nonzero
            } else if (adj_low["Maximum HGL Feet"] - adj_low.invert_elev > 0.25 && adj_high["Maximum HGL Feet"] - adj_high.invert_elev > 0.25) {
                //If adj_low.x and adj_high.x are not equal to each other (i.e., not at the same point in profile)
                if (adj_high.x - adj_low.x != 0) {
                   //Set the flood elevation to the max of the adjacent points
                   //rpt_out[key][index]["Maximum HGL Feet"] = Math.max(rpt_out[key][index].invert_elev, adj_high["Maximum HGL Feet"], adj_low["Maximum HGL Feet"]);
                   //Interpolate the flood elevation for the point of interest
                   rpt_out[key][index]["Maximum HGL Feet"] = Math.max(rpt_out[key][index].invert_elev, adj_low["Maximum HGL Feet"] + (rpt_out[key][index].x - adj_low.x)*(adj_high["Maximum HGL Feet"] - adj_low["Maximum HGL Feet"])/(adj_high.x - adj_low.x));
                //If they are at the same point in profile, set the flood elevation to that at adj_low
                } else {
                   rpt_out[key][index]["Maximum HGL Feet"] = Math.max(rpt_out[key][index].invert_elev, adj_low["Maximum HGL Feet"], adj_high["Maximum HGL Feet"]);
                }
            //Else, if adj_low has a nonzero flood depth
            } else if (adj_low["Maximum HGL Feet"] - adj_low.invert_elev > 0.25) {
               //Set the flood elevation to that of adj_low
               rpt_out[key][index]["Maximum HGL Feet"] = Math.max(rpt_out[key][index].invert_elev, adj_low["Maximum HGL Feet"]);
            //Else, if adj_high has a nonzero flood depth
            } else if (adj_high["Maximum HGL Feet"] - adj_high.invert_elev > 0.25) {
               //Set the flood elevation to that of adj_high
               rpt_out[key][index]["Maximum HGL Feet"] = Math.max(rpt_out[key][index].invert_elev, adj_high["Maximum HGL Feet"]);
            //Else, (if both adj_high and adj_low have a zero flood depth)
            } else {
               //Set the flood elevation to the invert elevation
              rpt_out[key][index]["Maximum HGL Feet"] = rpt_out[key][index].invert_elev;
            }
          console.log(rpt_out[key][index]["Maximum HGL Feet"]);
          }
          
          //Get the flood elevation for the point of interest, making sure that its not less than the invert elevation
          var y1 = Math.max(rpt_out[key][index].invert_elev, rpt_out[key][index]["Maximum HGL Feet"]);
          //Ensure the flood elevation doesn't exceed the crown elevation
          
             //If the crown is not equal to the invert elevation (i.e., not representing the base of a tunnel portal or an at-grade section)
             if (crown_elev[key][index].crown_elev - rpt_out[key][index].invert_elev > 0.1) {
                 //Ensure that the flood elevation is less than the tunnel crown elevation
                 y1 = Math.min(y1, crown_elev[key][index].crown_elev);
             }
          
          //Push to rpt_elev variable for display
          rpt_elev.push({"x": rpt_out[key][index].x, "y0": rpt_out[key][index].invert_elev, "y1": y1, 'Line': key});
          console.log(y1);
          
            ///////////////////////////////////////////////////////////
            //Add interpoloated points to avoid slanted water surfaces
            ///////////////////////////////////////////////////////////
            
            //Initialize temporary interpolation variables
            var depth_temp = 0;
            var x_temp = 0;
            var x_temp2 = 0;
            var crown_temp = 0;
            var elev_temp = 0;
            
            //Check to see if a "next point" exists
            if (index - 1 >= 0) {
            //if ((index+1) <= "this will never equal") {
             
              elev_temp = rpt_out[key][index - 1].invert_elev;
              //Tunnel invert slope from the point of interest to the next point
              var m_temp = (rpt_out[key][index].invert_elev - rpt_out[key][index-1].invert_elev)/(rpt_out[key][index].x - rpt_out[key][index-1].x);
              //Set m_crown equal to m_temp
              //Find the slope of the tunnel crown
              var m_crown = (crown_elev[key][index].crown_elev - crown_elev[key][index-1].crown_elev)/(rpt_out[key][index].x - rpt_out[key][index-1].x);
              
            
              //If the flood depth was 0 at the previous point, nonzero at the current point
              if ((Math.abs(rpt_out[key][index-1]["Maximum HGL Feet"] - rpt_out[key][index-1].invert_elev) < 0.1) && Math.abs(rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev) > 0.1) {
                console.log('here1');
                console.log(rpt_out[key][index-1]);
                console.log(rpt_out[key][index]);
                //Set the depth to the current point
                depth_temp = Math.max(rpt_out[key][index].invert_elev, rpt_out[key][index]["Maximum HGL Feet"]);
                //Interpolate the x value where the HGL intersects the tunnel invert
                x_temp = rpt_out[key][index-1].x + (depth_temp - rpt_out[key][index-1].invert_elev)/m_temp;
                //If the x_temp variable is not NaN
                if (isNaN(x_temp) == false && isNaN(crown_temp) == false && x_temp != Infinity && x_temp != -Infinity && x_temp < rpt_out[key][index].x && x_temp > rpt_out[key][index-1].x) {
                  //Push to rpt_elev variable for display
                  rpt_elev.push({x: x_temp, y0: depth_temp, y1: depth_temp, 'Line': key});
                  console.log("x: " + x_temp + ", y0: " + depth_temp + ", y1: " + depth_temp + ", Line: " + key);
                }
              }
              
              //If the flood depth is nonzero at the previous point, zero at the current point
              if ((Math.abs(rpt_out[key][index-1]["Maximum HGL Feet"] - rpt_out[key][index-1].invert_elev) > 0.1) && Math.abs(rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev) < 0.1) {
                console.log('here2');
                console.log(rpt_out[key][index-1]);
                console.log(rpt_out[key][index]);
                //Set the depth to the previous point
                depth_temp = Math.max(rpt_out[key][index-1].invert_elev, rpt_out[key][index-1]["Maximum HGL Feet"]);
                
                //If the tunnel crown is not equal to the invert at either point
                if (index > 1 && crown_elev[key][index-1].crown_elev > rpt_out[key][index-1].invert_elev) {
                   //Interpolate the x value where  the HGL intersects the tunnel crown
                   x_temp2 = rpt_out[key][index-1].x + (depth_temp - crown_elev[key][index-1].crown_elev)/m_crown;
                   elev_temp = rpt_out[key][index-1].invert_elev + m_temp*(x_temp2-rpt_out[key][index-1].x);
                   //If the x_temp variable is not NaN
                   if (isNaN(x_temp2) == false && isNaN(crown_temp) == false && x_temp2 != Infinity && x_temp2 != -Infinity && x_temp2 < rpt_out[key][index].x && x_temp2 > rpt_out[key][index-1].x) {
                     //Push to rpt_elev variable for display
                     rpt_elev.push({x: x_temp2, y0: elev_temp, y1: depth_temp, 'Line': key});
                     console.log("x: " + x_temp2 + ", y0: " + elev_temp + ", y1: " + depth_temp + ", Line: " + key);
                   }
                }
                //Interpolate the x value where the HGL intersects the tunnel invert
                x_temp = rpt_out[key][index-1].x + (depth_temp - rpt_out[key][index-1].invert_elev)/m_temp;
                elev_temp = rpt_out[key][index-1].invert_elev + m_temp*(x_temp-rpt_out[key][index-1].x);
                //If the x_temp variable is not NaN
                if (isNaN(x_temp) == false && isNaN(crown_temp) == false && x_temp != Infinity && x_temp != -Infinity && x_temp < rpt_out[key][index].x && x_temp > rpt_out[key][index-1].x) {
                  //Push to rpt_elev variable for display
                  rpt_elev.push({x: x_temp, y0: depth_temp, y1: depth_temp, 'Line': key});
                  console.log("x: " + x_temp + ", y0: " + depth_temp + ", y1: " + depth_temp + ", Line: " + key);
                }
              }
              
           //If the tunnel crown is not equal to the invert elev. at the previous point of interest
           if (crown_elev[key][index-1].crown_elev - rpt_out[key][index-1].invert_elev > 0.1) {
               
                 //If the flood elevation at the current point is at the tunnel crown, and the previous depth is not at the current crown
                 if (rpt_out[key][index]["Maximum HGL Feet"] >= crown_elev[key][index].crown_elev && rpt_out[key][index-1]["Maximum HGL Feet"] < crown_elev[key][index-1].crown_elev) {
                   console.log('here3');
                   //If the previous flood depth is nonzero
                    if (rpt_out[key][index-1]["Maximum HGL Feet"] - rpt_out[key][index-1].invert_elev > 0.1) {
                       //Set the depth to the previous point
                       depth_temp = rpt_out[key][index-1]["Maximum HGL Feet"];
                    } else {
                       //Set the flood depth to the current point
                       depth_temp = rpt_out[key][index]["Maximum HGL Feet"];
                    }
                   //Interpolate the x value where the HGL intersects the tunnel crown
                   var x_plus = (depth_temp - crown_elev[key][index-1].crown_elev)/m_crown;
                   if (isNaN(x_plus) == false) {
                     x_temp = rpt_out[key][index-1].x + x_plus;
                   }
                   console.log(x_plus);
                   //Interpoloate the invert elevation
                   elev_temp = rpt_out[key][index-1].invert_elev + m_temp*(x_plus);
                   //If the x_temp variable is not NaN
                   if (isNaN(x_temp) == false && isNaN(elev_temp) == false && x_temp != Infinity && x_temp != -Infinity) {
                     //Push to rpt_elev variable for display
                     rpt_elev.push({x: x_temp, y0: elev_temp, y1: depth_temp, 'Line': key});
                     console.log("x: " + x_temp + ", y0: " + elev_temp + ", y1: " + depth_temp + ", Line: " + key);
                   }
                 }
               
                 //Reset crown_temp if needed
                 if (isNaN(crown_temp) == true) {
                   crown_temp = crown_elev[key][index-1].crown_elev;
                 }

                  //If the flood elevation at the previous point is at the tunnel crown, and the current flood depth is not at the next crown
                  if (rpt_out[key][index-1]["Maximum HGL Feet"] >= crown_elev[key][index-1].crown_elev && rpt_out[key][index]["Maximum HGL Feet"]  < crown_elev[key][index].crown_elev) {
                    console.log('here4');
                    //If the current flood depth is nonzero
                    if (rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev > 0.1) {
                       //Set the depth to the current point
                       depth_temp = rpt_out[key][index]["Maximum HGL Feet"];
                    } else {
                       depth_temp = rpt_out[key][index-1]["Maximum HGL Feet"];
                    }
                    
                    //Interpolate the x value where the HGL intersects the tunnel crown
                    var x_pluss = (depth_temp - crown_elev[key][index-1].crown_elev)/m_crown;
                    if (isNaN(x_pluss) == false) {
                      x_temp = rpt_out[key][index-1].x + x_pluss;
                    }              
                    //Interpoloate the invert elevation
                    console.log(m_temp);
                    elev_temp = rpt_out[key][index-1].invert_elev + m_temp*(x_pluss);
                    //If the x_temp variable is not NaN
                    if (isNaN(x_temp) == false && isNaN(elev_temp) == false && x_temp != Infinity && x_temp != -Infinity) {
                      //Push to rpt_elev variable for display
                      rpt_elev.push({x: x_temp, y0: elev_temp, y1: depth_temp, 'Line': key});
                      console.log("x: " + x_temp + ", y0: " + elev_temp + ", y1: " + depth_temp + ", Line: " + key);
                    }
                    //If the current point is dry, interpolate an intecept with the invert
                    if (rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev < 0.25) {
                       var x_plus2 = (depth_temp - rpt_out[key][index-1].invert_elev)/m_temp;
                       x_temp = rpt_out[key][index-1].x + x_plus2;
                       //Push to rpt_elev variable for display
                      rpt_elev.push({x: x_temp, y0: depth_temp, y1: depth_temp, 'Line': key});
                    }
                  }
              
           }
              
              //////At-grade interpolation
              
              ////If the flood depth is 0 at the current point, likely nonzero at the next point
              //if ((Math.abs(rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev) < 0.1) && Math.abs(adj_high["Maximum HGL Feet"] - adj_high.invert_elev) > 0.1 && crown_temp_index == -1) {
              //  console.log('here1' + rpt_out[key][index].x);
              //  //Set the depth to the next point
              //  depth_temp = adj_high["Maximum HGL Feet"];
              //  //Interpolate the x value where the HGL intersects the tunnel invert
              //  x_temp = rpt_out[key][index].x + (depth_temp - invert_elev[key][index].invert_elev)/m_temp;
              //  //If the x_temp variable is not NaN
              //  if (isNaN(x_temp) == false && isNaN(crown_temp) == false && x_temp != Infinity && x_temp != -Infinity && x_temp < rpt_out[key][index+1].x) {
              //    //Push to rpt_elev variable for display
              //    rpt_elev.push({x: x_temp, y0: depth_temp, y1: depth_temp, 'Line': key});
              //    console.log("x: " + x_temp + ", y0: " + depth_temp + ", y1: " + depth_temp + ", Line: " + key);
              //  }
              //}
              //
              //If the current point is at-grade
              //if (crown_temp_index == -1 || crown_elev[key][crown_temp_index].crown_elev - rpt_out[key][index].invert_elev < 0.1) {
              //  //If the flood depth is nonzero at the current point, likely zero at the next point
              //  if ((Math.abs(rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index].invert_elev) > 0.1) && Math.abs(rpt_out[key][index]["Maximum HGL Feet"] - rpt_out[key][index+1].invert_elev) < 0.1  && crown_temp_index == -1) {
              //    console.log('here2');
              //    //Set the depth to the current point
              //    depth_temp = rpt_out[key][index]["Maximum HGL Feet"];
              //    //Interpolate the x value where the HGL intersects the tunnel invert
              //    x_temp = rpt_out[key][index].x + (depth_temp - rpt_out[key][index].invert_elev)/m_temp;
              //    //If the x_temp variable is not NaN
              //    if (isNaN(x_temp) == false && isNaN(crown_temp) == false && x_temp != Infinity && x_temp != -Infinity && x_temp < rpt_out[key][index+1].x) {
              //      //Push to rpt_elev variable for display
              //      rpt_elev.push({x: x_temp, y0: depth_temp, y1: depth_temp, 'Line': key});
              //      console.log("x: " + x_temp + ", y0: " + depth_temp + ", y1: " + depth_temp + ", Line: " + key);
              //    }
              //  }
              //}

              
              
            }
        });
      }
      await data_extract();
    });    
        ////Wait a bit, then
        //setTimeout(function() {
        //  //Export results, 
        //  flood_depths_out().then(function() {
        //      //Then add data to the summary plot
        //      console.log('in then');
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_silver_, 'x', 'depth', height3, margin3, width3, 3, all_rail_flood_depths_x, x_min4, x_max4, y_min4, y_max4);
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_red_, 'x', 'depth', height3, margin3, width3, 3, red_line_depth_x, x_min4, x_max4, y_min4, y_max4);
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_orange_, 'x', 'depth', height3, margin3, width3, 3, orange_line_depth_x, x_min4, x_max4, y_min4, y_max4);
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_blue_, 'x', 'depth', height3, margin3, width3, 3, blue_line_depth_x, x_min4, x_max4, y_min4, y_max4);
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_green_, 'x', 'depth', height3, margin3, width3, 3, green_line_depth_x, x_min4, x_max4, y_min4, y_max4);
        //      add_tunnel_data("#svgSumma",flood_lens_plot,_silver_, 'x', 'depth', height3, margin3, width3, 3, silver_line_depth_x, x_min4, x_max4, y_min4, y_max4);
        //    });
        //},3000);
    }
    

//Get flood points function (points where flood depth is specified)
async function flood_pts_get(key) {
  //Get the points that have flood data
  console.log(rpt_out[key]);
  flood_points = _.reject(rpt_out[key], function(pt) {
    return pt.Node == undefined;
  });
  console.log(flood_points);
}


//JSON merge using underscore.js (source: https://stackoverflow.com/questions/30093561/merge-two-json-object-based-on-key-value-in-javascript)
function merge_object_arrays (arr1, arr2, match) {
  return _.union(
    _.map(arr1, function (obj1) {
      var same = _.find(arr2, function (obj2) {
        return obj1[match] === obj2[match];
      });
      return same ? _.extend(obj1, same) : obj1;
    }),
    _.reject(arr2, function (obj2) {
      return _.find(arr1, function(obj1) {
        return obj2[match] === obj1[match];
      });
    })
  );
}

//setTimeout(function() {import_results(1996);},1000);


//Async-foreach code. Source: https://gist.github.com/Atinux/fd2bcce63e44a7d3addddc166ce93fb2#file-async-foreach-js-L7
        async function waitFor(ms) {
             new Promise(r => setTimeout(r, ms));
        }
		async function asyncForLoop(loop_length, callback) {
            for (let index = 0; index < loop_length; index++) {
                await callback(index);
            }
        }