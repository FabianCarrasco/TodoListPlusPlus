<script lang="ts">
    import {todoLists} from '../store/stores'
    import type {ListInfo} from '../store/storeTypes'

    export let subject: string
    let list: string[] = []
    let showList: boolean = false;
    let todo: string
    function addTodo() { 
        if(todo == "" || todo.trim().length === 0){
            todo = ""
            return
        }

        if(list.find(val => val == todo) != undefined){
            todo = ""
            return
        }

        $todoLists = $todoLists.map(todoMap => {
            if(todoMap.subject == subject){
                todoMap.list = [todo, ...todoMap.list]
                list = todoMap.list
            }
            todo = ""
            return todoMap
        })
    }

    function removeTodo(ind) {
        console.log(ind)
        $todoLists = $todoLists.map(todoMap => {
            if(todoMap.subject == subject){
                todoMap.list.splice(ind, 1)
                list = todoMap.list
                return todoMap
            }
        })
    } 

    $: len = list.length

</script>

<div class="list-header">
    <div class="subject">
        <h2>{subject}</h2>
    </div>

    <div class="finished">
        <h2>{(len == 0) ? "" : len}</h2>
    </div>
    <div class="input-form">
        <form on:submit|preventDefault={addTodo}>
            <input type="text" bind:value={todo} placeholder="Todo">        
            <button type="submit">Add Todo</button>
        </form>
    </div>
</div>
<div class="list-content">
    {#each list as item, index (index)}
        <h2>{item}</h2>
        <button on:click={() => removeTodo(index)}>Remove</button>
    {:else}
        <p>No todos!</p>
    {/each}
</div>

<style>
    .list-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .list-content {
        height: 20rem;
        overflow-y: auto;
    }
</style>