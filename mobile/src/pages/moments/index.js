
import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Provider, Card, Portal, FAB, ActivityIndicator, MD2Colors, DataTable } from 'react-native-paper'; import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContext } from '@react-navigation/native';


function Momentos() {

    const [tempo, setTempo] = React.useState(true);
    const [load, setLoad] = React.useState(null);
    const navigation = React.useContext(NavigationContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

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
                                <Card.Title title="Momentos" left={LeftContent} />
                                <Card.Content>
                                    <Text variant="titleLarge">Dia 22/02/2023</Text>
                                    <Text variant="bodyMedium">Quando começamos a conversar. </Text>
                                </Card.Content>
                                <Card.Cover style={{ height: 480 }} source={{ uri: 'https://github-production-user-asset-6210df.s3.amazonaws.com/41793614/241828444-2d0c670e-7615-4f85-9951-dae81e632a5b.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230530%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230530T015652Z&X-Amz-Expires=300&X-Amz-Signature=a6204d40f0d059dc6eaf691e9136ec0e8ba8bce18bade880aa82929524f64b23&X-Amz-SignedHeaders=host&actor_id=41793614&key_id=0&repo_id=647066252' }} />

                            </Card>
                            <Text> </Text>
                            <Card>
                                <Card.Title title="Momentos" left={LeftContent} />
                                <Card.Content>
                                    <Text variant="titleLarge">Dia 02/03/2023</Text>
                                    <Text variant="bodyMedium">Nosso 1° encontro </Text>
                                </Card.Content>
                                <Card.Cover style={{ height: 480 }} source={{ uri: 'https://github-production-user-asset-6210df.s3.amazonaws.com/41793614/241828447-747fe520-6225-4336-a32b-32f8360a4181.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230530%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230530T015851Z&X-Amz-Expires=300&X-Amz-Signature=9b10d805c74896ebc6337254f60c7431fd3f1f790e8dddd86f9bf9699516efe9&X-Amz-SignedHeaders=host&actor_id=41793614&key_id=0&repo_id=647066252' }} />

                            </Card>
                            <Text> </Text>
                            <Card>
                                <Card.Title title="Momentos" left={LeftContent} />
                                <Card.Content>
                                    <Text variant="titleLarge">Dia 30/04/2023</Text>
                                    <Text variant="bodyMedium">Cada momento ao seu lado é único </Text>
                                </Card.Content>
                                <Card.Cover style={{ height: 480 }} source={{ uri: 'https://github-production-user-asset-6210df.s3.amazonaws.com/41793614/241829882-85b39465-b389-4bde-a719-5a4ff7a10b43.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230530%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230530T020404Z&X-Amz-Expires=300&X-Amz-Signature=079bf1efc80dd5a3de7216b7d5da34b2b92d19b4744c7bd15407b29cd19738b6&X-Amz-SignedHeaders=host&actor_id=41793614&key_id=0&repo_id=647066252' }} />

                            </Card>
                            <Text> </Text>
                            <Card>
                                <Card.Title title="Momentos" left={LeftContent} />
                                <Card.Content>
                                    <Text variant="titleLarge">Dia 05/05/2023</Text>
                                    <Text variant="bodyMedium">Obrigado por esta sempre ao meu lado </Text>
                                </Card.Content>
                                <Card.Cover style={{ height: 350 }} source={{ uri: 'https://github-production-user-asset-6210df.s3.amazonaws.com/41793614/241828441-069a2bb7-360f-4b27-b11c-edd1e84e3044.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230530%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230530T015407Z&X-Amz-Expires=300&X-Amz-Signature=a16b73425aedd28421222758655ff19198b5f83c311a5f065feb4bc690d07b1b&X-Amz-SignedHeaders=host&actor_id=41793614&key_id=0&repo_id=647066252' }} />

                            </Card>

                        </View>
                    </ScrollView>
                </SafeAreaView>

                <Portal>
                    <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'calendar-today' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
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

            </Provider >
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

