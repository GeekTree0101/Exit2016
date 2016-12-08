<template>
    <div id="home">
        <div class="title" v-if="state">{{title}}</div>
        <h3> Copyright(C)2016 MIRO </h3>
        <center>
            <button v-on:click='onClick'> Start </button>
            <component v-bind:is="currentView" v-bind:message='child'></component>
        </center>
    </div>
</template>


<script>

    import action from "./components.vue";
    import second from "./components2.vue";

    export default {

        name: 'home',
        data() {
            return {
                title: "Vue x Vertx",
                state: true,
                child : {
                    name : "test",
                    data : new Date()
                },
                currentView : action,
                flag : true
            }
        },
        methods: {
            onClick: function() {
                console.log("[+] Button Click",this);
                if(this.flag){
                    this.flag = false;
                    this.currentView = second;
                }
                else{

                    this.flag = true;
                    this.currentView = action;
                }

            }

        },
        components : {
            'action' : action,
            'second' : second
        }

    }


</script>