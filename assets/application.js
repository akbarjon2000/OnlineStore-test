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
    color: "black",
    connection: "wireless",
    pad: "square",
    grip: "grless"
}

var id = "bl"

const black = document.getElementById("black")
const white = document.getElementById("white")
const wire = document.getElementById("wire")
const wireless = document.getElementById("wireless")
const linear = document.getElementById("linear")
const square = document.getElementById("square")
const glass = document.getElementById("glass")
const grip = document.getElementById("grip")
const img = document.getElementById("mouse_img")
const output = document.getElementById("output")

if (output != null) {
    var total = parseInt(output.innerText)
    console.log(total)
}

black.addEventListener("click", () => {
    if (product.color === "white") {
        product.color = "black"
        // black.setAttribute("disabled", "true")
        // white.setAttribute("disabled", "false")
        white.classList.remove("active_selector")
        black.classList.add("active_selector")
        cases(product)
    }
    // else {
    //     product.color = ""
    // }
    // console.log(product)
})

white.addEventListener("click", () => {
    if (product.color === "black") {
        product.color = "white"
        // white.setAttribute("disabled", "true")
        // black.setAttribute("disabled", "false")
        black.classList.remove("active_selector")
        white.classList.add("active_selector")
        cases(product)
    }
    // else {
    //     product.color = ""
    // }
    // console.log(product)
})

wire.addEventListener("click", () => {
    if (product.connection === "wireless") {
        product.connection = "wire"
        // wire.setAttribute("disabled", "true")
        // wireless.setAttribute("disabled", "false")
        wireless.classList.remove("active_button")
        wire.classList.add("active_button")
        total -= 5000
        output.innerText = total
    }
    // else {
    //     total += 5000
    //     output.innerText = total
    //     product.connection = ""
    // }
    cases(product)
    // console.log(product)
})

wireless.addEventListener("click", () => {
    console.log("clicked")
    if (product.connection === "wire") {
        product.connection = "wireless"
        // wire.setAttribute("disabled", "false")
        // wireless.setAttribute("disabled", "true")
        wire.classList.remove("active_button")
        wireless.classList.add("active_button")
        total += 5000
        output.innerText = total
    }
    // else if (product.connection === "wireless") {
    //     product.connection = "wire"
    //     total -= 5000
    //     output.innerText = total
    // }
    cases(product)
    // console.log(product)
})

linear.addEventListener("click", () => {
    if (product.pad === "square") {
        product.pad = "linear"
        linear.classList.add("active_button")
        square.classList.remove("active_button")
    }
    else if (product.pad === "") {
        product.pad = "linear"
        total += 5000
        output.innerText = total
        linear.classList.add("active_button")
    }
    else if (product.pad === "glass") {
        product.pad = "linear"
        total -= 5000
        output.innerText = total
        glass.classList.remove("active_button")
    }
    else {
        total -= 5000
        output.innerText = total
        product.pad = ""
        linear.classList.remove("active_button")

    }
    cases(product)
    // console.log(product)
})

square.addEventListener("click", () => {
    if (product.pad === "linear") {
        product.pad = "square"
        square.classList.add("active_button")
        linear.classList.remove("active_button")
    }
    else if (product.pad === "glass") {
        product.pad = "square"
        total -= 5000
        output.innerText = total
        square.classList.add("active_button")
        glass.classList.remove("active_button")
    }
    else if (product.pad === "") {
        product.pad = "square"
        total += 5000
        output.innerText = total
        square.classList.add("active_button")
    }
    else {
        total -= 5000
        output.innerText = total
        product.pad = ""
        square.classList.remove("active_button")

    }
    cases(product)
    // console.log(product)
})

glass.addEventListener("click", () => {
    if (product.pad === "linear" || product.pad === "square") {
        product.pad = "glass"
        total += 5000
        output.innerText = total
        glass.classList.add("active_button")
        square.classList.remove("active_button")
        linear.classList.remove("active_button")
    }
    else if (product.pad === "") {
        product.pad = "glass"
        total += 10000
        output.innerText = total
        glass.classList.add("active_button")
    }
    else {
        product.pad = ""
        glass.classList.remove("active_button")
        total -= 10000
        output.innerText = total
    }
    cases(product)
    // console.log(product)
})

grip.addEventListener("click", () => {
    if (product.grip === "gr") {
        product.grip = "grless"
        grip.classList.remove("active_button")
        total -= 5000
        output.innerText = total
    }
    else {
        grip.classList.add("active_button")
        total += 5000
        output.innerText = total
        product.grip = "gr"
    }
    cases(product)
    // console.log(product)
})

function cases(newProduct) {
    // console.log(newProduct.color + "-" + newProduct.connection + "-" + newProduct.pad)
    switch (newProduct.color + "-" + newProduct.connection + "-" + newProduct.grip + "-" + newProduct.pad) {
        case "":
            console.log("empty");
            break;
        //black state gripless:
        case "black--grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless.png?v=8692125405699277271657845215'
            console.log("black--grlessimage")
            break;
        case "black-wire-grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr.png?v=45975085369955075311657845976'
            console.log("black-wire-grless-")
            break;
        case "black-wireless-grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless.png?v=8692125405699277271657845215'
            console.log("black-wireless-grless-image")
            break;
        case "black--grless-square":
            console.log("black-wire-grless-square")
            break;
        case "black--grless-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-pad.png?v=172227042078676027841657846411'
            console.log("black-wire-grless-linear")
            break;
        case "black-wire-grless-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-pad.png?v=172227042078676027841657846411'
            console.log("black-wire-grless-linear-image")
            break;
        case "black-wireless-grless-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-pad.png?v=172227042078676027841657846411'
            console.log("black-wireless-grless-linear-image")
            break;
        case "black-wire-grless-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-sqpad.png?v=111308773249861355501657846660'
            console.log("black-wire-grless-square-image")
            break;
        case "black-wireless-grless-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-sqpad.png?v=7397368125772393151657847454'
            console.log("black-wireless-grless-square-image")
            break;
        //with grip
        case "black--gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-gr-tape.png?v=79184666446423713381657847044'
            console.log("black--gr-image")
            break;
        case "black-wire-gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-gr-tape.png?v=168015593412755271201657846619'
            console.log("black-wire-gr-")
            break;
        case "black-wireless-gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-gr-tape.png?v=79184666446423713381657847044'
            console.log("black-wireless-gr-image")
            break;
        case "black--gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-sqpad.png?v=7397368125772393151657847454'
            console.log("black-wire-gr-square")
            break;
        case "black--gr-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-pad.png?v=172227042078676027841657846411'
            console.log("black-wire-gr-linear")
            break;
        case "black-wire-gr-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-gr-tape.png?v=168015593412755271201657846619'
            console.log("black-wire-gr-linear-image")
            break;
        case "black-wireless-gr-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-pad.png?v=172227042078676027841657846411'
            console.log("black-wireless-gr-linear-image")
            break;
        case "black-wire-gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-sqpad.png?v=111308773249861355501657846660'
            console.log("black-wire-gr-square-image")
            break;
        case "black-wireless-gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-sqpad.png?v=7397368125772393151657847454'
            console.log("black-wireless-gr-square-image")
            break;
        //black state glass pad gripless:
        case "black--grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-glide.png?v=36356393702125819611657848018'
            console.log("black-wire-grless-square")
            break;
        case "black-wireless-grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-glide.png?v=36356393702125819611657848018'
            console.log("black-wireless-grless-linear-image")
            break;
        case "black-wire-grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-glide.png?v=125601266243787686491657847971'
            console.log("black-wire-grless-square-image")
            break;
        //black state glass pad with grip:
        case "black--gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-glide.png?v=36356393702125819611657848018'
            console.log("black-wire-gr-linear")
            break;
        case "black-wire-gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wr-glide.png?v=125601266243787686491657847971'
            console.log("black-wire-gr-square-image")
            break;
        case "black-wireless-gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/bl-wrless-glide.png?v=36356393702125819611657848018'
            console.log("black-wireless-gr-square-image")
            break;
        //white state:
        case "white--grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless.png?v=20859171758460010341657846931'
            console.log("white--grless-image")
            break;
        case "white-wire-grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr.png?v=175912791789107842561657846860'
            console.log("white-wire-")
            break;
        case "white-wireless-grless-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless.png?v=20859171758460010341657846931'
            console.log("white-wireless-grless-image")
            break;
        case "white--grless-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-sqpad.png?v=76563001495136301031657846850'
            console.log("white-wire-grless-square")
            break;
        case "white--grless-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-pad.png?v=95693909502916443591657846915'
            console.log("white-wire-grless-linear")
            break;
        case "white-wire-grless-linear":
            //need to fix
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-pad.png?v=95693909502916443591657846915'
            console.log("white-wire-grless-linear-image")
            break;
        case "white-wireless-grless-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-pad.png?v=95693909502916443591657846915'
            console.log("white-wireless-grless-linear-image")
            break;
        case "white-wire-grless-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-sqpad.png?v=76563001495136301031657846850'
            console.log("black-wire-grless-square-image")
            break;
        case "white-wireless-grless-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-sqpad.png?v=111578790902203822871657847531'
            console.log("white-wireless-grless-square-image")
            break;
        //with gear
        case "white--gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-gr-tape.png?v=136785982844469433911657846769'
            console.log("white--gr-image")
            break;
        case "white-wire-gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-gr-tape.png?v=136785982844469433911657846769'
            console.log("white-wire-gr-")
            break;
        case "white-wireless-gr-":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-gr-tape.png?v=37220946922701960471657846892'
            console.log("white-wireless-gr-image")
            break;
        case "white--gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-sqpad.png?v=76563001495136301031657846850'
            console.log("white-wire-gr-square")
            break;
        case "white--gr-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-pad.png?v=95693909502916443591657846915'
            console.log("white-wire-gr-linear")
            break;
        case "white-wire-gr-linear":
            //need to fix
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-gr-tape.png?v=136785982844469433911657846769'
            console.log("white-wire-gr-linear-image")
            break;
        case "white-wireless-gr-linear":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-pad.png?v=95693909502916443591657846915'
            console.log("white-wireless-gr-linear-image")
            break;
        case "white-wire-gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-sqpad.png?v=76563001495136301031657846850'
            console.log("white-wire-gr-square-image")
            break;
        case "white-wireless-gr-square":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-sqpad.png?v=111578790902203822871657847531'
            console.log("white-wireless-gr-square-image")
            break;
        //white state glass pad gripless:
        case "white--grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-glide.png?v=153339817771886573841657850543'
            console.log("black-wire-grless-square")
            break;
        case "white-wire-grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-glide.png?v=153339817771886573841657850543'
            console.log("black-wire-grless-square-image")
            break;
        case "white-wireless-grless-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-glide.png?v=171978073814602154461657850558'
            console.log("black-wireless-grless-square-image")
            break;
        //white state glass pad with grip:

        case "white--gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-glide.png?v=153339817771886573841657850543'
            console.log("black-wire-gr-linear")
            break;
        case "white-wire-gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wr-glide.png?v=153339817771886573841657850543'
            console.log("black-wire-gr-square-image")
            break;
        case "white-wireless-gr-glass":
            img.src = '//cdn.shopify.com/s/files/1/0619/9666/2952/t/2/assets/wh-wrless-glide.png?v=171978073814602154461657850558'
            console.log("black-wireless-gr-square-image")
            break;
        default:
            console.log("white")
    }
}

const addBtn = document.getElementById("addCustomMouse");
// const smth = document.getElementById("smth");
// if (smth !== null) {
//     console.log("smth")
// }

if (addBtn != null) {
    console.log("loaded")
    addBtn.addEventListener("click", () => {
        console.log("clicked")
        var body = {
            'items': [
                {
                    "discounted_price": total,
                    "discounts": [],
                    "featured_image": { "aspect_ratio": 1.533, "alt": "Pulsar Xlite Mouse", "height": 180, url: "https://cdn.shopify.com/s/files/1/0619/9666/2952/products/OIP.jpg?v=1657433966", "width": 276 },
                    "final_line_price": total,
                    "final_price": total,
                    "gift_card": false,
                    "grams": 100,
                    "handle": "pulsar-xlite-mouse",
                    "id": 42505906913445,
                    "image": "https://cdn.shopify.com/s/files/1/0619/9666/2952/products/OIP.jpg?v=1657433966",
                    "key": "42505906913448:abdc18708cccba05f83c36decb2a118e",
                    "line_level_discount_allocations": [],
                    "line_level_total_discount": 0,
                    "line_price": total,
                    "options_with_values": [{ "name": "Title", "value": "Default Title" }],
                    "original_line_price": total,
                    "original_price": total,
                    "price": total,
                    "product_description": "\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas debitis magni at est minus id optio odio aperiam totam. Vel odio vero veniam cum, magnam beatae commodi! Velit, distinctio libero!\nAdipisci temporibus quasi pariatur voluptatum ipsam voluptatibus, accusantium cumque quam. Quas provident quos ipsum ab eum, ducimus, adipisci impedit pariatur reprehenderit soluta assumenda. Maxime dicta natus blanditiis, cum soluta earum!\n\n",
                    "product_has_only_default_variant": true,
                    "product_id": 7495593132200,
                    "product_title": "Custom Mouse",
                    "product_type": "",
                    "properties": null,
                    "quantity": 1,
                    "requires_shipping": true,
                    "sku": "",
                    "taxable": true,
                    "title": "Custom Mouse",
                    "total_discount": 0,
                    "url": "/products/pulsar-xlite-mouse?variant=42505906913448",
                    "variant_id": 42505906913448,
                    "variant_options": ["Default Title"],
                    "variant_title": null,
                    "vendor": "akbarjon2000"
                }
            ]
        }

        fetch("/cart/add.js", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(() => updateCart())
            .catch(err => {
                console.error("Error: " + err)
            })
    })
}