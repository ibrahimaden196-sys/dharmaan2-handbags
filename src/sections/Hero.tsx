import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  int octaves = 4;
  for (int i = 0; i < 4; i++) {
    sum += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return sum;
}

void main() {
  vec3 pos = position;
  float displacement = fbm(pos * 1.5 + time * 0.2) * 0.3;
  pos += normal * displacement;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float triplanarMap(vec3 p, vec3 n) {
  vec3 blend = abs(n);
  blend /= (blend.x + blend.y + blend.z + 0.001);

  float xNoise = snoise(p * 0.5 + vec3(time * 0.05, 0.0, 0.0));
  float yNoise = snoise(p * 0.5 + vec3(0.0, time * 0.05, 0.0));
  float zNoise = snoise(p * 0.5 + vec3(0.0, 0.0, time * 0.05));

  return xNoise * blend.x + yNoise * blend.y + zNoise * blend.z;
}

void main() {
  float noise = triplanarMap(vPosition, vNormal);
  noise = noise * 0.5 + 0.5;

  vec3 color1 = vec3(0.9, 0.6, 0.5);
  vec3 color2 = vec3(0.5, 0.11, 0.11);
  vec3 finalColor = mix(color1, color2, noise);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const heading1Ref = useRef<HTMLSpanElement>(null)
  const heading2Ref = useRef<HTMLSpanElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // WebGL setup
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return

    // Get hero container for sizing
    const heroContainer = canvas.parentElement
    if (!heroContainer) return

    const canvasWidth = heroContainer.offsetWidth
    const canvasHeight = heroContainer.offsetHeight

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(canvasWidth, canvasHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100)
    camera.position.z = 3.0

    const geometry = new THREE.IcosahedronGeometry(1.2, 30)
    const uniforms = { time: { value: 0.0 } }
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Mouse state
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let isHeroVisible = true

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005
    }
    document.addEventListener('mousemove', onMouseMove)

    const observer = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0].isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    // Resize handler
    const onResize = () => {
      if (!heroContainer) return
      const w = heroContainer.offsetWidth
      const h = heroContainer.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (!isHeroVisible) return

      uniforms.time.value = performance.now() * 0.001
      targetRotationX = mouseY * 0.5
      targetRotationY = mouseX * 0.5
      mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05
      mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05
      mesh.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    // GSAP entrance animations
    const tl = gsap.timeline({ delay: 0.3 })
    if (labelRef.current) {
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.5)
    }
    if (heading1Ref.current) {
      tl.to(heading1Ref.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.7)
    }
    if (heading2Ref.current) {
      tl.to(heading2Ref.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.9)
    }
    if (bodyRef.current) {
      tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 1.1)
    }
    if (ctaRef.current) {
      tl.to(ctaRef.current, { opacity: 1, duration: 0.8 }, 1.4)
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#faf8f5' }}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Abstract sculptural form in warm leather tones"
        className="hidden lg:block absolute top-0 right-0 z-[1]"
        style={{ width: '55vw', height: '100vh' }}
      />

      {/* Mobile hero background image */}
      <div
        className="lg:hidden absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(250,248,245,0.7) 0%, rgba(250,248,245,0.85) 60%, rgba(250,248,245,0.95) 100%)',
          }}
        />
      </div>

      {/* Text overlay */}
      <div
        className="relative z-[2] flex items-center h-full"
        style={{
          maxWidth: '45vw',
          paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div
          className="hero-text-content"
          style={{
            maxWidth: '520px',
            background: 'linear-gradient(90deg, rgba(250,248,245,0.98) 0%, rgba(250,248,245,0.85) 70%, transparent 100%)',
            padding: '3rem 3rem 3rem 0',
            borderRadius: 0,
          }}
        >
          <span
            ref={labelRef}
            className="label-text block"
            style={{ marginBottom: '1.5rem', opacity: 0, transform: 'translateY(15px)' }}
          >
            HANDCRAFTED IN ITALY
          </span>

          <h1 className="font-display" style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            <span
              ref={heading1Ref}
              className="block"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 300,
                opacity: 0,
                transform: 'translateY(25px)',
              }}
            >
              Sculpted
            </span>
            <span
              ref={heading2Ref}
              className="block"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 300,
                color: '#7f1d1d',
                opacity: 0,
                transform: 'translateY(25px)',
              }}
            >
              in leather
            </span>
          </h1>

          <p
            ref={bodyRef}
            className="font-body text-brand-text-secondary"
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              letterSpacing: '0.005em',
              maxWidth: '400px',
              marginTop: '1.5rem',
              opacity: 0,
              transform: 'translateY(15px)',
            }}
          >
            Each bag begins as a sketch and ends as a companion. Italian vegetable-tanned leather, hand-stitched by artisans in Florence.
          </p>

          <div
            ref={ctaRef}
            style={{ marginTop: '2rem', opacity: 0 }}
          >
            <a
              href="#collection"
              className="font-body inline-flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors duration-300 group"
              style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore the Collection
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
            <p
              className="font-mono-label"
              style={{ fontSize: '0.7rem', color: '#a3a3a3', marginTop: '1rem' }}
            >
              Scroll to discover &darr;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
