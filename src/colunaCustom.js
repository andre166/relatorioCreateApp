

const arrayColunasConsolidadoCustom = [

    { 
      title: 'Data DE atEndiMento', 
      field: 'data_atendimento', 
      type: 'date', 
      virtualizedWidth: 380,
      renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 90
      },
      headerStyle: {
        width: '100%',
        minWidth: 90
      },
    },
  
    { 
      title: 'data_ultima_mod', 
      field: 'data_ultima_mod', 
      
      virtualizedWidth: 380,
      type: 'date', 
      renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 90
      },
      headerStyle: {
        width: '100%',
        minWidth: 90
      }
    
    },
  
    { 
      title: 'periodo', 
      field: 'periodo', 
      
      virtualizedWidth: 380,
      type: 'string', 
      // lookup: { 
      //   Manhã: 'Manhã', 
      //   Tarde: 'Tarde',
      // },
      renderGraph: true,
      cellStyle: {
        width: '100%',
        maxWidth: 80
      },
      headerStyle: {
        width: '100%',
        maxWidth: 80
      }
    },
  
    { 
      title: 'tipo_atividade', field: 'tipo_atividade', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      lookup: { 
        'Migracao de Tecnologia': 'Migração de Tecnologia', 
        'Reativacao': 'Reativação', 
        'Mudanca de Endereco': 'Mudança de Endereço' , 
        '': 'Indefinido',
        'Nova Ativacao': 'Nova Ativação' 
      } 
    },
  
    { 
      title: 'tecnologia', field: 'tecnologia', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      lookup: {
        UTP: 'UTP', FTTH: 'FTTH', '': 'Indefinido' 
      },
      cellStyle: {
        width: '100%',
        minWidth: 50,
        textAlign: 'center'
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      },
    },
    
    { 
      title: 'plano', field: 'plano', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
  
      cellStyle: {
        width: '100%',
        minWidth: 330
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content',
      },
    
    },
  
    { 
      title: 'cidade', field: 'cidade', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      lookup: { 
        Maricá: 'Maricá', 
        Guapimirim: 'Guapimirim', 
        Tanguá: 'Tanguá', 
        'São Gonçalo': 'São Gonçalo',
        'Rio Bonito': 'Rio Bonito', 
        Niterói: 'Niterói', 
        Itaboraí: 'Itaboraí', 
        Magé: 'Magé', 
        '': 'Indefinido'
      }
    },
  
    { 
      title: 'bairro', field: 'bairro', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
          minWidth: 180
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'referencia', field: 'referencia', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 380
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content',
      }
    },
  
    { 
      title: 'status', field: 'status', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      lookup: { 
        Rejeitada: 'Rejeitada', 
        Retratada: 'Retratada',
        Aprovada: 'Aprovada', 
        'Concluída sem sucesso': 'Concluída sem sucesso',
        'Concluída com sucesso': 'Concluída com sucesso', 
        '': 'Indefinido'
      },
      cellStyle: {
          width: '100%',
          minWidth: 150
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'motivo', field: 'motivo', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 150
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'data_ativacao', field: 'data_ativacao', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: false,
    },
  
    { 
      title: 'provedor', field: 'provedor', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
    },
  
    { 
      title: 'pgtoprorata', field: 'pgtoprorata', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      lookup: { 
        'no ato': 'No Ato', 
        'próxima fatura': 'Próxima Fatura',
        '': 'Indefinido' 
      },
      cellStyle: {
          width: '100%',
          minWidth: 120
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'pgtotxadesao', field: 'pgtotxadesao', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 130,
        
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      
      }
    },
  
    { 
      title: 'txadesao', field: 'txadesao', 
      virtualizedWidth: 380,
      type: 'numeric', renderGraph: true,
      cellStyle: {
        width: '100%',
        maxWidth: 70,
        textAlign: 'center'
       
      },
      headerStyle: {
        width: '100%',
        maxWidth: 70,
      }
    },
  
    { 
      title: 'atendente', field: 'atendente', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 230,
        
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'protocolo', field: 'protocolo', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
    },
  
    { 
      title: 'nome_cli', field: 'nome_cli', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: false,
      cellStyle: {
        width: '100%',
        minWidth: 230
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'conheceu', field: 'conheceu', 
      virtualizedWidth: 380,
      type: 'string', renderGraph: true,
      cellStyle: {
        width: '100%',
        minWidth: 120
      },
      headerStyle: {
        width: '100%',
        minWidth: 'max-content'
      }
    },
  
    { 
      title: 'ticket', field: 'ticket', virtualizedWidth: 380,type: 'string', renderGraph: false,
    },
  
  ]

  export default arrayColunasConsolidadoCustom;
  