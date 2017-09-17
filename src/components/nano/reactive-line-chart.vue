<script>
    import { Line, mixins } from 'vue-chartjs';
    
    export default Line.extend({
        mixins: [mixins.reactiveProp],
        props: ['options'],
        mounted() {
            // this.chartData is created in the mixin.
            // If you want to pass options please create a local options object
            setTimeout(() => { this.renderChart(this.chartData, this.options) }, 1000);
            // this.renderChart(this.chartData, this.options);
        }
    });
</script>
