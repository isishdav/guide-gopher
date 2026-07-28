import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Animated 3D silk curtain: a subdivided plane displaced by layered sine waves
 * and shaded with a soft gold rim light. Purely decorative.
 */

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
  precision highp float;
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

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uGold: { value: new THREE.Color("#c6a36a") },
      uDark: { value: new THREE.Color("#0a0a0a") },
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
      <planeGeometry args={[viewport.width, viewport.height, 160, 90]} />
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
  const moteTexture = useMemo(makeMoteTexture, []);

  const positions = useMemo(() => {

    const count = 140;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.random() * 2.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.z = Math.sin(t * 0.05) * 0.15;
    points.current.position.y = Math.sin(t * 0.12) * 0.35;
    points.current.position.x = state.pointer.x * 0.25;
  });

  return (
    <points ref={points} scale={[viewport.width / 12, viewport.height / 7, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#e0c58f"
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

const CurtainScene = () => (
  <Canvas
    className="!absolute inset-0"
    dpr={[1, 1.5]}
    gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    camera={{ position: [0, 0, 5], fov: 45 }}
  >
    <Curtain />
    <Motes />
  </Canvas>
);

export default CurtainScene;
