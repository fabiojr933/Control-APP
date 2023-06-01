
import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, MD2Colors, Text, Button, DataTable, FAB, Portal, Provider } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../service/api';
import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';

function Expenses() {


    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [load, setLoad] = useState(true);
    const [tempo, setTempo] = useState(false);
    const [online, setOnline] = React.useState(false);
    const navigation = React.useContext(NavigationContext);
    const [Expense, setExpense] = useState([]);

    async function loadExpense() {
        setTempo(true)
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/expense',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setExpense(response.data);
                navigation.navigate('Expense');
            }
            ContagemTempo();
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 2000);
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
        loadExpense();
    }, [load, navigation]);

    async function DeleleExpense(id) {
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/expense/' + id
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                navigation.navigate('Cartao');
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function confirmDelete(id) {
        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir essa Despesa?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        DeleleExpense(id);
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

            <Provider >
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Card>
                            <Text style={styles.title}>Lista de depesas</Text>
                            <Card.Content>
                                <View style={styles.buttonDespesa}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title>Descrição</DataTable.Title>
                                            <DataTable.Title numeric> </DataTable.Title>
                                        </DataTable.Header>

                                        {
                                            Expense.map((item, i) =>
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
                                label: 'Nova Despesa',
                                onPress: () => { navigation.navigate('ExpensesNew') },
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
            </Provider>

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

export default Expenses;

