export const fetchImages = async () => {
  const response = await fetch('https://picsum.photos/v2/list');
  const images = await response.json();
  return images;
};

export const getImageFromId = id =>
  `https://picsum.photos/${id}/237/200/300`;