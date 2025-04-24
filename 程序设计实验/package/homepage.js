//设置下拉菜单

const dropDownButtom = document.querySelector('nav .nav-left .iconfont');
const menu = document.querySelector('.menu');
const menuButtom = document.querySelector('nav .nav-inner .nav-left .iconfont');

dropDownButtom.addEventListener('click', function () {
  if (menu.classList.contains('menu-active')) {
    menu.classList.remove('menu-active');
    menuButtom.classList.remove('icon-RectangleCopy2');
    menuButtom.classList.add('icon-RectangleCopy4');

  } else {
    menu.classList.add('menu-active');
    menuButtom.classList.remove('icon-RectangleCopy4');
    menuButtom.classList.add('icon-RectangleCopy2');

  }
  
});

menu.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    menu.classList.remove('menu-active');
    menuButtom.classList.remove('icon-RectangleCopy2');
    menuButtom.classList.add('icon-RectangleCopy4');
  }
});


//hash值显示不同内容

// 页面加载时根据当前 hash 值显示对应内容
function showContent() {
  const hash = window.location.hash.slice(1);
  const contentDivs = document.querySelectorAll('.content .page');
  contentDivs.forEach(div => {
    if (div.id === hash) {
      div.style.display = 'block';
    } else {
      div.style.display = 'none';
    }
  });
}

// 监听 hashchange 事件，当 hash 值改变时显示对应内容
window.addEventListener('hashchange', showContent);

// 页面加载时触发一次显示对应内容
showContent();


//添加按钮的点击效果

const formButtoms = document.querySelectorAll('form .buttoms .form-buttom');

formButtoms.forEach(function (e) {
  e.addEventListener('click', function () {
    e.style.backgroundColor = '#302d2d78';

    setTimeout(() => {
      e.style.backgroundColor = '#fff';
    }, 100);
  });
});



function storeInfo(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}

function getInfo(key) {
  let info = localStorage.getItem(`${key}`);
  let transInfo = JSON.parse(info);
  
  return transInfo;
}

function deleteInfo(key) {
  localStorage.removeItem(`${key}`);
  alert(`${key}已删除`);
}

function openNewCard() {
  const form = document.querySelector('#addCard form');
  let elements = form.elements;
  let card = {
    cardID: elements[0].value,
    password: elements[1].value,
    money: elements[2].value
  };
  
  storeInfo(card.cardID, card);

  form.reset();
  alert('创建成功');
}

function searchCard() {
  const form = document.querySelector('#searchCard form');
  let elements = form.elements;
  let card = getInfo(elements[0].value);
  let password = elements[1].value;
  let ifCard = checkCard(card, password);
  if (ifCard) {
    alert(`余额:${card.money}`);
  } else {
    alert('卡号或密码错误');
  }
}

function deleteCard() {
  const form = document.querySelector('#deleteCard form');
  let elements = form.elements;
  let card = getInfo(elements[0].value);
  let password = elements[1].value;
  let ifCard = checkCard(card, password);
  if (ifCard) {
    console.log({card});
    
    deleteInfo(elements[0].value);
  } else {
    alert('卡号或密码错误');
  }
}

function checkCard(card, password) {
  let ifCard = false;
  if (card == null) {
    alert('卡号错误');
  } else if (password == card.password) {
    ifCard = true;
    
  } else {
    alert('密码错误');
  }
  return ifCard;
}

function recharge() {
  const form = document.querySelector('#recharge form');
  let elements = form.elements;
  let card = getInfo(elements[0].value);
  let password = elements[1].value;
  let recharge = elements[2].value;
  let ifCard = checkCard(card, password);
  if (ifCard) {
    //数据类型转换问题
    let money = parseInt(card.money);
    money += (+recharge);
    card.money = money;
    storeInfo(card.cardID, card);

    form.reset();
    alert('充值成功');
  } else {
    alert('卡号或密码错误');
  }
}

//改money就直接出错,hash值的问题
function refund() {
  const form = document.querySelector('#refund form');
  let elements = form.elements;
  let card = getInfo(elements[0].value);
  let password = elements[1].value;
  let recharge = elements[2].value;
  let ifCard = checkCard(card, password);
  if (ifCard) {
    let money = parseInt(card.money);
    money -= (+recharge);
    if (money < 0) {
      alert('余额不足');
    } else {
      card.money = money;
    }
    storeInfo(card.cardID, card);

    form.reset();
    alert('退费成功');
  } else {
    alert('卡号或密码错误');
  }
}

function use() {
  const form = document.querySelector('#refund form');
  let elements = form.elements;
  let card = getInfo(elements[0].value);
  let password = elements[1].value;
  let ifCard = checkCard(card, password);
  if (ifCard) {
    let money = parseInt(card.money);
    if (money < 0) {
      alert('余额不足');
    } else {
      alert('余额充足,可以上机');
    }

  } else {
    alert('卡号或密码错误');
  }
}