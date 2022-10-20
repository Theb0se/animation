window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = {
    userId: user.id,
  };
  const arr = [];

  axios
    .post("https://smmboostclub.herokuapp.com/order/getOrder", data)
    .then(function (response) {
      const key = response.data;
      const order = key.order;
      const orders = key.orders;

      for (let index = 0; index < key.order.length; index++) {
        const ordermain = orders[index];
        const data = { ...order[index], ordermain };
        arr.push(data);
      }

      let FilterArr = arr;

      console.log(arr);
      const strOrders = JSON.stringify(arr);
      localStorage.setItem("orders", strOrders);
      $("#loading").hide();

      FilterArr.forEach((orders) => {
        console.log(orders.charge);
        const d = new Date(orders.ordermain.updatedAt);
        const charge = Math.floor(orders.ordermain.quantity * 0.12);
        var data =
          "<tr id=rowW> <td id=id>" +
          orders.ordermain.orderNumber +
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

  console.log(arr);

  $("#all").click(function () {
    const FilterArr = arr;
    console.log(FilterArr);
    const myNode = document.getElementById("tbody");
    myNode.innerHTML = "";
    FilterArr.forEach((orders) => {
      console.log(orders.charge);
      const d = new Date(orders.ordermain.updatedAt);
      const charge = Math.floor(orders.ordermain.quantity * 0.12);
      var data =
        "<tr id=rowW> <td id=id>" +
        orders.ordermain.orderNumber +
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
  });

  $("#compleat, #pending , #progress , #partial , #precess, #canceld").click(
    function () {
      console.log(this.value);
      const FilterArr = arr.filter((a) => a.status == this.value);
      console.log(FilterArr);
      const myNode = document.getElementById("tbody");
      myNode.innerHTML = "";
      FilterArr.forEach((orders) => {
        console.log(orders.charge);
        const d = new Date(orders.ordermain.updatedAt);
        const charge = Math.floor(orders.ordermain.quantity * 0.12);
        var data =
          "<tr id=rowW> <td id=id>" +
          orders.ordermain.orderNumber +
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
    }
  );
};
