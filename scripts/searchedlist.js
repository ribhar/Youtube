    let searchedlist = JSON.parse(localStorage.getItem("searchedlist"));
    // console.log(searchedlist)
    let vcondiv = document.getElementById("vcondiv");

    let searchedInputs = JSON.parse(localStorage.getItem("searchedInputs")) || [];

    let searchresult = document.getElementById("searchresult");
    let searchbox = document.getElementById("search_input");
    // let videoData = JSON.parse(localStorage.getItem("videoData"));
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

    let youtube = async () => {
        // console.log("mai chal rha hu")
        try {
            
            // let inp = searchedlist
            let inp = searchbox.value;
            localStorage.setItem("searchedlist",JSON.stringify(inp));
            // window.location.href= "./seachedlist.html"
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

            let pagehead = document.getElementById("pagehead");
            pagehead.innerText = searchedlist;
            let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchedlist}&maxResults=20&key=AIzaSyAMfbr_q3wKdqYvfb44rTHQoJa9OaP5PeE`)

            let data = await res.json();
            let videos = data.items;
            console.log("Data", data)
            localStorage.setItem("searchedListData",JSON.stringify(videos));
            appendVideos(videos)
            return videos;
        }
        catch (e) {
            console.log("error", e)
        }
    }
    youtube();



    const appendVideos = (data) => {

    data.forEach((el) => {
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

    // let iframe = document.createElement("iframe");
    // iframe.className = "lvideoframe"
    // iframe.src = `https://www.youtube.com/embed/${el.snippet.thumbnails.high.url}`

    slcondiv.append(title,chdiv,des)
    div.append(thumdiv, slcondiv)
    vcondiv.append(div)
    // console.log(div)
});
}

let toggle = ()=>{
    let hambtn = document.getElementById("hambtn")
    let hambar = document.getElementById("hambar");
    let sham = document.getElementById("sham");
    let sections = document.getElementById("sections");
    let hamel = document.getElementsByClassName("hamel");
    
    let horhead = document.getElementsByClassName("horhead");
    console.log(horhead.innerHTML)
    if(hambtn.value=="YES"){

        hambar.style.width = "72px";
        sections.style.display = "none"
        sham.style.display = "block"
        hambtn.value="NO";
    }
    else if(hambtn.value=="NO"){

        sham.style.display = "none"
        sections.style.display = "block"
        hambar.style.width = "280px"
        hambtn.value="YES";
    }
   

  }