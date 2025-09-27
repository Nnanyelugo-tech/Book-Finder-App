export let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

export function toggleFavourite(id, title, author, date, image) {
  const existing = favourites.find((b) => b.id === id);

  if (existing) {
    // Remove if already exists
    favourites = favourites.filter((b) => b.id !== id);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    const btn = document.getElementById(`fav-${id}`);
    if (btn) {
      btn.textContent = "⭐ Add to favourite";
      btn.disabled = false;
    }
  } else {
    // Add if not in favourites
    const book = { id, title, author, date, image };
    favourites.push(book);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    const btn = document.getElementById(`fav-${id}`);
    if (btn) {
      btn.textContent = "Remove";
      btn.disabled = false;
    }
  }
}
