import * as React from 'react';
import {Button, Select, Row, Col} from 'antd';
const Option = Select.Option;

interface IPropsFormEvent {
    selected : string,
    target_id :number,
    action: string
}


interface IFormItem {
    id: number,
    label :string,
    type : string,
    status : string,
    values : string[],
    events :IPropsFormEvent[]
}

interface IState {
    selected:string,
    target:string,
    action : string

}

interface IAddEvent {
    selected : string,
    target_id :number,
    target_name : string,
    action: string
}

interface IProps {
    addEvent : (data:IAddEvent) => void,
    formItems: IFormItem[],
    currentItem:IFormItem
}

class AddFormItemEvent extends React.Component<IProps,IState> {
    
    constructor(props:IProps) {
        super(props);
        this.state = {
             selected:'',
             target:'',
             action:'show'
        }
        
        this.addHandle = this.addHandle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTarget = this.handleTarget.bind(this);
        this.handleAction = this.handleAction.bind(this);
        

    }
    
   public addHandle()
   {
       const target  = this.state.target.split('_');
       const data = {
            selected : this.state.selected,
            target_id :Number(target[0]),
            target_name : target[1],
            action: this.state.action
       };

       this.props.addEvent(data);
    
       

   }

   public handleSelect(value:string)
   {
       this.setState({
           selected : value
       })
   }

   public handleTarget(value:string)
   {
        this.setState({
            target : value
        })
   }

   public handleAction(value:string)
   {
        this.setState({
            action : value
        })
   }


   public render() {
    
      return (
          
        <Row type="flex" align='middle' justify='center'>
            <Col lg={2} xl={2}>
                    When
            </Col>
            <Col lg={5} xl={5}>
                <Select defaultValue={this.props.currentItem.values[0]} onChange={this.handleSelect} style={{ width: 120 }} >
                    {
                        this.props.currentItem.values.map(value =>{
                        return <Option value={value} key={value}>{value}</Option>
                        })
                    }
                </Select>
            </Col>
            <Col lg={2} xl={2}>
                    Then
            </Col>
            <Col lg={5} xl={5}>
                <Select  defaultValue="" style={{ width: 120 }} onChange={this.handleTarget} >
                    {
                        this.props.formItems.map((item:IFormItem)=>{
                            return <Option value={`${item.id}_${item.label}`} key={item.label}>{item.label}</Option>
                        })
                    }
                    
                </Select>
            </Col>
            <Col lg={2} xl={2}>
                    Do
            </Col>
            <Col lg={5} xl={5}>
                <Select defaultValue="show" style={{ width: 120 }} onChange={this.handleAction} >
                    <Option value="show">show</Option>
                    <Option value="hide">hide</Option>
                    <Option value="dump">dump</Option>
                    <Option value="sign">sign</Option>
                </Select>
            </Col>
            <Col lg={3} xl={3}>
                <Button type="primary" onClick={this.addHandle}>Add</Button>
            </Col>
         </Row>
      );
    }

    
  }
  

export default AddFormItemEvent;
