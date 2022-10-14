window.onload = function () {
  const loginButton = document.getElementById("loginBtn");
  const toastLiveExample = document.getElementById("liveToast");

  const signin = (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    $("#loginMsgContainer").hide();

    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    $("#spinner").removeClass("d-none");

    axios
      .post("https://smmboostclub.herokuapp.com/user/login", data)
      .then(function (response) {
        console.log(response.data);
        const userData = JSON.stringify(response.data);
        localStorage.setItem("user", userData);
        $("#signMsg").text("Sign In Successful");
        $("#signMsg").css("background-color", "rgba(49, 248, 42, 0.39)");
        $("#loginMsgContainer").show();
        $("#spinner").addClass("d-none");
        setTimeout(() => {
          window.location = "/homepage.html";
        }, 1000);
      })
      .catch(function (error) {
        $("#signMsg").text("Invalid Username Or Password");
        $("#signMsg").css("background-color", "rgba(252, 64, 64, 0.568)");
        $("#spinner").addClass("d-none");
        $("#loginMsgContainer").show();
      });
  };

  loginButton.addEventListener("click", signin);
};
