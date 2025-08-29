
//Сделать правильную передачу количества блюд в коризну (СДЕЛАНО)
//Сделать правильную логику, при добавлении одного и того же блюда (СДЕЛАНО)
//Сделать правильное отображение цены в total (СДЕЛАНО)
//Сделать правильное отображение количества позиций в корзине (СДЕЛАНО)
//Сделать контекстное меню(СДЕЛАНО)
//Сделать наполнение контекстного меню
//
//Доделать стили
//Сделать корректный адаптив




// const menu = document.querySelector('.menu-items'),
//     cart = document.querySelector('.cart-items')

// let cartData = [];
// let totalPrice = 0;

// //Получаю данные из файла
// function init() {
//     fetch('data.json')
//     .then(response => {
//         if(!response.ok) {
//             throw new Error('Ошибка сети: ' + response.status);
//         }
//         return response.json();
//     })
//     .then(data => {
//         render(data);
//     })

// }

// //Функция рендера, которая динамически выводит элементы на страницу, и навешивает обработчики события на динамически созданные элементы.
// //По другому никак.
// function render(data) {
//     menu.innerHTML = '';
//     cart.innerHTML = '';
//     document.querySelector('.cart-positions').textContent = `Your cart(${cartData.length})`;

//     //Динамический рендер элементов меню
//     data.forEach(item => {
//         const {category, name, price, image} = item;

//         menu.insertAdjacentHTML('beforeend', `
//             <div class="menu-item">
//                 <div class="menu-img">
//                 <img class='menu-dish' src="${image.desktop}" alt="">
//                 <button class="add-to-cart">
//                     <div class="default-btn">
//                         <img src="assets/images/icon-add-to-cart.svg" alt="cart">
//                         Add to Cart
//                     </div>
//                     <div class="hover-btn hidden">
//                         <img class="decrement" src="assets/images/icon-decrement-quantity.svg" alt="">
//                         <p class="quantity-btn">1</p>
//                         <img class="increment" src="assets/images/icon-increment-quantity.svg" alt="">
//                     </div>
//                 </button>
//                 </div>

//                 <div class="menu-description">
//                 <p class="dish-title">${category}</p>
//                 <p class="dish-description">${name}</p>
//                 <p class="dish-price">$${price}</p>
//                 </div>
//             </div>
//         `);
//     })


//     //Динамический рендер элементов корзины
//     cartData.forEach((item, index) => {
//         const {name, price, quantity} = item;

//         cart.insertAdjacentHTML('beforeend', `
//             <div class="cart-item" data-id=${index}>
//                 <p>${name}</p>

//                 <div class="cart-item-info">
//                     <p class="quantity">${quantity}x</p>
//                     <p class="price">${price}</p>
//                     <p class="price-all">$${Number(price.slice(1)) * Number(quantity)}</p>
//                 </div>
            
//                 <span class="cart-remove">
//                     <img src="assets/images/icon-remove-item.svg" alt="">
//                 </span>
//             </div>
//         `)
//     })

//     //Динамический рендер контекстного меню

//     //Вызывается массив позиций, которые пользователь добавил в корзину, forEach проходит по каждой позиции, вставляя её в DOM, заполняя все данные в верстке
//     document.querySelector('.order-confirmed-positions').innerHTML = ''
//     cartData.forEach(item => {
//         let {img, name, quantity, price} = item;

//         // console.log(item);

//         document.querySelector('.order-confirmed-positions').insertAdjacentHTML('beforeend', `
//             <div class="order-confirmed-position">
//                 <img src=${img} alt="">

//                 <div class="order-position-info">
//                     <p class="order-position-title">${name}</p>
//                     <p class="order-position-quantity">${quantity}</p>
//                     <p class="order-positon-price">${price}</p>
//                 </div>

//                 <p class="order-position-total">$${Number(price.slice(1)) * Number(quantity)}</p>
//             </div
//         `)
//     })




//     //Подсчёт суммы позиций в корзине и её вывод пользователю
//     totalPrice = 0;
//     cartData.forEach(item => {
//         totalPrice = totalPrice + Number(item.price.slice(1)) * Number(item.quantity);
//     })
//     document.querySelector('.order-price').textContent = `$${totalPrice}`;


//     //Удаление позиции из корзины покупок
//     document.querySelectorAll('.cart-remove').forEach(item => {
//         item.addEventListener('click', e => {
//             e.currentTarget.closest('.cart-item').remove();
//             cartData.splice(e.currentTarget.closest('.cart-item').dataset.id, 1);
//             document.querySelector('.cart-positions').textContent = `Your cart(${cartData.length})`;

//             document.querySelectorAll('.order-confirmed-position').forEach(item => {
//                 // console.log(item.querySelector('.order-position-title').textContent);

//                 console.log(e.target)
//             })
            
//             init();
//         })
//     })

//     //Добавление элемента из меню в корзину покупок
//     document.querySelectorAll('.add-to-cart').forEach(item => {
//         item.addEventListener('click', e => {
//             let hasTwin = false;
//             let object = {
//                 name: e.currentTarget.closest('.menu-item').children[1].children[1].textContent,
//                 price: e.currentTarget.closest('.menu-item').children[1].children[2].textContent,
//                 quantity: e.currentTarget.closest('.menu-item').querySelector('.quantity-btn').textContent,
//                 img: e.currentTarget.closest('.menu-item').querySelector('img').src
//             }


//             cartData.forEach(item => {
//                 if(item.name === object.name) {
//                     // console.log(`Вы пытаетесь добавить уже существующую позицию ${object.name}, количество в корзине: ${item.quantity}. Количество добавляемого: ${object.quantity}`);
//                     item.quantity = Number(item.quantity) + Number(object.quantity);
//                     hasTwin = true;
//                 } else {
//                     hasTwin = false;
//                 }
//             })

//             if(!hasTwin) {
//                 cartData.push(object);
//             }

//             init();
//         })
//     })

//     //Изменение контента в кнопке "Add to cart" при наведении мыши на элемент
//     document.querySelectorAll('.add-to-cart').forEach(item => {
//         item.addEventListener('mouseenter', e => {
//             // console.log('Мышь на кнопке');
//             e.currentTarget.querySelector('.default-btn').className.add('hidden');
//             e.currentTarget.querySelector('.default-btn').className.remove('active');

//             e.currentTarget.querySelector('.hover-btn').className.remove('hidden');
//             e.currentTarget.querySelector('.hover-btn').className.add('active-hover');


//         })
//     })

//         document.querySelectorAll('.add-to-cart').forEach(item => {
//         item.addEventListener('mouseleave', e => {
//             // console.log('Мышь вышла за пределы кнопки');
//             e.currentTarget.querySelector('.default-btn').className.remove('hidden');
//             e.currentTarget.querySelector('.default-btn').className.add('active');

//             e.currentTarget.querySelector('.hover-btn').className.remove('active-hover');
//             e.currentTarget.querySelector('.hover-btn').className.add('hidden');
//         })
//     })


//     //Прибавление или убавление количества единиц товара, при занесении в корзину
//     document.querySelectorAll('.decrement').forEach(item => {
//         item.addEventListener('click', e => {
//             e.stopPropagation();
//             e.currentTarget.parentElement.children[1].textContent = Number(e.currentTarget.parentElement.children[1].textContent) - 1
//         })
//     })

//     document.querySelectorAll('.increment').forEach(item => {
//         item.addEventListener('click', e => {
//             e.stopPropagation();
//             e.currentTarget.parentElement.children[1].textContent = Number(e.currentTarget.parentElement.children[1].textContent) + 1
//         })
//     })


//     //Вызов контекстного меню
//     document.querySelector('.confirm').addEventListener('click', e => {
//         document.querySelector('.layout-window').className.remove('hidden-layout');
//         document.querySelector('.layout-window').className.add('active-layout');
//     })

//     //Выход из контекстного меню
//     document.querySelector('.layout-window').addEventListener('click', e => {
//         if(e.target.className == "layout-window active-layout") {
//             e.target.className.remove('active-layout');
//             e.target.className.add('hidden-layout');
//         }
//     })
// }


// init();


let menuItems = document.querySelector('.menu-items'),
    cart = document.querySelector('.cart-items'),
    cartData = [];


let getData = new Promise((resolve, reject) => {
    fetch('./data.json')
        .then(data => {
            resolve(data.json());
        })
})

getData.then(data => {
    renderPositions(data);

    // const renderedPositions = document.querySelectorAll('.menu-position');
    // choosePosition(renderedPositions);
    addToCart();
})

function renderPositions (data) {
    data.forEach(item => {
        let {category, image, name, price} = item;
        createPosition(category, image, name, price,);
    })
}

function createPosition(category, image, name, price) {
    let positionContainer = document.createElement('div');
    positionContainer.className = 'menu-position';

   //------------------------------------------------------------------------

    let menuPosition = document.createElement('div');
    menuPosition.className = 'position-label'

    let labelImage = document.createElement('img');
    labelImage.className = 'label-img'
    labelImage.src = image.desktop

    let labelButton = document.createElement('button');
    labelButton.className = 'add-to-cart';

    let defaultButton = document.createElement('div');
    defaultButton.className = 'default-btn';

    let defaultButtonImg = document.createElement('img');
    defaultButtonImg.src = './assets/images/icon-add-to-cart.svg'

    let defaultButtonText = document.createElement('p');
    defaultButtonText.textContent = 'Add to cart';

    let hoverButton = document.createElement('div');
    hoverButton.className = 'hover-btn hidden';

    let hoverButtonDecrement = document.createElement('img');
    hoverButtonDecrement.className = 'decrement';
    hoverButtonDecrement.src = './assets/images/icon-decrement-quantity.svg';

    let hoverButtonQuantity = document.createElement('p');
    hoverButtonQuantity.className = 'quantity-btn';
    hoverButtonQuantity.textContent = '1'


    let hoverButtonIncrement = document.createElement('img');
    hoverButtonIncrement.className = 'increment';
    hoverButtonIncrement.src = './assets/images/icon-increment-quantity.svg'

    //------------------------------------------------------------------------
  

    let positionDescription = document.createElement('div');
    positionDescription.className = 'position-description';

    let positionCategory = document.createElement('p');
    positionCategory.className = 'position-title';
    positionCategory.textContent = category;

    let positionName = document.createElement('p');
    positionName.className = 'position-name';
    positionName.textContent = name;

    let positionPrice = document.createElement('p');
    positionPrice.className = 'position-price';
    positionPrice.textContent = `$${price}`

    //-------------------------------------------------------------------------
    defaultButton.append(defaultButtonImg);
    defaultButton.append(defaultButtonText);

    hoverButton.append(hoverButtonDecrement);
    hoverButton.append(hoverButtonQuantity);
    hoverButton.append(hoverButtonIncrement);

    labelButton.append(defaultButton);
    labelButton.append(hoverButton);

    menuPosition.append(labelImage);
    menuPosition.append(labelButton);


    positionDescription.append(positionCategory);
    positionDescription.append(positionName);
    positionDescription.append(positionPrice);

    positionContainer.append(menuPosition);
    positionContainer.append(positionDescription);

    menuItems.append(positionContainer);
};


// function choosePosition(positions) {
//     positions.forEach(item => {
//         item.querySelector('.position-label').addEventListener('click', e => {
//             let addToCartBtn = e.currentTarget.querySelector('.add-to-cart'),
//                 defaultBtn = addToCartBtn.querySelector('.default-btn'),
//                 hoverBtn = addToCartBtn.querySelector('.hover-btn');

//             //Удаляю рамку со всех позиций
//             positions.forEach(item => {
//                 item.querySelector('.label-img').classList.remove('label-active');

//                 item.querySelector('.default-btn').classList.remove('hidden');
                
//                 item.querySelector('.hover-btn').classList.add('hidden');
//                 item.querySelector('.hover-btn').classList.remove('active');
//             })
//             //Навешиваю рамку на позицию, которую выбрал пользователь
//             e.currentTarget.querySelector('.label-img').classList.add('label-active');

//             //Изменяю контент в кнопке активной позиции
//             defaultBtn.classList.add('hidden')
//             hoverBtn.classList.remove('hidden');
//             hoverBtn.classList.add('active');
//         })
//     })

//     addToCart();
// };

function addToCart() {
    let addToCartBtn = document.querySelectorAll('.add-to-cart');
    let quantity = 1;


    addToCartBtn.forEach(item => {
        item.addEventListener('mouseenter', e => {
            e.target.querySelector('.default-btn').classList.add('hidden')
            e.target.querySelector('.hover-btn').classList.remove('hidden');
        })
    })

        addToCartBtn.forEach(item => {
        item.addEventListener('mouseleave', e => {
            e.target.querySelector('.default-btn').classList.remove('hidden')
            e.target.querySelector('.hover-btn').classList.add('hidden');
            
            
            quantity = 1;
            e.target.querySelector('.quantity-btn').textContent = quantity;
        })
    })


    menuItems.addEventListener('click', e => {
        //Выбор количества позиций через делегирование событий
        if(e.target.classList.contains('decrement') && quantity > 1) {
            quantity--;
            e.target.parentElement.querySelector('.quantity-btn').textContent = quantity;
        }

        if(e.target.classList.contains('increment')) {
            quantity++;
            e.target.parentElement.querySelector('.quantity-btn').textContent = quantity;
        }

        //Отправка в корзину
        if(e.target.classList.contains('hover-btn')) {
            let positionOrder = {
                category: e.target.closest('.menu-position').querySelector('.position-description').querySelector('.position-title').textContent,
                name: e.target.closest('.menu-position').querySelector('.position-description').querySelector('.position-name').textContent,
                price: e.target.closest('.menu-position').querySelector('.position-description').querySelector('.position-price').textContent,
                quantity: quantity
            }
            let hasTwin = false;
            
            cartData.forEach(item => {
                console.log(item.name);
                console.log(positionOrder.name)
            })

            if(!hasTwin) cartData.push(positionOrder);

            renderCart();
        }
    })
};

function renderCart() {

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const itemName = document.createElement('p');
    itemName.className = 'cart-name';

    const itemInfo = document.createElement('div');
    itemInfo.className = 'cart-item-info';

    const infoQuantity = document.createElement('p');
    infoQuantity.className = 'quantity';

    const infoPrice = document.createElement('p');
    infoPrice.className = 'price';

    const infoPriceTotal = document.createElement('p');
    infoPriceTotal.className = 'price-all';

    const itemRemove = document.createElement('span');
    itemRemove.className = 'cart-remove';

    const itemRemoveImage = document.createElement('img');
    itemRemoveImage.src = './assets/images/icon-remove-item.svg'

    itemRemove.append(itemRemoveImage);
    itemInfo.append(infoQuantity);
    itemInfo.append(infoPrice);
    itemInfo.append(infoPriceTotal);
    cartItem.append(itemName);
    cartItem.append(itemInfo);
    cartItem.append(itemRemove);

    cart.append(cartItem);
}


//             <div class="cart-item" data-id=${index}>
//                 <p>${name}</p>

//                 <div class="cart-item-info">
//                     <p class="quantity">${quantity}x</p>
//                     <p class="price">${price}</p>
//                     <p class="price-all">$${Number(price.slice(1)) * Number(quantity)}</p>
//                 </div>
            
//                 <span class="cart-remove">
//                     <img src="assets/images/icon-remove-item.svg" alt="">
//                 </span>
//             </div>