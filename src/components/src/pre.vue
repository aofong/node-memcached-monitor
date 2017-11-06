<template>
    <pre>{{html}}</pre>
</template>
<script>
    export default {
        name: 'ElPre',
        data() {
            return {
                preContent: ''
            }
        },
        props: {
            html: {
                type: String,
                default: ''
            },
        }
    }
</script>