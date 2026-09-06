let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];


updateCartCount();


let container =
document.getElementById(
"cart-items"
);

if(container){

    renderCart();

}



/* ================= UPDATE COUNT ================= */

function updateCartCount(){

    let counter =
    document.getElementById(
    "cart-count"
    );

    if(counter){

        let total = 0;

        cart.forEach(item=>{

            total += item.quantity;

        });

        counter.innerText =
        total;
    }
}



/* ================= RENDER CART ================= */

function renderCart(){

    container.innerHTML = "";

    if(cart.length === 0){

        container.innerHTML =

        `
        <div class="empty-cart">

            <h2>
                Your cart is empty 🥲
            </h2>

            <p>
                Add some beautiful products first ✨
            </p>

        </div>
        `;

        return;
    }

    let total = 0;

    cart.forEach((item,index)=>{

        total +=
        item.price * item.quantity;

        container.innerHTML +=

        `
        <div class="cart-item">

            ${
    item.shadeImage
    ? `
        <div class="cart-shade">

            <img
            src="${item.shadeImage}"
            class="cart-shade-image"
            alt="${item.shade || ''}">

            <span>
                ${item.shade || ''}
            </span>

        </div>
    `
    : ""
}<div class="cart-left">

                <img
                src="${item.image}"
                class="cart-image">

                <div class="cart-info">

                    <h3>${item.name}</h3>



                    <p>

                        Quantity :
                        ${item.quantity}

                    </p>

                    <p>

                        ${item.price}
                        EGP each

                    </p>

                    <h4 class="total-price">

                        ${
                            item.price *
                            item.quantity
                        }
                        EGP

                    </h4>

                </div>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

                Remove ❌

            </button>

        </div>
        `;
    });

    container.innerHTML +=

    `
    <div class="cart-total">

        <h2>

            Total :
            ${total} EGP

        </h2>

    </div>
    `;
}let totalItems = 0;

cart.forEach(item=>{

    totalItems += item.quantity;

});


/* ================= REMOVE ================= */

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    renderCart();

    showMessage(
        "Item removed 🥲"
    );

}



/* ================= ADD ================= */

function increase(btn){

    let qty =
    btn.parentElement.querySelector(".qty");

    qty.innerText =
    Number(qty.innerText)+1;
}

function decrease(btn){

    let qty =
    btn.parentElement.querySelector(".qty");

    if(Number(qty.innerText)>1){

        qty.innerText =
        Number(qty.innerText)-1;
    }

}function addToCart(
name,
image,
price,
btn,
shade = "",
shadeImage = ""
){

    if(name === "Body Splash"){

        name = "Body Splash - " + bodySplashVariant;

        if(bodySplashVariant === "Musk Vanilla"){

            image = "images/bodysplashmuskvanilla.jpeg";

        }else{

            image = "images/bodysplashsweetcandy.jpeg";

        }

    }

    let quantity = Number(

        btn.parentElement
        .querySelector(".qty")
        .innerText

    );

   // Handle Lip Gloss Shades
// Handle all Lip Gloss products
if(name.includes("Gloss")){

    let productCard = btn.closest(".product-card");

    let activeShade =
        productCard.querySelector(".shade-option.active");

    if(activeShade){

    shade = activeShade.dataset.shade;

    shadeImage = activeShade.dataset.image;

    name = name + " - " + shade;

}

}
    let existing = cart.find(

        item =>
        item.name === name &&


        item.image === image &&

        item.price === price);

    if(existing){

        existing.quantity += quantity;

    }

    else{
    cart.push({
        name:name,
        image: getVariantImage(name, image),
        shade:shade,
        shadeImage:shadeImage,
        price:price,
        quantity:quantity
    });
}

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    showMessage(

        `${name} x${quantity}
added to cart ✨
(${price*quantity} EGP)`

    );

}function getVariantImage(name, image){

    if(name.includes("Body Splash")){

        if(name.includes("Musk Vanilla")){
            return "images/bodysplashmuskvanilla.jpeg";
        }

        if(name.includes("Sweet Candy")){
            return "images/bodysplashsweetcandy.jpeg";
        }

    }

    return image;

}



/* ================= WHATSAPP ================= */

function orderWhatsApp(){

    if(cart.length===0){

        showMessage(
            "Your cart is empty 🥲"
        );

        return;
    }

     document.getElementById("customer-popup").style.display = "flex";
     
}
function closeCustomerPopup(){

    document.getElementById("customer-popup").style.display = "none";

}function sendOrderWhatsApp(){

    /* ================= GET CUSTOMER DATA ================= */

    let customerName =
        document
        .getElementById("customer-name")
        .value
        .trim();

    let customerPhone =
        document
        .getElementById("customer-phone")
        .value
        .trim();

    let customerAddress =
        document
        .getElementById("customer-address")
        .value
        .trim();

    let customerNotes =
        document
        .getElementById("customer-notes")
        .value
        .trim();


    /* ================= RESET ERRORS ================= */

    document
    .getElementById("customer-name")
    .classList.remove("input-error");

    document
    .getElementById("customer-phone")
    .classList.remove("input-error");

    document
    .getElementById("customer-address")
    .classList.remove("input-error");


    /* ================= VALIDATION ================= */

    let errors = [];


    /* ================= NAME ================= */

    if(customerName === ""){

        document
        .getElementById("customer-name")
        .classList.add("input-error");

        errors.push("Name is required");

    }
    else if(
        !/^[A-Za-z\u0600-\u06FF\s]{2,}$/
        .test(customerName)
    ){

        document
        .getElementById("customer-name")
        .classList.add("input-error");

        errors.push("Name is not valid");

    }


    /* ================= PHONE ================= */

    if(customerPhone === ""){

        document
        .getElementById("customer-phone")
        .classList.add("input-error");

        errors.push("Phone number is required");

    }
    else if(
        !/^01[0125][0-9]{8}$/
        .test(customerPhone)
    ){

        document
        .getElementById("customer-phone")
        .classList.add("input-error");

        errors.push("Phone number is not valid");

    }


    /* ================= ADDRESS ================= */

    if(customerAddress === ""){

        document
        .getElementById("customer-address")
        .classList.add("input-error");

        errors.push("Address is required");

    }
    else if(customerAddress.length < 10){

        document
        .getElementById("customer-address")
        .classList.add("input-error");

        errors.push("Address is too short");

    }


    /* ================= STOP IF INVALID ================= */

    if(errors.length > 0){

        showMessage(
            errors.join(" • ") + " ❤️"
        );

        return;

    }


    /* ================= WHATSAPP MESSAGE ================= */

    let text =

`❤️ Hello E&B Glossy ❤️

━━━━━━━━━━━━━━

👤 Name:
${customerName}

📱 Phone:
${customerPhone}

📍 Address:
${customerAddress}

📝 Notes:
${customerNotes || "None"}

━━━━━━━━━━━━━━

🛍 Order

`;


    /* ================= ORDER ITEMS ================= */

    let total = 0;

    cart.forEach(item => {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        text +=

`✨ ${item.name}

• Quantity: ${item.quantity}

• Price: ${item.price} EGP

• Subtotal: ${itemTotal} EGP

━━━━━━━━━━━━━━

`;

    });


    /* ================= TOTAL ================= */

    text +=

`💰 Total:
${total} EGP

Thank you 🤍🩷`;


    /* ================= OPEN WHATSAPP ================= */

    let url =
        "https://wa.me/201068909087?text="
        + encodeURIComponent(text);


    window.open(
        url,
        "_blank"
    );

}


/* ================= MESSAGE ================= */

function showMessage(message){

    let toast =

    document.getElementById(
    "toast"
    );

    toast.innerText =
    message;

    toast.classList.add(
    "show-toast"
    );



    setTimeout(()=>{

        toast.classList.remove(
        "show-toast"
        );

    },2000);

}/* ================= WISHLIST ================= */

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(
    name,
    image,
    price,
    btn,
    shade = "",
    shadeImage = "",
    variant = "",
    variantImage = ""
){

    let index =
    wishlist.findIndex(item => item.name === name);

    if(index > -1){

        wishlist.splice(index,1);

        btn.classList.remove("active");

        btn.innerHTML =
        '<i class="fa-regular fa-heart"></i>';

        showMessage("Removed from Wishlist 🤍");

    }else{

        wishlist.push({
    name: name,
    image: image,
    price: price,
    shade: shade,
    shadeImage: shadeImage,
    variant: variant,
    variantImage: variantImage,
    wishlistQuantity: 1
});

        btn.classList.add("active");

        btn.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

        showMessage("Saved to Wishlist ❤️");

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}

window.addEventListener("DOMContentLoaded",()=>{

    document
    .querySelectorAll(".wishlist-btn")
    .forEach(btn=>{

        let name = btn.dataset.name;

        if(

            wishlist.some(item=>item.name===name)

        ){

            btn.classList.add("active");

            btn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        }

    });

});/* ================= WISHLIST PAGE ================= */

let wishlistContainer =
document.getElementById("wishlist-items");

if(wishlistContainer){

renderWishlist();

}

function renderWishlist(){

    wishlistContainer.innerHTML = "";

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `
            <div class="empty-cart">

                <h2>
                    Your Wishlist is Empty ❤️
                </h2>

                <p>
                    Save your favorite products first ✨
                </p>

            </div>
        `;

        return;
    }

    wishlist.forEach((item,index)=>{

        wishlistContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-left">

                <img
                src="${item.image}"
                class="cart-image">

                <div class="cart-info">

                    <h3>

                        ${
                            item.variant
                            ? `${item.name} - ${item.variant}`
                            : item.name
                        }

                    </h3>

                    <h4 class="total-price">
                        ${item.price} EGP
                    </h4>


                    ${
                        item.shadeImage
                        ? `

                            <div class="cart-shade">

                                <img
                                src="${item.shadeImage}"
                                class="cart-shade-image"
                                alt="${item.shade || 'Selected shade'}">

                                <span>
                                    ${item.shade || ''}
                                </span>

                            </div>

                        `
                        : ""
                    }


                    <div class="wishlist-quantity">

                        <button
                        onclick="changeWishlistQuantity(${index}, -1)">
                            -
                        </button>

                        <span>
                            ${item.wishlistQuantity || 1}
                        </span>

                        <button
                        onclick="changeWishlistQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

            </div>


            <div>

                <button
                class="cart-btn"
                onclick="addWishlistToCart(${index})">

                    Add To Cart 🛒

                </button>

                <br><br>

                <button
                class="remove-btn"
                onclick="removeWishlist(${index})">

                    Remove ❌

                </button>

            </div>

        </div>

        `;

    });

}


/* ================= WISHLIST QUANTITY ================= */

function changeWishlistQuantity(index, change){

    let item = wishlist[index];

    let currentQuantity =
        item.wishlistQuantity || 1;

    currentQuantity += change;

    if(currentQuantity < 1){
        currentQuantity = 1;
    }

    item.wishlistQuantity =
        currentQuantity;

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

}


/* ================= REMOVE WISHLIST ================= */

function removeWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

    showMessage(
        "Removed from Wishlist 🤍"
    );

}


/* ================= ADD WISHLIST TO CART ================= */

function addWishlistToCart(index){

    let item = wishlist[index];

    let finalName = item.name;

    let finalImage = item.image;


    /* ================= BODY SPLASH ================= */

    if(
        item.name === "Body Splash" &&
        item.variant
    ){

        finalName =
            "Body Splash - " +
            item.variant;

        if(item.variantImage){

            finalImage =
                item.variantImage;

        }

    }


    /* ================= GLOSS ================= */

    if(item.shade){

        finalName =
            item.name.includes(" - ")
            ? item.name
            : item.name + " - " + item.shade;

    }


    let quantity =
        item.wishlistQuantity || 1;


    let existing = cart.find(

        p =>
        p.name === finalName &&
        p.price === item.price

    );


    if(existing){

        existing.quantity += quantity;

    }

    else{

        cart.push({

            name: finalName,

            image: finalImage,

            price: item.price,

            quantity: quantity,

            shade: item.shade || "",

            shadeImage: item.shadeImage || ""

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showMessage(
        `${finalName} x${quantity}
added to cart ✨
(${item.price * quantity} EGP)`
    );

}


/* ================= REVIEWS SLIDER ================= */

let reviews = [

    "reviews/review1.jpeg",
    "reviews/review2.jpeg",
    "reviews/review3.jpeg",
    "reviews/review4.jpeg",
    "reviews/review5.jpeg",
    "reviews/review6.jpeg",
    "reviews/review7.jpeg",
    "reviews/review8.jpeg",
    "reviews/review9.jpeg",
    "reviews/review10.jpeg",
    "reviews/review11.jpeg",
    "reviews/review12.jpeg",

];

let currentReview = 0;

function showReview(){

    let img = document.getElementById("review-image");

    if(img){

        img.src = reviews[currentReview];

    }

}

function nextReview(){

    currentReview++;

    if(currentReview >= reviews.length){

        currentReview = 0;

    }

    showReview();

}

function prevReview(){

    currentReview--;

    if(currentReview < 0){

        currentReview = reviews.length - 1;

    }

    showReview();

}
showReview();

function shareWebsite(){

    if(navigator.share){

        navigator.share({

            title:"E&B Glossy",

            text:"Check out E&B Glossy 💖",

            url:window.location.origin

        });

    }

    else{

        navigator.clipboard.writeText(window.location.origin);

        showMessage("Website link copied ✨");

    }

}/* ================= PAGE TRANSITION ================= */

document.querySelectorAll("a").forEach(link=>{

    let href = link.getAttribute("href");

    if(

        href &&
        !href.startsWith("http") &&
        !href.startsWith("#")

    ){

        link.addEventListener("click",function(e){

            e.preventDefault();

            document.body.classList.add("fade-out");

            setTimeout(()=>{

                window.location.href = href;

            },350);

        });

    }

});/* ================= INTRO LOADER ================= */

window.addEventListener("load",()=>{

    let loader = document.getElementById("intro-loader");

    if(!loader) return;

    if(sessionStorage.getItem("introPlayed")){

        loader.style.display="none";

        return;

    }

    sessionStorage.setItem("introPlayed","true");

    setTimeout(()=>{

        loader.style.display="none";

    },1800);

});/* ================= PRODUCT POPUP ================= */

let bodySplashVariant = "Musk Vanilla";

function openProduct(name,image,price,description){

    document.getElementById("popup-name").innerText = name;

    document.getElementById("popup-price").innerText = price + " EGP";

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    if(name==="Body Splash"){

    document.getElementById("variant-box").style.display="block";

    document.getElementById("popup-image").src =
    "images/bodysplashmuskvanilla.jpeg";

    document.getElementById("popup-description").innerText =
    "Fresh vanilla fragrance for a delightful experience.";

    document.querySelectorAll(".popup-thumb")
    
.forEach(img => img.classList.remove("active"));


document.querySelectorAll(".popup-thumb")[0]
.classList.add("active");

}

else{

    document.getElementById("variant-box").style.display="none";

} let glossGallery = document.getElementById("popup-gloss-gallery");

glossGallery.style.display = "none";
let lipKitSwatches = document.getElementById("lipkit-swatches");

lipKitSwatches.style.display = "none";
if(name === "Lip Kit"){

    lipKitSwatches.style.display = "block";

}
if(name === "Lip Kit"){
    document.querySelector(".popup-box").classList.add("lipkit-popup");
}
else{
    document.querySelector(".popup-box").classList.remove("lipkit-popup");
}

glossGallery.innerHTML = "";
if(name.includes("Gloss")){
   if(name === "Lip Gloss"){

    document.getElementById("popup-image").style.width = "630px";
    document.getElementById("popup-image").style.height = "530px";

    // باقي كود الـ gallery

}
else{

    document.getElementById("popup-image").style.width = "350px";
    document.getElementById("popup-image").style.height = "350px";

}

    glossGallery.style.display = "flex";

    glossGallery.innerHTML = `

    <div class="popup-thumb-box">

        <img
        src="images/lipgloscherryswatch.jpeg"
        class="popup-thumb active"
        onclick="changeGlossShade(
        'Cherry',
        '${image}',
        'Cherry shade with glossy shine.',
        this
        )">

        <span>Cherry</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosnudeswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Nude',
        '${image}',
        'Natural nude glossy finish.',
        this
        )">

        <span>Nude</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosrosepinkswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Rose Pink',
        '${image}',
        'Soft rose pink glossy shine.',
        this
        )">

        <span>Pink</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosshotredswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Hot Red',
        '${image}',
        'Bold hot red glossy finish.',
        this
        )">

        <span>Hot Red</span>

    </div>

    `;

}

document.getElementById("product-popup").style.display="flex";

} 
function closeProduct(){

    document.getElementById("product-popup").style.display="none";

}function changeVariant(name,image,description,element){

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    document.querySelectorAll(".popup-thumb")
    .forEach(img=>img.classList.remove("active"));

    element.classList.add("active");

}function selectBodyVariant(name, element){

    bodySplashVariant = name;

    document.querySelectorAll(".body-option")
    .forEach(btn => btn.classList.remove("active"));

    element.classList.add("active");

}let selectedShade = "Cherry";
let selectedShadeImage = "images/lipgloscherryswatch.jpeg";

function selectShade(element){

    let productCard =
        element.closest(".product-card");

    productCard
    .querySelectorAll(".shade-option")
    .forEach(item =>
        item.classList.remove("active")
    );

    element.classList.add("active");

    selectedShade = element.dataset.shade;

    selectedShadeImage = element.dataset.image;

}function changeGlossShade(name,image,description,element){

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    document.querySelectorAll(".popup-thumb")
    .forEach(img=>img.classList.remove("active"));

    element.classList.add("active");

}
