
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { NavigationContext } from '@react-navigation/native';

const CardNews = () => {

    const navigation = React.useContext(NavigationContext);

    return (
        <>
            <Card>
                    <Text style={styles.title}>Cadastros</Text>
                        <Card.Content>
                            <View style={styles.containerNews}>
                                <View style={styles.cardsButon}>
                                    <Button icon="plus" mode="contained" onPress={() => navigation.navigate('Revenue')}>
                                        Receita
                                    </Button> 
                                    <Text>  </Text>
                                    <Button icon="minus" mode="contained" onPress={() => navigation.navigate('Expense')}>
                                        Despesa
                                    </Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
            <Text> </Text>
        </>
    )
}


const styles = StyleSheet.create({
    cardsButon: {
        flexDirection: "row",
        justifyContent: 'center'
    },
    containerNews: {
        padding: 5,
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20
    },
});
export default CardNews;