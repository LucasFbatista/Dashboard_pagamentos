import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {

    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')  
}


export function update(values){
    return submit(values, 'put')

}

export function remove(values){
    return submit(values, 'delete')
}

function submit(values, method){

    //ESTAMOS FAZENDO PARA UTILIZAR O MESMO METODO PARA DELETE, PUT E CREATE
    return dispatch => {

        //AQUI FAZEMOS UMA VERIFICAÇÃO CASO O values._id SEJA IGUAL A TRUE NO CASO SEJA PASSADO ELE IRÁ CONCATENAR E FAZER A ATUALIZAÇÃO
        //AGORA CASO NÃO SEJA ELE IRÁ RETONA UMA STRING VAZIA.
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            }).catch(e => {
                //USAMOS DESTA FORMA POIS O RETORNO DOS NOSSOS ERROS É UMA ARRAY
                e.response.data.errors.forEach(error =>  toastr.error('Erro', error))
            })
    }
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function init() {
    return [

        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}