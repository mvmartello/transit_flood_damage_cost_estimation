//Global storage variable
window.exposure_out = [];

// Default graph formatting

//Initialize plots
//Red Line
window.RL_plot1 = []; window.RL_plot2 = []; window.RL_plot3 = []; window.RL_plot4 = []; window.RL_plot5 = []; window.RL_plot6 = [];
//Red Line Ashmont
window.RLd_plot1 = []; window.RLd_plot2 = [];
//Orange Line
window.OL_plot1 = []; window.OL_plot2 = []; window.OL_plot3 = []; window.OL_plot4 = []; window.OL_plot5 = [];
//Blue Line
window.BL_plot1 = []; window.BL_plot2 = []; window.BL_plot3 = [];
//Green Line (A branch)
window.GL_plot1 = []; window.GL_plot2 = [];
//Green Line (B branch)
window.GL_B_plot1 = []; window.GL_B_plot2 = [];
///Green Line (C branch)
window.GL_C_plot1 = [];
//Green Line (D branch)
window.GL_D_plot1 = []; window.GL_D_plot2 = []; window.GL_D_plot3 = []; window.GL_D_plot4 = [];
//Green Line (E branch)
window.GL_E_plot1 = [];
//Silver Line
window.SL_plot1 = [];
//Summary flood depths plot
window.flood_lens_plot = [];
//Cost summary plots(breakdown by line)
window.systemwide_costs_plot = []; window.transit_line_costs_plot = []; window.RL_costs_plot = []; window.OL_costs_plot = []; window.BL_costs_plot = []; window.GL_costs_plot = []; window.SL_costs_plot = [];
//Cost summary plots(breakdown by asset type)
window.systemwide_costs_plot2 = [];
window.asset_class_costs_plot = [];
window.struct_cost_plot = [];
window.rail_cost_plot = [];
window.signals_cost_plot = [];
window._3rd_rail_cost_plot = [];
window.catenary_cost_plot = [];
window.power_cost_plot = [];
window.lighting_cost_plot = [];
window.und_sta_cost_plot = [];
window.ag_sta_cost_plot = [];
window.yard_cost_plot = [];
window.connect_sta_cost_plot = [];

//Set axis bounds
window.y_max3 = 50;
window.y_min3 = -100;
window.x_min3 = 0;
window.x_max3 = 16000; 

window.y_max4 = 60;
window.y_min4 = 0;
window.x_min4 = 0;
window.x_max4 = 20000; 

window.y_max_cost1 = 1;
window.y_min_cost1 = 0;
window.x_min_cost1 = 0;
window.x_max_cost1 = 10000; 

// set the dimensions and margins for the graphs
window.margin2 = {top: 10, right: 150, bottom: 8, left: 80};
window.width2 = 1600 - margin2.left - margin2.right;
window.height2 = 150 - margin2.top - margin2.bottom;

window.margin3 = {top: 10, right: 150, bottom: 50, left: 80};
window.width3 = 1600 - margin3.left - margin3.right;
window.height3 = 192 - margin3.top - margin3.bottom;

//Tunnel flood lengths plot
window.margin4 = {top: 10, right: 10, bottom: 50, left: 80};
window.width4 = 700 - margin4.left - margin4.right;
window.height4 = 500 - margin4.top - margin4.bottom;

//Cost Plots
window.margin_cost1 = {top: 10, right: 50, bottom: 50, left: 80};
window.width_cost1 = 1100 - margin_cost1.left - margin_cost1.right;
window.height_cost1 = 192 - margin_cost1.top - margin_cost1.bottom;

window.margin_cost2 = {top: 10, right: 50, bottom: 50, left: 80};
window.width_cost2 = 400 - margin_cost2.left - margin_cost2.right;
window.height_cost2 = 192 - margin_cost2.top - margin_cost2.bottom;


//Construct longitudinal plots
function plots(destination,plot_i,height=height2,margin=margin2, width = width2, x_min = x_min3, x_max = x_max3, y_min = y_min3, y_max = y_max3, x_label = "Length along tunnel [ft]", y_label = "Elev. [ft, NAVD88]", x_tics = 15, y_tics = 3) {
		console.log(x_min);
		console.log(x_max);
        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min,x_max]).range([ 0, width ]);
        // Establish Y axis scale
        var y_scale = d3.scale.linear().domain([y_max, y_min]).range([ 0, height ]);
        // Establish X axis
        var xAxis2 = d3.svg.axis().scale(x_scale).orient("bottom").tickFormat(d3.format("d"));
        // Establish Y axis
        var yAxis2 = d3.svg.axis().scale(y_scale).orient("left");
        // Establish X axis gridlines
        var xGrid2 = d3.svg.axis().scale(x_scale).orient("top").tickSize(-height);
        // Establish Y axis gridlines
        var yGrid2 = d3.svg.axis().scale(y_scale).orient("right").tickSize(width);
		
        //Remove previous graph from graph_container
	d3.select(destination).selectAll("*").remove();
		
		//Append the plot to the destination with pre-specified dimensions
		plot_i = d3.select(destination)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
            
		// Add X axis gridlines
		plot_i.append("g")
		  .attr("class", "tick_g")
		  .call(xGrid2.ticks(x_tics));
		// Add Y axis gridlines
		plot_i.append("g")
		  .attr("class", "tick_g")
		  .call(yGrid2.ticks(y_tics));
        //Add X axis
		plot_i.append("g")
		  .attr("class", "x_axis_g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis2.ticks(x_tics));
		//Add Y axis
		plot_i.append("g")
		  .attr("class", "y_axis_g")
		  .call(yAxis2.ticks(y_tics));
				
		//Add X axis title
		plot_i.append("text")
		.attr("x", (width / 2))             
		.attr("y", height + 45)
		.attr("text-anchor", "middle")  
		.attr("class", "x_axis_g")
        .attr("font-size", "16px")
		.text(x_label);
		//Add Y axis title
		plot_i.append("text")
		.attr("x", -height*0.5)             
		.attr("y", -0.04*width)
		.attr("text-anchor", "middle")  
		.attr("class", "x_axis_g")
        .attr("font-size", "16px")
		.attr("transform", "rotate(-90)")
		.text(y_label);
		
		//Add a clip so the data doesn't run outside the plot boundaries (Source: https://bl.ocks.org/mbostock/4015254)
		plot_i.append("clipPath").attr("id", "clip").append("rect").attr("width",width).attr("height",height);
                
}

function add_tunnel_geometry(destination,plot_i,color,line,_adj = "",height=height2,margin=margin2, width = width2,lin_wt = 2) {

        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min3,x_max3]).range([ 0, width ]);
        // Establish Y axis scale
        var y_scale = d3.scale.linear().domain([y_max3, y_min3]).range([ 0, height ]);
        
    //Select the plot of interest in the location of interest, transform coordinates to prepare for data addition
    plot_i  = d3.select(destination)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
    
    //Add the invert elevation of the tunnel of interest
        plot_i.append("path").datum(tunnel_data).attr("class", "line").attr("fill", "none").attr("stroke", color).attr("stroke-width", lin_wt).attr("d", d3.svg.line()
			.y(function(d) { if (d[line + "_invert"] != 0) {return y_scale(d[line + "_invert"])} })
			.x(function(d) { if (d[line + "_invert"] != 0) {return x_scale(d[line + "_invert_x" + _adj])}  })
		);

        //Add the crown elevation of the tunnel of interest
        plot_i.append("path").datum(tunnel_data).attr("class", "line").attr("fill", "none").attr("stroke", color).attr("stroke-width", lin_wt).attr("d", d3.svg.line()
			.y(function(d) { if (d[line + "_crown"]  != 0) {return y_scale(d[line + "_crown"])} })
			.x(function(d) { if (d[line + "_crown"]  != 0) {return x_scale(d[line + "_crown_x" + _adj])}  })
        );		

}

function add_area(destination, plot_i, data, fill_color, line_color, lin_wt = 2, height=height2, margin=margin2, width = width2, x_min = x_min3, x_max = x_max3, y_min = y_min3, y_max = y_max3) {

        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min,x_max]).range([ 0, width ]);
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
    
    //Add the invert elevation of the tunnel of interest
        plot_i.append("path").datum(data).attr("class", "line").attr("fill", fill_color).attr("stroke", line_color).attr("stroke-width", lin_wt).attr("d", d3.svg.area()
			.x(function(d) { if (d.x != 0) {return x_scale(d.x)}  })
			.y0(function(d) { if (d.y0 != 0) {return y_scale(d.y0)} })
			.y1(function(d) { if (d.y1 != 0) {return y_scale(d.y1)} })
		);

}

function add_text(destination,plot_i,text,x_loc,y_loc,height=height2,margin=margin2, width = width2, font_wt = "bold") {
    
        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min3,x_max3]).range([ 0, width ]);
        // Establish Y axis scale
        var y_scale = d3.scale.linear().domain([y_max3, y_min3]).range([ 0, height ]);
        
    //Select the plot of interest in the location of interest, transform coordinates to prepare for data addition
    plot_i  = d3.select(destination)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
    //Add text
		plot_i.append("text")
		.attr("x", x_loc)             
		.attr("y", y_loc)
		.attr("text-anchor", "left")  
		.attr("class", "x_axis_g")
        .attr("font-size", "18px")
        .attr("font-weight", font_wt)
		.text(text);
}

function add_tunnel_data(destination,plot_i,color,data_key_x,data_key_y,height=height2,margin=margin2, width = width2,lin_wt = 3, datum_i = tunnel_data, x_min = x_min3, x_max = x_max3, y_min = y_min3, y_max = y_max3) {
	
        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min,x_max]).range([ 0, width ]);
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
    
    //Add the data of interest
        plot_i.append("path").datum(datum_i).attr("class", "line").attr("fill", "none").attr("stroke", color).attr("stroke-width", lin_wt).attr("clip-path","url(#clip)").attr("d", d3.svg.line()
			.y(function(d) { if (d[data_key_y] != 0 ) {return y_scale(d[data_key_y]);} })
			.x(function(d) { if (d[data_key_y] != 0 ) {return x_scale(d[data_key_x]);}  })
		);
}

function add_cost_est_dists(destination, plot_i, datum_i, stroke_color = _red_, fill_color = "none", x_min = x_min_cost1, x_max = x_max_cost1, height = height_cost1, margin = margin_cost1, width = width_cost1, lin_wt = 3, y_min = y_min_cost1, y_max = y_max_cost1) {

        // Establish X axis scale
        var x_scale = d3.scale.linear().domain([x_min,x_max]).range([ 0, width ]);
        // Establish Y axis scale
        var y_scale = d3.scale.linear().domain([y_max, y_min]).range([ 0, height ]);
        
    //Select the plot of interest in the location of interest, transform coordinates to prepare for data addition
    plot_i  = d3.select(destination)
		  .append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.classed("svg-content-responsive", true)
		  .append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");
    
    //Add the data of interest
        plot_i.append("path").datum(datum_i).attr("class", "line").attr("fill", fill_color).attr("stroke", stroke_color).attr("stroke-width", lin_wt).attr("clip-path","url(#clip)").attr("d", d3.svg.line()
			.y(function(d) { return y_scale(d.y); })
			.x(function(d) { return x_scale(d.x); })
		);
}

var _red_ = "rgba(219, 0, 0,1)";
var _orange_ = "rgba(255, 145, 0,1)";
var _blue_ = "rgba(0, 30, 2550,1)";
var _green_ = "rgba(0, 166, 3,1)";
var _silver_ = "rgba(133, 133, 133,1)";
var _sta_ = "rgba(133, 133, 133,0.25)";

//Build out all the plots, add longitudinal tunnel data
function plot_build(rpt_numbr=20) {
    //Red Line
	plots("#svgRL1",RL_plot1,height2,margin2,width2,0,16000,-100,50); plots("#svgRL2",RL_plot2,height2,margin2,width2,16000,32000,-100,50);	plots("#svgRL3",RL_plot3,height2,margin2,width2,30500,46500,-100,50); plots("#svgRL4",RL_plot4,height2,margin2,width2,46000,62000,-100,50);	plots("#svgRL5",RL_plot5,height2,margin2,width2,62000,78000,-50,100); plots("#svgRL6",RL_plot6,height2,margin2,width2,78000,94000,-50,100);	plots("#svgRL7",RL_plot6,height3,margin3,width3,94000,110000,-50,100); plots("#svgRLd1",RLd_plot1,height2,margin2,width2,46000,62000,-50,100); plots("#svgRLd2",RLd_plot2,height3,margin3,width3,62000,78000,-50,100);
	//Orange Line
	plots("#svgOL1",OL_plot1,height2,margin2,width2,0,16000,-100,50); plots("#svgOL2",OL_plot2,height2,margin2,width2,16000,32000,-100,50); plots("#svgOL3",OL_plot3,height2,margin2,width2,26000,42000,-100,50); plots("#svgOL4",OL_plot4,height2,margin2,width2,42000,58000,-100,50);	plots("#svgOL5",OL_plot5,height3,margin3,width3,58000,74000,-100,50);
	//Blue Line
	plots("#svgBL1",BL_plot1,height2,margin2,width2,5000,21000,-100,50); plots("#svgBL2",BL_plot2,height2,margin2,width2,21000,37000,-100,50); plots("#svgBL3",BL_plot3,height3,margin3,width3,37000,53000,-100,50);
	//Green Line
	plots("#svgGL1",GL_plot1,height2,margin2,width2,0,16000,-100,50); plots("#svgGL2",GL_plot2,height3,margin3,width3,16000,32000,-100,50); plots("#svgGL_B1",GL_B_plot1,height2,margin2,width2,0,16000,-50,100); plots("#svgGL_B2",GL_B_plot2,height3,margin3,width3,12000,28000,50,200); plots("#svgGL_C1",GL_C_plot1,height3,margin3,width3,0,16000,-25,125); plots("#svgGL_D1",GL_D_plot1,height2,margin2,width2,0,16000,-25,125); plots("#svgGL_D2",GL_D_plot2,height2,margin2,width2,16000,32000,50,200); plots("#svgGL_D3",GL_D_plot3,height2,margin2,width2,32000,48000,50,200); plots("#svgGL_D4",GL_D_plot4,height3,margin3,width3,48000,64000,50,200); plots("#svgGL_E1",GL_E_plot1,height3,margin3,width3,0,16000,-50,100);
	//Silver Line
	plots("#svgSL1",SL_plot1,height3,margin3,width3,0,16000,-100,50);
	//Summary flood lengths
	//plots("#svgSumma",flood_lens_plot,height3,margin3,width3,x_min4,x_max4,y_min4,y_max4,"Distance along ROW [ft]");
	
	plots("#svg_systemwide_cost",systemwide_costs_plot,height_cost1,margin_cost1,width_cost1,x_min_cost1,x_max_cost1,y_min_cost1,y_max_cost1,"Flood Damage Cost [$M]","");

    //Add flood depth data
    import_results(rpt_numbr);
    
    //Add longitudinal sections
    setTimeout(function(){
	
	//Add connecting stations shading
	add_area("#svgRL3",RL_plot3,sta_bounds.RL.park,_sta_,"none",1,height2,margin2,width2,30500,46500,-100,50); add_area("#svgRL3",RL_plot3,sta_bounds.RL.dtx,_sta_,"none",1,height2,margin2,width2,30500,46500,-100,50); add_area("#svgRL3",RL_plot3,sta_bounds.RL.south,_sta_,"none",1,height2,margin2,width2,30500,46500,-100,50); add_area("#svgOL2",OL_plot2,sta_bounds.OL.dtx,_sta_,"none",1,height2,margin2,width2,16000,32000,-100,50); add_area("#svgOL2",OL_plot2,sta_bounds.OL.state,_sta_,"none",1,height2,margin2,width2,16000,32000,-100,50); add_area("#svgOL3",OL_plot3,sta_bounds.OL.dtx,_sta_,"none",1,height2,margin2,width2,26000,42000,-100,50); add_area("#svgOL3",OL_plot3,sta_bounds.OL.state,_sta_,"none",1,height2,margin2,width2,26000,42000,-100,50); add_area("#svgOL3",OL_plot3,sta_bounds.OL.haymkt,_sta_,"none",1,height2,margin2,width2,26000,42000,-100,50); add_area("#svgOL3",OL_plot3,sta_bounds.OL.north,_sta_,"none",1,height2,margin2,width2,26000,42000,-100,50); add_area("#svgBL1",BL_plot1,sta_bounds.BL.govt,_sta_,"none",1,height2,margin2,width2,5000,21000,-100,50); add_area("#svgBL1",BL_plot1,sta_bounds.BL.state,_sta_,"none",1,height2,margin2,width2,5000,21000,-100,50); add_area("#svgGL1",GL_plot1,sta_bounds.GL.north,_sta_,"none",1,height2,margin2,width2,0,16000,-100,50); add_area("#svgGL1",GL_plot1,sta_bounds.GL.govt,_sta_,"none",1,height2,margin2,width2,0,16000,-100,50);add_area("#svgGL1",GL_plot1,sta_bounds.GL.park,_sta_,"none",1,height2,margin2,width2,0,16000,-100,50); add_area("#svgGL1",GL_plot1,sta_bounds.GL.haymkt,_sta_,"none",1,height2,margin2,width2,0,16000,-100,50);add_area("#svgSL1",SL_plot1,sta_bounds.SL.south,_sta_,"none",1,height2,margin2,width2,0,16000,-100,50);
	
    //Red Line tunnel data
	add_tunnel_data("#svgRL1",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgRL1",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgRL2",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgRL2",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgRL3",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,30500,46500,-100,50); add_tunnel_data("#svgRL3",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,30500,46500,-100,50); add_tunnel_data("#svgRL4",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100); add_tunnel_data("#svgRL4",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100); add_tunnel_data("#svgRL5",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,62000,78000,-50,100); add_tunnel_data("#svgRL5",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,62000,78000,-50,100); add_tunnel_data("#svgRL6",RL_plot1,_red_,"RL_invert_x","RL_invert",height2,margin2,width2,3,tunnel_data,78000,94000,-50,100); add_tunnel_data("#svgRL6",RL_plot1,_red_,"RL_crown_x","RL_crown",height2,margin2,width2,3,tunnel_data,78000,94000,-50,100); add_tunnel_data("#svgRL7",RL_plot1,_red_,"RL_invert_x","RL_invert",height3,margin3,width3,3,tunnel_data,94000,110000,-50,100); add_tunnel_data("#svgRL7",RL_plot1,_red_,"RL_crown_x","RL_crown",height3,margin3,width3,3,tunnel_data,94000,110000,-50,100); add_tunnel_data("#svgRLd1",RLd_plot1,_red_,"RLd_invert_x","RLd_invert",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100); add_tunnel_data("#svgRLd1",RLd_plot1,_red_,"RLd_crown_x","RLd_crown",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100); add_tunnel_data("#svgRLd2",RLd_plot2,_red_,"RLd_invert_x","RLd_invert",height3,margin3,width3,3,tunnel_data,62000,78000,-50,100); add_tunnel_data("#svgRLd2",RLd_plot2,_red_,"RLd_crown_x","RLd_crown",height3,margin3,width3,3,tunnel_data,62000,78000,-50,100);

    //Orange Line tunnel data
	add_tunnel_data("#svgOL1",OL_plot1,_orange_,"OL_invert_x","OL_invert",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgOL1",OL_plot1,_orange_,"OL_crown_x","OL_crown",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgOL2",OL_plot2,_orange_,"OL_invert_x","OL_invert",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgOL2",OL_plot2,_orange_,"OL_crown_x","OL_crown",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgOL3",OL_plot3,_orange_,"OL_invert_x","OL_invert",height2,margin2,width2,3,tunnel_data,26000,42000,-100,50); add_tunnel_data("#svgOL3",OL_plot3,_orange_,"OL_crown_x","OL_crown",height2,margin2,width2,3,tunnel_data,26000,42000,-100,50); add_tunnel_data("#svgOL4",OL_plot4,_orange_,"OL_invert_x","OL_invert",height2,margin2,width2,3,tunnel_data,42000,58000,-100,50); add_tunnel_data("#svgOL4",OL_plot4,_orange_,"OL_crown_x","OL_crown",height2,margin2,width2,3,tunnel_data,42000,58000,-100,50); add_tunnel_data("#svgOL5",OL_plot5,_orange_,"OL_invert_x","OL_invert",height3,margin3,width3,3,tunnel_data,58000,74000,-100,50); add_tunnel_data("#svgOL5",OL_plot5,_orange_,"OL_crown_x","OL_crown",height3,margin3,width3,3,tunnel_data,58000,74000,-100,50);
    ////Blue Line tunnel data
	add_tunnel_data("#svgBL1",BL_plot1,_blue_,"BL_invert_x","BL_invert",height2,margin2,width2,3,tunnel_data,5000,21000,-100,50); add_tunnel_data("#svgBL1",BL_plot1,_blue_,"BL_crown_x","BL_crown",height2,margin2,width2,3,tunnel_data,5000,21000,-100,50); add_tunnel_data("#svgBL2",BL_plot2,_blue_,"BL_invert_x","BL_invert",height2,margin2,width2,3,tunnel_data,21000,37000,-100,50); add_tunnel_data("#svgBL2",BL_plot2,_blue_,"BL_crown_x","BL_crown",height2,margin2,width2,3,tunnel_data,21000,37000,-100,50); add_tunnel_data("#svgBL3",BL_plot3,_blue_,"BL_invert_x","BL_invert",height3,margin3,width3,3,tunnel_data,37000,53000,-100,50); add_tunnel_data("#svgBL3",BL_plot3,_blue_,"BL_crown_x","BL_crown",height3,margin3,width3,3,tunnel_data,37000,53000,-100,50);
	////Green Line tunnel data
	add_tunnel_data("#svgGL1",GL_plot1,_green_,"GL_A_invert_x","GL_A_invert",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgGL1",GL_plot1,_green_,"GL_A_crown_x","GL_A_crown",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgGL2",GL_plot2,_green_,"GL_A_invert_x","GL_A_invert",height3,margin3,width3,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgGL2",GL_plot2,_green_,"GL_A_crown_x","GL_A_crown",height3,margin3,width3,3,tunnel_data,16000,32000,-100,50);
	//B
	add_tunnel_data("#svgGL_B1",GL_B_plot1,_green_,"GL_B_invert_x","GL_B_invert",height2,margin2,width2,3,tunnel_data,0,16000,-50,100); add_tunnel_data("#svgGL_B1",GL_B_plot1,_green_,"GL_B_crown_x","GL_B_crown",height2,margin2,width2,3,tunnel_data,0,16000,-50,100); add_tunnel_data("#svgGL_B2",GL_B_plot2,_green_,"GL_B_invert_x","GL_B_invert",height3,margin3,width3,3,tunnel_data,12000,28000,50,200); add_tunnel_data("#svgGL_B2",GL_B_plot2,_green_,"GL_B_crown_x","GL_B_crown",height3,margin3,width3,3,tunnel_data,12000,28000,50,200);
	//C
	add_tunnel_data("#svgGL_C1",GL_C_plot1,_green_,"GL_C_invert_x","GL_C_invert",height3,margin3,width3,3,tunnel_data,0,16000,-25,125); add_tunnel_data("#svgGL_C1",GL_C_plot1,_green_,"GL_C_crown_x","GL_C_crown",height3,margin3,width3,3,tunnel_data,0,16000,-25,125);
	//D
	add_tunnel_data("#svgGL_D1",GL_D_plot1,_green_,"GL_D_invert_x","GL_D_invert",height2,margin2,width2,3,tunnel_data,0,16000,-25,125); add_tunnel_data("#svgGL_D1",GL_D_plot1,_green_,"GL_D_crown_x","GL_D_crown",height2,margin2,width2,3,tunnel_data,0,16000,-25,125); add_tunnel_data("#svgGL_D2",GL_D_plot2,_green_,"GL_D_invert_x","GL_D_invert",height2,margin2,width2,3,tunnel_data,16000,32000,50,200); add_tunnel_data("#svgGL_D2",GL_D_plot2,_green_,"GL_D_crown_x","GL_D_crown",height2,margin2,width2,3,tunnel_data,16000,32000,50,200); add_tunnel_data("#svgGL_D3",GL_D_plot3,_green_,"GL_D_invert_x","GL_D_invert",height2,margin2,width2,3,tunnel_data,32000,48000,50,200); add_tunnel_data("#svgGL_D3",GL_D_plot3,_green_,"GL_D_crown_x","GL_D_crown",height2,margin2,width2,3,tunnel_data,32000,48000,50,200); add_tunnel_data("#svgGL_D4",GL_D_plot4,_green_,"GL_D_invert_x","GL_D_invert",height3,margin3,width3,3,tunnel_data,48000,64000,50,200); add_tunnel_data("#svgGL_D4",GL_D_plot4,_green_,"GL_D_crown_x","GL_D_crown",height3,margin3,width3,3,tunnel_data,48000,64000,50,200);
	//E
	add_tunnel_data("#svgGL_E1",GL_E_plot1,_green_,"GL_E_invert_x","GL_E_invert",height3,margin3,width3,3,tunnel_data,0,16000,-50,100); add_tunnel_data("#svgGL_E1",GL_E_plot1,_green_,"GL_E_crown_x","GL_E_crown",height3,margin3,width3,3,tunnel_data,0,16000,-50,100);
	//Silver Line tunnel data
	add_tunnel_data("#svgSL1",SL_plot1,_silver_,"SL_invert_x","SL_invert",height3,margin3,width3,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgSL1",SL_plot1,_silver_,"SL_crown_x","SL_crown",height3,margin3,width3,3,tunnel_data,0,16000,-100,50);
	
    //Add Cross-sections, branch locations
    //Red Line
	add_tunnel_data("#svgRL3",RL_plot3,_green_,"RL_GL_sect_x","RL_GL_sect_y",height2,margin2,width2,3,tunnel_data,30500,46500,-100,50); add_tunnel_data("#svgRL3",RL_plot3,_orange_,"RL_OL_sect_x","RL_OL_sect_y",height2,margin2,width2,3,tunnel_data,30500,46500,-100,50); add_tunnel_data("#svgRL3",RL_plot3,_silver_,"RL_SL_sect_x","RL_SL_sect_y",height2,margin2,width2,3,tunnel_data,30500,46500,-100,50); add_tunnel_data("#svgRL4",RL_plot4,"rgba(117, 117, 117,1)","RLd_sect","Branch_y1",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100); add_tunnel_data("#svgRLd1",RLd_plot1,"rgba(117, 117, 117,1)","RLd_sect","Branch_y1",height2,margin2,width2,3,tunnel_data,46000,62000,-50,100);
    //Orange Line
	add_tunnel_data("#svgOL2",OL_plot2,_red_,"OL_RL_sect_x","OL_RL_sect_y",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgOL2",OL_plot2,_blue_,"OL_BL_sect_x","OL_BL_sect_y",height2,margin2,width2,3,tunnel_data,16000,32000,-100,50); add_tunnel_data("#svgOL3",OL_plot3,_red_,"OL_RL_sect_x","OL_RL_sect_y",height2,margin2,width2,3,tunnel_data,26000,42000,-100,50); add_tunnel_data("#svgOL3",OL_plot3,_green_,"OL_GL_sect_x","OL_GL_sect_y",height2,margin2,width2,3,tunnel_data,26000,42000,-100,50); add_tunnel_data("#svgOL3",OL_plot3,_blue_,"OL_BL_sect_x","OL_BL_sect_y",height2,margin2,width2,3,tunnel_data,26000,42000,-100,50);
    //Blue Line
    add_tunnel_data("#svgBL1",BL_plot1,_green_,"BL_GL_sect_x","BL_GL_sect_y",height2,margin2,width2,3,tunnel_data,5000,21000,-100,50); add_tunnel_data("#svgBL1",BL_plot1,_orange_,"BL_OL_sect_x","BL_OL_sect_y",height2,margin2,width2,3,tunnel_data,5000,21000,-100,50);
    //Green Line
    add_tunnel_data("#svgGL1",GL_plot1,_orange_,"GL_OL_sect_x","GL_OL_sect_y",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgGL1",GL_plot1,_blue_,"GL_BL_sect_x","GL_BL_sect_y",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgGL1",GL_plot1,_red_,"GL_RL_sect_x","GL_RL_sect_y",height2,margin2,width2,3,tunnel_data,0,16000,-100,50); add_tunnel_data("#svgGL1",GL_plot1,"rgba(117, 117, 117,1)","GL_E_branch","Branch_y",height2,margin2,width2,3,tunnel_data,0,16000,-100,50);
    
    //Green Line branches, Silver Line
	add_tunnel_data("#svgGL_B1",GL_B_plot1,"rgba(117, 117, 117,1)","GL_CD_branch","Branch_y1",height2,margin2,width2,3,tunnel_data,0,16000,-50,100); add_tunnel_data("#svgGL_C1",GL_C_plot1,"rgba(117, 117, 117,1)","GL_B_branch","Branch_y2",height2,margin2,width2,3,tunnel_data,0,16000,-25,125); add_tunnel_data("#svgGL_C1",GL_C_plot1,"rgba(117, 117, 117,1)","GL_D_branch","Branch_y2",height2,margin2,width2,3,tunnel_data,0,16000,-25,125); add_tunnel_data("#svgSL1",SL_plot1,_red_,"SL_RL_sect_x","SL_RL_sect_y",height3,margin3,width3,3);
    
    //Add text labels
    //Red Line
    add_text("#svgRL3",RL_plot3,"5",233,105,height2,margin2,width2);  add_text("#svgRL3",RL_plot3,"6",322,105,height2,margin2,width2);add_text("#svgRL3",RL_plot3,"7",448,105,height2,margin2,width2); add_text("#svgRL4",RL_plot4,"Columbia Jct.",46,60,height2,margin2,width2); add_text("#svgRLd1",RLd_plot1,"Columbia Jct.",46,60,height2,margin2,width2); add_text("#svgRLd1",RLd_plot1,"Red Line Ashmont Branch (Columbia Junction to Ashmont)",5,20,height2,margin2,width2);
		//Station Labels
		//Plot 1
		add_text("#svgRL1",RL_plot1,"Alewife",135,33,height2,margin2,width2); add_text("#svgRL1",RL_plot1,"Davis",585,24,height2,margin2,width2); add_text("#svgRL1",RL_plot1,"Porter",875,65,height2,margin2,width2); add_text("#svgRL1",RL_plot1,"Harvard",1295,18,height2,margin2,width2);
		//Plot 2
		add_text("#svgRL2",RL_plot2,"Central",430,24,height2,margin2,width2); add_text("#svgRL2",RL_plot2,"Kendall/MIT",840,27,height2,margin2,width2); add_text("#svgRL2",RL_plot2,"Charles/MGH",1150,41,height2,margin2,width2);
		//Plot 3
		add_text("#svgRL3",RL_plot3,"Park St",207,126,height2,margin2,width2); add_text("#svgRL3",RL_plot3,"DTX",309,126,height2,margin2,width2); add_text("#svgRL3",RL_plot3,"South Sta.",415,126,height2,margin2,width2); add_text("#svgRL3",RL_plot3,"Broadway",785,28,height2,margin2,width2); add_text("#svgRL3",RL_plot3,"Andrew",1185,35,height2,margin2,width2);
		//Plot 4
		add_text("#svgRL4",RL_plot4,"JFK/UMass",175,105,height2,margin2,width2);
		//Plot 5
		add_text("#svgRL5",RL_plot5,"North Quincy",405,105,height2,margin2,width2); add_text("#svgRL5",RL_plot5,"Wollaston",755,90,height2,margin2,width2);
		//Plot 6
		add_text("#svgRL6",RL_plot6,"Quincy Center",5,95,height2,margin2,width2); add_text("#svgRL6",RL_plot6,"Quincy Adams",575,65,height2,margin2,width2);
		//Plot 7
		add_text("#svgRL7",RL_plot1,"Braintree",5,30,height2,margin2,width2);
		//Plot RLd1
		add_text("#svgRLd1",RLd_plot1,"JFK/UMass",155,100,height2,margin2,width2); add_text("#svgRLd1",RLd_plot1,"Savin Hill",410,95,height2,margin2,width2); add_text("#svgRLd1",RLd_plot1,"Fields Corner",930,85,height2,margin2,width2); add_text("#svgRLd1",RLd_plot1,"Shawmut",1210,75,height2,margin2,width2);
		//Plot RLd2
		add_text("#svgRLd2",RLd_plot2,"Ashmont",135,75,height2,margin2,width2);
    //Orange Line
    add_text("#svgOL2",OL_plot2,"6",1224,105,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"4",1325,105,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"6",368,105,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"4",468,105,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"2",594,105,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"1",714,105,height2,margin2,width2);
		//Station Labels
		//Plot 1
		add_text("#svgOL1",OL_plot1,"Forest Hills",305,40,height2,margin2,width2); add_text("#svgOL1",OL_plot1,"Green Street",605,50,height2,margin2,width2); add_text("#svgOL1",OL_plot1,"Stony Brook",855,50,height2,margin2,width2); add_text("#svgOL1",OL_plot1,"Jackson Square",1055,50,height2,margin2,width2); add_text("#svgOL1",OL_plot1,"Roxbury",1290,55,height2,margin2,width2); add_text("#svgOL1",OL_plot1,"Crossing",1285,75,height2,margin2,width2);
		//Plot 2
		add_text("#svgOL2",OL_plot2,"Ruggles",190,65,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"Mass Ave",380,65,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"Back Bay",710,65,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"Tufts",975,85,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"Chinatown",1040,80,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"DTX",1210,127,height2,margin2,width2); add_text("#svgOL2",OL_plot2,"State St",1295,127,height2,margin2,width2);
		//Plot 3
		add_text("#svgOL3",OL_plot3,"Tufts",115,85,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"Chinatown",180,80,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"DTX",352,127,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"State St",440,127,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"Haymarket",555,127,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"North Station",670,127,height2,margin2,width2); add_text("#svgOL3",OL_plot3,"Community College",1010,55,height2,margin2,width2);
		//Plot 4
		add_text("#svgOL4",OL_plot4,"Sullivan Square",40,60,height2,margin2,width2); add_text("#svgOL4",OL_plot4,"Assembly",300,60,height2,margin2,width2); add_text("#svgOL4",OL_plot4,"Wellington",600,60,height2,margin2,width2);
		//Plot 5
		add_text("#svgOL5",OL_plot5,"Malden Center",25,35,height2,margin2,width2); add_text("#svgOL5",OL_plot5,"Oak Grove",360,30,height2,margin2,width2);
    //Blue Line
    add_text("#svgBL1",BL_plot1,"3",137,105,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"4",213,105,height2,margin2,width2);
		//Station Labels
		//Plot 1
		add_text("#svgBL1",BL_plot1,"Bowdoin",15,55,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Gov't Ctr.",100,127,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"State St",195,127,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Aquarium",340,55,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Maverick",750,80,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Airport",1020,60,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Wood",1315,60,height2,margin2,width2); add_text("#svgBL1",BL_plot1,"Island",1313,80,height2,margin2,width2);
		//Plot 2
		add_text("#svgBL2",BL_plot2,"Orient Heights",340,60,height2,margin2,width2); add_text("#svgBL2",BL_plot2,"Suffolk Downs",580,60,height2,margin2,width2); add_text("#svgBL2",BL_plot2,"Beachmont",830,60,height2,margin2,width2); add_text("#svgBL2",BL_plot2,"Revere Beach",1135,60,height2,margin2,width2);
		//Plot 3
		add_text("#svgBL3",BL_plot3,"Wonderland",10,60,height2,margin2,width2);
    //Green Line
    add_text("#svgGL1",GL_plot1,"1",1170,105,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"2",1061,105,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"4",969,105,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"5",823,105,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"B (to Kenmore)",5,20,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"E",368.5,15,height2,margin2,width2);
		//Station Labels
		//Plot 1
		add_text("#svgGL1",GL_plot1,"Hynes",135,65,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Copley",380,75,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Arlington",515,80,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Boylston",720,55,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Park St.",795,127,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Gov't Ctr.",920,127,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"Haymarket",1020,127,height2,margin2,width2); add_text("#svgGL1",GL_plot1,"North Station",1130,127,height2,margin2,width2);
		//Plot 2
		add_text("#svgGL2",GL_plot2,"Science Park",5,30,height2,margin2,width2); add_text("#svgGL2",GL_plot2,"Lechmere",200,45,height2,margin2,width2);
    //Green Lne Branches, Silver Line
    add_text("#svgGL_B1",GL_B_plot1,"C/D",15,60,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"B",34,40,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"D",166,40,height2,margin2,width2); add_text("#svgSL1",SL_plot1,"7",15,105,height2,margin2,width2);
		//Station Labels
		//Silver Line Plot 1
		add_text("#svgSL1",SL_plot1,"South Sta.",5,127,height2,margin2,width2); add_text("#svgSL1",SL_plot1,"Courthouse",145,100,height2,margin2,width2); add_text("#svgSL1",SL_plot1,"WTC",370,65,height2,margin2,width2);
		//GL_B Plot 1
		//add_text("#svgGL_B1",GL_B_plot1,"Kenmore",18,127,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Blandford",90,62,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"BU East",200,62,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"BU Central",270,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"BU West",400,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"St. Paul St.",470,89,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Pleasant St.",530,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Babcock St.",600,80,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Packards Corner",680,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Harvard Ave.",800,80,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Griggs St.",920,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Allston St.",1000,80,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Warren St.",1080,60,height2,margin2,width2);
		add_text("#svgGL_B1",GL_B_plot1,"Kenmore",18,127,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Blandford",90,62,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"BU Central",270,65,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Packards Corner",680,40,height2,margin2,width2); add_text("#svgGL_B1",GL_B_plot1,"Griggs St.",920,40,height2,margin2,width2);
		//GL_B Plot 2
		//add_text("#svgGL_B2",GL_B_plot2,"Allston St.",10,20,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Warren St.",80,40,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Washington St.",200,60,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Sutherland",320,20,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Chiswick",440,80,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Chestnut Hill",520,40,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"South St.",640,80,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Boston College",840,80,height2,margin2,width2);
		add_text("#svgGL_B2",GL_B_plot2,"Washington St.",200,60,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Chestnut Hill",520,40,height2,margin2,width2); add_text("#svgGL_B2",GL_B_plot2,"Boston College",840,80,height2,margin2,width2);
		//GL_C Plot 1
		//add_text("#svgGL_C1",GL_C_plot1,"Kenmore",45,90,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"St. Mary's St.",250,85,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Hawes St.",400,85,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Kent St.",475,62,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"St. Paul St.",510,127,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Coolidge Corner",600,105,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Summit Ave.",717,127,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Brandon Hall",810,105,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Fairbanks",870,127,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Washington Sq.",930,85,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Tappan St.",1030,105,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Dean Rd.",1110,85,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Englewood Ave.",1190,62,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Cleveland",1280,85,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Circle",1315,105,height2,margin2,width2);
		add_text("#svgGL_C1",GL_C_plot1,"Kenmore",45,90,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"St. Mary's St.",250,85,height2,margin2,width2);add_text("#svgGL_C1",GL_C_plot1,"Coolidge Corner",600,100,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Washington Sq.",930,60,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Cleveland",1280,50,height2,margin2,width2); add_text("#svgGL_C1",GL_C_plot1,"Circle",1315,70,height2,margin2,width2);
		//GL_D Plot 1
		add_text("#svgGL_D1",GL_D_plot1,"Fenway",90,127,height2,margin2,width2); add_text("#svgGL_D1",GL_D_plot1,"Longwood",240,127,height2,margin2,width2); add_text("#svgGL_D1",GL_D_plot1,"Brookline Village",540,127,height2,margin2,width2); add_text("#svgGL_D1",GL_D_plot1,"Brookline Hills",780,100,height2,margin2,width2); add_text("#svgGL_D1",GL_D_plot1,"Beaconsfield",1100,60,height2,margin2,width2);
		//GL_D Plot 2
		add_text("#svgGL_D2",GL_D_plot2,"Reservoir",5,108,height2,margin2,width2); add_text("#svgGL_D2",GL_D_plot2,"Chestnut Hill",410,62,height2,margin2,width2); add_text("#svgGL_D2",GL_D_plot2,"Newton Center",1100,70,height2,margin2,width2); 
		//GL_D Plot 3
		add_text("#svgGL_D3",GL_D_plot3,"Newton Highlands",70,80,height2,margin2,width2); add_text("#svgGL_D3",GL_D_plot3,"Eliot",450,70,height2,margin2,width2); add_text("#svgGL_D3",GL_D_plot3,"Waban",820,80,height2,margin2,width2); add_text("#svgGL_D3",GL_D_plot3,"Woodland",1200,80,height2,margin2,width2);
		//GL_D Plot 4
		add_text("#svgGL_D4",GL_D_plot4,"Riverside",140,115,height2,margin2,width2);
		//GL_E Plot 1
		add_text("#svgGL_E1",GL_E_plot1,"Prudential",100,80,height2,margin2,width2); add_text("#svgGL_E1",GL_E_plot1,"Symphony",220,72,height2,margin2,width2); add_text("#svgGL_E1",GL_E_plot1,"Northeastern",350,68,height2,margin2,width2); add_text("#svgGL_E1",GL_E_plot1,"MFA",520,68,height2,margin2,width2); add_text("#svgGL_E1",GL_E_plot1,"Bringham Circle",720,38,height2,margin2,width2);add_text("#svgGL_E1",GL_E_plot1,"Heath St",1145,40,height2,margin2,width2);
	
	
	/////////////////////////
	//Cost estimate summary
	
	//Initialize the cost estiamte report number tracking variable
	var cost_est_rpt_numbr = rpt_numbr - 1;
	//If the report number denotes the Fenway flood
	if (rpt_numbr == 19961 || rpt_numbr == 1996) {
		//Convert rpt_numbr to match data
		cost_est_rpt_numbr = 20;
	}
	
	//Cost breakdown by transit line plots
    beta_data_gen(cost_est_rpt_numbr,["MC_total_costs"],"#svg_systemwide_cost",systemwide_costs_plot,"Systemwide [$M]","Normalized PDF");
	beta_data_gen(cost_est_rpt_numbr,["RL_all","OL_all","BL_all","GL_all","SL_all","connecting_all"],"#svg_transit_line_cost",transit_line_costs_plot,"By Transit Line [$M]","Normalized PDF");
	beta_data_gen(cost_est_rpt_numbr,["RL_sta","RL_linear"],"#svg_RL_cost",RL_costs_plot,"Red Line [$M]","",height_cost2,margin_cost2,width_cost2,3,3);
	beta_data_gen(cost_est_rpt_numbr,["OL_sta","OL_linear"],"#svg_OL_cost",OL_costs_plot,"Orange Line [$M]","",height_cost2,margin_cost2,width_cost2,3,3);
	beta_data_gen(cost_est_rpt_numbr,["BL_sta","BL_linear"],"#svg_BL_cost",BL_costs_plot,"Blue Line [$M]","",height_cost2,margin_cost2,width_cost2,3,3);
	beta_data_gen(cost_est_rpt_numbr,["GL_sta","GL_linear"],"#svg_GL_cost",GL_costs_plot,"Green Line [$M]","",height_cost2,margin_cost2,width_cost2,3,3);
	beta_data_gen(cost_est_rpt_numbr,["SL_sta","SL_linear"],"#svg_SL_cost",SL_costs_plot,"Silver Line [$M]","",height_cost2,margin_cost2,width_cost2,3,3);
	
	//Cost breakdown by asset type
	//beta_data_gen(cost_est_rpt_numbr,["MC_total_costs"],"#svg_systemwide_cost2",systemwide_costs_plot2,"Systemwide [$M]");
	//beta_data_gen(cost_est_rpt_numbr,["linear_all", "facilities_all"],"#svg_asset_class",asset_class_costs_plot,"Asset Class [$M]");
	////Get the linear asset x scale max value
	//var lin_asset_max_min = get_max_and_min(cost_est_rpt_numbr,["tunnel_struct_all", "signal_all", "rail_all", "_3rd_rail_all", "catenary_all", "power_all", "lighting_all"]);
	//beta_data_gen(cost_est_rpt_numbr,["tunnel_struct_all"],"#svg_struct_cost",struct_cost_plot,"Tunnel Structure [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["signal_all"],"#svg_signals_cost",signals_cost_plot,"Signals [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["rail_all"],"#svg_rail_cost",struct_cost_plot,"Rail [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["_3rd_rail_all"],"#svg_3rd_rail_cost",_3rd_rail_cost_plot,"3rd Rail [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["catenary_all"],"#svg_catenary_cost",catenary_cost_plot,"Catenary [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["power_all"],"#svg_power_cost",power_cost_plot,"Power [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//beta_data_gen(cost_est_rpt_numbr,["lighting_all"],"#svg_lighting_cost",power_cost_plot,"Lighting [$M]",height_cost2,margin_cost2,width_cost2,3,3);
	//Get the facility x scale max value
	//var facility_max_min = get_max_and_min(cost_est_rpt_numbr,["connecting_all", "underground_all", "at_grade_all", "yard_all"]);
	//beta_data_gen(cost_est_rpt_numbr,["connecting_all"],"#svg_connect_sta_cost",connect_sta_cost_plot,"Connecting Station [$M]",height_cost2,margin_cost2,width_cost2,3,3,facility_max_min);
	//beta_data_gen(cost_est_rpt_numbr,["underground_all"],"#svg_und_sta_cost",und_sta_cost_plot,"Underground Station [$M]",height_cost2,margin_cost2,width_cost2,3,3,facility_max_min);
	//beta_data_gen(cost_est_rpt_numbr,["at_grade_all"],"#svg_ag_sta_cost",ag_sta_cost_plot,"At-grade Station [$M]",height_cost2,margin_cost2,width_cost2,3,3,facility_max_min);
	//beta_data_gen(cost_est_rpt_numbr,["yard_all"],"#svg_yard_cost",yard_cost_plot,"Maintenance Yards [$M]",height_cost2,margin_cost2,width_cost2,3,3,facility_max_min);
	
	//Obtain estimate of total flood volume
	window.length_total = 0;
	window.len_depth = 0;
	//For each flood depth listed in system (at 10 ft increments)
	//all_rail_flood_depths.forEach(function(depth) {
	//	//Multiply each entry by 10 ft length
	//	len_depth += (depth*10);
	//});
	//length_total = all_rail_flood_depths.length*10;
	//
	//len_depth_data.push(len_depth);
	//
	//console.log(length_total);
	//console.log(len_depth);
	
    },2500);
    
}

//Gather the data for export to ArcGIS
window.GIS_export = function() {
	//Initialize output variable
	window.GIS_export = [];
	window.GIS_summary = [];
	//For each scenario in exposure_out1
	for (var scen = 0; scen < 21; scen++) {
		//Initialize variables
		var POI_list = [];
		var indx_low = 0;
		var indx = 0;
		var depth_sum = 0;
		var poi_index = 0;
		var poi_prev = '';
		var countr = 0;
		var summary_length = 0;
		var summary_depth = 0;
		window.result_array = [];
		//Station baselines
		window.sta_baseline = {BL: 5718, OL: 2800, RL: 94, RLd: 46468, GL: 0, GL_B: 0, GL_C: 0, GL_D: 0, GL_E: 0, SL: 0 };
		//For each line
		key_list.forEach(function(key){
			//Reset variables
			POI_list = [];
			indx_low = 0;
			indx = 0;
			poi_index = 0;
			poi_prev = '';
			countr = 0;
			//Make sure the RLd gets investigated
			if (key == 'RLd') {
				key = 'RL';
			}
			//For each point of interest
			sys_poi[key].forEach(function(poi){
				poi_index += 1;
				depth_sum = 0;
				countr = 0;
				//If the POI is not a switch and not listed in POI_list
				if (poi.POI.includes("switch") == false && POI_list.includes(poi.POI) == false) {
					//Add the POI to the POI list
					POI_list.push(poi.POI);
				//Esle, if the POI is not a switch and already listed in POI_list
				} else if (poi.POI.includes("switch") == false && POI_list.includes(poi.POI) == true) {
					//Set the index equal to the x value divided by 10
					indx = Math.round((poi.x - sta_baseline[key])/10);
					console.log(indx_low);
					console.log(indx);
					//Between the lower index and the current index
					for (i = indx_low; i < indx; i++) {
						//If the number is not NaN
						if (isNaN(exposure_out1[scen][key][i]) == false) {
							//Sum up the depths for the exposure scenario of interest
							depth_sum += exposure_out1[scen][key][i];
							//Get the depth and length if nonzero
							if (exposure_out1[scen][key][i] > 0) {
								summary_length += 10;
								summary_depth += exposure_out1[scen][key][i];
							}
							countr += 1;
						}
					}
					console.log(sys_poi[key]);
					console.log(indx_low);
					console.log(sys_poi[key][poi_index-1]);
					console.log(sys_poi[key][poi_index-1].POI);
					//If the current POI is not the start of a line
					if (POI_list.length > 1) {
						console.log(POI_list[POI_list.length-2]);
						//Create the temporary storage variable
						var json_variable = {STA1: POI_list[POI_list.length-2], STA2: poi.POI};
						//Get the average flood depth, ensuring it's labeled based on the scenario
						json_variable[scen]=depth_sum/(indx-indx_low);
						//push to result array
						result_array.push(json_variable);
						//Set the low index to the current index
						indx_low = indx;
					}
				}
			});
		});
	//Push the results to final result array
	GIS_export.push(result_array);
	//If the flood length is greater than 0
	if (summary_length > 0) {
		//Get the average flood depth
		summary_depth = summary_depth/(0.1*summary_length);	
	}
	//Push the results to the summary array	
	GIS_summary.push({event:scen, depth:summary_depth, length:summary_length});
	}
	window.GIS_final = [];
	GIS_final = merge_object_arrays (GIS_export[0], merge_object_arrays (GIS_export[1], merge_object_arrays (GIS_export[2], merge_object_arrays (GIS_export[3], merge_object_arrays (GIS_export[4], merge_object_arrays (GIS_export[5], merge_object_arrays (GIS_export[6], merge_object_arrays (GIS_export[7], merge_object_arrays (GIS_export[8], merge_object_arrays (GIS_export[9], merge_object_arrays (GIS_export[10], merge_object_arrays (GIS_export[11], merge_object_arrays (GIS_export[12], merge_object_arrays (GIS_export[13], merge_object_arrays (GIS_export[14], merge_object_arrays (GIS_export[15], merge_object_arrays (GIS_export[16], merge_object_arrays (GIS_export[17], merge_object_arrays (GIS_export[18], merge_object_arrays (GIS_export[19], GIS_export[20], 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1'), 'STA1');
};

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


//Beta probability distribution data generator
window.beta_data_gen = function(event=20,assets=["MC_total_costs"],svg_container,plot_name,x_label="Flood Damage Cost [$M]", y_label = "", plot_height = height_cost1, plot_margin = margin_cost1, plot_width = width_cost1, x_tics = 10, y_tics = 3, max_min = []) {
	console.log(event);
    //Initialize variables
    var asset_params = {}; var pdf_data_unscaled = []; var pdf_data = [];
    var incr = 1; var pdf_y = 0; var pdf_max = 0.000001;
    var beta_mean = 0; var beta_var = 1; var alpha = 0; var beta = 0;
	var max_min_arr = [];
	var plot_min_x = 0; var plot_max_x = 0;
	var asset_id = ""; var stroke = "rgba(133, 133, 133,1)"; var fill = "rgba(133, 133, 133, 0.25)";
		
	//Plot colors
	var stroke_colors = {RL: "rgba(219, 0, 0,1)", OL: "rgba(255, 145, 0,1)", BL: "rgba(0, 30, 2550,1)", GL: "rgba(0, 166, 3,1)", SL: "rgba(133, 133, 133,1)", co: "rgba(164, 179, 0, 1)"};
	var fill_colors = {RL: "rgba(219, 0, 0,0.25)", OL: "rgba(255, 145, 0,0.25)", BL: "rgba(0, 30, 2550,0.25)", GL: "rgba(0, 166, 3,0.25)", SL: "rgba(133, 133, 133,0.25)", co: "rgba(234, 255, 0, 0.25)"};
	
	//If the max and min are not specified,
	if (max_min.length == 0) {
		console.log('here');
		//Get max and min
		max_min_arr = get_max_and_min(event,assets);
	} else {
		max_min_arr = max_min;
	}
	//Set the plot_min_x and plot_max_x values to those specified in max_min_arr
	plot_min_x = max_min_arr[0]; plot_max_x = max_min_arr[1];
	
	//For each asset of interest
	for (let aoi = 0; aoi < assets.length; aoi++) {
		//Reset variables
		asset_params = {}; pdf_data_unscaled = []; pdf_data = [];
		incr = 1; pdf_y = 0; pdf_max = 0.000001;
		fill = "rgba(133, 133, 133, 0.25)";
		//First, get the beta distribution parameters for the event and asset of interest
		asset_params = _.find(compiled_costs1[event].detailed_costs,function(item) {
		if (item.asset == assets[aoi]) {
			return item;
		}
		});
		
		//Find the scaled alpha and beta
		beta_mean = (asset_params.mean - asset_params.min)/(asset_params.max - asset_params.min);
		beta_var = (Math.pow(asset_params.std_dev,2))/(Math.pow(asset_params.max - asset_params.min,2));
		alpha = beta_mean*(((beta_mean*(1-beta_mean))/beta_var)-1);
		beta = alpha/beta_mean - alpha;
		
		//Obtain the evaluation increment
		incr = (asset_params.max - asset_params.min)/100;
		//Starting at the min value and incrementing by 1/100th of the pdf range (i.e., max-min) get the pdf values
		for (let i = asset_params.min - incr ; i <asset_params.max + incr; i += incr) {
			pdf_y = jStat.beta.pdf((i-asset_params.min)/(asset_params.max - asset_params.min), alpha, beta);
			//console.log(pdf_y);
			//Check to see if the current pdf value is greater than the pre-recorded max
			if (pdf_y > pdf_max && pdf_y != Infinity) {
			  //If so, set max to current value
			  pdf_max = pdf_y;
			}
			pdf_data_unscaled.push({x: i, y: pdf_y});
		}
		
		//For each data point in pdf_data_unscaled
		pdf_data_unscaled.forEach(function(entry) {
			//Scale the y value
			pdf_y = entry.y/(1.05*pdf_max);
			//Make sure there are no infiite values
			if (pdf_y == Infinity) {
				//Set inifite values to 100
				pdf_y = 100;
			}
			//Enter scaled data point into pdf_data
			pdf_data.push({x: entry.x, y: pdf_y});
		});
		
		//console.log(pdf_data);
		
		//If this is the first asset of interest (aoi)
		if (aoi == 0) {
			//Regenerate the plot with the updated bounds
			//plot_width = d3.select(svg_container).node().getBoundingClientRect().width;
			//plot_height = d3.select(svg_container).node().getBoundingClientRect().height;
			plots(svg_container, plot_name, plot_height, plot_margin, plot_width, plot_min_x, plot_max_x, y_min_cost1, y_max_cost1, x_label,y_label,x_tics,y_tics);
		}
		
		//Get the first 2 letters of the asset id
		asset_id  = assets[aoi].substring(0,2);
		//Check to see if the first 2 letters of the asset id are of a line
		if (stroke_colors[asset_id] != undefined) {
			//Set the color to the line of interest
			stroke = stroke_colors[asset_id];
			fill = fill_colors[asset_id];
			console.log(asset_id);
		}
		
		//Check to see if linear assets, if so darken fill
		if (assets[aoi].substring(3,12) == 'linear' || assets[aoi].substring(0,6) == 'linear') {
			fill = fill.replace("0.25","0.70");
		}
		//Add the beta distribution
		add_cost_est_dists(svg_container, plot_name, pdf_data, stroke, fill, plot_min_x, plot_max_x,plot_height,plot_margin,plot_width);
	}
	return;
}

//Get the max and min of the plots
window.get_max_and_min = function(event,asset_list = []) {
	//Initalize variables
	var asset_params = {};
	var plot_min_x = 0;
	var plot_max_x = 10;
	
	//Loop through assets to get max and min
	for (let aoi = 0; aoi < asset_list.length; aoi++) {
		//First, get the beta distribution parameters for the event and asset of interest
		asset_params = _.find(compiled_costs1[event].detailed_costs,function(item) {
		if (item.asset == asset_list[aoi]) {
			return item;
		}
		});
		
		//Get the max and min of the plots
		//plot_min_x = Math.floor(asset_params.min/100)*100;
		if (asset_params.max > plot_max_x) {
			plot_max_x = Math.ceil(asset_params.max/100)*100;
		}		
	}
	return [plot_min_x,plot_max_x];
}
	

//Wait until tunnel_data loads, then run plot_build();
setTimeout(function(){ plot_build(); }, 100);
var scenario_i = 1;
//setInterval(function(){
//	
//	//Calculate and display for sceanrio_i
//	load_result(scenario_i);
//	//Wait a few seconds
//	setTimeout(function(){
//		//Then process the output depths
//		poi_depth_processing().then(function() {
//			//If the sceanrio actually exists
//			if(scenario_i < 22) {
//			//Push to the output compiler
//			exposure_out.push({AEP: aep, SLR: slr, RL:red_line_depth, OL:orange_line_depth, BL: blue_line_depth, GL: green_line_depth, SL: silver_line_depth, POI_flood: sys_poi_depth, switches: sys_switch_flooded});
//			}
//		});
//		//Wait a little bit longer
//		setTimeout(function(){
//			////If the sceanrio actually exists
//			//if(scenario_i < 21) {
//			//	//Push to the output compiler
//			//	exposure_out.push({RL:red_line_depth, OL:orange_line_depth, BL: blue_line_depth, GL: green_line_depth, SL: silver_line_depth, POI_flood: sys_poi_depth, switches: sys_switch_flooded});
//			//}
//		}, 100);
//		scenario_i += 1;
//	}, 4000);
//}, 6000);