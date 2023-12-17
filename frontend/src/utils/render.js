const clearPage = () => {
  const existingCanvas = document.querySelector('canvas');

  if (existingCanvas) {
    existingCanvas.remove();
  }
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  main.appendChild(pageTitle);
};

export { clearPage, renderPageTitle };
