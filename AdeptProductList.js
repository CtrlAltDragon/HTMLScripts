//<div id="my-test-content"></div>
//<p id="adeptlisttoget" hidden>Aerie Longline Bandeau Bikini Top, Aerie Leopard One Shoulder Bandeau Bikini Top, AE Dip Dye Button-Up Resort Shirt, AE Dip Dye Button-Up Resort Shirt</p>
//<script>
function adeptlistproducts() {

    var slisttoget = document.getElementById("adeptlisttoget").innerText;
    var listtoget = slisttoget.split(",");
    var returndata = "";
    var products = [];

    for (let i = 0; i < listtoget.length; i++) {
        const XHR = new XMLHttpRequest();

        XHR.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) {
                var data = JSON.parse(this.responseText);
                if (i === 0) {
                    returndata = data;
                    products.push(data.products[0]);
                }
                else {
                    products.push(data.products[0]);
                }
            }
        }


        XHR.open('POST', 'https://triplefive-prod-api.mall.adeptmind.ai/search', false);
        XHR.setRequestHeader('Content-Type', 'application/json');

        var senddata = JSON.stringify({
            "query": listtoget[i],
            "mall_id": "mall-of-america",
            "size": 1,
            "shop_query": ""
        });
        XHR.send(senddata);
        console.log("Sent Post Request");
    }
    returndata.products = products;
    buildcarousel(returndata);

}
function buildcarousel(productdata) {
    const currentDiv = document.getElementById("my-test-content");
    const section = document.createElement("section");
    section.classList.add("section__featured-content-row", "bg--white", "pad--both", "lazy__load", "lazy__load--active");
    const grid = document.createElement("div");
    grid.classList.add("grid");

    var data = productdata;
    console.log(data);
    var productlen = data.products.length;
    var carousel = document.createElement("div");
    carousel.classList.add("slick__slider", "3slides");
    carousel.id = 'slidelist';

    var shopallurl = "https://shop.mallofamerica.com";
    if (productlen > 7) {
        productlen = 7;
    }
    for (let i = 0; i < productlen; i++) {
        var product = data.products[i];
        var url = "https://shop.mallofamerica.com" + product.url;
        var slide = document.createElement("div");
        slide.id = i.toString();
        slide.classList.add("card__tile", "card__tile--single", "bg--white");


        var imagespan = document.createElement("a");
        imagespan.href = url;
        imagespan.target = "_blank";
        imagespan.style = "text-decoration: none; color: black";
        var newImg = document.createElement("div");
        newImg.classList.add("card__tile--image", "element--bg-contain", "bg--white", "dsfeatured-card");
        newImg.setAttribute("role", "img");
        newImg.setAttribute("aria-label", product.title);
        newImg.style = "background-image: url(" + product.image + ");";

        var detailsdiv = document.createElement("div");
        detailsdiv.classList.add("card__tile--details", "bg--white");

        var atitle = document.createElement("a");
        atitle.href = url;
        atitle.target = "_blank";
        var h3title = document.createElement("h3");
        h3title.classList.add("heading--card-title", "dsfeatured-card");
        h3title.innerText = product.store[0];
        atitle.appendChild(h3title);

        var descdiv = document.createElement("div");
        descdiv.classList.add("heading--card-description");
        descdiv.innerHTML = product.title + "<br />$" + product.price[0] + "<br/>";
        descdiv.innerHTML += "<a href=\"" + url + "\"><strong>Buy Now! &gt;</strong></a>";

        detailsdiv.appendChild(atitle);
        detailsdiv.appendChild(descdiv);

        imagespan.appendChild(newImg);

        slide.appendChild(imagespan);
        slide.appendChild(detailsdiv);
        carousel.appendChild(slide);
    }
var centerer = document.createElement("center");
var shopall = document.createElement('a');
shopall.classList.add('button');
shopall.classList.add('button__icon--arrow-right');
shopall.innerText = "Shop All";
shopall.style = "padding-left: 40px";
shopall.href = shopallurl;

centerer.appendChild(shopall);
grid.appendChild(carousel);
section.appendChild(grid);
section.appendChild(centerer);
currentDiv.appendChild(section);
}
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        adeptlistproducts();
    }
    else {
        console.log(document.readyState);
    }
};
//</script >