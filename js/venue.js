const searchInput = document.getElementById('venueSearch');
const resultsList = document.getElementById('venueResults');
const GOOGLE_API_KEY = 'YOUR_API_KEY';

searchInput.addEventListener('input', async () => {
  const query = searchInput.value;
  if (query.length < 3) return;

  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    resultsList.innerHTML = data.results?.map(place => `
      <li>
        <strong>${place.name}</strong><br>
        ${place.formatted_address}
      </li>
    `).join('') || '<li>No results found.</li>';
  } catch (error) {
    console.error('Error fetching venues:', error);
  }
});
