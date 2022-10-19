window.onload = function () {
  const services = {
    key: "8eac711290c821166246944b29bf1f62",
    action: "services",
  };

  axios
    .post("https://smmboostclub.herokuapp.com/", services)
    .then(function (response) {
      const data = response.data;
      const services = data.filter((d) => {
        return d.service.match("1983");
      });
      const servicesData = JSON.stringify(services);
      localStorage.setItem("services", servicesData);
    })
    .catch(function (error) {
      console.log(error);
    });

  $("#CategorySelect").change(function () {
    const select = document.getElementById("serviceSelect");
    var opt = document.createElement("option");
    opt.value = "1983";
    opt.innerText =
      "1 - Telegram Members { Non Drop } ( 10 / Day ) ( Max - 20K ) | Instant Start | Best Working - ₹ 120 Per 1000";
    select.appendChild(opt);
    $("#descText").removeClass("d-none");
  });

  $("#qntInput").on("input", function () {
    $("#chrgInput").val("₹ " + $("#qntInput").val() * 0.12);
  });

  $("#PlaceOrder1").click(function () {
    $("#orderCat").val("Telegram - ( Non Drop ) Members");
    $("#orderService").val(
      "1 - Telegram Members { Non Drop } ( 10 / Day ) ( Max - 20K ) | Instant Start | Best Working - ₹ 120 Per 1000"
    );
    $("#orderLink").val($("#linkInput").val());
    $("#orderRate").val($("#qntInput").val());
    $("#orderCharge").val($("#chrgInput").val());
  });

  // post new order
  const availServices = JSON.parse(localStorage.getItem("services"))[0];

  $("#PlaceOrder2").click(function () {
    $("#loginMsgContainer").hide();
    $("#spinner").removeClass("d-none");
    const link = $("#linkInput").val();
    const quantity = $("#qntInput").val();

    const newOrder = {
      key: "8eac711290c821166246944b29bf1f62",
      action: "add",
      service: availServices.service,
      link: link,
      quantity: quantity,
    };

    axios
      .post("https://smmboostclub.herokuapp.com/neworder", newOrder)
      .then(function (response) {
        console.log(response.data);
        const msg = response.data;
        $("#signMsg").text(msg.error ? msg.error : msg.order);
        $("#signMsg").css("background-color", "rgba(252, 64, 64, 0.568)");
        $("#loginMsgContainer").show();
        $("#spinner").addClass("d-none");
      })
      .catch(function (error) {
        console.log(error);
        const errnsg = JSON.stringify(error);
        $("#signMsg").text(errnsg);
        $("#signMsg").css("background-color", "rgba(252, 64, 64, 0.568)");
        $("#spinner").addClass("d-none");
        $("#loginMsgContainer").show();
      });
  });
};
