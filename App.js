import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, } from 'react-native';
const pokemonsIniciais = [
  { id: 25, nome: "Pikachu"},
  { id: 6, nome: "Charizard"},
  { id: 200, nome: "Misdreavus"},
  { id: 3, nome: "Venusaur"},

];

export default function App() {
  const [ pokemonEscolhido, setPokemonEscolhido ] = useState([]);

  const getPokemonData = (idPokemon) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

    fetch(endpoint)
      .then(resposta => resposta.json())
        .then( json => {
          const pokemon = {
            nome: json.name,
            img: json.sprites.other["official-artwork"].front_default,
            altura: json.height,
          };

          setPokemonEscolhido(pokemon);
        })
        .catch(() => {
          Alert.alert('Não foi possível carregar os dados do Pokémon');
        });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {pokemonEscolhido != null && (
          <View style={styles.pokemonBox}>
            <Text style={styles.pokemonNome}>Nome: {pokemonEscolhido.nome}</Text>
            <Text style={styles.pokemonAltura}>Altura: {pokemonEscolhido.altura * 10}cm</Text>

            <Image resizeMode="stretch" source={{uri:pokemonEscolhido.img}} style={styles.pokemonImg} />
          </View>
        )}

        {pokemonsIniciais.map( pokemon => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{pokemon.nome}</Text>
            <Button color={'#E40A44'} title="Dados do pokémon" onPress={()=>getPokemonData(pokemon.id)}/>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1c' },

  cardContainer: { borderWidth: 1, borderColor: '#E40A44', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#fff', fontWeight:'bold' },

  pokemonBox: { alignItems: 'center', marginTop: 50 },
  pokemonNome: { fontSize: 22, color:'#fff' },
  pokemonAltura: { fontSize: 18, color:'#fff' },
  pokemonImg:{ width: 150, height: 150,}
});