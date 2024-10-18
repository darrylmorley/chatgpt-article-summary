function extractAndSummarize() {
  const parsed = new Readability(document.cloneNode(true)).parse();
  const title = parsed.title;
  const articleText = parsed.textContent;

  const article = {
    title: title,
    content: articleText,
  };

  // Check if valid article content was found
  if (!articleText || articleText.length < 100) {
    alert("No article content found or the article is too short.");
    return;
  }

  // Send a message to the background script to open ChatGPT
  chrome.runtime.sendMessage({
    action: "openChatGPT",
    article: article,
  });
}

// Execute the summarization when the content script is loaded
extractAndSummarize();
