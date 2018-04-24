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
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto,
        }

    }

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

    like = () => {
        const { foto } = this.state;
        let novaLista = [];

        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                { login: 'meuUsuario' }
            ]
        }
        else {
            novaLista = foto.likers.filter(liker => liker.login !== 'meuUsuario')
        }

        const fotoAtualiza = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }

        this.setState({ foto: fotoAtualiza });
    }

    adicionaComentario = (valorComentario) => {

        if (valorComentario === '')
            return;

        const novaLista = [
            ...this.state.foto.comentarios,
            {
                id: Math.random(),
                login: 'meuUsuario',
                texto: valorComentario,
            }
        ]

        const fotoAtualiza = {
            ...this.state.foto,
            comentarios: novaLista,
        }
        //logica
        this.setState({ foto: fotoAtualiza })
    }


    render() {

        const { foto } = this.state

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
                    <Likes likesCallback={this.like} foto={foto} />

                    {this.exibeLegenda(foto)}
                    
                    {foto.comentarios.map((comentario) =>
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>
                                {comentario.login}
                            </Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <InputComentario comentarioCallback={this.adicionaComentario} />
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

