const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing our joke to VoiceRSS API
function tellMe(joke) {
//   console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "34a23ce7985643b7aea60f404c67c1e0",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes fromjoke API
async function getJokes() {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data.joke);
    if (data.setup) {
      // setup contain both setup and delivery joke
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //   text to speech
    tellMe(joke);
    //    Disable Button
    toggleButton();
  } catch (error) {
    console.log("woops", error);
  }
}

// event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

// getJokes();
