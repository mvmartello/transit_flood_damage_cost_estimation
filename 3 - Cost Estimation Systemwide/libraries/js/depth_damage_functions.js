//Depth-damage functions (Martello et al., 2022)

//Underground station
self.alpha_und_sta = function(depth_in_feet) {
	//=min(0.38x, 0.08x + 0.15, 0.025x + 0.535, 1)
    var alpha1 = 0.38*depth_in_feet;
    var alpha2 = 0.08*depth_in_feet + 0.15;
	var alpha3 = 0.025*depth_in_feet + 0.535;
    return Math.min(alpha1,alpha2,alpha3,1);
};

//At-grage station
self.alpha_ag_sta = function(depth_in_feet) {
    //=IF(x < 0.5,0.26*x, IF(x < 3, 0.068*x + 0.096, IF(x < 7, 0.09*x + 0.03, MIN(0.0275*x + 0.4675, 1) )))
    if (depth_in_feet < 0.5) {
		return Math.max(0,0.26*depth_in_feet);
	} else if (depth_in_feet < 3) {
		return 0.068*depth_in_feet + 0.096;
	} else if (depth_in_feet < 7) {
		return 0.09*depth_in_feet + 0.03;
	} else {
		return Math.min(0.0275*depth_in_feet + 0.4675, 1);
	}
};

//Maintenance Facility
self.alpha_maint_f = function(depth_in_feet) {
	//=min(0.36x, 0.092x + 0.134, 0.0725x + 0.1925, 0.02625x + 0.51625, 1)
    var alpha1 = 0.36*depth_in_feet;
    var alpha2 = 0.092*depth_in_feet + 0.134;
	var alpha3 = 0.0725*depth_in_feet + 0.1925;
	var alpha4 = 0.02625*depth_in_feet + 0.51625;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Ventilation Room
self.alpha_vent = function(depth_in_feet) {
    //=min(0.18x, 0.088x + 0.046, 0.085x + 0.055, 0.02375x + 0.48375, 1)
    var alpha1 = 0.18*depth_in_feet;
    var alpha2 = 0.088*depth_in_feet + 0.046;
	var alpha3 = 0.085*depth_in_feet + 0.055;
	var alpha4 = 0.02375*depth_in_feet + 0.48375;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Pump Room
self.alpha_pump = function(depth_in_feet) {
    //=min(0.12x, 0.096x + 0.012, 0.0875x + 0.0375, 0.02x + 0.51, 1)
    var alpha1 = 0.12*depth_in_feet;
    var alpha2 = 0.096*depth_in_feet + 0.012;
	var alpha3 = 0.0825*depth_in_feet + 0.0375;
	var alpha4 = 0.02*depth_in_feet + 0.51;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Signals
self.alpha_signals = function(depth_in_feet) {
    //=min(0.6x, 0.14x + 0.23, 0.05x + 0.5, 0.01125x + 0.77125, 1)
    var alpha1 = 0.6*depth_in_feet;
    var alpha2 = 0.14*depth_in_feet + 0.23;
	var alpha3 = 0.05*depth_in_feet + 0.5;
	var alpha4 = 0.01125*depth_in_feet + 0.77125;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Tunnel lighting
self.alpha_light = function(depth_in_feet) {
    //=IF(x < 0.5,0.06x, IF(x < 3, 0.04x + 0.01, IF(x < 7, 0.0475x - 0.0125, MIN(0.0725x - 0.1875, 1) )))
    if (depth_in_feet < 0.5) {
		return Math.max(0,0.06*depth_in_feet);
	} else if (depth_in_feet < 3) {
		return 0.04*depth_in_feet + 0.01;
	} else if (depth_in_feet < 7) {
		return 0.0475*depth_in_feet - 0.0125;
	} else {
		return Math.min(0.0725*depth_in_feet - 0.1875, 1);
	}
};

//Rail
self.alpha_rail = function(depth_in_feet) {
    //=min(0.36x, 0.12x + 0.12, 0.04x + 0.36, 0.01875x + 0.50875, 1)
    var alpha1 = 0.36*depth_in_feet;
    var alpha2 = 0.12*depth_in_feet + 0.12;
	var alpha3 = 0.04*depth_in_feet + 0.36;
	var alpha4 = 0.01875*depth_in_feet + 0.50875;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Track Switch
self.alpha_switch = function(depth_in_feet) {
    //=min(0.62x, 0.136x + 0.242, 0.02x + 0.59, 0.00625x + 0.68625, 1)
    var alpha1 = 0.62*depth_in_feet;
    var alpha2 = 0.136*depth_in_feet + 0.242;
	var alpha3 = 0.02*depth_in_feet + 0.59;
	var alpha4 = 0.00625*depth_in_feet + 0.68625;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//3rd rail
self.alpha_3rd = function(depth_in_feet) {
    //=min(0.42x, 0.124x + 0.148, 0.0275x + 0.4375, 0.01875x + 0.49875, 1)
    var alpha1 = 0.42*depth_in_feet;
    var alpha2 = 0.124*depth_in_feet + 0.148;
	var alpha3 = 0.0275*depth_in_feet + 0.4375;
	var alpha4 = 0.01875*depth_in_feet + 0.49875;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Power conduit
self.alpha_pwr = function(depth_in_feet) {
    //=min(0.38x, 0.092x + 0.144, 0.0325x + 0.3225, 0.03375x + 0.31375, 1)
    var alpha1 = 0.38*depth_in_feet;
    var alpha2 = 0.092*depth_in_feet + 0.144;
	var alpha3 = 0.0325*depth_in_feet + 0.3225;
	var alpha4 = 0.03375*depth_in_feet + 0.31375;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};

//Catenary
self.alpha_cat = function(depth_in_feet) {
    //=IF(x < 0.5,0.16x, IF(x < 3, 0.032x + 0.0064, IF(x < 7, 0.06x - 0.02, MIN(0.05x + 0.05, 1) )))
    if (depth_in_feet < 0.5) {
		return Math.max(0,0.16*depth_in_feet);
	} else if (depth_in_feet < 3) {
		return 0.032*depth_in_feet + 0.0064;
	} else if (depth_in_feet < 7) {
		return 0.06*depth_in_feet - 0.02;
	} else {
		return Math.min(0.05*depth_in_feet - 0.05, 1);
	}
};

//Tunnel structure
self.alpha_struct = function(depth_in_feet) {
    //=min(0.18x, 0.048x + 0.066, 0.0375x + 0.0975, 0.02x + 0.22, 1)
    var alpha1 = 0.18*depth_in_feet;
    var alpha2 = 0.048*depth_in_feet + 0.066;
	var alpha3 = 0.0375*depth_in_feet + 0.0975;
	var alpha4 = 0.02*depth_in_feet + 0.22;
    return Math.min(alpha1,alpha2,alpha3,alpha4,1);
};