<template>
    <div :class="['todo-ite', todo.completed ? 'completed' : '']">
        <input 
         type="checkbox"
         class="toggle"
         v-model="todo.completed"
         />
         <label>{{todo.content}}</label>
         <button class="destory" @click="deleteTodo">x</button>
    </div>
</template>
<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        }
    },
    methods: {
        deleteTodo() {
           this.$emit('del', this.todo.id);
        }
    }
}
</script>
<style lang="stylus" stylus>
.todo-ite{
    display flex
    
    label{
        padding 5px 30px
        line-height 30px
    }
    button{
        width 20px
        height 20px
        line-height 30px
        font-size 20px
        text-align center
        border none
        background-color transparent
        color red
        cursor pointer
    }
    .destory{
        display none
    }
}
.todo-ite:hover .destory{
    display block
}
</style>

