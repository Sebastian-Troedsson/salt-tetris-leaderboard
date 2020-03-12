import React from 'react'
import { Chart } from 'react-charts';

export default function PlayerChart({ player }) {

  const createDataForChart = () => {
    let score = 0;
    const data = player.games.map((game, index) => {
      return [index + 1, game.win ? ++score : --score];
    });
    data.unshift([0, 0]);
    return data;
  };

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: createDataForChart()
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
      <Chart data={data} axes={axes}/>
    </div>
  )
}
