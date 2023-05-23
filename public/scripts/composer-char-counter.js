$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function (event) {
    let textArea = this;
    let charCount = textArea.value.length;
    let counter = $(textArea).siblings("div").find(".counter");
    $(counter).text(140 - charCount);
    if (charCount > 140) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "black");
    }
  }); 
});
