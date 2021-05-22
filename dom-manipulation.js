var fetchBtn = document.querySelector("#fetchPostBtn");
fetchBtn.addEventListener("click", fetchPosts);

function setPreloader() {
    var preloaderContainer = document.createElement("div");
    preloaderContainer.setAttribute("class", "preloader");
    var preloaderImage = document.createElement("img");
    preloaderImage.setAttribute(
        "src",
        "https://cdn.dribbble.com/users/1689917/screenshots/4419335/preloader-3.gif"
    );
    preloaderImage.setAttribute("alt", "Preloader Image");
    preloaderContainer.appendChild(preloaderImage);
    document.body.appendChild(preloaderContainer);
}

function removePreloader() {
    document.querySelector(".preloader").remove();
}

function generateItem(tag, content, className) {
    var newItem = document.createElement(tag);
    if (content !== null) {
        newItem.textContent = content;
    }
    if (className !== null) {
        newItem.setAttribute("class", className);
    }
    return newItem;
}

function fetchPosts() {
    setPreloader();

    var postContainer = document.querySelector("#posts");

    if (postContainer.children.length) {
        postContainer.innerHTML = "";
        removePreloader();
    } else {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "GET",
            dataType: "json",
            success: function (res) {
                console.log(res);

                removePreloader();

                for (var i = 0; i < res.length; i++) {
                    var postCard = generateItem("div", null, "card mb-1");
                    var postHeader = generateItem("div", null, "card-header");
                    var postHeaderTitle = generateItem(
                        "h5",
                        res[i].title,
                        null
                    );

                    // var postCard = document.createElement("div");
                    // postCard.setAttribute("class", "card mb-1");
                    // var postHeader = document.createElement("div");
                    // postHeader.setAttribute("class", "card-header");
                    // var postHeaderTitle =
                    //     document.createElement("h5");
                    // postHeaderTitle.textContent = res[i].title;

                    var postBody = generateItem("div", null, "card-body");
                    var postBodyText = generateItem("p", res[i].body, null);

                    // var postBody = document.createElement("div");
                    // postBody.setAttribute("class", "card-body");
                    // var postBodyText = document.createElement("p");
                    // postBodyText.textContent = res[i].body;

                    postHeader.appendChild(postHeaderTitle);
                    postBody.appendChild(postBodyText);
                    postCard.append(postHeader, postBody);
                    postContainer.appendChild(postCard);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    }
}
