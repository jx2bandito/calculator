$(document).ready(function() {
  $(".numberKey").click();
  var input = "";
  var result = "";
  var current = 0;
  var currentResult = "";

  $(".decimal").on("click", function() {
    current = ".";

    for (var i = result.length - 1; i >= 0; i--) {
      if (result[i] == ".") {
        return false;
      }
      if (/[/+/-/*///^/%]/.test(result[i])) {
        break;
      }
    }

    input += current;
    result += current;
    $("#input").html(input);
  });

  $(".numberKey").on("click", function() {
    current = $(this).find(".value").text();
    if (!isNaN(current)) {
      input += current;
      result += current;
    } else if (isNaN(current)) {
      if (current == "CE") {
        result = "";
        input = "";
        $("#result").html("");
        $("#input").html("");
      }
      if (current == "AC") {
        result = result.slice(0, result.length - input.length);
        input = "";
        $("#input").html("");
      }
    }

    $("#input").html(input);

    $(".divide").on("click", function() {
      if (
        !isNaN(input[input.length - 1]) ||
        (input.length == 0 && $("#result").text().length > 0)
      ) {
        current = $(this).find(".value").text();
        result += "/";
        input += current;
        $("#input").html(input);
      }
    });

    $(".multiply").on("click", function() {
      if (
        !isNaN(input[input.length - 1]) ||
        (input.length == 0 && $("#result").text().length > 0)
      ) {
        current = $(this).find(".value").text();
        result += "*";
        input += current;
        $("#input").html(input);
      }
    });

    $(".modulus").on("click", function() {
      if (
        !isNaN(input[input.length - 1]) ||
        (input.length == 0 && $("#result").text().length > 0)
      ) {
        current = $(this).find(".value").text();
        result += "%";
        input += current;
        $("#input").html(input);
      }
    });

    $(".sum").on("click", function() {
      if (!isNaN(input[input.length - 1]) || input.length == 0) {
        current = $(this).find(".value").text();
        result += "+";
        input += current;
        $("#input").html(input);
      }
    });

    $(".minus").on("click", function() {
      if (!isNaN(input[input.length - 1]) || input.length == 0) {
        current = $(this).find(".value").text();
        result += "-";
        input += current;
        $("#input").html(input);
      }
    });

    $(".pow").on("click", function() {
      if (
        !isNaN(input[input.length - 1]) ||
        (input.length == 0 && $("#result").text().length > 0)
      ) {
        current = $(this).find(".value").text();
        result += "^";
        input += current;
        $("#input").html(input);
      }
    });
  });

  $(".equal").on("click", function() {
    result = splitToEquations(result);
    if (!isNaN(input[0])) {
      currentResult = $("#result").text();
      if (currentResult) {
        result = result.slice(currentResult.length);
      }
    }

    result = math.eval(result);

    $("#result").html(result);
    input = "";
    $("#input").html(input);
  });
});

function getExponent(str) {
  str = str.split("^");
  while (str.length > 1) {
    str[0] = Math.pow(parseInt(str[0], 10), parseInt(str[1], 10));
    str.splice(1, 1);
  }
  return str[0];
}

function splitToEquations(str) {
  var arr = [];
  var endpoint = -1;
  for (var a = 0; a < str.length; a++) {
    if (
      str[a] == "+" ||
      str[a] == "/" ||
      str[a] == "*" ||
      str[a] == "%" ||
      str[a] == "-"
    ) {
      arr.push(str.slice(endpoint + 1, a));
      arr.push(str[a]);
      endpoint = a;
    }
  }
  arr.push(str.slice(endpoint + 1));
  for (var b in arr) {
    if (arr[b].indexOf("^") !== -1) {
      arr[b] = getExponent(arr[b]);
      while (arr[b][0] === 0) {
        arr[b].shift();
      }
    }
  }
  return arr.join("");
}
