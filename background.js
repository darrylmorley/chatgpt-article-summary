chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["lib/Readability.js", "contentScript.js"],
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openChatGPT") {
    const articleData = message.article;
    console.log("Received article data in listener: ", articleData);

    chrome.tabs.create({ url: "https://chat.openai.com/" }, (newTab) => {
      chrome.tabs.onUpdated.addListener(function onTabUpdated(tabId, info) {
        if (tabId === newTab.id && info.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            function: injectArticleIntoChat,
            args: [articleData],
          });
          chrome.tabs.onUpdated.removeListener(onTabUpdated);
        }
      });
    });
  }
});

// Updated injectArticleIntoChat to accept the article data
async function injectArticleIntoChat(articleData) {
  console.log("Injecting article into ChatGPT: ", articleData);

  const waitInput = function () {
    const textareaSelector = document.querySelector(
      "main form textarea, #prompt-textarea"
    );

    if (textareaSelector) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      let attempt = 20;
      let timer = setInterval(() => {
        if (attempt-- <= 0) {
          clearInterval(timer);
          resolve();
        }
        const textarea = document.querySelector(
          "main form textarea, #prompt-textarea"
        );
        if (textarea) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  };

  const sendArticle = function (data) {
    console.log("Article in sendArticle: ", data);
    const prompt = `Summarize the following article into 10 key points, please start your summary with the title ${data.title}:\n\n${data.content}`;

    const form = document.querySelector("main form");

    if (form) {
      let textarea = form.querySelector("textarea");

      if (textarea && textarea.offsetParent !== null) {
        textarea.value = prompt;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }

      // Look for the send button
      const sendButton = form.querySelector('[data-testid="send-button"]');

      // Ensure the button is enabled and click it
      if (sendButton) {
        sendButton.removeAttribute("disabled");
        sendButton.click();
      }
    }
  };

  await waitInput();
  sendArticle(articleData);
}
