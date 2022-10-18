window.onload = function () {
  const services = JSON.parse(localStorage.getItem("services"));
  console.log(services);
  const margin = 120 - Math.floor(services[0].rate);
  const rate = Math.floor(services[0].rate) + margin;
  $("#Id").text(services[0].service);
  $("#Service").text(
    "Telegram Members { Non Drop } ( 10 / Day ) ( Max - 20K ) | Instant Start | Best Working - ₹ 120 Per 1000"
  );
  $("#rate").text(rate);
  $("#min").text(services[0].min);
  $("#max").text(services[0].max);
  $("#time").text("Not enough Data");
  $("#description");
};
