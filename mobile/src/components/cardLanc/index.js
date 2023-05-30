
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, List } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CardLanc = () => {
    return (
        <>
             <Card>
                        <Text style={styles.title}>Lançamentos</Text>
                        <Card.Content>
                            <List.AccordionGroup>
                                <List.Accordion title="Receitas" id="1">

                                    <View style={styles.listGroup}>                                                              
                                        <View style={styles.listButtonGroup}>
                                            <Button  buttonColor='' icon="" mode="elevated" onPress={() => console.log('Pressed')}>
                                            <Text style={styles.listTextGroup}>1111</Text>
                                            </Button>
                                        </View>
                                    </View>
                                  

                                </List.Accordion>
                                <Text> </Text>
                                <List.Accordion title="Despesas" id="2">
                                <View style={styles.listGroup}>                                                              
                                        <View style={styles.listButtonGroup}>
                                            <Button  buttonColor='' icon="" mode="elevated" onPress={() => console.log('Pressed')}>
                                            <Text style={styles.listTextGroup}>1111</Text>
                                            </Button>
                                        </View>
                                    </View>
                                    <View style={styles.listGroup}>                                                              
                                        <View style={styles.listButtonGroup}>
                                            <Button  buttonColor='' icon="" mode="elevated" onPress={() => console.log('Pressed')}>
                                            <Text style={styles.listTextGroup}>1111</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </List.Accordion>
                            </List.AccordionGroup>
                        </Card.Content>
                    </Card>

            <Text> </Text>
        </>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    listTextGroup: {        
        fontSize: 20
    },
    listButtonGroup: {
        marginTop: 10,
        marginBottom: 1,
        justifyContent: 'center',
    },
});
export default CardLanc;