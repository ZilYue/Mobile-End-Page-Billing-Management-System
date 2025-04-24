
function storeInfo(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}

function getInfo(key) {
  let info = localStorage.getItem(`${key}`);
  let transInfo = JSON.parse(info);
  return transInfo;
}