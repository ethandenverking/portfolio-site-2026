import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

// The hero object: renders a custom glTF model when `modelUrl` is given, otherwise a static wireframe cube-in-cube.
export default function HeroObject({ modelUrl } = {}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const styles = getComputedStyle(document.documentElement)
    const accentColor = styles.getPropertyValue('--color-accent').trim() || '#ffffff'
    const dividerColor = styles.getPropertyValue('--color-divider').trim() || '#666666'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.4, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const disposables = []
    const render = () => renderer.render(scene, camera)

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      if (!clientWidth || !clientHeight) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      render()
    }

    if (modelUrl) {
      // sky/ground tint pulled from the page's pastel sunset gradient (peach to soft blue)
      scene.add(new THREE.HemisphereLight(0xffd8ba, 0xa8c6f0, 1.2))
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
      keyLight.position.set(3, 4, 5)
      scene.add(keyLight)

      // normalize scale/position so models of any size/units frame the same as the fallback cube
      const frameModel = (model) => {
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale = 5 / (Math.max(size.x, size.y, size.z) || 1)
        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        // shift right/down relative to the visible width at the model's depth, clear of the hero text
        const distance = camera.position.z - model.position.z
        const visibleHeight = 2 * distance * Math.tan((camera.fov * Math.PI) / 360)
        const visibleWidth = visibleHeight * camera.aspect
        model.position.x += visibleWidth * 0.35
        model.position.y -= visibleWidth * 0.1
        scene.add(model)
        render()
      }

      if (modelUrl.toLowerCase().endsWith('.stl')) {
        new STLLoader().load(
          modelUrl,
          (geometry) => {
            const material = new THREE.MeshStandardMaterial({ color: '#ffffff', wireframe: false })
            const mesh = new THREE.Mesh(geometry, material)
            // Blender STL exports are Z-up; rotate to three.js's Y-up so the model stands upright
            mesh.rotation.x = -Math.PI / 2
            mesh.rotation.z = Math.PI
            disposables.push(geometry, material)
            frameModel(mesh)
          },
          undefined,
          (error) => console.error('HeroObject: failed to load model', modelUrl, error)
        )
      } else {
        new GLTFLoader().load(
          modelUrl,
          (gltf) => {
            const model = gltf.scene
            model.traverse((child) => {
              if (child.isMesh) {
                child.material.wireframe = false
                child.material.map = null
                child.material.color.set('#ffffff')
              }
            })
            frameModel(model)
          },
          undefined,
          (error) => console.error('HeroObject: failed to load model', modelUrl, error)
        )
      }
    } else {
      const group = new THREE.Group()
      const outerCube = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2)),
        new THREE.LineBasicMaterial({ color: accentColor })
      )
      const innerCube = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.1, 1.1, 1.1)),
        new THREE.LineBasicMaterial({ color: dividerColor })
      )
      innerCube.rotation.set(0.4, 0.4, 0)
      group.add(outerCube, innerCube)
      group.rotation.set(0.3, 0.5, 0)
      scene.add(group)
      disposables.push(outerCube.geometry, outerCube.material, innerCube.geometry, innerCube.material)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    return () => {
      resizeObserver.disconnect()
      mount.removeChild(renderer.domElement)
      disposables.forEach((disposable) => disposable.dispose())
      renderer.dispose()
    }
  }, [modelUrl])

  return <div className="hero-object" ref={mountRef} />
}
