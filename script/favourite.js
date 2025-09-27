const favList = document.querySelector("#favList");

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

function showFavourites() {
  if (!favourites || favourites.length === 0) {
    favList.innerHTML = "<p>No favourites yet! Go back and add some 📚</p>";
    return;
  }

  favList.innerHTML = favourites
    .map((book) => {
      const image =
        book.image || "https://via.placeholder.com/110x160?text=No+Cover";
      const author = Array.isArray(book.author)
        ? book.author.join(", ")
        : book.author || "Unknown Author";
      const date = book.date || "N/A";

      return `
        <article class="book-card">
          <img src="${image}" alt="Book cover">
          <h3>${book.title}</h3>
          <p>${author}</p>
          <p>${date}</p>

          <div class="actions">
            <button onclick="previewBook('${book.id}')">Preview</button>
            <button onclick="removeFavourite('${book.id}')">Remove</button>
          </div>
        </article>
      `;
    })
    .join("");
}

// Preview book
function previewBook(id) {
  window.open(`https://books.google.com/books?id=${id}`, "_blank");
}

// Remove a book from favourites
function removeFavourite(id) {
  favourites = favourites.filter((book) => book.id !== id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  showFavourites();
}

// Load favourites on page open
window.addEventListener("load", showFavourites);


