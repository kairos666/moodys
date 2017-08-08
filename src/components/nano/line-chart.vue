<script>
    import { Line } from 'vue-chartjs';
    
    export default Line.extend({
        props: ['data', 'options'],
        mounted() {
            // Overwriting base render method with actual data.
            this.renderChart(this.data, this.options);
        }
    });
</script>
