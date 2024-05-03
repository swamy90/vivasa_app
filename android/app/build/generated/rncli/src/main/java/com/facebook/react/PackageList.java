
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/checkbox
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-firebase/analytics
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/crashlytics
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsPackage;
// @react-native-firebase/database
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
// @react-native-firebase/dynamic-links
import io.invertase.firebase.dynamiclinks.ReactNativeFirebaseDynamicLinksPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-exit-app
import com.github.wumke.RNExitApp.RNExitAppPackage;
// react-native-full-screen-notification-incoming-call
import com.reactnativefullscreennotificationincomingcall.FullScreenNotificationIncomingCallPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-location
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
// react-native-google-pay
import com.busfor.RNGooglePayPackage;
// react-native-id-qrcodeview
import com.qrcode.view.QRCodePackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-kommunicate-chat
import io.kommunicate.app.RNKommunicateChatPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-otp-auto-fill
import com.reactnativeotpautofill.OtpAutoFillPackage;
// react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-razorpay
import com.razorpay.rn.RazorpayPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-scan-barcode
import com.safaeean.barcodescanner.BarcodeScannerPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-track-player
import com.doublesymmetry.trackplayer.TrackPlayer;
// react-native-version-check
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new ReactCheckBoxPackage(),
      new RNDateTimePickerPackage(),
      new RNCMaskedViewPackage(),
      new ReactNativeFirebaseAnalyticsPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseCrashlyticsPackage(),
      new ReactNativeFirebaseDatabasePackage(),
      new ReactNativeFirebaseDynamicLinksPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new RNDeviceInfo(),
      new RNExitAppPackage(),
      new FullScreenNotificationIncomingCallPackage(),
      new RNGestureHandlerPackage(),
      new ReactNativeGetLocationPackage(),
      new RNGooglePayPackage(),
      new QRCodePackage(),
      new PickerPackage(),
      new RNKommunicateChatPackage(),
      new LinearGradientPackage(),
      new OtpAutoFillPackage(),
      new ReactNativePushNotificationPackage(),
      new RazorpayPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new BarcodeScannerPackage(),
      new RNScreensPackage(),
      new RNSoundPackage(),
      new TrackPlayer(),
      new RNVersionCheckPackage(),
      new RNCWebViewPackage()
    ));
  }
}
