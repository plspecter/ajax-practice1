$(document).ready(function () {

var people = ["Dog", "Cat", "Mouse"];//gifs i might need

$("#add-person").on("click", function(){

event.preventDefault();

var personInput = $("#person-input").val().trim();//searching for new gif

people.push(personInput);
console.log(people);

renderbutton()



});


function gifSearch(){
    var person = $(this).attr("data-name")
    console.log(person);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=LADom26qErILrvxvUKoDrk3kmFT6jhiO";
    
    console.log(queryURL);

    //Ajax time

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //Looks in the dom for these elements - goes to response and finds web for data
        var results = response.data;
        console.log(response);
        console.log(results);

        //Going through the various objects in the node
        for (var i = 0; i < results.length; i++) {
            //What are those backslashes in yellow?
            var gifDiv = $("<div class=\"people-item\">");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating" + rating);

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var imageUrl = results[i].images.fixed_height.url;
            //See the img url in the console!
            console.log(imageUrl)

            //Empty image tag
            var gifDiv = $("<img>");
            //Go through the console web to see where the image is located
            gifDiv.attr("src", still);
            //find the still elem in the dom
            gifDiv.attr("data-still", still)
            //find the animated elem in the dom 
            gifDiv.attr("data-animate", animated)
            //not sure why we keep adding still
            gifDiv.attr("data-state", "still");
            gifDiv.addClass("person-image");
            //If the image doesnt show up
            gifDiv.attr("alt", "gif img");
            //Append the rating to the picture
            gifDiv.append(p);

            $(this).text();
            //calls on the gifs appear id in the html and attaches gifDiv to it
            $("#gif-appear").append(gifDiv);
        }
    })
}

 function renderbutton(){
    $("#people-buttons").empty();

    for (var i = 0; i < people.length; i++) {

        var a = $("<button>");
        a.addClass("gifsbtn");
        a.attr("data-name", people[i]);
        a.text(people[i]);
    $("#people-buttons").append(a)

    }
 }
 $(document).on("click",".gifsbtn", gifSearch)
renderbutton();

})