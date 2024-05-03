import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import ThreeGlobe from 'three-globe';
import { Link } from 'react-router-dom';
import EarthBlueMarble from '../assets/images/three-globe-earth-blue-marble.jpeg';
import EarthTopology from '../assets/images/three-globe-earth-topology.png';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const initializeGlobe = () => {
      const N = 300;
      const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        alt: Math.random(),
        radius: Math.random() * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
      }));

      const Globe = new ThreeGlobe()
        .globeImageUrl(EarthBlueMarble)
        .bumpImageUrl(EarthTopology)
        .customLayerData(gData)
        .customThreeObject((d) => new THREE.Mesh(
          new THREE.SphereGeometry(d.radius),
          new THREE.MeshLambertMaterial({ color: d.color }),
        ))
        .customThreeObjectUpdate((obj, d) => {
          Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));
        });

      const moveSpheres = () => {
        gData.forEach((d) => d.lat += 0.2);
        Globe.customLayerData(Globe.customLayerData());
        requestAnimationFrame(moveSpheres);
      };

      moveSpheres();

      // Setup renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasRef.current.appendChild(renderer.domElement);

      // Setup scene
      const scene = new THREE.Scene();
      scene.add(Globe);
      scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

      // Setup camera
      const camera = new THREE.PerspectiveCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.position.z = 500;

      // Add camera controls
      const tbControls = new TrackballControls(camera, renderer.domElement);
      tbControls.minDistance = 101;
      tbControls.rotateSpeed = 5;
      tbControls.zoomSpeed = 0.8;

      const animate = () => {
        tbControls.update();

        // Add rotation to the globe
        Globe.rotation.y += 0.005;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    };

    initializeGlobe();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="w-screen fixed flex bg-transparent flex-col items-center justify-center top-1/3 text-white z-50">
        <div className="flex flex-col justify-center items-center w-full p-2 lg:p-0 lg:w-[500px]">
          <p className="text-lg lg:text-4xl font-extrabold text-white">Hi</p>
          <p className="text-lg text-center lg:text-4xl font-extrabold">Welcome to Location Tracker!</p>
          <p className="text-center"><i>"Cover the earth before it covers you" - - Dagobert D. Runes</i></p>
          <Link to="/signin" className="bg-green-500 w-fit text-white mt-4 p-2 border-[1px] rounded hover:border-green-500 hover:shadow transition-all duration-200 no-underline hover:no-underline">Get Started!</Link>
        </div>
      </div>
      <div className="left-0 fixed">
        <div id="globeViz" ref={canvasRef} />
      </div>
    </div>
  );
}

export default Home;
