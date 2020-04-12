<template>
    <div ref="wrapper">
        <!-- <div>scroll-view scroll-view scroll-view scroll-view scroll-view scroll-view scroll-view
            scroll-view scroll-view
            scroll-view</div>  -->
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: {
    },
    mounted() {
        setTimeout(() => {  //确保DOM已经渲染
            this. _initScroll();
            console.log('scroll-view 组件')
        }, 20)
        // this.$nextTick(() => {
        //     this.scroll = new BScroll(this.$refs.wrapper, {
        //         bounce: {
        //             top: true,
        //             bottom: true,
        //             left: false,
        //             right: false
        //         }
        //     })
        // })
    },
    methods: {
         _initScroll(){
             if(!this.$refs.wrapper){
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: "vertical"
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
