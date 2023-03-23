//Import scripts
importScripts('JS Libraries/jstat.min.js','http://d3js.org/d3.v3.min.js', 'depth_damage_functions.js');

     var expo_itr = 0;
     var finished_indicator = 1;
    
    //Run all the analyses at once
    function run_all_costs() {
        //Every 1500ms, 
        setInterval(function testr() {
           //check to see if an analysis run is complete
           if(finished_indicator == 1) {
                //If it was just completed, check to see if there are more analyses to run
                if (expo_itr < expo_arr.length) {
                    //If so, remove the previous exposure layer from the map
                    //map.remove(expo_arr[expo_itr-1]);
                    //Add the next exposure layer to the map
                    //map.add(expo_arr[expo_itr],0);
                    //Start the next analysis
                    costs(expo_arr[expo_itr]);
                    //Print the next exposure name and expousre iteration variable to the console
                    console.log(expo_arr[expo_itr].popupTemplate.title);
                    console.log('Expo ' + expo_itr);
                    //Set the finished indicator back to 0
                    finished_indicator = 0;
               }
           }
       },1500);
    }
    

//Initialize compiled output array
self.compiled_costs = [];
self.expo_output = [];
//Initialize incremental flood length arrays (incremental flooded surface heavy rail tracks, and incremental flooded surface light rail tracks)
self.flooded_hvy_surf_d_lens = [];
self.flooded_light_surf_d_lens = [];
//Initialize at-grade flood depth array (depth of flooding for incremental lengths of flood surface tracks for heavy and light rail)
self.depth_surf_d_lens = [];
//Initialize station and yard flood depth array
self.depth_sta_yards = [];
//Initialize average underground flood depth array
self.depth_underground_avg = [];
       
//Worker onmessage
self.onmessage = function(e) {
    console.log(e.data);
    self.cost_est_dist = e.data[3];
    self.SOV_replace_costs = e.data[4];
    self.GL_surface = e.data[5];
    self.GL_underground = e.data[6];
    self.connecting = e.data[7];
    self.hvy_surface = e.data[8];
    self.hvy_underground = e.data[9];
    self.SL_underground = e.data[10];
    self.tunnel_locations = e.data[11];
    self.sta_lines = e.data[12];
    
    
    //Create SOV location list
    self.SOV_locations = [];
    
    var SOV_pause = setTimeout(function(){
        SOV_replace_costs.forEach(function(item) {
            SOV_locations.push(item.Item);
        });    
    },500);
    
    cost_analysis(e.data[0],e.data[1],e.data[2]);
}
    
    ///////////////////////////////////////////////////////////////////////////////////
    //Statistical cost analysis, using flooded locations, length, and depths calculated above
			self.cost_analysis  = function(expo_input, event, num_trials) {
                //Initialize/reset Monte Carlo simulation results storage varaible
                self.MC_total_costs = [];
                self.MC_total_cost_objs = [];
                self.MC_signal_costs = [];
                self.detailed_cost_summary = [];
                
                //Intitalize linear asset tracking variables
                self.linear_asset_type = ["catenary", "lighting", "power", "rail", "signal", "tunnel_struct"];
                //Red line
                self.RL_all = []; self.RL_sta = []; self.RL_linear = []; self.RL_3rd_rail = []; self.RL_catenary = []; self.RL_lighting = []; self.RL_power = []; self.RL_rail = []; self.RL_signal = []; self.RL_tunnel_struct = [];
                //Orange line
                self.OL_all = []; self.OL_sta = []; self.OL_linear = []; self.OL_3rd_rail = []; self.OL_catenary = []; self.OL_lighting = []; self.OL_power = []; self.OL_rail = []; self.OL_signal = []; self.OL_tunnel_struct = [];
                //Green line
                self.GL_all = []; self.GL_sta = []; self.GL_linear = [];
                self.GL_3rd_rail = []; self.GL_catenary = []; self.GL_lighting = []; self.GL_power = []; self.GL_rail = []; self.GL_signal = []; self.GL_tunnel_struct = [];
                self.GL_B_3rd_rail = []; self.GL_B_catenary = []; self.GL_B_lighting = []; self.GL_B_power = []; self.GL_B_rail = []; self.GL_B_signal = []; self.GL_B_tunnel_struct = [];
                self.GL_C_3rd_rail = []; self.GL_C_catenary = []; self.GL_C_lighting = []; self.GL_C_power = []; self.GL_C_rail = []; self.GL_C_signal = []; self.GL_C_tunnel_struct = [];
                self.GL_D_3rd_rail = []; self.GL_D_catenary = []; self.GL_D_lighting = []; self.GL_D_power = []; self.GL_D_rail = []; self.GL_D_signal = []; self.GL_D_tunnel_struct = [];
                self.GL_E_3rd_rail = []; self.GL_E_catenary = []; self.GL_E_lighting = []; self.GL_E_power = []; self.GL_E_rail = []; self.GL_E_signal = []; self.GL_E_tunnel_struct = [];
                //Blue line
                self.BL_all = []; self.BL_sta = []; self.BL_linear = []; self.BL_3rd_rail = []; self.BL_catenary = []; self.BL_lighting = []; self.BL_power = []; self.BL_rail = []; self.BL_signal = []; self.BL_tunnel_struct = [];
                //Silver line
                self.SL_all = []; self.SL_sta = []; self.SL_linear = []; self.SL_3rd_rail = []; self.SL_catenary = []; self.SL_lighting = []; self.SL_power = []; self.SL_rail = []; self.SL_signal = []; self.SL_tunnel_struct = [];
                //Connecting sattions, linear, facility collectors
                self.connecting_all = []; self.linear_all = []; self.facilities_all = [];
                //Linear asset type collectors
                self._3rd_rail_all = []; self.catenary_all = []; self.lighting_all = []; self.power_all = []; self.rail_all = []; self.signal_all = []; self.tunnel_struct_all = [];
                //Facility type collectors
                self.underground_all = []; self.at_grade_all = []; self.yard_all = [];
                //Initalize meta variable tracker
                asset_variable_list = ["MC_total_costs",
                                       //Asset type breakdowns
                                       "linear_all", "facilities_all", "_3rd_rail_all", "catenary_all", "lighting_all", "power_all", "rail_all", "signal_all", "tunnel_struct_all", "underground_all", "at_grade_all", "yard_all",
                                       //Transit line breakdowns
                                       "connecting_all", "RL_all", "OL_all", "BL_all", "GL_all", "SL_all",
                                       //Asset type and transit line breakdowns
                                       "RL_sta", "RL_linear", "OL_sta", "OL_linear", "BL_sta", "BL_linear", "GL_sta", "GL_linear", "SL_sta", "SL_linear",
                                       //Linear asset breakdowns by line
                                       "RL_3rd_rail", "RL_catenary", "RL_lighting", "RL_power", "RL_rail", "RL_signal", "RL_tunnel_struct", "OL_3rd_rail", "OL_catenary", "OL_lighting", "OL_power", "OL_rail", "OL_signal", "OL_tunnel_struct", "GL_3rd_rail", "GL_catenary", "GL_lighting", "GL_power", "GL_rail", "GL_signal", "GL_tunnel_struct", "GL_B_3rd_rail", "GL_B_catenary", "GL_B_lighting", "GL_B_power", "GL_B_rail", "GL_B_signal", "GL_B_tunnel_struct", "GL_C_3rd_rail", "GL_C_catenary", "GL_C_lighting", "GL_C_power", "GL_C_rail", "GL_C_signal", "GL_C_tunnel_struct", "GL_D_3rd_rail", "GL_D_catenary", "GL_D_lighting", "GL_D_power", "GL_D_rail", "GL_D_signal", "GL_D_tunnel_struct", "GL_E_3rd_rail", "GL_E_catenary", "GL_E_lighting", "GL_E_power", "GL_E_rail", "GL_E_signal", "GL_E_tunnel_struct", "BL_3rd_rail", "BL_catenary", "BL_lighting", "BL_power", "BL_rail", "BL_signal", "BL_tunnel_struct", "SL_3rd_rail", "SL_catenary", "SL_lighting", "SL_power", "SL_rail", "SL_signal", "SL_tunnel_struct"];
                
                console.log('Event ' + event);
                console.log('num_trials ' + num_trials);
                                
                //Wait 0.5 sec, then continue to MC analysis
                setTimeout(MC_runs(),500);
                
                function MC_runs() {
                    
                    //With data found above, run a MC simulation with 10,000 runs to determine a cost estimate distribution
                    for (var i = 0; i< num_trials; i++) {
                        
                        //Set up the depth-damage curve uncertainty model outlined in Egorova et al., (2008)
                                                
                        //Randomly select a depth-damage curve percentile for each distribution (for use in this MC run)
                        var STA_und_pctile = Math.random();
                        var STA_ag_pctile = Math.random();
                        var STA_GL_pctile = Math.random();
                        var STA_SL_pctile = Math.random();
                        
                        //Initialize/reset flood cost variables
                        //Transit line total costs 
                        var RL_all_cost = 0; var OL_all_cost = 0; var BL_all_cost = 0; var GL_all_cost = 0; var SL_all_cost = 0;
                        //Linear costs per each line
                        var RL_cost = 0; var OL_cost = 0; var BL_cost = 0; var GL_cost = 0; var GL_B_cost = 0; var GL_C_cost = 0; var GL_D_cost = 0; var GL_E_cost = 0; var SL_cost = 0;
                        //Station costs per each line
                        var RL_sta_cost = 0; var OL_sta_cost = 0;  var BL_sta_cost = 0; var GL_sta_cost = 0; var SL_sta_cost = 0; 
                                                
                        //By asset class all costs
                        var linear_all_cost = 0; var facilities_all_cost = 0;
                        //By linear asset type all costs
                        self._3rd_rail_all_cost = 0; self.catenary_all_cost = 0; self.lighting_all_cost = 0; self.power_all_cost = 0; self.rail_all_cost = 0; self.signal_all_cost = 0; self.tunnel_struct_all_cost = 0;
                        //By Facility types
                        self.underground_all_cost = 0; self.at_grade_all_cost = 0; self.yard_all_cost = 0;

                        var TPSS_cost = 0;
                        var CR_track_signal_cost = 0;
                        var CR_sta_cost = 0;
                        var connect_sta_cost = 0;
                        var GL_surf_sta_cost = 0;
                        var GL_under_sta_cost = 0;
                        var heavy_rail_under_sta_cost = 0;
                        var heavy_rail_surf_sta_cost = 0;
                        var SL_under_sta_cost = 0;
                        var wellington_cost = 0;
                        var cabot_cost = 0;
                        var codman_cost = 0;
                        var orient_cost = 0;
                        var BET_cost = 0;
                        var CR_yard_cost = 0;
                        var total_cost = 0;
                        var diversion_cost = 0;
                        //self.cost_obj = [];
                        
                        
                        //Get costs by line for damage to linear assets
                        RL_cost += cost_by_line("RL",expo_input[event].RL);
                        OL_cost += cost_by_line("OL",expo_input[event].OL);
                        BL_cost += cost_by_line("BL",expo_input[event].BL);
                        GL_cost += cost_by_line("GL",expo_input[event].GL);
                        GL_B_cost += cost_by_line("GL_B",expo_input[event].GL_B);
                        GL_C_cost += cost_by_line("GL_C",expo_input[event].GL_C);
                        GL_D_cost += cost_by_line("GL_D",expo_input[event].GL_D);
                        GL_E_cost += cost_by_line("GL_E",expo_input[event].GL_E);
                        SL_cost += cost_by_line("SL",expo_input[event].SL);
                        //console.log(RR_pctile);
                        
                        //Assume no cost to (Traction Power Substations) TPSS, Commutr Rail (CR)
                        TPSS_cost = 0;
                        CR_track_signal_cost = 0;
                        CR_sta_cost = 0;
                                           
                        //Get costs for stations
                        expo_input[event].POI_flood.forEach(function(item) {
                            //Get the flooded length of the location
                            var loc_depth_temp = item.depth;
                            var cost_temp = 0;
                            //Check to see if the POI variable if it doesn't already exist
                            if (typeof self[item.POI] !== "object") {
                                //If not, initialize the POI variable
                                self[item.POI] = [];
                                //Add identifier string to asset variable list
                                asset_variable_list.push(item.POI);
                            }
                            
                            //console.log(item.POI);
                            //Check to see if location is in SOV data set, if so use those cost distributions
                            if(SOV_locations.includes(item.POI) == true) {
                                //Check to see what type of location, such that the additional costs can be added to the correct cost variable
                                if(connecting.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_und_pctile,alpha_und_sta,loc_depth_temp);
                                    connect_sta_cost = connect_sta_cost + cost_temp;
                                    //console.log(connect_sta_cost);
                                } else if (GL_surface.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_GL_pctile,alpha_ag_sta,loc_depth_temp);
                                    GL_surf_sta_cost = GL_surf_sta_cost + cost_temp;
                                    //console.log(GL_surf_sta_cost);
                                } else if (GL_underground.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_GL_pctile,alpha_und_sta,loc_depth_temp);
                                    GL_under_sta_cost = GL_under_sta_cost + cost_temp;
                                    //console.log(GL_under_sta_cost);
                                } else if (hvy_underground.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_und_pctile,alpha_und_sta,loc_depth_temp);
                                    heavy_rail_under_sta_cost = heavy_rail_under_sta_cost + cost_temp;
                                    //console.log(heavy_rail_under_sta_cost);
                                } else if (hvy_surface.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_ag_sta,loc_depth_temp);
                                    heavy_rail_surf_sta_cost  = heavy_rail_surf_sta_cost + cost_temp;
                                    //console.log(heavy_rail_surf_sta_cost);
                                } else if (SL_underground.includes(item.POI) == true) {
                                    cost_temp = jStat.normal.inv(Math.random(), getSOVdata(item.POI)[0].Mean, getSOVdata(item.POI)[0]["Std. Dev"])*alpha_u(STA_SL_pctile,alpha_und_sta,loc_depth_temp);
                                    SL_under_sta_cost = SL_under_sta_cost + cost_temp;
                                    //console.log(SL_under_sta_cost);
                                } else if (item.POI == "Wellington Yard") {
                                    cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[17].Mean, cost_est_dist[17]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                    wellington_cost = cost_temp;
                                    //console.log(wellington_cost);
                                } else if (item.POI == "Cabot Yard") {
                                    cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[18].Mean, cost_est_dist[18]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                    cabot_cost = cost_temp;
                                    //console.log(cabot_cost);
                                } else if (item.POI == "Codman Yard") {
                                    cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[19].Mean, cost_est_dist[19]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                    codman_cost = cost_temp;
                                    //console.log(codman_cost);
                                } else if (item.POI == "Orient Heights Yard") {
                                    cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[20].Mean, cost_est_dist[20]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                    orient_cost = cost_temp;
                                    //console.log(orient_cost);
                                }
                            } else if(connecting.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[11].Mean, cost_est_dist[11]["Std. Dev"])*alpha_u(STA_und_pctile,alpha_und_sta,loc_depth_temp);
                                connect_sta_cost = connect_sta_cost + cost_temp;
                                //console.log(connect_sta_cost);
                            } else if (GL_surface.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[12].Mean, cost_est_dist[12]["Std. Dev"])*alpha_u(STA_GL_pctile,alpha_ag_sta,loc_depth_temp);
                                GL_surf_sta_cost = GL_surf_sta_cost + cost_temp;
                                //console.log(GL_surf_sta_cost);
                            } else if (GL_underground.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[13].Mean, cost_est_dist[13]["Std. Dev"])*alpha_u(STA_GL_pctile,alpha_und_sta,loc_depth_temp);
                                GL_under_sta_cost = GL_under_sta_cost + cost_temp;
                                //console.log(GL_under_sta_cost);
                            } else if (hvy_underground.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[14].Mean, cost_est_dist[14]["Std. Dev"])*alpha_u(STA_und_pctile,alpha_und_sta,loc_depth_temp);
                                heavy_rail_under_sta_cost = heavy_rail_under_sta_cost + cost_temp;
                                //console.log(heavy_rail_under_sta_cost);
                            } else if (hvy_surface.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[15].Mean, cost_est_dist[15]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_ag_sta,loc_depth_temp);
                                heavy_rail_surf_sta_cost  = heavy_rail_surf_sta_cost + cost_temp;
                                //console.log(heavy_rail_surf_sta_cost);
                            } else if (SL_underground.includes(item.POI) == true) {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[16].Mean, cost_est_dist[16]["Std. Dev"])*alpha_u(STA_SL_pctile,alpha_und_sta,loc_depth_temp);
                                SL_under_sta_cost = SL_under_sta_cost + cost_temp;
                                //console.log(SL_under_sta_cost);
                            } else if (item.POI == "Wellington Yard") {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[17].Mean, cost_est_dist[17]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                wellington_cost = cost_temp;
                               //console.log(wellington_cost);
                            } else if (item.POI == "Cabot Yard") {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[18].Mean, cost_est_dist[18]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                cabot_cost = cost_temp;
                                //console.log(cabot_cost);
                            } else if (item.POI == "Codman Yard") {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[19].Mean, cost_est_dist[19]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                codman_cost = cost_temp;
                                //console.log(codman_cost);
                            } else if (item.POI == "Orient Heights Yard") {
                                cost_temp = jStat.normal.inv(Math.random(), cost_est_dist[20].Mean, cost_est_dist[20]["Std. Dev"])*alpha_u(STA_ag_pctile,alpha_maint_f,loc_depth_temp);
                                orient_cost = cost_temp;
                                //console.log(orient_cost);
                            }
                            //If cost_temp is a number
                            if (isNaN(cost_temp) == false) {
                                //Push the POI and cost to the cost object
                                //cost_obj.push({"POI": item.POI, "cost": cost_temp});
                                //Add to the cost to the POI variable
                                self[item.POI].push(cost_temp);
                                //Add to the facilities_all_cost variable
                                facilities_all_cost += cost_temp;
                                //Check to see which line the POI belongs to, add to total line cost variable
                                if (sta_lines.RL.includes(item.POI)) {RL_sta_cost += cost_temp;}
                                if (sta_lines.OL.includes(item.POI)) {OL_sta_cost += cost_temp;}
                                if (sta_lines.BL.includes(item.POI)) {BL_sta_cost += cost_temp;}
                                if (sta_lines.GL.includes(item.POI)) {GL_sta_cost += cost_temp;}
                                if (sta_lines.SL.includes(item.POI)) {SL_sta_cost += cost_temp;}
                                //Check to see if the POI is underground, at-grade, or a maintenance yard; add to appropriate cost variable
                                if (GL_surface.includes(item.POI) || hvy_surface.includes(item.POI)) {at_grade_all_cost += cost_temp;}
                                if (GL_underground.includes(item.POI) || hvy_underground.includes(item.POI) || SL_underground.includes(item.POI)) {underground_all_cost += cost_temp;}
                                if (item.POI.includes("Yard")) {yard_all_cost += cost_temp;}
                            }
                        });
                        
                        //Tabulate total costs, push to output array
                        total_cost = RL_cost + OL_cost + BL_cost + GL_cost + GL_B_cost + GL_C_cost + GL_D_cost + GL_E_cost + SL_cost + connect_sta_cost + GL_surf_sta_cost + GL_under_sta_cost + heavy_rail_under_sta_cost + heavy_rail_surf_sta_cost + SL_under_sta_cost + wellington_cost + cabot_cost + codman_cost + orient_cost + BET_cost + CR_yard_cost + diversion_cost;
                        
                        //Transit line total costs
                        RL_all_cost = RL_sta_cost + RL_cost;
                        OL_all_cost = OL_sta_cost + OL_cost;
                        BL_all_cost = BL_sta_cost + BL_cost;
                        GL_all_cost = GL_sta_cost + GL_cost + GL_B_cost + GL_C_cost + GL_D_cost + GL_E_cost;
                        SL_all_cost = SL_sta_cost + SL_cost;
                        
                        //Linear asset total costs calculation
                        linear_all_cost = RL_cost + OL_cost + BL_cost + GL_cost + GL_B_cost + GL_C_cost + GL_D_cost + GL_E_cost + SL_cost;
                        
                        if (total_cost < 0 || isNaN(total_cost) == true) {
                            //Don't count this run (i.e., decrement the MC trial counter)
                            i -= 1;
                        } else {
                            if (event == 20) {
                                //total_cost = 0.167*(GL_cost+GL_B_cost+GL_C_cost+GL_D_cost+GL_E_cost+ GL_surf_sta_cost + GL_under_sta_cost);
                                //total_cost = jStat.normal.inv(Math.random(), 0.4975, 0.2 )*(GL_cost+GL_B_cost+GL_C_cost+GL_D_cost+GL_E_cost+ GL_surf_sta_cost + GL_under_sta_cost);
                            }
                            //////////////////////////////
                            //Push to storage variables
                            //Total costs
                            MC_total_costs.push(total_cost);
                            //Transit Line total costs
                            RL_all.push(RL_all_cost); OL_all.push(OL_all_cost); BL_all.push(BL_all_cost); GL_all.push(GL_all_cost); SL_all.push(SL_all_cost);
                            //Transit Line linear costs
                            RL_linear.push(RL_cost); OL_linear.push(OL_cost); BL_linear.push(BL_cost); GL_linear.push(GL_cost + GL_B_cost + GL_C_cost + GL_D_cost + GL_E_cost); SL_linear.push(SL_cost);
                            //Transit Line facility costs
                            RL_sta.push(RL_sta_cost); OL_sta.push(OL_sta_cost); BL_sta.push(BL_sta_cost); GL_sta.push(GL_sta_cost); SL_sta.push(SL_sta_cost); connecting_all.push(connect_sta_cost);
                            //Asset class costs
                            linear_all.push(linear_all_cost); facilities_all.push(facilities_all_cost);
                            //Linear asset type costs
                            _3rd_rail_all.push(_3rd_rail_all_cost); catenary_all.push(catenary_all_cost); lighting_all.push(lighting_all_cost); power_all.push(power_all_cost); rail_all.push(rail_all_cost); signal_all.push(signal_all_cost); tunnel_struct_all.push(tunnel_struct_all_cost);
                            //Facility type costs
                            underground_all.push(underground_all_cost); at_grade_all.push(at_grade_all_cost); yard_all.push(yard_all_cost);
                        }
    
                    }
                    
                    //Generate detailed cost summary (min, max, mean, std_dev for each asset)
                    asset_variable_list.forEach(function(asset) {
                        detailed_cost_summary.push({"asset": asset, min: jStat.min(self[asset]), max: jStat.max(self[asset]), mean: jStat.mean(self[asset]), std_dev: jStat.stdev(self[asset])});
                    });
                    
                    //console.log(MC_total_costs);
                    var total_cost_mean = jStat.mean(MC_total_costs);

                    var total_cost_stdev = jStat.stdev(MC_total_costs,true);
                    console.log("Expected Cost = $" + total_cost_mean.toFixed(2) + "M; Standard Deviation = $" + total_cost_stdev.toFixed(2) + "M");
                    
                    self.postMessage([{scenario: event, raw: MC_total_costs, mean: total_cost_mean, std_dev: total_cost_stdev, "detailed_costs": detailed_cost_summary}]);
                    
                    //Print MC_total_costs to log
                    var testr = MC_total_costs.includes(NaN);
                    console.log(testr);
                    
                    //Add cost statistics to results array
                    expo_output.push(total_cost_mean,total_cost_stdev);
                    
                    //Add expo_output to compiled costs array
                    compiled_costs.push(expo_output);
                    
                    //Increment exposure increment variable
                    expo_itr += 1;
                    
                    //Ensure the reset of the promise_tracker variable
                    promise_tracker = 0;
                    
                    //Wait 200ms, then indicate that the analysis run has completed
                    setInterval(indicated(),2000);
                    function indicated() {
                        finished_indicator = 1;
                    }
                }
            };


////Import the cost estimation distribution data using d3
//d3.csv("Input/Cost_Est_Dist.csv", function(data) {
//    //Use the unary plus operator to convert numbers from text to float
//    data.forEach(function(d){
//        d.Mean = +d.Mean;
//        d["Std. Dev"] = +d["Std. Dev"];
//    });
//    //Create the js variable
//    self.cost_est_dist = data;
//});

////Import the station type lists using d3
//d3.csv("Input/Sta_Class.csv", function(data) {
//    //Initialize the station type lists
//    self.GL_surface = [];
//    self.GL_underground = [];
//    self.connecting = [];
//    self.hvy_surface = [];
//    self.hvy_underground = [];
//    self.SL_underground = [];
//    
//    //For each row of data in the csv file, check to see if list cell is empty. If not, add to list
//    data.forEach(function(d){
//        if (d["GL Surface Station"] != ""){
//            GL_surface.push(d["GL Surface Station"]);    
//        }
//        if (d["GL Underground Station"] != ""){
//            GL_underground.push(d["GL Underground Station"]);
//        }
//        if (d["Connecting Station"] != ""){
//            connecting.push(d["Connecting Station"]);
//        }
//        if (d["Heavy Rail Underground Station"] != ""){
//            hvy_underground.push(d["Heavy Rail Underground Station"]);
//        }
//        if (d["Heavy Rail Surface Station"] != ""){
//            hvy_surface.push(d["Heavy Rail Surface Station"]);
//        }
//        if (d["SL Underground Station"] != ""){
//            SL_underground.push(d["SL Underground Station"]);
//        }
//    });
//    
//});

////Import the SOV replacement costs using d3
//d3.csv("Input/SOV_replacement_costs.csv", function(data) {
//    ///Use the unary plus operator to convert numbers from text to float
//    data.forEach(function(d){
//        d.Mean = +d.Mean;
//        d["Std. Dev"] = +d["Std. Dev"];
//    });
//    //Create the js variable
//    self.SOV_replace_costs = data;
//    
//});


//Get the JSON entry for the location of interest from the SOV data set
//Source: https://stackoverflow.com/questions/19253753/javascript-find-json-value/19254067
self.getSOVdata = function(loc) {
    return SOV_replace_costs.filter(
        function(SOV_replace_costs) {
            return SOV_replace_costs.Item == loc;
        }
    );
}

////DAMAGE FUNCTIONS (Kok et al., 2004)

//Cost estimation by line
self.cost_by_line = function(line,line_expo_in) {
    //Initialize line cost output variable
    var line_cost_out = 0;
    var line_signal_cost_out = 0;
    var line_rail_cost_out = 0;
    var line_catenary_cost_out = 0;
    var line_3rd_rail_cost_out = 0;
    var line_struct_cost_out = 0;
    var line_light_cost_out = 0;
    var line_pwr_cost_out = 0;
    
    //If the line of interest is the Green Line
    if (line.includes("GL") == true) {
        //console.log('GL');
        //For each 10ft increment
        for (i = 0; i < line_expo_in.length; i++) {
        //Estimate the damage costs to signals, rail, catenary
        //Signals
        line_signal_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[5].Mean, cost_est_dist[5]["Std. Dev"])*alpha_u(Math.random(),alpha_signals,line_expo_in[i]);
        //Rail
        line_rail_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[4].Mean, cost_est_dist[4]["Std. Dev"])*alpha_u(Math.random(),alpha_rail,line_expo_in[i]);
        //Catenary
        line_catenary_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[3].Mean, cost_est_dist[3]["Std. Dev"])*alpha_u(Math.random(),alpha_cat,line_expo_in[i]);
        
            //Check to see if the segment is within a tunnel section
            tunnel_locations[line].forEach(function(tunneled){
            //If the segment is within a tunnel
            if ((tunneled.x0 < 10*i) && (10*i <= tunneled.x1)) {
                //Estimate the damage costs to the tunnel structure and lighting
                //Tunnel structure (BL PLACEHOLDER)
                line_struct_cost_out += (10/5280)*jStat.normal.inv(Math.random(), cost_est_dist[25].Mean, cost_est_dist[25]["Std. Dev"])*alpha_u(Math.random(),alpha_struct,line_expo_in[i]);
                //Lighting (SL SIGNAL PLACEHOLDER REPLACEMENT COSTS)
                line_light_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[6].Mean, cost_est_dist[6]["Std. Dev"])*alpha_u(Math.random(),alpha_light,line_expo_in[i]);
            }
            });
        }
    //Else, if the line of interest is the Blue Line
    } else if (line.includes("BL") == true) {
        //console.log('BL');
        //For each 10ft increment
        for (i = 0; i < line_expo_in.length; i++) {
            //Check to see if the segment is within a tunnel section
            tunnel_locations[line].forEach(function(tunneled){
            //If the segment is within a tunnel
            if ((tunneled.x0 < 10*i) && (10*i <= tunneled.x1)) {
                //Estimate the damage costs to the tunnel structure and lighting
                //Tunnel structure
                line_struct_cost_out += (10/5280)*jStat.normal.inv(Math.random(), cost_est_dist[25].Mean, cost_est_dist[25]["Std. Dev"])*alpha_u(Math.random(),alpha_struct,line_expo_in[i]);
                //Lighting (SL SIGNAL PLACEHOLDER REPLACEMENT COSTS)
                line_light_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[6].Mean, cost_est_dist[6]["Std. Dev"])*alpha_u(Math.random(),alpha_light,line_expo_in[i]);
            }
            });
            //If the segment is prior to Airport Station
            if (10*i < 17517) {
                //Estimate the damage cost to the 3rd rail and power conduit
                //3rd Rail
                line_3rd_rail_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[1].Mean, cost_est_dist[1]["Std. Dev"])*alpha_u(Math.random(),alpha_3rd,line_expo_in[i]);
                //Power conduit
                line_pwr_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[24].Mean, cost_est_dist[24]["Std. Dev"])*alpha_u(Math.random(),alpha_pwr,line_expo_in[i]);
            } else {
                //Otherwise, estimate cost to catenary
                line_catenary_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[3].Mean, cost_est_dist[3]["Std. Dev"])*alpha_u(Math.random(),alpha_cat,line_expo_in[i]);
            }
            //Estimate the damage costs to signals, rail (regardless of location along alignment)
            //Signals
            line_signal_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[2].Mean, cost_est_dist[2]["Std. Dev"])*alpha_u(Math.random(),alpha_signals,line_expo_in[i]);
            //Rail
            line_rail_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[0].Mean, cost_est_dist[0]["Std. Dev"])*alpha_u(Math.random(),alpha_rail,line_expo_in[i]);
        }
    //Else, if the line of interest is the Silver Line
    } else if (line.includes("SL") == true) {
        //console.log('SL');
        //For each 10ft increment
        for (i = 0; i <= line_expo_in.length; i++) {
            //If the segment is in the tunnel
            if (10*i <= tunnel_locations[line][0].x1) {
                //Estimate the damage costs to the tunnel structure and lighting
                //Tunnel structure (BL PLACEHOLDER)
                line_struct_cost_out += (10/5280)*jStat.normal.inv(Math.random(), cost_est_dist[25].Mean, cost_est_dist[25]["Std. Dev"])*alpha_u(Math.random(),alpha_struct,line_expo_in[i]);
                //Lighting (SL SIGNAL PLACEHOLDER REPLACEMENT COSTS)
                line_light_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[6].Mean, cost_est_dist[6]["Std. Dev"])*alpha_u(Math.random(),alpha_light,line_expo_in[i]);
            }
            //Estimate the damage costs to signals
            line_signal_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[6].Mean, cost_est_dist[6]["Std. Dev"])*alpha_u(Math.random(),alpha_signals,line_expo_in[i]);
        }
    //Else, for the Orange and Red Lines
    } else {
        //console.log('RL || RLd || OL');
        //For each 10ft increment
        for (i = 0; i < line_expo_in.length; i++) {
            //Estimate the damage costs to signals, rail, 3rd rail + power conduit
            //Signals
            line_signal_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[2].Mean, cost_est_dist[2]["Std. Dev"])*alpha_u(Math.random(),alpha_signals,line_expo_in[i]);
            //Rail
            line_rail_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[0].Mean, cost_est_dist[0]["Std. Dev"])*alpha_u(Math.random(),alpha_rail,line_expo_in[i]);
            //3rd Rail
            line_3rd_rail_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[1].Mean, cost_est_dist[1]["Std. Dev"])*alpha_u(Math.random(),alpha_3rd,line_expo_in[i]);
            //Power conduit
            line_pwr_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[24].Mean, cost_est_dist[24]["Std. Dev"])*alpha_u(Math.random(),alpha_pwr,line_expo_in[i]);
            
            //Check to see if the segment is within a tunnel section
            tunnel_locations[line].forEach(function(tunneled){
                //If the segment is within a tunnel
                if ((tunneled.x0 < 10*i) && (10*i <= tunneled.x1)) {
                    //Estimate the damage costs to the tunnel structure and lighting
                    //Tunnel structure (BL PLACEHOLDER)
                    line_struct_cost_out += (10/5280)*jStat.normal.inv(Math.random(), cost_est_dist[25].Mean, cost_est_dist[25]["Std. Dev"])*alpha_u(Math.random(),alpha_struct,line_expo_in[i]);
                    //Lighting (SL SIGNAL PLACEHOLDER REPLACEMENT COSTS)
                    line_light_cost_out += (20/5280)*jStat.normal.inv(Math.random(), cost_est_dist[6].Mean, cost_est_dist[6]["Std. Dev"])*alpha_u(Math.random(),alpha_light,line_expo_in[i]);
                }
            });
        }
    }
    
    //Sum up the line costs
    line_cost_out = line_signal_cost_out + line_rail_cost_out + line_catenary_cost_out + line_3rd_rail_cost_out + line_struct_cost_out + line_light_cost_out + line_pwr_cost_out;
    //If none of the numbers are not NaN
    if ((isNaN(line_signal_cost_out)==isNaN(line_rail_cost_out)==isNaN(line_catenary_cost_out)==isNaN(line_3rd_rail_cost_out)==isNaN(line_struct_cost_out)==isNaN(line_light_cost_out)==isNaN(line_pwr_cost_out))==false) {
        //Add the line costs to the cost_obj array
        //cost_obj.push({"Line": line, "signal": line_signal_cost_out, "rail": line_rail_cost_out, "catenary": line_catenary_cost_out, "3rd_rail": line_3rd_rail_cost_out, "tunnel_struct":line_struct_cost_out, "lighting":line_light_cost_out, "power":line_pwr_cost_out});
        //Add the asset type costs to the systemwide tracker variable
        signal_all_cost += line_signal_cost_out; rail_all_cost += line_rail_cost_out; catenary_all_cost += line_catenary_cost_out; _3rd_rail_all_cost += line_3rd_rail_cost_out; tunnel_struct_all_cost += line_struct_cost_out; lighting_all_cost += line_light_cost_out; power_all_cost += line_pwr_cost_out;
        //Add the line costs to the relevant cost variable array for each asset type
        self[line+"_3rd_rail"].push(line_3rd_rail_cost_out);    self[line+"_catenary"].push(line_catenary_cost_out);  self[line+"_lighting"].push(line_light_cost_out);     self[line+"_power"].push(line_pwr_cost_out);      self[line+"_rail"].push(line_rail_cost_out);      self[line+"_signal"].push(line_signal_cost_out);      self[line+"_tunnel_struct"].push(line_struct_cost_out);
    }
    
    return line_cost_out;
}

//Rail roads
self.alpha_RR = function(depth_in_feet) {
    //depth = [meters], thus to convert entry, multiply by 0.3048
    var alpha1 = 0.28*depth_in_feet*0.3048;
    var alpha2 = 0.18*depth_in_feet*0.3048 + 0.1;
    return Math.min(alpha1,alpha2,1);
};

//Electric and communications systems
self.alpha_ECC = function(depth_in_feet) {
    //depth = [meters], thus to convert entry, multiply by 0.3048
    var alpha1 = 0.8*depth_in_feet*0.3048;
    var alpha2 = 0.34*depth_in_feet*0.3048 + 0.15;
    return Math.min(alpha1,alpha2,1);
};

//Vehicles
self.alpha_V = function(depth_in_feet) {
    //depth = [meters], thus to convert entry, multiply by 0.3048
    var alpha1 = Math.max(0.72*depth_in_feet*0.3048 - 0.30,0);
    var alpha2 = Math.max(0.17*depth_in_feet*0.3048 - 0.03,0);
    var alpha3 = 0.31*depth_in_feet*0.3048 + 0.10;
    return Math.min(alpha1,alpha2,alpha3,1);
};

//Depth-damage relationship function with uncertainty (Egorova et al., 2008)
self.alpha_u = function(XYZ_pctile, ALPHA_XYZ, depth) {
    //If the flood depth is less than 0.49ft, is undefined, or NaN
    if (depth < 0.49 || depth == undefined || isNaN(depth) == true) {
        //Return 0
        return 0;
    } else {
        //Consider flood depth uncertainty via normal dist. with a 90% CI = +/- 20% of the flood depth (std.dev. =4*depth)
        //var depth_u = depth;
        var depth_u = jStat.normal.inv(Math.random(),depth,0.122*depth);
        //k is a variable that describes the magnitude of the std. dev. of the beta dist. used to model depth-damage uncertainty. Assume same level of uncertainty for all curves
        var k_depth_damage = 0.4;
        //Using a beta distribution to characterize the uncertainty, we find the component of the alpha and beta parameters that are independent of the central estimate
        var alpha_dd_rd = (1/k_depth_damage) - 1;
        var beta_dd_rd_1 = (1/k_depth_damage) - 1;
        
        //Randomly sample the beta distribution for the flood depth of interest
        var alpha_out = jStat.beta.inv(XYZ_pctile, alpha_dd_rd*ALPHA_XYZ(depth_u), beta_dd_rd_1*(1-ALPHA_XYZ(depth_u)));
        //Check to see if alpha parameter is greater than 0
        if (alpha_dd_rd*ALPHA_XYZ(depth_u) > 0) {
            //If so, check to see if the beta parameter is greater than 0
            if (beta_dd_rd_1*(1-ALPHA_XYZ(depth_u)) > 0) {
                //If so, ensure that the depth-damage function output is between 0 and 1
                alpha_out = Math.max(Math.min(alpha_out,1),0);
            //If beta parameter is negative, then depth-damage function output is 1
            } else {
                alpha_out = 1;
            }
        //If the alpha parameter is 0, then so too is the depth-damage function output
        } else {
            alpha_out = 0;
        }
        return alpha_out;
    }
};