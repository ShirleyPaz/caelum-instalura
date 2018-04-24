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
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';

import InputComentario from './InputComentario'
import Likes from './Likes'


export default class Post extends Component {

    exibeLegenda = (foto) => {
        if (foto.comentario === '')
            return;

        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>
                    {foto.loginUsuario}
                </Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    render() {

        const { foto, likeCallback, comentarioCallback } = this.props

        return (
            <View>
                <View style={styles.header}>
                    <Image style={styles.fotoDePerfil}
                        source={{ uri: foto.urlPerfil }}
                    />
                    <Text>{foto.loginUsuario}</Text>
                </View>

                <Image
                    source={{ uri: foto.urlFoto }}
                    style={styles.fotoDoPost} />

                <View style={styles.rodape}>
                    <Likes likeCallback={likeCallback} foto={foto} />

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map((comentario) =>
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>
                                {comentario.login}
                            </Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <InputComentario comentarioCallback={comentarioCallback} idFoto={foto.id} />
                </View>
            </View>
        )
    }
}


const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
    header: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    fotoDoPost: {
        width: screen.width,
        height: screen.width
    },
    rodape: {
        margin: 10,
    },
    botaoLike: {
        width: 40,
        height: 40,
    },
    curtidas: {
        fontWeight: 'bold',
    },
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 10,
    },
});

