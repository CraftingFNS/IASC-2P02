import * as THREE from "three"

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#6888BE')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 7)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
 // testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const torusKnotGeometry = new THREE.TorusKnotGeometry( 2.5, .2, 64, 16 )
const torusMaterial = new THREE.MeshNormalMaterial(1)
const testTorus = new THREE.Mesh(torusKnotGeometry, torusMaterial)

scene.add(testSphere)
scene.add(testTorus)

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)
    testTorus.position.y = Math.sin(elapsedTime)

    testTorus.rotation.x = Math.sin(elapsedTime * 2)
    testTorus.rotation.y = Math.cos(elapsedTime / 2)
    testTorus.rotation.z = Math.tan(elapsedTime / 10)
    
    // Renderer
    renderer.render(scene, camera)
    
    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()