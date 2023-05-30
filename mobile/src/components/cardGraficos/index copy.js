
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { PieChart } from "react-native-gifted-charts";



const CardGraficos = () => {

    const pieData = [
        { value: 54, color: '#177AD5', text: '54%' },
        { value: 40, color: '#79D2DE', text: '30%' },
        { value: 20, color: '#ED6665', text: '26%' },
    ];

    return (
        <>
            <View>
                <PieChart
                    showText
                    textColor="black"
                    radius={150}
                    textSize={20}
                    showTextBackground
                    textBackgroundRadius={26}
                    data={pieData}
                />
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    
});
export default CardGraficos;