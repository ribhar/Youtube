    let searchedInputs = JSON.parse(localStorage.getItem("searchedInputs")) || [];



    let searchresult = document.getElementById("searchresult");
    let searchbox = document.getElementById("search_input");

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

    //////////// tab suggestions start///////////////////////////////////////
    let tabheader = document.getElementById("tabbtndiv");
    let vcongrid = document.getElementById("vcongrid");

    let tabBtnAppend = ()=>{
        tabheader.innerHTML = ""
        searchedInputs.forEach((el) => {
            console.log("btn appending")
            if(el.length<=10){
                let btn = document.createElement("button");
                btn.className = "tabbtn"; btn.innerHTML = el; btn.onclick = (el)=> {
                    appendTabCon(el);
                }
                btn.value = el;
                tabheader.append(btn);
            }
            
        });
    }
    tabBtnAppend()


    var pre = document.querySelector("#pre");    
    var nex = document.querySelector("#nex");    
    var div = document.querySelectorAll(".tabbtn");
    console.log("btns",div)
    var l =0;
    pre.onclick = ()=>{
        l++;
        for(var i of div)
        {
            if(l==0){i.style.left = "0px";}
            if(l==1){i.style.left = "auto";}
            if(l==2){l=1}
            
        }
    }
    nex.onclick = ()=>{
        l--;
        for(var i of div)
        {
            if(l==0){i.style.left = "0px";}
            if(l==1){i.style.left = "auto";}
            if(l<0){l=0;}
        }
    }

    let appendTabCon = ()=>{

    }
    //////////// tab suggestions end////////////////////////////////////////////////////////////////

    let youtube = async () => {
        // console.log("mai chal rha hu")

        let inp = searchbox.value;
        localStorage.setItem("searchedlist",JSON.stringify(inp));
        window.location.href= "./seachedlist.html"
        if (inp !== "") {
            if (searchedInputs.length >= 15) {
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

  

  let popular = async () => {
    // console.log("mai chal rha hu")

    try{
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=AIzaSyAMfbr_q3wKdqYvfb44rTHQoJa9OaP5PeE&maxResults=40`)
        let data = await res.json();
        let videos = data.items;
    

        console.log("Data", data)
        
        appendVideos(videos)
        // return videos;
    }
    catch(e)
    {
        console.log("error", e)
    }            

}
popular()
  

const appendVideos = (data) => {

    data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "lvideodiv";
    div.onclick =()=>{
        localStorage.setItem("videoData", JSON.stringify(el));
        window.location.href ="./video.html"
    }

    let thum = document.createElement("img");
    thum.src = el.snippet.thumbnails.high.url;
    thum.className = "lvthum"
    

    let codiv = document.createElement("div");
    codiv.className = "codiv"

    let title = document.createElement("p");
    title.innerText = el.snippet.title; title.className = "sltitle";

    let ctitle = document.createElement("p");
    ctitle.innerText = el.snippet.channelTitle;

    let des = document.createElement("p");
    des.innerText = el.snippet.description; des.className = "sldes";

    codiv.append(title,ctitle,des)
    
    let chdiv = document.createElement("div");
    chdiv.className = "chdiv"
    let cimg = document.createElement("img");
    cimg.src = "https://via.placeholder.com/40x40";

    chdiv.append(cimg,codiv)


    div.append(thum, chdiv)
    vcongrid.append(div)
    // console.log(div)
});
}


// let npopular = JSON.parse(localStorage.getItem("popular"));
//   appendVideos(npopular)