// JavaScript source code
window.onload = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.carousel {
              max-width: 960px;
              text-align: center;
              overflow: hidden;
            }

            .slides {
              display: flex;
              height: 310px;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
              -webkit-overflow-scrolling: touch;
            }
            .slides::-webkit-scrollbar {
              width: 0px;
              height: 0px;
            }
            .slides::-webkit-scrollbar-thumb {
              //background: black;
              border-radius: 10px;
            }
            .slides::-webkit-scrollbar-track {
              background: transparent;
            }

            .slides > div {
              scroll-snap-align: start;
              flex-shrink: 0;
              width: 300px;
              height: 300px;
              margin-right: 20px;
              border-radius: 10px;
              background: #eee;
              transform-origin: center center;
              transform: scale(1);
              transition: transform 0.5s;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .dotlist {
                    box-sizing: border-box;
                    display: block;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    text-align: center;
                }
            .dotlist > ol {
                    display: inline-flex;
                    list-style: none;
                    margin: 0rem;
            }
            .navbutton {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #333;
                background-clip: content-box;
                border: 0.25rem solid transparent;
                border-radius: 50%;
                font-size: 0;
                transition: transform 0.1s;
            }
            .prevbutton{
                left: 2%;
                position: absolute;
                display: block;
                line-height: 0;
                font-size: 0;
                top: 155px;
                width: 20px;
                height: 20px;
                padding: 0;
                border: none;
                outline: 0;
                background: 0 0;
                color: transparent;
                cursor: pointer;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
            }
            .nextbutton{
                left: 96%;
                position: absolute;
                display: block;
                line-height: 0;
                font-size: 0;
                top: 155px;
                width: 20px;
                height: 20px;
                padding: 0;
                border: none;
                outline: 0;
                background: 0 0;
                color: transparent;
                cursor: pointer;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
            }
            .arrowold {
                z-index: 200;
                width: 50px;
                height: 50px;
                opacity: .5;
                cursor: pointer;
                -webkit-transition: all .25s cubic-bezier(.25,.46,.45,.94);
                transition: all .25s cubic-bezier(.25,.46,.45,.94);
            }
            .arrow {
              border: solid black;
              border-width: 0 3px 3px 0;
              display: inline-block;
              opacity: .5;
              padding: 3px;
            }
            .arrow:hover {
                opacity: 1;
            }

            .right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }

            .left {
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
            .nextbutton:before {
                font-family: moa-icon;
                font-weight: lighter;
                font-size: 50px;
                color: #000;
                line-height: 1;
                opacity: .75;
                -webkit-font-smoothing: antialiased;
            }
            .prevbutton:before {
                font-family: moa-icon;
                font-weight: lighter;
                font-size: 50px;
                color: #000;
                line-height: 1;
                opacity: .75;
                -webkit-font-smoothing: antialiased;
            }
`;
    document.getElementsByTagName('head')[0].appendChild(style);
    const XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {

            const currentDiv = document.getElementById("shopproduct");
            currentDiv.classList.add('carousel');

            var data = JSON.parse(this.responseText);
            var productlen = data.products.length;
            var carousel = document.createElement("div");
            carousel.classList.add("slides");
            carousel.id = 'slidelist';
            var aside = document.createElement("aside");
            aside.classList.add('dotlist');
            var dotlist = document.createElement("ol");

            const buttonLeft = document.createElement('button');
            const buttonRight = document.createElement('button');
            buttonLeft.classList.add('prevbutton');
            buttonRight.classList.add('nextbutton');
            buttonLeft.classList.add('arrow');
            buttonLeft.classList.add('left');
            buttonRight.classList.add('arrow');
            buttonRight.classList.add('right');
            //buttonLeft.setAttribute('content', "f053");
            //buttonRight.setAttribute('content', "f054");
            buttonLeft.addEventListener('click', () => {
                var toScroll = document.getElementById('slidelist');
                toScroll.scrollBy(-150, 0);
            });
            buttonRight.addEventListener('click', () => {
                var toScroll = document.getElementById('slidelist');
                toScroll.scrollBy(150, 0);
            });

            if (productlen > 7) {
                productlen = 7;
            }
            for (let i = 0; i < productlen; i++) {
                var product = data.products[i];
                var url = "https://shop.mallofamerica.com" + product.url;
                var slide = document.createElement("div");
                slide.id = "slide" + i.toString();

                var dot = document.createElement('li');

                var dotlink = document.createElement("a");
                dotlink.classList.add('navbutton');
                dotlink.href = "#slide" + i.toString();
                dot.appendChild(dotlink);

                var dataspan = document.createElement("a");
                dataspan.href = url;
                dataspan.style = "text-decoration: none; color: black";
                var newImg = document.createElement("img");
                newImg.width = 200;
                newImg.height = 200;
                var titlep = document.createElement("p");
                var shopp = document.createElement("p");
                var pricep = document.createElement("p");
                titlep.style = "font-size: 11pt";
                shopp.style = "font-size: 11pt";
                pricep.style = "font-size: 11pt";
                newImg.src = product.image;
                shopp.innerText = product.store[0];
                pricep.innerText = "$" + product.price[0];
                titlep.innerText = product.title;

                dataspan.appendChild(newImg);
                dataspan.appendChild(titlep);
                dataspan.appendChild(shopp);
                dataspan.appendChild(pricep);

                slide.appendChild(dataspan);
                carousel.appendChild(slide);

                dotlist.appendChild(dot);
            }

            carousel.appendChild(buttonLeft);
            carousel.appendChild(buttonRight);
            aside.appendChild(dotlist);
            currentDiv.appendChild(carousel);
            currentDiv.appendChild(aside);


        }
    }

    XHR.open('POST', 'https://triplefive-prod-api.mall.adeptmind.ai/search');
    XHR.setRequestHeader('Content-Type', 'application/json');

    var senddata = JSON.stringify({
        "query": "",
        "mall_id": "mall-of-america",
        "size": 10,
        "shop_query": "aerie"
    });
    XHR.send(senddata);
    console.log("Sent Post Request");
}