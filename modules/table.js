
import modulesConst from './constans.js';
// import modulesForm from './form.js';


const {
  btnAdd,
  overlayModal,
  tBody,
  tHead,
  arrayTr,
  totalPriceHeader,
  totalPriceArray,
  overlayErr,
  errMessage,
  URLmain     
} = modulesConst;


// const {
//     calculationTotalPrice,
//     fetchRequest,
//     loadStyle,
//     showModal,
// } = modulesForm;



// Функция создание строки и добавления её в таблицу
const createRow = (err, { title, category, units, count, id, price, discount}) => {
  let allID = document.querySelectorAll('.one');
  allID.forEach(item => {
    if (item.textContent == id )
      {
        const trItem = item.closest('tr');
        trItem.remove();
      }
      
  });
  
  let totalPrice = count*price;
  if (discount == 'METHED'){
      totalPrice -= totalPrice/10;
  };

  const tr = document.createElement('tr');

  const tdID = document.createElement('td');
  tdID.textContent = id;
  tdID.classList.add('one');

  const tdName = document.createElement('td');
  tdName.textContent = title;

  const tdCategory = document.createElement('td');
  tdCategory.textContent = category;

  const tdSUnit = document.createElement('td');
  tdSUnit.textContent = units;
  
  const tdCount = document.createElement('td');
  tdCount.textContent = count;

  const tdPrice = document.createElement('td');
  tdPrice.textContent = `$${price}`;

  const tdTotal = document.createElement('td');
  tdTotal.classList.add('totalprice-td');
  tdTotal.textContent = `$${totalPrice}`;

  const tdIMG = document.createElement('td');
  tdIMG.innerHTML = `<button class="btn-img" >
                        <svg class="icon-btn-image" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.7778 2.22223H2.22223C1.92754 2.22223 1.64493 2.33929 1.43655 2.54767C1.22818 2.75604 1.11111 3.03866 1.11111 3.33334V16.6667C1.11111 16.9614 1.22818 17.244 1.43655 17.4523C1.64493 17.6607 1.92754 17.7778 2.22223 17.7778H17.7778C18.0725 17.7778 18.3551 17.6607 18.5635 17.4523C18.7718 17.244 18.8889 16.9614 18.8889 16.6667V3.33334C18.8889 3.03866 18.7718 2.75604 18.5635 2.54767C18.3551 2.33929 18.0725 2.22223 17.7778 2.22223ZM2.22223 16.6667V3.33334H17.7778V16.6667H2.22223Z" fill="#6E6893"/>
                            <path d="M4.95555 7.77778C5.28518 7.77778 5.60741 7.68003 5.8815 7.49689C6.15558 7.31376 6.3692 7.05346 6.49535 6.74892C6.62149 6.44437 6.6545 6.10926 6.59019 5.78596C6.52588 5.46266 6.36715 5.16569 6.13406 4.9326C5.90097 4.69951 5.604 4.54078 5.2807 4.47647C4.9574 4.41216 4.62228 4.44516 4.31774 4.57131C4.0132 4.69746 3.7529 4.91108 3.56976 5.18516C3.38663 5.45924 3.28888 5.78147 3.28888 6.11111C3.28888 6.55314 3.46447 6.97706 3.77703 7.28962C4.0896 7.60218 4.51352 7.77778 4.95555 7.77778ZM4.95555 5.22222C5.13158 5.22112 5.30399 5.27232 5.45089 5.36932C5.5978 5.46632 5.71259 5.60476 5.78072 5.76708C5.84885 5.9294 5.86725 6.1083 5.83358 6.28109C5.79992 6.45389 5.7157 6.61279 5.59161 6.73766C5.46752 6.86253 5.30915 6.94774 5.13657 6.98249C4.96399 7.01724 4.78498 6.99997 4.62223 6.93285C4.45949 6.86574 4.32033 6.75182 4.22241 6.60552C4.12449 6.45923 4.07222 6.28715 4.07221 6.11111C4.07367 5.87729 4.1672 5.65345 4.33255 5.48811C4.49789 5.32277 4.72172 5.22923 4.95555 5.22778V5.22222Z" fill="#6E6893"/>
                            <path d="M12.6555 8.53889L9.65555 11.5389L7.43332 9.31666C7.32923 9.21319 7.18843 9.15511 7.04166 9.15511C6.89489 9.15511 6.75408 9.21319 6.64999 9.31666L3.28888 12.7222V14.2944L7.0611 10.5222L8.88888 12.3222L6.80555 14.4056H8.33332L13.0278 9.71111L16.6667 13.3333V11.7667L13.4389 8.53889C13.3348 8.43541 13.194 8.37733 13.0472 8.37733C12.9004 8.37733 12.7596 8.43541 12.6555 8.53889Z" fill="#6E6893"/>
                        </svg>
                      </button>`;

  const tdEdit = document.createElement('td');
  tdEdit.innerHTML = `<button class="btn-edit" data-id ="${id}">
                        <svg class="icon-edit" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6721 3.6456L12.2295 5.20223L10.6721 3.6456ZM11.6736 2.27426L7.46254 6.48534C7.24496 6.70262 7.09657 6.97945 7.03607 7.28093L6.64709 9.22801L8.59417 8.8383C8.89565 8.77801 9.17212 8.63021 9.38977 8.41256L13.6008 4.20149C13.7274 4.07495 13.8278 3.92472 13.8962 3.75938C13.9647 3.59404 14 3.41684 14 3.23788C14 3.05892 13.9647 2.88171 13.8962 2.71637C13.8278 2.55104 13.7274 2.40081 13.6008 2.27426C13.4743 2.14772 13.3241 2.04734 13.1587 1.97886C12.9934 1.91037 12.8162 1.87512 12.6372 1.87512C12.4583 1.87512 12.2811 1.91037 12.1157 1.97886C11.9504 2.04734 11.8002 2.14772 11.6736 2.27426V2.27426Z" stroke="#6E6893" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.5295 10.6986V12.9045C12.5295 13.2945 12.3746 13.6686 12.0988 13.9444C11.823 14.2202 11.449 14.3751 11.0589 14.3751H2.9706C2.58058 14.3751 2.20652 14.2202 1.93073 13.9444C1.65494 13.6686 1.5 13.2945 1.5 12.9045V4.81618C1.5 4.42616 1.65494 4.0521 1.93073 3.77631C2.20652 3.50052 2.58058 3.34558 2.9706 3.34558H5.17651" stroke="#6E6893" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>`;

  const tdDel = document.createElement('td');
  tdDel.innerHTML = `<button class="btn-del">
                        <svg class="icon-btn-del" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z" fill="#6E6893"/>
                        </svg>  
                      </button>`;

  tr.append(tdID, tdName, tdCategory, tdSUnit, tdCount, tdPrice, tdTotal, tdIMG, tdEdit, tdDel);
  return tr;
};

//Расчет итоговой стоимости в хедере таблицы
const calculationTotalPriceTable = () => {
  for (let price of totalPriceArray){
    totalPriceALL += parseInt(price.textContent.slice(1)) ;
  };
  totalPriceHeader.innerText = totalPriceALL;
  totalPriceALL = 0;
};

//Удаление строки в таблице при нажатии на корзину
const deleteTr = () => {
  tBody.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.btn-del')) {
          const trTarget = target.closest('tr');
          const question = confirm("Вы хотите удалить товар?");

          if (question){
            const newURL = target.parentNode.parentNode.previousSibling.firstChild.dataset.id

            const itemURL =  `${URLmain}/${target.parentNode.parentNode.previousSibling.firstChild.dataset.id}`;

            fetch(itemURL, {
            method: 'DELETE',
          });

          trTarget.remove();
          }
      };
      calculationTotalPriceTable();
  });
  };

  //Открытие картинки при нажатии на иконку 
  const openIMG = () => {
    tBody.addEventListener('click', async e => {
      const target = e.target;
        if (target.closest('.icon-btn-image') ) { 
          const itemHost = 'http://localhost:3000/'
          const itemURL =  `${URLmain}/${target.parentNode.parentNode.nextSibling.firstChild.dataset.id}`;
          const img = await fetch(itemURL)
          .then(response => response.json())
          .then(json => json.image)

            const topIndent = screen.height/2-300;
            const leftIndent = screen.width/2-300; 
            const win = open('about:blank','' , 'width = 600, height=600, top= '+topIndent+', left = '+leftIndent+'');
            win.document.body.innerHTML = `
            <img src= ${itemHost}${img} style= "width: 100%; height:100%; object-fit: cover;">
             `
        };
      });
    };

//Открытие модального окна
const openModal = () => {
  btnAdd.addEventListener('click', () => {
  overlayModal.classList.add('visible');
});
};

//Закрытие модального окна и оверлея
const closeModal = () => {
  overlayModal.addEventListener('click', e => {
      const target = e.target;
      if (target === overlayModal || target.closest('.close')) {
          overlayModal.classList.remove('visible');
      };
  });
  };


  export default {
    createRow,
    calculationTotalPriceTable,
    deleteTr,
    openIMG,
    openModal,
    closeModal,
  };