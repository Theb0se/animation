window.onload = function () {
  const updateButton = document.getElementById("loginBtn");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  $("#userName").val(user && user.name);
  $("#userEmail").val(user && user.email);
  $("#currentUserEmail").val(user && user.email);

  const emailUpdate = (e) => {
    e.preventDefault();
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("EmailPassword").value;
    const userId = user.id;
    const currEmail = user.email;
    $("#loginMsgContainer").hide();
    const data = {
      email: email,
      password: password,
      userId: userId,
      currEmail: currEmail,
    };
    console.log(data);

    $("#spinner").removeClass("d-none");

    axios
      .post("https://smmboostclub.herokuapp.com/user/updateEmail", data)
      .then(function (response) {
        console.log(response.data);
        const userData = JSON.stringify(response.data);
        localStorage.setItem("user", userData);
        $("#userEmail").val(response.data.email);
        $("#currentUserEmail").val(response.data.email);
        $("#newEmail").val("");
        $("#emailMsg").text("Email Change Successful");
        $("#emailMsg").css("background-color", "rgba(49, 248, 42, 0.39)");
        $("#EmailMsgContainer").show();
        $("#spinner").addClass("d-none");
      })
      .catch(function (error) {
        console.log(error);
        $("#emailMsg").text("Something Went Wrong");
        $("#emailMsg").css("background-color", "rgba(252, 64, 64, 0.568)");
        $("#spinner").addClass("d-none");
        $("#EmailMsgContainer").show();
      });
  };

  $("#updateEmailBtn").click(function (e) {
    emailUpdate(e);
  });
};
