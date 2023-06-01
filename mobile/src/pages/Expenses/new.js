
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import api from '../../service/api';
import axios from 'axios';

function ExpensesNew() {

    const navigation = React.useContext(NavigationContext);
    const [expense, setExpense] = React.useState('');
    const onChangeText = expense => setExpense(expense);
    const [online, setOnline] = React.useState(false);
    
    async function AddDespesa() {
        if (!expense) {
            return alert('Despesa é obigatorio');
        }
        var data = { 'description': expense, 'status': 'Ativo' };
        var config = {
            method: 'POST',
            url: api.url_base_api + '/expense',
            data: data
        };
        try {
            const response = await axios(config);
            if (response.status == 201) {
                navigation.navigate('Expense');
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
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
    }, [load, navigation]);


    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.container}>

                    <Card>
                        <Text style={styles.title}>Cadastro de Despesas</Text>
                        <Card.Content>
                            <View style={styles.buttonDespesa}>
                                <TextInput mode="outlined" label="Descrição" value={expense} onChangeText={onChangeText} />
                                <Text>  </Text>
                                <Button icon="plus" mode="contained" onPress={() => AddDespesa()}>
                                    Salvar despesa
                                </Button>
                                <Text>  </Text>
                            </View>
                        </Card.Content>
                    </Card>

                    <Text>  </Text>
                </View>





            </ScrollView>
        </SafeAreaView>
    );

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

export default ExpensesNew;

