function avgArray(arr) {
		var sum = 0, i = 0;
		while (i<arr.length) {
			sum += parseInt(arr[i]);
			++i;
		}

		return  sum/arr.length;
	}

function getRandomColorHex() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function generateUID() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
	var uid = '';

	for (var i=0; i<32; i++)
		uid += chars.charAt(Math.round(Math.random()*(chars.length-1)));
	
	return uid;
}