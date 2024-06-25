const loadBtn = document.querySelector(".load-btn");
const transSec = document.querySelector(".translist-sec");
const transTable = document.querySelector(".tbody");
const chevPrice = document.querySelector(".chev-price");
const chevDate = document.querySelector(".chev-date");
let transtypes;
let sortedItems;
const searchInput = document.querySelector(".search");

let allTransactions = [];
let searchResult = [];
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransactions = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
loadBtn.addEventListener("click", () => {
  loadBtn.classList.add("hidden");
  transSec.classList.add("show");
  addToDOM(allTransactions);
});
searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  axios
    .get(`http://localhost:3000/transactions?refId_like=${query}`)
    .then((res) => {
      searchResult = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  addToDOM(searchResult);
});

function transStatus() {
  transtypes = document.querySelectorAll(".trans-type");
  transtypes.forEach((item) => {
    if (item.innerText == "افزایش اعتبار") {
      item.classList.add("succesful");
    } else {
      item.classList.add("failed");
    }
  });
}
function addToDOM(arg) {
  transTable.innerHTML = "";
  arg.forEach((item) => {
    const transRow = document.createElement("tr");
    transRow.innerHTML = `          <td class="trans-id">${item.id}</td>
          <td class="trans-type">${item.type}</td>
          <td class="trans-price">${item.price}</td>
          <td class="trans-num">${item.refId}</td>
          <td class="trans-date">${new Date(
            item.date
          ).toLocaleDateString()}</td>`;
    transTable.appendChild(transRow);
  });
  transStatus();
}

chevPrice.addEventListener("click", () => {
  chevPrice.classList.toggle("up");
  if (chevPrice.classList.contains("up")) {
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=asc")
      .then((res) => {
        sortedItems = res.data;
        addToDOM(sortedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (chevPrice.classList.contains("up") === false) {
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=desc")
      .then((res) => {
        sortedItems = res.data;
        addToDOM(sortedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
chevDate.addEventListener("click", () => {
  chevDate.classList.toggle("up");
  if (chevDate.classList.contains("up")) {
    axios
      .get("http://localhost:3000/transactions?_sort=date&_order=asc")
      .then((res) => {
        sortedItems = res.data;
        addToDOM(sortedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (chevDate.classList.contains("up") === false) {
    axios
      .get("http://localhost:3000/transactions?_sort=date&_order=desc")
      .then((res) => {
        sortedItems = res.data;
        addToDOM(sortedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
