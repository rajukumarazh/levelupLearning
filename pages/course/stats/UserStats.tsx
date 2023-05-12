import React from 'react';
import Plot from 'react-plotly.js';
type Props = {};

export default function UserStats({}: Props) {
	return (
		<div>
			<Plot
				data={[
					{
						x: [1, 2, 3],
						y: [2, 6, 3],
						type: 'scatter',
						mode: 'lines+markers',
						marker: { color: 'red' },
					},
					{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
				]}
				layout={{ width: '100%', height: 320, title: 'Your LevelUp Graph' }}
			/>
		</div>
	);
}
