/** @format */
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const shuffled = (deck) => {
  // for 1000 turns
  // switch the values of two random cards
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
  return deck;
};

export const getDeck = () => {
  var deck = [];

  for (var i = 0; i < suits.length; i++) {
    for (var x = 0; x < values.length; x++) {
      var card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }
  deck = shuffled(deck);
  return deck;
};

export const distributeCards = (data, tdeck) => {
  let { player } = data; //player is number of players > 0

  const assignPlayerNames = (player) => {
    //assign player names:
    let playerCard = [];
    for (let i = 0; i < player; i++) {
      //https://stackoverflow.com/questions/33378251/how-do-i-add-multiple-spaces-with-es6-string-templates
      playerCard.push(`Player\u00A0${[i + 1]}`);
    }
    return playerCard;
  };

  const findLuckyPlayerCards = (player, tdeck, playerCard) => {
    //playerCard now has Player1, Player2, etc
    //We will divide the cards now equally first and then any balance cards will assign randomly to any player
    let balc = tdeck.length % player; //later we will random assign balc to any of players
    let distTotal = tdeck.length - balc; //this is total that can divide equally (/player)
    let distEach = distTotal / player; //Each will get equally
    let Matrix = [];
    let carddeck = [];
    let deltdeck = [...tdeck];
    //https://stackoverflow.com/questions/8495687/split-array-into-chunks
    //https://stackoverflow.com/questions/53387813/array-prototype-is-read-only-properties-should-not-be-added-no-extend-native
    //eslint-disable-next-line no-extend-native
    Array.prototype.chunk = function (n) {
      if (!this.length) {
        return [];
      }
      return [this.slice(0, n)].concat(this.slice(n).chunk(n));
    };

    var dd = deltdeck.chunk(distEach); //chunk out
    let darr = [];

    for (let j = player; j < dd.length; j++) {
      darr.push(dd[j]);
    }
    //https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
    const mergeDedupe = (arr) => {
      return [...new Set([].concat(...arr))];
    };
    let balanceDek = mergeDedupe(darr); //merged!!
    //To make balanceDek normalized length
    //Exception, when player =51, below if statement breaks and
    //need to add player =51 as or condition
    if (
      (balanceDek.length !== 0 && balanceDek.length !== dd[0].length) ||
      player === 51 ||
      player === 12 ||
      player === 25
    ) {
      let arr1 = [];

      for (let i = 0; i < player - balc; i++) {
        arr1.push({ Value: "-1", Suit: "joker" });
      }
      balanceDek = mergeDedupe([arr1, balanceDek]);
    }

    for (let j = 0; j < player; j++) {
      for (let k = 0; k < distEach; k++) {
        carddeck.push(dd[j][k]);
        //https://stackoverflow.com/questions/10742369/javascript-shift-versus-splice-are-these-statements-equal
        //www.freecodecamp.org/news/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae/
        //https://love2dev.com/blog/javascript-remove-from-array/
        //deltdeck.shift();
        //All above not works, so have to chunk out
      }
      Matrix.push(playerCard[j], carddeck);
      carddeck = [];
    } //for ends
    //console.log("mat", Matrix); //Matrix will hold equally distibuted cards for all players

    return [Matrix, balanceDek];
  };

  //If players > 52 (tdeck.length), what will we do?
  // Distribute at least one card to 52 players and seperate out players who not get a card
  if (player > tdeck.length) {
    // Case 2, qty of player > card deck (52)
    let playerCard = assignPlayerNames(player);
    //generate a random pick for 1 to max players...
    // from 1 -> max players
    // https://stackoverflow.com/questions/12987719/javascript-how-to-randomly-sample-items-without-replacement
    const getRandomFromBucket = () => {
      var randomIndex = Math.floor(Math.random() * playerCard.length);
      return playerCard.splice(randomIndex, 1)[0];
    };
    let lucky = [];
    for (let i = 0; i < tdeck.length; i++) {
      let jj = getRandomFromBucket();
      lucky.push(jj);
    }
    //https://stackoverflow.com/questions/14930516/compare-two-javascript-arrays-and-remove-duplicates
    let luc = findLuckyPlayerCards(lucky.length, tdeck, lucky);
    let luckyy = luc[0]; //the Matrix
    //as player is max now and == lucky.length
    let unlucky = playerCard.filter((val) => !lucky.includes(val));
    let balanceDek = luc[1]; //the balance dek
    //unlucky not have card and so no need call findLuckyPlayerCards !!
    return [luckyy, unlucky, balanceDek];
  } //if ends
  else {
    // Case 1, qty of player < card deck (52)
    //assign player names:
    let playerCard = assignPlayerNames(player); //make names of player
    let luc = findLuckyPlayerCards(player, tdeck, playerCard);
    let lucky = luc[0]; //the Matrix
    let unlucky = [];
    let balanceDek = luc[1]; //the balance dek
    return [lucky, unlucky, balanceDek];
  }
  //findLuckyPlayers is a common function for lucky players if qty < 52 || >52 (card deck length)
};
