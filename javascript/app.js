$(document).ready(function () {
    console.log("we work")

    //list of buttons to start the page with
    var people = ["Miu Iruma", "Kokochi Oma", "Mouse"];
    console.log(people);

    //When you click the add person button next to the form
    $("#add-person").on("click", function () {
        event.preventDefault();

        //trim the value
        var personInput = $("#person-input").val().trim();//searching for gif

        //push the people to the page using the value and trimming it
        people.push(personInput)
        console.log(people);

        renderbutton();
    })


    function gifSearch() {

        var personChosen = $(this).attr("data-name")
        console.log(personChosen);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + personChosen + "&api_key=LADom26qErILrvxvUKoDrk3kmFT6jhiO";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //grabs web of response - then goes into data (dom elements)
            var results = response.data
            console.log(results);


            //goes through the objects in the dom 
            for (var i = 0; i < results.length; i++)
                //still dont know what those backslashes are :)
                var gifDiv = $("<div class=\"people-item\">");

            //animated and still properties - dom findings
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            //new var to summon and hold the images
            var imageUrl = results[i].images.fixed_height.url;

            //See the img url in the console!
            console.log(imageUrl)

            //Now to create the html tags

            //Empty image tag to dump onto the html
            var gifDiv = $("<img>");
            //Go through the console web to see where the image is located
            gifDiv.attr("src", still);
            //find the still elem in the dom
            gifDiv.attr("data-still", still)
            //find the animated elem in the dom 
            gifDiv.attr("data-animate", animated)
            //not sure why we keep adding still
            gifDiv.attr("data-state", "still");
            //giving it a class
            gifDiv.addClass("person-image");
            //If the image doesnt show up
            gifDiv.attr("alt", "gif img");
            //Append the rating to the picture
            gifDiv.append(p);

            $(this).text();
            //calls on the gifs appear id in the html and attaches gifDiv to it
            $("#gif-appear").append(gifDiv);



        });
    }

        function renderbutton() {
            $("#people-buttons").empty();

            for (var i = 0; i < people.length; i++) {

                var a = $("<button>");
                a.addClass("gifsbtn");
                a.attr("data-name", people[i]);
                a.text(people[i]);
                $("#people-buttons").append(a)

            }
        }
        $(document).on("click", ".gifsbtn", gifSearch)
        renderbutton();

    });

  

