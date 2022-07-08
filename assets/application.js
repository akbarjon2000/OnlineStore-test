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
const productModal = new bootstrap.Modal(document.getElementById("product-info-modal"))
if (productInfoAnchors.length > 0) {
    productInfoAnchors.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault()

            var url = '/products/' + item.getAttribute('product-handle') + '.jsS'

            fetch(url)
                .then(resp => resp.json())
                .then(function (data) {
                    console.log(data)
                })
            productModal.show()
        })
    })
}