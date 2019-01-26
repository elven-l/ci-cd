
import * as React from 'react';
import {Drawer,Form, Input, Button, Select} from 'antd';


const Option = Select.Option;
const { TextArea } = Input;

interface IProps {
    visible:boolean,
    data: any,
    colse:()=>void,
    handleEdit: (data:any) => void
}
interface IState {
    formType:string[],
    data : any
}



class EditFormItem extends React.Component<IProps,IState> {
    
    constructor(props:IProps) {
        super(props);
        this.state ={
            formType: ['dropdown', 'text', 'radio', 'picture', 'signature', 'label'],
            data : {
                id   : this.props.data.id,
                type   : this.props.data.type,
                label  : this.props.data.label,
                values : this.replaceCommaToBr(this.props.data.values),
                require:this.props.data.require,
                status : this.props.data.status
            }
        }
        
        this.handleLabel = this.handleLabel.bind(this);
        this.selectType = this.selectType.bind(this);
        this.handleRequired = this.handleRequired.bind(this);
        this.handleValues = this.handleValues.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.replaceBrToComma = this.replaceBrToComma.bind(this);
        this.replaceCommaToBr = this.replaceCommaToBr.bind(this);

    }
    

   public handleSubmit()
   {
       let data = this.state.data;
           data = Object.assign(data, {values: this.replaceBrToComma(data.values)});
       this.props.handleEdit(data);
   }
   public selectType(value:string)
   {
    this.setState({
        data : Object.assign(this.state.data, {type: value})
      })
   }
   public handleLabel(event:any)
   {
        this.setState({
            data : Object.assign(this.state.data, {label: event.target.value})   
        })
   }
   public handleValues(event:any)
   {
        this.setState({
            data : Object.assign(this.state.data, {values: event.target.value})   
        })
   }

   public handleRequired(value:string)
   {
    this.setState({
        data : Object.assign(this.state.data, {require: value})
      })
   }
   public render() {
      
      return (
        <div>
             <Drawer
                title='编辑'
                width={720}
                placement="right"
                closable={true}
                onClose={this.props.colse}
                visible={this.props.visible}
             >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                Type:  <Select defaultValue={this.state.data.type} value={this.state.data.type} 
                                        onChange={this.selectType} >
                                    {
                                        this.state.formType.map(type => {
                                        return   <Option value={type} key={type}>{type}</Option>
                                        })
                                    }
                                </Select>
                               
                            </Form.Item>
                            <Form.Item>
                                Label: <Input  type="text"   onChange={this.handleLabel} value={this.state.data.label}/> 
          
                            </Form.Item>
                            <Form.Item>
                            Values:   <TextArea 
                                        autosize={{ minRows: 2, maxRows: 6 }} 
                                        value={this.state.data.values} 
                                        onChange={this.handleValues} 
                                        />
 
                            </Form.Item>
                            <Form.Item>
                                Required: 
                                          <Select 
                                                defaultValue={this.state.data.require} 
                                                value={this.state.data.require}  
                                                onChange={this.handleRequired} >
                                                    <Option value="ture">Yes</Option>
                                                    <Option value="false">No</Option>
                                            </Select>
                               
                            </Form.Item>
                               
                            <Form.Item>
                            
                           
                             <Button type="primary" htmlType="button" onClick={this.handleSubmit} className="login-form-button">
                                Save
                             </Button>
                            
                            </Form.Item>
                   </Form>
            </Drawer>
        </div>
      );
    }
    private replaceBrToComma(str:string)
    {
      return str.split('\n');
    }
    private replaceCommaToBr(str:string[])
    {
         return str.join('\n');
    }
  }
  

export default EditFormItem;
