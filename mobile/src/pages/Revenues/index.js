
import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, MD2Colors, Text, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import api from '../../service/api';
import axios from 'axios';

function Revenues() {


    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [load, setLoad] = useState(true);
    const [tempo, setTempo] = useState(true);
    const [online, setOnline] = React.useState(false);

    const navigation = React.useContext(NavigationContext);
    const [Revenues, setRevenues] = useState([]);

    async function loadRevenue() {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/revenue',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setRevenues(response.data);
                navigation.navigate('Revenue');
            }
            ContagemTempo();
        } catch (error) {
           // alert('Ops! ocorreu algum erro');
        }
    }

    async function Carregar() {
        if (online === false) {
            var config = {
                method: 'GET',
                url: api.url_base_api + '/'
            };
            try {
                const response = await axios(config);
                if (response.status == 200) {
                    setOnline(true);
                } else {
                    navigation.navigate('SysOnline')
                }
            } catch (error) {
                navigation.navigate('SysOnline')
            }
        } else {

        }
    }


    useEffect(() => {
        if (online == false) {
            Carregar();
        } 
        loadRevenue();
    }, [load, navigation]);

    async function DelelenRevenue(id) {
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/revenue/' + id
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadRevenue();
                navigation.navigate('revenue');
            }
        } catch (error) {
           // alert('Ops! ocorreu algum erro');
        }
    }

    
    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 2000);
    }

    async function confirmDelete(id) {
        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir essa Despesa?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        DelelenRevenue(id);
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    }


    if (tempo == true) {
        return (
            <View style={{ marginTop: 250 }}>
                <ActivityIndicator size={'large'} animating={true} color={MD2Colors.deepPurpleA700} />
                <Text> </Text>
                <Text style={{ textAlign: 'center' }}>Carregando aguarde...</Text>
            </View>
        )
    } else {
        return (

            <>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Card>
                            <Text style={styles.title}>Lista de receitas</Text>
                            <Card.Content>
                                <View style={styles.buttonDespesa}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title>Descrição</DataTable.Title>
                                            <DataTable.Title numeric> </DataTable.Title>
                                        </DataTable.Header>

                                        {
                                            Revenues.map((item, i) =>
                                                <>
                                                    <DataTable.Row>
                                                        <DataTable.Cell>{item.description}</DataTable.Cell>
                                                        <Button mode="Text" onPress={() => confirmDelete(item.id)}>Excluir</Button>
                                                    </DataTable.Row>
                                                    <Text>  </Text>
                                                </>
                                            )}
                                    </DataTable>
                                </View>
                            </Card.Content>
                        </Card>

                    </ScrollView>
                </SafeAreaView>
                <Portal>
                    <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'close' : 'plus'}
                        actions={[
                            {
                                icon: 'plus-box',
                                label: 'Nova Receita',
                                onPress: () => { navigation.navigate('RevenuesNew') },
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
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

export default Revenues;

