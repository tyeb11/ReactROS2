import React,{Component} from "react";
import { Col, Row } from "react-bootstrap";
import config from '../scripts/config'
import * as Three from 'three'

class RobotState extends Component{
    state={
        ros:null,
        x:0,
        y:0,
        z:0,
        orientation:0,
        linear_velocity:0,
        angular_velocity:0
    }
    constructor(){
        super();
        this.init_connection()
    }
    init_connection(){
        this.state.ros=new window.ROSLIB.Ros();
        setInterval(()=>{

            try{
    
                this.state.ros.connect('ws://'+config.ROSLIB_BRIDGE_SERVER_IP+':'+config.ROSLIB_BRIDGE_SERVER_PORT)
            }catch(e){
                console.log(e)
            }
        },config.ROSLIB_CONNECTION_TIMEOUT)
    }
    componentDidMount(){
        this.getRobotState()
    }
    getRobotState(){

     var velocity_subscriber=new window.ROSLIB.Topic({
           ros:this.state.ros,
           name:'/odom',
           messageType:'nav_msgs/msg/Odometry'
       })
       var pose_subscriber=new window.ROSLIB.Topic({
        ros:this.state.ros,
        name:'/amcl_pose',
        messageType:'geometry_msgs/PoseWithCovarianceStamped'
    })
    velocity_subscriber.subscribe((message)=>{
         this.setState({linear_velocity:message.twist.twist.linear.x.toFixed(2)})
         this.setState({angular_velocity:message.twist.twist.angular.z.toFixed(2)})
     })
       
   
       pose_subscriber.subscribe((message)=>{
           this.setState({x:message.pose.pose.position.x.toFixed(2)})
           this.setState({y:message.pose.pose.position.y.toFixed(2)})
           this.setState({orientation:this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2)})
        })
    }
    getOrientationFromQuaternion(ros_orientation){
        var q=new Three.Quaternion(ros_orientation.x,
            ros_orientation.y,ros_orientation.z,ros_orientation.w)
            var RPY=new Three.Euler().setFromQuaternion(q);
            return RPY['_z']*(180/Math.PI);
    }
    render(){
        return(
            <>
            <div>
                <Row>
                    <Col>
                        <h6 className="mt-5">Position</h6>
                        <p className="mt-0">x : {this.state.x}</p>
                        <p className="mt-0">y : {this.state.y}</p>
                        <p className="mt-0">Orientation : {this.state.orientation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 className="mt-3">Velocity</h6>
                        <p className="mt-0">Linear Velocity : {this.state.linear_velocity}</p>
                        <p className="mt-0">Angular Velocity : {this.state.angular_velocity}</p>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}

export default RobotState