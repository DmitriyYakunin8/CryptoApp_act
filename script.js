document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.querySelector('.content')
  const loadingOverlay = document.querySelector('.loading-overlay')
  const navLinks = document.querySelectorAll('.nav-link')

  const showLoadingOverlay = () => {
    loadingOverlay.style.opacity = '1'
  }

  const hideLoadingOverlay = () => {
    loadingOverlay.style.opacity = '0'
  }

  const loadScripts = (url) => {
    if (url) {
      // Плавное появление названия кнопок в футере
  let footer = document.querySelector(".footer");

  footer.addEventListener("mouseover", function (evt) {
    if (evt.target.className.includes("footer-btn")) {
      let description = evt.target.closest(".footer-btn-div").lastElementChild;
      description.classList.remove("description-off");
      description.classList.add("descriptionOn");
    }
  });

  footer.addEventListener("mouseout", function (evt) {
    if (evt.target.className.includes("footer-btn")) {
      let description = evt.target.closest(".footer-btn-div").lastElementChild;
      description.classList.add("description-off");
      description.classList.remove("descriptionOn");
      description.style.transition = "opacity 0.5s";
    }
  });

  //плавное изменение цвета кнопок
  document.addEventListener("mouseover", function (evt) {
    if (evt.target.className.includes("share-btn")) {
      evt.target.classList.remove("btn-out");
      evt.target.classList.add("btn-in");
    }
  });

  document.addEventListener("mouseout", function (evt) {
    if (evt.target.className.includes("share-btn")) {
      evt.target.classList.remove("btn-in");
      evt.target.classList.add("btn-out");
    }
  });

  //заполнение цветом currency
  let colors = {
    BTC: "fee7ab",
    USDT: "e1fedc",
    ETH: "dde2ff",
    MATIC: "f6ddff",
  };

  let cryptocurrencies = document.querySelectorAll(".currency-abb");

  for (let cryptocurrency of cryptocurrencies) {
    for (let name of cryptocurrency.classList) {
      if (name in colors) {
        let closest = cryptocurrency.closest(".currency-type");
        let childrens = closest.children;

        for (let children of childrens) {
          if (children.classList.contains(`${name}`))
            children.style.backgroundColor = `#${colors[name]}`;
        }
      }
    }
  }

  //текущий курс валюты
  function valueComparsion(values, obj) {
    for (let value of values) {
      for (let name of value.classList) {
        if (name in obj) value.innerHTML += `${obj[name]}`;
        if ("money" in obj)
          value.innerHTML = '$ ' +
            value.innerHTML.split("")
            .reverse()
            .join("")
            .match(/\d{0,3}/g)
            .join(" ")
            .split("")
            .reverse()
            .join("")
            .trim();;
      }
    }
  }

  let rates = {
    BTC: 21352,
    USDT: 132,
    ETH: 111343,
    MATIC: 1563,
    money: true,
  };

  let currencyCosts = document.querySelectorAll(".currency-cost");

  valueComparsion(currencyCosts, rates);

  //остаток валюты на счете
  let rests = {
    BTC: 1.322,
    USDT: 1.32,
    ETH: 6.4,
    MATIC: 2.343,
  };

  let currencyRestValues = document.querySelectorAll(".currency-rest-value");

  valueComparsion(currencyRestValues, rests);

  //расчет общей оценочной стоимости корзины
  function totalCostCard() {
    let estimatedValue = document.querySelector(".estimated-value");
    let value = 0;

    for (let rate in rates) {
      if (typeof rates[rate] == "number") value += rates[rate];
    }

    let valueStr = value.toString();

    estimatedValue.innerHTML = valueStr
      .split("")
      .reverse()
      .join("")
      .match(/\d{0,3}/g)
      .join(" ")
      .split("")
      .reverse()
      .join("")
      .trim();
  }

  totalCostCard();

  //выпадающее меню пользователя
  let arrow = document.querySelector(".arrow-container");

  arrow.onclick = function () {
    let user = document.querySelector(".user");
    let menu = document.querySelector(".user-menu");
    
    if (menu.style.visibility == "hidden") {
      menu.style.visibility = "visible";
      let userCoords = user.getBoundingClientRect();
      menu.style.left = userCoords.left + 1 + "px";
      menu.style.top = userCoords.bottom + 10 + "px";
    } 
    else {
      menu.classList.add("user-menu-onclick");
      menu.style.visibility = "hidden";
    }
  };

  function roundingChapter() {
    let userMenuChapters = document.querySelectorAll(".user-menu-chapter");
    for (let userMenuChapter of userMenuChapters) {
      if (userMenuChapter.textContent == "My profile")
        userMenuChapter.style.borderRadius = "13px 13px 0px 0px";
      if (userMenuChapter.textContent == "Options")
        userMenuChapter.style.borderRadius = "0px 0px 13px 13px";
    }
  }

  roundingChapter();
    }
  }

  const loadPage = (url) => {
    showLoadingOverlay()

    fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('.content').innerHTML;
      
      contentDiv.classList.add('fade-out')

      contentDiv.innerHTML = newContent
      document.title = doc.title 

      setTimeout(() => {
        contentDiv.classList.remove('fade-out')
        history.pushState({}, '', url);
        hideLoadingOverlay()
      }, 500)
    })
    .then(() => {
      loadScripts(url)
    })
  }

  navLinks.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()

      const url = e.currentTarget.getAttribute('href')
      showLoadingOverlay()
      loadPage(url)
    })
  })

  loadPage(window.location.pathname);
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname)
  })


  



})

