import React from 'react';
import { View } from 'react-native';

import { WebView } from '../../components/web-view'
import { AddressBar } from '../../components/address-bar'
import { StatefulUIElement } from 'src/ui/types'
import Logic, { State, Event } from './logic';
import styles from './styles'

interface Props {
}

export default class HomeScreen extends StatefulUIElement<Props, State, Event> {
    constructor(props : Props) {
        super(props, { logic: new Logic() })
    }

    render() {
        return (
            <View style={styles.container}>
              <AddressBar
                onTextChange={text => this.processEvent('setAddressBarText', { text })}
                onEnterPress={url => this.processEvent('setCurrentUrl', { url })}
                value={this.state.addressBarText}
              />
              <WebView
                currentUrl={this.state.currentUrl}
                updateAddressBar={url => this.processEvent('setAddressBarText', { text: url })}
              />
           </View>
        );
      }
}
