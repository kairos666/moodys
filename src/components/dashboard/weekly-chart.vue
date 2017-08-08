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
                            backgroundColor: '#f87979',
                            data: [-4, -3, -2, -1, 0]
                        },
                        {
                            label: 'Jinglu Dai',
                            backgroundColor: '#f16e00',
                            data: [5, -5, 4, -4, 0]
                        },
                        {
                            label: 'Laurent Maggi',
                            backgroundColor: '#797979',
                            data: [5, 4, -2, 1, -5]
                        }
                    ]
                },
                barChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
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
