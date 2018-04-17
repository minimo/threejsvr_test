(function () {
  'use strict';

  var width  = window.innerWidth;
  var height = window.innerHeight;

  var isFullScreen = false;

  // カメラ
  var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 10, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // レンダラ
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setViewport(0, 0, width, height);

  document.body.appendChild(renderer.domElement);

  // シーン
  var scene = new THREE.Scene();

  // キューブ
  var material = new THREE.MeshLambertMaterial({
      color: 0xff0000
  });
  var geometory = new THREE.BoxGeometry(10, 10, 10);
  var mesh = new THREE.Mesh(geometory, material);
  mesh.position.set(0, -30, -30);

  // ライト
  var light = new THREE.DirectionalLight();
  light.position.set(0, 100, 100);

  scene.add(light);
  scene.add(mesh);

  // VRControls
  var controls = new THREE.VRControls(camera);

  // VREffect
  var effect   = new THREE.VREffect(renderer);
  effect.setSize(width, height);

  // アニメーションループ
  (function loop() {
      mesh.rotation.y += 0.01;
      controls.update();
      effect.render(scene, camera);
      requestAnimationFrame(loop);
  }());

  // リサイズ
  window.addEventListener('resize', function () {
      width  = window.innerWidth;
      height = window.innerHeight;
      effect.setSize(width, height);
      renderer.setSize(width, height);
      renderer.setViewport(0, 0, width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  }, false);

  // ボタンクリック
  document.getElementById('btn').addEventListener('click', function () {
      isFullScreen = !isFullScreen;
      effect.setFullScreen(isFullScreen);
  }, false);

}());
