
import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, Portal, Provider, Card, List, Button, ActivityIndicator, MD2Colors, DataTable } from 'react-native-paper';
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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryBoxPlot } from "victory-native";
import { PieChart } from "react-native-svg-charts";

function Fabio() {






    const randomColor = () =>
        ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
            0,
            7
        );

    const data = [
        {
            id: 0,
            value: 720,
            description: "Alimentação",
            color: randomColor(),
        },
        {
            id: 1,
            value: 310,
            description: "Carro",
            color: randomColor(),
        },
        {
            id: 2,
            value: 250,
            description: "Investimento",
            color: randomColor(),
        },
        {
            id: 3,
            value: 321,
            description: "Outros",
            color: randomColor(),
        },
        {
            id: 4,
            value: 121,
            description: "Bebidas",
            color: randomColor(),
        },
    ];






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



    const [coresExpense, setCoresExpense] = React.useState([]);
    const [graficDadosExpense, setGraficDadosExpense] = React.useState([]);

    const [coresRevenue, setCoresRevenue] = React.useState([]);
    const [graficDadosRevenue, setGraficDadosRevenue] = React.useState([]);

    const [coresRevenueExpense, setCoresRevenueExpense] = React.useState([]);
    const [graficDadosRevenueExpense, setGraficDadosRevenueExpense] = React.useState([]);

    const [anoOpen, anoSetOpen] = React.useState(false);
    const [anoValue, anoSetValue] = React.useState(null);
    const [anoItems, anoSetItems] = React.useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
    ]);

    async function graficRevenueExpense() {
        var dados = [];

        navigation.addListener('focus', () => setLoad(!load));
        var config = {
            method: 'GET',
            url: api.url_base_api + '/grafics/launchRevenueLaunchExpenseAnoMes/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                var id = 1;
                response.data.map((v) => {
                    const randomColor = () =>
                        ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
                            0,
                            7
                        );
                    dados.push({ id: id, 'description': v.despesa, value: v.valor.toFixed(2), 'color': randomColor() });
                });
            }
            setGraficDadosRevenueExpense(dados);
        } catch (error) {
            dados.push({ id: 1, 'description': 'Sem dados', value: 0.00, 'color': 'red' });
            setGraficDadosRevenueExpense(dados);
            //  alert(error);
        }

    }


    async function graficRevenue() {
        var dados = [];
        var cores = [];
        navigation.addListener('focus', () => setLoad(!load));
        var config = {
            method: 'GET',
            url: api.url_base_api + '/grafics/launchRevenueAnoMes/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                var id = 1;
                response.data.map((v) => {
                    const randomColor = () =>
                        ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
                            0,
                            7
                        );
                    dados.push({ id: id, 'description': v.description, value: v.valor.toFixed(2), 'color': randomColor() });
                    id++;
                });
            }
            setGraficDadosRevenue(dados);
        } catch (error) {
            dados.push({ id: 1, 'description': 'Sem dados', value: 0.00, 'color': 'red' });
            setGraficDadosRevenue(dados);
            // alert(error);
        }

    }



    async function graficExpense() {
        var dados = [];
        navigation.addListener('focus', () => setLoad(!load));
        var config = {
            method: 'GET',
            url: api.url_base_api + '/grafics/launchExpenseAnoMes/' + mesValue + '/' + anoValue + '/' + 'Fabio',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                var id = 1;
                response.data.map((v) => {
                    const randomColor = () =>
                        ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
                            0,
                            7
                        );
                    dados.push({ id: id, 'description': v.description, value: v.valor.toFixed(2), 'color': randomColor() });
                    id++;
                });
            }
            setGraficDadosExpense(dados);
        } catch (error) {
            dados.push({ id: 1, 'description': 'Sem dados', value: 0.00, 'color': 'red' });
            setGraficDadosExpense(dados);
            //  alert(error);
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
        graficExpense();
        graficRevenue();
        graficRevenueExpense();
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
            //  alert('Ops! ocorreu algum erro');
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
            //    console.log(response)
            if (response.status == 200) {
                setExpenseAll(response.data);
            }
        } catch (error) {
            //   console.log(error)
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
            // alert('Ops! ocorreu algum erro');
        }
    }

    async function LoadListAno() {
        setTempo(true)
        loadExpense();
        loadRevenue();
        SumLaunchRevenue();
        SumLaunchExpense();
        graficExpense();
        graficRevenue();
        graficRevenueExpense();
        ContagemTempo();
    }


    async function LoadListMes() {
        setTempo(true)
        loadExpense();
        loadRevenue();
        SumLaunchRevenue();
        SumLaunchExpense();
        graficExpense();
        graficRevenue();
        graficRevenueExpense();
        ContagemTempo();
    }


    const pieDataRevenueExpense = graficDadosRevenueExpense.map((item, index) => ({
        value: item.value,
        svg: {
            fill: item.color,
        },
        key: `pie-${index}`,
    }));


    const pieDataRevenue = graficDadosRevenue.map((item, index) => ({
        value: item.value,
        svg: {
            fill: item.color,
        },
        key: `pie-${index}`,
    }));

    const pieDataExpense = graficDadosExpense.map((item, index) => ({
        value: item.value,
        svg: {
            fill: item.color,
        },
        key: `pie-${index}`,
    }));


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



                            <Text> </Text>
                            <Text>  </Text>
                            {graficDadosRevenue[0].y == 0 ? '' :

                                <View style={{ marginTop: 10 }}>

                                    <Card>
                                        <Card.Title
                                            title="Relatorio de Receita" />
                                        <Card.Content>
                                            <DataTable>
                                                <DataTable.Header style={styles.tableHeader}>
                                                    <DataTable.Title>Receita</DataTable.Title>
                                                    <DataTable.Title>Valor</DataTable.Title>
                                                </DataTable.Header>
                                                {RevenueAll.map((v) =>
                                                    <DataTable.Row>
                                                        <DataTable.Cell>{v.description}</DataTable.Cell>
                                                        <DataTable.Cell>R$: {v.value.toFixed(2)}</DataTable.Cell>
                                                    </DataTable.Row>
                                                )}
                                                <DataTable.Header style={styles.tableHeader}>
                                                    <DataTable.Title>Total</DataTable.Title>
                                                    <DataTable.Title>R$: {sumLaunchRevenue}</DataTable.Title>
                                                </DataTable.Header>

                                            </DataTable>
                                        </Card.Content>
                                    </Card>
                                </View>

                            }


                            <Text>  </Text>

                            <Text>  </Text>

                            {graficDadosExpense[0].y == 0 ? '' :

                                <View style={{ marginTop: 10 }}>

                                    <Card>
                                        <Card.Title
                                            title="Relatorio de Despesa" />
                                        <Card.Content>
                                            <DataTable>
                                                <DataTable.Header style={styles.tableHeader}>
                                                    <DataTable.Title>Despesa</DataTable.Title>
                                                    <DataTable.Title>Valor</DataTable.Title>
                                                </DataTable.Header>
                                                {expenseAll.map((v) =>
                                                    <DataTable.Row>
                                                        <DataTable.Cell>{v.description}</DataTable.Cell>
                                                        <DataTable.Cell>R$: {v.value}</DataTable.Cell>
                                                    </DataTable.Row>
                                                )}
                                                <DataTable.Header style={styles.tableHeader}>
                                                    <DataTable.Title>Total</DataTable.Title>
                                                    <DataTable.Title>R$: {sumLaunchExpense}</DataTable.Title>
                                                </DataTable.Header>

                                            </DataTable>
                                        </Card.Content>
                                    </Card>
                                </View>

                            }
                            <Text>  </Text>
                            <Text>  </Text>
                            <Text>  </Text>


                            {graficDadosRevenue[0].value <= 0.00 ? '' :
                                <View >
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                        Grafico receitas
                                    </Text>

                                    <View style={styles.cards}>
                                        <View style={styles.graphic}>
                                            <PieChart style={{ height: 150 }} data={pieDataRevenue} />
                                        </View>
                                        <View style={styles.data9}>
                                            {graficDadosRevenue.map((item, index) => (
                                                <View style={styles.dataValues} key={`${index}`}>
                                                    <View style={[styles.circle, { backgroundColor: item.color }]} />
                                                    <Text style={{ flex: 1, marginLeft: 10 }}>
                                                        {item.description}
                                                    </Text>
                                                    <Text style={{}}>{`R$ ${item.value}`}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>}

                            <Text>  </Text>
                            <Text>  </Text>


                            {graficDadosExpense[0].value <= 0.00 ? '' :
                                <View >
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                        Grafico despesas
                                    </Text>

                                    <View style={styles.cards}>
                                        <View style={styles.graphic}>
                                            <PieChart style={{ height: 150 }} data={pieDataExpense} />
                                        </View>
                                        <View style={styles.data9}>
                                            {graficDadosExpense.map((item, index) => (
                                                <View style={styles.dataValues} key={`${index}`}>
                                                    <View style={[styles.circle, { backgroundColor: item.color }]} />
                                                    <Text style={{ flex: 1, marginLeft: 10 }}>
                                                        {item.description}
                                                    </Text>
                                                    <Text style={{}}>{`R$ ${item.value}`}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>}

                            <Text>  </Text>
                            <Text>  </Text>

                            {graficDadosRevenueExpense[0].value <= 0.00 ? '' :
                                <View >
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                        Grafico receitas X despesas
                                    </Text>

                                    <View style={styles.cards}>
                                        <View style={styles.graphic}>
                                            <PieChart style={{ height: 150 }} data={pieDataRevenueExpense} />
                                        </View>
                                        <View style={styles.data9}>
                                            {graficDadosRevenueExpense.map((item, index) => (
                                                <View style={styles.dataValues} key={`${index}`}>
                                                    <View style={[styles.circle, { backgroundColor: item.color }]} />
                                                    <Text style={{ flex: 1, marginLeft: 10 }}>
                                                        {item.description}
                                                    </Text>
                                                    <Text style={{}}>{`R$ ${item.value}`}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>}

                        </View>

                    </ScrollView>
                </SafeAreaView>

            </Provider>
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
    },

    cards: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        flexDirection: "row",
    },
    graphic: {
        flex: 1,
    },

    data9: {
        flex: 2,
        paddingLeft: 20,
    },
    dataValues: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    circle: {
        width: 15,
        height: 15,
        backgroundColor: "blue",
        borderRadius: 10,
    },
});

export default Fabio;

