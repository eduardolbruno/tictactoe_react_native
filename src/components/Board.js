import React from 'react'
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles/GameStyle'
import Svg, { Circle, Path } from 'react-native-svg'
import { changePlayerState, changeTurn, finishGame, move } from '../redux'
import { getTheWinner } from '../functions/win'
import {
  robotPlayEasy,
  robotPlayHard,
  robotPlayImpossible
} from '../functions/robot/robotPlay'

const Board = () => {
  const { boardSize, board, player1, player2, gameFinished, difficulty, turn, mode } =
    useSelector(state => {
      return state
    })
  const dispatch = useDispatch()

  const setLabel = label => {
    if (label === 'x') {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 512 512">
          <Path d="M266.487 35.439c-4.557-1.178-9.208 1.604-10.359 6.17a8.523 8.523 0 006.178 10.368c9.131 2.313 16.23 9.412 18.517 18.526.973 3.874 4.454 6.451 8.269 6.451.691 0 1.391-.085 2.091-.256 4.574-1.152 7.339-5.786 6.195-10.359a42.585 42.585 0 00-30.891-30.9z" />
          <Path
            fill="#000000"
            d="M349.867 426.667h-1.075c5.896-7.356 9.609-16.358 9.609-25.6 0-16.657-8.235-33.604-17.775-53.24-11.665-24.013-24.892-51.243-24.892-83.294 0-43.17 4.574-68.113 6.844-77.85 10.778-3.012 18.756-12.817 18.756-24.55 0-14.114-11.486-25.6-25.6-25.6h-11.563C321.604 122.445 332.8 100.915 332.8 76.8 332.8 34.458 298.351 0 256 0s-76.8 34.458-76.8 76.8c0 24.115 11.196 45.645 28.629 59.733h-11.563c-14.114 0-25.6 11.486-25.6 25.6s11.486 25.6 25.6 25.6H281.6c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533h-85.333c-4.71 0-8.533-3.831-8.533-8.533s3.823-8.533 8.533-8.533h119.467c4.71 0 8.533 3.831 8.533 8.533s-3.823 8.533-8.533 8.533c-.119 0-.205.06-.324.068-.64.026-1.229.205-1.835.367-.478.128-.956.188-1.391.393-.521.239-.93.597-1.391.939-.435.316-.887.572-1.246.956-.341.358-.555.811-.828 1.237-.341.512-.691 1.007-.922 1.596-.043.102-.12.171-.154.282-.367 1.101-8.977 27.605-8.977 88.03 0 35.985 14.754 66.347 26.607 90.752 8.619 17.732 16.06 33.05 16.06 45.781 0 12.442-13.158 25.6-25.6 25.6H230.4c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h119.467c12.442 0 25.6 13.158 25.6 25.6v25.6H136.533v-25.6c0-12.442 13.158-25.6 25.6-25.6h34.133c4.719 0 8.533-3.823 8.533-8.533s-3.814-8.533-8.533-8.533c-12.442 0-25.6-13.158-25.6-25.6 0-12.732 7.441-28.049 16.06-45.781 11.853-24.405 26.607-54.767 26.607-90.752 0-11.221-1.408-28.834-4.173-52.343-.555-4.685-4.787-8.081-9.481-7.475-4.676.555-8.021 4.796-7.475 9.481 2.662 22.519 4.062 39.927 4.062 50.338 0 32.051-13.227 59.281-24.892 83.294-9.54 19.635-17.775 36.582-17.775 53.24 0 9.233 3.678 18.253 9.566 25.6h-1.033c-21.931 0-42.667 20.736-42.667 42.667v34.133a8.53 8.53 0 008.533 8.533h256a8.53 8.53 0 008.533-8.533v-34.133c.002-21.934-20.734-42.67-42.664-42.67zM256 136.533c-32.93 0-59.733-26.795-59.733-59.733S223.07 17.067 256 17.067s59.733 26.795 59.733 59.733S288.93 136.533 256 136.533z"
          />
        </Svg>
      )
    } else if (label === 'o') {
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={30.537}
          height={30.536}
          fill="#000000"
          width="50"
          height="50"
          viewBox="0 0 30.537 30.536">
          <Path d="M21.967 29.641c.11.289.146.896.146.896H8.423s.002-.606.13-.914c.108-.261.394-.502.48-.567.027-.117.051-.213.071-.291-.577-.793-.921-1.937-.837-3.121.087-1.213.969-2.437 1.563-3.377l.034-.066.044-.143h-.021c-.156-.008-.541-.312-.44-.688a.734.734 0 01.687-.574h.107a3.65 3.65 0 01.202-.354c1.083-2.604 2.333-6.809 2.739-9.317l-2.174-.001c-.108-.019-1.146-.582-1.077-1.494.08-1.143 1.143-1.56 1.247-1.56h2.263l.003-.032a4.234 4.234 0 01-2.369-3.813C11.075 1.892 12.946 0 15.254 0c2.308 0 4.179 1.892 4.179 4.225a4.228 4.228 0 01-2.369 3.813l.002.032h2.23c.104 0 1.211.417 1.289 1.56.069.911-1.012 1.477-1.12 1.491l-2.142.001c.416 2.55 1.971 7.183 3.173 9.44l.055.093c.066.073.011.059.055.139h.042a.74.74 0 01.687.574c.101.377-.282.681-.44.688h-.051l.004.209c.687 1.035 1.349 2.383 1.425 3.612.07 1.132-.243 2.05-.789 2.813.022.14.039.269.043.384.101.094.352.34.44.567z" />
        </Svg>
      )
    }
  }

  const setBorderStyle = (index, row, board) => {
    if (board > 3) {
      switch (index) {
        case 0:
          return {
            borderBottomWidth: row !== 4 ? 6 : 0,
            borderRightWidth: 3
          }
        case 1:
          return {
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: row !== 4 ? 6 : 0
          }
        case 2:
          return {
            borderBottomWidth: row !== 4 ? 6 : 0,
            borderRightWidth: 3,
            borderLeftWidth: 3
          }
        case 3:
          return {
            borderBottomWidth: row !== 4 ? 6 : 0,
            borderRightWidth: 3,
            borderLeftWidth: 3
          }
        case 4:
          return {
            borderBottomWidth: row !== 4 ? 6 : 0,
            borderLeftWidth: 3
          }
        default:
          break
      }
    }

    switch (index) {
      case 0:
        return {
          borderBottomWidth: row !== 2 ? 6 : 0,
          borderRightWidth: 3
        }
      case 1:
        return {
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderBottomWidth: row !== 2 ? 6 : 0
        }
      case 2:
        return {
          borderBottomWidth: row !== 2 ? 6 : 0,
          borderLeftWidth: 3
        }
      default:
        break
    }
  }

  const borderStyle = (index, row, board) => {
    return StyleSheet.create({
      border: {
        ...setBorderStyle(index, row, board)
      }
    })
  }

  const addWinner = (player, position) => {
    const details = player === 'player1' ? player1 : player2
    dispatch(
      changePlayerState(player, {
        ...details,
        winner: true
      })
    )
  }

  const playWithRobot = (row, column) => {
    dispatch(move(row, column, player1.label))
    const winner = getTheWinner(board)
    if (winner !== -1) {
      // win or equal
      dispatch(finishGame())
      if (winner !== 'equal') {
        addWinner('player1', winner)
      } else {
        addWinner('player1', winner)
        addWinner('player2', winner)
      }
    } else {
      dispatch(changeTurn(2))
      let [robotRow, robotCol] = [-1, -1]
      if (difficulty === 'easy') {
        ;[robotRow, robotCol] = robotPlayEasy(board)
      } else if (difficulty === 'hard') {
        ;[robotRow, robotCol] = robotPlayHard(board)
      } else if (difficulty === 'impossible') {
        ;[robotRow, robotCol] = robotPlayImpossible(board)
      }

      if (robotRow !== -1 || robotCol !== -1) {
        setTimeout(() => {
          dispatch(move(robotRow, robotCol, player2.label))
          const winner = getTheWinner(board)
          if (winner !== -1) {
            //win or equal
            dispatch(finishGame())
            if (winner !== 'equal') {
              addWinner('player2', winner)
            } else {
              addWinner('player1', winner)
              addWinner('player2', winner)
            }
          }
          dispatch(changeTurn(1))
        }, 500)
      }
    }
  }

  const play2Player = (row, column) => {
    if (turn === 1) {
      dispatch(move(row, column, player1.label))
      const winner = getTheWinner(board)
      if (winner === 'equal') {
        dispatch(finishGame())
        addWinner('player1', winner)
        addWinner('player2', winner)
      } else if (winner !== -1) {
        dispatch(finishGame())
        addWinner('player1', winner)
      }
      dispatch(changeTurn(2))
    } else {
      dispatch(move(row, column, player2.label))
      const winner = getTheWinner(board)
      if (winner === 'equal') {
        dispatch(finishGame())
        addWinner('player1', winner)
        addWinner('player2', winner)
      } else if (winner !== -1) {
        dispatch(finishGame())
        addWinner('player2', winner)
      }
      dispatch(changeTurn(1))
    }
  }

  const boardLength = board.length
  return (
    <View style={styles.table}>
      {board.map((row, rowKey) => (
        <View style={styles.row} key={rowKey}>
          {row.map((block, blockKey) => (
            <TouchableOpacity
              onPress={() => {
                if (board[rowKey][blockKey] === 0 && !gameFinished)
                  if (mode === 'robot') {
                    turn === 1 && playWithRobot(rowKey, blockKey)
                  } else {
                    play2Player(rowKey, blockKey)
                  }
              }}
              style={[
                styles.block,
                borderStyle(rowKey, blockKey, boardLength).border
              ]}
              key={blockKey}>
              {setLabel(block)}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

export default Board
