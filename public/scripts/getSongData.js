/*
var main = function() {
  $('.thing').click(function() {
    console.log("sup");
  });
};


$(document).ready(main);*/

/*
$(document).ready(function(){
  $("#submit").click(function(){
    $.get("../test",{},function(data){
      if(data==='done'){
        console.log('success!');
      }
    })
  })
})
*/

var getSongData = function(artist, songTitle, songData, callback){
  //var theUrl = 'http://developer.echonest.com/api/v4/song/search?api_key=1JA9TS10RXGSHGXTZ&title='+songTitle+'&artist='+artist+'&bucket=tracks&bucket=id:7digital-US&bucket=audio_summary';

  var theUrl = 'https://api.spotify.com/v1/search?q='+songTitle+'&type=track';

  var auth_code = 'BQD-Um067460QEiFevOz6r6W5mjG9t-irY-Hfrd3Sku89L3SZxPwBfObh3z6BfWcwbSJPc9wL79VhA6HWhd1GRkU8g-EcSmLvRj2T5EVZxwdBuADc7I-J_jLrwRbi-fYdGkPdIOxTOGBfA';

  //should we sort by hotttnesss?
  //tracks bucket contains album and album image
  //audio summary in the analysis_url has full bars of the song
    //look at the track api method documentation to get a description of how to analyze this
  //use /genre/list to get a list of all available genres
  //use /track/upload POST to upload a song to be analyzed

  var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          console.log(JSON.parse(xmlHttp.responseText))


          //var responseObject = JSON.parse(xmlHttp.responseText).response;
          var responseObject = JSON.parse(xmlHttp.responseText).tracks;

          console.log(responseObject)

          var possibleSongs = responseObject.songs;
          var song = possibleSongs[0];

          songData.artistOutput = song.artist_name;
          songData.songOutput = song.title;
          songData.audio_summary = song.audio_summary;
          //put other data that needs to be returned here or in further calls below

          var theUrl2 = 'http://developer.echonest.com/api/v4/artist/profile?api_key=1JA9TS10RXGSHGXTZ&id='+song.artist_id+'&bucket=genre';

          var xmlHttp2 = new XMLHttpRequest();
          xmlHttp2.onreadystatechange = function() {
            if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200){
              var responseObject2 = JSON.parse(xmlHttp2.responseText).response;
              var genres = responseObject2.artist.genres;
              songData.genres = [];
              var i;
              for(i=0; i<genres.length; i++){
                songData.genres[i] = genres[i].name;
              }
              callback();
            }
          }
          xmlHttp2.open("GET", theUrl2, true);
          xmlHttp2.send(null);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}