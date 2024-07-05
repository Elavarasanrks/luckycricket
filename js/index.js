var isPendingInterstitial = false;
var isAutoshowInterstitial = false;

function prepareInterstitialAd() {	
    if (!isPendingInterstitial) { // We won't ask for another interstitial ad if we already have an available one
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}

function onAdLoadedEvent(e) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL && !isAutoshowInterstitial) {
        isPendingInterstitial = true;
    }
}

function onDeviceReady() {
	
  document.removeEventListener('deviceready', onDeviceReady, false);

  admob.setOptions({
    publisherId:           "ca-app-pub-7278086882360388/2187346353",  // Required
	interstitialAdId:      "ca-app-pub-7278086882360388/3664079551",  // Optional
	autoShowBanner:        true,                                      // Optional
	autoShowRInterstitial: false,                                     // Optional
	autoShowRewarded:      false,                                     // Optional
	tappxIdiOS:            "",            // Optional
	tappxIdAndroid:        "",        // Optional
	tappxShare:            0.5,
	isTesting:false,
	overlap:true,
  });  
  document.addEventListener(admob.events.onAdLoaded, onAdLoadedEvent);
  admob.createBannerView();
  prepareInterstitialAd();
}

document.addEventListener("deviceready", onDeviceReady, false);

function showInterstitialAd() {
    if (isPendingInterstitial) {
        admob.showInterstitialAd(function () {
                isPendingInterstitial = false;
                isAutoshowInterstitial = false;
                prepareInterstitialAd();
        });
    } else {
        // The interstitial is not prepared, so in this case, we want to show the interstitial as soon as possible
        isAutoshowInterstitial = true;
        admob.requestInterstitialAd({
            autoShowInterstitial: isAutoshowInterstitial
        });
    }
}

setTimeout(showInterstitialAd, 5000);

function shareAPP() {
  window.plugins.socialsharing.share('Please click on the below link to download the Drupal Interview - Google Play Store App', 'Drupal Interview - Google Play Store App', null , 'https://play.google.com/store/apps/details?id=com.elavarasanr.drupal.interview');
}


