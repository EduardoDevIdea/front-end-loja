<template>

  <div id="app">

    <nav class="navbar navbar-light bg-light p-3">
      <a class="navbar-brand ml-4" href="/" style="font-size: 25px;"><strong>LOJA</strong></a>
    </nav>

    <router-view/> <!-- Renderiza View -->
    
  </div>
  
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style scoped>

   #nome-produto{
     font-size: 20px;
   }

</style>
