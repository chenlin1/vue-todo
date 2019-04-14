<template>
    <section class="real-app">
        <input 
           type="text"
           class="add-input"
           autofocus="autofocus"
           placeholder="接下去要做什么"
           @keyup.enter="addTodo"
        />
        <Item 
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
        :todo="todo">
        
        </Item>
        <Tabs 
        :filter="filter" 
        :todos="todos"
        @toggle="toggleFilter"
        @clearAll="clearAllCompleted"
        ></Tabs>
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';
let id = 0;
export default {
    data() {
       return {
           todos: [],
           filter: 'all'
       }
    },
    components: {
        Item, 
        Tabs,
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'all'){
                return this.todos
            }
            const completed=this.filter === 'completed'
            return this.todos.filter(todo => completed === todo.completed)
        }
    },
    methods: {
        addTodo(e) {
          this.todos.unshift({
             id: id++,
             content: e.target.value.trim(),
             completed: false
          })
          e.target.value=''
        },
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        },
        toggleFilter(state) {
            this.filter = state
        },
        clearAllCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    }
}
</script>
<style lang="stylus" stylus>
.real-app{
    width 450px
    margin 0 auto
    background-color pink 
    text-align center
    padding 10px 20px
    input{
        margin-left 50px
        height 35px
        line-height 35px
        width 200px
        border none
        text-indent 10px
    }
}
</style>
