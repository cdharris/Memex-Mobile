import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';

import styles from './web-view.styles'

export interface Props extends WebViewProps {
    currentUrl: string
    updateAddressBar: (url: string) => void
}

export const MemexWebView = React.forwardRef<WebView, Props>(
    ({ currentUrl, updateAddressBar, ...props }, ref) => (
        <WebView
            {...props}
            ref={ref}
            useWebKit
            style={styles.webView}
            source={{ uri: currentUrl }}
            onNavigationStateChange={({ url  }) => {
                updateAddressBar(url)
            }}
        />
    )
)
