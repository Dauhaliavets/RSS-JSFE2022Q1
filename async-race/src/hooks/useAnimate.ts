import { useRef } from 'react';

const useAnimate = () => {
  const car = useRef<HTMLDivElement>(null);
  const animateIdRef = useRef<number>();

  const onAnimate = (time: number): void => {
    const cur: { curX: number; endX: number } = { curX: 0, endX: 0 };
    if (car.current && car.current.parentElement) {
      cur.curX = car.current.offsetLeft;
      cur.endX = car.current.parentElement.clientWidth - 80;
    }
    const framesCount = (time / 1000) * 60;
    const dX = (cur.endX - cur.curX) / framesCount;

    function animate() {
      cur.curX += dX;
      if (car.current) {
        car.current.style.transform = `translate(${cur.curX}px, 0px)`;
      }
      if (cur.curX <= cur.endX) {
        animateIdRef.current = requestAnimationFrame(animate);
      }
    }

    animateIdRef.current = requestAnimationFrame(animate);
  };

  return { car, animateIdRef, onAnimate };
};

export { useAnimate };
