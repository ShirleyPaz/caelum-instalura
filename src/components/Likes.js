/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class Likes extends Component {
    
    carregaIcone = (likeada) => {
        if (likeada) {
            return require('../../resources/img/s2-checked.png')
        }
        return require('../../resources/img/s2.png')
    }


    exibeLikes = (likers) => {
        if (likers.length < 1)
            return

        return <Text style={styles.curtidas}>
            {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
        </Text>
    }

    render() {

        const { foto, likeCallback } = this.props

        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image
                        style={styles.botaoLike}
                        source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    botaoLike: {
        width: 40,
        height: 40,
    },
    curtidas: {
        fontWeight: 'bold',
    },
});

