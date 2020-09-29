import { html } from 'lit-html';

import confetti from 'canvas-confetti';

function run() {
  const canvas = document.getElementById('canvas');

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  });

  myConfetti({
    particleCount: 100,
    spread: 160,
  });
}

if (document.readyState !== 'loading') {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run);
}

const component = () =>
  html`
    <div
      class="flex border border-gray-200 bg-white rounded shadow overflow-hidden"
    >
      <canvas id="canvas" class="flex-auto"></canvas>
    </div>
  `;

export default component;
