window.onload = function () {
  $("#CategorySelect").change(function () {
    var value = $(this).val();
    if (value == "paytm") {
      $("#paytm").removeClass("d-none");
      $("#phonepe").addClass("d-none");
      $("#gpay").addClass("d-none");
    }
    if (value == "phonepe") {
      $("#paytm").addClass("d-none");
      $("#phonepe").removeClass("d-none");
      $("#gpay").addClass("d-none");
    }
    if (value == "gpay") {
      $("#paytm").addClass("d-none");
      $("#phonepe").addClass("d-none");
      $("#gpay").removeClass("d-none");
    }
  });

  $("#paytmBtn").click(function () {
    alert("Under Development");
  });
  $("#phonePayBtn").click(function () {
    alert("Under Development");
  });
  $("#gpayBtn").click(function () {
    alert("Under Development");
  });
};
