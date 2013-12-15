// when the page gets shown the current level is loaded from local storage
$( document ).delegate("#levelpage", "pageshow", function() {
	var currentLevel = 1;//parseInt(localStorage.currentLevel);
	var currentTheme = 3;//parseInt(localStorage.currentTheme); <-- must be added later
	loadLevel(currentLevel, currentTheme);
});

// intervalID holds a reference to the update interval (box2Dweb)
// intervalID is set in the levelX.js files
var intervalID;
function stopUpdateFunction() {
	if(!(intervalID == null)) {
		window.clearInterval(intervalID); //intervalID is set in levelX.js where X is a number
		intervalID = null;
	}
}

//reloads the page
function reloadPage() {
	stopUpdateFunction();
	
	location.reload();
}

//reset the canvas to show other stuff
function resetCanvas() {
	stopUpdateFunction();
	
	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//this gets called from the levelX.js files
function levelFinished() {
	//todo: save data
	$( "#popup" ).popup( "open" );
}

//open the next level and save new level index
function next() {
	$( "#popup" ).popup( "close" );
	var currentLevel = parseInt(localStorage.currentLevel);
	localStorage.currentLevel = "" + ++currentLevel;
	
	reloadPage();
	
	/*
	url = location.protocol + '//' + location.host + location.pathname;
	$.mobile.changePage(
		"#",
	    {
	      allowSamePageTransition : true,
	      transition              : 'slide',
	      showLoadMsg             : false,
	      reloadPage              : true
	    }
	); */ 
}

//open the menu
function menu() {
	stopUpdateFunction();
	$.mobile.changePage(
		"levelselector.html",
	    {
	      transition       	: 'pop',
	      reverse			: true
	    }
	);
	resetCanvas();
}

//load the javascript file and the description of the level and execute the javascript file
function loadLevel ( level, theme ) {
	resetCanvas();
	//level = 6; //for debugging
	var url = "js/theme" + theme + "/level" + level + ".js";
	$.getScript( url, function() {
		var description = levelInfo[theme-1][level-1][0];
		var width = levelInfo[theme-1][level-1][1];
		var height = levelInfo[theme-1][level-1][2];
		
		var context = canvas.getContext('2d');
		context.canvas.width = width;
		context.canvas.height = height;
		
		window["level" + level]();
		$('#leveltxt').text("LEVEL " + level);
		$('#leveldescription').text(description);			  
	});
}

