import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

// The hero object: renders a custom glTF/STL model when `modelUrl` is given, otherwise a static wireframe cube-in-cube.
// Idle-spins, tilts toward the pointer, and bobs gently — matching the "Layered Collage" hero treatment.
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

    let model = null
    let raf = null
    let t = 0
    let pointer = 0
    let target = 0

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      if (!clientWidth || !clientHeight) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      render()
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!model) return
      t += 0.006
      pointer += (target - pointer) * 0.05
      model.rotation.y = t + pointer
      model.position.y = Math.sin(t * 1.6) * 0.09
      render()
    }

    const onMove = (e) => {
      target = ((e.clientX / window.innerWidth) - 0.5) * 1.2
    }

    if (modelUrl) {
      // sky/ground tint pulled from the page's pastel sunset gradient
      scene.add(new THREE.HemisphereLight(0xffc2cf, 0xa8c6f0, 1.1))
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.7)
      keyLight.position.set(2.5, 4, 5)
      scene.add(keyLight)
      const rimLight = new THREE.DirectionalLight(0xb5abfc, 1.1)
      rimLight.position.set(-4, 1, -2)
      scene.add(rimLight)

      // normalize scale/position so models of any size/units frame the same
      const frameModel = (mesh) => {
        const pivot = new THREE.Group()
        pivot.add(mesh)
        const box = new THREE.Box3().setFromObject(mesh)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale = 4.1 / (Math.max(size.x, size.y, size.z) || 1)
        mesh.scale.setScalar(scale)
        mesh.position.sub(center.multiplyScalar(scale))
        scene.add(pivot)
        model = pivot
        render()
      }

      if (modelUrl.toLowerCase().endsWith('.stl')) {
        new STLLoader().load(
          modelUrl,
          (geometry) => {
            const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5, metalness: 0.08 })
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
            const mesh = gltf.scene
            mesh.traverse((child) => {
              if (child.isMesh) {
                child.material.wireframe = false
                child.material.map = null
                child.material.color.set('#ffffff')
              }
            })
            frameModel(mesh)
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
      scene.add(group)
      model = group
      disposables.push(outerCube.geometry, outerCube.material, innerCube.geometry, innerCube.material)
    }

    resize()
    tick()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      mount.removeChild(renderer.domElement)
      disposables.forEach((disposable) => disposable.dispose())
      renderer.dispose()
    }
  }, [modelUrl])

  return <div className="hero-object" ref={mountRef} />
}
