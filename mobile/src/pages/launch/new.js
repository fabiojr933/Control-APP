
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Card, TextInput, Text, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import api from '../../service/api';
import { NavigationContext } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import moment from 'moment';
const LaunchNew = () => {
    const navigation = React.useContext(NavigationContext);

    const [mesItems, mesSetItems] = React.useState([
        { label: 'Janeiro', value: '01' },
        { label: 'Fevereiro', value: '02' },
        { label: 'Março', value: '03' },
        { label: 'Abril', value: '04' },
        { label: 'Maio', value: '05' },
        { label: 'Junho', value: '06' },
        { label: 'Julho', value: '07' },
        { label: 'Agosto', value: '08' },
        { label: 'Setembro', value: '09' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Desembro', value: '12' },

    ]);


    const [checked, setChecked] = React.useState(false);
    const [revenue, setRevenue] = React.useState([]);
    const [expense, setExpense] = React.useState([]);
    const [revenueSelected, setRevenueSelected] = React.useState('');
    const [expenseSelected, setExpenseSelected] = React.useState('');
    const [value, setValue] = React.useState('');
    const [typeSelected, setTypeSelected] = React.useState('');
    const [type, setType] = React.useState([
        { key: 'Saida', value: 'Saida' },
        { key: 'Entrada', value: 'Entrada' },
    ]);

    const [userSelected, setUserSelected] = React.useState('');
    const [user, setUser] = React.useState([
        { key: 'Fabio', value: 'Fabio' },
        { key: 'Flavia', value: 'Flavia' },
    ]);

    async function addLanch() {

        if (!typeSelected || !value || !userSelected) {
            return alert('Todos os campos são obigatorio');
        }
        if (typeSelected == 'Entrada') {
            if (!revenueSelected) {
                return alert('Todos os campos são obigatorio');
            }
        }
        if (typeSelected == 'Saida') {
            if (!expenseSelected) {
                return alert('Todos os campos são obigatorio');
            }
        }
        let url_api = typeSelected == 'Entrada' ? '/launchRevenue' : '/launchExpense';
        var data = {};
        var fixed = checked == false ? 'N' : 'S';

        //FIXED
        if (checked == true) {
            console.log(Math.floor(Math.random() * 9999999999))
            if (typeSelected == 'Entrada') {
                data = {
                    value: value,
                    type: typeSelected,
                    user: userSelected,
                    id_revenue: revenueSelected,
                    day: moment().format('DD'),
                    fixed: fixed,
                    fixedRodam: Math.floor(Math.random() * 9999999999)
                }
            } else {
                data = {
                    value: value,
                    type: typeSelected,
                    user: userSelected,
                    id_expense: expenseSelected,
                    day: moment().format('DD'),
                    fixed: fixed,
                    fixedRodam: Math.floor(Math.random() * 9999999999)
                }
            }

            mesItems.map((v) => {
                var dados2023 = { ...data, month: v.value, year: '2023' }
                var dados2024 = { ...data, month: v.value, year: '2024' }
                var dados2025 = { ...data, month: v.value, year: '2025' }
                var dados2026 = { ...data, month: v.value, year: '2026' }
                var dados2027 = { ...data, month: v.value, year: '2027' }
                var dados2028 = { ...data, month: v.value, year: '2028' }
                var dados2029 = { ...data, month: v.value, year: '2029' }
                var dados2030 = { ...data, month: v.value, year: '2030' }

                var config2023 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2023
                };
                var config2024 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2024
                };
                var config2025 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2025
                };

                var config2026 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2026
                };

                var config2027 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2027
                };
                var config2028 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2028
                };

                var config2029 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2029
                };
                var config2030 = {
                    method: 'POST',
                    url: api.url_base_api + url_api,
                    data: dados2030
                };

                axios(config2023);
                axios(config2024);
                axios(config2025);
                axios(config2026);
                axios(config2027);
                axios(config2028);
                axios(config2029);
                axios(config2030);
            });
            navigation.navigate('Home');
        }
        else {
            if (typeSelected == 'Entrada') {
                data = {
                    value: value,
                    type: typeSelected,
                    user: userSelected,
                    id_revenue: revenueSelected,
                    day: moment().format('DD'),
                    month: moment().format('MM'),
                    year: moment().format('YYYY'),
                    fixed: fixed
                }
            } else {
                data = {
                    value: value,
                    type: typeSelected,
                    user: userSelected,
                    id_expense: expenseSelected,
                    day: moment().format('DD'),
                    month: moment().format('MM'),
                    year: moment().format('YYYY'),
                    fixed: fixed
                }
            }
            var config = {
                method: 'POST',
                url: api.url_base_api + url_api,
                data: data
            };

            try {
                const response = await axios(config);
                if (response.status == 201) {
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.log(error)
                alert('Ops! ocorreu algum erro');
            }
        }
    }

    async function loadExpense() {
        const ListExpense = [];
        var config = {
            method: 'GET',
            url: api.url_base_api + '/expense',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                response.data.forEach((r) => {
                    ListExpense.push({ value: r.description, key: r.id });
                })

            }
            setExpense(ListExpense);
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function loadRevenue() {
        const ListRevenue = [];
        var config = {
            method: 'GET',
            url: api.url_base_api + '/revenue',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                response.data.forEach((r) => {
                    ListRevenue.push({ value: r.description, key: r.id });
                })

            }
            setRevenue(ListRevenue);
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }



    useEffect(() => {
        loadExpense();
        loadRevenue();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.container}>

                    <Card>
                        <Text style={styles.title}>Novo Lançamento</Text>
                        <Card.Content>

                            <SelectList
                                search={true}
                                setSelected={(value) => setTypeSelected(value)}
                                data={type}
                                placeholder='Selecione o tipo'
                            />
                            <Text> </Text>

                            {
                                typeSelected == 'Entrada' ?
                                    <>
                                        <SelectList
                                            search={true}
                                            setSelected={(value) => setRevenueSelected(value)}
                                            data={revenue}
                                            placeholder='Selecione'
                                        />
                                        <Text> </Text>
                                    </>
                                    :
                                    <>
                                        <SelectList
                                            search={true}
                                            setSelected={(value) => setExpenseSelected(value)}
                                            data={expense}
                                            placeholder='Selecione'
                                        />
                                        <Text> </Text>
                                    </>
                            }

                            <TextInput
                                label="Valor"
                                value={value}
                                mode="outlined"
                                keyboardType='numeric'
                                onChangeText={value => setValue(value)}
                            />

                            <Text> </Text>

                            <SelectList
                                search={true}
                                setSelected={(value) => setUserSelected(value)}
                                data={user}
                                placeholder='Selecione o usuario'
                            />
                            <Text> </Text>
                            <View style={styles.checked}>
                                <Checkbox
                                    label="Starred"
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={styles.checkedText}>É lançamento fixo? </Text>
                            </View>
                            <Text> </Text>

                            <View style={styles.buttonDespesa}>

                                <Button icon="plus" mode="contained" onPress={() => { addLanch() }} >
                                    Salvar Lançamento
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
    },
    checked: {
        flexDirection: 'row',
    },
    checkedText: {
        marginTop: 8,
        marginLeft: 10
    }
})

export default LaunchNew;