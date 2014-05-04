/*Math*/
function avgArray(arr) {
		var sum = 0, i = 0;
		if (arr.length === 0) return null;

		while (i<arr.length) {
			sum += parseInt(arr[i]);
			++i;
		}

		return  sum/arr.length;
}


function to_rad(deg) {
    return deg * Math.PI / 180;
}


function variance(arr) {
        
        if (arr.length === 0) return null;

        var mean_value = avgArray(arr),
            deviations = [];
         
        var i = 0;
        while(i < arr.length) {
            deviations.push(Math.pow(arr[i] - mean_value, 2));
            ++i;
        }
        
       
        return avgArray(deviations);
}


function standard_deviation(arr) {
        
        if (arr.length === 0) return null;

        return Math.sqrt(variance(arr));
}

/*Colors*/

function getRandomColorHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function getRandomColorRGB() {
	return [Math.round(Math.random() * 256), Math.round(Math.random() * 256), Math.round(Math.random() * 256)];
}

/*DOM*/
function generateUID() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
	var uid = '';

	for (var i=0; i<32; i++)
		uid += chars.charAt(Math.round(Math.random()*(chars.length-1)));
	
	return uid;
}
/*Data*/
function preloadImages(images, countCallback, callback) {
    
    var count  = images.length;
    
   

    for(var n = 0 ; n < images.length ; n++) {
      var image = images[n];
      assets[n] = document.createElement('img');
      
      assets[n].src = image;
      assets[n].addEventListener('load', function() {
      	--count;
      	if(countCallback != undefined && typeof countCallback == 'function') countCallback(Math.round((1-count/images.length)*100));
      	if (count == 0) {
      		if(callback != undefined && typeof callback == 'function') callback();
      	}
      })
    }

}