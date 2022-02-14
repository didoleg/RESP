import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {text: '', is_active: 'True', user_create_id: 0}
    }
  
    handleChange(event) 
    {    
        this.setState(
                {
                    [event.target.text]: event.target.value
                }
            );  
    }

    handleSubmit(event) {
      console.log(this.state.text)
      console.log(this.state.is_active)
      console.log(this.state.user_create_id)
      event.preventDefault()
    }
  
    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="login">text</label>
                <input type="text" className="form-control" text="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />        
            </div>
          
        <div className="form-group">
            <label for="text">text</label>
            
            <input type="is_active" className="form-control" name="is_active" value={this.state.is_active} onChange={(event)=>this.handleChange(event)} />  
            <input type="user_create_id" className="form-control" name="user_create_id" value={this.state.user_create_id} onChange={(event)=>this.handleChange(event)} />      

          
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default ToDoForm

