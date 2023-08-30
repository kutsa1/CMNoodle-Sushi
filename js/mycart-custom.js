fetch('./menu.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const buttonsContainer = document.getElementById('buttonsContainer');
        const menuContainer = document.getElementById('blockMenu');
        let i = 0;
        for (const dataKey in data) {
            i++
            let menuButton = '';
            if (i === 1)
                menuButton = `<a href="#"  class="button button--is-active" data-target="${dataKey.toLocaleLowerCase()}Menu">${dataKey}</a>`
            else menuButton = `<a href="#"  class="button" data-target="${dataKey.toLocaleLowerCase()}Menu">${dataKey}</a>`
            buttonsContainer.insertAdjacentHTML('beforeend', menuButton);
        }
        let j = 0;
        for (const dataKey in data) {
            const subMenu = document.createElement('div')
            subMenu.classList.add('menu')
            if (j === 0)
                subMenu.classList.add('menu--is-visible')
            subMenu.setAttribute('id', `${dataKey.toLocaleLowerCase()}Menu`)
            subMenu.setAttribute('data-aos', 'fade-up')
            data[dataKey].forEach(i => {
                const item = `<div class="item row align-items-center">
                       
                        <div class="details col-sm-9">
                            <div class="item__header">
                                <span style="font-family: sans-serif" class="item__title">${i.name}</span>
                                <span class="item__dots"></span>
                                <div class=""><span class="item__price">${i.price}</span></div>
                            </div>
                            <p class="item__description">${i.desc}</p>
                        </div>
                    </div>`
                subMenu.insertAdjacentHTML('beforeend', item)
                menuContainer.insertAdjacentElement('beforeend', subMenu)
                j++;
            })
        }
        //26.satıra menu resmi için eklenecek
        // <div class="col-sm-3">
        //<img class="product-img" src="./img/pizza-1.png" alt="${i.name}">
        //</div>

        //food menu  tabs
        const buttonsX = document.querySelectorAll('.button');
        const menusX = document.querySelectorAll('.menu');

        const highlight = document.createElement('span');
        document.body.appendChild(highlight);
        highlight.classList.add('highlight');

        // Set initial dimensions and position of 'highlight' based on activeButton coords
        function initialHightlightLocation() {
            const activeButton = document.querySelector('.button--is-active');
            const activeButtonCoords = activeButton.getBoundingClientRect();

            const initialCoords = {
                width: activeButtonCoords.width,
                height: activeButtonCoords.height,
                left: activeButtonCoords.left + window.scrollX,
                top: activeButtonCoords.top + window.scrollY
            }

            highlight.style.width = `${initialCoords.width}px`;
            highlight.style.height = `${initialCoords.height}px`;
            highlight.style.transform = `translate(${initialCoords.left}px, ${initialCoords.top}px)`;
        }

        function handleClick(e) {
            e.preventDefault();
            const collapse = document.getElementById("collapseExample");
            buttonsX.forEach(button => {
                button.classList.remove('button--is-active')
                collapse.classList.remove('show')
            });
            this.classList.add('button--is-active');

            // Set current dimensions and position of 'highlight' based on the clicked button
            const buttonCoords = this.getBoundingClientRect();
            const coords = {
                width: buttonCoords.width,
                height: buttonCoords.height,
                left: buttonCoords.left + window.scrollX,
                top: buttonCoords.top + window.scrollY
            }
            highlight.style.width = `${coords.width}px`;
            highlight.style.height = `${coords.height}px`;
            highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

            // Show the menu associated to the clicked button
            const targetMenu = document.querySelector(`#${this.dataset.target}`);
            menusX.forEach(menu => {
                menu.classList.remove('menu--is-visible');
                targetMenu.classList.add('menu--is-visible');
            })
        }

        window.addEventListener('load', initialHightlightLocation);
        window.addEventListener('resize', initialHightlightLocation);
        buttonsX.forEach(button => button.addEventListener('click', handleClick));
    });



//mycart
$(function () {

    var goToCartIcon = function ($addTocartBtn) {
        var $cartIcon = $(".my-cart-icon");
        var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({
            "position": "fixed",
            "z-index": "999"
        });
        $addTocartBtn.prepend($image);
        var position = $cartIcon.position();
        $image.animate({
            top: position.top,
            left: position.left
        }, 500, "linear", function () {
            $image.remove();
        });
    }

    $('.my-cart-btn').myCart({
        classCartIcon: 'my-cart-icon',
        classCartBadge: 'my-cart-badge',
        affixCartIcon: true,
        checkoutCart: function (products) {
            $.each(products, function () {
                console.log(this);
            });
        },
        clickOnAddToCart: function ($addTocart) {
            goToCartIcon($addTocart);
        },
        getDiscountPrice: function (products) {
            var total = 0;
            $.each(products, function () {
                total += this.quantity * this.price;
            });
            return total * 0.5;
        }
    });

});
