import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CATALOG_NO, DROP, RELEASE, SEASON, products } from "@/lib/catalog";

const RED = "#d92322";
const PAPER = "#e4e0d6";
const INK = "#141414";

function makeCanvas(draw: (c: CanvasRenderingContext2D, s: number) => void) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size);
  // photocopy grain
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 34;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function regMarks(c: CanvasRenderingContext2D, s: number, color: string) {
  c.strokeStyle = color;
  c.lineWidth = 2;
  const m = 34;
  const d = 18;
  [
    [m, m],
    [s - m, m],
    [m, s - m],
    [s - m, s - m],
  ].forEach(([x, y]) => {
    c.beginPath();
    c.moveTo(x - d, y);
    c.lineTo(x + d, y);
    c.moveTo(x, y - d);
    c.lineTo(x, y + d);
    c.stroke();
    c.beginPath();
    c.arc(x, y, 8, 0, Math.PI * 2);
    c.stroke();
  });
}

function frontTexture() {
  return makeCanvas((c, s) => {
    c.fillStyle = INK;
    c.fillRect(0, 0, s, s);
    regMarks(c, s, "#5a5a5a");

    c.fillStyle = RED;
    c.fillRect(70, 300, s - 140, 250);

    c.fillStyle = INK;
    c.textAlign = "left";
    c.font = "700 128px Archivo, Helvetica, Arial, sans-serif";
    c.fillText("OFF THE", 96, 420);
    c.fillText("RECORD", 96, 530);

    c.fillStyle = PAPER;
    c.font = "600 46px Archivo, Helvetica, Arial, sans-serif";
    c.fillText("ARC NOIRE", 96, 180);
    c.font = "22px 'JetBrains Mono', monospace";
    c.fillText(`${SEASON}  /  ${DROP}`, 96, 230);
    c.fillText(`CATALOG NO. ${CATALOG_NO}`, 96, 640);
    c.fillText("SIDE A / SIDE B — 6 TRACKS", 96, 680);

    // red sticker
    c.fillStyle = RED;
    c.beginPath();
    c.arc(s - 210, s - 200, 120, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = PAPER;
    c.textAlign = "center";
    c.font = "700 40px Archivo, Helvetica, Arial, sans-serif";
    c.fillText("AN-001", s - 210, s - 208);
    c.font = "20px 'JetBrains Mono', monospace";
    c.fillText("DROP 001", s - 210, s - 172);

    c.strokeStyle = "#3a3a3a";
    c.lineWidth = 3;
    c.strokeRect(40, 40, s - 80, s - 80);
  });
}

function backTexture() {
  return makeCanvas((c, s) => {
    c.fillStyle = PAPER;
    c.fillRect(0, 0, s, s);
    regMarks(c, s, "#9a968c");

    c.fillStyle = RED;
    c.fillRect(0, 0, s, 90);
    c.fillStyle = PAPER;
    c.textAlign = "left";
    c.font = "700 44px Archivo, Helvetica, Arial, sans-serif";
    c.fillText(`ARC NOIRE — ${RELEASE}`, 60, 60);

    c.fillStyle = INK;
    c.font = "22px 'JetBrains Mono', monospace";
    c.fillText(`${SEASON}  ·  ${CATALOG_NO}  ·  ${DROP}`, 60, 150);

    let y = 240;
    (["A", "B"] as const).forEach((side) => {
      c.fillStyle = RED;
      c.font = "700 42px Archivo, Helvetica, Arial, sans-serif";
      c.fillText(`SIDE ${side}`, 60, y);
      y += 20;
      c.fillStyle = INK;
      c.fillRect(60, y, s - 120, 2);
      y += 54;
      products
        .filter((p) => p.side === side)
        .forEach((p) => {
          c.fillStyle = INK;
          c.font = "26px 'JetBrains Mono', monospace";
          c.fillText(p.track, 60, y);
          c.font = "600 30px Archivo, Helvetica, Arial, sans-serif";
          c.fillText(p.name, 140, y);
          c.textAlign = "right";
          c.font = "24px 'JetBrains Mono', monospace";
          c.fillText(p.sku, s - 60, y);
          c.textAlign = "left";
          y += 52;
        });
      y += 40;
    });

    c.fillStyle = "#5a564e";
    c.font = "18px 'JetBrains Mono', monospace";
    c.fillText("ALL GARMENTS RECORDED IN LOW LIGHT. NO MASTER COPY.", 60, s - 60);
  });
}

function edgeTexture(text: string) {
  return makeCanvas((c, s) => {
    c.fillStyle = INK;
    c.fillRect(0, 0, s, s);
    c.fillStyle = RED;
    c.fillRect(0, s * 0.42, s, s * 0.16);
    c.save();
    c.translate(s / 2, s / 2);
    c.fillStyle = PAPER;
    c.textAlign = "center";
    c.font = "700 64px Archivo, Helvetica, Arial, sans-serif";
    c.fillText(text, 0, 22);
    c.restore();
  });
}

function Sleeve({ dragRef }: { dragRef: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 6.2);

  const materials = useMemo(() => {
    const front = frontTexture();
    const back = backTexture();
    const edge = edgeTexture("ARC NOIRE · AN-001");
    const mk = (map: THREE.Texture) =>
      new THREE.MeshStandardMaterial({ map, roughness: 0.82, metalness: 0.05 });
    return [mk(edge), mk(edge), mk(edge), mk(edge), mk(front), mk(back)];
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetY = dragRef.current.x * 2.6 + Math.sin(t * 0.25) * 0.22;
    const targetX = dragRef.current.y * 1.1 + Math.sin(t * 0.18) * 0.08;
    const k = 1 - Math.exp(-6 * Math.min(delta, 0.05));
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.6) * 0.06;
  });

  return (
    <group ref={group} scale={scale}>
      <mesh castShadow material={materials}>
        <boxGeometry args={[3.1, 3.1, 0.22]} />
      </mesh>
      {/* red spine label */}
      <mesh position={[-1.62, 0, 0]}>
        <boxGeometry args={[0.06, 1.2, 0.24]} />
        <meshStandardMaterial color={RED} roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Sleeve3D() {
  const drag = useRef({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const active = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onDown = (e: React.PointerEvent) => {
    active.current = true;
    setGrabbing(true);
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onMove = (e: React.PointerEvent) => {
    const w = e.currentTarget.clientWidth || 1;
    const h = e.currentTarget.clientHeight || 1;
    if (active.current) {
      drag.current.x += (e.clientX - last.current.x) / w;
      drag.current.y += (e.clientY - last.current.y) / h;
      drag.current.x = Math.max(-1.2, Math.min(1.2, drag.current.x));
      drag.current.y = Math.max(-0.35, Math.min(0.35, drag.current.y));
      last.current = { x: e.clientX, y: e.clientY };
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      drag.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      drag.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.2;
    }
  };
  const onUp = () => {
    active.current = false;
    setGrabbing(false);
  };

  return (
    <div
      className={`h-full w-full touch-none ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#1a1a1c"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 6]} intensity={2.1} />
        <directionalLight position={[-5, -2, 3]} intensity={0.7} color="#d92322" />
        <Sleeve dragRef={drag} />
      </Canvas>
    </div>
  );
}
