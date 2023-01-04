import modulesConst from './constans.js';
// import modulesTable from './table.js';

const {
  checkModal,
  inputModalSale,
  totalPriceModal,
  inputModalPrice,
  inputModalCount, 
  overlayErr,
  tBody,  
  totalPriceALL,
  totalPriceArray,
  URLmain, 
} = modulesConst;

// const {
//   calculationTotalPriceTable,
//   createRow,
// } = modulesTable;



//чекбокс и инпут в модальном окне
// const checkboxInput = () => {
//     checkModal.addEventListener('change', (e) => {
//       if (e.target.checked) {
//         inputModalSale.disabled = false;
//       } else {
//         inputModalSale.disabled = true;
//         inputModalSale.value = " ";
//       };
//     });
//     };
        
  
    //расчет общей стоимости на форме при изменнии инпутов
    const calculationTotalPrice = () => {
        if (inputModalPrice !== ' ' & inputModalCount !== ' '){
          let totalPrice = inputModalPrice.value*inputModalCount.value;
          if (inputModalSale.value == 'METHED'){
            totalPrice -= totalPrice/10;       
        };
        totalPriceModal.textContent = totalPrice;
      };
    };

    //Функция загрузки стилей
      const styles = new Map();
      const loadStyle = (url) => {
      if (styles.has(url)) {
        return  styles.get(url);
      }
      const stylePromise = new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.addEventListener('load', () => {
          resolve();
        });  
        document.head.append(link);
      });
      styles.set(url, stylePromise);
      return stylePromise;
}


  export default {
    // checkboxInput,
    // sendingForm,
    calculationTotalPrice,
    // priceFocus,
    // countFocus,
    // saleFocus,
    loadStyle,
  };