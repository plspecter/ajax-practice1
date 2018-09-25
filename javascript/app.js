$(document).ready(function () {
    console.log("we work")

    //list of buttons to start the page with
    var people = ["Kokichi Oma", "Miu", "Nagito"];
    console.log(people);

    //function to add a button to the page
    function addButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {

            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);

        }

    }

    $(document).on("click", "people-buttons", function () {
        console.log("clicked");

        $("people-buttons").empty();
        $("gif-appear").removeClass("active");
        $(this).addClass("active");

        event.preventDefault();

        console.log(person);
        var person = $(this).attr("data-person");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=LADom26qErILrvxvUKoDrk3kmFT6jhiO";

        //Ajax time

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //Looks in the dom for these elements - goes to response and finds web for data
            var results = response.data;
            console.log(response);

            //Going through the various objects in the node
            for (var i = 0; i < results.length; i++) {
                //What are those backslashes in yellow?
                var gifDiv = $("<div class=\"people-item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating" + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url

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
                //calls on the gifs appear id in the html and attaches gifDiv to it
                $("#gif-appear").append(gifDiv);

            }

        });

    });

    $(document).on("click", "add-person", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })


    $("#add-person").on("click", function (event) {
        event.preventDefault();
        var newPerson = $("input").eq(0).val();

        if (newPerson.length > 2) {
            person.push(newPerson);
        }

     addButtons(people, "add-person", "people-buttons");


    });

    addButtons(people, "add-person", "people-buttons");
});

