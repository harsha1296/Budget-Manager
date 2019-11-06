$(function(){
	chrome.storage.sync.get('limit',function(object){
		$('#limit').val(object.limit);
	});
	$('#setLimit').click(function(){
		var limit=$('#limit').val();
		if(limit)
		{
			chrome.storage.sync.set({'limit':limit},function(){
				close();
			});
		}		
	});
	$('#resetTotal').click(function(){
		chrome.storage.sync.set({'tot':0},function(){
			var notifOptions={
						type : 'basic',
						iconUrl : 'icon48.png',
						title : 'Total Reset Done',
						message : 'Total has been reset successfully'
					};
					chrome.notifications.create('resetTotalNotif',notifOptions);
		});
	});
});