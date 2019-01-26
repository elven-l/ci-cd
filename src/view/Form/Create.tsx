import * as React from 'react';
import { Table, Button, Input,Row,Col } from 'antd';
import AddComponent from './AddComponent';
import {create} from '../../service/Form/Index';
import {windowSuccess} from '../../components/Message';
import EditFormItem from '../../components/EditFormItem';
import EditFormItemEvent from '../../components/EditFormItemEvent'

import './form.css';

const { Column } = Table;


interface IFormEvent {
    selected : string,
    target_id : number,
    action: string
}


interface IFormItem {
    id: number,
    label :string,
    type : string,
    values : [],
    status : string,
    events :IFormEvent[]
}

interface  IPagination {
    pageSize: number,
    current : number,
    total : number
}


interface IState {
    dataSource: IFormItem[],
    tempalteName: string,
    visibleEditFormItem : boolean,
    visibleEditFormItemEvent: boolean,
    update:object,
    pagination :IPagination,
    currentItem:IFormItem
};

class Create extends React.Component<object, IState> {
  
  constructor(props:object){

      super(props);
     
      this.state = {
          pagination : {
                pageSize: 100,
                current : 1,
                total : 0
           },
          tempalteName:"",
          dataSource :[],
          visibleEditFormItem: false,
          visibleEditFormItemEvent : false,
          update:{
            type   : "dropdown",
            label  : "",
            values : [],
            require:"false",
            status : "show"
          },
          currentItem:{
            id: 0,
            label :'string',
            type : '',
            values : [],
            status : '',
            events :[]
        }
      }
     
      this.addFormElement = this.addFormElement.bind(this);
      this.removeItems = this.removeItems.bind(this);
      this.renderAction = this.renderAction.bind(this);
      this.saveFormTemplate = this.saveFormTemplate.bind(this);
      this.handelTempalteName = this.handelTempalteName.bind(this);
      this.openEditFromItemDrwaer = this.openEditFromItemDrwaer.bind(this);
      this.closeEditFromItemDrwaer = this.closeEditFromItemDrwaer.bind(this);
      this.handleEditResult = this.handleEditResult.bind(this);
      this.closeEditFromItemEventDrwaer = this.closeEditFromItemEventDrwaer.bind(this);
      

  }



  public removeItems(key:number, event:any)
  {
        
         let data:any = [];
         this.state.dataSource.forEach((item:any, index:number) => {
                if(item.id !== key) {
                     data =data.concat(item);
                }
        });
       
        this.setState({
            dataSource: data,
            pagination:Object.assign(this.state.pagination, {
                total : data.lenght
            })
        })
  }

  public handleEditResult(data:any)
  {
    console.log(data)
        let update:any = [];
        this.state.dataSource.forEach((item:any) =>{
              if (item.id === data.id) {
                  
                  update = update.concat(data)
              } else{
                update = update.concat(item);
              }
        });
        this.setState({
            dataSource:update,
            visibleEditFormItem: false
        })

  }

  public editEvents(data:IFormItem, event:any)
  {
        this.setState({
            visibleEditFormItemEvent: true,
            currentItem:data
        });       
  }

 public saveFormTemplate()
 {
      const data = {
         name : this.state.tempalteName,
         data : JSON.stringify(this.state.dataSource)
      }
      
      create(data).then((respone:any) =>{
        windowSuccess('添加成功');
      });

 }



 public handelTempalteName(event:any)
 {
    this.setState({
        tempalteName : event.target.value
    })
 }

  public addFormElement(data:IFormItem)
  {
    Object.assign(data, {id: this.createElementId(),events:[]});
    const state = this.state.dataSource;
    const nState = state.concat(data);
    this.setState({
        dataSource: nState,
        pagination:Object.assign(this.state.pagination, {
            total : this.state.pagination.total ++
        })
    }); 
  }
  public renderAction(text:any)
  {
      
      return (
        <span key={text.id}>
            <Button size="small" onClick={this.editEvents.bind(this, text)}>Event</Button>  {"  "}
            <Button size="small" onClick={this.openEditFromItemDrwaer.bind(this, text)}>Edit</Button>  {"  "}
            <Button size="small" onClick ={this.removeItems.bind(this, text.id)}>Delete</Button>  
       </span>
      )      
       
  }

  public render() {
   
    return (
        <div>
             {
               this.state.visibleEditFormItemEvent 
               ? <EditFormItemEvent 
               visible={this.state.visibleEditFormItemEvent}
               colseEvent ={this.closeEditFromItemEventDrwaer}
               formItems ={this.state.dataSource}
               currentItem ={this.state.currentItem}
                />
                : ''
            }
            {
               this.state.visibleEditFormItem 
               ? <EditFormItem 
               visible={this.state.visibleEditFormItem}
               data ={this.state.update}
               colse ={this.closeEditFromItemDrwaer} 
               handleEdit ={this.handleEditResult}
                />
                : ''
            }
            
            <Row className="row">
                <Col lg={1} xl={1} offset={23}>
                    <Button type="primary" onClick={this.saveFormTemplate}>Save</Button>
                </Col>
                
            </Row>
            <Row className="row">
                <Col  md={6} lg={6} xl={6}>
                <Input  type="text" placeholder="Title" value={this.state.tempalteName} onChange={this.handelTempalteName}/> 
                </Col>
                
            </Row>
            <Row className="row">
                <Col  md={24} lg={24} xl={24}>
                <AddComponent  handleAddFormElement ={this.addFormElement}/>
                </Col>
            </Row>
            
                
            <Table dataSource={this.state.dataSource} pagination={this.state.pagination} >
                   <Column
                        title="Label"
                        dataIndex="label"
                        key="label"
                    />
                    <Column
                        title="Type"
                        dataIndex="type"
                        key="type"
                    />
                    <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    />
                    <Column
                    title="Require"
                    dataIndex="require"
                    key="require"
                    />
                    <Column
                    title="Action"
                    key = "Action"
                    render={this.renderAction}    
                    />
                </Table>
        </div>
        
    );
  }
  private createElementId():number
  {
      return (new Date().getTime());
  }
  private openEditFromItemDrwaer(data:object,event:any)
  {
      
      this.setState({
          visibleEditFormItem: true,
          update: Object.assign(this.state.update, data)
      })
  }
  private closeEditFromItemDrwaer()
  {
      this.setState({
          visibleEditFormItem: false
      })
  }
  private closeEditFromItemEventDrwaer()
  {
    this.setState({
        visibleEditFormItemEvent: false
    })
  }

 
}

export default Create;
