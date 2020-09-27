import confetti from 'canvas-confetti';

export default () => {
  const canvas = document.createElement('canvas');

  canvas.className =
    'block rounded bg-gray-100 border-2 border-gray-900 h-64 w-64';

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  });

  myConfetti({
    particleCount: 100,
    spread: 160,
  });

  return canvas;
};
