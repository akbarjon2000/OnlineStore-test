// Put your application javascript here
// alert("smth is working")
if (document.getElementById('sort_by') !== null) {
    document.querySelector("#sort_by").addEventListener("change", (e) => {
        let url = new URL(window.location.href);
        url.searchParams.set('sort_by', e.currentTarget.value);
        window.location = url.href;
    })
}

const CountrySelector = document.getElementById("addressCountryNew")
if (CountrySelector != null) {
    CountrySelector.addEventListener('change', (e) => {
        console.log(e)

        var provinces = this.Option[e.selectedIndex].getAttribute("data-provinces");
        var ProvinceSelector = document.getElementById("addressProvinceNew")
        var arrayProvinces = JSON.parse(provinces)

        console.log(arrayProvinces)
    })
}

if (document.getElementById("forgetPass") != null) {
    document.addEventListener("click", () => {
        var forgetPassForm = document.getElementById("forgetPasswordCon")
        if (forgetPassForm.classList.contains("d-none")) {
            forgetPassForm.classList.remove("d-none")
        }
    })
}

const productInfoAnchors = document.querySelectorAll("#product-info-anchor");
var productModal;
if (document.getElementById("product-info-modal") !== null) {
    productModal = new bootstrap.Modal(document.getElementById("product-info-modal"), {})

}
if (productInfoAnchors.length > 0) {
    productInfoAnchors.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault()

            var url = '/products/' + item.getAttribute('product-handle') + '.js'
            var price = item.getAttribute('product-price')

            fetch(url)
                .then(resp => resp.json())
                .then(function (data) {
                    console.log(data)
                    document.getElementById("modal-image").src = data.images[0];
                    document.getElementById("productTitle").innerHTML = data.title;
                    document.getElementById("productPrice").innerHTML = price
                    document.getElementById("productDescription").innerHTML = data.description;

                    var variants = data.variants
                    var select = document.getElementById("productSelect");

                    variants.forEach(variant => {
                        select.options[select.options.length] = new Option(variant.option1, variant.id)
                    })
                });
            productModal.show()
        })
    })
}

var form = document.getElementById("addToCartForm")

if (form !== null) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        var formBody = {
            'items': [
                {
                    'id': document.getElementById("productSelect").value,
                    'quantity': document.getElementById("quantity").value
                }
            ]
        }

        fetch("/cart/add.js", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formBody)
        })
            .then(resp => resp.json())
            .then(() => updateCart())
            .catch(err => {
                console.error("Error: " + err)
            })
    })

}

document.addEventListener("DOMContentLoaded", () => {
    updateCart()
})

const updateCart = () => {
    fetch('/cart.js')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById("item-count").innerHTML = data.item_count
        })
        .catch(err => {
            console.error(err)
        })
}

var searchInput = document.getElementById("search-input");

if (searchInput !== null) {
    searchInput.addEventListener("input", () => {
        console.log(searchInput.value)
        fetch(`/search/suggest.json?q=${searchInput.value}&resources[type]=product`)
            .then(resp => resp.json())
            .then(data => {
                const { products } = data.resources.results;
                console.log(products)
                var suggest_modal;
                if (document.getElementById("offcanvasRight") !== null) {
                    suggest_modal = new bootstrap.Offcanvas(document.getElementById("offcanvasRight"))
                }
                if (products.length > 0) {
                    var canvas_body = document.getElementById("canvas-body")
                    var card;
                    if (canvas_body !== null) {
                        card = '<div class ="col g-2" style = "width:fit-content;" >'
                        products.forEach((product) => {
                            card += `<div class="card p-0 my-3 mx-0" style="" >
                                <img class="card-img-top" src="${product.image}"/>
                                <div class="card-body d-flex flex-column align-items-center">
                                    <h6 class="text-center">${product.title}</h6>
                                    <span class="row">
                                        <p class="text-decoration-line-through border-width-2 border-dark border-end" style="width: fit-content;">${product.compare_at_price_max}</p>
                                        <p style="width: fit-content;">${product.price}</p>
                                    </span>
                                    <a class="btn rounded-0 border border-dark" href="${product.url}">Add to cart</a>
                                </div>
                            </div>`
                        })
                        canvas_body.innerHTML = card;
                    }
                    card += '<div>'
                    setTimeout(() => {
                        suggest_modal.show()
                    }, 2000)
                }
            })

    })
}

var product = {
    color: "",
    connection: "",
    pad: ""
}

var id = "bl"

const black = document.getElementById("black")
const white = document.getElementById("white")
const wire = document.getElementById("wire")
const wireless = document.getElementById("wireless")
const linear = document.getElementById("linear")
const square = document.getElementById("square")

black.addEventListener("click", () => {
    if (product.color === "white" || product.color === "") {
        product.color = "black"
    }
    else {
        product.color = ""
    }
    cases(product)
    // console.log(product)
})

white.addEventListener("click", () => {
    if (product.color === "black" || product.color === "") {
        product.color = "white"
    }
    else {
        product.color = ""
    }
    cases(product)
    // console.log(product)
})

wire.addEventListener("click", () => {
    if (product.connection === "wireless" || product.connection === "") {
        product.connection = "wire"
    }
    else {
        product.connection = ""
    }
    cases(product)
    // console.log(product)
})

wireless.addEventListener("click", () => {
    if (product.connection === "wire" || product.connection === "") {
        product.connection = "wireless"
    }
    else {
        product.connection = ""
    }
    cases(product)
    // console.log(product)
})

linear.addEventListener("click", () => {
    if (product.pad === "square" || product.pad === "") {
        product.pad = "linear"
    }
    else {
        product.pad = ""
    }
    cases(product)
    // console.log(product)
})

square.addEventListener("click", () => {
    if (product.pad === "linear" || product.pad === "") {
        product.pad = "square"
    }
    else {
        product.pad = ""
    }
    cases(product)
    // console.log(product)
})

function cases(newProduct) {
    // console.log(newProduct.color + "-" + newProduct.connection + "-" + newProduct.pad)
    switch (newProduct.color + "-" + newProduct.connection + "-" + newProduct.pad) {
        case "":
            console.log("empty");
            break;
        case "black--":
            console.log("black-image")
            break;
        case "white--":
            console.log("white-image")
            break;
        case "black-wire-":
            console.log("black-wire-")
            break;
        case "black-wireless-":
            console.log("black-wireless-image")
            break;
        case "black--square":
            console.log("black-wire-square")
            break;
        case "black--linear":
            console.log("black-wire-linear")
            break;
        case "black-wire-linear":
            console.log("black-wire-linear-image")
            break;
        case "black-wireless-linear":
            console.log("black-wireless-linear-image")
            break;
        case "black-wire-square":
            console.log("black-wire-square-image")
            break;
        case "black-wireless-square":
            console.log("black-wireless-square-image")
            break;
        default:
            console.log("white")
    }
}

