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
                            <td><img :src="urlProdutos + `/` + itemCarrinho.img" alt="" style="width: 70px;"></td>
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
                        
                        <p><strong>Total: R$25000,00</strong></p>
                        <button class="btn btn-dark btn-sm">Finalizar Pedido</button>
                        
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
             urlProdutos: "http://localhost:8000/images/produtos",
            itensCarrinho: [],
            lastItens: [],
        }
    },

    created: function(){
        //armazena itens do localStorage em variavel
        var itensLocalStorage = localStorage.getItem('carrinho');

        //armazena itens em array no formato json para manipular os dados
        this.lastItens = JSON.parse(itensLocalStorage);
        
        // var element recebe lasItens e em seguida é percorrida para acrescentar uniqueId(identificador unico para cara item)
         var element = this.lastItens;

        for(var i = 0; i < element.length; i++){
            element[i].uniqueId = i;
        }
       
       // itensCarrinho recebe os itens atualizados e com nova propriedade uniqueId
       this.itensCarrinho = this.lastItens;

       console.log(this.itensCarrinho);
    },

    methods: {
        removerItem: function(id){ //recebe o uniqueId que tem o mesmo numero do index do array
            this.itensCarrinho.splice(this.itensCarrinho.indexOf(id), 1); //remove o elemento com o index indicado
            console.log(this.itensCarrinho);
        }
    }

}
</script>

<style scoped>

</style>