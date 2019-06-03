<template>
    
</template>


<script>
export default {
    props:{
        dataImages: {
            type : Array,
            default: () => []
        },
        selectedImages: {
            type : Array,
            default: () => []
        }
    },
    data() {
        return {
            onselectedImage:{
                id: ''
            }
        }
    }
    
}
</script>


<style>

</style>
