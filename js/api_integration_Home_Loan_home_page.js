function getCookieID() {
    let name = "demoCSANamepersisted" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let d = c.substring(name.length, c.length);
            if (d.charAt(0) == '_') {
                d = d.substring(1);
            }
            let da = d.split('_');
            for (let j = 0; j < da.length; j++) {
                let e = da[j];
                if (j > 0) {
                    return e;
                    break;
                }
            }
        }
    }
    return "";
}
console.log("This is cookie id", getCookieID())

var nbamServiceCtrl = getNBAMServiceControl();
console.log(nbamServiceCtrl);
nbamServiceCtrl.getOffers(getCookieID(), "SMELoansRHB", "Web", "Login", "Home", "Inbound", handleResponse);

function handleResponse(data) {
    $('.offer_card').remove();

    for (i = 0; i < data.ContainerList[0].RankedResults.length; ++i) {
        var img = data.ContainerList[0].RankedResults[i].ImageURL;
        var clickthrough = data.ContainerList[0].RankedResults[i].ClickThroughURL;
        var title = data.ContainerList[0].RankedResults[i].Label;
        var desc = data.ContainerList[0].RankedResults[i].ShortDescription;
        var variant = data.ContainerList[0].RankedResults[i].Variant;
        var cusName = data.ContainerList[0].RankedResults[i].CustomerName;
        var WebMesg = data.ContainerList[0].RankedResults[i].WebMessage;
        var compareVariant = "business_loan_approval, bizpower_property_loan, bizpower_relief_financing, rhb_visa_infinite, home_loan_approval";
        //document.getElementById("cus").innerHTML=cusName;

        if (compareVariant.indexOf(data.ContainerList[0].RankedResults[i].Variant) >= -1) {
            var contentRight = "";
            if (data.ContainerList[0].RankedResults[i].Variant != 'home_loan_approval') {
                contentRight = 'contentRight'
            }
            var offer_card = `<div class="offer_card carousel-item ${contentRight}" style="background: #6ac7db !important">
                                    <div  class=" d-flex position-relative alignItems"  style=" opacity: 0.93; ">
                                        <div  class="slide-content w-75 position-absolute slide11">
                                            <h3  class="text-white font-oswald-Medium p-0 m-0">${title}</h3>
                                            <br>
                                            <h6  class="font-Raleway-SemiBold text-white" style=" line-height: 1.3; ">${desc}</h6>
                                            <br>
                                            <a href="${clickthrough}"  class="btn-round-custom bg-white border-white font-Raleway-Medium font-weight-bold border Darkblue-font mt-5">${WebMesg}</a>
                                        </div>
                                        <img class="slide-img" src="assets/images/${variant}.png" alt="Overview" style="width:100%; min-height: 340px;">
                                    </div>
                                </div>`;
        }
        $('.carousel-inner').append(offer_card);
    }

    $('.carousel-inner').children('.carousel-item').eq(0).addClass('active');
    $('#myCarousel').carousel();
};
