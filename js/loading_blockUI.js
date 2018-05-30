$(document).ready(function() {
	$('#Bt_submit').click(function() { 
		$.blockUI({ message: "<h3><img src=./images/loading.gif>Loading...<img src=./images/loading.gif></h3>"}); 
	}); 
	$('#Bt_SignOut').click(function() {
 		$.blockUI({ message: "<h3><img src=./images/loading.gif>Sign Out...<img src=./images/loading.gif></h3>"});
	});
	$('#firmware_update').click(function() {
		$.blockUI({ message: "<h3><img src=./images/loading.gif>Updating...<img src=./images/loading.gif></h3>"});
		setTimeout($.unblockUI, 110000);
	});
	$('#reset_default_all').click(function() {
		$.blockUI({ message: "<h3><img src=./images/loading.gif>Restore to Default<img src=./images/loading.gif></h3>"});
		setTimeout($.unblockUI, 110000);
	});
	$('#start_reboot').click(function() {
		$.blockUI({ message: "<h3><img src=./images/loading.gif>Reboot Now!<img src=./images/loading.gif></h3>"});
		setTimeout($.unblockUI, 110000);
	});
	$('#usb_format').click(function() { 
		$.blockUI({ message: "<h3><img src=./images/loading.gif>Disk Formatting...<img src=./images/loading.gif></h3>"}); 
	}); 
}); 

