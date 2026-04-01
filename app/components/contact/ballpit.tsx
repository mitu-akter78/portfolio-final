"use client"

import { gsap } from 'gsap';
import { Observer } from 'gsap/dist/Observer';
import React, { useEffect, useRef } from 'react';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Timer,
  Color,
  DynamicDrawUsage,
  ExtrudeGeometry,
  InstancedMesh,
  MathUtils,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  Shape,
  ShaderChunk,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

gsap.registerPlugin(Observer);

// ─── Geometry builders ───────────────────────────────────────────────────────

function makeStarShape(points = 5, outerR = 0.9, innerR = 0.4): Shape {
  const s = new Shape();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    i === 0
      ? s.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
      : s.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  s.closePath();
  return s;
}

function makeHeartShape(): Shape {
  const s = new Shape();
  s.moveTo(0, -0.7);
  s.bezierCurveTo(0, -0.9, -0.9, -0.9, -0.9, 0.05);
  s.bezierCurveTo(-0.9, 0.65, -0.45, 0.82, 0, 1.0);
  s.bezierCurveTo(0.45, 0.82, 0.9, 0.65, 0.9, 0.05);
  s.bezierCurveTo(0.9, -0.9, 0, -0.9, 0, -0.7);
  return s;
}

function makeDiamondShape(): Shape {
  const s = new Shape();
  s.moveTo(0, 1.0);
  s.lineTo(0.65, 0.25);
  s.lineTo(0.9, -0.1);
  s.lineTo(0, -1.0);
  s.lineTo(-0.9, -0.1);
  s.lineTo(-0.65, 0.25);
  s.closePath();
  return s;
}

const EXTRUDE = {
  depth: 0.32,
  bevelEnabled: true,
  bevelThickness: 0.07,
  bevelSize: 0.06,
  bevelSegments: 3,
};

function buildGeometries(): ExtrudeGeometry[] {
  const geos = [
    new ExtrudeGeometry(makeStarShape(), EXTRUDE),
    new ExtrudeGeometry(makeHeartShape(), EXTRUDE),
    new ExtrudeGeometry(makeDiamondShape(), EXTRUDE),
  ];
  geos.forEach(g => {
    g.center();
    g.computeBoundingSphere();
    const r = g.boundingSphere?.radius ?? 1;
    g.scale(1 / r, 1 / r, 1 / r);
  });
  return geos;
}

// ─── X  (renderer / scene manager) — identical to original ──────────────────

interface XConfig {
  canvas?: HTMLCanvasElement;
  id?: string;
  rendererOptions?: Partial<WebGLRendererParameters>;
  size?: 'parent' | { width: number; height: number };
}
interface SizeData {
  width: number; height: number;
  wWidth: number; wHeight: number;
  ratio: number; pixelRatio: number;
}

class X {
  #config: XConfig;
  #postprocessing: any;
  #resizeObserver?: ResizeObserver;
  #intersectionObserver?: IntersectionObserver;
  #resizeTimer?: number;
  #animationFrameId: number = 0;
  #clock: Timer = new Timer();
  #animationState = { elapsed: 0, delta: 0 };
  #isAnimating = false;
  #isVisible   = false;

  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: Scene;
  renderer!: WebGLRenderer;
  size: SizeData = { width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0 };

  render: () => void = this.#render.bind(this);
  onBeforeRender: (s: { elapsed:number; delta:number }) => void = () => {};
  onAfterRender:  (s: { elapsed:number; delta:number }) => void = () => {};
  onAfterResize:  (s: SizeData) => void = () => {};
  isDisposed = false;

  constructor(config: XConfig) {
    this.#config = { ...config };
    this.#initCamera(); this.#initScene(); this.#initRenderer();
    this.resize(); this.#initObservers();
  }

  #initCamera() { this.camera = new PerspectiveCamera(); this.cameraFov = this.camera.fov; }
  #initScene()  { this.scene  = new Scene(); }

  #initRenderer() {
    if (this.#config.canvas) { this.canvas = this.#config.canvas; }
    else if (this.#config.id) { const el = document.getElementById(this.#config.id); if (el instanceof HTMLCanvasElement) this.canvas = el; }
    this.canvas!.style.display = 'block';
    this.renderer = new WebGLRenderer({ canvas: this.canvas, powerPreference: 'high-performance', ...(this.#config.rendererOptions ?? {}) });
    this.renderer.outputColorSpace = SRGBColorSpace;
  }

  #initObservers() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener('resize', this.#onResize.bind(this));
      if (this.#config.size === 'parent' && this.canvas.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
        this.#resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), { root:null, rootMargin:'0px', threshold:0 });
    this.#intersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
  }

  #onResize() { if (this.#resizeTimer) clearTimeout(this.#resizeTimer); this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100); }

  resize() {
    let w: number, h: number;
    if (this.#config.size instanceof Object) { w = (this.#config.size as any).width; h = (this.#config.size as any).height; }
    else if (this.#config.size === 'parent' && this.canvas.parentNode) { w = (this.canvas.parentNode as HTMLElement).offsetWidth; h = (this.canvas.parentNode as HTMLElement).offsetHeight; }
    else { w = window.innerWidth; h = window.innerHeight; }
    this.size.width = w; this.size.height = h; this.size.ratio = w / h;
    this.#updateCamera(); this.#updateRenderer(); this.onAfterResize(this.size);
  }

  #updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if      (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) this.#adjustFov(this.cameraMinAspect);
      else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) this.#adjustFov(this.cameraMaxAspect);
      else this.camera.fov = this.cameraFov;
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  #adjustFov(aspect: number) {
    const t = Math.tan(MathUtils.degToRad(this.cameraFov / 2));
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(t / (this.camera.aspect / aspect)));
  }

  updateWorldSize() {
    const fovRad = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
    this.size.wWidth  = this.size.wHeight * this.camera.aspect;
  }

  #updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#postprocessing?.setSize(this.size.width, this.size.height);
    let pr = window.devicePixelRatio;
    if (this.maxPixelRatio && pr > this.maxPixelRatio) pr = this.maxPixelRatio;
    else if (this.minPixelRatio && pr < this.minPixelRatio) pr = this.minPixelRatio;
    this.renderer.setPixelRatio(pr); this.size.pixelRatio = pr;
  }

  get postprocessing() { return this.#postprocessing; }
  set postprocessing(v: any) { this.#postprocessing = v; this.render = v.render.bind(v); }

  #onIntersection(e: IntersectionObserverEntry[]) { this.#isAnimating = e[0].isIntersecting; this.#isAnimating ? this.#startAnimation() : this.#stopAnimation(); }
  #onVisibilityChange() { if (this.#isAnimating) { document.hidden ? this.#stopAnimation() : this.#startAnimation(); } }

  #startAnimation() {
    if (this.#isVisible) return;
    const loop = () => {
      this.#animationFrameId = requestAnimationFrame(loop);
      this.#clock.update();
      this.#animationState.delta    = this.#clock.getDelta();
      this.#animationState.elapsed += this.#animationState.delta;
      this.onBeforeRender(this.#animationState);
      this.render();
      this.onAfterRender(this.#animationState);
    };
    this.#isVisible = true; loop();
  }

  #stopAnimation() { if (this.#isVisible) { cancelAnimationFrame(this.#animationFrameId); this.#isVisible = false; } }
  #render() { this.renderer.render(this.scene, this.camera); }

  clear() {
    this.scene.traverse(obj => {
      if ((obj as any).isMesh) {
        const mat = (obj as any).material;
        if (mat) { Object.keys(mat).forEach(k => { if (mat[k]?.dispose) mat[k].dispose(); }); mat.dispose(); }
        (obj as any).geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    window.removeEventListener('resize', this.#onResize.bind(this));
    this.#resizeObserver?.disconnect(); this.#intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.#onVisibilityChange.bind(this));
    this.#stopAnimation(); this.clear(); this.#postprocessing?.dispose();
    this.renderer.dispose(); this.renderer.forceContextLoss(); this.isDisposed = true;
  }
}

// ─── W  (physics) — identical to original ────────────────────────────────────

interface WConfig {
  count: number;
  maxX: number; maxY: number; maxZ: number;
  maxSize: number; minSize: number; size0: number;
  gravity: number; friction: number; wallBounce: number; maxVelocity: number;
  controlSphere0?: boolean; followCursor?: boolean;
}

class W {
  config: WConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: Vector3 = new Vector3();

  constructor(config: WConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData     = new Float32Array(config.count).fill(1);
    this.#init(); this.setSizes();
  }

  #init() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const b = 3 * i;
      positionData[b]     = MathUtils.randFloatSpread(2 * config.maxX);
      positionData[b + 1] = MathUtils.randFloatSpread(2 * config.maxY);
      positionData[b + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
  }

  update(di: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this;
    let start = 0;
    if (config.controlSphere0) {
      start = 1;
      new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0);
      new Vector3().toArray(velocityData, 0);
    }
    for (let i = start; i < config.count; i++) {
      const b = 3 * i;
      const pos = new Vector3().fromArray(positionData, b);
      const vel = new Vector3().fromArray(velocityData, b);
      vel.y -= di.delta * config.gravity * sizeData[i];
      vel.multiplyScalar(config.friction);
      vel.clampLength(0, config.maxVelocity);
      pos.add(vel);
      pos.toArray(positionData, b); vel.toArray(velocityData, b);
    }
    for (let i = start; i < config.count; i++) {
      const b   = 3 * i;
      const pos = new Vector3().fromArray(positionData, b);
      const vel = new Vector3().fromArray(velocityData, b);
      const ri  = sizeData[i];
      for (let j = i + 1; j < config.count; j++) {
        const ob   = 3 * j;
        const op   = new Vector3().fromArray(positionData, ob);
        const ov   = new Vector3().fromArray(velocityData, ob);
        const diff = new Vector3().copy(op).sub(pos);
        const dist = diff.length();
        const sum  = ri + sizeData[j];
        if (dist < sum) {
          const corr = diff.normalize().multiplyScalar(0.5 * (sum - dist));
          const vc   = corr.clone().multiplyScalar(Math.max(vel.length(), 1));
          pos.sub(corr); vel.sub(vc); pos.toArray(positionData, b); vel.toArray(velocityData, b);
          op.add(corr); ov.add(corr.clone().multiplyScalar(Math.max(ov.length(), 1)));
          op.toArray(positionData, ob); ov.toArray(velocityData, ob);
        }
      }
      if (config.controlSphere0) {
        const cp   = new Vector3().fromArray(positionData, 0);
        const diff = new Vector3().copy(cp).sub(pos);
        const d    = diff.length();
        const sum  = ri + sizeData[0];
        if (d < sum) { const c = diff.normalize().multiplyScalar(sum - d); pos.sub(c); vel.sub(c.clone().multiplyScalar(Math.max(vel.length(), 2))); }
      }
      if (Math.abs(pos.x) + ri > config.maxX) { pos.x = Math.sign(pos.x) * (config.maxX - ri); vel.x = -vel.x * config.wallBounce; }
      if (config.gravity === 0) { if (Math.abs(pos.y) + ri > config.maxY) { pos.y = Math.sign(pos.y) * (config.maxY - ri); vel.y = -vel.y * config.wallBounce; } }
      else if (pos.y - ri < -config.maxY) { pos.y = -config.maxY + ri; vel.y = -vel.y * config.wallBounce; }
      const mb = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pos.z) + ri > mb) { pos.z = Math.sign(pos.z) * (config.maxZ - ri); vel.z = -vel.z * config.wallBounce; }
      pos.toArray(positionData, b); vel.toArray(velocityData, b);
    }
  }
}

// ─── Y  (material) — identical to original ───────────────────────────────────

class Y extends MeshPhysicalMaterial {
  uniforms: Record<string, { value: any }> = {
    thicknessDistortion:  { value: 0.1 },
    thicknessAmbient:     { value: 0 },
    thicknessAttenuation: { value: 0.1 },
    thicknessPower:       { value: 2 },
    thicknessScale:       { value: 10 },
  };
  defines: { USE_UV: string };
  onBeforeCompile2?: (s: any) => void;

  constructor(params: any) {
    super(params);
    this.defines = { USE_UV: '' };
    this.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader = `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('void main() {', `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor.rgb;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {
      `);
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_fragment_begin>',
        ShaderChunk.lights_fragment_begin.replaceAll(
          'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
          `RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
           RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);`
        )
      );
      this.onBeforeCompile2?.(shader);
    };
  }
}

// ─── Default config ───────────────────────────────────────────────────────────

const DefaultConfig = {
  count: 320,
  colors: [0xff2d6f, 0xf5a623, 0x4a90e2, 0x50e3c2, 0xb388ff, 0xff6b6b],
  ambientColor: 0xffffff,
  ambientIntensity: 0,
  lightIntensity: 4,
  materialParams: { metalness: 0, roughness: 0, clearcoat: 1, clearcoatRoughness: 0 },
  minSize: 0.4, maxSize: 0.6, size0: 1,
  gravity: 0.5, friction: 0.9975, wallBounce: 0.95, maxVelocity: 0.15,
  maxX: 5, maxY: 5, maxZ: 2,
  controlSphere0: false, followCursor: true,
};

// ─── Z  (shapes) — replaces SphereGeometry with per-type InstancedMeshes ─────
// Physics, lights, colour gradient: identical to original.
// Only change: 3 InstancedMeshes (star/heart/diamond) instead of 1 sphere mesh.

const _dummy = new Object3D();

class Z {
  config: typeof DefaultConfig;
  physics: W;
  meshes: InstancedMesh[];
  ambientLight: AmbientLight;
  light: PointLight;

  private shapeType: Uint8Array;   // per physics index → 0/1/2
  private localIdx:  Uint16Array;  // per physics index → index within that mesh
  private rotations: Float32Array;
  private angVels:   Float32Array;

  constructor(renderer: WebGLRenderer, params: Partial<typeof DefaultConfig> = {}) {
    const config = { ...DefaultConfig, ...params };
    this.config = config;

    const envTex = new PMREMGenerator(renderer).fromScene(new RoomEnvironment()).texture;
    const geos   = buildGeometries();

    // distribute instances across shape types
    const perShape    = [0, 0, 0];
    this.shapeType    = new Uint8Array(config.count);
    this.localIdx     = new Uint16Array(config.count);
    this.shapeType[0] = 0; this.localIdx[0] = perShape[0]++;   // cursor ghost

    for (let i = 1; i < config.count; i++) {
      const t = Math.floor(Math.random() * 3) as 0|1|2;
      this.shapeType[i] = t;
      this.localIdx[i]  = perShape[t]++;
    }

    // build colour gradient — same logic as original Z.setColors
    const colorObjs = config.colors.map(c => new Color(c));
    const getColor  = (ratio: number, out = new Color()) => {
      const sc  = Math.max(0, Math.min(1, ratio)) * (colorObjs.length - 1);
      const idx = Math.min(Math.floor(sc), colorObjs.length - 2);
      const a   = sc - idx;
      const s   = colorObjs[idx], e = colorObjs[idx + 1];
      out.r = s.r + a*(e.r-s.r); out.g = s.g + a*(e.g-s.g); out.b = s.b + a*(e.b-s.b);
      return out;
    };

    // one InstancedMesh per shape, same Y material as original
    this.meshes = geos.map((geo, si) => {
      const mat  = new Y({ envMap: envTex, ...config.materialParams });
      mat.envMapRotation.x = -Math.PI / 2;
      const mesh = new InstancedMesh(geo, mat, Math.max(perShape[si], 1));
      mesh.instanceMatrix.setUsage(DynamicDrawUsage);
      return mesh;
    });

    // per-instance colours
    for (let i = 0; i < config.count; i++) {
      this.meshes[this.shapeType[i]].setColorAt(this.localIdx[i], getColor(i / config.count));
    }
    this.meshes.forEach(m => { if (m.instanceColor) m.instanceColor.needsUpdate = true; });

    // lights — identical to original
    this.ambientLight = new AmbientLight(config.ambientColor, config.ambientIntensity);
    this.light        = new PointLight(new Color(config.colors[0]), config.lightIntensity);

    // rotation state (damped spin — fixes continuous rotation)
    this.rotations = new Float32Array(3 * config.count).fill(0);
    this.angVels   = new Float32Array(3 * config.count).fill(0);
    for (let i = 1; i < config.count; i++) {
      const b = 3 * i;
      this.angVels[b]     = MathUtils.randFloatSpread(0.04);
      this.angVels[b + 1] = MathUtils.randFloatSpread(0.04);
      this.angVels[b + 2] = MathUtils.randFloatSpread(0.04);
    }

    this.physics = new W(config);
  }

  addToScene(scene: Scene) {
    this.meshes.forEach(m => scene.add(m));
    scene.add(this.ambientLight);
    scene.add(this.light);
  }

  removeFromScene(scene: Scene) {
    this.meshes.forEach(m => scene.remove(m));
    scene.remove(this.ambientLight);
    scene.remove(this.light);
  }

  update(di: { delta: number }) {
    this.physics.update(di);

    for (let i = 0; i < this.config.count; i++) {
      const b  = 3 * i;
      const si = this.shapeType[i];
      const li = this.localIdx[i];

      if (i > 0) {
        // damped angular velocity — shapes slow to a natural tilt
        this.angVels[b]     *= 0.98;
        this.angVels[b + 1] *= 0.98;
        this.angVels[b + 2] *= 0.98;
        this.rotations[b]       += this.angVels[b];
        this.rotations[b + 1]   += this.angVels[b + 1];
        this.rotations[b + 2]   += this.angVels[b + 2];
      }

      _dummy.position.fromArray(this.physics.positionData, b);
      _dummy.rotation.set(this.rotations[b], this.rotations[b + 1], this.rotations[b + 2]);
      _dummy.scale.setScalar(i === 0 && !this.config.followCursor ? 0 : this.physics.sizeData[i]);
      _dummy.updateMatrix();
      this.meshes[si].setMatrixAt(li, _dummy.matrix);

      if (i === 0) this.light.position.copy(_dummy.position);
    }

    this.meshes.forEach(m => { m.instanceMatrix.needsUpdate = true; });
  }

  dispose() {
    this.meshes.forEach(m => { m.geometry.dispose(); (m.material as MeshPhysicalMaterial).dispose(); });
  }
}

// ─── Pointer helpers — identical to original ─────────────────────────────────

interface PointerData {
  position: Vector2; nPosition: Vector2;
  hover: boolean; touching: boolean;
  onEnter: (d: PointerData) => void;
  onMove:  (d: PointerData) => void;
  onClick: (d: PointerData) => void;
  onLeave: (d: PointerData) => void;
  dispose?: () => void;
}

let _globalPointerActive = false;
const _pointerPos = new Vector2();
const _pointerMap = new Map<HTMLElement, PointerData>();

function _isInside(r: DOMRect) { return _pointerPos.x >= r.left && _pointerPos.x <= r.left+r.width && _pointerPos.y >= r.top && _pointerPos.y <= r.top+r.height; }
function _updatePD(d: PointerData, r: DOMRect) { d.position.set(_pointerPos.x-r.left, _pointerPos.y-r.top); d.nPosition.set((d.position.x/r.width)*2-1, (-d.position.y/r.height)*2+1); }

function _onPMove(e: PointerEvent)  { _pointerPos.set(e.clientX,e.clientY); for(const[el,d]of _pointerMap){const r=el.getBoundingClientRect();if(_isInside(r)){_updatePD(d,r);if(!d.hover){d.hover=true;d.onEnter(d);}d.onMove(d);}else if(d.hover&&!d.touching){d.hover=false;d.onLeave(d);}} }
function _onPLeave()                { for(const d of _pointerMap.values())if(d.hover){d.hover=false;d.onLeave(d);} }
function _onPClick(e: PointerEvent) { _pointerPos.set(e.clientX,e.clientY); for(const[el,d]of _pointerMap){const r=el.getBoundingClientRect();_updatePD(d,r);if(_isInside(r))d.onClick(d);} }
function _onTStart(e: TouchEvent)   { if(e.touches.length>0){e.preventDefault();_pointerPos.set(e.touches[0].clientX,e.touches[0].clientY);for(const[el,d]of _pointerMap){const r=el.getBoundingClientRect();if(_isInside(r)){d.touching=true;_updatePD(d,r);if(!d.hover){d.hover=true;d.onEnter(d);}d.onMove(d);}}} }
function _onTMove(e: TouchEvent)    { if(e.touches.length>0){e.preventDefault();_pointerPos.set(e.touches[0].clientX,e.touches[0].clientY);for(const[el,d]of _pointerMap){const r=el.getBoundingClientRect();_updatePD(d,r);if(_isInside(r)){if(!d.hover){d.hover=true;d.touching=true;d.onEnter(d);}d.onMove(d);}else if(d.hover&&d.touching)d.onMove(d);}} }
function _onTEnd()                  { for(const[,d]of _pointerMap)if(d.touching){d.touching=false;if(d.hover){d.hover=false;d.onLeave(d);}} }

function createPointerData(opts: Partial<PointerData> & { domElement: HTMLElement }): PointerData {
  const data: PointerData = { position:new Vector2(), nPosition:new Vector2(), hover:false, touching:false, onEnter:()=>{}, onMove:()=>{}, onClick:()=>{}, onLeave:()=>{}, ...opts };
  if (!_pointerMap.has(opts.domElement)) {
    _pointerMap.set(opts.domElement, data);
    if (!_globalPointerActive) {
      document.body.addEventListener('pointermove', _onPMove as EventListener);
      document.body.addEventListener('pointerleave', _onPLeave as EventListener);
      document.body.addEventListener('click', _onPClick as EventListener);
      document.body.addEventListener('touchstart', _onTStart as EventListener, { passive:false });
      document.body.addEventListener('touchmove',  _onTMove  as EventListener, { passive:false });
      document.body.addEventListener('touchend',   _onTEnd   as EventListener, { passive:false });
      document.body.addEventListener('touchcancel',_onTEnd   as EventListener, { passive:false });
      _globalPointerActive = true;
    }
  }
  data.dispose = () => {
    _pointerMap.delete(opts.domElement);
    if (_pointerMap.size === 0) {
      document.body.removeEventListener('pointermove', _onPMove as EventListener);
      document.body.removeEventListener('pointerleave', _onPLeave as EventListener);
      document.body.removeEventListener('click', _onPClick as EventListener);
      document.body.removeEventListener('touchstart', _onTStart as EventListener);
      document.body.removeEventListener('touchmove',  _onTMove  as EventListener);
      document.body.removeEventListener('touchend',   _onTEnd   as EventListener);
      document.body.removeEventListener('touchcancel',_onTEnd   as EventListener);
      _globalPointerActive = false;
    }
  };
  return data;
}

// ─── createShapesPit — mirrors createBallpit exactly ─────────────────────────

function createShapesPit(canvas: HTMLCanvasElement, config: any = {}) {
  const three = new X({ canvas, size:'parent', rendererOptions:{ antialias:true, alpha:true } });
  three.renderer.toneMapping = ACESFilmicToneMapping;
  three.renderer.debug.checkShaderErrors = false;
  three.camera.position.set(0, 0, 20);
  three.camera.lookAt(0, 0, 0);
  three.cameraMaxAspect = 1.5;
  three.resize();

  let shapes: Z;
  let isPaused = false;

  function initialize(cfg: any) {
    if (shapes) { shapes.removeFromScene(three.scene); shapes.dispose(); three.clear(); }
    shapes = new Z(three.renderer, cfg);
    shapes.addToScene(three.scene);
  }

  initialize(config);

  const raycaster = new Raycaster();
  const plane     = new Plane(new Vector3(0, 0, 1), 0);
  const hit       = new Vector3();

  canvas.style.touchAction = 'none';
  canvas.style.userSelect  = 'none';
  (canvas.style as any).webkitUserSelect = 'none';

  const pd = createPointerData({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pd.nPosition, three.camera);
      three.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, hit);
      shapes.physics.center.copy(hit);
      shapes.config.controlSphere0 = true;
    },
    onLeave() { shapes.config.controlSphere0 = false; },
  });

  three.onBeforeRender = di   => { if (!isPaused) shapes.update(di); };
  three.onAfterResize  = size => { shapes.config.maxX = size.wWidth / 2; shapes.config.maxY = size.wHeight / 2; };

  return {
    three,
    get shapes() { return shapes; },
    setCount(n: number) { initialize({ ...shapes.config, count: n }); },
    togglePause() { isPaused = !isPaused; },
    dispose() { pd.dispose?.(); shapes.dispose(); three.dispose(); },
  };
}

// ─── React component ──────────────────────────────────────────────────────────

interface ShapesPitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  [key: string]: any;
}

const ShapesPit: React.FC<ShapesPitProps> = ({ className = '', followCursor = true, count = 320, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pit = createShapesPit(canvas, { followCursor, count, ...props });
    return () => pit.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className={`${className} w-full h-full`} ref={canvasRef} />;
};

export default ShapesPit;