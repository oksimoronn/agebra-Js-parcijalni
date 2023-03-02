//novi komentar

async function getData(url) {
  const response = await axios.get(url);
  return response.data;
}

function clearData() {
  const container = document.querySelector(".rightInfo");
  container.innerHTML = "";

  const infoContainer = document.querySelector(".error");
  infoContainer.innerHTML = "";
}

function initilys() {
  function generateArtistData(artistName, genre) {
    const infoContainer = document.querySelector(".rightInfo");

    const artcontainer = document.createElement("div");
    artcontainer.className = "artcontainer";
    infoContainer.appendChild(artcontainer);

    const artName = document.createElement("h3");
    artName.innerText = `Artist name: ${artistName}`;
    artcontainer.appendChild(artName);

    const artGenre = document.createElement("p");
    artGenre.innerText = `Genre: ${genre}`;
    artcontainer.appendChild(artGenre);
  }

  function handleSurch(ev) {
    ev.preventDefault();

    const formData = new FormData(form);
    const searchResult = formData.get("form");

    //console.log(searchResult);

    const url = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchResult}`;

    if (searchResult.trim() !== "") {
      clearData();
      showArtist(url);
      form.reset();
    } else {
      const infoContainer = document.querySelector(".leftSearch");

      const artName = document.createElement("h3");
      artName.innerText = "Please enter name";
      artName.className = "error";
      infoContainer.appendChild(artName);
      form.reset();
    }
  }

  async function showArtist(url) {
    const data = await getData(url);

    //console.log(data.results.length);

    for (let i = 0; i < 6; i++) {
      const nm = data.results[i].artistName;
      const gnr = data.results[i].primaryGenreName;
      generateArtistData(nm, gnr);
    }
    /* data.results.forEach((element) => {
      const nm = element.artistName;
      const gnr = element.primaryGenreName;
      generateArtistData(nm, gnr);
      //console.log(nm, gnr);
    });*/
  }
  const form = document.getElementById("formSearch");

  form.addEventListener("submit", (ev) => handleSurch(ev));
}

initilys();
