const btnAdd = document.querySelector('.btn-add');
const overlayModal= document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const modalForm = document.querySelector('.wrapper-add');
const tBody = document.querySelector('tbody');
const tHead = document.querySelector('thead');
const arrayTr = tBody.getElementsByTagName('tr');
const formModal = document.querySelector('.form');
const checkModal = document.querySelector('.form__input_chk');
const inputModalSale = document.querySelector('.form__input_sale');
const modalID = document.querySelector('.vendor-code__id');
const totalPriceModal = document.querySelector('.totalprice-modal');
const inputModalPrice = document.querySelector('.form__input_price');
const inputModalCount = document.querySelector('.form__input_count');
const totalPriceHeader = document.querySelector('.totalprice-header');
const totalPriceArray = document.getElementsByClassName('totalprice-td');
const searchInput = document.querySelector('.search-text');
let DI =5;
let priceAll =0;
const overlayErr = document.querySelector('.overlay-err');
const errMessage = document.querySelector('.err-message');
const URLmain = 'http://localhost:3000/api/goods';

export default {
    btnAdd,
    overlayModal,
    btnClose,
    modalForm,
    tBody,
    tHead,
    arrayTr,
    formModal,
    checkModal,
    inputModalSale,
    modalID,
    totalPriceModal,
    inputModalPrice,
    inputModalCount,
    totalPriceHeader,
    totalPriceArray,
    overlayErr,
    errMessage,
    URLmain,
    searchInput
  };

  window.ID = DI;
  window.totalPriceALL = priceAll;
  