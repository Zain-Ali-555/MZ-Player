console.log("Asslamualikum kia Hal Hia");

const upload = document.querySelector(".upload");
const input = document.querySelector(".upload input");
const List = document.querySelector(".musicList");
const player = document.querySelector(".controls");

let musicArr = JSON.parse(localStorage.getItem("musicList")) || []; // Retrieve music list from local storage or initialize an empty array

// Function to add a music item to the DOM
function addMusicToList(name, audioURL) {
  const newMusic = document.createElement("h5");
  const Mname = document.createElement("span");
  const Mlength = document.createElement("span");

  newMusic.className = "music";
  newMusic.dataset.url = audioURL;

  Mname.textContent = name;
  Mlength.textContent = "Loding..."; // Placeholder for now

  newMusic.appendChild(Mname);
  newMusic.appendChild(Mlength);
  List.appendChild(newMusic);

  // Calculate and display duration using a temporary audio element
  const tempAudio = new Audio(audioURL);
  tempAudio.addEventListener("loadedmetadata", () => {
    const duration = tempAudio.duration; // Get duration in seconds
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    Mlength.textContent = `${minutes}:${seconds}`; // Display duration
  });

  // Add click-to-play functionality
  newMusic.addEventListener("click", () => {
    const audio = document.createElement("audio");
    player.innerHTML = "";
    audio.controls = true;
    audio.autoplay = true;
    player.appendChild(audio);
    audio.src = audioURL;
  });
}

// Load existing music from Local Storage on page load
musicArr.forEach((music) => {
  addMusicToList(music.name, music.url);
});

upload.addEventListener("click", (e) => {
  input.click(e);
});

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("audio/")) {
    const audioURL = URL.createObjectURL(file);

    // Add the music item to the DOM
    addMusicToList(file.name, audioURL);

    // Save the music to the array and update Local Storage
    musicArr.push({ name: file.name, url: audioURL });
    localStorage.setItem("musicList", JSON.stringify(musicArr)); // Persist the updated music list

    console.log(musicArr);
  } else {
    console.log("Error: Please upload a valid audio file");
  }
});
