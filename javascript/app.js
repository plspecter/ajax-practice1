$(document).ready(function () {
    console.log("we work")

    $("#button").on("click", function (event) {
        console.log("clicked")

        event.preventDefault();



        var person = $(this).attr("data-person");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=LADom26qErILrvxvUKoDrk3kmFT6jhiO";

        //Ajax time

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            //Going through the various objects in the node
            for (var i = 0; i < results.length; i++) {
                //Create a var that holds the results of the image
                var imageUrl = results[i].images.fixed_height.url;
                //See the img url in the console!
                console.log(imageUrl)

                //Empty image tag
                var gifDiv = $("<img>");
                //Go through the console web to see where the image is located
                gifDiv.attr("src", imageUrl);
                //If the image doesnt show up
                gifDiv.attr("alt", "gif img");
                //calls on the gifs appear id in the html and attaches gifDiv to it
                $("#gif-appear").append(gifDiv);

            }

        });


    });

});