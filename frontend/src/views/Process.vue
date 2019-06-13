<template>
<div>
please wait....
</div>
</template>

<script>
import axios from 'axios'
import router from "../router"

  export default {
    methods:{
      process: function() {
        this.$router.push({
            name : "mainpage"
        })
      }
    },
    created () {
        this.process()
    }
  };

</script>