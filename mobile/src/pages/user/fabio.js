
import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, Card, List, Button, ActivityIndicator, MD2Colors, DataTable, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContext } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import api from '../../service/api';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


function Fabio() {



    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 40, zIndex: 3 };
    const [idFixo, setIdFixo] = React.useState(0);
    const [fixedRodamId, setFixedRodamId] = React.useState(0);
    const [sequenFixo, setSequenFixo] = React.useState(0);


    const [visibleRevenue, setVisibleRevenue] = React.useState(false);
    const showModalRevenue = () => setVisibleRevenue(true);
    const hideModalRevenue = () => setVisibleRevenue(false);
    const containerStyleRevenue = { backgroundColor: 'white', padding: 40, zIndex: 3 };
    const [idFixoRevenue, setIdFixoRevenue] = React.useState(0);
    const [fixedRodamIdRevenue, setFixedRodamIdRevenue] = React.useState(0);



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
    const [online, setOnline] = React.useState(false);

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
            //   alert('Ops! ocorreu algum erro');
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
            //  alert('Ops! ocorreu algum erro');
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
            if (response.status == 200) {
                setExpenseAll(response.data);
            }
        } catch (error) {         
            // alert('Ops! ocorreu algum erro');
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
            //   alert('Ops! ocorreu algum erro');
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
                setVisible(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function removeExpenseSomenteTodos(fixedRodam) {      
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
                setVisible(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {         
            //  alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchExpenseApartirDesde(fixedRodamId, sequenFixo) {      
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchExpenseApartirDesde/ ' + fixedRodamId + '/' + sequenFixo,
        };
        
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();
                setVisible(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {
            // alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueApartirDesde(fixedRodamIdRevenue, sequenFixo) {

        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchRevenueApartirDesde/' + fixedRodamIdRevenue + '/' + sequenFixo,
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                loadExpense();
                loadRevenue();
                SumLaunchExpense();
                SumLaunchRevenue();
                setVisibleRevenue(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {     
            //  alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueTodos(fixedRodam) {   
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
                setVisibleRevenue(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {        
            // alert('Ops! ocorreu algum erro');
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
                setVisibleRevenue(false)
                navigation.navigate('Fabio');
            }
        } catch (error) {
            //  alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchExpenseParcRodam(ParcRodam) {

        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchExpenseParcRodam/' + ParcRodam,
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
            // alert('Ops! ocorreu algum erro');
        }
    }

    async function removeLaunchRevenueParcRodam(ParcRodam) {

        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/removeLaunchRevenueParcRodam/' + ParcRodam,
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
            // alert('Ops! ocorreu algum erro');
        }
    }



    async function removeLaunchExpense(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo) {     
        if (fixed == 'S') {
          
           setSequenFixo(sequenFixo);
            setFixedRodamId(fixedRodam);
            setIdFixo(id);
            setVisible(true);
        } if (parc == 'S') {
            Alert.alert(
                "Atenção!",
                "Esse é um lançamento parcelado Deseja excluir todos?",
                [

                    {
                        text: "Sim",
                        onPress: () => {
                            removeLaunchExpenseParcRodam(ParcRodam);
                        },
                    },
                    {
                        text: "Não",
                        onPress: () => {
                            console.log('')
                        },
                    }
                ]
            );
        } if (fixed == 'N' && parc == 'N') {
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
                //  alert('Ops! ocorreu algum erro');
            }
        }


    }


    async function removeLaunchRevenue(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo) {     
        if (fixed == 'S') {
           setSequenFixo(sequenFixo)
            setFixedRodamIdRevenue(fixedRodam);
            setIdFixoRevenue(id);
            setVisibleRevenue(true);
        } if (parc == 'S') {
            Alert.alert(
                "Atenção!",
                "Esse é um lançamento parcelado Deseja excluir todos?",
                [

                    {
                        text: "Sim",
                        onPress: () => {
                            removeLaunchRevenueParcRodam(ParcRodam);
                        },
                    },
                    {
                        text: "Não",
                        onPress: () => {
                            console.log('')
                        },
                    }
                ]
            );
        } if (fixed == 'N' && parc == 'N') {
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
                //  alert('Ops! ocorreu algum erro');
            }
        }

    }


    async function confirmDeleteExpense(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo) {

        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir esse Lançamento?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        removeLaunchExpense(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo);
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    }

    async function confirmDeleteRevenue(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo) {
        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir esse Lançamento?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        removeLaunchRevenue(id, fixed, fixedRodam, parc, ParcRodam, sequenFixo);
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
                                                                <Button mode="Text" onPress={() => confirmDeleteExpense(item.id, item.fixed, item.fixedRodam, item.parc, item.ParcRodam,item.sequenFixo)}>x</Button>
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
                                                                <Button mode="Text" onPress={() => confirmDeleteRevenue(item.id, item.fixed, item.fixedRodam, item.parc, item.ParcRodam, item.sequenFixo)}>x</Button>
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


                        {visible == false ? '' :

                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <Text>Atenção!, Esse é um lançamento fixo Deseja excluir? </Text>
                                <Button onPress={() => removeExpenseSomenteEsse(idFixo)}>Somente esse</Button>
                                <Button onPress={() => removeLaunchExpenseApartirDesde(fixedRodamId, sequenFixo)} >A partir deste</Button>
                                <Button onPress={() => removeExpenseSomenteTodos(fixedRodamId)}>Todos</Button>
                                <Button onPress={hideModal} >Sair</Button>
                            </Modal>
                        }


                        {visibleRevenue == false ? '' :

                            <Modal visible={visibleRevenue} onDismiss={hideModalRevenue} contentContainerStyle={containerStyleRevenue}>
                                <Text>Atenção!, Esse é um lançamento fixo Deseja excluir? </Text>
                                <Button onPress={() => removeLaunchRevenueEsse(idFixoRevenue)}>Somente esse</Button>
                                <Button onPress={() => removeLaunchRevenueApartirDesde(fixedRodamIdRevenue, sequenFixo)} >A partir deste</Button>
                                <Button onPress={() => removeLaunchRevenueTodos(fixedRodamIdRevenue)}>Todos</Button>
                                <Button onPress={hideModalRevenue} >Sair</Button>
                            </Modal>
                        }

                    </ScrollView>
                </SafeAreaView>

            </>
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

