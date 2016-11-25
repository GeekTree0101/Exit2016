echo "\n React-native Dev mode \n"

fuser -k -n tcp 8081 # kill server
node node_modules/react-native/local-cli/cli.js start & #start server
react-native-css -i ./app/stylesheet/android.core.scss -o ./android.style.js # run react-native-css
gulp watch # watching ./app directory

echo "[+] enjoy!"