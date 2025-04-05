<script>
    import Heading from "./heading.svelte";
  </script>

<style>
    .sidebar {
      width: 130px;
      position: fixed;
      top: 0;
      left: 0;
      height: 80%;
      display: flex;
      flex-direction: column;
      padding-top: 100px;
      margin-left: 20px;
      text-transform: full-width;
    }

  
    .menu-item {
      padding: 10px;
      text-align: left;
      color: rgb(27, 18, 18);
      text-decoration: none;
      font-size: 12px;
      transition: background-color 0.2s;
      font-family:Verdana, sans-serif;
      font-weight: 20;
    }
  
    .menu-item:hover {
      background-color: #ffffff;
    }
    .menu-item[href="/about"] {
  margin-top: 20px;
}

</style>
  
  <div class="sidebar">
    <a class="menu-item" href="/part1">part 1</a>
    <a class="menu-item" href="/part3">part 3</a>
    <a class="menu-item" href="/part3.1">part 3.1</a>
    <a class="menu-item" href="/part4">part 4</a>
    <a class="menu-item" href="/about">about</a> 
    
    
  </div>
  


