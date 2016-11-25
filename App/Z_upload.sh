echo "\n React-Native upload to Android \n"

fuser -k -n tcp 8081
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.map --assets-dest android/app/src/main/res/
react-native-css -i ./app/stylesheet/android.core.scss -o ./android.style.js

echo "\n [+] UPLOAD TO ANDROID \n"
react-native run-android

echo "[+] done"