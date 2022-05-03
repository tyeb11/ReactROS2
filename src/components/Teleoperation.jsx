import React,{Component} from "react";
import { Joystick, JoystickShape } from "react-joystick-component";
import config from "../scripts/config";

class Teleoperation extends Component{

    state={ros:null};
    constructor(){
        super();
        this.init_connection()
        this.handleMove=this.handleMove.bind(this);
        this.handleStop=this.handleStop.bind(this);
    }
        init_connection(){
        this.state.ros=new window.ROSLIB.Ros();
            console.log('Joystick :' +this.state.ros)
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
        },config.ROSLIB_CONNECTION_TIMEOUT)}

    handleMove(event){
        var cmd_val=new window.ROSLIB.Topic({
            ros:this.state.ros,
            name:config.CMD_VEL_TOPIC,
            messageType:'geometry_msgs/Twist',
        })
        var twist=new window.ROSLIB.Message({
            linear:{
                x:event.y/100,
                y:0,
                z:0
            },
            angular:{
                x:0,
                y:0,
                z:-event.x/100
            }
        })
        cmd_val.publish(twist)
    }
    handleStop(){
                var cmd_val=new window.ROSLIB.Topic({
            ros:this.state.ros,
            name:config.CMD_VEL_TOPIC,
            messageType:'geometry_msgs/Twist',
        })
        var twist=new window.ROSLIB.Message({
            linear:{
                x:0,
                y:0,
                z:0
            },
            angular:{
                x:0,
                y:0,
                z:0
            }
        })
        cmd_val.publish(twist)

    }
    render(){
        return(
            <>
            <h1>Controller</h1>
            <div style={{paddingTop:'100px'}}>

            <Joystick 
            size={200} 
            sticky={false} 
            baseColor="grey" 
            stickColor="#BBBBBB" 
            move={this.handleMove} 
            stop={this.handleStop}
            baseShape={ JoystickShape.Square}
            throttle={100}
            ></Joystick>
            </div>
            </>
        )
    }
}

export default Teleoperation