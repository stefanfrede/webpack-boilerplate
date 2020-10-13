import { html } from 'lit-html';

import canvas from './canvas';

const component = ({ headline = '📦 Webpack 5 Boilerplate' } = {}) =>
  html`
    <article class="mb-8">
      <h1
        class="mt-2 mb-8 text-2xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10"
      >
        ${headline}
      </h1>

      <p class="text-xl text-gray-700 leading-8 mb-8">
        This is a minimal Webpack 5 boilerplate with development and production
        optimization.
      </p>

      ${canvas()}
    </article>
  `;

export default component;
