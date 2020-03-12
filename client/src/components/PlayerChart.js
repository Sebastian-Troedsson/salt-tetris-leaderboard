import React from 'react'
import { Chart } from 'react-charts';

export default function PlayerChart({ player }) {
  console.log(player.games);

  const createDataForChart = () => {
    const data = [player.games.map(game => {
      return []
    })]
  };

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  return (
    <div style={{
      width: '400px',
      height: '300px'
    }}>
      <Chart data={data} axes={axes} />
    </div>
  )
}
