if(jQuery){
	jQuery.extend({
		gsa: function(p, calback){
			p = p || {};
			jQuery.ajax({
				url:'http://nkvs2.gosu.vn/ads/statistic.html',
				type:'get',
				data:{
					position:p.position,
					type:p.type,
					object:p.object,
					from:p.from,
					target:p.target
				}
			}).success(function(resp){
				if(calback && typeof(calback)=='function'){
					calback(resp);
				}
			});		
		}
	});
} else {
	console.log('jQuery is not available');
}