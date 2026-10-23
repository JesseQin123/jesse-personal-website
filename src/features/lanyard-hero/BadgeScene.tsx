import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { FACE_HEIGHT, FACE_WIDTH, drawBadgeBack, drawBadgeFront, loadBadgeFonts } from "./badgeFace";

// World units. Camera sits at z=13 with a 25° fov, so the view is ~5.76 units tall.
const HOLDER_W = 1.715;
const HOLDER_H = 2.78;
const PAPER_W = 1.49;
const PAPER_H = (PAPER_W * FACE_HEIGHT) / FACE_WIDTH;
const SLOT_Y = HOLDER_H / 2 - 0.081 * HOLDER_H;
const PAPER_Y = HOLDER_H / 2 - 0.159 * HOLDER_H - PAPER_H / 2;
const CLIP_Z = 0.03;
const ATTACH_Y = HOLDER_H / 2 + 0.42;
const ANCHOR_Y = 4.2;
const SEGMENT = 0.96;
const STRAP_WIDTH = 0.115;
const STRAP_SPREAD = 0.95;
const RIBBON_STEPS = 48;
// Idle breeze: sideways push, a little depth sway and a slow twist.
const WIND_FORCE = 0.55;
const WIND_TWIST = 0.018;

type BadgeSceneProps = {
  active: boolean;
  reducedMotion: boolean;
};

function roundedRect(path: THREE.Path, cx: number, cy: number, w: number, h: number, r: number) {
  const l = cx - w / 2;
  const b = cy - h / 2;
  const rt = cx + w / 2;
  const t = cy + h / 2;
  path.moveTo(l + r, b);
  path.lineTo(rt - r, b);
  path.quadraticCurveTo(rt, b, rt, b + r);
  path.lineTo(rt, t - r);
  path.quadraticCurveTo(rt, t, rt - r, t);
  path.lineTo(l + r, t);
  path.quadraticCurveTo(l, t, l, t - r);
  path.lineTo(l, b + r);
  path.quadraticCurveTo(l, b, l + r, b);
  return path;
}

function createHolderGeometry() {
  const shape = roundedRect(new THREE.Shape(), 0, 0, HOLDER_W, HOLDER_H, 0.09) as THREE.Shape;
  const holeRadius = 0.04 * HOLDER_W;
  for (const x of [-0.33 * HOLDER_W, 0.33 * HOLDER_W]) {
    const hole = new THREE.Path();
    hole.absarc(x, SLOT_Y, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  shape.holes.push(roundedRect(new THREE.Path(), 0, SLOT_Y, 0.234 * HOLDER_W, 0.031 * HOLDER_H, 0.04));
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.018,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 3,
    curveSegments: 28,
  });
  geometry.translate(0, 0, -0.009);
  return geometry;
}

// Thicker, frostier plastic where the sleeve is welded: outer edge, punched holes,
// the slot and the pocket seam. The flat face stays almost clear.
function createRimGeometry() {
  const ring = (outer: THREE.Shape, inner: THREE.Path) => {
    outer.holes.push(inner);
    return outer;
  };
  const holeRadius = 0.04 * HOLDER_W;
  const shapes = [
    ring(
      roundedRect(new THREE.Shape(), 0, 0, HOLDER_W, HOLDER_H, 0.09) as THREE.Shape,
      roundedRect(new THREE.Path(), 0, 0, HOLDER_W - 0.05, HOLDER_H - 0.05, 0.07),
    ),
    ring(
      roundedRect(new THREE.Shape(), 0, PAPER_Y, PAPER_W + 0.05, PAPER_H + 0.05, 0.02) as THREE.Shape,
      roundedRect(new THREE.Path(), 0, PAPER_Y, PAPER_W + 0.034, PAPER_H + 0.034, 0.015),
    ),
    ring(
      roundedRect(new THREE.Shape(), 0, SLOT_Y, 0.234 * HOLDER_W + 0.03, 0.031 * HOLDER_H + 0.03, 0.055) as THREE.Shape,
      roundedRect(new THREE.Path(), 0, SLOT_Y, 0.234 * HOLDER_W, 0.031 * HOLDER_H, 0.04),
    ),
    ...[-0.33 * HOLDER_W, 0.33 * HOLDER_W].map((x) => {
      const outer = new THREE.Shape();
      outer.absarc(x, SLOT_Y, holeRadius + 0.016, 0, Math.PI * 2, false);
      const inner = new THREE.Path();
      inner.absarc(x, SLOT_Y, holeRadius, 0, Math.PI * 2, true);
      return ring(outer, inner);
    }),
  ];
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 0.022,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.004,
    bevelSegments: 3,
    curveSegments: 28,
  });
  geometry.translate(0, 0, -0.011);
  return geometry;
}

function createWeaveTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#5A5D5B";
  ctx.fillRect(0, 0, 64, 256);
  for (let y = 0; y < 256; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.12)";
    ctx.fillRect(0, y, 64, 2);
  }
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  ctx.fillRect(5, 0, 2, 256);
  ctx.fillRect(57, 0, 2, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRibbonGeometry() {
  const geometry = new THREE.BufferGeometry();
  const count = (RIBBON_STEPS + 1) * 2;
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(count * 2), 2));
  const index: number[] = [];
  for (let i = 0; i < RIBBON_STEPS; i++) {
    const a = i * 2;
    index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  geometry.setIndex(index);
  return geometry;
}

const tmpPoint = new THREE.Vector3();
const tmpNext = new THREE.Vector3();
const tmpTangent = new THREE.Vector3();
const tmpSide = new THREE.Vector3();
const tmpNormal = new THREE.Vector3();
const FORWARD = new THREE.Vector3(0, 0, 1);

// One arm of the V: follows the rope curve and fans out sideways towards the top,
// the way a lanyard opens up around the neck above the frame.
function updateRibbon(geometry: THREE.BufferGeometry, curve: THREE.CatmullRomCurve3, side: -1 | 1, spread: number) {
  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  const normal = geometry.getAttribute("normal") as THREE.BufferAttribute;
  const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
  const length = curve.getLength();
  const offset = (t: number, out: THREE.Vector3) => {
    curve.getPointAt(t, out);
    out.x += side * spread * Math.pow(t, 1.35);
    out.z += side * 0.004;
    return out;
  };
  for (let i = 0; i <= RIBBON_STEPS; i++) {
    const t = i / RIBBON_STEPS;
    offset(t, tmpPoint);
    offset(Math.min(1, t + 1 / RIBBON_STEPS), tmpNext);
    if (i === RIBBON_STEPS) offset(t - 1 / RIBBON_STEPS, tmpNext).sub(tmpPoint).negate().add(tmpPoint);
    tmpTangent.copy(tmpNext).sub(tmpPoint).normalize();
    tmpSide.crossVectors(tmpTangent, FORWARD).normalize();
    tmpNormal.crossVectors(tmpSide, tmpTangent).normalize();
    const half = STRAP_WIDTH / 2;
    position.setXYZ(i * 2, tmpPoint.x - tmpSide.x * half, tmpPoint.y - tmpSide.y * half, tmpPoint.z);
    position.setXYZ(i * 2 + 1, tmpPoint.x + tmpSide.x * half, tmpPoint.y + tmpSide.y * half, tmpPoint.z);
    normal.setXYZ(i * 2, tmpNormal.x, tmpNormal.y, tmpNormal.z);
    normal.setXYZ(i * 2 + 1, tmpNormal.x, tmpNormal.y, tmpNormal.z);
    const v = t * length * 2.2;
    uv.setXY(i * 2, 0, v);
    uv.setXY(i * 2 + 1, 1, v);
  }
  position.needsUpdate = true;
  normal.needsUpdate = true;
  uv.needsUpdate = true;
  geometry.computeBoundingSphere();
}

function useBadgeTextures() {
  const gl = useThree((state) => state.gl);
  const [textures, setTextures] = useState<{ front: THREE.Texture; back: THREE.Texture } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const created: THREE.Texture[] = [];
    loadBadgeFonts().then(() => {
      if (cancelled) return;
      const anisotropy = gl.capabilities.getMaxAnisotropy();
      const [front, back] = [drawBadgeFront(), drawBadgeBack()].map((canvas) => {
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = anisotropy;
        created.push(texture);
        return texture;
      });
      setTextures({ front, back });
    });
    return () => {
      cancelled = true;
      created.forEach((texture) => texture.dispose());
    };
  }, [gl]);

  return textures;
}

function Lanyard({ reducedMotion }: { reducedMotion: boolean }) {
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const lerped = useRef<{ j1?: THREE.Vector3; j2?: THREE.Vector3 }>({});
  const [dragOffset, setDragOffset] = useState<THREE.Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);

  const textures = useBadgeTextures();
  // Keep the V narrow on phones so the arms clear the corner copy.
  const spread = useThree((state) => STRAP_SPREAD * Math.min(1, state.size.width / state.size.height / 0.9));
  const holderGeometry = useMemo(createHolderGeometry, []);
  const rimGeometry = useMemo(createRimGeometry, []);
  const weave = useMemo(createWeaveTexture, []);
  const leftStrap = useMemo(createRibbonGeometry, []);
  const rightStrap = useMemo(createRibbonGeometry, []);
  const hookGeometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, HOLDER_H / 2 + 0.17, CLIP_Z),
          new THREE.Vector3(0, SLOT_Y + 0.03, CLIP_Z),
          new THREE.Vector3(0, SLOT_Y - 0.028, 0),
          new THREE.Vector3(0, SLOT_Y + 0.03, -CLIP_Z),
          new THREE.Vector3(0, SLOT_Y + 0.08, -CLIP_Z),
        ]),
        40,
        0.015,
        12,
      ),
    [],
  );
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
        false,
        "chordal",
      ),
    [],
  );
  const pointer = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, ATTACH_Y, CLIP_Z]]);

  useEffect(() => {
    document.body.style.cursor = dragOffset ? "grabbing" : hovered ? "grab" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered, dragOffset]);

  useFrame((state, delta) => {
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return;

    if (dragOffset) {
      pointer.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      direction.copy(pointer).sub(state.camera.position).normalize();
      pointer.add(direction.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((body) => body.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: pointer.x - dragOffset.x,
        y: pointer.y - dragOffset.y,
        z: pointer.z - dragOffset.z,
      });
    }

    // Smooth the two middle joints so the strap never kinks when it snaps tight.
    for (const key of ["j1", "j2"] as const) {
      const body = key === "j1" ? j1.current : j2.current;
      const target = body.translation();
      const current = (lerped.current[key] ??= new THREE.Vector3(target.x, target.y, target.z));
      const distance = Math.max(0.1, Math.min(1, current.distanceTo(target as THREE.Vector3)));
      current.lerp(target as THREE.Vector3, Math.min(1, delta * (10 + distance * 40)));
    }

    curve.points[0].copy(j3.current.translation() as THREE.Vector3);
    curve.points[1].copy(lerped.current.j2!);
    curve.points[2].copy(lerped.current.j1!);
    curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
    curve.updateArcLengths();
    updateRibbon(leftStrap, curve, -1, spread);
    updateRibbon(rightStrap, curve, 1, spread);

    // A soft, uneven breeze so the badge reads as a real object before anyone touches it.
    card.current.resetForces(false);
    card.current.resetTorques(false);
    if (!dragOffset && !reducedMotion) {
      const t = state.clock.elapsedTime;
      const gust = Math.sin(t * 0.9) * 0.6 + Math.sin(t * 2.3 + 1.3) * 0.25 + Math.sin(t * 0.37 + 0.5) * 0.35;
      card.current.addForce({ x: gust * WIND_FORCE, y: 0, z: Math.sin(t * 0.6 + 2) * WIND_FORCE * 0.6 }, true);
      card.current.addTorque({ x: 0, y: Math.sin(t * 0.8 + 0.7) * WIND_TWIST, z: 0 }, true);
    }

    // Gently turn the card back to face the viewer after a spin.
    const spin = card.current.angvel();
    const rotation = card.current.rotation();
    card.current.setAngvel({ x: spin.x, y: spin.y - rotation.y * 0.25, z: spin.z }, true);
  });

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2,
  };
  // Reduced motion: start hanging at rest instead of swinging in from the side.
  const start = (i: number): [number, number, number] =>
    reducedMotion ? [0, ANCHOR_Y - SEGMENT * i, 0] : [0.55 * i, ANCHOR_Y - 0.1 * i, 0];
  const cardStart: [number, number, number] = reducedMotion
    ? [0, ANCHOR_Y - SEGMENT * 3 - ATTACH_Y, 0]
    : [2.2, ANCHOR_Y - 0.6 - ATTACH_Y, 0];

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!card.current) return;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    const t = card.current.translation();
    setDragOffset(new THREE.Vector3().copy(event.point).sub(new THREE.Vector3(t.x, t.y, t.z)));
  };
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    (event.target as Element).releasePointerCapture?.(event.pointerId);
    setDragOffset(null);
  };

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[0, ANCHOR_Y, 0]} {...segmentProps} />
      <RigidBody ref={j1} position={start(1)} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j2} position={start(2)} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j3} position={start(3)} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody
        ref={card}
        position={cardStart}
        {...segmentProps}
        type={dragOffset ? "kinematicPosition" : "dynamic"}
      >
        <CuboidCollider args={[HOLDER_W / 2, HOLDER_H / 2, 0.02]} />
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <mesh position={[0, PAPER_Y, 0.002]} castShadow>
            <planeGeometry args={[PAPER_W, PAPER_H]} />
            <meshStandardMaterial
              key={textures ? "front" : "blank"}
              map={textures?.front ?? null}
              emissiveMap={textures?.front ?? null}
              emissive="#ffffff"
              emissiveIntensity={0.24}
              color="#ffffff"
              roughness={0.92}
            />
          </mesh>
          <mesh position={[0, PAPER_Y, -0.002]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[PAPER_W, PAPER_H]} />
            <meshStandardMaterial
              key={textures ? "back" : "blank"}
              map={textures?.back ?? null}
              emissiveMap={textures?.back ?? null}
              emissive="#ffffff"
              emissiveIntensity={0.24}
              color="#ffffff"
              roughness={0.92}
            />
          </mesh>

          <mesh geometry={holderGeometry} castShadow>
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.07}
              roughness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.05}
              envMapIntensity={1.6}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh geometry={rimGeometry}>
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.5}
              roughness={0.16}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.8}
              depthWrite={false}
            />
          </mesh>
          {[-0.014, 0, 0.014].map((dy) => (
            <mesh key={dy} position={[0, HOLDER_H / 2 - 0.14 * HOLDER_H + dy, 0.016]}>
              <boxGeometry args={[HOLDER_W * 0.97, 0.005, 0.004]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={0.3} />
            </mesh>
          ))}

          <mesh geometry={hookGeometry} castShadow>
            <meshStandardMaterial color="#d7dadd" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0, HOLDER_H / 2 + 0.21, CLIP_Z]} castShadow>
            <cylinderGeometry args={[0.032, 0.032, 0.1, 24]} />
            <meshStandardMaterial color="#d7dadd" metalness={1} roughness={0.22} />
          </mesh>
          <mesh position={[0, HOLDER_H / 2 + 0.29, CLIP_Z]} scale={[1, 1.25, 1]} castShadow>
            <torusGeometry args={[0.062, 0.015, 14, 36]} />
            <meshStandardMaterial color="#d7dadd" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0, HOLDER_H / 2 + 0.37, CLIP_Z]} castShadow>
            <boxGeometry args={[STRAP_WIDTH * 0.95, 0.11, 0.026]} />
            <meshStandardMaterial color="#232524" roughness={0.75} />
          </mesh>
        </group>
      </RigidBody>

      {[leftStrap, rightStrap].map((geometry, i) => (
        <mesh key={i} geometry={geometry} castShadow frustumCulled={false}>
          <meshStandardMaterial map={weave} color="#ffffff" roughness={0.88} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

// Narrow screens: pull the camera back so the badge keeps roughly half the width.
function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / state.size.height);
  useEffect(() => {
    camera.position.z = 13 * Math.max(1, 0.62 / aspect);
    camera.updateProjectionMatrix();
  }, [camera, aspect]);
  return null;
}

export default function BadgeScene({ active, reducedMotion }: BadgeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 2]}
      shadows="variance"
      flat
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <ResponsiveCamera />
      <ambientLight intensity={0.86} />
      <directionalLight
        position={[-3.5, 5, 9]}
        intensity={0.42}
        castShadow
        shadow-radius={14}
        shadow-blurSamples={24}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0004}
      />
      <mesh position={[0, 0, -1.1]} receiveShadow>
        <planeGeometry args={[40, 30]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>

      <Suspense fallback={null}>
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!active}>
          <Lanyard reducedMotion={reducedMotion} />
        </Physics>
      </Suspense>

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[0, 5, 6]} scale={[12, 2, 1]} />
        <Lightformer intensity={1.4} position={[-7, 1, 4]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.1} position={[7, -1, 3]} scale={[10, 5, 1]} />
        <Lightformer intensity={3} position={[0, -4, 6]} scale={[7, 0.6, 1]} />
      </Environment>
    </Canvas>
  );
}
