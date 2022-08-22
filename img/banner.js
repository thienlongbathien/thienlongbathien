jQuery.fn.extend({
	ballon:function(opt){
		var blNav=opt.nav;
		var blView=opt.view;
		var blCloseButton=opt.close;
		var blSetTime=opt.time || 0;
		var that = jQuery(this);
		var viewTrigger = function(){
			var btNav = that.find(blNav);
			var hasClose = btNav.hasClass('close');
			var hasOpen = btNav.hasClass('open');
			if(!hasClose && !hasOpen){
				btNav.addClass('open');
				hasOpen = true;
			} else if(hasClose && hasOpen){
				btNav.removeClass('close');
				hasClose = false;
			}
			if(hasClose){
				$(blView).animate({
        			height: 0
			    }, 800, function() {
			        btNav.removeClass('close').addClass("open");
			    });
			} else {
				$(blView).animate({
        			height: '180px'
			    }, 800, function() {
			        btNav.removeClass('open').addClass("close");
			    });
			}
			blSetTime = -1;
		}
		var autoTrigger = function(){
			if(blSetTime>0) {
				 blSetTime--;
				 setTimeout(function(){autoTrigger()},1e3);
			} else if(blSetTime==0){
				viewTrigger();
			}			
		}
		that.on('click',blNav,function(){
			viewTrigger();
		});
		that.on('click',blCloseButton,function(){
			that.animate({
    			opacity: 0
		    }, 500, function() {
		        that.remove();
		    });
		});
		autoTrigger();
	},
	setMiddleColumn: function(){
		var that = jQuery(this);
		var setPos = function(){
			var hWindow = jQuery(window).height();
			var hElm = that.height();
			if((hWindow+hElm)/2>hElm){
				var pos=(hWindow+hElm)/2-hElm;
				that.css({'top':pos+'px'})
			}
		}
		jQuery(window).resize(function(){
			setPos();	
		});
		setPos();	
	}
});

jQuery(document).ready(function(){
	jQuery('#group-banner_bottom').ballon({
		nav: '.bl-minimum',
		view: '.item-banner_bottom',
		close: '.bl-close',
		time: 10
	});	
	/* middle banner */
	jQuery("#group-fix_middle").click(function(){
		jQuery(this).animate({
			'opacity':0
		},1000,function(){
			jQuery(this).remove()
		});
	});
	/* right banner*/
	jQuery("#group-fix_right").setMiddleColumn();
	/* left banner*/
	jQuery("#group-fix_left").setMiddleColumn();
});