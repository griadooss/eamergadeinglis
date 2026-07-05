/*
url-loading object and a request queue built on top of it
*/

/* namespacing object */
var net=new Object();

net.READY_STATE_UNINITIALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;


/*--- content loader object for cross-browser requests ---*/
net.ContentLoader=function(url,onload,onerror,method,params,contentType){
  this.req=null;
  this.onload=onload;
  this.onerror=(onerror) ? onerror : this.defaultError;
  this.loadXMLDoc(url,method,params,contentType);
}

net.ContentLoader.prototype.loadXMLDoc=function(url,method,params,contentType){
  if (!method){
    method="GET";
  }
  if (!contentType && method=="POST"){
    contentType='application/x-www-form-urlencoded';
  }
  if (window.XMLHttpRequest){
    this.req=new XMLHttpRequest();
  } else if (window.ActiveXObject){
    this.req=new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (this.req){
    try{
      var loader=this;
      this.req.onreadystatechange=function(){
        net.ContentLoader.onReadyState.call(loader);
      }
      this.req.open(method,url,true);
      if (contentType){
        this.req.setRequestHeader('Content-Type', contentType);
      }
      this.req.send(params);
    }catch (err){
      this.onerror.call(this);
    }
  }
}


net.ContentLoader.onReadyState=function(){
  var req=this.req;
  var ready=req.readyState;
  if (ready==net.READY_STATE_COMPLETE){
    var httpStatus=req.status;
    if (httpStatus==200 || httpStatus==0){
      this.onload.call(this);
    }else{
      this.onerror.call(this);
    }
  }
}

net.ContentLoader.prototype.defaultError=function(){
  alert("There was a problem returning data from the server. This may be temporary, so please try again later. Here is some information about the status of this request:"
    +"\n\nreadyState:"+this.req.readyState
    +"\nstatus: "+this.req.status
    +"\nheaders: "+this.req.getAllResponseHeaders());
}

function showPreview(mediaID,medialinkID,path,entitystr,sitever) {
	if(jQuery('#prev'+entitystr).html() == "") {
		var caption_div = sitever != "mobile" ? '<div class=\"prev-caption\" id=\"capt' + entitystr + '\"></div>' : '<div class=\"prev-close\"><img id=\"close-' + entitystr + '\" src='+ cmstngpath + '"img/tng_close.gif"/></div>';
		// STATIC ARCHIVE FIX: on the live site this preview loaded a resized image
		// from ajx_smallimage.php, and that image's onload hid the "Loading..."
		// spinner. That PHP endpoint does not exist in the static archive, so the
		// onload never fired and the popup spun on "Loading..." forever. The real
		// image path is passed in as `path` and the file exists locally, so point
		// the preview straight at it (sized by the .media-prev img rule in CSS).
		// The enlarged image is given the "Open full size" trigger so that once
		// the pointer reaches it, a click opens the full-size lightbox.
		var imgsrc = cmstngpath + decodeURIComponent(path);
		jQuery('#prev'+entitystr).html('<a href="' + imgsrc + '" title="Open full size"><img src="' + imgsrc + '" alt=""/></a>' + caption_div);
		pageWidth = jQuery(window).width();
		parent = jQuery('#prev'+entitystr).parent();
		currX = parent.position().left;
		if(sitever == "mobile")
			jQuery('#prev'+entitystr).css('background-image','none')
		else if(currX + 490 > pageWidth) {
			width = parent.next().width() - 4;
			jQuery('#prev'+entitystr).css('right',width + 'px');
			jQuery('#prev'+entitystr).css('background-image','url(img/media-prevbg-rotated.png)')
		}
		// STATIC ARCHIVE FIX: removed the ajx_caption.php AJAX call that fetched
		// the popup title/description on the live site (dead endpoint here). The
		// description is already shown beside each thumbnail on the page.
		// Keep the preview open while the pointer is over it, so the user can
		// move from the thumbnail onto the enlarged image and click it.
		jQuery('#prev'+entitystr)
			.on('mouseenter', function(){ clearTimeout(previewCloseTimers[entitystr]); })
			.on('mouseleave', function(){ closePreview(entitystr); });
	}
	clearTimeout(previewCloseTimers[entitystr]);
	jQuery('#prev'+entitystr).fadeIn(100);
}

// STATIC ARCHIVE FIX: close the preview after a short delay rather than
// instantly, so the pointer can travel from the thumbnail (whose mouseout
// triggers the close) onto the preview popup without it vanishing first.
var previewCloseTimers = {};
function closePreview(entitystr) {
	clearTimeout(previewCloseTimers[entitystr]);
	previewCloseTimers[entitystr] = setTimeout(function(){
		jQuery('#prev'+entitystr).fadeOut(100);
	}, 260);
}

var loginOverlay;
function openLogin(url) {
	loginOverlay = new LITBox(url,{width:370, height:500, doneLoading:function(){setFocus('tngusername');}});
	return false;
}

function setFocus(field) {
	if(jQuery('#'+field).length)
		jQuery('#'+field).focus();
}

function sendLogin(form, url) {
	var params = jQuery(form).serialize();
	jQuery.ajax({
		url: url,
		data: params,
		dataType: 'json',
		success: function(vars){
			if(jQuery('#'+vars.div).length) {
				jQuery('#'+vars.div).html(vars.msg);
				jQuery('#'+vars.div).effect('highlight',{},400);
			}
		}
	});
	return false;
}

var newuserok = false;
function checkNewUser(userfield, olduserfield, submitform) {
	if(olduserfield && userfield.value == olduserfield.value) {
		jQuery('#checkmsg').html('');
		newuserok = true;
		return true;
	}
	else {
		var params = {checkuser: userfield.value};
		jQuery.ajax({
			url: 'ajx_checknewuser.php',
			data: params,
			dataType: 'json',
			success: function(vars){
				newuserok = vars.rval;
				if(newuserok) {
					if(submitform)
						document.editprofile.submit();
					else
						jQuery('#checkmsg').html('<span class=\"msgapproved\">' + vars.html + '</span>');
				}
				else
					jQuery('#checkmsg').html('<span class=\"msgerror\">' + vars.html + '</span>');
			}
		});
		return false;
	}
}

function checkEmail(email) {
	var domains = ",AC,AD,AE,AERO,AF,AG,AI,AL,AM,AN,AO,AQ,AR,ARPA,AS,AT,AU,AW,AX,AZ,BA,BB,BD,BE,BF,BG,BH,BI,BIZ,BJ,BM,BN,BO,BR,BS,BT,BV,BW,BY,BZ,CA,CAT,CC,CD,CF,CG,CH,CI,CK,CL,CM,CN,CO,COM,COOP,CR,CU,CV,CX,CY,CZ,DE,DEV,DJ,DK,DM,DO,DZ,EC,EDU,EE,EG,EMAIL,ER,ES,ET,EU,FI,FJ,FK,FM,FO,FR,GA,GB,GD,GE,GF,GG,GH,GI,GL,GM,GMX,GN,GOV,GP,GQ,GR,GS,GT,GU,GW,GY,HK,HM,HN,HR,HT,HU,ID,IE,IL,IM,IN,INFO,INT,IO,IQ,IR,IS,IT,JE,JM,JO,JOBS,JP,KE,KG,KH,KI,KM,KN,KR,KW,KY,KZ,LA,LB,LC,LI,LIMO,LK,LR,LS,LT,LU,LV,LY,MA,MC,MD,ME,MG,MH,MIL,MK,ML,MM,MN,MO,MOBI,MP,MQ,MR,MS,MT,MU,MUSEUM,MV,MW,MX,MY,MZ,NA,NAME,NC,NE,NET,NF,NG,NI,NL,NO,NP,NR,NU,NZ,OM,ONE,ONLINE,ORG,PA,PE,PF,PG,PH,PK,PL,PM,PN,PR,PRO,PS,PT,PW,PY,QA,RE,RO,RU,RW,SA,SB,SC,SD,SE,SG,SH,SI,SJ,SK,SL,SM,SN,SO,SR,ST,SU,SV,SY,SZ,TC,TD,TEL,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TP,TR,TRAVEL,TT,TV,TW,TZ,UA,UG,UK,UM,US,UY,UZ,VA,VC,VE,VG,VI,VN,VU,WF,WORLD,WS,YE,YT,YU,ZA,ZM,ZW,";
	var rval = /^\w+([\.\+-]*\w+)*@\w+([\.\+-]*\w+)*(\.\w{2,6})+$/.test(email);
	if(rval) {
		var thisdomain = email.substr(email.lastIndexOf(".")+1);
		rval = domains.indexOf(','+thisdomain.toUpperCase()+',') >= 0 ? true : false;
	}
	return rval;
}


if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
	     for (var i = (start || 0), j = this.length; i < j; i++) {
	         if (this[i] === obj) { return i; }
	     }
	     return -1;
	}
}

function openSearch() {
	jQuery('#searchdrop').slideToggle(200);
	jQuery('#searchfirst').focus();
	return false;
}

function goToPage(button, address, tree, perpage) {
	var pagenum = jQuery(button).prev(".tngpage").val();
	if(!isNaN(pagenum) && pagenum >= 1) {
		offset = (pagenum - 1) * perpage;
		window.location.href = address + '=' + offset + '&tree=' + tree + '&tngpage=' + pagenum;
	}
}

function pageEnter(field,e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return false;
	if(keycode == 13)
		return true;
	else
		return false;
}

function toggleMobileMenu(menuName) {
	var menu = jQuery('ul#m' + menuName + 'menu');
	if(menu.hasClass('on'))
		menu.removeClass('on');
	else {
		jQuery('.mhead ul').removeClass('on');
		menu.addClass('on'); 
	}
	return false;
}

function toggleCollapsed(collapsing) {
	jQuery('.toggleicon').each(function(index,item) {
		var targetId = $(item).attr('id');
		var affectedRows = jQuery('.' + targetId);
		if(!collapsing && $(item).attr('src').indexOf('desc') > 0) {
			$(item).attr('src',cmstngpath + "img/tng_sort_asc.gif");
			$(item).attr('title',collapse_msg);
			jQuery('.l' + targetId).attr('rowspan',affectedRows.length + 1);
			if(targetId.substring(0,1) == "m") {
				//jQuery('#dr'+targetId).show();
				jQuery('#ss'+targetId).show();
			}
			affectedRows.show();
		}
		else if(collapsing && $(item).attr('src').indexOf('asc') > 0) {
			$(item).attr('src',cmstngpath + "img/tng_sort_desc.gif");
			$(item).attr('title',expand_msg);
			jQuery('.l' + targetId).removeAttr('rowspan');
			if(targetId.substring(0,1) == "m") {
				//jQuery('#dr'+targetId).hide();
				jQuery('#ss'+targetId).hide();
			}
			affectedRows.toggle();
		}
	});
	return false;
}

var fileTimeoutId = 0;
function fpFilterChanged(event, searchTerm) {
	clearTimeout(fileTimeoutId);		

	var keycode;
	if(event) keycode = event.keyCode;
	else if(e) keycode = e.which;
	else return true;

	if(keycode == 9 || keycode == 13) return false;
	fileTimeoutId = setTimeout(function() {
		applyFileFilter(searchTerm)
	},500);
}

function applyFileFilter(searchTerm) {
	//use jQuery to get all file rows
	var termlen = searchTerm.length;
	jQuery('tr.filerow').each(function(index, item){
		if(jQuery(item).find('td.lightback.filecell').html().toLowerCase().includes(searchTerm.toLowerCase()))
			jQuery(item).show();
		else
			jQuery(item).hide();
	});

	return false;
}

function searchGoogleWebSite(sitedir)  {
    window.open("https://www.google.com/search?q=site:" + sitedir + " " + document.getElementById("GoogleText").value) ;
    return false;
}

jQuery(document).ready(function() {
	jQuery('li a.mobileicon').click(function() {
		jQuery('ul.on').each(function(index,item){
			jQuery(item).removeClass('on');
		})
	});
	jQuery('.toggleicon').click(function(e) {
		var target = jQuery(e.target);
		var targetId = target.attr('id');
		var affectedRows = jQuery('.' + targetId);
		if(target.attr('src').indexOf('desc') > 0) {
			target.attr('src',cmstngpath + "img/tng_sort_asc.gif");
			target.attr('title',collapse_msg);
			jQuery('.l' + targetId).attr('rowspan',affectedRows.length + 1);
		}
		else {
			target.attr('src',cmstngpath + "img/tng_sort_desc.gif");
			target.attr('title',expand_msg);
			jQuery('.l' + targetId).removeAttr('rowspan');
		}
		if(targetId.substring(0,1) == "m") {
			//jQuery('#dr'+targetId).toggle();
			jQuery('#ss'+targetId).toggle();
		}
		affectedRows.toggle();
	});
	$('.scroll-to-top').hide();
		//Check to see if the window is top if not then display button
		$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});
	$('.scroll-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});
});

// STATIC ARCHIVE: in-page image lightbox.
// On the live site, opening a media image full size showed it in a lightbox
// overlay with a close control. In the static archive those "Open full size"
// links were left as plain <a href="photo.jpg" target="_blank">, which dumped
// the visitor onto a chrome-less raw image with no obvious way back. Intercept
// those clicks and show the image in a simple overlay that dismisses on any
// click, on the X, or with the Esc key. Non-image targets are left untouched.
// Bound as a self-contained IIFE (not inside jQuery ready) so it does not
// depend on any other ready-callback succeeding first. The delegated handler
// only needs `document` (which exists now); the overlay is built lazily on
// first use, by which time <body> exists.
(function() {
	var ov = null;
	function lbClose() {
		if(ov) { ov.removeClass('open'); ov.find('img').attr('src', ''); }
	}
	function lbEnsure() {
		if(ov) return ov;
		ov = jQuery('<div id="archive-lightbox"><span class="al-close" title="Close">×</span><img alt=""><div class="al-caption"></div></div>');
		ov.on('click', lbClose);
		jQuery('body').append(ov);
		return ov;
	}
	jQuery(document).on('click', 'a[title="Open full size"]', function(e) {
		var href = jQuery(this).attr('href') || '';
		if(!/\.(jpe?g|png|gif)$/i.test(href)) return; // let non-images open normally
		e.preventDefault();
		jQuery('.media-prev').hide(); // dismiss any hover-preview popup underneath
		var o = lbEnsure();
		o.find('img').attr('src', href);
		o.find('.al-caption').text(jQuery(this).find('img').attr('alt') || '');
		o.addClass('open');
	});
	jQuery(document).on('keydown', function(e) {
		if((e.key === 'Escape' || e.keyCode === 27) && ov && ov.hasClass('open')) lbClose();
	});
})();