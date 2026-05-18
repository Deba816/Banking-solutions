function getNBAMServiceControl(serviceClass,callMultiContainer) {
	
	var serverHostname = "decisioning05.areteans.com";
	var serverPort = "";
	var serviceClass = serviceClass;
	var callMultiContainer = callMultiContainer;
	var offerLength = 0;
	var NBAMServiceControl = {

		hostName : serverHostname,
		port : serverPort,
		url : "",

		initialize : function (serverHostname, serverPort) {
			this.hostName = serverHostname;
			this.port = serverPort;
			if (typeof this.hostName == 'undefined')
				this.hostName = "localhost";
			if (typeof this.port == 'undefined')
				this.port = 80;				
			this.url = "http://" + this.hostName + ":" + this.port + "/prweb/PRRestService/PegaMKTContainer/Services/ExecuteWebContainer?";
			this.url = "https://decisioning05.areteans.com/prweb/PRRestService/PegaMKTContainer/V2/Container";
			this.url = "https://decisioning05.areteans.com/prweb/PRRestService/MarketingForBanking/V1/CaptureActivity";
			
		},

		getServiceURL : function (serviceName,params) {
			var url;
			if(serviceName =='CaptureResponse')
			{
				url="https://decisioning05.areteans.com/prweb/PRRestService/MarketingForBanking/V1/CaptureActivity";
				
				
			}
			else
			{
			if(serviceClass){
				url = "https://" + this.hostName + ":" + this.port + "/prweb/PRRestService/PegaMKTContainer/"+serviceClass+"/"+serviceName+"?";
	
			} else {
				var url = "http://" + this.hostName + ":" + this.port + "/prweb/PRRestService/PegaMKTContainer/Services/"+serviceName+"?";
			}
			url="https://decisioning05.areteans.com/prweb/PRRestService/MarketingForBanking/V1/CaptureActivity";
		
			if(params != null) {
			 url += params;
			}
			}
			return url;
			
		},
		

		getOffers : function (VisitorCookieIdentifier, containerName, channel, previousPage, currentpage, direction, callback) {

		//alert("2");
			this.checkCallBack(callback);
			var callbackFunction;
		
			
			if(callMultiContainer){
				//alert("3");
				callbackFunction = function (data){
					
				    var responseData = data["ResponseData"];
					var containerNameList = containerName.split(",");
					for(var i=0;i<containerNameList.length;i++){
						console.log(responseData[containerNameList[i]]);
						callback(responseData[containerNameList[i]],containerNameList[i]);
					}
				};	
			}
			else
				
			callbackFunction = callback;
						
			var jsonObj = this.getJSONObj(VisitorCookieIdentifier, containerName, channel, previousPage, currentpage, direction);
			
			
			if(serviceClass){
				this.invokeRemoteService("Container",null,"POST",jsonObj,callbackFunction);
				
			} else {
				this.invokeRemoteService("Container",null,"POST",jsonObj,callbackFunction);
				
				console.log(jsonObj);
				//console.log(callbackFunction);
				//var Container=function(response);
				//console.log(Container);
				//OffersList = response.OffersList;
				
				//console.log(Response);
				
				
				var handleResponse = function(response) { 		
									//console.log(ContainerList.Message);
					
					}
			
				
			}
			
		},
		
		getJSONObj : function(VisitorCookieIdentifier, containerName, channel, previousPage, currentpage, direction){
			if(serviceClass){				
				var jsonObj = {
					"VisitorCookieIdentifier" : VisitorCookieIdentifier,
					"ContainerName" : containerName,
					"Channel": channel,
                  	"Contexts": [{
                                  "Key": "CurrentPage",
                                  "Value": currentpage,
                                  "Type": "CurrentPage"
                             	 },
                                 {
                                  "Key": "PreviousPage",
                                  "Value": previousPage,
                                  "Type": "PreviousPage"
                             	 }],
					"Direction": direction
					
				};
			} else {
				
				var jsonObj = {
					"VisitorCookieIdentifier" : VisitorCookieIdentifier,
					"ContainerName" : containerName,
					"Channel": channel,
					"PreviousPage":previousPage,
					"CurrentPage":currentpage,
					"Direction": direction
			    };
				
			}
			return jsonObj;
		},
				

		/* "captureSingleWebImpression " : to capture single web impression, pass following parameters and the impresssion would be captured.*/
		captureSingleWebImpression : function (ContainerID, CustomerID, OfferID, Issue, Group, InteractionID, campaignID,callback) {
			var jsonObj = {
				"CustomerID" : CustomerID,
				"ContainerName" : ContainerID,
				"OffersList" : [{
						"OfferID" : OfferID,
						"Issue" : Issue,
						"Group" : Group,
						"InteractionID" : InteractionID,
						"CampaignID": campaignID
					}
				]
			};

			this.captureMultipleWebImpression(jsonObj, callback);
		},

		/**
		* "captureMultipleWebImpression" : 
		* Accepts the JSON Object with the list of offers and then captures the impressions for all the offers 
		**/
		captureMultipleWebImpression : function (JSONObj, callback) {
			var jsonString = JSON.stringify(JSONObj);
			var serviceUrl = this.getServiceURL("CaptureWebImpression",null); 			
			var xmlHttpReq = this.createRequest('POST', serviceUrl, callback);
			if (xmlHttpReq)	xmlHttpReq.send(jsonString);
		},
		
      	/**
		*"capturePaidClickResponse " : capture paid meida click response 
		**/
		capturePaidClickResponse : function (CustomerID, ExternalAudienceId, ReferrerUrl, Utm_medium, callback) {
			var jsonObj = {
				"CustomerID" : CustomerID,
				"ExternalAudienceId" : ExternalAudienceId,
				"ReferrerUrl" : ReferrerUrl,
				"Utm_medium" : Utm_medium
			};

			this.captureMultiplePaidClickResponse(jsonObj, callback);
		},

		/**
		* "captureMultiplePaidClickResponse" capture paid meida click response 
		**/
		captureMultiplePaidClickResponse : function (JSONObj, callback) {
			var jsonString = JSON.stringify(JSONObj);
			var serviceUrl = this.getServiceURL("CapturePaidResponse",null); 			
			var xmlHttpReq = this.createRequest('POST', serviceUrl, callback);
			if (xmlHttpReq)	xmlHttpReq.send(jsonString);
		},
		// Create the XHR object.
	 createRequest : function(method, url, callback) {
		var xhr = new XMLHttpRequest();
		if (typeof xhr == "undefined") { return null; }
		
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = xhr.responseText;

				if (data && typeof callback == "function") {
					try {
						//alert("4");
						
						callback(JSON.parse(data));
					} catch (exception) {}
				}
				
			}
			
			//var _json = data;
			//var obj = JSON.parse(data);
			//console.log(obj.ContainerList[0].RankedResults[0].Benefits)
		};
		xhr.onerror = function () {
			//do nothing;
		};
		xhr.open(method, url, true);
		
		return xhr;
	},

	checkCallBack : function(callback) {

		if (callback == null  || typeof callback == 'undefined' || true) {
			callback = this.callDefaultCallBack;
		}
	},

	callDefaultCallBack : function (response) {
		
		var OffersList;
		
		
		
		
	 	if(typeof response.OffersList != "undefined") { 
			OffersList = response.OffersList;
			
		} else if(data.RankedResults && data.RankedResults.length) {
			OffersList = response.RankedResults;
			
			
		}
		OffersList = response;
		console.log(OffersList);
		return;


		for (var i=0; i< OffersList.length; i++) {		      
		      //Get the src for the img tag...
		      var ba = document.getElementById("BannerAd" + (offerLength+i));
		      var tagname = "BannerURL";
		      if (ba && $(ba).hasClass("smimg")) {
		         tagname = "BannerURLSmall";
		      }

			  offerLength = offerLength+i;
			  
		      var bannerURL = OffersList[i].ImageURL;
		      if (ba) ba.src = bannerURL;
		      
		      //Get the href for the anchor/link tag		      
		      var bannerRef = OffersList[i].ClickThroughURL;
		      
		      
		      var bc = document.getElementById("BannerClick" + i);
		      if (bc) bc.href = bannerRef;
	   	}
	},

	/* captureWebResponse function is implemented as part US-81885 */
	
	captureWebResponse : function (containerID, customerID, offerID, issue, group, interactionID,outcome,behaviour,channel,direction,campaignID,callback) {
	
		var jsonObj = {
			"CustomerID" : customerID,
			"ContainerName" : containerID,
			"OffersList" : [{
					"OfferID" : offerID,
					"Issue" : issue,
					"Group" : group,
					"CampaignID": campaignID,
					"InteractionID" : interactionID,
					"Outcome":outcome,
					"Behaviour":behaviour,
					"Direction":direction,
					"Channel":channel
					
				}]
		};
		this.captureWebResponseWithJSON(jsonObj,callback);
		console.log(jsonObj);
		
	},
	captureWebResponseWithJSON : function(jsonObj,callback){
		this.invokeRemoteService("CaptureWebResponse",null,"POST",jsonObj,callback);
    },
	captureResponse : function(containerID, customerID, offerID, issue, group, interactionID,outcome,behaviour,channel,direction,campaignID,callback,initiateOffer){
	
	
		if(serviceClass){
			var jsonObj = {
				"CustomerID" : customerID,
				"ContainerName" : containerID,
				"RankedResults" : [{
						"Name" : offerID,
						"Issue" : issue,
						"Group" : group,
						"CampaignID": campaignID,
						"InteractionID" : interactionID,
						"Outcome":outcome,
						"Behaviour":behaviour,
						"Direction":direction,
						"Channel":channel
                  
				}]
			};
		} else {
			var jsonObj = {
				"CustomerID" : customerID,
				"ContainerName" : containerID,
				"OffersList" : [{
						"OfferID" : offerID,
						"Issue" : issue,
						"Group" : group,
						"CampaignID": campaignID,
						"InteractionID" : interactionID,
						"Outcome":outcome,
						"Behaviour":behaviour,
						"Direction":direction,
						"Channel":channel
						
				}]
			};
		}
		
		this.captureResponseWithJSON(jsonObj,callback,initiateOffer);
		
	},
	captureResponseWithJSON : function(jsonObj,callback,initiateOffer){
		if(serviceClass){
			if(initiateOffer){
				this.invokeRemoteService("CaptureResponse/Initiate",null,"POST",jsonObj,callback);  
			} else {
				this.invokeRemoteService("CaptureResponse",null,"POST",jsonObj,callback);
			}
		} else{
			this.invokeRemoteService("CaptureResponse",null,"POST",jsonObj,callback);
		}
		
    },

	invokeRemoteService: function(serviceName,urlParams,httpVerb,jsonObj,callback){
		var serviceUrl = this.getServiceURL(serviceName,urlParams); 			
		var xmlHttpReq = this.createRequest(httpVerb, serviceUrl, callback);
		if (xmlHttpReq)	xmlHttpReq.send(JSON.stringify(jsonObj));
	},
	
  };
	
    return NBAMServiceControl;
}