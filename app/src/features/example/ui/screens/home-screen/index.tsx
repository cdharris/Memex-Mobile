import React from "react";
import { View } from "react-native";
import RNFS from "react-native-fs";

import { MemexWebView } from "../../components/web-view";
import { AddressBar } from "../../components/address-bar";
import { StatefulUIElement } from "src/ui/types";
import { injectScripts } from "src/features/content_script/script-injector";
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
    this.webView.injectJavaScript(injectScripts({
      srcs: [
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
        'https://unpkg.com/react@16/umd/react.development.js',
      ]
    }))

    const content = await this.readInputFile({});
    console.log(content.length)
    this.webView.injectJavaScript(content + '; true;');
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
