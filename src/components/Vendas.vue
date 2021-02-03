<template>
    
<div class="container">

    <div class="row justify-content-end">
        <!-- <router-link to='/'><strong>Sair</strong></router-link> -->
        <a href="#" @click="logout()"><strong>Sair</strong></a>
    </div>

    <!-- Tabela Vendas-->
    <div class="row-100 pt-5">

        <div v-if="vendas == '' " class="row mb-4">
            <h4>
                Nenhuma venda registrada até o momento.
            </h4>
        </div>

        <table class="table">
            <thead class="thead-dark">
                <th>nº</th>
                <th>Total</th>
                <th>Data compra</th>
                <th>Previsão (dias)</th>
                <th>Status</th>
                <th>Exibir</th>
            </thead>
            <tbody>
                <tr v-for="venda in vendas" :key="venda.id">
                    <td>{{venda.id}}</td>
                    <td>R${{venda.valor}},00</td>
                    <td>{{venda.data}}</td>
                    <td>{{venda.previsao}}</td>
                    <td>{{venda.status}}</td>
                    <td>
                        <!-- <router-link :to="'/show-venda/' + {venda.id}" class="btn btn-primary btn-sm"> -->
                        <router-link :to="'/show-venda/' + venda.id" class="btn btn-primary btn-sm">
                            Exibir
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <!-- Fim Tabela Vendas -->

</div>

</template>

<script>
import axios from 'axios';
import urlApi from '../urlApi';

const url = urlApi;

export default {
    name: "Vendas",

    data(){
        return {
            vendas: "",
        }
    },

    created: function(){

        console.log(this.vendas);

        var acesso = localStorage.getItem('acesso');
        if(acesso == 'garantido'){

            axios.get( url + "/api/vendas").then( res => {
                console.log(res.data);
                this.vendas = res.data;
            }).catch(e => {
                console.log(e);
            });

        }else{
            this.$router.push("/");
        }
    },

    methods: {
        logout: function(){
            var confirmacao = confirm("Deseja realmente sair?");
            if(confirmacao){
                localStorage.setItem('acesso', '');
                this.$router.push('/');
            }
        }
    }

}
</script>

<style scoped>

</style>