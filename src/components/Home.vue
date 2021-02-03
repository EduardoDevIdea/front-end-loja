<template>

    <div class=" container mt-5">

      <div class="row mb-5 justify-content-end">
        <router-link to="/carrinho">
            <img src="../assets/shopping-cart-solid.svg" alt="" style="width: 40px; height: 40px;">
        </router-link>
      </div>

      <div class="row">

        <div v-for="produto in produtos" :key="produto.id" class=" col-lg-4 col-md-6 col-sm-12 mb-5">
          <div class="card mx-auto" style="width: 18rem;">
            <img :src="urlProdutos + `/` + produto.img" class="card-img-top mx-auto" alt="..." style="width: 250px; height: 250px;">
            <div class="card-body text-center">
                <div id="nome-produto">{{produto.nome}}</div>
                <p class="card-text"><strong>R${{produto.preco}},00</strong></p>
                <a href="#" class="btn btn-dark btn-sm" @click="adicionarItem(produto)">
                    Adicionar ao carrinho
                </a>
            </div>
          </div>
        </div>

      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
import urlApi from '../urlApi';

const url = urlApi;

export default {
    name: "Home",

    data(){
        return{
            urlProdutos: url + "/images/produtos",
            produtos: [],
            itensCarrinho: [],
        }
    },

    //retorna todos os produtos
    created: function(){
        axios.get( url + "/api/produtos").then(res => {
            this.produtos = res.data;
        }).catch(e => {
            console.log(e);
        });
    },

    methods: {
        adicionarItem: function(produto){

            //variavel recebe ultimos itens do localStorage
            var lastItens = localStorage.getItem('carrinho');

            //se conteudo vindo do localStorage nao for nullo armazena no array para nao perder a informacao
            if(lastItens !== null){
                this.itensCarrinho = JSON.parse(lastItens);
                console.log(this.itensCarrinho);
            }

            //adiciona novo produto no array, junto aos itens anteriores
            this.itensCarrinho.push(produto);

            //percorre array e adiciona uniqueId correspondente ao index do array (será utilizado como identificador unico para cada produto)
            for(var i = 0; i < this.itensCarrinho.length; i++){
                this.itensCarrinho[i].uniqueId = i;
            }

            // armazena itens em localStorage
            var itensArray = JSON.stringify(this.itensCarrinho);
            localStorage.setItem('carrinho', itensArray);
        }
    },
}
</script>

<style>

</style>