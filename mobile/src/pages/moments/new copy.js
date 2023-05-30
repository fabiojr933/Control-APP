
import * as React from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Provider, Card, TextInput, FAB, ActivityIndicator, MD2Colors, Button } from 'react-native-paper'; import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';
import { DatePickerModal, DatePickerInput, registerTranslation } from 'react-native-paper-dates';
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

    const [tempo, setTempo] = React.useState(true);
    const [load, setLoad] = React.useState(null);
    const navigation = React.useContext(NavigationContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [state, setState] = React.useState({ open: false });

    const [descricao, setDescricao] = React.useState("");



    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);

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



    const [inputDate, setInputDate] = React.useState(undefined)



    async function ContagemTempo() {
        setTimeout(() => {
            setTempo(false);
        }, 2000);
    }

    React.useEffect(() => {
        setTempo(true);
        setLoad(false);
        ContagemTempo();
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
            <Provider >
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

                                    <Button icon="plus" mode="contained" onPress={console.log('o')}>
                                        Salvar
                                    </Button>
                                    <Text>  </Text>
                                </View>
                            </Card>

                        </View>

                    </ScrollView>
                </SafeAreaView>

            </Provider >
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

