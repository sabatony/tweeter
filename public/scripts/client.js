/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const createTweetElement = function (tweet) {
  let $tweet = `
  <section class="tweet">
        <article>
          <header class="userInfo">
            <div id="avatar">
            <img src=${tweet.user.avatars}>
            <h3>${tweet.user.name}</h3>
            </div>
            <h4 id="username">${tweet.user.handle}</h4>
          </header>
          <main>
            <p>
              ${tweet.content.text}
            </p>
          </main>
          <footer id="tweet-foot">
            <div class="foot-content">
            <p>${tweet.created_at}</p>
            <div id="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-repeat"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
            </div>

          </footer>

        </article>
      </section>`
      ;
      return $tweet
};

const renderTweets = function (tweets) {
  for(const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);
  }
};



$(document).ready(function(){
  renderTweets(data)
  
$('form').submit(function(event) {
  event.preventDefault();
  console.log('data being sent')
  
  $.ajax({
    method: 'POST',
    url: 'http://localhost:8080/tweets',
    data: $(this).serialize()

  })
 })
});


