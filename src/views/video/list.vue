<template>
</template>
<script>
import * as api from "@/views/video/api/list.js"
export default {
    data(){
        return{
            page:"",
            size:""
        }
    },
    mounted(){
        api.getList(this.page,this.size);
    }
}
</script>
