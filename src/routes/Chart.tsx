import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';
interface ChartProps {
  coinId: string;
}
interface IHistoryData {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const params = useParams();
  console.log(params);
  const { isLoading, data } = useQuery<IHistoryData[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            grid: { show: false, yaxis: { lines: { show: true } } },
            stroke: { curve: 'smooth' },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['skyblue'], stops: [0, 80] },
            },
            colors: ['violet'],
            tooltip: {
              x: { format: 'MM/yy HH:mm' },
              y: { formatter: (value) => `$${value.toFixed(0)}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
