import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://adorable-sfogliatella-b1f63b.netlify.app/" }}
        style={styles.webview}
        allowsInlineMediaPlayback // For camera to work
        mediaPlaybackRequiresUserAction={false} // Auto-allow camera
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // Adjust for status bar if needed
  },
  webview: {
    flex: 1,
  },
});
