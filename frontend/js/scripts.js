/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const getProducts = async (content) => {
    try {
        const res = await fetch('http://localhost:3000/products')
        const products = await res.json()
        console.log(products)
        // content.innerHTML = 'ngoc'
        // duyet mang product
        products.forEach(product => {
            // tao div element moi
            const div = document.createElement('div')
            div.classList.add('col')
            div.classList.add('mb-5')
            div.innerHTML = `
                <div class="card h-100">
                <img class="card-img-top" src="${product.image}" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        ${product.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="detail.html?id=${product.id}">Chi tiet</a></div>
                </div>
                </div>
            `
            content.append(div)
        });
    } catch (error) {
        console.log(error);
    }
}
const getProductsById = async (image, info, id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`)
        const product = await res.json()
        // console.log(product);
        image.innerHTML = `
            <img src = "${product.image}"/>
        `
        info.innerHTML = `
            <h1>${product.name}</h1>
            <span>Gia: ${product.price}</span>
            <p>${product.description}</p>
            <form onsubmit="submitCart(this)">
            Số lượng
            <input type="number" value="1" name="quantity"/>
            <input type="hidden" name="productid" value="${product.id}"/>
            <button type="submit" class="btn btn-danger">Thêm giỏ hàng</button>
            </form>
           `

    } catch (error) {

    }
}

const addToCart = (id, quantity) => {
    // Check giỏ hàng tồn tại hay chưa
    const cart = localStorage.getItem('cart')
    if (cart) {
        // parse giỏ hàng 
        const items = JSON.parse(cart)
        const check = items.filter(item => item.productId == id)
        if (check.length > 0) {
            const newItem = items.map(item => {
                if (item.productId == id) {
                    item.quantity = item.quantity + quantity
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(newItem))
        }
        else {
            const newItem = {
                productId: id,
                quantity: quantity
            }
            localStorage.setItem('cart', JSON.stringify([...items, newItem]))
        }
    }
    else {
        const newItem = {
            productId: id,
            quantity: quantity
        }
        localStorage.setItem('cart', JSON.stringify([newItem]))
    }
    // console.log(cart);
    TotalQuantityCart()
}
const TotalQuantityCart = () => {
    const badge = document.querySelector('#navbarSupportedContent .badge')
    // Check giỏ hàng tồn tại hay chưa
    const cart = localStorage.getItem('cart')
    if (cart) {
        const items = JSON.parse(cart)
        const total = items.reduce((value, item) => {
            return value + item.quantity
        }, 0)
        badge.innerHTML = `${total}`
    }
    else {
        badge.innerHTML = `0`
    }
}
TotalQuantityCart()
const submitCart=(form)=>{
    event.preventDefault()
    // console.dir(e);
    const productid = form.children.productid.value
    const quantity =  form.children.quantity.value  
    // console.log(productid,quantity);
    addToCart(productid,quantity)
}