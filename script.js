
document.getElementById('summarizerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const url = document.getElementById('urlInput').value;
    const summaryTextElement = document.getElementById('summaryText');
  
    // Simple URL validation
    try {
        new URL(url); // Validate URL format
    } catch (_) {
        summaryTextElement.textContent = 'Invalid URL format. Please enter a valid URL.';
        return;
    }
  
    // Display a loading message while fetching the summary
    summaryTextElement.textContent = 'Fetching summary...';
  
    try {
      const summary = await fetchSummary(url);
      summaryTextElement.textContent = summary;
    } catch (error) {
      console.error('Error fetching summary:', error);
      summaryTextElement.textContent = `Failed to fetch the summary. Error: ${error.message}`;
    }
});
  
// Function to fetch the summary using Article Extractor and Summarizer API
async function fetchSummary(url) {
    const apiKey = 'cc6f926591msh876fc5f2a12a32fp122f2bjsn8ba3180ea30d'; // Replace with your RapidAPI key
    const apiUrl = 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text'; // Replace with the correct endpoint URL
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com', // Replace with the correct host
        'X-RapidAPI-Key': apiKey
      },
      body: JSON.stringify({
        text: url // Send the URL as part of the request body
      })
    });
  
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
  
    // Parse the response as JSON
    const data = await response.json();
  
    // Return the summary content
    return data.summary; // Adjust based on API response structure
}
