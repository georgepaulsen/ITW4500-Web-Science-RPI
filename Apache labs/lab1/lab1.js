$(document).ready(function(){
   $.getJSON('lab1.json', function(data){
      // set initial 5
      var j;
      var tweet_set=''
      var tweet= '';
      var highest_tweet = '';
      var max_likes = 0;
      var curr_likes = 0;

      // iterate over first 5 tweets and create obejct for each
      // each tweet contains the name, screen name, tweet, and the like count
      for(j = 4; j >= 0; j--){
         tweet += "<div class='card-body twt'>";
         tweet += "<h4 class='card-title name'>" + data[j].user.name + "</h4>";
         tweet += "<h6 class='card-subtitle mb-2 text-muted'>" + data[j].user.screen_name + "</h6>";
         tweet += "<p class='card-text'>" + data[j].text + "</p>";
         tweet += "<svg class='heart' viewBox='0 0 32 29.6'> <path d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'/></svg>";
         // check if retweeted, if so, use like count from original post
         if(data[j].hasOwnProperty('retweeted_status')){
            tweet += "<p class='num_likes'>" + data[j].retweeted_status.favorite_count + "</p>";
            curr_likes = data[j].retweeted_status.favorite_count
         // otherwise pull likes from tweet itself
         }else{
            tweet += "<p class='num_likes'>" + data[j].user.favourites_count + "</p>";
            curr_likes = data[j].user.favourites_count;
         }
         tweet += "</div>";

         // to determine the most liked tweet compair the current likes to the max
         // and set the current max tweet if the value is greater
         if(curr_likes > max_likes){
            max_likes = curr_likes;
            highest_tweet = tweet;
            curr_likes = 0;
         }
         tweet_set += tweet;
         tweet = '';
      }
      // to determine if the new tweet should go at the top of the list as the most
      // liked tweet, or to the end of the list
      last_max = max_likes;
      $(tweet_set).hide().appendTo('.card').slideDown(1000);
      $(highest_tweet).hide().appendTo('.favorites').slideDown(1000);

      var i = 1;
      j = 5;
      var t = setInterval(function(){
         tweet_set= '';
         highest_tweet = '';
         curr_likes = 0;
         tweet += "<div class='card-body twt'>";
         tweet += "<h4 class='card-title name'>" + data[j].user.name + "</h4>";
         tweet += "<h6 class='card-subtitle mb-2 text-muted'>" + data[j].user.screen_name + "</h6>";
         tweet += "<p class='card-text'>" + data[j].text + "</p>";
         tweet += "<svg class='heart' viewBox='0 0 32 29.6'> <path d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'/></svg>";
         if(data[j].hasOwnProperty('retweeted_status')){
            tweet += "<p class='num_likes'>" + data[j].retweeted_status.favorite_count + "</p>";
            curr_likes = data[j].retweeted_status.favorite_count
         }else{
            tweet += "<p class='num_likes'>" + data[j].user.favourites_count + "</p>";
            curr_likes = data[j].user.favourites_count;
         }
         tweet += "</div>";
         if(curr_likes > max_likes){
            max_likes = curr_likes;
            highest_tweet = tweet;
         }

         // bottom transition for the tweet leaving the feed
         $(tweet).hide().prependTo('.card').slideDown(1000);
         $('.card').children().last().fadeOut(1000, function() {
            $('.card').children().last().remove();
         });
         tweet = '';
         j++;

         if(max_likes > last_max){
            $(highest_tweet).hide().prependTo('.favorites').slideDown(1000);
            last_max = max_likes;
         }else{
            $(highest_tweet).hide().appendTo('.favorites').slideDown(1000);
         }

         if (j == 95){j=0;;}
      },4000);

   });
});
