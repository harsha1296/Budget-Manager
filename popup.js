$(function(){
	chrome.storage.sync.get(['tot','limit'],function(budget){
		$('#total').text(budget.tot);
		$('#limit').text(budget.limit);
	});
	$('#fetch').click(function(){
		chrome.storage.sync.get(['tot','limit'],function(budget){
			var newTotal=0;
			if(budget.tot)
			{
				newTotal += parseInt(budget.tot);
			}
			var amount=$('#amount').val();
			if(amount)
			{
				newTotal += parseInt(amount);
			}
			$('#total').text(newTotal);
			$('#amount').val('');
			chrome.storage.sync.set({'tot':newTotal},function(){
				if(amount && newTotal>=budget.limit)
				{
					var notifOptions={
						type : 'basic',
						iconUrl : 'icon48.png',
						title : 'Limit Reached!',
						message : 'You have reached your maximum limit'
					};
					chrome.notifications.create('limitNotif',notifOptions);
				}
			});
		});
	});
});