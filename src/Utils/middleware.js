export const postMessage = (event, data) => {
	console.log("posting message from iframe..");
	console.log(event, data);
	try {
		// window.webkit.messageHandlers[event].postMessage(data);
		let msg = {};
		msg[event] = data;
		window.top.postMessage(
			JSON.stringify(msg),
			'*'
		  );
	} catch(err) {
		console.log('The native context does not exist yet');
	}
};