# ChatGPT Article Summariser

This Chrome extension extracts the main content from any article or blog post on a webpage and automatically sends it to ChatGPT for summarisation into 10 key points. It uses the Readability.js library to clean up the article content by removing ads, sidebars, and other non-essential elements, ensuring that only the main body is extracted and summarized.

## Features

- Extracts the main content of an article or blog post using Readability.js.
- Summarises the extracted content into 10 key points using ChatGPT.
- Works on any site with textual content, such as blogs, news articles, and more.
- Handles edge cases such as multimedia pages or homepages with little to no content.

## Installation

- Clone or download this repository.
- Open Chrome and go to chrome://extensions/.
- Enable Developer mode in the top-right corner.
- Click on Load unpacked and select the folder where the extension is located.
- The extension icon should now appear in the Chrome toolbar.

## Usage

- Navigate to any article or blog post page.
- Click the extension icon in the Chrome toolbar.
- The extension will automatically extract the article content and open ChatGPT in a new tab.
- The extracted article will be placed in the ChatGPT prompt, and the form will automatically submit to generate a summary
