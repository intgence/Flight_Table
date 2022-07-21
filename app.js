const tableBody = document.getElementById("table-body");

let flights = [
  {
    time: "08:11",
    destination: "OMAN",
    flight: "OX 203",
    gate: "A 01",
    remarks: "ON TIME",
  },
  {
    time: "12:39",
    destination: "LONDON",
    flight: "CL 320",
    gate: "C 31",
    remarks: "CANCELLED",
  },
  {
    time: "13:21",
    destination: "DUBAI",
    flight: "OXB 201",
    gate: "A 19",
    remarks: "CANCELLED",
  },
  {
    time: "14:01",
    destination: "FRANKFURT",
    flight: "FR 402",
    gate: "B 02",
    remarks: "ON TIME",
  },
  {
    time: "15:22",
    destination: "TOKYO",
    flight: "TK 211",
    gate: "A 32",
    remarks: "DELAYED",
  },
];

const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "OMAN", "BEIRUT"];
const remark = ["ON TIME", "DELAYED", "CANCELLED"];
let hour = 15;

function populateTable() {
  for (const flight of flights) {
    const tableRow = document.createElement("tr");
    for (const flightDetail in flight) {
      const tableCell = document.createElement("td");
      const word = Array.from(flight[flightDetail]);

      for (const [index, letter] of word.entries()) {
        const letterEle = document.createElement("div");

        setTimeout(() => {
          letterEle.classList.add("flip");
          letterEle.textContent = letter;
          tableCell.append(letterEle);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }
    tableBody.append(tableRow);
  }
}

populateTable();

function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateRandomNumber(maxNumber) {
  const digits = "0123456789";
  if (maxNumber) {
    const newdigits = digits.slice(0, maxNumber + 1);
    return newdigits.charAt(Math.floor(Math.random() * newdigits.length));
  }
  return digits.charAt(Math.floor(Math.random() * digits.length));
}

function generateTime() {
  let displayHr = hour;
  if (hour < 24) {
    ++hour;
    if (hour < 10) {
      displayHr = "0" + displayHr;
    }
  } else if (hour >= 24) {
    hour = 1;
    displayHr = "0" + hour;
  }

  return displayHr + ":" + generateRandomNumber(5) + generateRandomNumber();
}

function shuffleUp() {
  flights.shift();
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight:
      generateRandomLetter() +
      generateRandomLetter() +
      " " +
      generateRandomNumber() +
      generateRandomNumber(),
    gate:
      generateRandomLetter() +
      " " +
      generateRandomNumber() +
      generateRandomNumber(),
    remarks: remark[Math.floor(Math.random() * remark.length)],
  });

  tableBody.textContent = "";
  populateTable();
}

setInterval(shuffleUp, 2000);
