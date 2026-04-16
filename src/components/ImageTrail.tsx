import React, { useEffect, useRef } from 'react';

const TRAIL_POOL_SIZE = 15;
const TRAIL_IMAGE_W = 280;
const TRAIL_IMAGE_H = 350;
const TRAIL_SPAWN_THRESHOLD = 80;

interface ImageTrailProps {
    images: string[];
}

export function ImageTrail({ images }: ImageTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const poolRef = useRef<HTMLDivElement[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastSpawnRef = useRef({ x: 0, y: 0 });
    const indexRef = useRef(0);
    const poolIndexRef = useRef(0);
    const isInsideRef = useRef(false);
    const rafRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const pool: HTMLDivElement[] = [];
        for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'trail-img-wrapper';
            wrapper.style.cssText = `
        position: absolute;
        width: ${TRAIL_IMAGE_W}px;
        height: ${TRAIL_IMAGE_H}px;
        pointer-events: none;
        opacity: 0;
        transform: scale(0.85) translate(-50%, -50%);
        transition: opacity 0.2s ease-out, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform, opacity;
        z-index: ${i};
        overflow: hidden;
        border-radius: 6px;
      `;

            const img = document.createElement('img');
            img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        user-select: none;
        pointer-events: none;
      `;
            img.draggable = false;

            wrapper.appendChild(img);
            container.appendChild(wrapper);
            pool.push(wrapper);
        }
        poolRef.current = pool;

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        const onMouseEnter = () => {
            isInsideRef.current = true;
        };

        const onMouseLeave = () => {
            isInsideRef.current = false;
            pool.forEach(wrapper => {
                wrapper.style.opacity = '0';
                wrapper.style.transform = 'scale(0.85) translate(-50%, -50%)';
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;

            if (!isInsideRef.current) return;

            const dx = mouseRef.current.x - lastSpawnRef.current.x;
            const dy = mouseRef.current.y - lastSpawnRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > TRAIL_SPAWN_THRESHOLD) {
                spawnImage();
                lastSpawnRef.current.x = mouseRef.current.x;
                lastSpawnRef.current.y = mouseRef.current.y;
            }
        };

        function spawnImage() {
            const wrapper = pool[poolIndexRef.current % TRAIL_POOL_SIZE];
            const img = wrapper.querySelector('img') as HTMLImageElement;

            img.src = images[indexRef.current % images.length];
            indexRef.current++;

            wrapper.style.left = `${mouseRef.current.x}px`;
            wrapper.style.top = `${mouseRef.current.y}px`;

            wrapper.style.transition = 'none';
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'scale(0.85) translate(-50%, -50%)';

            wrapper.offsetHeight;

            wrapper.style.transition = 'opacity 0.2s ease-out, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1) translate(-50%, -50%)';

            wrapper.style.zIndex = String(indexRef.current);

            const capturedIndex = indexRef.current;
            setTimeout(() => {
                if (wrapper.style.zIndex === String(capturedIndex)) {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'scale(0.95) translate(-50%, -50%)';
                }
            }, 600);

            poolIndexRef.current++;
        }

        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);
        container.addEventListener('mousemove', onMouseMove);

        return () => {
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafRef.current);
            pool.forEach(wrapper => wrapper.remove());
        };
    }, [images]);

    return (
        <div
            ref={containerRef}
            className="h-full w-full cursor-crosshair"
        />
    );
}
