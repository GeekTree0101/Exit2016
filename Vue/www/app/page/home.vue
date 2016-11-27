<template>
    <div id="home">
        <div class="title" v-if="state">{{title}}</div>
        <h3> Copyright(C)2016 MIRO </h3>
        <center>
            <button v-on:click='onClick'> Start </button>
        </center>
    </div>
</template>


<script>
    export default {

        name: 'home',
        data() {
            return {
                title: "Vue x Vertx",
                state: true
            }
        },
        methods: {
            onClick: function() {
                console.log("[+] Button Click");
            }

        }
    }
</script>