
import Chart from 'react-apexcharts';


const AreaChart = () => {
    const options = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: { show: false }
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: { enabled: false },
        stroke: { curve: 'monotoneCubic' },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.1,
            }
        },
        legend: { position: 'top', horizontalAlign: 'left' },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM'
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yyyy'
            }
        },
        theme: { mode: 'light' }
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
        <div className="bg-white p-4 rounded-lg shadow-sm w-full">
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