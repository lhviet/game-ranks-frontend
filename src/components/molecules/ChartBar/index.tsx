import * as Chart from 'chart.js';
import * as React from 'react';

interface Props {
}

class ChartBar extends React.Component<Props> {
  private readonly canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidMount() {
    const canvas: HTMLCanvasElement | null = this.canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: '# of Likes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ]
          }
        ]
      }
    });
  }

  public render() {
    return (
      <canvas
        style={{ width: 800, height: 300 }}
        ref={this.canvasRef}
      />
    );
  }
}

export default ChartBar;
