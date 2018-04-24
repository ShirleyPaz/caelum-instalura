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

import Post from './src/components/Post'

const screen = Dimensions.get('screen');

export default class InstaluraMobile extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  buscaPorId = (idFoto) => {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)
  
    return foto
  }

  atualizaFotos = (fotoAtualiza) => {
    let fotos = this.state.fotos.map(foto => foto.id === fotoAtualiza.id ? fotoAtualiza : foto)
    this.setState({ fotos });
  }

  componentDidMount() {
    fetch('http:192.168.0.137:8080///api/public/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))
    // https://instalura-api.herokuapp.com/api/public/fotos/rafael
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto)

    let novaLista = [];

    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'meuUsuario' }
      ]
    }
    else {
      novaLista = foto.likers.filter(liker => liker.login !== 'meuUsuario')
      //retorna todos os elementos do array para os quais o resultado é true
    }

    const fotoAtualiza = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    this.atualizaFotos(fotoAtualiza)
  }

  adicionaComentario = (idFoto, valorComentario) => {
    const foto = this.buscaPorId(idFoto)

    if (valorComentario === '')
      return;

    const novaLista = [
      ...foto.comentarios,
      {
        id: Math.random(),
        login: 'meuUsuario',
        texto: valorComentario,
      }
    ]

    const fotoAtualiza = {
      ...foto,
      comentarios: novaLista,
    }
    //logica
    this.atualizaFotos(fotoAtualiza);
  }


  render() {

    return (
      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like}
            comentarioCallback={this.adicionaComentario} />
        } />
    );
  }
}

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);