<script>
    import { Line } from 'vue-chartjs';
    
    export default Line.extend({
        props: ['data', 'options'],
        mounted() {
            // Overwriting base render method with actual data.
            // push call of this function later to avoid transition issue
            setTimeout(() => { this.renderChart(this.data, this.options) }, 1000);
        }
    });
</script>
