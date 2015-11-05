/**
 *@author Odiscious
 */

var App01 = (function() {

	var context = null;
	var rectSize = 25;
	var pictures = {};
	//Playerx and PlayerY represent the location on the board
	var playerY = 0;
	var playerX = 0;
	//Move count
	var moveCount = 0;
	var hero = null;
	var orc = null;

	var grid = [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1]];

	function App() {
		context = getCanvas();
		window.addEventListener('keydown', doKeyDown, true);
		makeImageData();
		readHeroJson();
		readOrcJson();
	}

	var updatePlayerValues = function() {

		var random = Math.random();

		hero.Moves++;

		if (hero.Moves > 0 && hero.Moves % 25 === 0) {
			hero.Experience++;
		}
		//update strength (1) only 15% of the time
		if (hero.Moves > 0 && hero.Moves % 10 === 0) {
			if (random < 0.15) {
				hero.Strength++;
			}
		}
		//might be a clearner way to display all the values for the game (Hero and Orc)
		//displayStats();
	};
	var draw = function() {
		var MAX = 12;
		var imageName = "cscGarden01.gif";
		var imageName2 = "cscGarden02.gif";
		for (var i = 0; i < MAX; i++) {
			for (var j = 0; j < MAX; j++) {

				if (grid[i][j] === 0) {
					//Image selector number one
					context.drawImage(pictures[imageName], 0, rectSize, rectSize, rectSize, rectSize * i, rectSize * j, rectSize, rectSize);
				} else {
					//Image seletor number two
					context.drawImage(pictures[imageName2], 0, rectSize, rectSize, rectSize, rectSize * i, rectSize * j, rectSize, rectSize);

				}

				context.drawImage(pictures[imageName2], 25, 0, rectSize, rectSize, rectSize * playerX, rectSize * playerY, rectSize, rectSize);

			}
		}

	};
	//This is where the images within the image file are chosen and how.
	var makeImageData = function() {
		var images = ["cscGarden01.gif", "cscGarden02.gif"];
		var x = 10;
		loadImages(images, function(pictures, a) {
			var fileName = images[a];
			//Altering the second and third parameter by a direct swap - Test 01
			//The test succeeded.  The images were manipulated; however, my grid is still off.
			//Persisting issue.  I've altered the for loops to accommodate for the two types of grass.
			//But, the conditional statements are not working as expected.  Run code for illustration.
			context.drawImage(pictures[fileName], 0, rectSize, rectSize, rectSize, rectSize * (a + 1), 10, rectSize, rectSize);
		});
	};

	var loadImages = function(images, callback) {
		var a = 0;
		for (var i = 0; i < images.length; i++) {
			var fileName = images[i];
			pictures[fileName] = new Image();
			pictures[fileName].onload = function() {
				callback(pictures, a++);
			};
			pictures[fileName].src = fileName;
		}
	};

	var getCanvas = function() {
		var canvas = document.getElementById('mainCanvas');
		if (canvas !== null) {
			var context = canvas.getContext('2d');
			setInterval(draw, 50);
			return context;
		} else {
			$("#debugs").css({
				backgroundColor : "blue",
				color : "yellow"
			});
			$("#debugs").html("Could not retrieve canvas");
			return null;
		}
	};
	
	var displayHero = function() {
		$("#C02R01").html(hero.Moves);
		$("#C02R02").html(hero.Type);
		$("#C02R03").html(hero.Experience);
		$("#C02R04").html(hero.Health);
		$("#C02R05").html(hero.Strength);
	};
	
	var displayOrc = function(orc) {
		$("#OrcTableC02R01").html(orc.Moves);
		$("#OrcTableC02R02").html(orc.Type);
		$("#OrcTableC02R03").html(orc.Experience);
		$("#OrcTableC02R04").html(orc.Health);
		$("#OrcTableC02R05").html(orc.Strength);
	};
	
	var doKeyDown = function(evt) {
		//$("#debug").html(evt.keyCode);

		switch (evt.keyCode) {
			case 37:
				if (playerX > 0) {
					hero.Moves++;
					$("#moveCount").html("Hero Move count =  " + hero.Moves);
					//display stats
					displayHero();
					playerX -= 1;
					$("#playerCoordinate").html("x coordinate =  " + playerX + " and y coordinate = " + playerY);
					updatePlayerValues();
				}

				break;
			case 38:
				if (playerY > 0) {
					hero.Moves++;
					$("#moveCount").html("Hero Move count =  " + hero.Moves);
					//display stats
					displayHero();
					playerY -= 1;
					$("#playerCoordinate").html("x coordinate =  " + playerX + " and y coordinate = " + playerY);
					updatePlayerValues();
				}

				break;
			case 39:
				if (playerX < 11) {
					hero.Moves++;
					$("#moveCount").html("Hero Move count =  " + hero.Moves);
					//display stats
					displayHero();
					playerX += 1;
					$("#playerCoordinate").html("x coordinate =  " + playerX + " and y coordinate = " + playerY);
					updatePlayerValues();
				}

				break;
			case 40:
				if (playerY < 11) {
					hero.Moves++;
					$("#moveCount").html("Hero Move count =  " + hero.Moves);
					//display stats
					displayHero();
					playerY += 1;
					$("#playerCoordinate").html("x coordinate =  " + playerX + " and y coordinate = " + playerY);
					updatePlayerValues();
				}

				break;
		}
	};
	var showDebug = function(textToDisplay) {
		$("#debug").append('<li>' + textToDisplay + '</li>');
	};

	var errorFunc = function(request, ajaxOptions, thrownError) {
		showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
		showDebug(request.status);
		showDebug(request.statusText);
		showDebug(request.getAllResponseHeaders());
		showDebug(request.responseText);
	};

	var readHeroJson = function() {
		var path = {
			fileName : 'Data/Hero.json'
		};
		$.ajax({
			type : 'GET',
			url : '/read',
			dataType : 'json',
			//used when sending data
			data : path,
			success : function(data) {
				hero = data;
				displayHero(hero);
			},
			
			error : errorFunc

		});
		
	};

	var readOrcJson = function() {
		var path = {
			fileName : 'Data/Orc.json'
		};
		$.ajax({
			type : 'GET',
			url : '/read',
			dataType : 'json',
			//used when sending data
			data : path,
			success : function(data) {
				displayOrc(data);
				orc = data;

			},
			error : errorFunc
		});
	}
	var saveJson = function() {

		$.ajax({
			type : 'GET',
			url : '/writeHero',
			dataType : 'json',
			data : hero,
			success : function(data) {
				$("#debugtext").html(data.result);
			}
			//error: showError
		});
	};
	return App;
})();

$(document).ready(function() {'use strict';
	new App01();
});
