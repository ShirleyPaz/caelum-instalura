/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    FlatList
} from 'react-native';


export default class Post extends Component {
    render() {

        return (
            <View>
                <View style={styles.header}>
                    <Image style={styles.fotoDePerfil}
                        source={{uri: this.props.fotos.urlPerfil}}
                    />
                    <Text>{this.props.fotos.loginUsuario}</Text>
                </View>

                <Image
                    source={{uri: this.props.fotos.urlFoto}}
                    style={styles.fotoDoPost} />
            </View>
        );
    }
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        margin: 10,
        width: 40,
        height: 40,
        borderRadius: 20
    },
    fotoDoPost: {
        width: screen.width,
        height: screen.width
    }

});

