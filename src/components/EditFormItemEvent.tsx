import * as React from 'react';
import {Drawer} from 'antd';
import FormItemEventList from './FormItemEventList'
import AddFormItemEvent from './AddFormItemEvent'


interface IPropsFormEvent {
    selected : string,
    target_id : number,
    action: string
}

interface IStateFormEvent {
    selected : string,
    target_id :number,
    target_name : string,
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
    dataSource: IStateFormEvent[],
};

interface IProps {
    visible :boolean,
    colseEvent : () => void,
    formItems: IFormItem[],
    currentItem:IFormItem
}

class EditFormItemEvent extends React.Component<IProps,IState> {
    
    constructor(props:IProps) {
        super(props);
        this.state = {
            dataSource : this.getElementLableName(
                this.props.currentItem,
                this.props.formItems
                ) 
        }
        this.deleteEventFunction = this.deleteEventFunction.bind(this);
        this.addFunction = this.addFunction.bind(this);
       

    }
    
   public addFunction(data:IStateFormEvent)
   {
       this.setState({
           dataSource :[data,...this.state.dataSource]
       });

   }

  

   public deleteEventFunction(index:number)
   {
        console.log(index)
   }
   public render() {
      
      return (
        <div>
             <Drawer
                title='Events'
                width={760}
                placement="right"
                closable={true}
                onClose={this.props.colseEvent}
                visible={this.props.visible}
             >
            
            {/* 添加事件模板 */}
            <AddFormItemEvent 
                addEvent={this.addFunction}
                formItems={this.props.formItems}
                currentItem ={this.props.currentItem}
            />    
                 
            {/*事件列表*/}
            <FormItemEventList
               eventItems={this.state.dataSource}
               deleteEvent ={this.deleteEventFunction}
                />
                
            </Drawer>
        </div>
      );
    }

    /**
     * 获取事件的label名字
     * @param events 
     * @param elements 
     */
    private getElementLableName(formItems:IFormItem, elements:IFormItem[])
    {
        let data:IStateFormEvent[] =[];
        const events = formItems.events;
         events.map((event) => {
             elements.map((element)=>{
                  if (event.target_id === element.id) {
                      data = [...data,{
                        selected : event.selected,
                        target_id : element.id,
                        target_name : element.label,
                        action: event.action
                      }];
                  }
             })
        })
        return data;
    }
  }
  

export default EditFormItemEvent;
