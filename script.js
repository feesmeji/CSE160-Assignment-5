console.log('Script is running!');

import * as THREE from './three.module.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

//Camera setup
	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 2;

//Make a scene
	const scene = new THREE.Scene();

// add lighting
{
	const color = 0xFFFFFF;
	const intensity = 3;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
}
// stuff for cube
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

	const loader = new THREE.TextureLoader();
	const texture = loader.load( 'rubber_duck.jpg');
	texture.colorSpace = THREE.SRGBColorSpace;

	const material = new THREE.MeshPhongMaterial( { map: texture} ); // greenish blue hex number
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );


// stuff for sphere
const sphere_geometry = new THREE.SphereGeometry( 0.7, 32, 16 ); 
const sphere_material = new THREE.MeshPhongMaterial( { color: 0xff0000 } ); 
const sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 

sphere.position.set(-1.7,0,0);  //chatgpt suggested I use this function to set the position on the screen, I put the values on my own

scene.add( sphere );

//stuff for tetrahedron
const tetrahedron_geometry = new THREE.TetrahedronGeometry(0.8, 0);
const tetrahedron_material = new THREE.MeshPhongMaterial({color : 0x00FFFF });
const tetrahedron = new THREE.Mesh(tetrahedron_geometry, tetrahedron_material);

tetrahedron.position.set(1.7, 0 ,0);

scene.add(tetrahedron);

//render shape
	function render( time ) {

		time *= 0.001; // convert time to seconds

		cube.rotation.x = time;
		cube.rotation.y = time;

		sphere.rotation.x = time;
		sphere.rotation.y = time;

		tetrahedron.rotation.x = time;
		tetrahedron.rotation.y = time;

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}
	requestAnimationFrame( render );  //request browser that I need to animate something

}
main();