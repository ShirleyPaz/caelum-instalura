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
    TouchableOpacity
} from 'react-native';


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        }

    }

    exibeLikes = (likers) => {
        if (likers.length < 1) 
            return

        return <Text style={styles.curtidas}>
            {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
        </Text>
    }

    carregaIcone = (likeada) => {
        if (likeada) {
            return require('../../resources/img/s2-checked.png')
        }
        return require('../../resources/img/s2.png')
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


    render() {

        const { foto } = this.state;

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
                    <TouchableOpacity onPress={this.like}>
                        <Image
                            style={styles.botaoLike}
                            source={this.carregaIcone(foto.likeada)} />
                    </TouchableOpacity>
                    {this.exibeLikes(foto.likers)}
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
        marginRight: 0,
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
});

