<template>
    
    <div class="container">

        <div class="row mt-5 justify-content-end">
            <router-link to='/carrinho'><strong>Voltar</strong></router-link>
        </div>

        <div class="row w-75 mt-5 mx-auto">
            <h4>Preencha o formulário para confirmar o seu pedido</h4>
        </div>
    
        <div class="row w-75 mt-5 mx-auto">

            <!-- FORM CONFIRMA PEDIDO -->
            <form class="col-8">
               <div class="form-group">
                    <label for="exampleInputEmail1">Nome</label>
                    <input v-model="cliente.nome" type="text" class="form-control" id="nome" aria-describedby="textlHelp" required>
                    <small id="textlHelp" class="form-text text-muted">Nome completo</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">E-mail</label>
                    <input v-model="cliente.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
                    <small id="emailHelp" class="form-text text-muted">Entraremos em contato através desde e-mail</small>
                </div>
                <button type="button" class="btn btn-success" @click="confirmar">Confirmar</button>
            </form>
            <!-- END FORM CONFIRMA PEDIDO -->

            <!-- CONFERE PEDIDO -->
            <div class="class col-3" style="margin-top: 25px;">

                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h6>Confira aqui o seu pedido</h6>
                        <p v-for="itemCarrinho in itensCarrinho" :key="itemCarrinho.uniqueId" class="card-text">
                            {{itemCarrinho.nome}}: <strong>R${{itemCarrinho.preco}},00</strong>
                        </p>
                        
                        <p class="border"><strong>Total - R${{total}},00</strong></p>
                    </div>
                </div>
        
            </div>
            <!-- CONFERE PEDIDO -->

        </div>

    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "FinalizaPedido",

    data(){
        return{
            urlApi: "http://localhost:8000",
            rota: "",
            itensCarrinho: [],
            lastItens: [],
            total: 0,
            cliente: {
                nome: "",
                email: ""
            },
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

    },

    methods: {
        confirmar: function(){

            console.log(this.total);

            axios.post("http://localhost:8000/api/venda", {
                cliente: this.cliente,
                pedido: this.itensCarrinho,
                total: this.total,
            }).then( res => {
                console.log(res.data);
                localStorage.clear();
                window.alert("Pedido realizado com sucesso! Entraremos em contato através do e-mail com as instruções de pagamento. Obrigado!");
                this.$router.push("/");
            }).catch( e => {
                console.log(e);
                window.alert("Erro ao finalizar seu pedido: Tente novamente e entre em contato conosco, se o erro persistir")
            });

            
        }
    }
}
</script>

<style scoped>

</style>