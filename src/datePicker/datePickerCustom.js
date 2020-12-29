import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import ptLocale from "date-fns/locale/pt-BR";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import FormControl from "@material-ui/core/FormControl";

class InlineDatePickerDemo extends Component{

  constructor( props ){
        
    super( props );

    this.state = {
      selectedDate: this.props.value,
    }
    this.datePickerRef = React.createRef();

  }

  handleDateChange = async ( data ) => {
  
    await this.setState({
      selectedDate: data
    })
    await this.props.onChange( data );

  }

  componentDidUpdate( prevProps, prevState,){

    if( prevProps.value == null && prevState.selectedDate == null && this.props.value == null){
      return;
    }else if( this.props.value == null ){

      this.datePickerRef.current.handleClear()

    }

  }

  render(){

    return (
      <MuiPickersUtilsProvider
       utils={DateFnsUtils} 
       locale={ptLocale} 
       style={{cursor: 'pointer'}}
       
       >

<FormControl>
      <div htmlFor="select-multiple-checkbox">{this.props.sortingLabel}</div>
      <DatePicker
            ref={this.datePickerRef}
            value={this.state.selectedDate} 
            onChange={(e) => this.handleDateChange(e)} 
            format={"dd/MM/yyyy"}
            clearable
            clearLabel="limpar filtro"
            cancelLabel="cancelar"
          />
</FormControl>

      </MuiPickersUtilsProvider>
    );
    
  }

}

export default InlineDatePickerDemo;
export {InlineDatePickerDemo};