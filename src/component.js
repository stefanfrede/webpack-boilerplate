export default (text = 'Hello world') => {
  const element = document.createElement('div');

  element.textContent = text;

  return element;
};
