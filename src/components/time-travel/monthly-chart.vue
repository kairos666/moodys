<template>
    <figure class="chart-figure">
        <line-chart :chart-data="computedChartData" :options="lineChartOptions"></line-chart>
        <figcaption>
            <slot></slot>
        </figcaption>
    </figure>
</template>

<script>
    import LineChart from '@/components/nano/reactive-line-chart';
    
    export default {
        props: ['datasets'],
        data() {
            return {
                lineChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    spanGaps: true,
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: true,
                                zeroLineColor: 'rgba(255, 87, 34, .75)',
                                zeroLineWidth: 1,
                                zeroLineBorderDash: [30, 15],
                                color: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']
                            },
                            ticks: {
                                fontFamily: 'icomoon',
                                fontSize: 24,
                                padding: 5,
                                suggestedMax: -2,
                                suggestedMin: -2,
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
            labels() {
                let results = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
                results.splice(this.datasets[0].data.length);
                return results;
            },
            computedChartData() {
                if (!this.datasets) return {};

                return {
                    labels: this.labels,
                    datasets: this.datasets
                };
            }
        },
        components: {
            'line-chart': LineChart
        }
    };
</script>

<style scoped lang="scss">
    @import '../../styles/_variables.scss';
    @import '../../styles/_moodies-icon-font.scss';
    .chart-figure { margin:0; }
    figcaption { padding-top:$gutter-base; text-align:center; }
</style>
