const PublicKey = "BP7G7OBxws2hNEU0hUhg1aYtyY2ni0LTtxcv9WmWY8oW23dzz-SVnduWynAbPolhXEw77vH3BVonhlNjJpFvzac";

//check for service worker

if ('serviceWorker' in navigator) {
    send().catch(err=> console.error(err));
}

//register the service worker, register Push, Send the Notification
async function send(){
    console.log("Registering the service worker");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log("Service worker registered...")

    //register push
    console.log("Registering Push...")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PublicKey
    })
    console.log("Push registererd...")

    //send push notification
    console.log("Sending Push notifications...")

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log("Push sent...")
}