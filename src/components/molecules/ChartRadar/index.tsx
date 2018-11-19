import * as Chart from 'chart.js';
import * as React from 'react';

interface Props {
  title: string;
  usernames: string[];
  totals: number[];
}

class ChartRadar extends React.Component<Props> {
  private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
  private chart: Chart;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidMount() {
    const {title, usernames, totals} = this.props;
    const canvas: HTMLCanvasElement | null = this.canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.chart = new Chart(ctx, {
      type: 'radar',
      options: {
        title: {
          display: false,
        }
      },
      data: {
        labels: usernames,
        datasets: [{
          label: title,
          data: totals,
        }]
      }
    });
  }

  public componentDidUpdate() {
    this.chart.data.labels = this.props.usernames;
    this.chart.data.datasets = [{
      label: this.props.title,
      data: this.props.totals,
    }];
    this.chart.update();
  }

  public render() {
    return (
      <canvas
        style={{ width: '100%', height: '100%' }}
        ref={this.canvasRef}
      />
    );
  }
}

export default ChartRadar;
