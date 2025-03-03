import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
**********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
 // Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects

const torusGeometry = new THREE.TorusGeometry( 2.5, .5, 16, 100 ); 
const torusMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const torus = new THREE.Mesh( torusGeometry, torusMaterial ); 
torus.castShadow = true
torus.position.x = 10
torus.rotation.y = Math.PI * 0.5
torus.scale.y = 0.5
scene.add( torus );

const torusKnotGeometry2 = new THREE.TorusKnotGeometry( .6, .05, 200, 16, 7, 11 ); 
const torusKnotMaterial2 = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const torusKnot = new THREE.Mesh( torusKnotGeometry2, torusKnotMaterial2 ); 
torusKnot.castShadow = true
torusKnot.position.x = 10
torusKnot.rotation.z = Math.PI
torusKnot.rotation.y = Math.PI * 0.5

scene.add( torusKnot );

/*********** 
** LIGHTS **
************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//  new THREE.Color('white')
//)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/**********************
 ** DOM INTERACTIONS **
 **********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function(){
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function(){
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}

/*******
** UI **
********/
// UI
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')
    */

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part === 1){
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2){
        camera.position.set(25, 1, 6)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange){
        torus.scale.y = (Math.sin(elapsedTime * 0.5) * 0.5)
        torusKnot.scale.y = (Math.sin(elapsedTime * 0.5))
    }

    // second-change
    if(domObject.secondChange){
        torusKnot.position.z = (Math.sin(elapsedTime) * 0.7)
    }

    // third-change
    if(domObject.thirdChange){
        torus.position.z = -(Math.sin(elapsedTime * 0.5) * 0.7)
        torusKnot.position.x = (Math.sin(elapsedTime) + 10)
    }

    // fourth-change
    if(domObject.fourthChange){
        torus.position.y = (Math.sin(elapsedTime) + 1) * 2
        torusKnot.position.y = (Math.sin(elapsedTime) + 1) * 2
    }

    

    // Update directionalLightHelper
    directionalLightHelper.update()

    //Animate Objects

    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()