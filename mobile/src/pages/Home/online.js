
import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, MD2Colors, Text, Button } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import IP from '../../service/ip';
import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';

function Online() {

    const [tempo, setTempo] = React.useState(true);
    const [load, setLoad] = React.useState(null);
    const navigation = React.useContext(NavigationContext);

    async function loadOnline() {
        setTempo(true)
        ContagemTempo();
    }

    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 5000);
    }

    async function carregar() {
        setTempo(true);
        VerificaConexao()
    }


    useEffect(() => {
        loadOnline();
    }, [load, navigation]);

    async function VerificaConexao() {
        var config = {
            method: 'GET',
            url: api.url_base_api + '/'
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Atenção', 'Seu celular esta offline, verifique sua internet');
            }
        } catch (error) {
            Alert.alert('Atenção', 'Seu celular esta offline, verifique sua internet');
        }
    }


    if (tempo == true) {
        return (
            <View style={{ marginTop: 250 }}>
                <ActivityIndicator size={'large'} animating={true} color={MD2Colors.deepPurpleA700} />
                <Text> </Text>
                <Text style={{ textAlign: 'center' }}>Vericando conexão com o servidor.</Text>
                <Text style={{ textAlign: 'center' }}>Servidor aparentemente OFFLINE.</Text>
                <Text style={{ textAlign: 'center' }}>Aguarde...</Text>
            </View>
        )
    } else {
        return (

            <>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.container}>
                            <Card>
                                <Card.Content>
                                    <Text variant="titleLarge">Servidor OFFLINE</Text>
                                    <Text> </Text>
                                    <Text variant="bodyMedium">Não foi possivel obter conexao com a internet.</Text>
                                    <Text variant="bodyMedium">Verifique sua conexão com a INTERNET</Text>
                                    <Text></Text>
                                    <Text></Text>
                                </Card.Content>
                                <Card.Cover style={{ height: 350 }} source={{ uri: 'https://private-user-images.githubusercontent.com/41793614/242353065-07bdbdda-bf05-4922-a8d1-5a9d2d823069.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2MTQ4MzA0LCJuYmYiOjE2ODYxNDgwMDQsInBhdGgiOiIvNDE3OTM2MTQvMjQyMzUzMDY1LTA3YmRiZGRhLWJmMDUtNDkyMi1hOGQxLTVhOWQyZDgyMzA2OS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYwN1QxNDI2NDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04NzMwYjEyYzc0YWY2M2I4NTNkMWE1YzM4YjExMTU3OTRlZDA2Yjc2YjdiNDQwY2RlNjZkYTFjNmY4ZTU0NmM0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.mxKtXic5qzBymNhy3q2WgcSdJddd08envrwt9ny0JTs' }} />
                                <Card.Actions>
                                    <Text></Text>
                                    <Text></Text>
                                    <Button onPress={() => VerificaConexao()} style={{ marginTop: 20, marginBottom: 20 }} mode="contained" >Verificar novamente </Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>

        );
    }



}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        margin: 10,
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonDespesa: {
        padding: 20
    }
})

export default Online;

