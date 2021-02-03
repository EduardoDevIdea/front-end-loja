<template>

  <div id="app">

    <nav class="navbar navbar-light bg-light p-3">
      <a class="navbar-brand ml-4" href="/" style="font-size: 25px;"><strong>LOJA</strong></a>
      <!-- Botao de acesso ao painel de vendas -->
      <button class="btn btn-outline-secondary btn-sm" @click="acessarPainel">
        Adm. Vendas
      </button>
    </nav>

    <router-view/> <!-- Renderiza View -->
    
  </div>
  
</template>

<script>

export default {
  name: 'App',
  components: {

  },

  created: function(){
    //armazena senha de acesso ao painel de vendas em localStorage
    localStorage.setItem('senha', 'admin');
  },

  methods: {
    //Pequena logica de validacao de usuario administrador
    acessarPainel: function(){
      var acesso = localStorage.getItem('acesso');
      if(acesso == 'garantido'){
        this.$router.push("/vendas");
      }else{
        var inputSenha = prompt("Por favor, insira a senha de acesso.");
        var senha = localStorage.getItem('senha');
        if(inputSenha == senha){
          localStorage.setItem('acesso', 'garantido');
          this.$router.push("/vendas");
        }else{
          alert('Senha incorreta!');
        }
      }
      
    }
  }
}
</script>

<style scoped>

   #nome-produto{
     font-size: 20px;
   }

</style>
