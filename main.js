var child_process = require('child_process');

module.exports = function(app){
	app.get('/index', function(req, res){
		//res.sendFile(__dirname + "/" + "index.html");
		res.render("index.html");
		console.log("Rendered index page");
	});

	app.post('/arrange', function(req, res){
		console.log(req.body);
		console.log();
		console.log();

		var newArrangement = [0];

		for(var i=1; i<req.body.length; i++){
			//assume 10 songs, at the start assigning each a value [0,9] by their initial order
			//make 10 randomized chromosomes, ie. [2, 3, 6, 8, 1, 9, 7, 0, 4, 5]
			//determine the fitness of each

			//should I use some sort of dynamic programming instead?


			//let's try this first: pick song 0 to be the first one
			//for song 1, consider placing before 0 and after 0, see which gives higher total fitness
			//continue for each song

			var song = req.body[i];
			var fitnesses = [];

			//place this song in every position
			for(var j=0; j<=newArrangement.length; j++){
				newArrangement.splice(j, 0, i); //add
				fitnesses.push(getFitness(req.body, newArrangement));
				newArrangement.splice(j, 1); //remove
			}

			//find the position with the minimum fitness
			//the index correlates to where this song should be placed
			var minIndex = 0;
			for(j=0; j<fitnesses.length; j++){
				if(fitnesses[j] < fitnesses[minIndex]){
					minIndex = j;
				}
			}

			//add the song at the minimum fitness possible index
			newArrangement.splice(minIndex, 0, i);

			/*
			req.body.sort(function(song1, song2){
				//sorts in ascending tempo
				return song1.audio_summary.tempo > song2.audio_summary.tempo;
			});*/
		}

		//arrange the actual list of song data to match newArrangement
		var arranged = [];
		var songAtThisIndex;
		for(var k=0; k<newArrangement.length; k++){
			songAtThisIndex = newArrangement[k];
			arranged[k] = req.body[songAtThisIndex];
		}

		//must return req.body in its entirety, only rearranged
		res.json(arranged);

		/*
		var environment = {};

		//we can store up to about 120000 variables in the environment
		//for a maximum of 100 songs, this leaves 1200 allowed data points per song
		for(var i=0; i<req.body.length; i++){
			environment["ARTIST" + i] = req.body[i].artistOutput;
			environment["TITLE" + i] = req.body[i].songOutput;
			environment["ENERGY" + i] = req.body[i].audio_summary.energy;
			environment["LIVENESS" + i] = req.body[i].audio_summary.liveness;
			environment["TEMPO" + i] = req.body[i].audio_summary.tempo;
		}

		var workerProcess = child_process.exec('python ./public/scripts/arrange.py',	
      		function (error, stdout, stderr) {
         		if (error) {
            		console.log(error.stack);
            		console.log('Error code: '+error.code);
            		console.log('Signal received: '+error.signal);
         		}
         		console.log('stdout: ' + stdout);
         		console.log('stderr: ' + stderr);
      		});
      	workerProcess.on('exit', function (code) {
      		console.log('Child process exited with exit code '+code);
      		res.send("done");
   		});

		var workerProcess = child_process.execFile('./public/scripts/arrange.py', [req.body.length], {env: environment},	
      		function (error, stdout, stderr) {
         		if (error) {
            		console.log(error.stack);
            		console.log('Error code: '+error.code);
            		console.log('Signal received: '+error.signal);
         		}
         		console.log('stdout: ' + stdout);
         		console.log('stderr: ' + stderr);
      		});
      	workerProcess.on('exit', function (code) {
      		console.log('Child process exited with exit code '+code);
      		res.send("done");
   		});*/
	});


	var getFitness = function(songData, songArrangement){
		var fitness = 0;

		for(var j=0; j<songArrangement.length-1; j++){
			var currentSong = songArrangement[j];
			var nextSong = songArrangement[j+1];
			fitness += Math.abs(songData[currentSong].audio_summary.tempo - songData[nextSong].audio_summary.tempo);
		}
		return fitness;
	}
}