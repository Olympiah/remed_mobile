// import { Text, View } from 'react-native'
import React from 'react';
import { View, Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview'

const Paypal = () => {
  
    // render() 
    // {
        const { localUri } = Asset.fromModule(require('../Payment/paypal.html'));

        return (
            <View style={{ flex: 1 }}>
                <WebView
                    style={{ overflow: 'scroll' }}
                    source={
                        Platform.OS === 'android' ?
                            {
                                uri: localUri.includes('ExponentAsset') ?
                                    localUri :
                                    'file:///android_asset/' + localUri.substr(9),
                            } :
                            require('./paypal.html')
                    }
                    originWhitelist={["*"]}
                    mixedContentMode={'always'}
                    useWebKit={Platform.OS == 'ios'}
                    // onLoadEnd={() => this.passValues()}
                    useRef= 'Webview'
                    thirdPartyCookiesEnabled={true}
                    scrollEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    // injectedJavaScript={this.patchPostMessageJsCode}
                    allowUniversalAccessFromFileURLs={true}
                    onMessage={(event) => this.handleMessage(event)}
                    // onNavigationStateChange={(event) => this.handleNavigation(event)}
                    javaScriptEnabled={true} />
            </View>
        );
        
    // }
}
export default Paypal

