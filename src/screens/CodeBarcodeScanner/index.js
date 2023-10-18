import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import BarcodeScanner from 'react-native-scan-barcode';

export default class BarcodeScannerScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            torchMode: 'off',
            cameraType: 'back',
        };
    }

    barcodeReceived(e) {
        console.log('Barcode: ' + e.data + ' ||  Type: ' + e.type);
    }

    render() {
        return (
            <BarcodeScanner
                onBarCodeRead={this.barcodeReceived}
                style={{ flex: 1 }}
                torchMode={this.state.torchMode}
                cameraType={this.state.cameraType}
            />
        );
    }
}


