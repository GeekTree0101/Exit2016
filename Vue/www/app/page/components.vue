<template>
    <div>
        <button v-on:click='hover'> {{message.name}} </button>
        <hr/>
        <input type="text" v-model='message.name'></input>
    </div>    
</template>


<script>

    export default {

        name : "action",
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
