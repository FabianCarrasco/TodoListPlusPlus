<script lang="ts">
  import { todoLists } from "./store/stores";
  import type { ListInfo } from "./store/storeTypes";
  import List from "./components/List.svelte";

  let listName: ListInfo[]
  let newListName: string

  function createTodoList() {
    if(newListName.length == 0 || newListName.trim().length == 0){
      newListName = ""
      return
    }

    if($todoLists.find(item => item.subject == newListName) != undefined) {
      newListName = ""
      return
    }

    let newListObject: ListInfo = {
      subject: newListName,
      list: [],
      todo: ""
    }
    newListObject.subject = newListName
    console.log(newListObject)
    console.log($todoLists)
    $todoLists = [...$todoLists, newListObject]
    console.log($todoLists)
    newListName = ""
  }

</script>

<main>
  <div class="main-block">
    <form on:submit|preventDefault={createTodoList}>
      <label for="create-todo-list">Create Todo List</label>
      <input type="text" placeholder="Category..." bind:value={newListName}>
      <button type="submit">Add List</button>
    </form>
    <div class="lists-container">
      {#each $todoLists as item (item.subject)}
        <div class="list-item">
          <List subject={item.subject}/>
        </div>
      {/each}
    </div>
  </div>
</main>
  
<style>
  .main-block {
    width: 100%;
  }

  .lists-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .list-item {
    width: fit-content;
    margin: 2rem;
  }
</style>