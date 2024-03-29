
var pointLight, spotLight;

var fieldWidth = 400, fieldHeight = 200;

var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirX = 0, paddle2DirX = 0, paddleSpeed = 5;

var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

var score1 = 0, score2 = 0;

var maxScore = 100;
var renderer = new THREE.WebGLRenderer();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-6,3,23);

'use strict';

const controls = new THREE.OrbitControls(camera,canvas)
function setup()
{
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";

	player1 = document.getElementById('player1').value;
	player2 = document.getElementById('player2').value;	
	
	score1 = 0;
	score2 = 0;
	
	createScene();
	draw();
}

function createScene()
{
	
	//mengeset ukuran dari scene
	var WIDTH = 640,
	  HEIGHT = 360;

	var c = document.getElementById("gameCanvas");
	scene.add(camera);
	
	//bayangan
	// camera.position.z = 150;
	// camera.position.y = 70;
	//camara.position.x = 10;
	
	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane 
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;
		
	// create the paddle1's material
	var paddle1Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x45ba48
		});
	// create the paddle2's material
	var paddle2Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x0033cc
		});
	// membuat papan pong	
	var planeMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x4D3A3A
		});
	// membuat meja penyangga pong
	var tableMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x160B06
		});
	// create the pillar's material
	var pillarMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xDBA16B
		});
	// create the ground's material
	var groundMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x888888
		});
		
		
	// create the playing surface plane
	var plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth *0.5,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight *2,
		planeQuality,
		planeQuality),

	  planeMaterial);
	  
	scene.add(plane);
	plane.receiveShadow = true;	
	
	var table = new THREE.Mesh(

	  new THREE.CubeGeometry(
		planeWidth * 0.6,	// this creates the feel of a billiards table, with a lining
		planeHeight * 2.2,
		100,				// an arbitrary depth, the camera can't see much of it anyway
		planeQuality,
		planeQuality,
		1),

	  tableMaterial);
	table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	scene.add(table);
	table.receiveShadow = true;	
		
	// // set up the sphere vars
	// lower 'segment' and 'ring' values will increase performance
	var radius = 5,
		segments = 6,
		rings = 6;
		
	// // create the sphere's material
	var sphereMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xD43001
		});
		
	// Create a ball with sphere geometry
	ball = new THREE.Mesh(

	  new THREE.SphereGeometry(
		radius,
		segments,
		rings),

	  sphereMaterial);

	// // add the sphere to the scene
	scene.add(ball);
	
	ball.position.x = 0;
	ball.position.y = 0;
	// set ball above the table surface
	ball.position.z = radius;
	ball.receiveShadow = true;
    ball.castShadow = true;
	
	// // set up the paddle vars
	paddleWidth = 30;
	paddleHeight = 10;
	paddleDepth = 10;
	paddleQuality = 1;
		
	paddle1 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle1Material);

	// // add the sphere to the scene
	scene.add(paddle1);
	paddle1.receiveShadow = true;
    paddle1.castShadow = true;
	
	paddle2 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle2Material);
	  
	// // add the sphere to the scene
	scene.add(paddle2);
	paddle2.receiveShadow = true;
    paddle2.castShadow = true;	
	
	// set paddles on each side of the table
	paddle1.position.y = -fieldWidth/2 + paddleWidth;
	paddle2.position.y = fieldWidth/2 - paddleWidth;
	
	// lift paddles over playing surface
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
		
	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the left
	for (var i = 0; i < 0; i++)
	{
		var backdrop = new THREE.Mesh(
		
		  new THREE.CubeGeometry( 
		  400, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = 230;
		backdrop.position.z = -30;		
		//backdrop.castShadow = true;
		//backdrop.receiveShadow = true;		  
		scene.add(backdrop);	
	}
	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the right
	for (var i = 0; i < 0; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry( 
		  400, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = -230;
		backdrop.position.z = -30;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		
		scene.add(backdrop);	
	}
	
	// finally we finish by adding a ground plane
	// to show off pretty shadows
	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry( 
	  1000, 
	  1000, 
	  3, 
	  1, 
	  1,
	  1 ),

	  groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
	ground.position.z = -132;
	ground.receiveShadow = true;	
	scene.add(ground);		
		
	// // create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -100;
	pointLight.position.y = 0;
	pointLight.position.z = 100;
	pointLight.intensity = 2.9;
	pointLight.distance = 1000;
	// add to the scene
	scene.add(pointLight);
		
	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	//renderer.shadowMapEnabled = true;		
}

function draw()
{	
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);
	
	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	playerPaddleMovement();
	player2PaddleMovement();
}

function ballPhysics()
{
	ballSpeed+=0.005;
	// if ball goes off the 'left' side (Player's side)
	if (ball.position.x <= -fieldHeight/2)
	{	
		// CPU scores
		score2++;
		// update scoreboard HTML
		document.getElementById("scores").innerHTML = player1 + " " + score1 + "-" + score2 + " " +player2;
		// reset ball to center
		resetBall(2);
		matchScoreCheck();	
	}
	
	// if ball goes off the 'right' side (CPU's side)
	if (ball.position.x >= fieldHeight/2)
	{	
		// Player scores
		score1++;
		// update scoreboard HTML
		document.getElementById("scores").innerHTML = player1 + " " + score1 + "-" + score2 + " " +player2;
		// reset ball to center
		resetBall(1);
		matchScoreCheck();	
	}
	
	// if ball goes off the top side (side of table)
	if (ball.position.y <= -fieldWidth/2)
	{
		ballDirX = -ballDirX;
	}	
	// if ball goes off the bottom side (side of table)a
	if (ball.position.y >= fieldWidth/2)
	{
		ballDirX = -ballDirX;
	}
	
	// update ball position over time
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;
	
	// limit ball's y-speed to 2x the x-speed
	// this is so the ball doesn't speed from left to right super fast
	// keeps game playable for humans
	if (ballDirY > ballSpeed * 2)
	{
		ballDirY = ballSpeed * 2;
	}
	else if (ballDirY < -ballSpeed * 2)
	{
		ballDirY = -ballSpeed * 2;
	}
}

// Handles CPU paddle movement and logic
function player2PaddleMovement()
{
	if (Key.isDown(Key.A))		
	{
		// if paddle is not touching the side of table
		// we move
		if (paddle2.position.y < fieldHeight * 0.45)
		{
			paddle2DirY = paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle
		// to indicate we can't move
		else
		{
			paddle2DirY = 0;
			paddle2.scale.z += (10 - paddle2.scale.z) * 0.2;
		}
	}	
	// move right
	else if (Key.isDown(Key.D))
	{
		// if paddle is not touching the side of table
		// we move
		if (paddle2.position.y > -fieldHeight * 0.45)
		{
			paddle2DirY = -paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle
		// to indicate we can't move
		else
		{
			paddle2DirY = 0;
			paddle2.scale.z += (10 - paddle2.scale.z) * 0.2;
		}
	}
	// else don't move paddle
	else
	{
		// stop the paddle
		paddle2DirY = 0;
	}
	
	paddle2.scale.y += (1 - paddle2.scale.y) * 0.2;	
	paddle2.scale.z += (1 - paddle2.scale.z) * 0.2;	
	paddle2.position.y += paddle2DirY;

}


// Handles player's paddle movement
function playerPaddleMovement()
{
	// move left
	if (Key.isDown(Key.J))		
	{
		// if paddle is not touching the side of table
		// we move
		if (paddle1.position.y < fieldHeight * 0.45)
		{
			paddle1DirX = paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle
		// to indicate we can't move
		else
		{
			paddle1DirX = 0;
			paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
		}
	}	
	// move right
	else if (Key.isDown(Key.L))
	{
		// if paddle is not touching the side of table
		// we move
		if (paddle1.position.y > -fieldHeight * 0.45)
		{
			paddle1DirX = -paddleSpeed * 0.5;
		}
		// else we don't move and stretch the paddle
		// to indicate we can't move
		else
		{
			paddle1DirX = 0;
			paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
		}
	}
	// else don't move paddle
	else
	{
		// stop the paddle
		paddle1DirX = 0;
	}
	
	paddle1.scale.y += (1 - paddle1.scale.y) * 0.2;	
	paddle1.scale.z += (1 - paddle1.scale.z) * 0.2;	
	paddle1.position.y += paddle1DirY;
}

// Handles camera and lighting logic
function cameraPhysics()
{
	// we can easily notice shadows if we dynamically move lights during the game
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	
	// move to behind the player's paddle
	camera.position.x = paddle1.position.x - 200;
	camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
	
	// rotate to face towards the opponent
	camera.rotation.x = Math.PI/180;
	//tinggi
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

// Handles paddle collision logic
function paddlePhysics()
{
	// PLAYER PADDLE LOGIC
	
	// if ball is aligned with paddle1 on x plane
	// remember the position is the CENTER of the object
	// we only check between the front and the middle of the paddle (one-way collision)
	if (ball.position.x <= paddle1.position.x + paddleWidth
	&&  ball.position.x >= paddle1.position.x)
	{
		// and if ball is aligned with paddle1 on y plane
		if (ball.position.y <= paddle1.position.y + paddleHeight/2
		&&  ball.position.y >= paddle1.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards player (-ve direction)
			if (ballDirX < 0)
			{
				// stretch the paddle to indicate a hit
				paddle1.scale.y = 15;
				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;
				// we impact ball angle when hitting it
				// this is not realistic physics, just spices up the gameplay
				// allows you to 'slice' the ball to beat the player2
				ballDirY -= paddle1DirY * 0.7;
			}
		}
	}
	
	// player2 PADDLE LOGIC	
	
	// if ball is aligned with paddle2 on x plane
	// remember the position is the CENTER of the object
	// we only check between the front and the middle of the paddle (one-way collision)
	if (ball.position.x <= paddle2.position.x + paddleWidth
	&&  ball.position.x >= paddle2.position.x)
	{
		// and if ball is aligned with paddle2 on y plane
		if (ball.position.y <= paddle2.position.y + paddleHeight/2
		&&  ball.position.y >= paddle2.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards player2 (+ve direction)
			if (ballDirX > 0)
			{
				// stretch the paddle to indicate a hit
				paddle2.scale.y = 15;	
				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;
				// we impact ball angle when hitting it
				// this is not realistic physics, just spices up the gameplay
				// allows you to 'slice' the ball to beat the player2
				ballDirY -= paddle2DirY * 0.7;
			}
		}
	}
}

function resetBall(loser)
{
	// position the ball in the center of the table
	ball.position.x = 0;
	ball.position.y = 0;
	
	// if player lost the last point, we send the ball to player2
	if (loser == 1)
	{
		ballDirX = -1;
	}
	// else if player2 lost, we send ball to player
	else
	{
		ballDirX = 1;
	}
	
	// set the ball to move +ve in y plane (towards left from the camera)
	ballDirY = 1;
}

var bounceTime = 0;
// checks if either player or player2 has reached 7 points
function matchScoreCheck()
{
	ballSpeed = 2;
	// if player has 7 points
	if (score1 >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner

		document.getElementById("scores").innerHTML = "Player "+ player1 +" wins!";
		// document.getElementById("scores").innerHTML = "Player 1 wins!";		
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
		// make paddle bounce up and down
		bounceTime++;
		paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
	// else if player2 has 7 points
	else if (score2 >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner
		document.getElementById("scores").innerHTML = "Player "+ player2 +" wins!";
		// document.getElementById("scores").innerHTML = "Player 2 wins!";
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
		// make paddle bounce up and down
		bounceTime++;
		paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
}