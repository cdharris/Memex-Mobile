import React from 'react';
import { WebView as OrigWebView, WebViewProps } from 'react-native-webview';

import styles from './web-view.styles'

export interface Props extends WebViewProps {
    currentUrl: string
    updateAddressBar: (url: string) => void
}

export const WebView = ({ currentUrl, updateAddressBar, ...props }: Props) => (
    <OrigWebView
        {...props}
        useWebKit
        style={styles.webView}
        source={{ uri: currentUrl }}
        onNavigationStateChange={({ url  }) => {
            updateAddressBar(url)
        }}
      />
)
