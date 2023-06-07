
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput, Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import api from '../../service/api';
import axios from 'axios';

function RevenuesNew() {

    const navigation = React.useContext(NavigationContext);
    const [revenue, setRevenue] = React.useState('');
    const onChangeText = revenue => setRevenue(revenue);
    const [online, setOnline] = React.useState(false);
    const [load, setLoad] = useState(true);

    async function AddRevenue() {      
        if (!revenue) {
            return alert('Nome da Receita é obigatorio');
        }
        var data = { 'description': revenue, 'status': 'Ativo' };
        var config = {
            method: 'POST',
            url: api.url_base_api + '/revenue',
            data: data
        };
        try {
            const response = await axios(config);
            if (response.status == 201) {
                navigation.navigate('Revenue');
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


    React.useEffect(() => {
        if (online == false) {
            Carregar();
        }
    }, [load, navigation]);


    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.container}>

                    <Card>
                        <Text style={styles.title}>Cadastro de Receitas</Text>
                        <Card.Content>
                            <View style={styles.buttonDespesa}>
                                <TextInput mode="outlined" label="Descrição" value={revenue} onChangeText={onChangeText} />
                                <Text>  </Text>
                                <Button icon="plus-box" mode="contained" onPress={() => AddRevenue()}>
                                    Salvar receita
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

export default RevenuesNew;

