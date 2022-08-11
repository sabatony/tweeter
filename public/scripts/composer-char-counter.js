$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    let charCount = $(this).val().length
    const maxChars = 140;
    const remaining = maxChars - charCount;
    const counter = $(this).siblings('.tweet-btn').children('.counter');
    counter.text(remaining);
    counter.text(remaining).toggleClass('warning', remaining < 0)
  })
});