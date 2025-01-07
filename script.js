console.log("Asslamualikum kia Hal Hia");

const upload = document.querySelector(".upload");
const input = document.querySelector(".upload input");
const player = document.querySelector(".controls");
const side_Nav = document.querySelector(".sideNav");
const Home_Btn = document.querySelector(".sideNav .Home");
const Home_Section = document.querySelector(".musicList");
const search_Btn = document.querySelector(".sideNav .Search");
const search_Section = document.querySelector(".searchSong");
const rightClick = document.querySelector(".musicList .rightClick");
const play = document.querySelector(".rightClick .play");
const del = document.querySelector(".rightClick .delete");
const loop = document.querySelector(".rightClick .loop");

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
  Home_Section.appendChild(newMusic);

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

  // Function to play music
  function PlayMusic_Function(audioURL) {
    const audio = document.createElement("audio");
    player.innerHTML = ""; // Clear existing audio player
    audio.controls = true;
    audio.autoplay = true;
    player.appendChild(audio);
    audio.src = audioURL; // Set the audio source
  }

  // Right-click functionality
  newMusic.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Prevent the default context menu

    // Show the custom context menu
    rightClick.style.display = "flex";
    rightClick.style.left = `${e.clientX - 46}px`;
    rightClick.style.top = `${e.clientY - 46}px`;

    // Handle the Delete button click
    del.onclick = () => {
      newMusic.remove(); // Remove the music item from the DOM
      console.log("Removed");

      // Remove the music item from the musicArr array
      musicArr = musicArr.filter((music) => music.url !== audioURL);

      // Update Local Storage
      localStorage.setItem("musicList", JSON.stringify(musicArr));
      rightClick.style.display = "none"; // Hide the custom context menu
    };

    // Handle the Play button click
    play.onclick = () => {
      PlayMusic_Function(audioURL); // Play the specific audio
      rightClick.style.display = "none"; // Hide the custom context menu
    };
  });

  // Hide the context menu on a general click
  document.addEventListener("click", () => {
    rightClick.style.display = "none";
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

Home_Btn.addEventListener("click", () => {
  Home_Section.style.display = "flex";
  search_Section.style.display = "none";
});

search_Btn.addEventListener("click", () => {
  Home_Section.style.display = "none";
  search_Section.style.display = "flex";
});
