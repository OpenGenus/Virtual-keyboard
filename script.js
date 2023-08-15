let textContainer = document.querySelector(".textContainer");
let deleteKey = document.querySelector(".delete");
let enterKey = document.querySelector(".enter");
let spaceKey = document.querySelector(".space");
let capsLock = document.querySelector(".capslock");
let allKey = document.querySelectorAll(".key");
let isCaps = false;

let isTypingWithKeyboard = false; // Flag to differentiate keyboard input

// Function to update the displayed content
function updateContent() {
  let content = textContainer.innerText.replace("|", "");
  textContainer.innerText = content;
}

// Function to handle typing
function handleTyping(text) {
  let content = textContainer.innerText;
  let cursorIndex = content.indexOf("|");

  if (cursorIndex === -1) {
    content += text;
  } else {
    content = content.slice(0, cursorIndex) + text + content.slice(cursorIndex);
    cursorIndex += text.length;
  }

  textContainer.innerText = content;
  updateCursor(cursorIndex + text.length); // Move cursor beside the last letter typed
}

// Function to update the cursor position
function updateCursor(cursorIndex) {
  let content = textContainer.innerText;
  content = content.replace("|", "");

  if (cursorIndex >= 0 && cursorIndex <= content.length) {
    textContainer.innerHTML =
      content.slice(0, cursorIndex) +
      "<span class='cursor'>|</span>" +
      content.slice(cursorIndex);
  }
}

// Add event listener for physical keyboard typing
document.addEventListener("keydown", function (event) {
  let key = event.key;

  // Set the flag for keyboard input
  isTypingWithKeyboard = true;

  if (key === "Backspace") {
    let cursorIndex = textContainer.innerText.indexOf("|");
    if (cursorIndex > 0) {
      handleTyping(""); // Delete at cursor position
    }
  } else if (key === "Enter") {
    handleTyping("\n");
  } else if (key === " ") {
    handleTyping(" ");
  } else if (key === "CapsLock") {
    capsLock.click();
  } else if (key.length === 1) {
    handleTyping(isCaps ? key.toUpperCase() : key.toLowerCase());
  }
});

// Add event listeners for on-screen keyboard clicks (similar to your existing code)
for (let key of allKey) {
  key.addEventListener("click", function () {
    if (
      key.classList.contains("delete") ||
      key.classList.contains("enter") ||
      key.classList.contains("space") ||
      key.classList.contains("capslock")
    ) {
      return;
    }

    // Handle typing only if not typing with the keyboard
    if (!isTypingWithKeyboard) {
      handleTyping(key.innerText);
    }

    // Reset the flag after handling the click
    isTypingWithKeyboard = false;
  });
}

// Initialize cursor on load
updateCursor(0);

deleteKey.addEventListener("click", function () {
  let textContainerContent = textContainer.innerText;
  if (textContainerContent.length == 0) {
    return;
  }
  console.log(textContainerContent);
  let newContent = textContainerContent.slice(
    0,
    textContainerContent.length - 1
  );
  textContainer.innerText = newContent;
  updateCursor(newContent.length); // Move cursor beside the last letter typed
});

enterKey.addEventListener("click", function () {
  let content = textContainer.innerText;
  let newContent = content + "\n";
  textContainer.innerText = newContent;
  updateCursor(newContent.length); // Move cursor beside the last letter typed
});

spaceKey.addEventListener("click", function () {
  let content = textContainer.innerText;
  let newContent = content + "\u00A0";
  textContainer.innerText = newContent;
  updateCursor(newContent.length); // Move cursor beside the last letter typed
});

capsLock.addEventListener("click", function () {
  if (isCaps) {
    capsLock.classList.remove("active");
    for (let key of allKey) {
      if (
        key.classList.contains("delete") ||
        key.classList.contains("enter") ||
        key.classList.contains("space") ||
        key.classList.contains("capslock")
      ) {
        //
      } else key.innerText = key.innerText.toLowerCase();
    }
  } else {
    capsLock.classList.add("active");
    for (let key of allKey) {
      if (
        key.classList.contains("delete") ||
        key.classList.contains("enter") ||
        key.classList.contains("space") ||
        key.classList.contains("capslock")
      ) {
        //
      } else key.innerText = key.innerText.toUpperCase();
    }
  }
  isCaps = !isCaps;
});
