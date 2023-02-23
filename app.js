const BASE_URL = "http://numbersapi.com/";
const $numFacts = $("#num-facts");
const $multFacts = $("#mult-facts");

async function getFavNum(favNum) {
  res = await axios.get(`${BASE_URL}${favNum}?json`);
  console.log(res.data.text);
}

async function getRangeNumFacts(start, finish) {
  res = await axios.get(`${BASE_URL}${start}..${finish}?json`);
  updateUI(res.data);
}

async function updateUI(data) {
  for (num in data) {
    const $li = $("<li>").text(data[num]);
    $numFacts.append($li);
  }
}

async function getFourFavNumFacts(favNum) {
  res = await Promise.all([
    axios.get(`${BASE_URL}${favNum}?json`),
    axios.get(`${BASE_URL}${favNum}?json`),
    axios.get(`${BASE_URL}${favNum}?json`),
    axios.get(`${BASE_URL}${favNum}?json`),
  ]);
  for (data of res) {
    const $li = $("<li>").text(data.data.text);
    $multFacts.append($li);
  }
}

getRangeNumFacts(3, 7);
getFourFavNumFacts(3);
