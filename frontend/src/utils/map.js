export const applyDarkMapStyles = () => {
  document.querySelectorAll('.leaflet-container').forEach((element) => {
    element.style.filter = 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)';
  });
};

export const removeDarkMapStyles = () => {
  document.querySelectorAll('.leaflet-container').forEach((element) => {
    element.style.filter = '';
  });
};
