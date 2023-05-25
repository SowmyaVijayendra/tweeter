//const { text } = require("express");


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

const createTweetElement = function(tweetData){
  let createddate =timeago.format(tweetData['created_at']);
  let $tweet = $(`  <article>
  <header>    
    <span>      
    <i class="fa-solid fa-user"></i>
    <span>${tweetData['user']['name'] }</span>   
    </span>  
  <span id="username">${tweetData['user']['handle']}</span>     
  </header>
  <p>${escape(tweetData['content']['text'])}</p>
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
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  if(Array.isArray(tweets)){
    tweets.reverse();
    $('.tweet-container').empty();
    tweets.forEach(element => {
     const $tweet = createTweetElement(element);        
      $('.tweet-container').append($tweet);
    }); 
  } 
};



   let form = $('#tweet-form');
    form.submit((event)=>{
      event.preventDefault(); // prevent default behavior    
    let textArea = $("#tweet-text");      
    if(!textArea.val() || textArea.val().length === 0){
      alert("Tweet data is empty");
      return;
    }else if(textArea.val().length > 140){
      alert("Tweet is too long!");
      return ;
    }  
      var url = form.attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function(data) { 
            // Ajax call completed successfully
            alert("Form Submited Successfully");
            loadtweets();
            textArea.val('');
        },
        error: function(data) {              
            // Some error in ajax call
            alert("some Error");
        }
    });
    });   
  
 const loadtweets = function(){
  $.ajax('/tweets', { method: 'GET' })
  .then(function (moreTweets) {
    console.log('Success: ', moreTweets);
    renderTweets(moreTweets);
  });
 };

 loadtweets();
});
