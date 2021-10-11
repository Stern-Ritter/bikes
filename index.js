// ** Данные для начальной иницализации
// Данные для инициализации блока 'Велосипеды'
const initialBikeCards = {
  Шоссе: [
    {
      name: "Cervelo Caledonia-5",
      src: "./images/bike-model-cervelo-caledonia-5.jpg",
      link: "https://www.sigmasports.com/item/Cervelo/Caledonia-5-Ultegra-Disc-Road-Bike-2021/RDEN",
    },
    {
      name: "Cannondale Systemsix Himod",
      src: "./images/bike-model-cannondale-systemsix-himod.jpg",
      link: "https://www.sigmasports.com/item/Cannondale/SystemSix-HiMOD-Ultegra-Di2-Disc-Road-Bike-2021/R82J",
    },
    ,
    {
      name: "Trek Domane SL-7",
      src: "./images/bike-model-trek-domane-sl-7.jpg",
      link: "https://www.sigmasports.com/item/Trek/Domane-SL-7-Force-eTap-AXS-Disc-Road-Bike-2021/RULF",
    },
  ],
  Грэвел: [
    {
      name: "Cervelo Aspero GRX 810",
      src: "./images/bike-model-cervelo-aspero-grx-810.jpg",
      link: "https://www.sigmasports.com/item/Cervelo/Aspero-GRX-810-1x-Disc-Gravel-Bike-2021/RJDE",
    },
    {
      name: "Specialized S-Works Diverge",
      src: "./images/bike-model-specialized-s-works-diverge.jpg",
      link: "https://www.sigmasports.com/item/Specialized/S-Works-Diverge-Gravel-Bike-2020/NVJ9",
    },
    ,
    {
      name: "Cannondale Topstone Lefty 3",
      src: "./images/bike-model-cannondale-topstone -lefty-3.jpg",
      link: "https://www.sigmasports.com/item/Cannondale/Topstone-Carbon-Lefty-3-Disc-Gravel-Road-Bike-2021/PUC8",
    },
  ],
  ТТ: [
    {
      name: "Specialized S-Works Shiv",
      src: "./images/bike-model-specialized-s-works-shiv.jpg",
      link: "https://www.sigmasports.com/item/Specialized/S-Works-Shiv-Disc-Limited-Edition-Triathlon-Bike-2019/K8P9",
    },
    {
      name: "BMC Timemachine 01 ONE",
      src: "./images/bike-model-bmc-timemachine-01-one.jpg",
      link: "https://www.sigmasports.com/item/BMC/Timemachine-01-One-Force-Disc-TT-Triathlon-Bike-2021/S835",
    },
    ,
    {
      name: "Cervelo P-Series",
      src: "./images/bike-model-cervelo-p-series.jpg",
      link: "https://www.sigmasports.com/item/Cervelo/P-Series-Ultegra-Di2-TT-Triathlon-Bike-2021/RM6Q",
    },
  ],
};

// ** DOM-элементы
// Блок 'Типы трасс'
const trailTypes = document.querySelector(".trail-types");
const prevBtn = trailTypes.querySelector(".button_type_previous");
const nextBtn = trailTypes.querySelector(".button_type_next");
// Блок 'Велосипеды'
const bikes = document.querySelector(".bikes");
const bikesSelector = bikes.querySelector(".bikes__selector");
const bikesButtonGroup = bikes.querySelector(".bikes__button-group");
const bikesList = bikes.querySelector(".bikes__list");
// Блок 'Подписка на рассылку'
const subscription = document.querySelector(".subscription");
const subscriptionForm = subscription.querySelector(".subscription__form");
const subscriptionInput = subscriptionForm.querySelector(
  '.subscription__input[name="user-email"]'
);
const subscriptionButton = subscriptionForm.querySelector(
  ".subscription__accept-btn"
);
// Модальное окно 'Меню'
const modalMenuOpenBtn = document.querySelector(".header__menu-button");
const modalMenu = document.querySelector(".modal_type_menu");
const modalMenuCloseBtn = modalMenu.querySelector(".modal__close");
const modalMenuLinks = modalMenu.querySelectorAll(".modal__link");

// ** Слайдеры
// Инициализация слайдера для блока 'Виды покрытий'
const trailTypesSlider = new Swiper(".trail-types", {
  direction: "horizontal",
  loop: true,
  speed: 800,
  spaceBetween: 300,
});

// Инициализация слайдера для блока 'Велосипеды'
const bikesSlider = new Swiper(".bikes__container", {
  slidesPerView: 1,
  spaceBetween: 10,
  observer: true,
  observeParents: true,

  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    bulletClass: "swiper__bullet",
    bulletActiveClass: "swiper__bullet_active",
  },
});

// ** Функции
// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Функция закрытия модального окна
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Функция инициализации селектора в блоке 'Велосипеды'
function initBikesSelector(list, selector, initialData) {
  for (let prop in initialData) {
    const option = document.createElement("option");
    option.classList.add("bikes__selector-option");
    option.value = prop;
    option.textContent = prop;
    selector.append(option);
  }
  // Обработчик изменения списка отображаемых карточек велосипедов в зависимости от выбранного
  // значения типа покрытия из выпадающего списка
  selector.addEventListener("change", (event) => {
    const selectedOption =
      event.target.options[event.target.selectedIndex].value;
    fillBikesList(list, initialData, selectedOption);
  });
}

// Функция ициализации группы кнопок в блоке 'Велосипеды'
function initBikesButtonGroup(list, buttonGroup, initialData) {
  for (let prop in initialData) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.classList.add("bikes__input");
    label.classList.add("bikes__button");
    input.type = "radio";
    input.id = prop;
    input.name = "bikes-type";
    input.value = prop;
    label.htmlFor = prop;
    label.textContent = prop;
    // Обработчик изменения списка отбражаемых карточек велосипедов при нажатии на кнопку
    // выбора типа покрытия в группе кнопок
    input.addEventListener("click", (event) => {
      fillBikesList(list, initialData, event.target.value);
    });
    buttonGroup.append(input);
    buttonGroup.append(label);
  }
  if (buttonGroup.firstChild !== null) {
    buttonGroup.firstChild.checked = true;
  }
}

// Функция создания новой карточки велосипеда
function createBikesItem(name, src, link) {
  const bikesItemTemplate = document.querySelector("#bikes-item").content;
  const bikesItem = bikesItemTemplate
    .querySelector(".bikes__list-item")
    .cloneNode(true);
  const image = bikesItem.querySelector(".bikes__image");
  const imageLink = bikesItem.querySelector(".bikes__link");
  const imageCaption = bikesItem.querySelector(".bikes__image-caption");
  image.src = src;
  image.alt = name;
  imageLink.href = link;
  imageCaption.textContent = name;
  return bikesItem;
}

// Функция инициализации списка велосипедов в блоке 'Велосипеды'
function fillBikesList(list, initialData, trailType) {
  list.innerHTML = "";
  initialData[trailType].forEach((bike) => {
    list.append(createBikesItem(bike.name, bike.src, bike.link));
  });
}

// ** Обработчики действий пользователя
// Обработчик преключения слайдов в слайдере блока 'Типы трасс'
prevBtn.addEventListener("click", () => trailTypesSlider.slidePrev());
nextBtn.addEventListener("click", () => trailTypesSlider.slideNext());

// Обработчик кнопки подписки на рассылку
subscriptionButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("click");
  subscriptionForm.reset();
  subscriptionInput.placeholder = "Круто!";
  setTimeout(() => {
    subscriptionInput.placeholder = "Ваш e-mail";
  }, 7000);
});

// Обработчик открытия модального окна 'Меню'
modalMenuOpenBtn.addEventListener("click", () => openModal(modalMenu));
// Обработчик закрытия модального окна 'Меню'
modalMenuCloseBtn.addEventListener("click", () => closeModal(modalMenu));
// Обработчик закрытия модального окна 'Меню' при переходе по ссылке
modalMenuLinks.forEach((link) =>
  link.addEventListener("click", () => closeModal(modalMenu))
);

// ** Начальная инициализация страницы
initBikesSelector(bikesList, bikesSelector, initialBikeCards);
initBikesButtonGroup(bikesList, bikesButtonGroup, initialBikeCards);
fillBikesList(bikesList, initialBikeCards, Object.keys(initialBikeCards)[0]);
