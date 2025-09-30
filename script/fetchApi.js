import {
  displayBooks,
  showLoading,
  hideLoading,
  setResultsTitle,
  results,
} from "./display_book.js";

export async function fetchBooks(query = "books") {
  showLoading();
  if (query !== "books") {
    setResultsTitle(`Searching for "${query}"...`);
  } else {
    setResultsTitle("📚 Popular Books");
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=20`
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      setResultsTitle("No results found");
      results.innerHTML = `<p>No books found for "${query}"</p>`;
      return;
    }
    if (query === "books") {
      setResultsTitle("📚 Popular Books");
    } else {
      setResultsTitle(`Showing results for "${query}"`);
    }
    displayBooks(data.items);

  } catch (err) { 
    console.error("Error fetching books:", err); 
    setResultsTitle("⚠️ Error loading books.");
   } finally { hideLoading(); }
}