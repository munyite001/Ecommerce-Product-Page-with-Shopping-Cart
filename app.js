const counter = document.querySelector(".count");
const counterIcons = document.querySelectorAll(".counter-icon");
const thumbnailImages = document.querySelectorAll(".thumbnail-img");
const mainImage = document.querySelector(".main-image");
const mainProductImage = document.querySelector(".main-product-image");
const arrowIcons = document.querySelectorAll(".arrow-icon");
const openMenu = document.querySelector(".open-btn");
const closeMenu = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");
const mobileMenu = document.querySelector(".mobile-menu");
const cart = document.querySelector(".basket");
const openCart = document.getElementById("cart-icon");
const cartContent = document.querySelector(".cartContent");
const cartQuantity = document.querySelector(".cart-items");
const addToCart = document.querySelector(".add-to-cart");

const productImages = [
  `./images/image-product-1.jpg`,
  `./images/image-product-2.jpg`,
  `./images/image-product-3.jpg`,
  `./images/image-product-4.jpg`,
];
let totalPrice = 0;
const cartArr = [];

const cartItem = {
  image: "./images/image-product-1-thumbnail.jpg",
  quantity: "",
  title: "Fall Limited Edition Sneakers",
  price: 0,
};

//  Counter

let count = 0;

counterIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("plus")) {
      count += 1;
      counter.innerHTML = count;
    } else {
      if (count > 0) {
        count -= 1;
        counter.innerHTML = count;
      }
    }
  });
});

//  Thumbnail-Images
thumbnailImages.forEach((image) => {
  image.addEventListener("click", () => {
    thumbnailImages.forEach((img) => {
      if (img.classList.contains("thumbnail-active")) {
        img.classList.remove("thumbnail-active");
      }
    });
    image.classList.add("thumbnail-active");
    mainImage.innerHTML = `
    <img src="./images/image-product-${image.dataset.id}.jpg" alt="Product Image">
    `;
  });
});

//  Image Silder in Mobile
let i = 0;
const n = productImages.length;
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("prev")) {
      if (i > 0) {
        i -= 1;
      } else {
        i = n - 1;
      }
      mainProductImage.src = `${productImages[i]}`;
    } else {
      if (i < n - 1) {
        i += 1;
      } else {
        i = 0;
      }
      mainProductImage.src = `${productImages[i]}`;
    }
  });
});

//  Open and close Mobile Menu
openMenu.addEventListener("click", () => {
  overlay.classList.add("show-overlay");
  mobileMenu.classList.add("show-mobile-menu");
});

closeMenu.addEventListener("click", () => {
  overlay.classList.remove("show-overlay");
  mobileMenu.classList.remove("show-mobile-menu");
});

//  Basket
openCart.addEventListener("click", () => {
  cart.classList.toggle("show-basket");
});

//  Cart Functionality
addToCart.addEventListener("click", () => {
  if (count > 0) {
    cartItem.quantity = count;
    cartItem.price = 125.0;
    totalPrice = (cartItem.price * count).toFixed(2);
    cartArr.push(cartItem);
    cartQuantity.textContent = count;
    cartQuantity.style.display = "block";
    cartContent.innerHTML = `
    <div class="cartItem">
        <div class="cart-product-image">
          <img src="${cartItem.image}" alt="Cart Product Image">
        </div>
        <div class="product-description">
          <h3>${cartItem.title}</h3>
          <p>$${cartItem.price.toFixed(2)} x <span class="quantity">${
      cartItem.quantity
    }</span><span class="total-price">${totalPrice}</span></p>
        </div>
        <div class="delete">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </div>
      </div>
      <button type="button" class="btn">Checkout</button>`;
    const deleteCart = document.querySelector(".delete");
    //  Delete from Cart
    deleteCart.addEventListener("click", () => {
      cartArr.pop();
      cartContent.innerHTML = `<p>Your Cart is empty.</p>`;
      cartQuantity.style.display = "none";
    });
  }
});

if (cartArr.length == 0) {
  cartContent.innerHTML = `<p>Your Cart is empty.</p>`;
  cartQuantity.style.display = "none";
}
