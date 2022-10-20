window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = {
    userId: user.id,
  };

  axios
    .post("https://smmboostclub.herokuapp.com/order/getOrder", data)
    .then(function (response) {
      const key = response.data;
      const order = key.order;
      const orders = key.orders;

      const arr = [];

      for (let index = 0; index < key.order.length; index++) {
        const ordermain = orders[index];
        const data = { ...order[index], ordermain };
        arr.push(data);
      }

      console.log(arr);
      const strOrders = JSON.stringify(arr);
      localStorage.setItem("orders", strOrders);
      $("#loading").hide();
      arr.forEach((orders) => {
        console.log(orders.charge);
        const d = new Date(orders.ordermain.updatedAt);
        const charge = Math.floor(orders.ordermain.quantity * 0.12);
        var data =
          "<tr> <td id=id>" +
          charge +
          "</td> <td id=date>" +
          d +
          "</td> <td id=link>" +
          orders.ordermain.link +
          "</td> <td id=charge>" +
          charge +
          " ₹" +
          "</td> <td id=count>" +
          orders.start_count +
          "</td> <td id=quantity>" +
          orders.ordermain.quantity +
          "</td> <td id=service>" +
          orders.ordermain.service +
          "</td> <td id=status>" +
          orders.status +
          "</td><td id=remain>" +
          orders.remains +
          "</td> </tr>";

        $("#tbody").append(data);
      });
    })
    .catch(function (error) {
      const errmsg = JSON.stringify(error);
      console.log(error);
    });
};
