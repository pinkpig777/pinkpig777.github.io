import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface ParticleNetworkProps {
  particleCount?: number;
  maxDistance?: number;
  particleColor?: string;
  lineColor?: string;
  mouseLineColor?: string;
  backgroundColor?: string;
  blockMouseSelector?: string;
}

export default function ParticleNetwork({
  particleCount = 80,
  maxDistance = 150,
  particleColor,
  lineColor,
  mouseLineColor,
  backgroundColor,
  blockMouseSelector = '[data-particle-block]',
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const colorsRef = useRef({
    particleColor: '#38bdf8',
    lineColor: '#38bdf8',
    mouseLineColor: '#ffffff',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement ?? document.body;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getThemeColor = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value || fallback;
    };

    const updateColors = () => {
      const themeParticle = getThemeColor('--particle-color', '#38bdf8');
      const themeLine = getThemeColor('--particle-line-color', themeParticle);
      const themeMouse = getThemeColor('--particle-mouse-color', getThemeColor('--text', '#ffffff'));
      colorsRef.current = {
        particleColor: particleColor ?? themeParticle,
        lineColor: lineColor ?? themeLine,
        mouseLineColor: mouseLineColor ?? themeMouse,
      };
    };

    updateColors();

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };
    initParticles();

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target && blockMouseSelector && target.closest(blockMouseSelector)) {
        mouseRef.current.active = false;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const { particleColor, lineColor, mouseLineColor } = colorsRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = opacity * 0.5;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.active) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance * 1.5) {
            const opacity = 1 - distance / (maxDistance * 1.5);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = mouseLineColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    const themeObserver = new MutationObserver(() => {
      updateColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      themeObserver.disconnect();
    };
  }, [particleCount, maxDistance, particleColor, lineColor, mouseLineColor, blockMouseSelector]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: backgroundColor ?? 'var(--particle-bg, var(--bg))',
      }}
    />
  );
}
