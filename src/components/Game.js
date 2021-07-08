import React from "react";
import {ScrollView, Text, View} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';
import {styles} from "./styles/GameStyle";
import {useDispatch, useSelector} from "react-redux";
import {changeDifficulty} from "../redux";
import {changeBoard, changeMode, restartGame} from "../redux/board/action";
import Board from "./Board";
import {CodeIcon, HeartIcon} from "./icons";
import * as Linking from 'expo-linking';


const Game = () => {
    const {
        player1,
        player2,
        difficulty,
        turn,
        mode,
        boardSize
    } = useSelector((state) => {
        return state
    })

    const dispatch = useDispatch()

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.turn}>
                    {turn === 1 && player1.name}
                    {turn === 2 && player2.name}'s turn
                </Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        mode={'dialog'}
                        selectedValue={difficulty}
                        onValueChange={
                            (itemValue) => dispatch(changeDifficulty(itemValue))
                        }
                    >
                        <Picker.Item label={'easy'} value={'easy'}/>
                        <Picker.Item label={'hard'} value={'hard'}/>
                        <Picker.Item label={'impossible'} value={'impossible'}/>
                    </Picker>
                    <Picker
                        style={styles.picker}
                        mode={'dialog'}
                        selectedValue={mode}
                        onValueChange={
                            (itemValue) => dispatch(changeMode(itemValue))
                        }
                    >
                        <Picker.Item label={'robot'} value={'robot'}/>
                        <Picker.Item label={'friendly'} value={'friendly'}/>
                    </Picker>
                    <Picker
                        style={styles.picker}
                        mode={'dialog'}
                        selectedValue={boardSize}
                        onValueChange={
                            (itemValue) => dispatch(changeBoard(itemValue))
                        }
                    >
                        <Picker.Item label={'3x3'} value={'3'}/>
                        <Picker.Item label={'5x5'} value={'5'}/>
                    </Picker>
                </View>
                <Board/>
                {
                    player1.winner && player2.winner ?
                        <Text style={styles.info}>Draw</Text>
                        :
                        player1.winner ?
                            <Text style={styles.info}>
                                {player1.winner && `${player1.name} win`}
                            </Text>
                            :
                            <Text style={styles.info}>
                                {player2.winner && `${player2.name} win`}
                            </Text>
                }
                <Button
                    mode={'contained'}
                    onPress={() => dispatch(restartGame())}

                >
                    Restart
                </Button>
                <CodeIcon/>
                
            </View>
        </ScrollView>
    )
}


export default Game
