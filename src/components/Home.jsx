import React,{Component} from "react";
import { Col, Container, Row } from "react-bootstrap";
import Connection from './Connection'
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from './Map'

class Home extends Component{
    render(){
        return(
            <>
                <Container>
                <main>
                <h1 className="text-center mt-3">Robot Control Center</h1>
                <Row>
                    <Col>
                        <Connection/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Teleoperation/>
                    </Col>
                    <Col>
                        <h1>Map</h1>
                        <Map/>
                    </Col>
                    <Row>
                        <RobotState/>
                    </Row>
                </Row>
                </main>

                </Container>
            </>
        )
    }
}

export default Home