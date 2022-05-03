import React,{Component} from "react";
import config from "../scripts/config";

class Map extends Component{
    state={ros:null};
    constructor(){
        super();
        this.view_map=this.view_map.bind(this)
    }
    init_connection(){
        this.state.ros=new window.ROSLIB.Ros();
        console.log('Map: '+this.state.ros)
                this.state.ros.on('connection',()=>{
            this.setState({connected:true})
        })
        this.state.ros.on('close',()=>{
            this.setState({connected:false})
        })
            
            try{
                
                this.state.ros.connect("ws://"+config.ROSLIB_BRIDGE_SERVER_IP+":"+config.ROSLIB_BRIDGE_SERVER_PORT)
            }catch(e){
                console.log(e)
            }
    }
    componentDidMount(){
        this.init_connection()
        this.view_map()
    }
    view_map(){
        var viewer=new window.ROS2D.Viewer({
            divID:"nav_div",
            width:300,
            height:300,
        })
        var navClient= new window.NAV2D.OccupancyGridClientNav({
            ros:this.state.ros,
            rootObject:viewer.scene,
            viewer:viewer,
            serverName:"/move_base",
            withOrientation:true
        })
    }
    render(){
        return(
            <div id="nav_div">

            </div>
        )
    }
}


export default Map