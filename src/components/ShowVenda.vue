<template>
    
    <div class="container pt-5">

        <div class="row justify-content-end">
            <router-link to='/vendas'><strong>Voltar</strong></router-link>
        </div>

        <div class="row mb-3">
            <h4>Venda - nº {{idVenda}}</h4>
        </div>

        <div class="row">
            
            <div class="col-md-6 col-sm-12">
                <form>
                    <div class="form-group">
                        <label for="cliente">Cliente</label>
                        <input v-model="venda.cliente" type="text" class="form-control" id="cliente" readonly>
                    </div>
                    <div class="form-group">
                        <label for="cliente">Email</label>
                        <input v-model="venda.email" type="text" class="form-control" id="cliente" readonly>
                    </div>
                </form>

                <div class="border rounded">
                    <h5>Status:</h5>{{status}}
                </div>

                <div v-if="status == 'Aguardando pagamento' " class="mt-4">
                    <button class="btn btn-success btn-sm" @click="confirmaPagamento">Confirmar pagamento</button>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="row">
                    <div class="col">
                        <strong>Data compra: {{venda.data}}</strong>
                    </div>
                    <div class="col text-right">
                        <strong>Tempo de entrega: {{venda.previsao}} dias</strong>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row w-25 mb-3 border border-dark rounded" style="margin-left: 0px;">
                            <strong>Total: R${{venda.valor}},00</strong>
                        </div>
                        <p v-for="produto in produtos" :key="produto.id">
                            <strong>R${{produto.preco}},00</strong> - {{produto.nome}}
                        </p>
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
    name: "ShowVenda",

    data(){
        return{
            idVenda: this.$route.params.id,
            status: "",
            venda: {},
            produtos: [],
        }
    },

    created: function(){
        axios.get( url + "/api/show-venda" + "/" + this.idVenda)
        .then( res => {
            console.log(res.data);
            this.venda = res.data.venda;
            this.produtos = res.data.produtos;
            this.status = res.data.venda.status;
        })
        .catch( e => {
            console.log(e);
        });
    },

    methods: {
        confirmaPagamento: function(){
            axios.post( url + "/api/pagamento", {
                id: this.idVenda
            }).then( res => {
                alert(res.data.message);
                window.location.reload();
            }).catch( e => {
                console.log(e);
            });
        }
    }
}
</script>

<style scoped>

</style>