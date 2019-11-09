import { html } from 'lit-html';

import './css/index.css';
import imgsrc from './img/card-top.jpg';

// Define a template
const card = () =>
  html`
    <div class="container mx-auto py-8 flex flex-col">
      <div class="max-w-sm rounded overflow-hidden shadow-lg self-center">
        <img class="w-full" src="${imgsrc}" alt="Sunset in the mountains" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 py-4">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >#photography</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >#travel</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >#winter</span
          >
        </div>
      </div>
    </div>
  `;

export default card;
