$(document).ready(function () {
  var url = window.location.href;
  console.log(url, "url");
  const statusReplaceStorage = localStorage.getItem("statusReplace");

  if (!statusReplaceStorage) {
    localStorage.setItem("statusReplace", "1");
  }

  const statusReplace = localStorage.getItem("statusReplace");

  // Chọn link token
  if (
    url.includes("https://developers.google.com/oauthplayground/") &&
    statusReplace == 1
  ) {
    const listApiDriverV3 = $('li[groupid="api-Drive-API-v3"]');
    console.log(listApiDriverV3, " listApiDriverV3");
    if (listApiDriverV3.length > 1) {
      setTimeout(() => {
        listApiDriverV3.each(async function () {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          var $element = $(this);
          $element.attr("style", "display: list-item;");
          $element.click();
          console.log("selected li");
        });
      }, 1000);

      const btnSubmit = $("#authorizeApisButton");
      if (btnSubmit.length > 0) {
        setTimeout(() => {
          btnSubmit.click();
          console.log("submit");
        }, 5000);
      }
      localStorage.setItem("statusReplace", "2");
    } else {
      window.location.reload();
    }
  }

  // chọn tài khoản đầu tiên để đăng nhập
  $(document).ready(async function () {
    if (url.includes("/oauthchooseaccount")) {
      const account = $(".OVnw0d li div");
      console.log(account[0], "account");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      account.click();
      console.log("click");
    }
  });

  // nếu yêu cầu đăng nhập (tài khoản mật khẩu phải đúng)
  $(document).ready(async function () {
    if (url.includes("oauth2/v2/auth/identifier")) {
      const bntSubmit = $("#submit_approve_access");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      bntSubmit.click();
    }
  });

  // chấp nhận tài khoản google
  $(document).ready(async function () {
    if (url.includes("signin/oauth/consent")) {
      const bntSubmit = $("#submit_approve_access");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      bntSubmit.click();
    }
  });

  // sau khi đăng nhập tài khoản google để lấy token
  $(document).ready(async function () {
    async function clickAndCheckInputToken() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const btnExchangeCode = $("#exchangeCode");
      btnExchangeCode.click();

      let inputTokenValue = $("#access_token_field")[0].value;

      if (!inputTokenValue) {
        console.log("click lại");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        clickAndCheckInputToken(); // gọi lại
      } else {
        // lấy được token
        console.log(inputTokenValue, "inputTokenValue");
        let data = {
          token: inputTokenValue,
        };
        await new Promise((resolve, reject) => {
          console.log(data, "data");
          setTimeout(() => {
            updateToken(
              // thay url api
              "https://..../api/edit-token",
              data
            )
              .then(() => {
                console.log("API update token complete");
                resolve();
              })
              .catch((error) => {
                console.error("Error calling API update token:", error);
                reject(error);
                return 1;
              });

            //  console.log(inputTokenValue, "Call API");
            resolve();
          }, 3000);
        });
        localStorage.setItem("statusReplace", "1");

        setTimeout(() => {
          window.location.replace(
            "https://developers.google.com/oauthplayground/"
          );
        }, 2400000);
      }
    }
    // gọi lại khi check input không có token
    clickAndCheckInputToken();
  });

  // call api

  function updateToken(url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        dataType: "json",
        async: false,
        url: url,
        type: "POST",
        cache: false,
        data: data,
        header: "Access-Control-Allow-Origin",
        success: function (response) {
          resolve(1);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }
});
