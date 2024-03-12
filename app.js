// @ts-nocheck

let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();

  let nameAvailable = true;
  kittens.forEach((kitten) => {
    nameAvailable = !(kitten.name == document.getElementById('kittenName').value);
  });

  if (!nameAvailable) {
    alert("Kitten name is already taken.");
    return;
  }

  kittens.push({
    "id": generateId(),
    "name": document.getElementById('kittenName').value,
    "mood": "Tolerant",
    "affection": 3
  });
  document.getElementById('kittenName').value = "";
  saveKittens();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  kittens = JSON.parse(window.localStorage.getItem("kittens"));
  drawKittens();
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  document.getElementById('kittens').innerHTML = "";
  if (kittens.length > 0) {
    kittens.forEach((kitten) => {
      if (document.getElementById(kitten.id) == null) {
        let kittenContainer = document.createElement("div");
        kittenContainer.id = kitten.id;
        kittenContainer.className = `kitten ${kitten.mood.toLowerCase()}`;
        kittenContainer.innerHTML = `<img src='https://pngfre.com/wp-content/uploads/transparent-cat-by-pngfre-74-243x300.png'><h3>Name: ${kitten.name}</h3><p class='stats'>Mood: ${kitten.mood}<br>Affection: ${kitten.affection}</p><button onclick="pet('${kitten.id}')">Pet</button><button onclick="catnip('${kitten.id}')">Give Catnip</button><button onclick="deleteCat('${kitten.id}')" class="red" style="pointer-events: auto !important;">Delete Cat</button>`;
        document.getElementById('kittens').append(kittenContainer);
      }
    });
  }
}

/**
 * Delete kitten by ID
 * @param {string} id
 */

function deleteCat(id) {
  let kitten = findKittenById(id);
  kittens.splice(kitten, 1);
  saveKittens();
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  let foundKitten = null;
  kittens.forEach((kitten) => {
    if (kitten.id == id) {
      foundKitten = kitten;
    }
  });
  return foundKitten;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id);
  if (Math.random() >= 0.5) {
    kitten.affection = Math.min(kitten.affection + 1, 5);
  } else {
    kitten.affection--;
  }
  setKittenMood(kitten);
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.mood = "Tolerant";
  kitten.affection = 5;
  setKittenMood(kitten);
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  switch (kitten.affection) {
    case 0:
      kitten.mood = "Gone";
      break;
    case 2, 3, 4:
      kitten.mood = "Tolerant";
      break;
    case 1:
      kitten.mood = "Angry";
      break;
    case 5:
      kitten.mood = "Happy";
      break;
  }
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = [];
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away');
  loadKittens();
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}