window.onload = function () {
  const signUpBtn = document.getElementById("signUpBtn");
  const toastLiveExample = document.getElementById("liveToast");

  const signUp = (e) => {
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const cnfPassword = document.getElementById("cnfPassword").value;
    e.preventDefault();
    const data = {
      name: username,
      email: email,
      number: phone,
      password: password,
    };

    $("#spinner").removeClass("d-none");

    axios
      .post("https://smmboostclub.herokuapp.com/user/signup", data)
      .then(function (response) {
        console.log(response);
        const userData = JSON.stringify(response.data);
        localStorage.setItem("user", userData);
        $("#signMsg").text("Sign Un Successful");
        $("#signMsg").css("background-color", "rgba(49, 248, 42, 0.39)");
        $("#loginMsgContainer").show();
        $("#spinner").addClass("d-none");

        setTimeout(() => {
          window.location = "/";
        }, 2000);
      })
      .catch(function (error) {
        $("#signMsg").text("Invalid Username Or Password");
        $("#signMsg").css("background-color", "rgba(252, 64, 64, 0.568)");
        $("#spinner").addClass("d-none");
        $("#loginMsgContainer").show();

        console.log(error.response);
      });
  };

  signUpBtn.addEventListener("click", signUp);

  console.log(localStorage.getItem("user"));
};
