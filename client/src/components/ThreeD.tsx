import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface StageObject {
  id: string;
  name: string;
  position: THREE.Vector3;
  mesh: THREE.Mesh;
}

export function StageScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [objects, setObjects] = useState<StageObject[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const selectedObjectRef = useRef<THREE.Mesh | null>(null);
  const offsetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Stage floor (grid)
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Stage plane (invisible for raycasting)
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
      visible: false 
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.name = 'stage-plane';
    scene.add(plane);

    // Add sample objects
    addInstrument('Drum Kit', 0, 0, 0xff0000);
    addInstrument('Guitar Amp', -3, 0, 0x00ff00);
    addInstrument('Keyboard', 3, 0, 0x0000ff);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      if (!mountRef.current || !camera || !scene) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      
      const intersects = raycasterRef.current.intersectObjects(
        scene.children.filter(child => child.name.startsWith('instrument-'))
      );

      if (intersects.length > 0) {
        selectedObjectRef.current = intersects[0].object as THREE.Mesh;
        controlsRef.current!.enabled = false; // Disable orbit controls while dragging
        
        // Calculate offset from object center to click point
        const intersectPoint = intersects[0].point;
        offsetRef.current.copy(intersectPoint).sub(selectedObjectRef.current.position);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!selectedObjectRef.current || !mountRef.current || !camera || !scene) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      
      // Raycast against the stage plane
      const plane = scene.children.find(child => child.name === 'stage-plane');
      if (plane) {
        const intersects = raycasterRef.current.intersectObject(plane);
        if (intersects.length > 0) {
          const newPosition = intersects[0].point.sub(offsetRef.current);
          selectedObjectRef.current.position.x = newPosition.x;
          selectedObjectRef.current.position.z = newPosition.z;
        }
      }
    };

    const handleMouseUp = () => {
      selectedObjectRef.current = null;
      if (controlsRef.current) {
        controlsRef.current.enabled = true; // Re-enable orbit controls
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const addInstrument = (name: string, x: number, z: number, color: number) => {
    if (!sceneRef.current) return;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(x, 0.5, z);
    mesh.name = `instrument-${Date.now()}`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    sceneRef.current.add(mesh);

    const newObject: StageObject = {
      id: mesh.name,
      name,
      position: mesh.position.clone(),
      mesh
    };

    setObjects(prev => [...prev, newObject]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          cursor: selectedObjectRef.current ? 'grabbing' : 'grab'
        }} 
      />
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h3>Stage Objects</h3>
        <ul>
          {objects.map(obj => (
            <li key={obj.id}>
              {obj.name} - ({obj.position.x.toFixed(1)}, {obj.position.z.toFixed(1)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

