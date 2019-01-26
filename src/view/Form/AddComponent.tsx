
import * as React from 'react';
import { Button, Select,Input ,Row, Col  } from 'antd';
import {windowError} from '../../components/Message'
import './form.css';

const Option = Select.Option;
const { TextArea } = Input;

interface IProps {
    handleAddFormElement: (data:object)=>void
}

interface IState {
    formVaules:any,
    formType:string[]
}

class AddComponent extends React.Component<IProps, IState> {
  
  constructor(props:IProps){
      super(props);
      this.state = {
          formType: ['dropdown', 'text', 'radio', 'picture', 'signature', 'label'],
          formVaules: {
            type   : "dropdown",
            label  : "",
            values : "",
            require:"false",
            status : "show"
          }
           
      }
      this.selectType = this.selectType.bind(this);
      this.handleLabel = this.handleLabel.bind(this);
      this.handleValues = this.handleValues.bind(this);
      this.handleRequired = this.handleRequired.bind(this);
      this.handleAddFormElementEvent = this.handleAddFormElementEvent.bind(this);
      
     
  }

  
  public selectType(value:string)
  {
      this.setState({
        formVaules : Object.assign(this.state.formVaules, {type: value})
      })
  }

  public handleLabel(event:any)
  {
    this.setState({
        formVaules : Object.assign(this.state.formVaules, {label: event.target.value})   
    })
  }

  public handleValues(event:any)
  {
    this.setState({
        formVaules : Object.assign(this.state.formVaules, {values: event.target.value})  
    })
  }

  public handleRequired(value:string)
  {
    this.setState({
        formVaules : Object.assign(this.state.formVaules, { require: value})  
    })
  }

  /**
   * 组装数据
   * 
   * 如果类型为 input,radio values是必填项
   * 
   */
  public handleAddFormElementEvent()
  {
      

       const data = JSON.parse(JSON.stringify(this.state.formVaules));   
     
       const canNotEmptyValues = ['dropdown', 'radio', 'label'];
       if(data.type==='') {
           windowError('请选择类型');
           return false;
       }
       if (canNotEmptyValues.indexOf(data.type) > -1) {
            if (data.values==='') {
                windowError('Values不能为空');
                return false;
            }
       }
     
       data.values = data.values.split('\n');
       data.id = new Date().getTime();
       this.props.handleAddFormElement(data);
       this.emptyVauleTextArea();
       return true;
  }

  public render() {
   
    return (
        
             <Row type="flex" justify="center" align="top"> 
                <Col span={3}>
                  Type:  <Select defaultValue="dropdown" 
                            value={this.state.formVaules.type} 
                            style={{ width: 120 }} 
                            onChange={this.selectType} >
                                {
                                    this.state.formType.map(type => {
                                       return   <Option value={type} key={type}>{type}</Option>
                                    })
                                }
                            </Select>
                            
                </Col>
             
                <Col span={3}>
                Label: 
                        <Input  type="text" 
                        placeholder="label" 
                        style={{ width: 120 }} 
                        value={this.state.formVaules.label} 
                        onChange={this.handleLabel}/> 
                        
                </Col>
            
                
                <Col span={4} style={{display:"flex",lineHeight:"32px"}}>
                   Values:   <TextArea 
                            placeholder="option1" 
                            autosize={{ minRows: 2, maxRows: 6 }} 
                            style={{ width: 250 }} 
                            value={this.state.formVaules.values} 
                            onChange={this.handleValues} />
 
                </Col>

                <Col span={3}>
                Required: 
                                <Select defaultValue="Yes" 
                                    value={this.state.formVaules.require} 
                                    style={{ width: 120 }} 
                                    onChange={this.handleRequired} >
                                                <Option value="ture">Yes</Option>
                                                <Option value="false">No</Option>
                                        </Select>
                              
                </Col>
                <Col span={3}>
                     <Button type="primary" onClick={this.handleAddFormElementEvent}>Create</Button>
                </Col>
             </Row>
                
    );
  }

  private emptyVauleTextArea()
  {
      this.setState({
        formVaules : Object.assign(this.state.formVaules, {values: '',label:''})  
      });
  }
}

export default AddComponent;
