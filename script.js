let seuVotoPara = document.querySelector('.d11 span') // variaveis de controle de interfacace
let cargo = document.querySelector('.d12 span')
let descricao = document.querySelector('.d14')
let aviso = document.querySelector('.d2')
let lateral = document.querySelector('.d1_right')
let numeros = document.querySelector('.d13')

let etapaAtual = 0  //variaveis de controle de ambiente
let numero = ''
let votobranco = false

function comecarEtapa(){

    let etapa = etapas[etapaAtual]

    let numeroHtml = '';
    numero = ''
    votobranco = false

    for(let i=0;i<etapa.numeros;i++){
        if(i === 0)
        {
            numeroHtml += '<div class="numero pisca"></div>'
        }
        else{
        numeroHtml += '<div class="numero"></div>'
    }
}

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
    
}

function atualizaInterface()
{
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{ 
        if(item.numero === numero){
            return true;
        }
        else{
            return false;
        }
    })

    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        
        let fotosHtml = ''
        for(i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1_image small"><img src="Imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>'`
            }
            else{
            fotosHtml += `<div class="d1_image"><img src="Imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>'`
        }
    }
        lateral.innerHTML = fotosHtml
    }
    else{
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class= " aviso-grande pisca">VOTO NULO</div>'
    }
}

function clicou(n){ // funcão dos numeros
        let elNumero = document.querySelector('.numero.pisca')

        if(elNumero !== null){
            elNumero.innerHTML = n
        }
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')

        if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca')
    }
    else {
        atualizaInterface()}
    }

function branco(){ // funcao do botao branco
    if(numero === ''){
        votobranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class= " aviso-grande pisca">VOTO EM BRANCO</div>'
        
    }
    else{
        alert("Aperte CORRIJA e depois vote em branco")
    }
}

function corrige(){ // funcao do botão corrige
    comecarEtapa()
}

function confirma(){ // funcao do botão confirma

    let etapa = etapas[etapaAtual]

    let votoConfirmado = false

    if(votobranco === true){
        votoConfirmado = true
    }
    else if(numero.length === etapa.numeros){
        votoConfirmado = true
    }
    else{
        alert("Digite o numero do candidato completo")
    }
    if(votoConfirmado){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }
        else{
            document.querySelector('.tela').innerHTML = '<div class= " aviso-gigante pisca">FIM</div>'
            alert("Aperte F5 para iniciar uma nova votação")

        }
    }

}

comecarEtapa()