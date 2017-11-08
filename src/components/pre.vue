<template>
    <pre>{{html}}</pre>
</template>
<script>
    export default {
        props: {
            html: {
                type: String,
                default: ''
            },
        }
    }
</script>
<style scoped>
    pre {
        background: #EDF2FC;
        border: #E6EBF5 solid 1px;
        padding: 5px;
        font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    }
</style>