export default function formatData(data, tipoDeData,  tipoDeRetorno, returnHoraMinSec){ // tipoDeData = 1: Wed Sep 09 2020 00:00:00 GMT-0300, 2: 00/00/0000 ou 0000/00/00

    let dataFormatada = 0;

    if( !data){
        return data;
    }

    if(tipoDeData == 2){

        let splitData = data.split('/');
        let splitDataFormatada = splitData[2].slice(0,4);

        if( tipoDeRetorno == 'anoMesDia' ){
           
            dataFormatada = splitDataFormatada + '-' + splitData[1] + '-' + splitData[0] ;
           
        }else if( tipoDeRetorno == 'diaMesAno' ){

            dataFormatada = splitData[0] + '-' + splitData[1] + '-' + splitDataFormatada ;

        }


        if(returnHoraMinSec){

            let horaMinSec = splitData[2].slice(4, splitData[2].length)

            dataFormatada = dataFormatada + horaMinSec

            return dataFormatada;
        }

        return dataFormatada
        
  
    }
  
}