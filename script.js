console.log("Lets do javascript!")

async function main() {

    let audio = new Audio

    function playMusic(track) {
        audio.src = "/songs/" + track
        audio.play()
        let play = document.querySelector(".play-playbar-button")
        play.innerHTML = `<img src="pause-button-icon.svg" alt="" class="play-playbar-image">`

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        audio.addEventListener("timeupdate", () => {
            const currentTimeInSeconds = parseInt(audio.currentTime);
            const durationInSeconds = parseInt(audio.duration);
            document.querySelector(".song-display-duration").innerHTML = formatTime(currentTimeInSeconds) + "/" + formatTime(durationInSeconds);
            document.querySelector(".circle").style.left = (audio.currentTime / audio.duration) * 100 + "%";
        })
    }

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        audio.currentTime = (percent * (audio.duration)) / 100;
    })


    let responses = await fetch("http://127.0.0.1:3000/song%20covers/");
    let images = await responses.text();
    // console.log(images)

    let div = document.createElement("div")
    div.innerHTML = images;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let image_links = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".jpeg")) {
            let item = element.href.split("covers/")[1]
            let link = item.replaceAll("%20", " ")
            image_links.push(link)
        }
    }

    let responses2 = await fetch("http://127.0.0.1:3000/songs/");
    let content = await responses2.text();
    // console.log(images)

    let div2 = document.createElement("div")
    div2.innerHTML = content;
    let as2 = div2.getElementsByTagName("a")
    // console.log(as)

    let content_title = []
    let songLinks = []
    for (let index = 0; index < as2.length; index++) {
        const element = as2[index];
        if (element.href.endsWith(".mp3")) {
            songLinks.push(element.href)
            let item = element.href.split("songs/")[1]
            let item2 = item.split("_")[0]
            let link = item2.replaceAll("%20", " ")
            content_title.push(link)
        }
    }

    for (let index = 0; index < content_title.length; index++) {
        const element2 = content_title[index];
        const element = image_links[index];

        let container = document.getElementById("contains-cards");
        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card flex")
        // cardDiv.setAttribute("class","flex")
        cardDiv.innerHTML = `<div class="image-div">
        <img src="/song covers/${element}" alt="" class="song-image">
        <button class="play-button">
        <img src="play-button-logo.svg" alt="">
        </button>
        </div>
        <span class="playlist-heading">${element2}</span>
        <span class="playlist-content">Aman Wadhwani</span>`;

        container.append(cardDiv);
    }


    let allCards = document.getElementsByClassName("card")

    let cardArray = Array.from(allCards);
    for (let index = 0; index < cardArray.length; index++) {
        const element = cardArray[index];
        let responses2 = await fetch("http://127.0.0.1:3000/songs/");
        let content = await responses2.text();
        // console.log(images)

        let div2 = document.createElement("div")
        div2.innerHTML = content;
        let as2 = div2.getElementsByTagName("a")
        // console.log(as)

        let songNames = []
        for (let index = 0; index < as2.length; index++) {
            const element = as2[index];
            if (element.href.endsWith(".mp3")) {
                let item = element.href.split("songs/")[1]
                // let item2 = item.split("_")[0]
                let link = item.replaceAll("%20", " ")
                songNames.push(link)
            }
        }


        element.addEventListener("click", () => {
            let gaana = element.firstElementChild.nextElementSibling.innerHTML
            console.log(gaana)
            songNames.forEach((e) => {
                if (e.startsWith(gaana)) {
                    // console.log(e);
                    playMusic(e);
                    document.querySelector(".song-display-name").innerHTML = gaana;
                    // let play = document.querySelector(".play-playbar-button")
                    // play.innerHTML = `<img src="pause-button-icon.svg" alt="" class="play-playbar-image">`

                }
                // for (let index = 0; index < content_title.length; index++) {
                //     const element = content_title[index];
                // }
            })
        })
    }
    console.log(content_title);

    let play = document.querySelector(".play-playbar-button")
    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play()
            play.innerHTML = `<img src="pause-button-icon.svg" alt="" class="play-playbar-image">`
        }
        else {
            audio.pause()
            play.innerHTML = `<img src="play-button-logo.svg" alt="" class="play-playbar-image">`
        }
    })

    // document.querySelector(".seekbar").addEventListener("click", e=> {
    //     let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100 + "%";
    //     document.querySelector(".circle").style.left = percent;
    //     audio.currentTime = ((audio.duration) * percent) *100;
    // })

    document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log(e.target.value)
        audio.volume = e.target.value / 100
    })

    document.querySelector(".previous-playbar-button").addEventListener("click", (e) => {
        let index = songLinks.indexOf(audio.src)

        // let index = content_title.indexOf(arr4)
        // console.log(index)

        if (index > 0) {
            audio.pause()

            let song = songLinks[index - 1].split("/songs/")[1]
            console.log(song)
            let song2 = songLinks[index - 1].split("/songs/")
            let song3 = song2.slice(".mp3")[1]
            let song4 = song3.split("_")[0]
            let finalSong = song4.replaceAll("%20", " ")

            playMusic(song)

            document.querySelector(".song-display-name").innerHTML = finalSong
        }
    })

    document.querySelector(".next-playbar-button").addEventListener("click", (e) => {
        let index = songLinks.indexOf(audio.src)

        // let index = content_title.indexOf(arr4)
        // console.log(index)

        if (index < content_title.length - 1) {
            audio.pause()

            let song = songLinks[index + 1].split("/songs/")[1]
            console.log(song)
            let song2 = songLinks[index + 1].split("/songs/")
            let song3 = song2.slice(".mp3")[1]
            let song4 = song3.split("_")[0]
            let finalSong = song4.replaceAll("%20", " ")

            playMusic(song)

            document.querySelector(".song-display-name").innerHTML = finalSong
        }
    })

    document.querySelector(".hamburger-button").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })

    document.querySelector(".close-logo").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

}


async function updatingImages() {
    let responses = await fetch("http://127.0.0.1:3000/song%20covers/");
    let images = await responses.text();
    // console.log(images)

    let div = document.createElement("div")
    div.innerHTML = images;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let image_links = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".jpeg")) {
            let item = element.href.split("covers/")[1]
            let link = item.replaceAll("%20", " ")
            image_links.push(link)
        }
    }

    for (let index = 0; index < image_links.length; index++) {
        const element = image_links[index];

        let container = document.getElementById("contains-cards");
        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card flex")
        // cardDiv.setAttribute("class","flex")
        cardDiv.innerHTML = `<div class="image-div">
        <img src="/song covers/${element}" alt="" class="song-image">
        <button class="play-button">
        <img src="play-button-logo.svg" alt="">
        </button>
        </div>
        <span class="playlist-heading">Dinner with Friends</span>
        <span class="playlist-content">The perfect soundtrack to those long nights over dinner</span>`;

        container.append(cardDiv);
    }

    // console.log(image_links)
}

async function updatingContent() {
    // let responses = await fetch("http://127.0.0.1:3000/songs/");
    // let content = await responses.text();
    // // console.log(images)

    // let div = document.createElement("div")
    // div.innerHTML = content;
    // let as = div.getElementsByTagName("a")
    // // console.log(as)

    // let content_title = []
    // for (let index = 0; index < as.length; index++) {
    //     const element = as[index];
    //     if(element.href.endsWith(".mp3")){
    //         let item = element.href.split("songs/")[1]
    //         let item2 = item.split("_")[0]
    //         let link = item2.replaceAll("%20"," ")
    //         content_title.push(link)
    //     }
    // }
    // console.log(content_title)

    for (let index = 0; index < content_title.length; index++) {
        const element = content_title[index];

        let container = document.getElementById("contains-cards");
        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card flex")
        // cardDiv.setAttribute("class","flex")
        cardDiv.innerHTML = `<div class="image-div">
        <img src="" alt="" class="song-image">
        <button class="play-button">
        <img src="play-button-logo.svg" alt="">
        </button>
        </div>
        <span class="playlist-heading">${element}</span>
        <span class="playlist-content">Aman Wadhwani</span>`;

        container.append(cardDiv);
    }

    // console.log()
}

// updatingImages();
// updatingContent();

main()