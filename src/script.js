var twitterURL = "https://twitter.com/home";
var twitterURL2 = "https://twitter.com/";
var MAX_HOURS = 24;

var tweetValues = new Array();
var maxDate = new Date();

function findTweet(tweet) {
  var aes = document.getElementsByTagName('a');

  for (let a of aes) {
    if (a.href == tweet) {
      console.log('Last tweet found');
      return a;
    }
  }

  console.log('Last tweet not found');
  return null;
}

function scrollToTweet(tweet) {
  tweet.scrollIntoView(true);

  var y = $(window).scrollTop();
  $(window).scrollTop(y - 75);
}

function search_tweet(tweet) {
  var lastTweet = findTweet(tweet);

  if (lastTweet == null) {
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(function() {
        search_tweet(tweet);
    }, 500);
  } else {
    scrollToTweet(lastTweet);
  }
}

function goToLastTweet(tweet) {
  if (tweet != null) {
    var lastTweet = findTweet(tweet);
    
    if (lastTweet == null) {
      search_tweet(tweet);
    } else {
      scrollToTweet(lastTweet);
    }
  }
}

function getLastTweet() {
  var section = document.getElementsByTagName('section')[0];
  var article = section.getElementsByTagName('article')[0];
  var tweet = article.querySelector('[data-testid="tweet"]');
  var link = tweet.getElementsByTagName('a')[2];
  var lastTweet = link.href;

  maxDate.setHours(maxDate.getHours() + MAX_HOURS);
  tweetValues.push(lastTweet);
  tweetValues.push(maxDate);

  localStorage.setItem('lastTweet', tweetValues.join(';'));
  console.log('Last tweet saved: ' + lastTweet);
}

function inLocation() {
  if (location.href.toLowerCase() === twitterURL || location.href.toLowerCase() === twitterURL2) {
    return true;
  } else {
    return false;
  }
}

function checkURL() {
  if (inLocation()) {
    getLastTweet();
  }
}

function validateLastTweet() {
  var savedTweet = localStorage['lastTweet'].split(';');
  if (savedTweet[1] < new Date()) {
    localStorage.removeItem('lastTweet');
    return null;
  }
  
  return savedTweet[0];
}

$(window).on('load', function() {
  if (inLocation()) {
    var lastTweet = validateLastTweet();
    goToLastTweet(lastTweet);
  }

  window.onbeforeunload = function() {
    checkURL();
    return null;
  };
});
