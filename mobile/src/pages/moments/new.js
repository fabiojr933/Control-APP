
import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Provider, Card, TextInput, ActivityIndicator, MD2Colors, Button } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates';
import moment from 'moment';
import api from '../../service/api';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

registerTranslation('pt-br', {
    save: 'Salvar',
    selectSingle: 'Selecione a data',
    selectMultiple: 'Selecione Selecione',
    selectRange: 'Selecione o periodo',
    notAccordingToDateFormat: (inputFormat) =>
        `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
        `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'dia não é permitido',
    previous: 'Anterior',
    next: 'Pesquisar',
    typeInDate: 'Digite a data',
    pickDateFromCalendar: 'Escolher data no calendário',
    close: 'Sair',
})

function NewMoment() {

    const [image, setImage] = React.useState(null);
    const [mimeType, setMimeType] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [online, setOnline] = React.useState(false);

    const [tempo, setTempo] = React.useState(true);
    const [load, setLoad] = React.useState(null);
    const navigation = React.useContext(NavigationContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [state, setState] = React.useState({ open: false });

    const [descricao, setDescricao] = React.useState("");
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const [inputDate, setInputDate] = React.useState(undefined)
    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );



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
        setLoad(false);
        ContagemTempo();
    }, [load, navigation]);




    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});      
        setImage(result.uri)
        setMimeType(result.mimeType)
        setName(result.name)
    };

    async function AddMomento() {      
        if (!descricao || !inputDate || !image) {
            return alert('Todos os campos são obrigatorios');
        }

        var day = (moment(inputDate).format('DD'));
        var month = (moment(inputDate).format('MM'));
        var year = (moment(inputDate).format('YYYY'));
        var file = (image)

        var formData = new FormData();
        formData.append("file", {
            uri: image,
            type: mimeType,
            name: name,
        });
        formData.append('day', day);
        formData.append('month', month);
        formData.append('year', year);
        formData.append('description', descricao);

        var config = {
            method: 'POST',
            url: api.url_base_api + '/upload/image',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        try {
            const response = await axios(config);
            if (response.status == 200) {
                navigation.navigate('Momento');
            }

        } catch (error) {
               alert('Ops! ocorreu algum erro');
        }
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
                            <Card>
                                <Card.Title title="Cadastro" left={LeftContent} />
                                <Card.Content>
                                    <Text variant="titleLarge">Novo momento</Text>
                                </Card.Content>
                                <View style={styles.buttonDespesa}>
                                    <TextInput mode="outlined" label="Descrição" onChangeText={descricao => setDescricao(descricao)} />
                                    <Text>  </Text>

                                    <DatePickerInput
                                        locale="pt-br"
                                        label="Data"
                                        value={inputDate}
                                        onChange={(d) => setInputDate(d)}
                                        inputMode="start"
                                    />

                                    <Text>  </Text>

                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button title="Pick an image from camera roll" onPress={pickDocument} > Selecione a foto</Button>
                                        {image && <Image source={{ uri: image }} style={{ width: 300, height: 480 }} />}
                                    </View>
                                    <Text>  </Text>
                                    <Text>  </Text>


                                    <Text>  </Text>
                                    <Button icon="plus-box" mode="contained" onPress={() => AddMomento()}>
                                        Salvar
                                    </Button>
                                    <Text>  </Text>
                                </View>
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
});

export default NewMoment;

