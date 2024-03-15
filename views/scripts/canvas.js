import * as THREE from '/three.js'
import { OBJLoader } from '/three/addons/loaders/OBJLoader.js';
import { OrbitControls } from '/three/addons/controls/OrbitControls.js';

const light_intensity = 1200

// Scene
const scene = new THREE.Scene()


// Sizes
const sizes = {
  width: window.innerWidth * 0.6,
  height: window.innerHeight * 0.6,
}

// Light
//const light = new THREE.AmbientLight(0xFFFFFF, 10)
const light1 = new THREE.PointLight(0xFFFFFF, light_intensity)
const light2 = new THREE.PointLight(0xFFFFFF, light_intensity)
const light3 = new THREE.PointLight(0xFFFFFF, light_intensity)
const light4 = new THREE.PointLight(0xFFFFFF, light_intensity)
const light5 = new THREE.PointLight(0xFFFFFF, light_intensity)
const light6 = new THREE.PointLight(0xFFFFFF, light_intensity)
light1.position.set(0, 0, 15)
light2.position.set(0, 0, -15)
light3.position.set(0, 20, 0)
light4.position.set(0, -20, 0)
light5.position.set(15, 0, 0)
light6.position.set(-15, 0, 0)
scene.add(light1)
scene.add(light2)
scene.add(light3)
scene.add(light4)
scene.add(light5)
scene.add(light6)


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0 , 40)
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xAAAAAA, 1)

// Controls
const controls = new OrbitControls(camera, renderer.domElement );

function createObject() {
	// instantiate a loader
	const loader = new OBJLoader()

	// load a resource
	loader.load(
		// resource URL
		'object.obj',
		// called when resource is loaded

		function ( object ) {
		object.position.set(0, -10, 0)
			scene.add( object );
		},
		// called when loading is in progresses
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);
}



function animate() {
  requestAnimationFrame(animate)
  controls.update()
  render()
}

function render()
{
  renderer.render(scene, camera)
}

animate()


export {createObject}