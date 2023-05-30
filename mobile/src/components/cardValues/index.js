
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CardValues = () => {
    return (
        <>
            <Card>
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
                                    {true ? `R$1.360,56` : "   "}
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
                                    {true ? `R$3.360,56` : "   "}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Text> </Text>
        </>
    )
}


const styles = StyleSheet.create({
    dataValues: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        maxHeight: 90,
    }
});
export default CardValues;