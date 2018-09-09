$(document).ready(); {
    console.log("we work")

    $("button").on("click", function() {
        console.log("clicked")



        var person = $(this).attr("data-person");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=LADom26qErILrvxvUKoDrk3kmFT6jhiO";

        //Ajax time

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height.url);
                
                gifDiv.append(personImage);
                $("#gifs-appear").prepend(gifDiv);

            }

        });


    });

};