<template>
    <div>
        <h1 v-on:click="hover"> {{message.name}} </h1> 
        <hr/>
        <input type="text" v-model='message.name'></input>
    </div>    
</template>


<script>

    export default {

        name : "second",
        props : {
            message : {
                type : 'Object'
            }
        },
        data(){
            return {
                testValue : "testValue"
            }
        },
        methods : {
            hover : function(){

                console.log("out",this.testValue);
                console.log("this", this);
            
                this.$parent.onClick();
            }
        }
    }
</script>
