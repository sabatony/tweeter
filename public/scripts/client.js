/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function (tweet) {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let safeHTML = `
  <section class="tweet">
        <article>
          <header class="userInfo">
            <div id="avatar">
            <img src=${escape(tweet.user.avatars)}>
            <h3>${escape(tweet.user.name)}</h3>
            </div>
            <h4 id="username">${escape(tweet.user.handle)}</h4>
          </header>
          <main>
            <p>
              ${escape(tweet.content.text)}
            </p>
          </main>
          <footer id="tweet-foot">
            <div class="foot-content">
            <p>${timeago.format(tweet.created_at)}</p>
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
      return safeHTML
};





$(document).ready(function(){

   const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/tweets',
  })
  .then(function(tweet) {
    renderTweets(tweet)
  })
 }
 

  loadTweets();

  const renderTweets = function (tweets) {
    for(const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    }
  };
  
$('form').submit(function(event) {
  event.preventDefault();
  const tweetData = event.target[0].value
  
  if(tweetData.length > 140) {
     $('#long-tweet').slideDown(1000, function() {
      setTimeout(() => {
        $('#long-tweet').hide();
      },2000)
    });
    return
  }

  if(tweetData === '') {
    $('#empty-tweet').slideDown(1000, function() {
      setTimeout(() => {
        $('#empty-tweet').hide();
      },2000)
    });
    return
  }
  console.log('data being sent')
  
  $.ajax({
    method: 'POST',
    url: 'http://localhost:8080/tweets',
    data: $(this).serialize()

  }).then(() => {
    $('#tweets-container').empty();
    loadTweets();
  })
 })
});


