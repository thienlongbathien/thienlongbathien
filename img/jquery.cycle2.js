/*
 jQuery Cycle2; version: 2.1.6 build: 20141007
 http://jquery.malsup.com/cycle2/
 Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913  caption plugin for Cycle2;  version: 20130306  command plugin for Cycle2;  version: 20140415  hash plugin for Cycle2;  version: 20130905  loader plugin for Cycle2;  version: 20131121  pager plugin for Cycle2;  version: 20140415  prevnext plugin for Cycle2;  version: 20140408  progressive loader plugin for Cycle2;  version: 20130315  tmpl plugin for Cycle2;  version: 20121227 */
(function(d){function l(a){return(a||"").toLowerCase()}d.fn.cycle=function(a){if(0===this.length&&!d.isReady){var c=this.selector;var b=this.context;d.fn.cycle.log("requeuing slideshow (dom not ready)");d(function(){d(c,b).cycle(a)});return this}return this.each(function(){var b=d(this),c=d.fn.cycle.log;if(!b.data("cycle.opts")){if(!1===b.data("cycle-log")||a&&!1===a.log||k&&!1===k.log)c=d.noop;c("--c2 init--");var h=b.data();for(var f in h)if(h.hasOwnProperty(f)&&/^cycle[A-Z]+/.test(f)){var m=h[f];
    var n=f.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,l);c(n+":",m,"("+typeof m+")");h[n]=m}var k=d.extend({},d.fn.cycle.defaults,h,a||{});k.timeoutId=0;k.paused=k.paused||!1;k.container=b;k._maxZ=k.maxZ;k.API=d.extend({_container:b},d.fn.cycle.API);k.API.log=c;k.API.trigger=function(a,b){k.container.trigger(a,b);return k.API};b.data("cycle.opts",k);b.data("cycle.API",k.API);k.API.trigger("cycle-bootstrap",[k,k.API]);k.API.addInitialSlides();k.API.preInitSlideshow();k.slides.length&&k.API.initSlideshow()}})};
    d.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var a=this.opts(),c=a.slides;a.slideCount=0;a.slides=d();c=c.jquery?c:a.container.find(c);a.random&&c.sort(function(){return Math.random()-.5});a.API.add(c)},preInitSlideshow:function(){var a=this.opts();a.API.trigger("cycle-pre-initialize",[a]);var c=d.fn.cycle.transitions[a.fx];c&&d.isFunction(c.preInit)&&c.preInit(a);a._preInitialized=!0},postInitSlideshow:function(){var a=this.opts();a.API.trigger("cycle-post-initialize",
        [a]);var c=d.fn.cycle.transitions[a.fx];c&&d.isFunction(c.postInit)&&c.postInit(a)},initSlideshow:function(){var a=this.opts(),c=a.container;a.API.calcFirstSlide();"static"==a.container.css("position")&&a.container.css("position","relative");d(a.slides[a.currSlide]).css({opacity:1,display:"block",visibility:"visible"});a.API.stackSlides(a.slides[a.currSlide],a.slides[a.nextSlide],!a.reverse);a.pauseOnHover&&(!0!==a.pauseOnHover&&(c=d(a.pauseOnHover)),c.hover(function(){a.API.pause(!0)},function(){a.API.resume(!0)}));
        a.timeout&&(c=a.API.getSlideOpts(a.currSlide),a.API.queueTransition(c,c.timeout+a.delay));a._initialized=!0;a.API.updateView(!0);a.API.trigger("cycle-initialized",[a]);a.API.postInitSlideshow()},pause:function(a){var c=this.opts(),b=c.API.getSlideOpts(),e=c.hoverPaused||c.paused;a?c.hoverPaused=!0:c.paused=!0;!e&&(c.container.addClass("cycle-paused"),c.API.trigger("cycle-paused",[c]).log("cycle-paused"),b.timeout&&(clearTimeout(c.timeoutId),c.timeoutId=0,c._remainingTimeout-=d.now()-c._lastQueue,
    0>c._remainingTimeout||isNaN(c._remainingTimeout)))&&(c._remainingTimeout=void 0)},resume:function(a){var c=this.opts(),b=!c.hoverPaused&&!c.paused;a?c.hoverPaused=!1:c.paused=!1;b||(c.container.removeClass("cycle-paused"),0===c.slides.filter(":animated").length&&c.API.queueTransition(c.API.getSlideOpts(),c._remainingTimeout),c.API.trigger("cycle-resumed",[c,c._remainingTimeout]).log("cycle-resumed"))},add:function(a,c){var b=this.opts(),e=b.slideCount,g=!1;"string"==d.type(a)&&(a=d.trim(a));d(a).each(function(a){var e=
        d(this);c?b.container.prepend(e):b.container.append(e);b.slideCount++;a=b.API.buildSlideOpts(e);b.slides=c?d(e).add(b.slides):b.slides.add(e);b.API.initSlide(a,e,--b._maxZ);e.data("cycle.opts",a);b.API.trigger("cycle-slide-added",[b,a,e])});b.API.updateView(!0);if(g=b._preInitialized&&2>e&&1<=b.slideCount)b._initialized?b.timeout&&(e=b.slides.length,b.nextSlide=b.reverse?e-1:1,b.timeoutId||b.API.queueTransition(b)):b.API.initSlideshow()},calcFirstSlide:function(){var a=this.opts();var c=parseInt(a.startingSlide||
        0,10);if(c>=a.slides.length||0>c)c=0;a.currSlide=c;a.reverse?(a.nextSlide=c-1,0>a.nextSlide&&(a.nextSlide=a.slides.length-1)):(a.nextSlide=c+1,a.nextSlide==a.slides.length&&(a.nextSlide=0))},calcNextSlide:function(){var a=this.opts();if(a.reverse){var c=0>a.nextSlide-1;a.nextSlide=c?a.slideCount-1:a.nextSlide-1;a.currSlide=c?0:a.nextSlide+1}else c=a.nextSlide+1==a.slides.length,a.nextSlide=c?0:a.nextSlide+1,a.currSlide=c?a.slides.length-1:a.nextSlide-1},calcTx:function(a,c){var b;a._tempFx?b=d.fn.cycle.transitions[a._tempFx]:
    c&&a.manualFx&&(b=d.fn.cycle.transitions[a.manualFx]);b||(b=d.fn.cycle.transitions[a.fx]);a._tempFx=null;this.opts()._tempFx=null;b||(b=d.fn.cycle.transitions.fade,a.API.log('Transition "'+a.fx+'" not found.  Using fade.'));return b},prepareTx:function(a,c){var b=this.opts();if(2>b.slideCount)b.timeoutId=0;else if(!a||b.busy&&!b.manualTrump||(b.API.stopTransition(),b.busy=!1,clearTimeout(b.timeoutId),b.timeoutId=0),!b.busy&&(0!==b.timeoutId||a)){var e=b.slides[b.currSlide];var d=b.slides[b.nextSlide];
        var h=b.API.getSlideOpts(b.nextSlide);var f=b.API.calcTx(h,a);b._tx=f;a&&void 0!==h.manualSpeed&&(h.speed=h.manualSpeed);if(b.nextSlide!=b.currSlide&&(a||!b.paused&&!b.hoverPaused&&b.timeout)){b.API.trigger("cycle-before",[h,e,d,c]);f.before&&f.before(h,e,d,c);var m=function(){b.busy=!1;b.container.data("cycle.opts")&&(f.after&&f.after(h,e,d,c),b.API.trigger("cycle-after",[h,e,d,c]),b.API.queueTransition(h),b.API.updateView(!0))};b.busy=!0;f.transition?f.transition(h,e,d,c,m):b.API.doTransition(h,
            e,d,c,m);b.API.calcNextSlide();b.API.updateView()}else b.API.queueTransition(h)}},doTransition:function(a,c,b,e,g){var h=d(c),f=d(b),m=function(){f.animate(a.animIn||{opacity:1},a.speed,a.easeIn||a.easing,g)};f.css(a.cssBefore||{});h.animate(a.animOut||{},a.speed,a.easeOut||a.easing,function(){h.css(a.cssAfter||{});a.sync||m()});a.sync&&m()},queueTransition:function(a,c){var b=this.opts(),e=void 0!==c?c:a.timeout;0===b.nextSlide&&0===--b.loop?(b.API.log("terminating; loop=0"),b.timeout=0,e?setTimeout(function(){b.API.trigger("cycle-finished",
        [b])},e):b.API.trigger("cycle-finished",[b]),b.nextSlide=b.currSlide):void 0!==b.continueAuto&&(!1===b.continueAuto||d.isFunction(b.continueAuto)&&!1===b.continueAuto())?(b.API.log("terminating automatic transitions"),b.timeout=0,b.timeoutId&&clearTimeout(b.timeoutId)):e&&(b._lastQueue=d.now(),void 0===c&&(b._remainingTimeout=a.timeout),b.paused||b.hoverPaused||(b.timeoutId=setTimeout(function(){b.API.prepareTx(!1,!b.reverse)},e)))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&
    (a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a]));a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var c=this.opts();clearTimeout(c.timeoutId);c.timeoutId=0;c.nextSlide=c.currSlide+a;0>c.nextSlide?c.nextSlide=c.slides.length-1:c.nextSlide>=c.slides.length&&(c.nextSlide=0);c.API.prepareTx(!0,0<=a);return!1},buildSlideOpts:function(a){var c=this.opts(),b=a.data()||{},e;for(e in b)if(b.hasOwnProperty(e)&&/^cycle[A-Z]+/.test(e)){a=b[e];var g=e.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,
        l);c.API.log("["+(c.slideCount-1)+"]",g+":",a,"("+typeof a+")");b[g]=a}b=d.extend({},d.fn.cycle.defaults,c,b);b.slideNum=c.slideCount;try{delete b.API,delete b.slideCount,delete b.currSlide,delete b.nextSlide,delete b.slides}catch(h){}return b},getSlideOpts:function(a){var c=this.opts();void 0===a&&(a=c.currSlide);a=d(c.slides[a]).data("cycle.opts");return d.extend({},c,a)},initSlide:function(a,c,b){var e=this.opts();c.css(a.slideCss||{});0<b&&c.css("zIndex",b);isNaN(a.speed)&&(a.speed=d.fx.speeds[a.speed]||
        d.fx.speeds._default);a.sync||(a.speed/=2);c.addClass(e.slideClass)},updateView:function(a,c,b){var d=this.opts();if(d._initialized){var g=d.API.getSlideOpts(),h=d.slides[d.currSlide];if(!a&&!0!==c&&(d.API.trigger("cycle-update-view-before",[d,g,h]),0>d.updateView))return;d.slideActiveClass&&d.slides.removeClass(d.slideActiveClass).eq(d.currSlide).addClass(d.slideActiveClass);a&&d.hideNonActive&&d.slides.filter(":not(."+d.slideActiveClass+")").css("visibility","hidden");0===d.updateView&&setTimeout(function(){d.API.trigger("cycle-update-view",
        [d,g,h,a])},g.speed/(d.sync?2:1));0!==d.updateView&&d.API.trigger("cycle-update-view",[d,g,h,a]);a&&d.API.trigger("cycle-update-view-after",[d,g,h])}},getComponent:function(a){var c=this.opts();a=c[a];return"string"===typeof a?/^\s*[\>|\+|~]/.test(a)?c.container.find(a):d(a):a.jquery?a:d(a)},stackSlides:function(a,c,b){var e=this.opts();a||(a=e.slides[e.currSlide],c=e.slides[e.nextSlide],b=!e.reverse);d(a).css("zIndex",e.maxZ);a=e.maxZ-2;var g=e.slideCount;if(b){for(b=e.currSlide+1;b<g;b++)d(e.slides[b]).css("zIndex",
        a--);for(b=0;b<e.currSlide;b++)d(e.slides[b]).css("zIndex",a--)}else{for(b=e.currSlide-1;0<=b;b--)d(e.slides[b]).css("zIndex",a--);for(b=g-1;b>e.currSlide;b--)d(e.slides[b]).css("zIndex",a--)}d(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}};d.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))};d.fn.cycle.version=function(){return"Cycle2: 2.1.6"};d.fn.cycle.transitions={custom:{},none:{before:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           c,b,d){a.API.stackSlides(b,c,d);a.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(a,c,b,e){var g=a.API.getSlideOpts(a.nextSlide).slideCss||{};a.API.stackSlides(c,b,e);a.cssBefore=d.extend(g,{opacity:0,visibility:"visible",display:"block"});a.animIn={opacity:1};a.animOut={opacity:0}}},fadeout:{before:function(a,c,b,e){var g=a.API.getSlideOpts(a.nextSlide).slideCss||{};a.API.stackSlides(c,b,e);a.cssBefore=d.extend(g,{opacity:1,visibility:"visible",display:"block"});
        a.animOut={opacity:0}}},scrollHorz:{before:function(a,c,b,d){a.API.stackSlides(c,b,d);c=a.container.css("overflow","hidden").width();a.cssBefore={left:d?c:-c,top:0,opacity:1,visibility:"visible",display:"block"};a.cssAfter={zIndex:a._maxZ-2,left:0};a.animIn={left:0};a.animOut={left:d?-c:c}}}};d.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,
        pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4E3,updateView:0};d(document).ready(function(){d(d.fn.cycle.defaults.autoSelector).cycle()})})(jQuery);
(function(d){function l(b,c){var e=c.autoHeight;if("container"==e)e=d(c.slides[c.currSlide]).outerHeight(),c.container.height(e);else if(c._autoHeightRatio)c.container.height(c.container.width()/c._autoHeightRatio);else if("calc"===e||"number"==d.type(e)&&0<=e)e="calc"===e?a(b,c):e>=c.slides.length?0:e,e!=c._sentinelIndex&&(c._sentinelIndex=e,c._sentinel&&c._sentinel.remove(),e=d(c.slides[e].cloneNode(!0)),e.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),e.css({position:"static",
    visibility:"hidden",display:"block"}).prependTo(c.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),e.find("*").css("visibility","hidden"),c._sentinel=e)}function a(a,b){var c=0,e=-1;b.slides.each(function(a){var b=d(this).height();b>e&&(e=b,c=a)});return c}function c(a,b,c,f,m){a=d(f).outerHeight();b.container.animate({height:a},b.autoHeightSpeed,b.autoHeightEasing)}function b(a,g){g._autoHeightOnResize&&(d(window).off("resize orientationchange",g._autoHeightOnResize),
    g._autoHeightOnResize=null);g.container.off("cycle-slide-added cycle-slide-removed",l);g.container.off("cycle-destroyed",b);g.container.off("cycle-before",c);g._sentinel&&(g._sentinel.remove(),g._sentinel=null)}d.extend(d.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null});d(document).on("cycle-initialized",function(a,g){function e(){l(a,g)}var f=g.autoHeight,m=d.type(f),n=null;if("string"===m||"number"===m){g.container.on("cycle-slide-added cycle-slide-removed",l);g.container.on("cycle-destroyed",
    b);if("container"==f)g.container.on("cycle-before",c);else"string"===m&&/\d+\:\d+/.test(f)&&(f=f.match(/(\d+)\:(\d+)/),f=f[1]/f[2],g._autoHeightRatio=f);"number"!==m&&(g._autoHeightOnResize=function(){clearTimeout(n);n=setTimeout(e,50)},d(window).on("resize orientationchange",g._autoHeightOnResize));setTimeout(e,30)}})})(jQuery);
(function(d){d.extend(d.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"});d(document).on("cycle-update-view",function(l,a,c,b){"caption"===a.captionModule&&d.each(["caption","overlay"],function(){var d=c[this+"Template"],g=a.API.getComponent(this);g.length&&d?(g.html(a.API.tmpl(d,c,a,b)),g.show()):g.hide()})});d(document).on("cycle-destroyed",function(l,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             a){var c;d.each(["caption","overlay"],function(){var b=a[this+"Template"];a[this]&&b&&(c=a.API.getComponent("caption"),c.empty())})})})(jQuery);
(function(d){var l=d.fn.cycle;d.fn.cycle=function(a){var c,b,e,g=d.makeArray(arguments);return"number"==d.type(a)?this.cycle("goto",a):"string"==d.type(a)?this.each(function(){c=a;e=d(this).data("cycle.opts");if(void 0===e)l.log('slideshow must be initialized before sending commands; "'+c+'" ignored');else{c="goto"==c?"jump":c;b=e.API[c];if(d.isFunction(b)){var h=d.makeArray(g);h.shift();return b.apply(e.API,h)}l.log("unknown command: ",c)}}):l.apply(this,arguments)};d.extend(d.fn.cycle,l);d.extend(l.API,
    {next:function(){var a=this.opts();if(!a.busy||a.manualTrump){var c=a.reverse?-1:1;!1===a.allowWrap&&a.currSlide+c>=a.slideCount||(a.API.advanceSlide(c),a.API.trigger("cycle-next",[a]).log("cycle-next"))}},prev:function(){var a=this.opts();if(!a.busy||a.manualTrump){var c=a.reverse?1:-1;!1===a.allowWrap&&0>a.currSlide+c||(a.API.advanceSlide(c),a.API.trigger("cycle-prev",[a]).log("cycle-prev"))}},destroy:function(){this.stop();var a=this.opts(),c=d.isFunction(d._data)?d._data:d.noop;clearTimeout(a.timeoutId);
        a.timeoutId=0;a.API.stop();a.API.trigger("cycle-destroyed",[a]).log("cycle-destroyed");a.container.removeData();c(a.container[0],"parsedAttrs",!1);a.retainStylesOnDestroy||(a.container.removeAttr("style"),a.slides.removeAttr("style"),a.slides.removeClass(a.slideActiveClass));a.slides.each(function(){var b=d(this);b.removeData();b.removeClass(a.slideClass);c(this,"parsedAttrs",!1)})},jump:function(a,c){var b=this.opts();if(!b.busy||b.manualTrump){var d=parseInt(a,10);isNaN(d)||0>d||d>=b.slides.length?
        b.API.log("goto: invalid slide index: "+d):d==b.currSlide?b.API.log("goto: skipping, already on slide",d):(b.nextSlide=d,clearTimeout(b.timeoutId),b.timeoutId=0,b.API.log("goto: ",d," (zero-index)"),d=b.currSlide<b.nextSlide,b._tempFx=c,b.API.prepareTx(!0,d))}},stop:function(){var a=this.opts(),c=a.container;clearTimeout(a.timeoutId);a.timeoutId=0;a.API.stopTransition();a.pauseOnHover&&(!0!==a.pauseOnHover&&(c=d(a.pauseOnHover)),c.off("mouseenter mouseleave"));a.API.trigger("cycle-stopped",[a]).log("cycle-stopped")},
        reinit:function(){var a=this.opts();a.API.destroy();a.container.cycle()},remove:function(a){for(var c=this.opts(),b,e,g=[],h=1,f=0;f<c.slides.length;f++)b=c.slides[f],f==a?e=b:(g.push(b),d(b).data("cycle.opts").slideNum=h,h++);e&&(c.slides=d(g),c.slideCount--,d(e).remove(),a==c.currSlide?c.API.advanceSlide(1):a<c.currSlide?c.currSlide--:c.currSlide++,c.API.trigger("cycle-slide-removed",[c,a,e]).log("cycle-slide-removed"),c.API.updateView())}});d(document).on("click.cycle","[data-cycle-cmd]",function(a){a.preventDefault();
    a=d(this);var c=a.data("cycle-cmd"),b=a.data("cycle-context")||".cycle-slideshow";d(b).cycle(c,a.data("cycle-arg"))})})(jQuery);
(function(d){function l(a,c){if(a._hashFence)a._hashFence=!1;else{var b=window.location.hash.substring(1);a.slides.each(function(e){if(d(this).data("cycle-hash")==b){if(!0===c)a.startingSlide=e;else{var g=a.currSlide<e;a.nextSlide=e;a.API.prepareTx(!0,g)}return!1}})}}d(document).on("cycle-pre-initialize",function(a,c){l(c,!0);c._onHashChange=function(){l(c,!1)};d(window).on("hashchange",c._onHashChange)});d(document).on("cycle-update-view",function(a,c,b){b.hash&&"#"+b.hash!=window.location.hash&&
(c._hashFence=!0,window.location.hash=b.hash)});d(document).on("cycle-destroyed",function(a,c){c._onHashChange&&d(window).off("hashchange",c._onHashChange)})})(jQuery);
(function(d){d.extend(d.fn.cycle.defaults,{loader:!1});d(document).on("cycle-bootstrap",function(l,a){if(a.loader){var c=a.API.add;a.API.add=function(b,e){function g(a,b){return a.data("index")-b.data("index")}var h=[];if("string"==d.type(b))b=d.trim(b);else if("array"===d.type(b))for(var f=0;f<b.length;f++)b[f]=d(b[f])[0];b=d(b);var m=b.length;m&&(b.css("visibility","hidden").appendTo("body").each(function(b){function f(){if(0===--l){--m;var b=n;if("wait"==a.loader)h.push(b),0===m&&(h.sort(g),c.apply(a.API,
    [h,e]),a.container.removeClass("cycle-loading"));else{var f=d(a.slides[a.currSlide]);c.apply(a.API,[b,e]);f.show();a.container.removeClass("cycle-loading")}}}var l=0,n=d(this),p=n.is("img")?n:n.find("img");n.data("index",b);p=p.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])');p.length?(l=p.length,p.each(function(){if(this.complete)f();else d(this).load(function(){f()}).on("error",function(){0===--l&&(a.API.log("slide skipped; img not loaded:",this.src),0===--m&&"wait"==a.loader&&c.apply(a.API,
    [h,e]))})})):(--m,h.push(n))}),m&&a.container.addClass("cycle-loading"))}}})})(jQuery);
(function(d){function l(a,b,e){var c;a.API.getComponent("pager").each(function(){var g=d(this);if(b.pagerTemplate){var f=a.API.tmpl(b.pagerTemplate,b,a,e[0]);c=d(f).appendTo(g)}else c=g.children().eq(a.slideCount-1);c.on(a.pagerEvent,function(b){a.pagerEventBubble||b.preventDefault();a.API.page(g,b.currentTarget)})})}function a(a,b){var c=this.opts();if(!c.busy||c.manualTrump){var d=a.children().index(b),h=c.currSlide<d;c.currSlide!=d&&(c.nextSlide=d,c._tempFx=c.pagerFx,c.API.prepareTx(!0,h),c.API.trigger("cycle-pager-activated",
    [c,a,b]))}}d.extend(d.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerEventBubble:void 0,pagerTemplate:"<span>&bull;</span>"});d(document).on("cycle-bootstrap",function(a,b,d){d.buildPagerLink=l});d(document).on("cycle-slide-added",function(c,b,d,g){b.pager&&(b.API.buildPagerLink(b,d,g),b.API.page=a)});d(document).on("cycle-slide-removed",function(a,b,e,g){b.pager&&b.API.getComponent("pager").each(function(){var a=d(this);d(a.children()[e]).remove()})});
    d(document).on("cycle-update-view",function(a,b,e){b.pager&&(a=b.API.getComponent("pager"),a.each(function(){d(this).children().removeClass(b.pagerActiveClass).eq(b.currSlide).addClass(b.pagerActiveClass)}))});d(document).on("cycle-destroyed",function(a,b){var c=b.API.getComponent("pager");c&&(c.children().off(b.pagerEvent),b.pagerTemplate&&c.empty())})})(jQuery);
(function(d){d.extend(d.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1});d(document).on("cycle-initialized",function(d,a){a.API.getComponent("next").on(a.nextEvent,function(b){b.preventDefault();a.API.next()});a.API.getComponent("prev").on(a.prevEvent,function(b){b.preventDefault();a.API.prev()});if(a.swipe){var c=a.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";a.container.on(a.swipeVert?
    "swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",function(b){a._tempFx=a.swipeFx;a.API.next()});a.container.on(c,function(){a._tempFx=a.swipeFx;a.API.prev()})}});d(document).on("cycle-update-view",function(d,a,c,b){if(!a.allowWrap){d=a.disabledClass;c=a.API.getComponent("next");b=a.API.getComponent("prev");var e=a._prevBoundry||0;a.currSlide==(void 0!==a._nextBoundry?a._nextBoundry:a.slideCount-1)?c.addClass(d).prop("disabled",!0):c.removeClass(d).prop("disabled",!1);a.currSlide===e?b.addClass(d).prop("disabled",
    !0):b.removeClass(d).prop("disabled",!1)}});d(document).on("cycle-destroyed",function(d,a){a.API.getComponent("prev").off(a.nextEvent);a.API.getComponent("next").off(a.prevEvent);a.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})})(jQuery);
(function(d){d.extend(d.fn.cycle.defaults,{progressive:!1});d(document).on("cycle-pre-initialize",function(l,a){if(a.progressive){var c=a.API,b=c.next,e=c.prev,g=c.prepareTx,h=d.type(a.progressive);if("array"==h)var f=a.progressive;else if(d.isFunction(a.progressive))f=a.progressive(a);else if("string"==h){h=d(a.progressive);f=d.trim(h.html());if(!f)return;if(/^(\[)/.test(f))try{f=d.parseJSON(f)}catch(m){c.log("error parsing progressive slides",m);return}else f=f.split(new RegExp(h.data("cycle-split")||
    "\n")),f[f.length-1]||f.pop()}g&&(c.prepareTx=function(b,c){if(b||0===f.length)g.apply(a.API,[b,c]);else if(c&&a.currSlide==a.slideCount-1){var d=f[0];f=f.slice(1);a.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.API.advanceSlide(1)},50)});a.API.add(d)}else if(c||0!==a.currSlide)g.apply(a.API,[b,c]);else{var e=f.length-1;d=f[e];f=f.slice(0,e);a.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.currSlide=1;b.API.advanceSlide(-1)},50)});a.API.add(d,!0)}});
    b&&(c.next=function(){var a=this.opts();if(f.length&&a.currSlide==a.slideCount-1){var c=f[0];f=f.slice(1);a.container.one("cycle-slide-added",function(a,c){b.apply(c.API);c.container.removeClass("cycle-loading")});a.container.addClass("cycle-loading");a.API.add(c)}else b.apply(a.API)});e&&(c.prev=function(){var a=this.opts();if(f.length&&0===a.currSlide){var b=f.length-1,c=f[b];f=f.slice(0,b);a.container.one("cycle-slide-added",function(a,b){b.currSlide=1;b.API.advanceSlide(-1);b.container.removeClass("cycle-loading")});
        a.container.addClass("cycle-loading");a.API.add(c,!0)}else e.apply(a.API)})}})})(jQuery);
(function(d){d.extend(d.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"});d.extend(d.fn.cycle.API,{tmpl:function(l,a){var c=new RegExp(a.tmplRegex||d.fn.cycle.defaults.tmplRegex,"g"),b=d.makeArray(arguments);b.shift();return l.replace(c,function(a,c){var e,f,g,l=c.split(".");for(e=0;e<b.length;e++)if(g=b[e]){if(1<l.length){var k=g;for(f=0;f<l.length;f++)g=k,k=k[l[f]]||c}else k=g[c];if(d.isFunction(k))return k.apply(g,b);if(void 0!==k&&null!==k&&k!=c)return k}return c})}})})(jQuery);