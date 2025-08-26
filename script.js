
//Сделать правильную передачу количества блюд в коризну (СДЕЛАНО)
//Сделать правильную логику, при добавлени одного и того же блюда (СДЕЛАНО)
//Сделать правильное отображение цены в total (СДЕЛАНО)
//Сделать правильное отображение количества позиций в корзине (СДЕЛАНО)
//Доделать стили
//Сделать корректный адаптив




const menu = document.querySelector('.menu-items'),
    cart = document.querySelector('.cart-items')

let cartData = [];
let totalPrice = 0;

//Получаю данные из файла
function init() {
    fetch('data.json')
    .then(response => {
        if(!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        render(data);
    })

}

//Функция рендера, которая динамически выводит элементы на страницу, и навешивает обработчики события на динамически созданные элементы.
//По другому никак.
function render(data) {
    menu.innerHTML = '';
    cart.innerHTML = '';
    document.querySelector('.cart-positions').textContent = `Your cart(${cartData.length})`;

    //Динамический рендер элементов меню
    data.forEach(item => {
        const {category, name, price, image} = item;

        menu.insertAdjacentHTML('beforeend', `
            <div class="menu-item">
                <div class="menu-img">
                <img class='menu-dish' src="${image.desktop}" alt="">
                <button class="add-to-cart">
                    <div class="default-btn">
                        <img src="assets/images/icon-add-to-cart.svg" alt="cart">
                        Add to Cart
                    </div>
                    <div class="hover-btn hidden">
                        <img class="decrement" src="assets/images/icon-decrement-quantity.svg" alt="">
                        <p class="quantity-btn">1</p>
                        <img class="increment" src="assets/images/icon-increment-quantity.svg" alt="">
                    </div>
                </button>
                </div>

                <div class="menu-description">
                <p class="dish-title">${category}</p>
                <p class="dish-description">${name}</p>
                <p class="dish-price">$${price}</p>
                </div>
            </div>
        `);
    })


    //Динамический рендер элементов корзины
    cartData.forEach((item, index) => {
        const {name, price, quantity} = item;

        cart.insertAdjacentHTML('beforeend', `
            <div class="cart-item" data-id=${index}>
                <p>${name}</p>

                <div class="cart-item-info">
                    <p class="quantity">${quantity}x</p>
                    <p class="price">${price}</p>
                    <p class="price-all">$${Number(price.slice(1)) * Number(quantity)}</p>
                </div>
            
                <span class="cart-remove">
                    <img src="assets/images/icon-remove-item.svg" alt="">
                </span>
            </div>
        `)
    })

    //Подсчёт суммы позиций в корзине и её вывод пользователю
    totalPrice = 0;
    cartData.forEach(item => {
        totalPrice = totalPrice + Number(item.price.slice(1)) * Number(item.quantity);
    })
    document.querySelector('.order-price').textContent = `$${totalPrice}`;


    //Удаление позиции из корзины покупок
    document.querySelectorAll('.cart-remove').forEach(item => {
        item.addEventListener('click', e => {
            e.currentTarget.closest('.cart-item').remove();
            cartData.splice(e.currentTarget.closest('.cart-item').dataset.id, 1);
            document.querySelector('.cart-positions').textContent = `Your cart(${cartData.length})`;
            
            init();
        })
    })

    //Добавление элемента из меню в корзину покупок
    document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('click', e => {
            let hasTwin = false;
            let object = {
                name:e.currentTarget.closest('.menu-item').children[1].children[1].textContent,
                price: e.currentTarget.closest('.menu-item').children[1].children[2].textContent,
                quantity: e.currentTarget.closest('.menu-item').querySelector('.quantity-btn').textContent
            }

            cartData.forEach(item => {
                if(item.name === object.name) {
                    // console.log(`Вы пытаетесь добавить уже существующую позицию ${object.name}, количество в корзине: ${item.quantity}. Количество добавляемого: ${object.quantity}`);
                    item.quantity = Number(item.quantity) + Number(object.quantity);
                    hasTwin = true;
                } else {
                    hasTwin = false;
                }
            })

            if(!hasTwin) {
                cartData.push(object);
            }

            init();
        })
    })

    //Изменение контента в кнопке "Add to cart" при наведении мыши на элемент
    document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('mouseenter', e => {
            // console.log('Мышь на кнопке');
            e.currentTarget.querySelector('.default-btn').classList.add('hidden');
            e.currentTarget.querySelector('.default-btn').classList.remove('active');

            e.currentTarget.querySelector('.hover-btn').classList.remove('hidden');
            e.currentTarget.querySelector('.hover-btn').classList.add('active-hover');


        })
    })

        document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('mouseleave', e => {
            // console.log('Мышь вышла за пределы кнопки');
            e.currentTarget.querySelector('.default-btn').classList.remove('hidden');
            e.currentTarget.querySelector('.default-btn').classList.add('active');

            e.currentTarget.querySelector('.hover-btn').classList.remove('active-hover');
            e.currentTarget.querySelector('.hover-btn').classList.add('hidden');
        })
    })


    //Прибавление или убавление количества единиц товара, при занесении в корзину
    document.querySelectorAll('.decrement').forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            e.currentTarget.parentElement.children[1].textContent = Number(e.currentTarget.parentElement.children[1].textContent) - 1
        })
    })

    document.querySelectorAll('.increment').forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            e.currentTarget.parentElement.children[1].textContent = Number(e.currentTarget.parentElement.children[1].textContent) + 1
        })
    })
}


init();