import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Animated 3D silk curtain: a subdivided plane displaced by layered sine waves
 * and shaded with a soft gold rim light. Purely decorative.
 *
 * Quality is tiered: an initial guess from device capabilities, then a runtime
 * FPS monitor that steps the tier down if frames are consistently slow.
 */

type QualityLevel = "high" | "medium" | "low";

interface QualityPreset {
  /** planeGeometry width/height segments */
  segments: [number, number];
  /** number of floating dust motes */
  motes: number;
  /** max device pixel ratio */
  dpr: number;
}

const QUALITY_PRESETS: Record<QualityLevel, QualityPreset> = {
  high: { segments: [160, 90], motes: 140, dpr: 1.5 },
  medium: { segments: [96, 54], motes: 70, dpr: 1.25 },
  low: { segments: [48, 28], motes: 28, dpr: 1 },
};

const QUALITY_ORDER: QualityLevel[] = ["high", "medium", "low"];

/** Cheap capability sniff so weak devices never start at the top tier. */
const detectInitialQuality = (): QualityLevel => {
  if (typeof window === "undefined") return "medium";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  if (cores <= 4 || memory <= 4 || width < 1024) return "low";
  // Lots of pixels to push (retina / 4K) is as costly as a slow GPU.
  if (cores <= 8 || memory <= 8 || width * dpr > 3000) return "medium";
  return "high";
};

const QualityContext = createContext<QualityPreset>(QUALITY_PRESETS.medium);
const useQuality = () => useContext(QualityContext);

/**
 * Watches frame times and reports when the scene is too heavy.
 * Samples in one-second windows and only downgrades after two bad windows
 * in a row, so a single GC pause or tab hiccup doesn't drop the quality.
 */
const PerformanceMonitor = ({ onDowngrade }: { onDowngrade: () => void }) => {
  const frames = useRef(0);
  const elapsed = useRef(0);
  const badWindows = useRef(0);

  useFrame((_, delta) => {
    // Ignore huge deltas (tab was backgrounded) — they aren't real slowdowns.
    if (delta > 0.5) return;

    frames.current += 1;
    elapsed.current += delta;

    if (elapsed.current < 1) return;

    const fps = frames.current / elapsed.current;
    frames.current = 0;
    elapsed.current = 0;

    if (fps < 40) {
      badWindows.current += 1;
      if (badWindows.current >= 2) {
        badWindows.current = 0;
        onDowngrade();
      }
    } else {
      badWindows.current = 0;
    }
  });

  return null;
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vNormalW;

  float fold(vec2 p, float t) {
    float w =
      sin(p.x * 9.0 + t * 0.65) * 0.30 +
      sin(p.x * 17.0 - t * 0.42) * 0.14 +
      sin(p.x * 4.0 + p.y * 1.6 + t * 0.30) * 0.22;
    // curtains hang: less movement at the top, more at the hem
    return w * smoothstep(0.0, 1.0, 1.0 - p.y);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime + uPointer.x * 1.2;
    float w = fold(uv, t);
    pos.z += w;
    pos.z += uPointer.y * 0.15 * (1.0 - uv.y);

    // cheap analytic normal from the displacement field
    float e = 0.002;
    float dx = fold(uv + vec2(e, 0.0), t) - w;
    float dy = fold(uv + vec2(0.0, e), t) - w;
    vNormalW = normalize(vec3(-dx / e, -dy / e, 1.0));
    vWave = w;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uGold;
  uniform vec3 uDark;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vNormalW;

  void main() {
    vec3 lightDir = normalize(vec3(0.55, 0.75, 0.85));
    float diff = clamp(dot(normalize(vNormalW), lightDir), 0.0, 1.0);

    // silk sheen: tight specular band riding the folds
    float sheen = pow(diff, 7.0);
    float shimmer = 0.5 + 0.5 * sin(vUv.x * 26.0 + uTime * 0.5 + vWave * 5.0);

    vec3 color = mix(uDark, uGold, diff * 0.55 + sheen * 0.7);
    color += uGold * sheen * shimmer * 0.35;

    // vertical falloff so the curtain melts into the page background
    float vertical = smoothstep(0.0, 0.45, vUv.y);
    float edges = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
    float alpha = vertical * edges * 0.55;

    gl_FragColor = vec4(color, alpha);
  }
`;

const Curtain = () => {
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();
  const { segments } = useQuality();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uGold: { value: new THREE.Color("#ffffff") },
      uDark: { value: new THREE.Color("#e9e8e5") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    uniforms.uTime.value += delta;
    pointer.current.lerp(state.pointer, 0.05);
    uniforms.uPointer.value.copy(pointer.current);
  });

  return (
    <mesh position={[0, 0, 0]} scale={[1.25, 1.25, 1]}>
      <planeGeometry args={[viewport.width, viewport.height, segments[0], segments[1]]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const makeMoteTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
};

const Motes = () => {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const { motes: count } = useQuality();
  const moteTexture = useMemo(makeMoteTexture, []);

  useEffect(() => () => moteTexture.dispose(), [moteTexture]);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.random() * 2.5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.z = Math.sin(t * 0.05) * 0.15;
    points.current.position.y = Math.sin(t * 0.12) * 0.35;
    points.current.position.x = state.pointer.x * 0.25;
  });

  return (
    // key forces a fresh geometry when the mote count changes with quality
    <points key={count} ref={points} scale={[viewport.width / 12, viewport.height / 7, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#bdbbb6"
        map={moteTexture}
        alphaMap={moteTexture}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CurtainScene = () => {
  const [level, setLevel] = useState<QualityLevel>(detectInitialQuality);
  const preset = QUALITY_PRESETS[level];

  const downgrade = () =>
    setLevel((current) => {
      const next = QUALITY_ORDER[QUALITY_ORDER.indexOf(current) + 1];
      return next ?? current;
    });

  return (
    <QualityContext.Provider value={preset}>
      <Canvas
        className="!absolute inset-0"
        dpr={[1, preset.dpr]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Curtain />
        <Motes />
        {level !== "low" && <PerformanceMonitor onDowngrade={downgrade} />}
      </Canvas>
    </QualityContext.Provider>
  );
};

export default CurtainScene;
