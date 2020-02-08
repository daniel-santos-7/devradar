import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView,{Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';


export default function Main({navigation}) {

  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

  useEffect(()=> {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();     
      
      if (granted) {
        const location = await getCurrentPositionAsync({ enableHighAccuracy: true });
        const { latitude, longitude } = location.coords;
        setCurrentRegion({ latitude, longitude, latitudeDelta:0.04, longitudeDelta:0.04 });
      }


    }

    loadInitialPosition();
  },[]);

  useEffect(()=> {
    subscribeToNewDevs(dev=> setDevs([...devs, dev]))
  },[devs]);

  function setupWebsocket() {
    disconnect();
    const {latitude, longitude} = currentRegion;
    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', { params: { latitude, longitude, techs } });
    setDevs(response.data);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if(!currentRegion)
    return null;

  return (
    <>
      <MapView onRegionChangeComplete={handleRegionChanged} style={styles.map} initialRegion={currentRegion}>
        {devs.map((dev)=>(
        <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
          <Image style={styles.avatar} source={{uri:dev.avatar_url}}/>
          <Callout onPress={()=> { navigation.navigate('Profile', { github_username: dev.github_username }) }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devBio}>{dev.bio}</Text>
            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar desenvolvedores"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>
    </>
  );

}

const styles = StyleSheet.create({

  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }

});