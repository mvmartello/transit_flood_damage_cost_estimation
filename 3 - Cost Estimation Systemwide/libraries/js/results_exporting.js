//Export results for use in cost estimation model

//Systemwide point of interest (POI) variable
var sys_poi = [];
var sys_poi_out = [];
var sys_poi_depth = [];
var sys_poi_flooded = [];
var sys_switch_flooded = [];

//Results variables
var light_rail_flood_depths = [];
var hvy_rail_flood_depths = [];

var green_line_depth = [];
var red_line_depth = [];
var orange_line_depth = [];
var blue_line_depth = [];
var silver_line_depth = [];

var green_line_depth_x = [];
var red_line_depth_x = [];
var orange_line_depth_x = [];
var blue_line_depth_x = [];
var silver_line_depth_x = [];

//Read the point of interest (POI) data file specified
    d3.csv("Input/systemwide_POI.csv", function(data) {
        //Using the unary plus operator, convert from text to number
        data.forEach(function(d){
        d.x = +d.x;
        });
        //Create the relevant global variable
        sys_poi = _.groupBy(data,'Line');        
    });

//Flood depth summary statistics function
async function flood_depths_out() {
  //Reset results variables
  all_rail_flood_depths = [];
  light_rail_flood_depths = [];
  hvy_rail_flood_depths = [];
  green_line_depth = [];
  red_line_depth = [];
  orange_line_depth = [];
  blue_line_depth = [];
  silver_line_depth = [];
  all_rail_flood_depths_x = [];
  green_line_depth_x = [];
  red_line_depth_x = [];
  orange_line_depth_x = [];
  blue_line_depth_x = [];
  silver_line_depth_x = [];
  sys_poi_out = [];

  //For each line listed in key_list
  for (const key of key_list) {
    //And for each x-depth pair for each line
        for (i = 0; i < (rpt_elev[key].length - 1); i++) {
          //console.log(key + i);
          //Interpolate the segment of interest (between i and i+1)
          await segment_interpolation(rpt_elev[key][i].x, rpt_elev[key][i].y0, rpt_elev[key][i].y1, rpt_elev[key][i+1].x, rpt_elev[key][i+1].y0, rpt_elev[key][i+1].y1, key);
        }
    //Get the rpt_elev data associated with each POI by merging with rpt_elev
    sys_poi_out[key] = merge_object_arrays(sys_poi[key],JSON.parse(JSON.stringify(rpt_out[key])),"x");
  }
  //Sort the results variables
  light_rail_flood_depths.sort(function(a,b){return b - a;});
  hvy_rail_flood_depths.sort(function(a,b){return b - a;});
  depth_x_processing(red_line_depth, red_line_depth_x);
  depth_x_processing(orange_line_depth, orange_line_depth_x);
  depth_x_processing(blue_line_depth, blue_line_depth_x);
  depth_x_processing(green_line_depth, green_line_depth_x);
  depth_x_processing(silver_line_depth, silver_line_depth_x);
  depth_x_processing(all_rail_flood_depths, all_rail_flood_depths_x);
}

//Segment interpolation set up function
async function segment_interpolation(x_i,y0_i,y1_i,x_j,y0_j,y1_j,key_i) {
  //Get the slope and local intercept (where x_i = 0) of the depth function
  var m_d = (y1_j - y1_i - y0_j + y0_i)/(x_j - x_i);
  var b_d = y1_i - y0_i;
  //For the length of the segment of interest at the pre-specified increment
  for (x = 0; x < (x_j - x_i); x += 10) {
    await in_segment_interpolate(m_d,b_d,x,key_i);
  }
}

//In-segment interpolation function
async function in_segment_interpolate(md, bd, x_i,key_i) {
  //Get the depth of interest 
  depth = Math.max(0,Math.round((md*x + bd + Number.EPSILON) * 10) / 10);
  
  //IF the depth is nonzero, push to all rail output variable
  if (depth != 0) {
    all_rail_flood_depths.push(depth);  
  }
  //Push the result to the correct output variable
    if (key_i.includes('GL') == true) {
    //Green Line (light rail)
    light_rail_flood_depths.push(depth);
    //Push to depth variable
    green_line_depth.push(depth);
  } else if (key_i.includes('SL') == true) {
    //Silver Line (BRT)
    silver_line_depth.push(depth);
  } else {
    //Red, Blue, Orange (heavy rail)
    hvy_rail_flood_depths.push(depth);
    //Push to relevant depth variable
    if (key_i.includes('RL') == true) {
      red_line_depth.push(depth);
    } else if (key_i.includes('OL') == true) {
      orange_line_depth.push(depth);
    } else if (key_i.includes('BL') == true) {
      blue_line_depth.push(depth);
    }
  }
}

//Depth_x data sorting and length pairing
async function depth_x_processing(line_depth, line_depth_x) {
  //Initialize x variable
  var x_temp = 0;
  
  //Sort the depth_x data of interest
  line_depth.sort(function(a,b){return b - a;});
  
    //For each sorted data point
    for (i = 0; i < line_depth.length; i ++) {
        //Make a x - depth pair, push to the specified depth_x variable
        line_depth_x.push({"x": x_temp, "depth": line_depth[i]});
        //Iterate x_temp by 10 ft
        x_temp += 10;
    }
}

//Get the flood depths associated with each POI
async function poi_depth_processing() {
    //Initialize variables
    var depth_temp = 0;
    sys_poi_depth = [];
    sys_poi_flooded = [];
    sys_switch_flooded = [];
  
    //For each line in key list
    for (const key of key_list) {
        //And for each POI
        for (poi = 0; poi < (sys_poi_out[key].length - 1); poi++) {
          //If there is a POI listed
          if (sys_poi_out[key][poi].POI != undefined) {
          //If the POI is not in sys_poi_depth
          if (sys_poi_flooded.includes(sys_poi_out[key][poi].POI) == false && sys_poi_out[key][poi].POI.includes("switch") == false && (sys_poi_out[key][poi]["Maximum HGL Feet"] - sys_poi_out[key][poi].invert_elev) > 0.1) {
              //Check to see if there is another x value associated with the POI (i.e., if the POI is a station)
              if (poi+1 < sys_poi_out[key].length &&  sys_poi_out[key][poi+1].POI == sys_poi_out[key][poi].POI) {
                  //If so, then average the flood depths 
                  depth_temp = 0.5*((sys_poi_out[key][poi]["Maximum HGL Feet"] - sys_poi_out[key][poi].invert_elev) + (sys_poi_out[key][poi+1]["Maximum HGL Feet"] - sys_poi_out[key][poi+1].invert_elev));
              } else {
                  //Else, simply provide the depth at the POI
                  depth_temp = sys_poi_out[key][poi]["Maximum HGL Feet"] - sys_poi_out[key][poi].invert_elev;
              }
              //Push the POI to the sys_poi_depth variable and the sys_poi_flooded variable
              sys_poi_depth.push({POI: sys_poi_out[key][poi].POI, depth: depth_temp, x: sys_poi_out[key][poi].x, Line: key});
              sys_poi_flooded.push(sys_poi_out[key][poi].POI);
          //Else, if the POI is a switch
          } else if (sys_poi_flooded.includes(sys_poi_out[key][poi].POI) == false && sys_poi_out[key][poi].POI.includes("switch") == true) {
              //Get the flood depth
              depth_temp = sys_poi_out[key][poi]["Maximum HGL Feet"] - sys_poi_out[key][poi].invert_elev;
              //If the depth is nonzero
              if (depth_temp > 0.1) {
                //Push to sys_switch_flooded variable
                sys_switch_flooded.push({x: sys_poi_out[key][poi].x, depth: depth_temp, Line: sys_poi_out[key][poi].Line});
              }
          }
        }
        }
    }
}