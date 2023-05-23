/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const createTweetElement = function(tweetData){
  let $tweet = $(`  <article>
  <header>    
    <span>      
    <i class="fa-solid fa-user"></i>
    <span>${tweetData['user']['name'] }</span>   
    </span>  
  <span id="username">${tweetData['user']['handle']}</span>     
  </header>
  <p>${tweetData['content']['text']}</p>
  <hr/> 
  <footer >
    <div>${tweetData['created_at']}</div>
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
    tweets.forEach(element => {
      $('#tweet-container').append(createTweetElement(element));
    }); 
  } 
};



  const $button = $('#tweet-button');
  $button.on('click', function () {
    let queryStr;
    let form = $('#tweet-form');
    form.submit((event)=>{
      event.preventDefault(); // prevent default behavior      
      var url = form.attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function(data) {
              
          renderTweets(data);
            // Ajax call completed successfully
            alert("Form Submited Successfully");
        },
        error: function(data) {
              
            // Some error in ajax call
            alert("some Error");
        }
    });
    });   
  });

});
