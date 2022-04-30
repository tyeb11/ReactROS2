import React,{Component} from "react";
import { Alert } from "react-bootstrap";
import config from "../scripts/config";


class Connection extends Component{
    state={connected:false,ros:null}
    constructor(){
        super();
        this.init_connection()
    }
    init_connection(){
        this.state.ros=new window.ROSLIB.Ros();

        this.state.ros.on('connection',()=>{
            this.setState({connected:true})
        })
        this.state.ros.on('close',()=>{
            this.setState({connected:false})
        })
        setInterval(()=>{

            try{
    
                this.state.ros.connect('ws://'+config.ROSLIB_BRIDGE_SERVER_IP+':'+config.ROSLIB_BRIDGE_SERVER_PORT)
            }catch(e){
                console.log(e)
            }
        },config.ROSLIB_CONNECTION_TIMEOUT)

    }
    render(){
        return(
            <>
                <div>
                    <Alert variant={this.state.connected?'success':'danger'} className="text-center m-3">{this.state.connected?'CONNECTED':'DISCONNECTED'}</Alert>
                </div>
            </>
        )
    }
}

export default Connection