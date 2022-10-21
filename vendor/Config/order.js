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
      console.log(services);
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

  // post new order
  const availServices = JSON.parse(localStorage.getItem("services"))[0];

  $("#close").click(function () {
    $("#loginMsgContainer").hide();
  });

  $("#PlaceOrder").click(function () {
    $("#loginMsgContainer").hide();
    $("#spinner").removeClass("d-none");
    const link = $("#linkInput").val();
    const quantity = $("#qntInput").val();
    const charge = $("#chrgInput").val();

    const newOrder = {
      key: "8eac711290c821166246944b29bf1f62",
      action: "add",
      service: availServices.service,
      link: link,
      quantity: quantity,
    };

    axios
      .post("http://localhost:3000/neworder", newOrder)
      .then(function (response) {
        const msg = response.data;
        if (msg.order) {
          $("#orderId").text(`ID : ${msg.order}`);
          $("#link").text(`Link : ${link}`);
          $("#quantity").text(`Quantity : ${quantity}`);
          $("#charge").text(`Charge : ${charge}`);
          $("#balence").text(`Balence : 0`);
          $("#signMsg").css("background-color", "rgba(49, 248, 42, 0.651");
          $("#loginMsgContainer").show();
          $("#spinner").addClass("d-none");
        } else {
          alert(msg.error);
          $("#spinner").addClass("d-none");
        }

        // post order
        const user = JSON.parse(localStorage.getItem("user"));

        if (msg.order) {
          const orderData = {
            orderNumber: msg.order,
            userId: user.id,
            service:
              "1 - Telegram Members { Non Drop } ( 10 / Day ) ( Max - 20K ) | Instant Start | Best Working - ₹ 120 Per 1000",
            link: link,
            quantity: quantity,
          };

          axios
            .post(
              "https://smmboostclub.herokuapp.com/order/postOrder",
              orderData
            )
            .then(function (response) {
              const msg = response.data;
              console.log(msg);
            })
            .catch(function (error) {
              const errmsg = JSON.stringify(error);
              console.log(errmsg);
            });
        }
      });

    // get all order
  });
  axios
    .get("https://smmboostclub.herokuapp.com/order/getallorder")
    .then(function (response) {
      console.log(response.data);
      const allOrder = JSON.stringify(response.data);
      localStorage.setItem("allorder", allOrder);
    })
    .catch(function (error) {
      console.log(error);
    })

    .catch(function (error) {
      const errnsg = JSON.stringify(error);
    });

  const allOrder = JSON.parse(localStorage.getItem("allorder"));
  $("#totalOrder").text(allOrder.length);
};
