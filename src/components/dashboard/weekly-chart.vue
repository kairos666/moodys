<template>
    <figure class="chart-figure">
        <line-chart :data="barChartData" :options="barChartOptions"></line-chart>
        <figcaption>chart caption</figcaption>
    </figure>
</template>

<script>
    import LineChart from '@/components/nano/line-chart';
    
    export default {
        data() {
            return {
                barChartData: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    datasets: [
                        {
                            label: 'David Maggi',
                            backgroundColor: 'rgba(63, 81, 181, .5)',
                            data: [-4, -3, -2, -1, 0]
                        },
                        {
                            label: 'Jinglu Dai',
                            backgroundColor: 'rgba(156, 39, 176, .5)',
                            data: [5, -5, 4, -4, 0]
                        },
                        {
                            label: 'Laurent Maggi',
                            backgroundColor: 'rgba(0, 150, 136, .5)',
                            data: [5, 4, -2, 1, -5]
                        }
                    ]
                },
                barChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontFamily: 'Material Icons',
                                callback: function(value, index, values) {
                                    // match each value with corresponding font icon
                                    // console.log('value: ', value);
                                    // console.log('values: ', values);
                                    // console.log('index: ', index);
                                    return '';
                                }
                            }
                        }]
                    }
                }
            };
        },
        components: {
            'line-chart': LineChart
        }
    };
</script>

<style scoped lang="scss">
    
</style>
