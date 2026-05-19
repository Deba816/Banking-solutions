$(document).ready(function () {
  function callerFunction() {
    debugger;
    var get_storage_details_login = JSON.parse(
      localStorage.getItem("Product_detalis")
    );
    var Unique = get_storage_details_login
      ? get_storage_details_login.ContainerList[0].RankedResults[0].SubjectID
      : Math.floor(Math.random() * 1000000);
    var customer_id = localStorage.getItem("userName_login");
    // payload value
    var date_payload = {
      SubjectID: customer_id,
      ExternalID: Unique,
      ContextName: "Subscription",
      ContainerName: "NextBestAction",
      Channel: "Web",
      Direction: "Inbound",
      Placements: "",
      AppID: "RTCM",
      Contexts: [
        {
          Type: "",
          Value: "",
          Key: "",
        },
      ],
    };

    $.post(
      "http://100.78.10.22:8080/prweb/api/PegaMKTContainer/v4/container",
      JSON.stringify(date_payload),
      function (data, status) {
        console.log(data);
        //var data_product_details =JSON.stringify(data.ContainerList[0].RankedResults[get_array]);
        //var subject_id = localStorage("")
        //localStorage.setItem("data_product_details",data_product_details);

        for (
          i = 0;
          i < JSON.stringify(data.ContainerList[0].RankedResults.length);
          i++
        ) {
          var itemClass = i === 0 ? "active" : " ";
          var image_payload1 = JSON.stringify(
            data.ContainerList[0].RankedResults[i].ImageURL
          );

          var URL_payload1 = JSON.stringify(
            data.ContainerList[0].RankedResults[i].ClickThroughURL
          );
          var Name1 = JSON.stringify(
            data.ContainerList[0].RankedResults[i].Name
          );

          var ShortDescription1 = JSON.stringify(
            data.ContainerList[0].RankedResults[i].ShortDescription
          );
          /*var image_payload2 =JSON.stringify(data.ContainerList[0].RankedResults[1].ImageURL);
       
       var URL_payload2 =JSON.stringify(data.ContainerList[0].RankedResults[1].ClickThroughURL);
       var Name2 =JSON.stringify(data.ContainerList[0].RankedResults[1].Name);
       
       var ShortDescription2 =JSON.stringify(data.ContainerList[0].RankedResults[1].ShortDescription);*/

          $(".carousel-inner").append(`<div class='item ${itemClass}'>
            <a href="Offer_Page_Network_Connect.html"><img src=${image_payload1} id=${i} alt="offerImage"/></a>
       </div> `);

          $(document).on("click", ".carousel-inner img", function () {
            var get_array = $(this).attr("id");
            var data_product_details = JSON.stringify(
              data.ContainerList[0].RankedResults[get_array]
            );
            //var subject_id = localStorage("")
            localStorage.setItem("data_product_details", data_product_details);
          });
        }
      }
    );
  }
  $(document).on("click", ".logout", function () {
    localStorage.removeItem("userName_login");
  });

  callerFunction();
  //setTimeout(callerFunction, 1000);
  $("#myCarousel").carousel();
});
