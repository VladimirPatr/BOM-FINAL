import modulesConst from './modules/constans.js';
import modulesTable from './modules/table.js';
import modulesForm from './modules/form.js';

const {
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
} = modulesConst;

const {
  createRow,
  calculationTotalPriceTable,
  deleteTr,
  openIMG,
  // editBTn,
  // openModal,
  closeModal 
} = modulesTable;

const {
    // checkboxInput,
    // showModal,
    // priceFocus,
    // countFocus,
    // saleFocus,
    loadStyle,
} = modulesForm;


// Универсальная функция занрузки и отправки данных с сервера с помощью Fetch
const fetchRequest = async (URLmain, {
  method = "GET",
  cb,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(URLmain, options);
    if (response.ok) {
      const data = await response.json();

      if (cb && method == 'GET' && (response.status === 200 || response.status === 201)) {
        if (!Array.isArray(data) && typeof data === 'object') {
          let tr = cb(null, data);
          if (cb == showModal){
            if(data !== undefined){
             
            }
            return
          }
          tBody.append(tr);
          return
        };
        data.map(item => {
        let tr = cb(null, item);
        tBody.append(tr);
      });
      };

      if (cb && method == 'POST' && (response.status !== 422 || response.status !== 404 || response.status < 500)) {
        cb(null, data);
      };
      if (cb && method == 'PATCH') {
        cb(null, data);
      };
      calculationTotalPriceTable()
      }
      if (response.status === 422 || response.status === 404 || response.status > 500){
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
    
      // else {
      //   throw new Error(`Что-то пошло не так`);
      // }
    
  } catch(err) {
      console.warn(err);
      overlayErr.classList.add('visible');
      // errMessage.textContent = err;
      // cb(err);
  };
};

// Функция показа модального окна с формой
const showModal = async (err, data, categoryes) => {

    if (!data) {
      data = {};
      data.title = '';
      data.category = '';
      data.description = '';
      data.units = '';
      data.count = '';
      data.price = ''; 
    }
    
    await loadStyle('modal.css');
    const overlay = document.createElement('div');
    const wrapperAdd = document.createElement('div');
  
    overlay.classList.add('overlay');
    overlay.classList.add('visible');
    wrapperAdd.classList.add('wrapper-add');
    wrapperAdd.insertAdjacentHTML('afterBegin', `
        <button class="close close-modal"><img src="img/icon-close.svg" alt=""></button>
        <h1 class="title-add">Добавить ТОВАР</h1>
          <form class="form" id="form" action="#" method="POST">
            
                <div class="form__wrapper-inp form__wrapper-inp-1">
                    <h2 class="form__subtitle">Наименование</h2> 
                    <input type="text" name="title" class="form__input" value = "${data.title}" >
                </div>
                    
                <div class="form__wrapper-inp form__wrapper-inp-2">
                    <h2 class="form__subtitle">Катеогория</h2> 
                    <input type="text" name="category" class="form__input" value = "${data.category}" list="category-list">

                    <datalist id='category-list'>
                   
                    </datalist>
                </div>
      
                <div class="form__wrapper-area">
                    <h2 class="form__subtitle">Описание</h2>
                    <textarea name="description" class="form__input form__area" >${data.description}</textarea>
                </div>
                <div class="form__wrapper-inp form__wrapper-inp-3">
                    <h2 class="form__subtitle">Единицы измерения</h2> 
                    <input type="text" name="unit"  class="form__input" value = ${data.units}>
                </div>
      
                <div class="form__wrapper-inp form__wrapper-inp-4">
                    <h2 class="form__subtitle">Количество</h2> 
                    <input type="number" name="count"  class="form__input form__input_count" value = ${data.count}>
                </div>
      
                <div class="form__wrapper-chk">
                    <h2 class="form__subtitle">Дисконт</h2> 
                    <div class="chk-wrap">
                        <input type="checkbox" name="sale" value="true" class="form__input form__input_chk" checked>
                        <input type="text" name="discount" class="form__input form__input_sale">
                    </div>
                    
                </div>
                <div class="form__wrapper-inp form__wrapper-inp-5">
                    <h2 class="form__subtitle">Цена</h2> 
                  <input type="number" name="price"  class="form__input form__input_price" value = ${data.price}>
                </div>
                <p class="form__caption">Изображение не должно превышать размер 1 Мб</p>
                <div class="loader-wrapper" >
                    <input id="files" style="visibility:hidden;" type="file" name="image">
                    <label for="files" class="btn label-btn">Добавить изображение</label> 
                </div>
                <div class="form__img-wrapper"><img class="form__img"></div>
              </form>  
            <div class="form-footer">
                <p>Итоговая стоимость: $<span class="totalprice-modal">0</span></p> <button type="submit" class="btn btn-addproduct" form="form">Добавить товар</button>
            </div>            
    `);
    overlay.append(wrapperAdd);
    document.body.append(overlay);

    if (categoryes) {
      const datalist = overlay.querySelector('#category-list');

      categoryes.forEach(item=>{
        const option = document.createElement('option');
        option.value = `${item}`;
        datalist.append(option)
      })
    }

    const modalForm = overlay.querySelector('.form');
    const file = overlay.querySelector('#files');
    const formiImg = overlay.querySelector('.form__img');

    const toBase64 = file => new Promise((resolve, reject)=> {
      const reader = new FileReader();

      reader.addEventListener('loadend', ()=> {
        resolve(reader.result);
      });

      reader.addEventListener('error', err => {
        reject(err)
      });
      reader.readAsDataURL(file);
    });

    file.addEventListener('change', () => {
      if (file.files.length > 0) {
        const src = URL.createObjectURL(file.files[0]);

        if (file.files[0].size>1000000){
          return
        }
        overlay.querySelector('.form__caption').style.visibility='hidden' ;
        formiImg.src = src;  
      };
    });
    //проверка полей вводна на киррилицу и числа
    const cyrillicReg = /[^А-Яа-яЁ ]/g;
    const cyrillicOnlyReg = /[^А-Яа-яЁ]/g;
    const numberReg = /\D+/;


    modalForm.title.addEventListener('input', ()=> {
      modalForm.title.value = modalForm.title.value.replace(cyrillicReg, '');
    });
    modalForm.category.addEventListener('input', ()=> {
      modalForm.category.value = modalForm.category.value.replace(cyrillicReg, '');
    });
    modalForm.description.addEventListener('input', ()=> {
      modalForm.description.value = modalForm.description.value.replace(cyrillicReg, '');
    });
    modalForm.unit.addEventListener('input', ()=> {
      modalForm.unit.value = modalForm.unit.value.replace(cyrillicOnlyReg, '');
    });
    modalForm.price.addEventListener('input', ()=> {
      modalForm.price.value = modalForm.price.value.replace(numberReg, '');
    });
    modalForm.count.addEventListener('input', ()=> {
      modalForm.count.value = modalForm.count.value.replace(numberReg, '');
    });
    modalForm.discount.addEventListener('input', ()=> {
      modalForm.discount.value = modalForm.discount.value.replace(numberReg, '');
    });
    
    let  idExists;
    let newURL;
    if (data.id) {
      idExists = data.id;
      newURL = `${URLmain}/${idExists}`;
    };
    overlay.addEventListener('click', e => {
          const target = e.target;
          if (target === overlay || target.closest('.close')) {
              overlay.classList.remove('visible');
          };
      });

      modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(modalForm);
        const data = Object.fromEntries(formData);
        data.image = await toBase64(data.image);
       if (modalForm.title.value.length && modalForm.category.value.length && modalForm.unit.value.length && modalForm.count.value.length && modalForm.price.value.length && modalForm.description.value.length>=80) {
        
        if (newURL) {
          fetchRequest(newURL, {
              method: 'PATCH',
              body:
              {
                title: data.title, 
                description: data.description, 
                price: data.price, 
                discount: data?.discount,
                count: data.count, 
                units: data.unit, 
                image: data?.image,
            },
            cb(err, data){  
             
                tBody.innerHTML = '';
                fetchRequest(URLmain, {
                  method: 'GET',
                  cb: createRow,
                });
              
          },
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            overlay.remove();
            return
        }
          fetchRequest(URLmain, {
          method: 'POST',
          body: 
          {
           title:  data.title,
           category:  data.category,
           discount: data?.discount,
           units:  data.unit,
           count:  data.count,
           price:  data.price,
           description : data.description,
           image : data?.image,
     
         },
          cb(err, data){  
                tBody.innerHTML = '';
                fetchRequest(URLmain, {
                  method: 'GET',
                  cb: createRow,
                }); 
          },
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      });
        overlay.remove();
       }  
      });
};

// //Открытие модального окна при открытии на иконку Редактировать в таблице
const editBTn = () => {
  tBody.addEventListener('click', ({target}) => {
      if (target.closest('.btn-edit')) {
        const targetItem = target.closest('.btn-edit');
        const itemURL =  `${URLmain}/${targetItem.dataset.id}`;

        fetchRequest(`${itemURL}`, {
          cb: showModal,
        });
      };
  });
  };

  //Открытие модального окна при нажатии на кнокну Добавить товар в таблице
const openModal = () => {
  btnAdd.addEventListener('click', async () => {
    const categoryes = await
    fetch('http://localhost:3000/api/category')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  showModal(null, null, categoryes);
});
};

  //Поиск товаров через через input
  let timer; 
  const searchGoods = () => {
    searchInput.addEventListener('keyup', () => {
      clearTimeout(timer); 
      timer = setTimeout(function(){

        const newURL = `${URLmain}/${searchInput.value}`;
        fetch(newURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data && data.id && searchInput.value>0){
            tBody.innerHTML = '';
            const tr = createRow(null, data);
            tBody.append(tr);
          }
        });
      },300);
    });
  };
 

//функция запуска всех функций INIT
{
const init = () => {
  fetchRequest('http://localhost:3000/api/goods', {
    method: 'GET',
    cb: createRow
    });
  openModal();
  closeModal();
  deleteTr();
  openIMG();
  editBTn();
  searchGoods()
  // checkboxInput();
  // priceFocus();
  // countFocus();
  // saleFocus();
  // sendingForm();
  // closeErrModal();
  // calculationTotalPriceTable();
}

window.CRMinit = init;
}
