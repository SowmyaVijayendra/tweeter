$(document).ready(function () {
  // --- our code goes here ---
  //Event handler when user inputs to the tweet message text area
  $("#tweet-text").on("input", function (event) {
    let textArea = this;
    let charCount = textArea.value.length;// tweet message count
    let counter = $(textArea).siblings("div").find(".counter");// navigate to the element which displays count
    $(counter).text(140 - charCount); // calculate remaining characters
    if (charCount > 140) {
      $(counter).css("color", "red"); //change color to red if char count is more than 140
    } else {
      $(counter).css("color", "black");
    }
  });
});
