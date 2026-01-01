import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const AreaChart = () => {
    const options: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: { show: false }
        },
        colors: ['#2563EB'],
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: { colors: '#64748b' },
                format: 'dd MMM'
            }
        },
        yaxis: {
            labels: { style: { colors: '#64748b' } }
        },
        tooltip: {
            x: { format: 'dd/MM/yyyy' }
        },
        grid: {
            borderColor: '#f1f5f9',
        }
    };

    const series = [
        {
            name: 'North',
            data: [
                [new Date('2025-12-20').getTime(), 30],
                [new Date('2025-12-21').getTime(), 40],
                [new Date('2025-12-22').getTime(), 70],
                [new Date('2025-12-23').getTime(), 50],
                [new Date('2025-12-24').getTime(), 60],
                [new Date('2025-12-25').getTime(), 15],
                [new Date('2025-12-26').getTime(), 30],
                [new Date('2025-12-27').getTime(), 50],
                [new Date('2025-12-28').getTime(), 99],
            ]
        }
    ];

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
            <Chart
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </div>
    );
};

export default AreaChart;