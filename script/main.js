import { fetchBooks } from "./fetchApi.js";
import { toggleFavourite } from "./favourites.js";
import { setResultsTitle, results } from "./display_book.js";

// Expose global functions
window.toggleFavourite = toggleFavourite;
window.previewBook = function (id) {
  window.open(`https://books.google.com/books?id=${id}`, "_blank");
};

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// Search button
searchBtn.addEventListener("click", () => {
    let query = searchInput.value.trim();
    query = query.replace(/[^a-zA-Z0-9\s]/g, "");
    if (query) {
        fetchBooks(query);
    } else {
        setResultsTitle(
            "⚠️ Please enter a valid search."
        );
        results.innerHTML = "";
    }
});

// Default load
window.addEventListener("load", () => {
    fetchBooks("books"); 
});

