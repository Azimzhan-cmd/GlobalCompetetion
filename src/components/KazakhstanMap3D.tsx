import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { X, Info, HelpCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import soundCtrl from '../utils/SoundController';

interface Region {
  id: string;
  titleKey: string;
  descKey: string;
  neet: number;
  selfEmp: number;
  challengeKey: string;
  vertices: [number, number][];
  tags: string[];
}

const REGIONS: Region[] = [
  {
    id: 'west',
    titleKey: 'map.zone.west.title',
    descKey: 'map.zone.west.desc',
    neet: 4.2,
    selfEmp: 22.4,
    challengeKey: 'map.zone.west.desc',
    vertices: [
      [-5.0, 0.8],
      [-4.2, 1.8],
      [-2.8, 1.5],
      [-2.0, 0.8],
      [-1.6, -0.2],
      [-2.2, -1.5],
      [-3.2, -1.5],
      [-4.0, -0.6],
      [-4.8, -0.6]
    ],
    tags: ['Oil & Gas', 'Automation Risk', 'Single-Industry Cities']
  },
  {
    id: 'north',
    titleKey: 'map.zone.north.title',
    descKey: 'map.zone.north.desc',
    neet: 5.1,
    selfEmp: 25.1,
    challengeKey: 'map.zone.north.desc',
    vertices: [
      [-2.0, 0.8],
      [-2.8, 1.5],
      [-2.0, 2.2],
      [-0.5, 2.4],
      [1.0, 2.2],
      [1.6, 1.5],
      [1.0, 0.6],
      [-0.5, 0.4]
    ],
    tags: ['Agriculture', 'Brain Drain', 'Aging Workforce']
  },
  {
    id: 'east',
    titleKey: 'map.zone.east.title',
    descKey: 'map.zone.east.desc',
    neet: 4.8,
    selfEmp: 20.8,
    challengeKey: 'map.zone.east.desc',
    vertices: [
      [1.0, 0.6],
      [1.6, 1.5],
      [2.8, 1.8],
      [3.6, 1.0],
      [3.0, -0.2],
      [2.2, -0.4],
      [1.5, -0.5]
    ],
    tags: ['Mining', 'Metallurgy', 'Ecological Shifts']
  },
  {
    id: 'center',
    titleKey: 'map.zone.center.title',
    descKey: 'map.zone.center.desc',
    neet: 5.6,
    selfEmp: 18.5,
    challengeKey: 'map.zone.center.desc',
    vertices: [
      [-1.6, -0.2],
      [-2.0, 0.8],
      [-0.5, 0.4],
      [1.0, 0.6],
      [1.5, -0.5],
      [0.0, -0.8]
    ],
    tags: ['Heavy Industry', 'Coal Mining', 'Logistics Hub']
  },
  {
    id: 'south',
    titleKey: 'map.zone.south.title',
    descKey: 'map.zone.south.desc',
    neet: 7.9,
    selfEmp: 32.1,
    challengeKey: 'map.zone.south.desc',
    vertices: [
      [-2.2, -1.5],
      [-1.6, -0.2],
      [0.0, -0.8],
      [1.5, -0.5],
      [2.2, -0.4],
      [3.0, -0.2],
      [2.6, -1.2],
      [1.2, -1.6],
      [0.0, -1.8],
      [-1.2, -1.6]
    ],
    tags: ['Informal Sector', 'Agriculture', 'High NEET Rate']
  }
];

export default function KazakhstanMap3D() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Sound triggering refs
  const prevHoveredId = useRef<string | null>(null);

  // Check mobile screen viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3D WebGL Map effect
  useEffect(() => {
    if (isMobile || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth;
    const height = 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -1.5, 7.5);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Map Group containing all extruded region meshes
    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // Helper to get active theme color from computed CSS variables
    const getThemeHex = (varName: string, defaultHex: number): number => {
      const val = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (val && val.startsWith('#')) {
        return parseInt(val.slice(1), 16);
      }
      return defaultHex;
    };

    // Extrude settings for low-poly premium blocks
    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.04
    };

    // Keep track of materials and meshes for animating them
    const meshes: { [key: string]: THREE.Mesh } = {};
    const outlineLines: { [key: string]: THREE.LineSegments } = {};
    const materials: { [key: string]: THREE.MeshPhysicalMaterial } = {};

    REGIONS.forEach((region) => {
      // Create Shape
      const shape = new THREE.Shape();
      region.vertices.forEach((v, index) => {
        if (index === 0) {
          shape.moveTo(v[0], v[1]);
        } else {
          shape.lineTo(v[0], v[1]);
        }
      });
      shape.closePath();

      // Extrude Geometry
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // Material
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x00afca,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
        transmission: 0.2,
        thickness: 0.4
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = region.id;
      mesh.userData = {
        regionId: region.id,
        currentZ: 0,
        targetZ: 0
      };

      // Add Glowing Neon Edges
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00afca,
        transparent: true,
        opacity: 0.9
      });
      const line = new THREE.LineSegments(edges, lineMaterial);
      mesh.add(line);

      // Save references
      meshes[region.id] = mesh;
      outlineLines[region.id] = line;
      materials[region.id] = material;

      mapGroup.add(mesh);
    });

    // Center mapGroup in the scene
    const box = new THREE.Box3().setFromObject(mapGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    mapGroup.position.sub(center);

    // Initial group tilting
    const baseRotX = -Math.PI / 3.5;
    const baseRotY = 0;
    mapGroup.rotation.x = baseRotX;
    mapGroup.rotation.y = baseRotY;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight1.position.set(-5, 5, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff9900, 1.2);
    dirLight2.position.set(5, -5, 4);
    scene.add(dirLight2);

    // 5. Raycasting Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredId: string | null = null;
    let currentClickedId: string | null = null;

    // Handle mouse movement for parallax & raycasting
    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Map to NDC [-1, 1]
      mouse.x = (x / width) * 2 - 1;
      mouse.y = -(y / height) * 2 + 1;
    };

    // Handle mouse click to lock selection
    const handlePointerDown = () => {
      if (currentHoveredId) {
        currentClickedId = currentHoveredId === currentClickedId ? null : currentHoveredId;
        const reg = REGIONS.find((r) => r.id === currentClickedId) || null;
        setActiveRegion(reg);
        soundCtrl.click();
      } else {
        currentClickedId = null;
        setActiveRegion(null);
      }
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);

    // 6. Animation Loop
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Slowly float base mapGroup slightly to look alive
      const elapsed = clock.getElapsedTime();
      mapGroup.position.y = -center.y + Math.sin(elapsed * 1.5) * 0.05;

      // Parallax Tilt based on mouse pointer position
      const targetGroupRotX = baseRotX + mouse.y * 0.18;
      const targetGroupRotY = baseRotY + mouse.x * 0.22;
      mapGroup.rotation.x += (targetGroupRotX - mapGroup.rotation.x) * 0.08;
      mapGroup.rotation.y += (targetGroupRotY - mapGroup.rotation.y) * 0.08;

      // Read theme colors dynamically
      const themeBlue = getThemeHex('--color-kz-blue', 0x00afca);
      const themeYellow = getThemeHex('--color-kz-yellow', 0xfec105);

      // Perform Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(mapGroup.children);

      if (intersects.length > 0) {
        const intersectedMesh = intersects[0].object as THREE.Mesh;
        currentHoveredId = intersectedMesh.name;
        setHoveredRegionId(currentHoveredId);
      } else {
        currentHoveredId = null;
        setHoveredRegionId(null);
      }

      // Trigger hover sound once on change
      if (currentHoveredId !== prevHoveredId.current) {
        if (currentHoveredId) {
          soundCtrl.hover();
        }
        prevHoveredId.current = currentHoveredId;
      }

      // Update position, bevel color, and edge color of all meshes
      REGIONS.forEach((region) => {
        const mesh = meshes[region.id];
        const line = outlineLines[region.id];
        const mat = materials[region.id];
        if (!mesh || !mat || !line) return;

        // Target height
        const isHovered = region.id === currentHoveredId;
        const isClicked = region.id === currentClickedId;
        mesh.userData.targetZ = isHovered || isClicked ? 0.38 : 0;

        // Smooth elevation transition
        mesh.userData.currentZ += (mesh.userData.targetZ - mesh.userData.currentZ) * 0.12;
        mesh.position.z = mesh.userData.currentZ;

        // Theme colors
        const targetColor = new THREE.Color(isHovered || isClicked ? themeYellow : themeBlue);

        // Interpolate colors smoothly
        mat.color.lerp(targetColor, 0.12);
        (line.material as THREE.LineBasicMaterial).color.lerp(targetColor, 0.12);

        // Emissive properties for metallic neon glow
        mat.emissive.lerp(new THREE.Color(isHovered || isClicked ? themeYellow : 0x000000), 0.12);
        mat.emissiveIntensity = isHovered || isClicked ? 0.35 : 0;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup resources to prevent memory leaks
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);

      REGIONS.forEach((r) => {
        const mesh = meshes[r.id];
        if (mesh) {
          mesh.geometry.dispose();
          const line = outlineLines[r.id];
          if (line) {
            line.geometry.dispose();
            (line.material as THREE.Material).dispose();
          }
        }
        materials[r.id]?.dispose();
      });

      renderer.dispose();
    };
  }, [isMobile]);

  // Convert Cartesian points of a region to SVG points for mobile responsive view
  const mapPointToSvg = (x: number, y: number) => {
    // x: [-5.2, 3.8] -> map to [15, 465]
    const svgX = ((x + 5.5) / 9.5) * 440 + 15;
    // y: [-2.0, 2.6] -> map to [285, 15] (inverted vertical Y coordinate)
    const svgY = 285 - ((y + 2.0) / 4.8) * 270;
    return `${svgX.toFixed(1)},${svgY.toFixed(1)}`;
  };

  const handleSvgRegionClick = (region: Region) => {
    soundCtrl.click();
    setActiveRegion(activeRegion?.id === region.id ? null : region);
  };

  const handleSvgRegionHover = (regionId: string | null) => {
    if (regionId && regionId !== hoveredRegionId) {
      soundCtrl.hover();
    }
    setHoveredRegionId(regionId);
  };

  // Decide what to display in the Details Panel
  const displayedRegion = hoveredRegionId
    ? REGIONS.find((r) => r.id === hoveredRegionId)
    : activeRegion;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* 3D Map Viewport (Desktop) or SVG Fallback (Mobile) */}
      <div 
        ref={containerRef}
        className="col-span-1 lg:col-span-7 relative bg-[#0b0f19]/30 rounded-3xl border border-white/5 shadow-2xl p-4 md:p-6 backdrop-blur-md overflow-hidden flex flex-col justify-center items-center h-[340px] md:h-[500px]"
      >
        <div className="absolute top-4 left-6 z-20 flex items-center gap-2 pointer-events-none">
          <HelpCircle className="w-4 h-4 text-kz-blue animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            {isMobile ? t('map.hoverHint').replace('Нажми', 'Тапни') : t('map.hoverHint')}
          </span>
        </div>

        {isMobile ? (
          /* High-performance Interactive SVG Fallback for Mobile (<768px) */
          <svg 
            viewBox="0 0 480 300" 
            className="w-full h-full max-h-[280px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {REGIONS.map((region) => {
              const pointsStr = region.vertices.map((v) => mapPointToSvg(v[0], v[1])).join(' ');
              const isHovered = region.id === hoveredRegionId;
              const isActive = region.id === activeRegion?.id;
              
              return (
                <polygon
                  key={region.id}
                  points={pointsStr}
                  onClick={() => handleSvgRegionClick(region)}
                  onMouseEnter={() => handleSvgRegionHover(region.id)}
                  onMouseLeave={() => handleSvgRegionHover(null)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    fill: isHovered || isActive ? 'var(--color-kz-yellow, #fec105)' : 'var(--color-kz-blue, #00afca)',
                    fillOpacity: isHovered || isActive ? 0.4 : 0.15,
                    stroke: isHovered || isActive ? 'var(--color-kz-yellow, #fec105)' : 'var(--color-kz-blue, #00afca)',
                    strokeWidth: isHovered || isActive ? 2.5 : 1.2,
                    filter: isHovered || isActive ? 'drop-shadow(0px 0px 8px var(--color-kz-yellow))' : 'none'
                  }}
                />
              );
            })}
          </svg>
        ) : (
          /* Ultra-premium 3D WebGL Canvas for Desktops (>=768px) */
          <canvas 
            ref={canvasRef} 
            className="w-full h-[500px] cursor-none block z-10"
          />
        )}
      </div>

      {/* Futuristic Region Info Panel */}
      <div className="col-span-1 lg:col-span-5 h-full flex flex-col justify-between">
        {displayedRegion ? (
          <div className="bg-[#0b0f19]/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden text-left flex-1 min-h-[380px] flex flex-col justify-between">
            {/* Glowing neon background highlight */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-kz-yellow/10 rounded-full blur-[60px] pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                    ECONOMIC ZONE
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
                    {t(displayedRegion.titleKey)}
                  </h3>
                </div>
                {activeRegion?.id === displayedRegion.id && (
                  <button 
                    onClick={() => {
                      soundCtrl.click();
                      setActiveRegion(null);
                    }}
                    className="text-slate-500 hover:text-white p-1.5 rounded-lg border border-white/5 hover:border-white/15 transition-all cursor-none"
                    title={t('map.close')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2 mb-6">
                {displayedRegion.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[9px] md:text-[10px] font-mono px-2.5 py-1 rounded-full bg-kz-blue/5 border border-kz-blue/20 text-kz-blue uppercase tracking-wider shadow-inner"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats Progress Bars */}
              <div className="space-y-5 mb-6">
                {/* NEET Rate */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Info className="w-3 h-3 text-rose-500" />
                      {t('map.neetRate')} (15-34)
                    </span>
                    <span className="text-rose-400 font-bold text-sm">
                      {displayedRegion.neet}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-rose-500 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${(displayedRegion.neet / 12) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Self Employment Rate */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Info className="w-3 h-3 text-kz-yellow" />
                      {t('map.selfEmpRate')}
                    </span>
                    <span className="text-kz-yellow font-bold text-sm">
                      {displayedRegion.selfEmp}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-kz-yellow rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${(displayedRegion.selfEmp / 45) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Core Regional Challenge */}
            <div className="mt-auto bg-slate-950/50 rounded-2xl p-5 border border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase font-semibold block mb-2">
                {t('map.descZone')}
              </span>
              <p className="text-xs md:text-sm text-slate-300 font-sans font-light leading-relaxed">
                {t(displayedRegion.challengeKey)}
              </p>
            </div>
          </div>
        ) : (
          /* Empty/Overview State */
          <div className="bg-[#0b0f19]/30 rounded-3xl p-8 border border-white/5 text-left flex-1 min-h-[380px] flex flex-col justify-center items-center relative overflow-hidden select-none">
            {/* Glowing ambient ring */}
            <div className="absolute w-56 h-56 bg-kz-blue/5 rounded-full border border-kz-blue/10 blur-[40px] pointer-events-none animate-pulse" />
            
            <HelpCircle className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
            <h4 className="text-lg font-semibold text-slate-300 mb-2 font-display text-center">
              {t('stats.badge')}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs text-center leading-relaxed font-light">
              {t('map.hoverHint')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
