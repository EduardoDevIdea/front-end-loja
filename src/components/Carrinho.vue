<template>
    
   
    <div id="conteudo-tela" class="container pt-5">

        <div class="row justify-content-end">
            <router-link to='/'><strong>Voltar</strong></router-link>
        </div>

        <div class="row w-100 mt-3">

            <!-- CARRINHO -->
            <div class="col-8">
                <div class="row mb-3">
                    <div class="col-6">
                        <h3>Meu carrinho</h3>
                    </div>
                </div>

                <!--TABELA PRODUTOS -->
                <table class="table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Imagem</th>
                            <th>Preço</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="itemCarrinho in itensCarrinho" :key="itemCarrinho.uniqueId">
                            <td>
                                {{itemCarrinho.nome}}
                            </td>
                            <td><img :src="urlApi + pathImgProdutos + `/` + itemCarrinho.img" alt="" style="width: 70px;"></td>
                            <td>R$ {{itemCarrinho.preco}},00</td>
                            <td>
                                <a href="#" @click="removerItem(itemCarrinho.uniqueId)">
                                    <img src="../assets/icon-trash.svg" alt="" style="width: 18px;">
                                </a>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <!-- END TABELA PRODUTOS -->
            </div>
            <!-- END CARRINHO -->
      
            <!-- FINALIZAR PEDIDO -->
            <div class="col-4">
                <div class="card ml-auto" style="width: 18rem; margin-top: 55px;">
                    <div class="card-body text-center">
                        
                        <p><strong>Total: R${{total}},00</strong></p>
                        <router-link to="/finaliza-pedido">
                            <a href="#" class="btn btn-dark btn-sm">
                                Finalizar pedido
                            </a>
                        </router-link>
                        
                    </div>
                </div>
            </div>
            <!-- END FINALIZAR PEDIDO -->

        </div>
        
    </div>
    

</template>

<script>
export default {
    name: "Carrinho",

    data(){
        return{
            urlApi: "http://localhost:8000",
            pathImgProdutos: "/images/produtos",
            itensCarrinho: [],
            lastItens: [],
            total: 0
        }
    },

    created: function(){
        //armazena itens do localStorage em variavel
        var itensLocalStorage = localStorage.getItem('carrinho');

        //armazena itens em array no formato json para manipular os dados
        this.lastItens = JSON.parse(itensLocalStorage);

       // itensCarrinho recebe os itens atualizados e com nova propriedade uniqueId
       this.itensCarrinho = this.lastItens;

        for(var i = 0; i < this.itensCarrinho.length; i++){
            this.total= this.itensCarrinho[i].preco + this.total;
        }

        console.log(this.itensCarrinho);

    },

    methods: {
        removerItem: function(id){ //recebe o uniqueId que tem o mesmo numero do index do array

            this.itensCarrinho.splice(id, 1); //remove o elemento com o index indicado

            //percorrendo array itensCarrinho e atribuindo valor uniqueId de maneira ordenada
            for(var i = 0; i < this.itensCarrinho.length; i++){
                this.itensCarrinho[i].uniqueId = i;
            } 

            //itensArray recebe itensCarrinho em formato de array
            var itensArray = JSON.stringify(this.itensCarrinho);

            //atualizando localStorage
            localStorage.setItem('carrinho', itensArray);

            window.location.reload();
        }
    }

}
</script>

<style scoped>

</style>