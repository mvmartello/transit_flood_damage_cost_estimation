//Import tunnel data
d3.csv("Input/MBTA_tunnel_geom.csv", function(data1) {
    //Use the unary plus operator to convert numbers from text to float
    data1.forEach(function(d){
        d.RL_invert_x = +d.RL_invert_x;
        d.RL_invert = +d.RL_invert;
        d.RL_crown_x = +d.RL_crown_x;
        d.RL_crown = +d.RL_crown;
        
        d.RLd_invert_x = +d.RLd_invert_x;
        d.RLd_invert = +d.RLd_invert;
        d.RLd_crown_x = +d.RLd_crown_x;
        d.RLd_crown = +d.RLd_crown;
        
        d.OL_invert_x = +d.OL_invert_x;
        d.OL_invert = +d.OL_invert;
        d.OL_crown_x = +d.OL_crown_x;
        d.OL_crown = +d.OL_crown;
        
        d.BL_invert_x = +d.BL_invert_x;
        d.BL_invert = +d.BL_invert;
        d.BL_crown_x = +d.BL_crown_x;
        d.BL_crown = +d.BL_crown;
        
        d.GL_A_invert_x = +d.GL_A_invert_x;
        d.GL_A_invert = +d.GL_A_invert;
        d.GL_A_crown_x = +d.GL_A_crown_x;
        d.GL_A_crown = +d.GL_A_crown;
        
        d.GL_B_invert_x = +d.GL_B_invert_x;
        d.GL_B_invert_x_adj = +d.GL_B_invert_x_adj;
        d.GL_B_invert = +d.GL_B_invert;
        d.GL_B_crown_x = +d.GL_B_crown_x;
        d.GL_B_crown_x_adj = +d.GL_B_crown_x_adj;
        d.GL_B_crown = +d.GL_B_crown;
        
        d.GL_C_invert_x = +d.GL_C_invert_x;
        d.GL_C_invert_x_adj = +d.GL_C_invert_x_adj;
        d.GL_C_invert = +d.GL_C_invert;
        d.GL_C_crown_x = +d.GL_C_crown_x;
        d.GL_C_crown_x_adj = +d.GL_C_crown_x_adj;
        d.GL_C_crown = +d.GL_C_crown;
        
        d.GL_D_invert_x = +d.GL_D_invert_x;
        d.GL_D_invert_x_adj = +d.GL_D_invert_x_adj;
        d.GL_D_invert = +d.GL_D_invert;
        d.GL_D_crown_x = +d.GL_D_crown_x;
        d.GL_D_crown_x_adj = +d.GL_D_crown_x_adj;
        d.GL_D_crown = +d.GL_D_crown;
        
        d.GL_E_invert_x = +d.GL_E_invert_x;
        d.GL_E_invert_x_adj = +d.GL_E_invert_x_adj;
        d.GL_E_invert = +d.GL_E_invert;
        d.GL_E_crown_x = +d.GL_E_crown_x;
        d.GL_E_crown_x_adj = +d.GL_E_crown_x_adj;
        d.GL_E_crown = +d.GL_E_crown;

        d.SL_invert_x = +d.SL_invert_x;
        d.SL_invert_x_adj = +d.SL_invert_x_adj;
        d.SL_invert = +d.SL_invert;
        d.SL_crown_x = +d.SL_crown_x;
        d.SL_crown_x_adj = +d.SL_crown_x_adj;
        d.SL_crown = +d.SL_crown;
        
        d.Branch_y = +d.Branch_y;
        d.GL_BC_branch = +d.GL_BC_branch;
        d.GL_D_branch = +d.GL_D_branch;
        d.GL_E_branch = +d.GL_E_branch;
        d.GL_B_start= +d.GL_B_start;
        d.GL_C_start= +d.GL_C_start;
        d.GL_D_start= +d.GL_D_start;
        d.GL_E_start= +d.GL_E_start;
        d.SL_start= +d.SL_start;

        d.RL_GL_sect_x = +d.RL_GL_sect_x;
        d.RL_GL_sect_y = +d.RL_GL_sect_y;
        d.RL_OL_sect_x = +d.RL_OL_sect_x;
        d.RL_OL_sect_y = +d.RL_OL_sect_y;
        d.RL_SL_sect_x = +d.RL_SL_sect_x;
        d.RL_SL_sect_y = +d.RL_SL_sect_y;
        d.OL_RL_sect_x = +d.OL_RL_sect_x;
        d.OL_RL_sect_y = +d.OL_RL_sect_y;
        d.OL_BL_sect_x = +d.OL_BL_sect_x;
        d.OL_BL_sect_y = +d.OL_BL_sect_y;
        d.OL_GL_sect_x = +d.OL_GL_sect_x;
        d.OL_GL_sect_y = +d.OL_GL_sect_y;
        d.BL_GL_sect_x = +d.BL_GL_sect_x;
        d.BL_GL_sect_y = +d.BL_GL_sect_y;
        d.BL_OL_sect_x = +d.BL_OL_sect_x;
        d.BL_OL_sect_y = +d.BL_OL_sect_y;
        d.GL_OL_sect_x = +d.GL_OL_sect_x;
        d.GL_OL_sect_y = +d.GL_OL_sect_y;
        d.GL_BL_sect_x = +d.GL_BL_sect_x;
        d.GL_BL_sect_y = +d.GL_BL_sect_y;
        d.GL_RL_sect_x = +d.GL_RL_sect_x;
        d.GL_RL_sect_y = +d.GL_RL_sect_y;
        d.SL_RL_sect_x = +d.SL_RL_sect_x;
        d.SL_RL_sect_y = +d.SL_RL_sect_y;

    });
    //Create the js variable
    window.tunnel_data = data1;

});

//Load in the junction locations
d3.csv("Input/jct_x_values.csv", function(data2) {
    //Use the unary plus operator to convert numbers from text to float
    data2.forEach(function(d){
        d.Node = +d.Node;
        d.x = +d.x;
    });
    //Create the js variable
    window.jct_locations = data2;
});

//Load in the invert and crown  elevation data again
d3.csv("Input/invert_elev.csv", function(data) {
    //Use the unary plus operator to convert numbers from text to float
    data.forEach(function(d){
        d.x = +d.x;
        d.invert_elev = +d.invert_elev;
    });
    //Create the js variable
    window.invert_elev = _.groupBy(data,'Line');
});

d3.csv("Input/crown_elev.csv", function(data) {
    //Use the unary plus operator to convert numbers from text to float
    data.forEach(function(d){
        d.x = +d.x;
        d.crown_elev = +d.crown_elev;
    });
    //Create the js variable
    window.crown_elev = _.groupBy(data,'Line');
});

//Load in the station boundaries
d3.csv("Input/sta_bounds.csv", function(data) {
    //Use the unary plus operator to convert numbers from text to float
    data.forEach(function(d){
        d.x = +d.x;
        d.y0 = +d.y0;
        d.y1 = +d.y1;
        
    });
    //Sort the data by line
    data = _.groupBy(data,'Line');
    //Key List 2
    var key_list2 = ["RL","OL","BL","GL","SL"];
    //Create the js variable
    window.sta_bounds = [];
    //For each key in key_list2, sort the data by station
    key_list2.forEach(function(key) {
        
       data[key] = _.groupBy(data[key],"sta");
    });
    //Group into each line
    sta_bounds = data;
});