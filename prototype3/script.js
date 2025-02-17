import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
**********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
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

const leftGeometry = new THREE.CircleGeometry( .4, 32 )
const leftMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const leftEye = new THREE.Mesh( leftGeometry, leftMaterial )
leftEye.position.x = 5
leftEye.position.y = 1
leftEye.position.z = 0.6
leftEye.rotation.y = Math.PI * 0.5
leftEye.castShadow = true
scene.add(leftEye)

const rightGeometry = new THREE.CircleGeometry( .4, 32 )
const rightMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const rightEye = new THREE.Mesh( rightGeometry, rightMaterial )
rightEye.position.x = 5
rightEye.position.y = 1
rightEye.position.z = -0.6
rightEye.rotation.y = Math.PI * 0.5
rightEye.castShadow = true
scene.add(rightEye)


const smileGeometry = new THREE.TorusGeometry( 1, .2, 10, 64, Math.PI )
const smileMaterial = new THREE.MeshNormalMaterial()
const smile = new THREE.Mesh( smileGeometry, smileMaterial )
smile.position.x = 5
smile.rotation.y = Math.PI * 0.5
smile.rotation.z = Math.PI
smile.castShadow = true
scene.add( smile )

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

/*******
** UI **
********/
// UI
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
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update directionalLightHelper
    directionalLightHelper.update()

    //Animate Objects

    rightEye.rotation.y = elapsedTime * 2
    rightEye.position.z = Math.sin(elapsedTime * 0.6)
    leftEye.rotation.y = -elapsedTime * 2
    leftEye.position.z = Math.sin(elapsedTime * -0.6)
    smile.rotation.y = elapsedTime * 4

    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()