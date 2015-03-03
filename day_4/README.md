#Phonegap Continued

##Recap
- So far we've seen how you can use the device's native functionality through JavaScript commands.
- We will be building on these abilities with additional APIs, and also learn how deployment works.

##In-App Browser
- The in-app browser is helpful for launching any kind of web session inside of your app.
- A good use of this is when you need your users to navigate to an external webpage without leaving the app.
- An example may be to allow them to view a news article.
- Another great use case for an in-app browser is for an oAuth flow.
- This is how it works:

####First we provide a reference to the window

```
var windowRef = window.open("url here", "_blank", "location=yes");
```

- `_blank` tells the app to open a new window rather than load the page inside the current view.
- `location=yes` tells the in-app browser to display the location to the end user.

####We can close the window at any time

```
windowRef.close();
```

####We can also attach event listeners to detect window-related events

```
windowRef.addEventListener("loadstop", function(event) {
	console.log(event.url);
});
```

##oAuth with Phonegap
- With native applications you can integrate with the device's installed applications such as the Facebook app.
- Phonegap currently does not have any great plugins to do this, so an in-app browser is your best bet.
- An advantage of using oAuth via an in-app browser is that you can support unlimited providers.

##oAuth Flow with the In-App Browser
- Generally the oAuth flow is as follows:
	- Step 1: The app will open a new browser window and request a web service url passing a query string token and provider.
	- Step 2: The web service will store the token along with the authentication hash to the database.
	- Step 3: A request will be made to the web service passing along the token to retrieve the authentication hash.
	- Step 4: The web service will delete the token and authentication hash from the database.
- Your initial request may look like this:

```
http://daretodiscover.herokuapp.com/start_auth?token=1234&provider=facebook
```

##In-Class Exercise: Implementing oAuth
- In this exercise we will take our existing user manager app and add an oAuth component to it.
- Here are the steps you will need to follow:
	- Implement a "Login with Facebook" button that will direct the user to the above URL.
	- Make sure to replace the token with a randomly generated string that you create in JavaScript.
	- Think of how you may close the window after the authentication is successful. Hint: Use event.url to check the url contents. If the base URL is daretodiscover.herokuapp.com/auth/facebook/callback you can call the close method and assume that the authentication was successful. If the base url is /auth/failure you can simply close the window also.
	- If authentication was successful make a POST request to /get_auth with the token to receive the authentication hash.
	- If all checks out redirect the user to the member list page and set a title saying "Welcome, first_name last_name!"

##Geolocation
- The Geolocation API allows us to access the device's geolocation features such as the GPS and cell triangulation features.
- Let's take a look at the documentation [here](http://plugins.cordova.io/#/package/org.apache.cordova.geolocation).
- In order to use this feature we have to install the plugin:

```
cordova plugin add org.apache.cordova.geolocation
```

- This plugin also adds to the global `navigator` object to contain its methods.
- Let's take a look at the `getCurrentPosition` method:

```
navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

function onSuccess(position) {
	alert("Latitude: " + position.coords.latitude);
	alert("Longitude: " + position.coords.longitude);
}

function onError(error) {
	alert("Error Code: " + error.code);
}
```

- The options object also gives us control over a few key aspects:
	- enableHighAccuracy: Tells the application to give the best results when possible.
	- timeOut: Maximum time allotted between call to the `navigator` function and the success handler.
	- maximumAge: Accept cached position based on age of the result.

##In-Class Lab: Mapping
- In this lab we will be taking the latitude and longitude coordinates from the device and rendering a Google Map.
- For the Google Map you will need to use the Google Maps JavaScript API located [here](https://developers.google.com/maps/documentation/javascript/tutorial).
- Your mission is to give the user a button they can click on that will render a map of their current location.

##Deploying to Google Play
- In order to deploy to the Google Play store you need to first have a [developer account](http://developer.android.com/distribute/googleplay/start.html).
- Once you have that you can begin to build the app and upload it through the platform.
- There are 4 main steps to get the app on the store: build it in release mode, jarsign it, zipalign it, and submit the APK to Google Play.
- Let's take a look at the signing docs [here](http://developer.android.com/tools/publishing/app-signing.html).
- Here are the steps we will take:
	- Step 1: Build the app in release mode: `cordova build --release`
	- Step 2: Create a signing key: `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
	- Step 3: Jarsign the app: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore my_application.apk alias_name`
	- Step 4: Zipalign the app: `zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk`
- When all of these processed are complete you can submit the new APK to the Google Play store through the developer console.