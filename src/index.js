import { html, render } from 'lit-html';

import component from './component';
import cta from './cta';

import './styles/index.css';

const app = () =>
  html`
    <div class="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <main id="main-content" class="max-w-3xl mx-auto py-16" tabindex="-1">
        ${component()} ${cta()}
      </main>
    </div>
  `;

render(app(), document.body);
