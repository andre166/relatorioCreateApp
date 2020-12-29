import { format } from 'date-fns';
import isValid from 'date-fns/isValid';
import isEqual from 'date-fns/isEqual';
import formatDateTime from '../../utils/formatDateTime';
import isDate from 'date-fns/isDate';
import moment from 'moment';

export const formatRelatorio = ( relatorio, colunasDeDatas,  colunas) => {

    relatorio.map( e => {

        colunasDeDatas.map( coluna => {

            e[ coluna.title ] = formatarData( e[ coluna.title ], coluna.tipo );

        });

    })

}

const formatarData = ( data, tipoDaColuna ) => {

    let dataParaVerificacao = new Date(data);
    

    if( dataParaVerificacao === 'Invalid Date'){
        data = dataParaVerificacao;
    }

    let regex1 = /[\d]{2}\/[\d]{2}\/[\d]{4}/g; // verifica se a data é dd/mm/yyyy
    let regex2 = /[\d]{2}\-[\d]{2}\-[\d]{4}/g; // verifica se a data é dd-mm-yyyy
    let regex3 = /[\d]{4}\-[\d]{2}\-[\d]{2}$/gm;

    let testeRegex1 = regex1.test(data);
    let testeRegex2 = regex2.test(data);
    let testeRegex3 = regex3.test(data);

    let dataFormatada = new Date();


    if( testeRegex1 ){

        if( tipoDaColuna === 'date'){
            
            let splitData = data.split('/');
            let splitDataFormatada = splitData[2].slice(0,4);
            let dataFinal = splitData[0] + '/' + splitData[1] + '/' +  splitDataFormatada
            
            return dataFinal;

        }else{

            return data;
        }


    }else if( testeRegex2 ){

        dataFormatada = data.replace(/-/g, '/');

        if( tipoDaColuna === 'date'){
            
            let splitData = dataFormatada.split('/');
            let splitDataFormatada = splitData[2].slice(0,4);
            let dataFinal = splitData[0] + '/' + splitData[1] + '/' +  splitDataFormatada
            
            return dataFinal;

        }else{

            return dataFormatada;
        }

    }else if( testeRegex3 ){


        let dt = data.split('-');

        let dataFinal = dt[2] + '/' + dt[1] + '/' + dt[0];

        return dataFinal;

    }else if( isValid(new Date(data)) ){
        
        let instaciaDeDate = new Date(data);

        let hours = instaciaDeDate.getHours();
        let minutes = instaciaDeDate.getMinutes();
        let seconds = instaciaDeDate.getSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;      
        seconds = seconds < 10 ? '0' + seconds : seconds;

        let timeString = hours + ':' + minutes + ':' + seconds; 

        dataFormatada = format( instaciaDeDate, 'dd/MM/yyyy');

        if( tipoDaColuna === 'datetime'){
            dataFormatada = dataFormatada + ' ' + timeString;
        }


        return dataFormatada;

    }else if( !data ){

        return '';

    }else{
        return 'Data inválida';
    }

}

export const compareDateTime = ( dat1, dat2 ) => {

    let dataDoCalendario = '';
    let dataDaRow = '';

    if( isDate(dat2) ){

        dataDaRow = formatDateTime( dat1, 2, 'anoMesDia' );
        dataDoCalendario = formatarData( dat2, 1, 'anoMesDia');

        dataDaRow = new Date(dataDaRow);
        dataDoCalendario = new Date(dataDoCalendario);
          
        if( isValid(dataDaRow) ){

            if( isEqual(dataDoCalendario, dataDaRow, 1 ) ) return dataDaRow;

        }else{
            return '';
        }

    }

    dataDaRow = formatDateTime( dat1, 2, 'diaMesAno', true );

    dataDaRow = dataDaRow.replace(/-/g, '/');

    let c = dataDaRow.indexOf(dat2);

    if( c > -1 ){
        return dataDaRow;
    }

}

export const compareDate = ( dat1, dat2 ) => {

    let dataDoCalendario = '';
    let dataDaRow = '';

    if( isDate(dat2) ){

        let dataDaRow = moment(dat1, 'DD/MM/YYYY').format("YYYY-MM-DD");
        let dataDoCalendario = moment(dat2).format("YYYY-MM-DD");

        if( dataDaRow == dataDoCalendario){

            return dataDaRow;

        }

    }

    //verificação da data como string para o filtro global

    dataDaRow = formatarData( dat1, 2, 'diaMesAno' );

    dataDaRow = dataDaRow.replace(/-/g, '/');
    dat2 = dat2.toString();

    let c = dataDaRow.indexOf(dat2);

    if( c > -1 ){
        return dataDaRow;
    }

}

export const generateDateFilterCustom = ( colunasParaFormatar, coluna ) => {

    let pos = coluna['field'];

    let FilterCustomColumn = '';

    let colunasFinal = { title: pos, tipo: coluna['type']};

    colunasParaFormatar.push( colunasFinal );

    if( coluna['type'] == 'date' ){

        FilterCustomColumn = {customFilterAndSearch: (term, rowData) => compareDate(rowData[pos], term)};

    }else if( coluna['type'] == 'datetime' ){

        FilterCustomColumn = {customFilterAndSearch: (term, rowData) => compareDateTime(rowData[pos], term)};

    }

    Object.assign( coluna, FilterCustomColumn );

}

