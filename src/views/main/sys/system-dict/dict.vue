<template>
    <div class="full-body">
        <div class="flex-box">
            <!-- modeList:可选的编辑模式列表 ["tree", "code", "form", "view"] -->
            <!-- currentMode:当前编辑模式(小写) -->
            <!-- v-model:绑定需要修改的值 -->
            <!-- update:modelValue:监听到修改的值发生变化 -->
            <!-- @blur="validate": 校验json -->
            <JsonEditorVue class="editor" :currentMode="form.currentMode" :modeList="form.couldView" v-model="form.data" @blur="validate"/>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive} from 'vue'
import { useStore } from 'vuex'
import JsonEditorVue from 'json-editor-vue3'
export default defineComponent({
    components: { JsonEditorVue },
    setup() {
        const store = useStore();
        const validate = async (editor) => {
            const res = await editor.validate();
            // res 是错误列表，如果是空数组，则表示检测没有错误
            console.log(res);
        };
        const form = reactive({
            data:store.state.dict.sysDict,
            couldView:["view"],
            currentMode:'view'
        });

        return{
            form,
            validate
        }
    }
})
</script>

<style lang="scss" scoped>

</style>