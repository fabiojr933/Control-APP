
import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, Portal, Provider, Card, List, Button, ActivityIndicator, MD2Colors, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardValues from '../../components/cardValues';
import CardNews from '../../components/cardNews';
import CardLanc from '../../components/cardLanc';
import CardGraficos from '../../components/cardGraficos';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContext } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import api from '../../service/api';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


function Fabio() {

    const [tempo, setTempo] = React.useState(true);
    const navigation = React.useContext(NavigationContext);
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [expenseAll, setExpenseAll] = React.useState([]);
    const [RevenueAll, setRevenueAll] = React.useState([]);
    const [load, setLoad] = React.useState(null);
    const [sumLaunchExpense, setSumLaunchExpense] = React.useState(0.00);
    const [sumLaunchRevenue, setSumLaunchRevenue] = React.useState(0.00);

    const [mesOpen, mesSetOpen] = React.useState(false);
    const [mesValue, mesSetValue] = React.useState(null);
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

    const [anoOpen, anoSetOpen] = React.useState(false);
    const [anoValue, anoSetValue] = React.useState(null);
    const [anoItems, anoSetItems] = React.useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
    ]);    


    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 2000);
    }

    React.useEffect(() => {
        setTempo(true);
        setLoad(true);
        mesSetValue(moment().format('MM'));
        anoSetValue(moment().format('YYYY'));
        loadExpense();
        loadRevenue();
        SumLaunchExpense();
        SumLaunchRevenue();        
        setLoad(false);
        ContagemTempo();
    }, [load, navigation]);


    async function SumLaunchExpense() {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/SumLaunchExpenseUser/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setSumLaunchExpense(response.data[0].value.toFixed(2));
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function SumLaunchRevenue() {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/SumLaunchRevenueUser/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setSumLaunchRevenue(response.data[0].value.toFixed(2));
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }


    async function loadExpense() {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/allLaunchExpenseUser/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            console.log(response)
            if (response.status == 200) {
                setExpenseAll(response.data);
            }
        } catch (error) {
            console.log(error)
            alert('Ops! ocorreu algum erro');
        }
    }

    async function loadRevenue() {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/allLaunchRevenueUser/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setRevenueAll(response.data);
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function LoadListAno() {
        setTempo(true)
        loadExpense();
        loadRevenue();
        SumLaunchRevenue();
        SumLaunchExpense();      
        ContagemTempo();
    }


    async function LoadListMes() {
        setTempo(true)
        loadExpense();
        loadRevenue();
        SumLaunchRevenue();
        SumLaunchExpense();      
        ContagemTempo();
    }

    async function removeExpenseSomenteEsse(id) {
        //   navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchExpense/' + id,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();              
                navigation.navigate('Fabio');
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeExpenseSomenteTodos(fixedRodam) {
        console.log(fixedRodam)
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchExpenseFixedRodam/' + fixedRodam,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();              
                navigation.navigate('Fabio');
            }
        } catch (error) {
            console.log(error)
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchExpenseApartirDesde(fixedRodam) {

        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchExpenseApartirDesde/' + fixedRodam + '/' + anoValue,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();               
                navigation.navigate('Fabio');
            }
        } catch (error) {
            console.log(error)
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueApartirDesde(fixedRodam) {

        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchRevenueApartirDesde/' + fixedRodam + '/' + anoValue,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();               
                navigation.navigate('Fabio');
            }
        } catch (error) {
            console.log(error)
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueTodos(fixedRodam) {
        console.log(fixedRodam)
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchRevenueFixedRodam/' + fixedRodam,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();                
                navigation.navigate('Fabio');
            }
        } catch (error) {
            console.log(error)
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueEsse(id) {
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchRevenue/' + id,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();               
                navigation.navigate('Fabio');
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }


    async function removeLaunchExpense(id, fixed, fixedRodam) {

        if (fixed == 'S') {
            Alert.alert(
                "Atenção!",
                "Esse é um lançamento fixo Deseja excluir?",
                [

                    {
                        text: "A partir deste",
                        onPress: () => {
                            removeLaunchExpenseApartirDesde(fixedRodam);
                        },
                    },
                    {
                        text: "Somente esse",
                        onPress: () => {
                            removeExpenseSomenteEsse(id);
                        },
                    },
                    {
                        text: "Todos",
                        onPress: () => {
                            removeExpenseSomenteTodos(fixedRodam);
                        },
                    }
                ]
            );
        } else {
            navigation.addListener('focus', () => setLoad(!load))
            var config = {
                method: 'DELETE',
                url: api.url_base_api + '/removeLaunchExpense/' + id,
            };
            try {
                const response = await axios(config);
                if (response.status == 200) {
                    loadExpense();
                    loadRevenue();
                    SumLaunchExpense();
                    SumLaunchRevenue();                   
                    navigation.navigate('Fabio');
                }
            } catch (error) {
                alert('Ops! ocorreu algum erro');
            }
        }


    }



    async function removeLaunchRevenue(id, fixed, fixedRodam) {
        console.log(id, fixed, fixedRodam)
        if (fixed == 'S') {
            Alert.alert(
                "Atenção!",
                "Esse é um lançamento fixo Deseja excluir?",
                [

                    {
                        text: "A partir deste",
                        onPress: () => {
                            removeLaunchRevenueApartirDesde(fixedRodam);
                        },
                    },
                    {
                        text: "Somente esse",
                        onPress: () => {
                            removeLaunchRevenueEsse(id);
                        },
                    },
                    {
                        text: "Todos",
                        onPress: () => {
                            removeLaunchRevenueTodos(fixedRodam);
                        },
                    }
                ]
            );
        } else {
            navigation.addListener('focus', () => setLoad(!load))
            var config = {
                method: 'DELETE',
                url: api.url_base_api + '/removeLaunchRevenue/' + id,
            };
            try {
                const response = await axios(config);
                if (response.status == 200) {
                    loadRevenue();
                    SumLaunchRevenue();
                    navigation.navigate('Fabio');
                }
            } catch (error) {
                alert('Ops! ocorreu algum erro');
            }
        }

    }


    async function confirmDeleteExpense(id, fixed, fixedRodam) {

        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir esse Lançamento?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        removeLaunchExpense(id, fixed, fixedRodam);
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    }

    async function confirmDeleteRevenue(id, fixed, fixedRodam) {


        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir esse Lançamento?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        removeLaunchRevenue(id, fixed, fixedRodam);
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
                        <View style={styles.container}>
                            <View style={styles.data}>
                                <DropDownPicker
                                    maxHeight={500}
                                    open={mesOpen}
                                    value={mesValue}
                                    items={mesItems}
                                    setOpen={mesSetOpen}
                                    setValue={mesSetValue}
                                    setItems={mesSetItems}
                                    placeholder="Seleciona o mês"
                                    style={{ backgroundColor: '#fff' }}
                                    onChangeValue={(v) => { LoadListMes(v) }}
                                />
                            </View>
                            <Text> </Text>
                            <View style={styles.data2}>
                                <DropDownPicker
                                    maxHeight={500}
                                    open={anoOpen}
                                    value={anoValue}
                                    items={anoItems}
                                    setOpen={anoSetOpen}
                                    setValue={anoSetValue}
                                    setItems={anoSetItems}
                                    placeholder="Seleciona o mês"
                                    style={{ backgroundColor: '#fff' }}
                                    onChangeValue={(v) => { LoadListAno(v) }}
                                />
                            </View>

                            <Text> </Text>

                            <Card>
                                <Text style={styles.totais}> Totais do Fabio</Text>
                                <Card.Content>
                                    <View style={styles.dataValues}>
                                        <View
                                            style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
                                        >
                                            <AwesomeIcon
                                                name="plus"
                                                size={40}
                                                color="#197A0A"
                                                style={{ marginRight: 5 }}
                                            />
                                            <View>
                                                <Text>Receitas</Text>
                                                <Text style={{ fontSize: 23, marginBottom: 10, color: "#197A0A" }}>
                                                    {true ? 'R$: ' + sumLaunchRevenue : "   "}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
                                        >
                                            <AwesomeIcon
                                                name="minus"
                                                size={40}
                                                color="#DD111C"
                                                style={{ marginRight: 5 }}
                                            />
                                            <View>
                                                <Text>Despesas</Text>
                                                <Text style={{ fontSize: 23, marginBottom: 10, color: "#DD111C" }}>
                                                    {true ? 'R$: ' + sumLaunchExpense : "   "}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                            <Text> </Text>





                            <Card>
                                <Text style={styles.title}>Lançamentos do Fabio</Text>


                                <Card.Content>
                                    <List.AccordionGroup>
                                        <List.Accordion title="Despesas" id="1">

                                            <DataTable style={styles.dataTable}>

                                                {
                                                    expenseAll.map((item, i) =>
                                                        <>
                                                            <DataTable.Row>
                                                                <DataTable.Cell >{item.description}   R$: {item.value} </DataTable.Cell>
                                                                <Button mode="Text" onPress={() => confirmDeleteExpense(item.id, item.fixed, item.fixedRodam)}>x</Button>
                                                            </DataTable.Row>
                                                            <Text>  </Text>
                                                        </>
                                                    )}
                                            </DataTable>

                                        </List.Accordion>
                                        <Text> </Text>
                                        <List.Accordion title="Receitas" id="2">


                                            <DataTable style={styles.dataTable}>

                                                {
                                                    RevenueAll.map((item, i) =>
                                                        <>
                                                            <DataTable.Row>
                                                                <DataTable.Cell >{item.description}   R$: {item.value} </DataTable.Cell>
                                                                <Button mode="Text" onPress={() => confirmDeleteRevenue(item.id, item.fixed, item.fixedRodam)}>x</Button>
                                                            </DataTable.Row>
                                                            <Text>  </Text>

                                                        </>
                                                    )}
                                            </DataTable>


                                        </List.Accordion>
                                    </List.AccordionGroup>
                                </Card.Content>
                            </Card>

                            <Text>  </Text>
                            <Text>  </Text>
                            <Text>  </Text>
                        </View>

                    </ScrollView>
                </SafeAreaView>

            </Provider >
        );

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 10,
    }, listGroup: {
        flexDirection: "row",
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    data: {
        zIndex: 2,
    },
    data2: {
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    dataTable: {
        marginTop: 10,
    },
    listTextGroup: {
        fontSize: 14
    },
    listButtonGroup: {
        marginTop: 10,
        marginBottom: 1,
        justifyContent: 'center',
    },
    dataValues: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        maxHeight: 90,
    },
    load: {
        marginTop: 250
    },
    button: {
        marginTop: 30,
    },
    resultado: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginRight: 5
    },
    Badge: {
        marginTop: 5
    },
    acumulou: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red',
        marginBottom: -15
    },
    ganhadores: {
        textAlign: 'center',
        marginBottom: 20
    },
    desenvolvido: {
        textAlign: 'center',
        marginTop: 50
    },
    totais: {
        marginTop: 10,
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 20
    }
});

export default Fabio;

