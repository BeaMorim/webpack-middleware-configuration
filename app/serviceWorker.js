export function register() {

	/* 
    * Checks to see if the service worker API is available, and if it is, 
    * the service worker at /sw.js is registered once the page is loaded 
    */
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register('/service-worker.js').then(
				function() {
					/* Registration was successful */
				}, function(err) {
					/* Registration failed */
					console.log('ServiceWorker registration failed: ', err);
				});
		});
	}
}
