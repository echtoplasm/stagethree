import { useEffect, useImperativeHandle, useRef, forwardRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useStageContext } from '../contexts/StageContext';
import { type ElementPlacement, updateElementPlacement, deleteElementPlacement } from '../api/elementPlacement';
import { useAuth } from '../contexts/AuthContext';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { ElementPositionModal } from './threeDComponents/ElementPostitionModal';
import { ElementRotationModal } from './threeDComponents/ElementRotationModal';
import { Maximize2, Minimize2, Pipette, ShieldQuestion } from 'lucide-react';
import { SandBoxDocs } from '../components/documentation/modals/SandboxMode';
import { CustomBackGroundModal } from './threeDComponents/CustomBackGroundModal';

interface StageObject {
  id: string;
  placementId: number;
  name: string;
  position: THREE.Vector3;
  mesh: THREE.Mesh | THREE.Group;
  modelPath?: string;
}

type ContextMenuState = {
  x: number;
  y: number;
  object: StageObject;

}

export interface StageSceneHandle {
  getSnapshot: () => string | null;
}

interface StageSceneProps {
  showStageObjects: boolean;
  showColorPicker: boolean;
  showCurrentStage: boolean;
}

const modelCache = new Map<string, THREE.Group>();
const loader = new GLTFLoader();


/**
 * Core Three.js scene component for stage plot visualization and element manipulation.
 * Handles scene setup, GLTF model loading with client-side caching, raycaster-based drag,
 * keyboard controls, right-click context menu, and element position/rotation editing.
 * Exposes a getSnapshot handle for PDF export via forwardRef.
 *
 * @param showStageObjects - Whether to render the stage objects position overlay.
 * @param showColorPicker - Whether to render the background color picker toggle.
 * @param showCurrentStage - Whether to render the current stage/project info overlay.
 * @returns The Three.js canvas mount with overlays, context menu, and editing modals.
 */
export const StageScene = forwardRef<StageSceneHandle, StageSceneProps>((props, ref) => {
  const { showStageObjects, showColorPicker, showCurrentStage } = props;

  useImperativeHandle(ref, () => ({
    getSnapshot: () => rendererRef.current?.domElement.toDataURL('image/png') ?? null
  }))

  //STATE MANAGEMENT
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [objects, setObjects] = useState<StageObject[]>([]);

  //state for context menu on element right click
  const [elpContext, setElpContext] = useState(false);
  const [erpContext, setErpContext] = useState(false);

  //state for selected element positioning and rotation
  const [selectedElementPosition, setSelectedElementPosition] = useState<THREE.Vector3 | null>(null);
  const [selectedObjectRotation, setSelectedObjectRotation] = useState<THREE.Euler | null>(null)
  const [selectedObject, setSelectedObject] = useState<StageObject | null>(null);

  //state for object overlay expanded view 
  const [objOverlay, setObjOverlay] = useState(false);

  //state for stage overlay expanded view 
  const [stageOverlay, setStageOverlay] = useState(false);

  //state for sandbox doc help
  const [sandBoxHelp, setSandBoxHelp] = useState(false);

  //state for background color
  const [customBackGround, setCustomBackGround] = useState(false);
  const [backgroundColor, setBackGroundColor] = useState('#5a6a9a')

  //REFS
  const objectsRef = useRef<StageObject[]>([]);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const selectedObjectRef = useRef<THREE.Mesh | null>(null);
  const offsetRef = useRef(new THREE.Vector3());

  //CONTEXT PROVIDERS
  const { elementPlacements, stage, activeProject, setElementPlacements } = useStageContext();
  const { isAuthenticated } = useAuth();
  const isSandbox = !isAuthenticated;

  /**
   * Loads a GLTF model from the given path, normalizing its scale to a unit cube.
   * Returns a cached clone on subsequent calls to avoid redundant network requests.
   *
   * @param modelPath - The URL of the GLB/GLTF model to load.
   * @param placement - The element placement used to apply the configured scale after loading.
   * @returns A promise resolving to the scaled Three.js Group.
   */
  const loadModel = (modelPath: string, placement: ElementPlacement): Promise<THREE.Group> => {
    return new Promise((resolve) => {
      if (modelCache.has(modelPath)) {
        const clone = modelCache.get(modelPath)!.clone();
        clone.scale.setScalar(placement.scaleX);
        resolve(clone);
        return;
      }

      loader.load(modelPath, (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.scale.setScalar(1 / maxDim);

        modelCache.set(modelPath, model);

        const clone = model.clone();
        clone.scale.setScalar(placement.scaleX);
        resolve(clone);
      });
    });
  };


  /**
   * Adds an element to the Three.js scene from an element placement record.
   * Loads a GLTF model if a file path is present, otherwise falls back to a BoxGeometry.
   *
   * @param placement - The element placement record containing position, rotation, scale, and optional model path.
   */
  const addInstrument = async (placement: ElementPlacement) => {
    if (!sceneRef.current) return;

    let object: THREE.Mesh | THREE.Group;

    if (placement.filePathImg) {
      object = await loadModel(placement.filePathImg, placement);
      object.position.set(placement.positionX, placement.positionY, placement.positionZ);
    } else {
      const geometry = new THREE.BoxGeometry(placement.scaleX, placement.scaleZ, placement.scaleY);
      const material = new THREE.MeshStandardMaterial({ color: 0x4a90d9 });
      object = new THREE.Mesh(geometry, material);
      object.position.set(placement.positionX, placement.positionY + 0.5, placement.positionZ);
    }

    object.rotation.set(placement.rotationX, placement.rotationY, placement.rotationZ);
    object.name = `instrument-${placement.id}`;
    sceneRef.current.add(object);

    setObjects(prev => {
      const next = [...prev, {
        id: `scene-element-id-${placement.id}`,
        placementId: placement.id!,
        name: placement.name,
        position: object.position.clone(),
        mesh: object,
        modelPath: placement.filePathImg,
      }];
      objectsRef.current = next;
      return next;
    });
  };


  /**
   * Removes a stage object from the scene and deletes its placement record from the API.
   * Updates both objects state and elementPlacements context on completion.
   *
   * @param stageObj - The stage object to remove from the scene and database.
   */
  const handleDeleteObject = async (stageObj: StageObject) => {
    if (sceneRef.current) {
      const mesh = sceneRef.current.getObjectByName(`instrument-${stageObj.placementId}`);
      if (mesh) sceneRef.current.remove(mesh);
    }
    await deleteElementPlacement(stageObj.placementId);
    setElementPlacements(elementPlacements.filter(p => p.id !== stageObj.placementId));
    setObjects(prev => {
      const next = prev.filter(o => o.id !== stageObj.id);
      objectsRef.current = next;
      return next;
    });

    console.log(objects);
    setContextMenu(null);
  };

  /** Finalizes a drag operation, re-enables orbit controls, and persists the updated position to the API. */
  const handleMouseUp = () => {
    const selected = selectedObjectRef.current;
    selectedObjectRef.current = null;
    if (controlsRef.current) controlsRef.current.enabled = true;
    if (selected) {
      setObjects(prev => {
        const next = prev.map(obj => {
          console.log(obj.id)
          if (obj.mesh === selected) {
            if (!isSandbox) {
              updateElementPlacement(obj.placementId, {
                positionX: selected.position.x,
                positionY: selected.position.y,
                positionZ: selected.position.z,
              });
            }
            return { ...obj, position: selected.position.clone() }
          }
          return obj;
        });
        objectsRef.current = next;
        return next;
      });
    }
  }

  /**
   * Initializes the Three.js scene, camera, renderer, orbit controls, lighting, stage grid,
   * and all mouse/keyboard event listeners. Tears down and disposes all resources on unmount.
   * Re-runs whenever the active stage changes.
   */
  useEffect(() => {
    if (!mountRef.current) return;


    console.log(elementPlacements);
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
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

    // renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const keys = new Set<string>();


    /**
     * Handles WASD/QE camera translation and arrow key rotation/elevation of the selected object.
     * Ignores input when focus is on an interactive form element.
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button') return;


      keys.add(e.key.toLowerCase())
      if (selectedObjectRef.current) {
        const rotationSpeed = Math.PI / 45;

        if (e.key === 'ArrowLeft') {
          selectedObjectRef.current.rotation.y += rotationSpeed;
          selectedObjectRef.current.rotation.y = Math.round(selectedObjectRef.current.rotation.y * (180 / Math.PI)) * (Math.PI / 180);
        }
        if (e.key === 'ArrowRight') {
          selectedObjectRef.current.rotation.y -= rotationSpeed;
          selectedObjectRef.current.rotation.y = Math.round(selectedObjectRef.current.rotation.y * (180 / Math.PI)) * (Math.PI / 180);
        }

        if (e.key === 'ArrowUp') {
          selectedObjectRef.current.position.y += rotationSpeed;
        }

        if (e.key === 'ArrowDown') {
          selectedObjectRef.current.position.y -= rotationSpeed;
        }
      }
    };

    /** Removes the released key from the active key set. */
    const handleKeyUp = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Stage floor (grid)
    console.log('stage state:', stage);
    const gridHelper = new THREE.GridHelper(stage?.width ?? 20, stage?.depth ?? 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Stage plane (invisible for raycasting)
    const planeGeometry = new THREE.PlaneGeometry(stage?.width ?? 20, stage?.depth ?? 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
      visible: false
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.name = 'stage-plane';
    scene.add(plane);

    /** Runs the Three.js render loop, applying WASD/QE camera movement each frame. */
    const animate = () => {
      requestAnimationFrame(animate);

      const speed = 0.1;
      if (keys.has('w')) camera.position.z -= speed;
      if (keys.has('s')) camera.position.z += speed;
      if (keys.has('a')) camera.position.x -= speed;
      if (keys.has('d')) camera.position.x += speed;
      if (keys.has('q')) camera.position.y -= speed;
      if (keys.has('e')) camera.position.y += speed;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /** Updates camera aspect ratio and renderer dimensions on container resize. */
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    /**
     * Initiates a drag operation on left click by raycasting against scene instruments
     * and storing the hit offset to prevent snapping on pickup.
     */
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;

      if (!mountRef.current || !camera || !scene) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      const intersects = raycasterRef.current.intersectObjects(
        scene.children.filter(child => child.name.startsWith('instrument-')),
        true
      );

      if (intersects.length > 0) {
        let target: THREE.Object3D = intersects[0].object;
        while (target.parent && !target.name.startsWith('instrument-')) {
          target = target.parent;
        }
        selectedObjectRef.current = target as THREE.Mesh;
        controlsRef.current!.enabled = false;
        const intersectPoint = intersects[0].point;
        offsetRef.current.copy(intersectPoint).sub(selectedObjectRef.current.position);
      }
    };

    /** Translates the selected object along the stage plane by projecting the cursor ray onto it. */
    const handleMouseMove = (event: MouseEvent) => {
      if (!selectedObjectRef.current || !mountRef.current || !camera || !scene) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);

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


    /**
     * Opens the right-click context menu for the instrument under the cursor.
     * Clears the context menu if no instrument is hit.
     */
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;

      console.log('current objects ref', objectsRef.current);
      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const intersects = raycasterRef.current.intersectObjects(
        sceneRef.current.children.filter(c => c.name.startsWith('instrument-')),
        true
      );

      if (intersects.length > 0) {
        let target: THREE.Object3D = intersects[0].object;
        while (target.parent && !target.name.startsWith('instrument-')) {
          target = target.parent;
        }
        const stageObj = objectsRef.current.find(o => o.mesh === target);

        if (stageObj) {
          setContextMenu({ x: event.clientX, y: event.clientY, object: stageObj });
        }
      } else {
        setContextMenu(null);
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('contextmenu', handleContextMenu);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('contextmenu', handleContextMenu);

      renderer.dispose();

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [stage]);

  /**
   * Adds any element placements to the scene that are not yet represented by a scene object.
   * Runs whenever elementPlacements context updates.
   */
  useEffect(() => {
    if (!sceneRef.current || !elementPlacements.length) return;

    elementPlacements.forEach(placement => {
      const existing = sceneRef.current!.getObjectByName(`instrument-${placement.id}`);
      if (!existing) {
        addInstrument(placement);
      }
    });
  }, [elementPlacements]);

  /** Updates the Three.js scene background color whenever the user selects a new color. */
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(backgroundColor);
    }
  }, [backgroundColor]);


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: selectedObjectRef.current ? 'grabbing' : 'grab'
        }}
      />
      {showStageObjects && (
        <>
          <div className='stageobjects-overlay'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Stage Objects</h3>
              <button className='btn btn-ghost btn-sm' aria-label='expand or close the stage objects overlay' onClick={() => setObjOverlay(prev => !prev)}>
                {objOverlay ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
            </div>
            {!objOverlay && (
              <ul>
                {objects.map(obj => (
                  <li key={obj.id}>
                    {obj.name} - ( x: {Number(obj.position.x.toFixed(2))} , z: {Number(obj.position.z.toFixed(2))} )
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      {showColorPicker && (
        <div>
          <button aria-label='Open the color picker modal.' className='pipette' onClick={() => setCustomBackGround(true)}   >
            <Pipette size={18} />
          </button>
        </div>
      )}
      {
        stage && activeProject && showCurrentStage && (
          <div className='stageinfo-overlay'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Current Stage</h3>
              <button className='btn btn-ghost btn-sm' onClick={() => setStageOverlay(prev => !prev)}>
                {stageOverlay ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
            </div>
            {!stageOverlay && (
              <div>
                <ul>
                  <li>stage: {stage?.name}</li>
                  <li>project: {activeProject?.name}</li>
                </ul>
              </div>
            )}
          </div>
        )
      }

      {
        isSandbox && (
          <div className='sandbox-banner'>
            <h3>You are in sandbox mode.</h3>
            <button
              aria-label='Open sandbox mode documentation.'
              onClick={() => setSandBoxHelp(true)} className='btn btn-ghost btn-sm'><ShieldQuestion size={14} /></button>
          </div>
        )
      }

      {
        customBackGround && (
          <div>
            <CustomBackGroundModal
              bgColor={backgroundColor}
              onSuccess={(backgroundColor) => {
                setBackGroundColor(backgroundColor)
                setCustomBackGround(false);
              }}
              onClose={() => setCustomBackGround(false)}
            />
          </div>
        )
      }

      {
        contextMenu && (
          <div
            className="context-menu"
            style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x }}
            onMouseLeave={() => setContextMenu(null)}
          >
            <div className="context-menu__header">{contextMenu.object.name}</div>
            <ul className="context-menu__list">
              <li className="context-menu__item context-menu__item--danger" onClick={() => {
                console.log(contextMenu.object.mesh);
                console.log(sceneRef.current?.children)
                if (!isSandbox) {
                  handleDeleteObject(contextMenu.object)
                } else {
                  contextMenu.object.mesh.removeFromParent();
                  setObjects(prev => {
                    const next = prev.filter(obj => obj !== contextMenu.object);
                    objectsRef.current = next;
                    return next;
                  });
                  setContextMenu(null);
                }
              }}>
                Delete
              </li>
              <li className='context-menu__item' onClick={() => {
                setSelectedElementPosition(contextMenu.object.position)
                setSelectedObject(contextMenu.object);
                setElpContext(true)
              }}>
                Update Position
              </li>
              <li className='context-menu__item' onClick={() => {
                setSelectedObjectRotation(contextMenu.object.mesh.rotation)
                setSelectedObject(contextMenu.object);
                setErpContext(true)
              }}>
                Update Rotation
              </li>

            </ul>
          </div>
        )
      }
      {
        elpContext && (
          <ElementPositionModal
            initialPosition={selectedElementPosition}
            onSuccess={(x, y, z) => {
              console.log('selected object firing within onsuccess of modal', selectedObject)
              selectedObject?.mesh.position.set(x, y, z);
              setObjects(prev => {
                const next = prev.map(obj =>
                  obj.id === selectedObject?.id
                    ? { ...obj, position: new THREE.Vector3(x, y, z) }
                    : obj
                );
                objectsRef.current = next;
                return next;
              });

              console.log('after set:', selectedObject?.mesh.position);
              if (!isSandbox && selectedObject?.placementId) {
                updateElementPlacement(selectedObject?.placementId, {
                  positionX: x,
                  positionY: y,
                  positionZ: z,
                });
              }
              setElpContext(false);
              setContextMenu(null)
            }}
            onClose={() => setElpContext(false)}
          />
        )
      }

      {
        erpContext && (
          <ElementRotationModal
            initialRotation={selectedObjectRotation}
            onSuccess={(x, y, z) => {
              selectedObject?.mesh.rotation.set(x, y, z);
              if (!isSandbox && selectedObject?.placementId) {
                updateElementPlacement(selectedObject.placementId, {
                  rotationX: x,
                  rotationY: y,
                  rotationZ: z,
                });
              }
              setErpContext(false);
              setContextMenu(null);
            }}
            onClose={() => setErpContext(false)}
          />
        )
      }

      {
        sandBoxHelp && (
          <SandBoxDocs
            onClose={() => setSandBoxHelp(false)}
          />
        )
      }
    </div >
  );
})

