<template>
    <div class="full-body" v-has="'test_bnt'">
        <div class="animate__animated animate__bounceIn">
            CSS3 animation 属性| 菜鸟教程
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted } from 'vue'
export default defineComponent({
    name: 'test',
    setup() {
        const form = reactive({
            show:true,
        });
        const handleClick = () =>{
            form.show = !form.show;
        }
        return{
            form,
            handleClick
        }
    }
})
</script>

<style scoped>

</style>