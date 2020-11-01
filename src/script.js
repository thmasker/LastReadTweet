var twitterURL = "https://twitter.com/home";
var twitterURL2 = "https://twitter.com/";

$(window).on('load', function() {

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
      });
    } else {
      scrollToTweet(lastTweet);
    }
  }

  function goToLastTweet() {
    var tweet = localStorage['lastTweet'];

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

    localStorage.setItem('lastTweet', lastTweet);
    console.log('Last tweet saved: ' + lastTweet);
  }

  function checkURL() {
    if (location.href.toLowerCase() === twitterURL) {
      try {
        getLastTweet();
      } catch (error) {
        if (error instanceof TypeError) {
          console.log('Could not save last tweet');
        }
      }
    }

    setTimeout(function() {
      checkURL();
    }, 1000);
  }

  console.log('Last tweet is ' + localStorage['lastTweet']);

  if (location.href.toLowerCase() === twitterURL || location.href.toLowerCase() === twitterURL2) {
    goToLastTweet();
  }
  
  checkURL();
});
