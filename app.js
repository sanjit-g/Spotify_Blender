// Function to fetch search results from Spotify API based on user input
async function fetchSearchResults(query) {
    // Use Spotify API's track search endpoint to get top 5 results
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN' // Replace with actual access token
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
  
    const data = await response.json();
    return data.tracks.items;
  }
  
  // Function to display search results in a dropdown menu
  function displaySearchResults(results) {
    const searchResultsElement = document.getElementById('search-results');
    searchResultsElement.innerHTML = '';
  
    results.forEach((result) => {
      const listItem = document.createElement('li');
      listItem.textContent = result.name;
      listItem.addEventListener('click', () => {
        selectTrack(result);
      });
  
      searchResultsElement.appendChild(listItem);
    });
  }
  
  // Function to handle track selection
  function selectTrack(track) {
    const selectedTrackElement = document.getElementById('selected-track');
    selectedTrackElement.textContent = track.name;
  
    // You can save the selected track details for further processing if needed
  
    // Hide the search results dropdown
    const searchResultsElement = document.getElementById('search-results');
    searchResultsElement.innerHTML = '';
  }
  
  // Function to handle search bar input changes
  function handleSearchInput(event) {
    const query = event.target.value;
  
    if (query.length > 0) {
      // Fetch search results from Spotify API
      fetchSearchResults(query)
        .then((results) => {
          displaySearchResults(results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Clear search results if query is empty
      const searchResultsElement = document.getElementById('search-results');
      searchResultsElement.innerHTML = '';
    }
  }
  
  // Add event listeners
  window.addEventListener('DOMContentLoaded', () => {
    const searchInputElement = document.getElementById('search-input');
    searchInputElement.addEventListener('input', handleSearchInput);
  
    const clearSelectionButton = document.getElementById('clear-selection');
    clearSelectionButton.addEventListener('click', () => {
      const selectedTrackElement = document.getElementById('selected-track');
      selectedTrackElement.textContent = '';
  
      // You can reset any other relevant data or UI elements here
    });
  });
  