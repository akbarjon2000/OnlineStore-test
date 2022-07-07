// Put your application javascript here
// alert("smth is working")
if (document.getElementById('sort_by') !== null) {
    document.querySelector("#sort_by").addEventListener("change", (e) => {
        let url = new URL(window.location.href);
        url.searchParams.set('sort_by', e.currentTarget.value);
        window.location = url.href;
    })
}