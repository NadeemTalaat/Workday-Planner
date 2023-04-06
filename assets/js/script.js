// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button. //
  var saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    var timeBlockID = $(this).parent().attr("id");

    var timeBlockDescription = $(this).siblings("textarea").val();

    var userInput = {
      hour: timeBlockID,
      description: timeBlockDescription,
    };

    var plannerArray = JSON.parse(localStorage.getItem("Planner")) || [];

    console.log(plannerArray);

    var index = plannerArray.findIndex((obj) => obj.hour === userInput.hour);

    if (index > -1) {
      plannerArray[index] = userInput;
    } else {
      plannerArray.push(userInput);
    }

    localStorage.setItem("Planner", JSON.stringify(plannerArray));
  });

  // Add code to apply the past, present, or future class to each time //

  var currentHour = 13;

  var timeBlocks = $(".time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    let blockHour = $(timeBlocks[i])
      .attr("id")
      .replace(/[^0-9]/g, "");

    if (blockHour < currentHour) {
      $(timeBlocks[i]).addClass("past");
    } else if (blockHour == currentHour) {
      $(timeBlocks[i]).addClass("present");
    } else {
      $(timeBlocks[i]).addClass("future");
    }
  }

  // Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. //

  var plannerArray = JSON.parse(localStorage.getItem("Planner"));

  for (var i = 0; i < timeBlocks.length; i++) {
    let matchingObject = plannerArray.find(
      (obj) => obj.hour === $(timeBlocks[i]).attr("id")
    );

    if (matchingObject) {
      $(timeBlocks[i]).children("textarea").val(matchingObject.description);
    }
  }

  // Add code to display the current date in the header of the page. //

  var today = dayjs().format("dddd, MMMM D, YYYY");

  $("#currentDay").text(today);
});
