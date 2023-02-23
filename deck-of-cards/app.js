const BASE_URL = "https://deckofcardsapi.com/api/";
const $cardsDiv = $("#cards");
const $btn = $("#card-button");
let deck_id = "";
let deck;
let remaining = 52;

$btn.on("click", handleClick);

async function handleClick(evt) {
  evt.preventDefault();
  if (!deck_id) {
    deck = await getNewDeck();
    deck_id = deck.deckID;
    const card = await drawCard(deck);
    await updateUI(card);
    remaining -= 1;
  } else {
    const card = await drawCard(deck);
    await updateUI(card);
    remaining -= 1;
    if (remaining === 0) {
      $btn.hide();
    }
  }
}

async function getNewDeck() {
  const res = await axios.get(`${BASE_URL}deck/new`);
  return {
    deckID: res.data.deck_id,
    remaining: res.data.remaining,
  };
}

async function drawCard(deck) {
  const d = await deck;
  const res = await axios.get(`${BASE_URL}deck/${d["deckID"]}/draw`);
  return res.data.cards[0].image;
}

async function updateUI(cardImg) {
  const card = await cardImg;
  const $img = $("<img>")
    .attr("src", card)
    .css({
      position: "absolute",
      top: "50%",
      transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
    });
  $cardsDiv.append($img);
}
