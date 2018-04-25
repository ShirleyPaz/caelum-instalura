import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    FlatList,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';


export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: '',
        }
    }


    efetuarLogin = () => {
        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha,
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })
        }

        //https://instalura-api.herokuapp.com/api/public/login
        const uri = 'http://192.168.0.137:8080/api/public/login'
        fetch(uri, request)
            .then(response => {
                if (!response.ok)
                    throw new Error('Não foi possível efetuar login');
                return response.text()
            })
            .then(token => {
                const usuario = {
                    nome: this.state.usuario,
                    token
                }
                AsyncStorage.setItem('usuario', JSON.stringify(usuario))
                console.warn(usuario)
                /*  AsyncStorage.getItem('usuario')
                     .then(usuarioStringfied => JSON.parse(usuarioStringfied))
                     .then(usuario => console.log(usuario.nome)) */
            })
            .catch(error => {
                this.setState({ validacao: error.message })
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../resources/img/send.png')} />
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        placeholder='Usuário...'
                        onChangeText={texto => this.setState({ usuario: texto })}
                    />
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder='Senha...'
                        onChangeText={senha => this.setState({ senha: senha })}
                    />
                    <Button title='Login' onPress={this.efetuarLogin} />
                </View>
                <Text style={styles.validacao}>{this.state.validacao}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    form: {
        width: Dimensions.get('screen').width * 0.8

    },
    input: {
        height: 40
    },
    validacao: {
        color: 'red',
    }
})

