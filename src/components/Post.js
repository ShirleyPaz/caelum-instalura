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


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto,
            valorComentario: '',
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

    adicionaComentario = (inputComentario) => {
        
        if(this.state.valorComentario === '') 
            return;
        
        const novaLista = [
            ...this.state.foto.comentarios,
            {
                id: Math.random(),
                login: 'meuUsuario',
                texto: this.state.valorComentario,
            }
        ]

        const fotoAtualiza = {
            ...this.state.foto,
            comentarios: novaLista,
        }
        //logica
        this.setState({foto: fotoAtualiza, valorComentario: ''})
        this.inputComentario.clear();
    }


    render() {

        const { foto } = this.state

        return (
            <View>
                <View style={styles.header}>
                    <Image style={styles.fotoDePerfil}
                        source={{uri: foto.urlPerfil}}
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
                    {this.exibeLegenda(foto)}
                    {foto.comentarios.map((comentario) =>
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>
                                {comentario.login}
                            </Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <View style={styles.novoComentario}>
                        <TextInput style={styles.input}
                            placeholder='Adicione um comentário...'
                            underlineColorAndroid="transparent"
                            ref={input => this.inputComentario = input}
                            onChangeText={texto => this.setState({ valorComentario: texto })} />
                        <TouchableOpacity onPress={this.adicionaComentario}>
                            <Image style={styles.botaoComentario}
                                source={require('../../resources/img/send.png')} />
                        </TouchableOpacity>
                    </View>
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
    input: {
        flex: 1,
        height: 40,
    },

    botaoComentario: {
        width: 30,
        height: 30,
    },
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },

});

