import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundAnimation = () => {
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

    // Camera setup - similar to GCode loader example
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 70);
    cameraRef.current = camera;

    // Renderer setup with transparent background for overlay effect
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1); // Very subtle background
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    // Create geometric shapes to simulate GCode paths (since we don't have the actual file)
    const createGCodeLikeGeometry = (isHorizontal: boolean) => {
      const points = [];
      
      // Create a more interesting spiral pattern
      for (let i = 0; i < 300; i++) {
        const t = (i / 300) * Math.PI * 6;
        const radius = 12 + Math.sin(t * 2) * 6; // Reduced radius for tighter pattern
        let x, y, z;
        
        if (isHorizontal) {
          x = Math.cos(t) * radius;
          y = Math.sin(t) * radius;
          z = Math.sin(t * 3) * 2;
        } else {
          x = Math.sin(t) * radius;
          y = Math.cos(t) * radius;
          z = Math.cos(t * 3) * 2;
        }
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: isHorizontal ? 0x00ffaa : 0x00aaff,
        opacity: 0.4, 
        transparent: true,
        linewidth: 1
      });
      
      return new THREE.Line(geometry, material);
    };

    // Create multiple GCode-like objects
    const objects: THREE.Line[] = [];
    
    for (let i = 0; i < 2; i++) {
      const object = createGCodeLikeGeometry(i === 0);
      object.position.set(
        (i - 0.5) * 25, // Reduced spacing between objects
        Math.sin(i) * 8, // Reduced vertical offset
        Math.cos(i) * 8  // Reduced depth offset
      );
      
      // Set initial rotation based on orientation
      if (i === 0) {
        // Horizontal orientation with slight tilt
        object.rotation.set(0.2, Math.PI / 2, 0.1);
      } else {
        // Vertical orientation with slight tilt
        object.rotation.set(Math.PI / 2, 0.1, 0.2);
      }
      
      scene.add(object);
      objects.push(object);
    }

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // More interesting rotation patterns
      objects.forEach((object, index) => {
        const time = Date.now() * 0.001;
        
        if (index === 0) {
          // Horizontal object movement
          object.rotation.x = 0.2 + Math.sin(time * 0.2) * 0.2;
          object.rotation.z = 0.1 + Math.cos(time * 0.3) * 0.2;
          object.position.y = Math.sin(time) * 3;
        } else {
          // Vertical object movement
          object.rotation.y = 0.1 + Math.sin(time * 0.2) * 0.2;
          object.rotation.z = 0.2 + Math.cos(time * 0.3) * 0.2;
          object.position.x = Math.sin(time) * 3;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
      objects.forEach(object => {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
      }}
    />
  );
};

export default BackgroundAnimation;
