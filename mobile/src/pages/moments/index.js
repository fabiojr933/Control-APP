
import * as React from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Avatar, Provider, Card, Portal, FAB, ActivityIndicator, MD2Colors, Button } from 'react-native-paper'; import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import api from '../../service/api';
import ip from '../../service/ip';


function Momentos() {

    const [Image, setImage] = React.useState([]);
    const [tempo, setTempo] = React.useState(true);
    const [load, setLoad] = React.useState(null);
    const navigation = React.useContext(NavigationContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [online, setOnline] = React.useState(false);

    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 2000);
    }

    async function LoadImage() {
        setTempo(true)
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'GET',
            url: api.url_base_api + '/ListaImage',
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setImage(response.data);
                navigation.navigate('Momento');
            }            
            ContagemTempo();
        } catch (error) {
          //  alert('Ops! ocorreu algum erro');
        }
    }

    async function DeleteImage(id, filename) {
        setTempo(true)
        var data = {
            id: id,
            filename: filename
        }
        navigation.addListener('focus', () => setLoad(!load))
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/Image/Delete',
            data: data
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                LoadImage();
                navigation.navigate('Momento');
            }
            ContagemTempo();
        } catch (error) {
          //  alert('Ops! ocorreu algum erro');
        }
    }

    async function confirmDelete(id, filename) {
        Alert.alert(
            "Atenção!",
            "Deseja realmente excluir?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        DeleteImage(id, filename);
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
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
        LoadImage();
    }, [load, navigation]);


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

                            {Image.map((v) =>
                                <>
                                    <Card>
                                        <Card.Title title="Momentos" left={LeftContent} />
                                        <Button style={{ marginLeft: '50%', marginRight: 5 }} icon="delete" mode="contained" onPress={() => confirmDelete(v.id, v.filename)}>
                                            Excluir
                                        </Button>
                                        <Card.Content>
                                            <Text variant="titleLarge">Dia {v.day}/{v.month}/{v.year}</Text>
                                            <Text variant="bodyMedium">{v.description}</Text>
                                        </Card.Content>
                                        <Card.Cover style={{ height: 480 }} source={{ uri: ip.url_pi + v.filename }} />

                                    </Card>
                                    <Text> </Text>
                                </>
                            )}

                        </View>
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
                                label: 'Novo momento',
                                onPress: () => { navigation.navigate('MomentNew') },
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
        padding: 5,
        margin: 10,
    }
});

export default Momentos;

