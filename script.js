console.log("Asslamualikum kia Hal Hia");

const upload = document.querySelector(".upload");
const input = document.querySelector(".upload input");
const List = document.querySelector(".musicList");
const player = document.querySelector(".controls");

const newMusic = document.createElement("h5");

const musicArr = [];

upload.addEventListener("click", (e) => {
  input.click(e);
});

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("audio/")) {
    const audioURL = URL.createObjectURL(file);

    const newMusic = document.createElement("h5");
    const Mname = document.createElement("span");
    const Mlength = document.createElement("span");
    newMusic.className = "music";
    newMusic.textContent;
    newMusic.dataset.url = audioURL;
    List.appendChild(newMusic);
    
    newMusic.appendChild(Mname);
    newMusic.appendChild(Mlength);

    Mname.textContent = file.name;
    // Mlength.textContent = formattedLength;
    musicArr.push({ name: file.name });
    console.log(musicArr);

    // Playing Music
    newMusic.addEventListener("click", () => {
      const audio = document.createElement("audio");
      player.innerHTML = "";
      audio.controls = true;
      audio.autoplay = true;
      player.appendChild(audio);
      audio.src = audioURL;
    });
  } else {
    console.log("Error");
  }
});

localStorage.setItem("musicList", JSON.stringify(musicArr));
