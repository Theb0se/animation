window.onload = function () {
  const services = {
    key: "826ff10d7a4c0ab143d64e59628cdaa3",
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
};
