import { favourites } from "./favourites.js";

export const results = document.querySelector("#results");
const resultsTitle = document.querySelector("#resultsTitle");
const loading = document.querySelector("#loading");

export function setResultsTitle(text) {
  resultsTitle.textContent = text;
}

export function showLoading() {
  loading.style.display = "block";
}

export function hideLoading() {
  loading.style.display = "none";
}

export function displayBooks(books) {
  results.innerHTML = books
    .map((book) => {
      const info = book.volumeInfo || {};
      const title = info.title || "No Title";
      const authors = info.authors ? info.authors.join(", ") : "unknown author";
      const date = info.publishedDate || "N/A";
      const image =
        (info.imageLinks && info.imageLinks.thumbnail) ||
        "https://via.placeholder.com/110x160?text=No+Cover";

      const alreadyFav = favourites.some((b) => b.id === book.id);

      return `
        <article class="book-card">
          <img src="${image}" alt="Book cover">
          <h3>${title}</h3>
          <p>${authors}</p>
          <p>${date}</p>

          <div class="actions">
            <button onclick="window.previewBook('${book.id}')">Preview</button>
            <button 
              id="fav-${book.id}" 
              onclick="window.toggleFavourite(
                '${book.id}',
                '${title.replace(/'/g, "\\'")}',
                '${authors.replace(/'/g, "\\'")}',
                '${date}',
                '${image}'
              )"
            >
              ${alreadyFav ? "Remove" : "⭐ Add to favourite"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}
