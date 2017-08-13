<script>
    import { Line } from 'vue-chartjs';
    
    export default Line.extend({
        props: ['data', 'options'],
        mounted() {
            // Overwriting base render method with actual data.
            // push call of this function to next tick to avoid error
            setTimeout(() => { this.renderChart(this.data, this.options) }, 0);
        }
    });
</script>
