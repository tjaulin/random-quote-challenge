const randomBtn = document.querySelector("#random-btn");
const shareBtn = document.querySelector("#share-btn");


randomBtn.addEventListener('click', getRandomQuote);
shareBtn.addEventListener('click', function() {
    const quote = document.querySelector("#quote").textContent;
    const author = document.querySelector("#author").textContent;
    const textToCopy = `${quote} — ${author}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const confirmation = document.createElement("div");
            confirmation.textContent = "✅ Quote copied!";
            confirmation.classList.add("confirmation-message");
            document.body.appendChild(confirmation);
            setTimeout(() => {
                confirmation.remove();
            }, 1500);
        })
        .catch((err) => {
            console.error("Erreur lors de la copie :", err);
        });
});

// Initial call to fetch and display a random quote on page load
getRandomQuote();



// Function to apply the quote to the HTML elements
function applyQuote(quote) {
    const quoteElement = document.querySelector("#quote");
    const authorElement = document.querySelector("#author");
    const tagsElement = document.querySelector("#tags");

    quoteElement.textContent = `“${quote.quote}”`;
    authorElement.textContent = quote.author;
    tagsElement.innerHTML = "";
    for (let i = 0; i < quote.tags.length; i++) {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.textContent = quote.tags[i];
        tagsElement.appendChild(tagElement);
    }
    document.createElement('span').textContent = quote.author;
}


// Function to fetch a random quote from the API 
function getRandomQuote() {
  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      
      applyQuote(randomQuote);
    })
    .catch((error) => {
      console.error("Error fetching the quote:", error);
    });
}