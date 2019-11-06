var contextMenuItem={
	"id" : "spendMoney",
	"title" : "Spend Money",
	"contexts" : ["selection"]
};
 chrome.contextMenus.create(contextMenuItem);

 function isInt(value)
 {
 	return !isNaN(value) && parseInt(Number(value))==value && !isNaN(parseInt(value,10));
 }


 chrome.contextMenus.onClicked.addListener(function(clickData){
 	if(clickData.menuItemId=="spendMoney" && clickData.selectionText)
 	{
 		if(isInt(clickData.selectionText))
 		{
 			chrome.storage.sync.get(['tot','limit'],function(budget){
 				var newTotal=0;
 				if(budget.tot)
 				{
 					newTotal += parseInt(budget.tot);
 				}

 				newTotal += parseInt(clickData.selectionText);

 				chrome.storage.sync.set({'tot':newTotal},function(){
 					if(newTotal >= budget.limit)
 					{
 						var notifOptions={
 							type : 'basic',
 							iconUrl : 'icon48.png',
 							title : 'Limit Reached!',
 							message : "You've reached your maximum Limit"
 						};
 						chrome.notifications.create('limitNotif',notifOptions);
 					}
 				});

 			});
 		}
 	}
 });


chrome.storage.onChanged.addListener(function(changes,storageName){
	chrome.browserAction.setBadgeText({"text":changes.tot.newValue.toString()});
});

