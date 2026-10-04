#!/usr/bin/env bash
# Builds a signed APK without Gradle using the Android SDK build-tools.
# Requires: JAVA_HOME (JDK 17) and ANDROID_SDK with platforms;android-34 and build-tools;34.0.0.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SDK="${ANDROID_SDK:-/tmp/android/sdk}"
BT="$SDK/build-tools/34.0.0"
JAR="$SDK/platforms/android-34/android.jar"
OUT="$HERE/build"
DEST="$HERE/../public/downloads/hamara-baheri.apk"
KEYSTORE="$HERE/hamara-baheri.keystore"
KEY_PASS="${APK_KEY_PASS:-hamarabaheri}"

rm -rf "$OUT" && mkdir -p "$OUT/gen" "$OUT/classes" "$OUT/dex"

"$BT/aapt2" compile --dir "$HERE/res" -o "$OUT/res.zip"
"$BT/aapt2" link -o "$OUT/unsigned.apk" -I "$JAR" \
  --manifest "$HERE/AndroidManifest.xml" -R "$OUT/res.zip" --java "$OUT/gen" \
  --min-sdk-version 24 --target-sdk-version 34 --version-code 1 --version-name 1.0 --auto-add-overlay

javac -nowarn -source 8 -target 8 -bootclasspath "$JAR" -d "$OUT/classes" \
  $(find "$HERE/src" "$OUT/gen" -name '*.java') 2>&1 | grep -v "^warning" || true

"$BT/d8" --release --min-api 24 --lib "$JAR" --output "$OUT/dex" $(find "$OUT/classes" -name '*.class')
(cd "$OUT/dex" && zip -q "$OUT/unsigned.apk" classes.dex)

"$BT/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"

if [ ! -f "$KEYSTORE" ]; then
  keytool -genkeypair -keystore "$KEYSTORE" -alias hamarabaheri -keyalg RSA -keysize 2048 \
    -validity 10000 -storepass "$KEY_PASS" -keypass "$KEY_PASS" \
    -dname "CN=Kamal Kashyap, OU=Hamara Baheri, L=Gaurikheda, C=IN"
fi

mkdir -p "$(dirname "$DEST")"
"$BT/apksigner" sign --ks "$KEYSTORE" --ks-pass "pass:$KEY_PASS" --key-pass "pass:$KEY_PASS" \
  --out "$DEST" "$OUT/aligned.apk"
"$BT/apksigner" verify "$DEST"
rm -f "$DEST.idsig"
echo "APK ready: $DEST ($(du -h "$DEST" | cut -f1))"
