
const menu = document.querySelector('.menu-items'),
    cart = document.querySelector('.cart-items')

let cartData = [];

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

    //Динамический рендер элементов меню
    data.forEach(item => {
        const {category, name, price, image} = item;

        menu.insertAdjacentHTML('beforeend', `
            <div class="menu-item">
                <div class="menu-img">
                <img class='menu-dish' src="${image.desktop}" alt="">
                <button class="add-to-cart">
                    <div class="default-btn">
                        Add to cart
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
    cartData.forEach(item => {
        const {name, price} = item;

        cart.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <p>${name}</p>

                <div class="cart-item-info">
                    <p class="quantity">1x</p>
                    <p class="price">${price}</p>
                    <p class="price-all">${price}</p>
                </div>
            
                <span class="cart-remove">
                    <img src="assets/images/icon-remove-item.svg" alt="">
                </span>
            </div>
        `)
    })


    //Удаление позиции из корзины покупок
    document.querySelectorAll('.cart-remove').forEach(item => {
        item.addEventListener('click', e => {
            e.currentTarget.closest('.cart-item').remove();
        })
    })

    //Добавление элемента из меню в корзину покупок
    document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('click', e => {
            // e.stopPropagation();

            let object = {
                name:e.currentTarget.closest('.menu-item').children[1].children[1].textContent,
                price: e.currentTarget.closest('.menu-item').children[1].children[2].textContent
            }


            cartData.push(object);
            // console.log(cartData);

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