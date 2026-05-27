import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import "./styles.scss";

const SVG_MARKUP = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.24025 40.607C-0.283725 37.4908 -0.628754 33.7382 1.49872 30.8341C1.63405 30.8475 1.8218 30.8914 1.92177 30.9328C0.700152 33.2578 0.495333 35.7681 1.30121 38.2223C2.79105 42.7589 7.06185 46.2981 11.5716 47.5978C14.1295 48.3354 16.6666 48.2513 18.9123 46.7834C20.6313 45.6605 21.6311 43.7647 21.4202 41.6762C21.2605 40.0901 20.7301 38.6332 20.0657 37.1799C18.2649 33.2493 16.0728 30.0319 14.2526 25.9659C13.5467 24.3871 13.048 22.8265 12.8018 21.1026C12.2165 17.0135 14.1989 13.056 17.7492 11.0175C18.2308 10.7408 18.8428 10.9749 19.0489 11.4796C19.4439 12.444 19.5731 13.4986 19.5816 14.5654L19.6133 18.4009C19.6402 21.7451 21.3921 25.4514 22.8917 28.4055C24.6571 31.8826 26.4627 35.5377 26.9882 39.422C27.4905 43.1332 25.9921 46.6224 22.9941 48.8097C20.7277 50.4629 17.7577 51.4089 14.9524 50.9615C12.3811 50.5518 9.96472 49.5911 7.80555 48.1306C5.02216 46.2482 2.71668 43.6294 1.24025 40.607Z" fill="white"/>
<path d="M34.4257 1.23976C37.5432 -0.282994 41.2959 -0.628006 44.1999 1.49946C44.1865 1.63479 44.1426 1.82132 44.1012 1.92251C41.7762 0.700894 39.2647 0.496061 36.8117 1.30072C32.2739 2.79055 28.7358 7.06255 27.4362 11.5723C26.6986 14.1301 26.7827 16.666 28.2494 18.9117C29.3722 20.6308 31.2693 21.6305 33.3577 21.4208C34.9439 21.2611 36.4008 20.7308 37.8541 20.0651C41.7847 18.2644 45.0009 16.0723 49.0681 14.2533C50.647 13.5461 52.2075 13.0487 53.9314 12.8012C58.0206 12.216 61.978 14.1984 64.0165 17.7487C64.2933 18.2315 64.0592 18.8423 63.5545 19.0495C62.5901 19.4445 61.5355 19.5738 60.4687 19.5823L56.6332 19.6128C53.289 19.6396 49.5826 21.3928 46.6285 22.8924C43.1514 24.6577 39.4963 26.4633 35.6108 26.9888C31.9008 27.4899 28.4115 25.9915 26.2243 22.9935C22.7789 18.2717 23.7969 12.3952 26.9046 7.80383C28.787 5.02166 31.4058 2.71618 34.4257 1.23976Z" fill="white"/>
<path d="M73.9764 33.6854C75.5003 36.8016 75.8453 40.5542 73.7179 43.4583C73.5825 43.4449 73.3948 43.401 73.2948 43.3595C74.5164 41.0346 74.7213 38.5243 73.9154 36.0701C72.4268 31.5335 68.1548 27.9942 63.645 26.6946C61.0872 25.9582 58.55 26.0411 56.3043 27.509C54.5864 28.6319 53.5855 30.5277 53.7964 32.6162C53.9561 34.2023 54.4865 35.6592 55.1522 37.1125C56.9517 41.0443 59.1437 44.2605 60.964 48.3265C61.6711 49.9053 62.1686 51.4659 62.4148 53.191C63 57.2789 61.0176 61.2364 57.4686 63.2748C56.9858 63.5516 56.3738 63.3175 56.1677 62.8128C55.7727 61.8484 55.6435 60.7938 55.6349 59.727L55.6045 55.8915C55.5764 52.5485 53.8245 48.841 52.3249 45.8881C50.5595 42.411 48.7539 38.7547 48.2284 34.8704C47.7261 31.1592 49.2245 27.6699 52.2237 25.4827C54.5718 23.7698 57.5881 22.8981 60.5056 23.3492C63.1744 23.7625 65.7493 24.9439 67.9243 26.5215C70.4761 28.3722 72.5914 30.8508 73.9764 33.6854Z" fill="white"/>
<path d="M40.5445 73.459C37.427 74.9829 33.6756 75.328 30.7715 73.2005C30.7849 73.0652 30.8276 72.8774 30.869 72.7774C33.1952 73.9991 35.7055 74.2039 38.1585 73.398C42.6963 71.9082 46.2344 67.6374 47.534 63.1277C48.2716 60.5686 48.1875 58.0327 46.7208 55.787C45.598 54.0679 43.7021 53.0682 41.6136 53.2791C40.0275 53.4388 38.5694 53.9692 37.1173 54.6336C33.1855 56.4343 29.9693 58.6265 25.9033 60.4467C24.3232 61.1526 22.7639 61.65 21.0387 61.8975C16.9508 62.4827 12.9934 60.5003 10.9537 56.9501C10.6769 56.4685 10.911 55.8565 11.4169 55.6492C12.3801 55.2554 13.4347 55.1262 14.5027 55.1177L18.337 55.086C21.6812 55.0591 25.3888 53.3072 28.3416 51.8076C31.8188 50.0422 35.4751 48.2354 39.3594 47.7112C43.0694 47.2089 46.5587 48.7072 48.7471 51.7052C54.4553 59.5311 48.0961 69.7685 40.5445 73.459Z" fill="white"/>
</svg>`;

interface AtelierLogo3DProps {
  size?: number;
  rotationSpeed?: number;
}

const AtelierLogo3D: FC<AtelierLogo3DProps> = ({ size = 96, rotationSpeed = 0.012 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(20, 40, 50);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-30, 10, -20);
    scene.add(rimLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.5,
      emissive: 0xffffff,
      emissiveIntensity: 0.35,
    });

    const loader = new SVGLoader();
    const svgData = loader.parse(SVG_MARKUP);

    const logoGroup = new THREE.Group();
    const disposables: Array<THREE.BufferGeometry> = [];

    svgData.paths.forEach((path) => {
      const shapes = path.toShapes(true);
      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 8,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0.5,
          bevelSegments: 4,
        });
        disposables.push(geometry);
        const mesh = new THREE.Mesh(geometry, material);
        logoGroup.add(mesh);
      });
    });

    const box = new THREE.Box3().setFromObject(logoGroup);
    const center = box.getCenter(new THREE.Vector3());
    logoGroup.position.x = -center.x;
    logoGroup.position.y = -center.y;
    logoGroup.position.z = -center.z;

    const wrapper = new THREE.Group();
    wrapper.add(logoGroup);
    wrapper.scale.set(1.5, -1.5, 1.5);
    scene.add(wrapper);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      wrapper.rotation.y += rotationSpeed;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      disposables.forEach((g) => g.dispose());
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, rotationSpeed]);

  return <div ref={containerRef} className="gf-atelier-logo-3d" style={{ width: size, height: size }} />;
};

export default AtelierLogo3D;
