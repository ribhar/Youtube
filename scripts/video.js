    let searchedListData =JSON.parse(localStorage.getItem("searchedListData"));
    console.log(searchedListData)
    let searchedlist = JSON.parse(localStorage.getItem("searchedlist"));
    console.log(searchedlist)
    let secondary = document.getElementById("secondary");

    let searchedInputs = JSON.parse(localStorage.getItem("searchedInputs")) || [];

    let searchresult = document.getElementById("searchresult");
    let searchbox = document.getElementById("search_input");
    let videoData = JSON.parse(localStorage.getItem("videoData"));

    let appendData = () =>{
        let title = document.getElementById("vtitle");
        title.innerHTML = videoData.snippet.title;
        let video = document.getElementById("vplayer");
        video.src = `https://www.youtube.com/embed/${videoData.id.videoId}`;
    }
    appendData();

    console.log(videoData)
    window.onload = function () {
        document.getElementById("search_input").addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("search_button").click();
            }

        });
        document.oninput = function (event) {
            if (event.target.id !== "searchresult") {
                searchresult.style.display = "block";
                searchresult.innerHTML = ""
                let changingInput = searchbox.value
                if (changingInput == "") {
                    searchedInputs.forEach((el) => {
                        let input = document.createElement("li");
                        input.innerText = el;
                        searchresult.append(input)
                    })
                } else {
                    // appschrslt();
                }

            }

        }
        searchbox.onclick = function (event) {
            searchbox.style.outline = "1px solid blue";
            searchresult.style.display = "block";
            searchresult.innerHTML = ""
            searchedInputs.forEach((el) => {
                let input = document.createElement("li");
                input.innerText = el;
                searchresult.append(input)
            })
        }
        document.onclick = function (event) {
            if (event.target.id !== "search_input") {
                searchresult.style.display = "none";
                searchbox.style.outline = "none";
            }

        }
    }


    let pagehead = document.getElementById("pagehead");
    pagehead.innerText = videoData.snippet.title;

    let youtube =  () => {
        // console.log("mai chal rha hu")
        // try {
            
            // let inp = searchedlist
            let inp = searchbox.value;
            localStorage.setItem("searchedlist",JSON.stringify(inp));
            window.location.href= "./seachedlist.html"
            if (inp !== "") {
                if (searchedInputs.length >= 10) {
                    searchedInputs.pop(inp)
                    searchedInputs.unshift(inp)
                    localStorage.setItem("searchedInputs", JSON.stringify(searchedInputs))
                    searchresult.innerHTML = "";

                    searchedInputs.forEach((el) => {
                        let input = document.createElement("li");
                        input.innerText = el;
                        searchresult.append(input)
                    })
                } else {
                    // console.log("mai chal rha hu")
                    searchedInputs.unshift(inp)
                    localStorage.setItem("searchedInputs", JSON.stringify(searchedInputs))
                    searchresult.innerHTML = "";

                    searchedInputs.forEach((el) => {
                        let input = document.createElement("li");
                      
                        input.innerText = el;
                        searchresult.append(input)
                    })
                }

            }
    }
    

    


   
    const appendVideos = () => {

        searchedListData.forEach((el) => {
        let div = document.createElement("div");
        div.className = "lvideodiv";
        div.onclick =()=>{
            localStorage.setItem("videoData", JSON.stringify(el));
            window.location.href ="./video.html"
        }

        let thumdiv = document.createElement("div");
        thumdiv.className = "thumdiv";
        let thum = document.createElement("img");
        thum.src = el.snippet.thumbnails.high.url;
        thum.className = "lvthum"
        thumdiv.append(thum)

        let slcondiv = document.createElement("div");
        slcondiv.className = "slcondiv"

        let title = document.createElement("p");
        title.innerText = el.snippet.title; title.className = "sltitle";

        let chdiv = document.createElement("div");
        chdiv.className = "chdiv"
        let cimg = document.createElement("img");
        cimg.src = "https://via.placeholder.com/25x25";

        let ctitle = document.createElement("p");
        ctitle.innerText = el.snippet.channelTitle;
        chdiv.append(cimg,ctitle)

        let des = document.createElement("p");
        des.innerText = el.snippet.description; des.className = "sldes";

        slcondiv.append(title,chdiv,des)
        div.append(thumdiv, slcondiv)
        secondary.append(div)
        // console.log(div)
    });
}
appendVideos()