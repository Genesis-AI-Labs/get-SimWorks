
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJsAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 70);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Create animated geometric shapes instead of GCode
    const geometries = [
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.SphereGeometry(8, 32, 16),
      new THREE.ConeGeometry(6, 15, 8),
      new THREE.TorusGeometry(8, 3, 16, 100)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x00ff88, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0xff4444, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0x4488ff, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0xffaa00, wireframe: true })
    ];

    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      mesh.position.set((index - 1.5) * 25, 0, 0);
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate meshes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index + 1);
        mesh.rotation.y += 0.01 * (index + 1);
        mesh.position.y = Math.sin(Date.now() * 0.001 + index) * 5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Clean up geometries and materials
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-96 relative overflow-hidden rounded-3xl border border-gray-800"
      style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
    />
  );
};

export default ThreeJsAnimation;
