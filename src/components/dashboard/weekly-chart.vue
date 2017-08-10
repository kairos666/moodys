<template>
    <figure class="chart-figure">
        <line-chart :data="lineChartData" :options="lineChartOptions"></line-chart>
        <figcaption>chart caption <i class="icon-apocalyptic"></i></figcaption>
    </figure>
</template>

<script>
    import LineChart from '@/components/nano/line-chart';
    
    export default {
        data() {
            return {
                lineChartData: {
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
                lineChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontFamily: 'icomoon',
                                fontSize: 24,
                                padding: 10,
                                callback: function(value, index, values) {
                                    // match each value with corresponding font icon
                                    let iconLabel;
                                    switch (value) {
                                    case -5: iconLabel = ''; break;
                                    case -4: iconLabel = ''; break;
                                    case -3: iconLabel = ''; break;
                                    case -2: iconLabel = ''; break;
                                    case -1: iconLabel = ''; break;
                                    case 0: iconLabel = ''; break;
                                    case 1: iconLabel = ''; break;
                                    case 2: iconLabel = ''; break;
                                    case 3: iconLabel = ''; break;
                                    case 4: iconLabel = ''; break;
                                    case 5: iconLabel = ''; break;
                                    }
                                    return iconLabel;
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
    @import '../../styles/_moodies-icon-font.scss';
</style>
