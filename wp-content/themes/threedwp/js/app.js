var container, stats, main;

var camera, scene, renderer, cssScene, rendererCSS;

var cube, plane2;

var element;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var getPageInfo;
var pageInfo;


function getJson(url) {
    return JSON.parse($.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    }).responseText);
}

getPageInfo = getJson('http://wp3d.dev/wp-json/wp/v2/pages/5');


//console.log(getPageInfo.excerpt.rendered);


pageInfo = getPageInfo.excerpt.rendered;

init();
animate();

function init() {

	container = document.createElement( 'div' );

	main = document.getElementById('main')

	document.body.appendChild( container );

	document.body.insertBefore(container,primary );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'Drag to spin the cube';
	container.appendChild( info );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.5, 20000 );
	camera.position.x = 0;
	camera.position.y = 60;
	camera.position.z = 900;


	scene = new THREE.Scene();

	// Cube

	var geometry = new THREE.BoxGeometry( 200, 200, 200 );

	for ( var i = 0; i < geometry.faces.length; i += 2 ) {

		var hex = Math.random() * 0xffffff;
		geometry.faces[ i ].color.setHex( hex );
		geometry.faces[ i + 1 ].color.setHex( hex );

	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0 } );

	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 0;
	scene.add( cube );




	var asphault = new THREE.ImageUtils.loadTexture( '/wp-content/themes/threedwp/js/app-assets/img/asphault.jpg' );
	asphault.wrapS = THREE.RepeatWrapping;
    asphault.wrapT = THREE.RepeatWrapping;

	var asphault = new THREE.MeshBasicMaterial( { map: asphault, side: THREE.DoubleSide } );

	var planeGeometry = new THREE.PlaneBufferGeometry(800,800);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});


	var ground = new THREE.Mesh(planeGeometry,asphault);

	ground.rotateX( - Math.PI / 2 );
	ground.position.x = 0;
	ground.position.y = -150;
	ground.position.z = -100;
	scene.add(ground);

		var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	//renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();


	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 1, side: THREE.DoubleSide });
	var planeWidth = 360;
    var planeHeight = 120;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.y += planeHeight/2;
	// add it to the standard (WebGL) scene
	//scene.add(planeMesh);
	
	// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src = 'data:text/html;charset=utf-8,' + encodeURI(pageInfo);
	// width of iframe in pixels
	var elementWidth = 1024;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = 1024;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = planeMesh.position;
	cssObject.rotation = planeMesh.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.rotation.z = 180 * Math.PI / 180;
	cssScene.add(cssObject);
	
	// create a renderer for CSS
	rendererCSS	= new THREE.CSS3DRenderer();
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position = 'absolute';
	rendererCSS.domElement.style.top	  = 0;
	rendererCSS.domElement.style.margin	  = 0;
	rendererCSS.domElement.style.padding  = 0;
	
	// when window resizes, also resize this renderer
	//THREEx.WindowResize(rendererCSS, camera);

	



	renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position	= 'absolute';
	renderer.domElement.style.top	= 0;
	renderer.domElement.style.zIndex	= -1;
	container.appendChild( renderer.domElement );
	container.appendChild( rendererCSS.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;

	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
	rendererCSS.render( cssScene, camera );
	renderer.render( scene, camera );

}