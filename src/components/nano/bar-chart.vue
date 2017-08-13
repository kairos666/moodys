<script>
    import { Bar } from 'vue-chartjs';
    
    export default Bar.extend({
        props: ['data', 'options'],
        mounted() {
            // Overwriting base render method with actual data.
            // push call of this function to next tick to avoid error
            setTimeout(() => { this.renderChart(this.data, this.options) }, 0);
        }
    });
</script>
