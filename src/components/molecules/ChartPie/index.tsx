import * as Chart from 'chart.js';
import * as React from 'react';

interface Props {
  type?: 'pie' | 'doughnut';
  title: string;
  loss: number;
  won: number;
}

class ChartPie extends React.Component<Props> {
  private readonly canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidMount() {
    const {type, title, loss, won} = this.props;
    const canvas: HTMLCanvasElement | null = this.canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    new Chart(ctx, {
      type: type || 'pie',
      options: {
        title: {
          display: true,
          text: title
        }
      },
      data: {
        labels: [`${loss} Loss`, `${won} Won`],
        datasets: [
          {
            data: [loss, won],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ]
          }
        ]
      }
    });
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

export default ChartPie;
