//Expected annual losses (EAL) vs. time considering SLR uncertainty, as characterized by IPCC AR6 SLR projections (specific to Boston Harbor)

//Closed form equations describing how probabilistic EAL estimates for the MBTA rail rapid transit system vary with SLR (EAL vs. SLR)
//Enables characterization of EAL uncertainty via a generalized (i.e., 4-parameter) beta distribution

//EAL mean
self.MBTA_EAL_mean = function(SLR) {
	//Plug desired SLR into cubic function calibrated from flood loss model results
	return 2924.3*Math.pow(SLR,3) - 1330.3*Math.pow(SLR,2) + 660.43*SLR - 31.221;
};

//EAL mean reduction factor to consider Aquarium station flood barrier (+12 ft NAVD88)
self.MBTA_aq_reduction = function(SLR) {
	//Calculate EAL reduction based on flood damage cost estiamtion model reanalysis
	var aqu_reduction = 1.3086*Math.pow(SLR,3) - 2.6312*Math.pow(SLR,2) + 1.6362*SLR + 0.3821;
	if (aqu_reduction > 1) {
		return 1;
	} else {
		return aqu_reduction;
	}
};

//EAL min ratio (minimum EAL expresssed as a percentage of mean EAL)
self.MBTA_EAL_min_ratio = function(SLR) {
	//Plug desired SLR into power function fit to data from flood loss model results
	return 0.6197*Math.pow(SLR,0.0436);
};

//EAL max ratio (maximum EAL expresssed as a percentage of mean EAL)
self.MBTA_EAL_max_ratio = function(SLR) {
	//Plug desired SLR into power function fit to data from flood loss model results
	return 1.5805*Math.pow(SLR,-0.168);
};

//EAL alpha
self.MBTA_EAL_alpha = function(SLR) {
	//Plug desired SLR into cubic function calibrated from flood loss model results
	return 6.5388*Math.pow(SLR,3) - 11.072*Math.pow(SLR,2) + 6.1557*SLR + 0.6126;
};

//EAL beta
self.MBTA_EAL_beta = function(SLR) {
	//Plug desired SLR into cubic function calibrated from flood loss model results
	return 8.1745*Math.pow(SLR,3) - 16.653*Math.pow(SLR,2) + 9.2388*SLR + 2.5066;
};

//EAL estimation vs. time Monte Carlo Simulation
self.EAL_MC_simulation = function(SLR_scenario = "SSP5-8.5 l.c.",num_trials = 10000) {
	//Initialize variables
	self.EAL_MC_results = [];
	self.EAL_MC_results_aq = [];
	self.EAL_MC_results_aq_reduction = [];
	self.time_step_results = [];
	//For each decade through 2100:
	for (let year_i = 2020; year_i < 2101; year_i += 10) {
		//Reset result storage array
		time_step_results = [];
		time_step_results_aq = [];
		time_step_results_aq_reduction = []; 
		//For n = num_trials
		for (let i = 0; i < num_trials; i++) {
			//Generate a random SLR
				//Generate scale and location parameters for generalized beta dist
				//Scale = max - mn
				var SLR_scale = (AR6_projection_BOS[SLR_scenario][year_i].max - AR6_projection_BOS[SLR_scenario][year_i].min);
				//Location = min
				var SLR_location = AR6_projection_BOS[SLR_scenario][year_i].min;
			//SLR sample = random sample of generalized beta distribution (beta dist sample*scale + location)
			var SLR_sample = jStat.beta.inv(Math.random(),AR6_projection_BOS[SLR_scenario][year_i].alpha,AR6_projection_BOS[SLR_scenario][year_i].beta)*SLR_scale + SLR_location;
			//Generate corresponding EAL sample for baseline conditions
				//EAL sample see (for consistency in comparison between baseline and Aquarium Station flood protection scenarios)
				var EAL_seed = Math.random();
				//Generate scale and location parameters for generalized beta dist
				//Scale = max - mn
				var EAL_scale = (MBTA_EAL_max_ratio(SLR_sample) - MBTA_EAL_min_ratio(SLR_sample)) * MBTA_EAL_mean(SLR_sample);
				//Location = min
				var EAL_location = MBTA_EAL_min_ratio(SLR_sample) * MBTA_EAL_mean(SLR_sample);
			//EAL sample = random sample of generalized beta distribution (beta dist sample*scale + location)
			var EAL_sample = jStat.beta.inv(EAL_seed, MBTA_EAL_alpha(SLR_sample), MBTA_EAL_beta(SLR_sample))*EAL_scale + EAL_location;
			//If EAL sample is less than zero, adjust to 0
			if (EAL_sample < 0) {
				EAL_sample = 0;
			}
			//Generate corresponding EAL sample with Aquarium Station adaptation measure in place
				//Generate scale and location parameters for generalized beta dist
				//Scale = max - mn
				var EAL_scale_aq = EAL_scale * MBTA_aq_reduction(SLR_sample);
				//Location = min
				var EAL_location_aq = EAL_location * MBTA_aq_reduction(SLR_sample);
			//EAL sample = random sample of generalized beta distribution (beta dist sample*scale + location)
			var EAL_sample_aq = jStat.beta.inv(EAL_seed, MBTA_EAL_alpha(SLR_sample), MBTA_EAL_beta(SLR_sample))*EAL_scale_aq + EAL_location_aq;
			//If EAL sample is less than zero, adjust to 0
			if (EAL_sample_aq < 0) {
				EAL_sample_aq = 0;
			}
			//Push sample results to storage array
			time_step_results.push(EAL_sample);
			time_step_results_aq.push(EAL_sample_aq);
			time_step_results_aq_reduction.push(Math.max(EAL_sample - EAL_sample_aq,0));
		}
		//Push results to storage arrays
		EAL_MC_results.push({	year: year_i, EAL:	jStat.mean(time_step_results),
								EAL_min: jStat.min(time_step_results),
								EAL_max: jStat.max(time_step_results),
								EAL_5th: jStat.percentile(time_step_results,0.05,false),
								EAL_95th: jStat.percentile(time_step_results,0.95,false),
		});
		EAL_MC_results_aq.push({	year: year_i, EAL:	jStat.mean(time_step_results_aq),
								EAL_min: jStat.min(time_step_results_aq),
								EAL_max: jStat.max(time_step_results_aq),
								EAL_5th: jStat.percentile(time_step_results_aq,0.05,false),
								EAL_95th: jStat.percentile(time_step_results_aq,0.95,false),
		});
		EAL_MC_results_aq_reduction.push({	year: year_i, EAL:	jStat.mean(time_step_results_aq_reduction),
								EAL_min: jStat.min(time_step_results_aq_reduction),
								EAL_max: jStat.max(time_step_results_aq_reduction),
								EAL_5th: jStat.percentile(time_step_results_aq_reduction,0.05,false),
								EAL_95th: jStat.percentile(time_step_results_aq_reduction,0.95,false),
		});
	}
};