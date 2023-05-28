//const { text } = require("express");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //function to prevent XSS (Cross-Site scripting) with escaping 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //function to create tweet HTML element for the given data
  const createTweetElement = function (tweetData) {
    let createddate = timeago.format(tweetData["created_at"]);
    let $tweet = $(`  <article>
  <header>    
    <span>      
    <i class="fa-solid fa-user"></i>
    <span>${tweetData["user"]["name"]}</span>   
    </span>  
  <span id="username">${tweetData["user"]["handle"]}</span>     
  </header>
  <p>${escape(tweetData["content"]["text"])}</p>
  <hr/> 
  <footer >
    <div>${createddate}</div>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>          
  </footer>
</article>`);
    return $tweet;
  };
  //function to add newly created tweet element to the container
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    if (Array.isArray(tweets)) {
      tweets.reverse();
      $(".tweet-container").empty();
      tweets.forEach((element) => {
        const $tweet = createTweetElement(element);
        $(".tweet-container").append($tweet);
      });
    }
  };
//Handling submit event of the form with ajax calls to dynamically update the page
  let form = $("#tweet-form");
  form.submit((event) => {
    event.preventDefault(); // prevents default behavior of the event
    $(".error").empty();
    $(".error").hide(); // reset the error element before validation
    let textArea = $("#tweet-text");
    if (!textArea.val() || textArea.val().length === 0) { // if tweet data is empty
      $(".error").append("Tweet data is empty"); //show error message
      $(".error").slideDown(500);
      return;
    } else if (textArea.val().length > 140) { //if tweet message is more than 140 char
      $(".error").append("Tweet is too long!");
      $(".error").slideDown(500);
      return;
    }
    var url = form.attr("action");
    $.ajax({ //ajax call
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function (data) {
        // Ajax call completed successfully

        loadtweets(); // fetch tweets from the server and load on UI
        textArea.val(""); //clear the text area where tweet message is entered
      },
      error: function (data) {
        // Some error in ajax call
        $(".error").append("Some error!");
        $(".error").slideDown(500);
      },
    });
  });

  //function to fetch tweets from server with ajax call and display them on UI
  const loadtweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (moreTweets) {
      console.log("Success: ", moreTweets);
      renderTweets(moreTweets);
    });
  };
  $(".error").hide(); // On loading the page, hide the error display section
  loadtweets(); // on loading the page, load the tweets from server
});
