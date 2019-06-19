import React from "react";
import { View } from "react-native";
import RNFS from "react-native-fs";

import { MemexWebView } from "../../components/web-view";
import { AddressBar } from "../../components/address-bar";
import { StatefulUIElement } from "src/ui/types";
// import { injectScript } from "src/features/content_script/script-injector";
import Logic, { State, Event } from "./logic";
import styles from "./styles";

interface Props {}

export default class HomeScreen extends StatefulUIElement<Props, State, Event> {
  webView = null;

  constructor(props: Props) {
    super(props, { logic: new Logic() });
  }

  async readInputFile({
    bundleName = "ContentScript.bundle",
    scriptName = "index.js"
  }) {
    const bundles = await RNFS.readDir(RNFS.MainBundlePath);
    const contentScriptBundle = bundles.find(
      bundle => bundle.name === bundleName
    );

    if (!contentScriptBundle) {
      throw new Error();
    }

    const bundleFiles = await RNFS.readDir(contentScriptBundle.path);
    const contentScript = bundleFiles.find(
      file => file.isFile() && file.name === scriptName
    );

    if (!contentScript) {
      throw new Error();
    }

    return RNFS.readFile(contentScript.path);
  }

  handleLoadEnd = async e => {
    const content = await this.readInputFile({});
    this.webView.injectJavaScript(content);
  };

  render() {
    return (
      <View style={styles.container}>
        <AddressBar
          onTextChange={text =>
            this.processEvent("setAddressBarText", { text })
          }
          onEnterPress={url => this.processEvent("setCurrentUrl", { url })}
          value={this.state.addressBarText}
        />
        <MemexWebView
          ref={el => (this.webView = el)}
          // injectedJavaScript={injectScript({})}
          onLoadEnd={this.handleLoadEnd}
          currentUrl={this.state.currentUrl}
          updateAddressBar={url =>
            this.processEvent("setAddressBarText", { text: url })
          }
        />
      </View>
    );
  }
}
