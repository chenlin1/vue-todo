<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} item left</span>
        <span class="tabs">
            <span 
            v-for="state in states" 
            :key="state" 
            :class="[state, filter === state ? 'acti' : '']" 
            @click="toggleFilter(state)">
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">clearAllCompleted</span>
    </div>
</template>


<script>
    export default {
        props: {
            filter: {
                type: String,
                required: true,
            },
            todos: {
                type: Array,
                required: true
            }
         },
        data() {
            return {
                states: ["all", "active", "completed"]
            }
        },
        computed: {
            unFinishedTodoLength(){
                return this.todos.filter(todo => !todo.completed).length
            }
        },
        methods: {
            toggleFilter(state) {
                this.$emit('toggle', state)
            },
            clearAllCompleted(){
                this.$emit('clearAll')
            }
        }
    }
</script>

<style lang="stylus" stylus>
.helper{
    width 600px
    display flex
    margin-top 20px
    .left{
       width 100px
    }
    .tabs{
        width 200px
    }
    .acti{
        border 1px red solid
        cursor pointer
        color yellow
    }
}
</style>
