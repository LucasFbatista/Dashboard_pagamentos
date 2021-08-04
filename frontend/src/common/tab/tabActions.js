export function selectTab(tabId) {
    return {

        type: 'TAB_SELECTED',
        payload: tabId
    }
}


export function showTabs(...tabIds) {

    //O QUE ESTAMOS UTILIZANDO ACIMA É UM OPERADOR DO TIPO REST ONDE EU PEGO TODOS OS PARAMETROS PASSADOS
    //PARA A FUNÇÃO E JUNTO ISSO EM UM ARRAY ONDE EU CONSIGO UTLIZAR E MANIPULAR DENTRO DESSA MINHA FUNÇÃO DIFEENTE DO SPREAD
    // QUE PEGA UM ARRAY E TRANFORMA EM PARAMETROS.
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true)
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}


