import { html, render } from 'lit-html';

const clickHandler = {
  handleEvent() {
    const split = document.getElementById('codeSplit');

    import('./paragraph')
      .then((item) => {
        const paragraph = item.default;

        render(paragraph(), split);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  capture: true,
};

const component = () =>
  html`
    <article>
      <div class="bg-gray-900 text-gray-100 p-4">
        <h2
          class="text-2xl leading-8 font-extrabold tracking-tight sm:text-3xl sm:leading-9"
        >
          Code splitting
        </h2>
        <div id="codeSplit">
          <p class="mt-3 text-lg leading-7">
            You are able to load your content on demand. The advantage of doing
            this is that then the initial payload of your site can be smaller
            than it would be otherwise.
          </p>
          <div class="mt-3 text-right">
            <button
              @click=${clickHandler}
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 uppercase bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-100 transition ease-in-out duration-150"
            >
              Click me
            </button>
          </div>
        </div>
      </div>
    </article>
  `;

export default component;
