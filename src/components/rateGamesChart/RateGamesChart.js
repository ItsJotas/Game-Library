import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import "./RateGamesChart.css";

const maxValue = 10;

const getColorForValue = (value) => {
  const ratio = value / maxValue;
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * ratio);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

const getColorForMaxValue = (value) => {
  if(value < 5) {
    return '#e3e9ea'
  } else if (value >= 5 && value < 7) {
    return '#50d9a5';
  } else if (value >= 7 && value < 8) {
    return '#50c2d9';
  } else if (value >= 8 && value < 9) {
    return '#bb50d9';
  } else if (value >= 9 && value < 9.5) {
    return '#e5fe00'
  } else {
    return '#e65218'
  }
}

const getGameQuality = (value) => {
  if(value < 5) {
    return "Bad"
  } else if (value >= 5 && value < 7) {
    return "Common";
  } else if (value >= 7 && value < 8) {
    return "Good";
  } else if (value >= 8 && value < 9) {
    return "Great";
  } else if (value >= 9 && value < 9.5) {
    return "Perfect"
  } else {
    return "GOAT"
  }
}

const data = (average) => [
  { name: 'Average', value: average, fill: getColorForValue(average) },
  { name: 'Max Value', value: maxValue, fill: getColorForMaxValue(average) },
];

export default function Average({ average }) {

  return (
      <ResponsiveContainer width="80%" height="80%">
          <RadialBarChart
            cx="50%" cy="50%" innerRadius="76%" outerRadius="100%"
            barSize={15} data={data(average)} startAngle={-120} endAngle={-420}
          >
            
          <RadialBar dataKey="value" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="rate-games-chart-value"
              style={{fill: getColorForValue(average)}}
            >
              {average}
            </text>

            <text
              x="50%"
              y="64%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="rate-games-chart-text"
              style={{fill: getColorForMaxValue(average)}}
            >
              {getGameQuality(average)}
            </text>

          </RadialBarChart>
        </ResponsiveContainer>
  );
}