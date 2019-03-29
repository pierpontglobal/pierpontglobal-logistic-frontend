import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import Paper from '@material-ui/core/Paper';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


class PPGActivePie extends PureComponent {

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <Paper style={{ margin: '9px', padding: '12px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '100%', padding: '12px', marginLeft: '5px', marginBottom: '12px' }}>
          <span style={{ fontWeight: '600' }}>Orders categorized in its different statuses</span>
        </div>
        <PieChart style={{ margin: '0 auto' }} width={550} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={275}
            cy={200}
            innerRadius={100}
            outerRadius={120}
            fill="#000"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </Paper>
    );
  }
}

export default PPGActivePie;
