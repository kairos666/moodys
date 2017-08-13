<template>
    <figure class="chart-figure">
        <line-chart :data="chartData" :options="lineChartOptions"></line-chart>
        <figcaption>chart caption <i class="icon-apocalyptic"></i></figcaption>
    </figure>
</template>

<script>
    import LineChart from '@/components/nano/line-chart';
    
    export default {
        props: ['datasets', 'full-week'],
        data() {
            return {
                lineChartData: {
                    labels: (this.fullWeek) ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'staurday', 'sunday'] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    datasets: []
                },
                lineChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    spanGaps: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontFamily: 'icomoon',
                                fontSize: 24,
                                padding: 5,
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
        computed: {
            chartData() {
                return Object.assign(this.lineChartData, { datasets: this.datasets });
            }
        },
        components: {
            'line-chart': LineChart
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_moodies-icon-font.scss';
    .chart-figure { margin:0; }
</style>
