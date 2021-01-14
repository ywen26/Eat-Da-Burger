// Connect the database functions to buttons
$(function() {
    // Make devoured function to buttons of menu list
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("devoured");
  
        var newDevouredState = {
            devoured: newDevoured
        };
    
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
                console.log("changed devoured to", newDevoured);
                location.reload();
            }
        );
    });
  
    // Make function to submit button to add new burgers
    $(".submit-form").on("submit", function(event) {
        event.preventDefault();
  
        var newBurger = {
            burger_name: $("#bg").val().trim(),
        };
    
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                location.reload();
            }
        );
    });
  
    // Make remove function to the buttons of devoured list
    $(".clear-devoured").on("click", function(event) {
        var id = $(this).data("id");
  
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted burger", id);
                location.reload();
            }
        );
    });
});