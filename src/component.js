export default (text = 'Hello world!') => {
  const element = document.createElement('div');

  element.className =
    'rounded bg-gray-100 border-2 border-gray-900 max-w-md m-4 p-4';
  element.textContent = text;

  element.onclick = () =>
    import('./lazy')
      .then((lazy) => {
        element.textContent = lazy.default;
      })
      .catch((err) => {
        console.error(err);
      });

  return element;
};
