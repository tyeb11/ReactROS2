import React,{Component} from "react";
import { Col, Container, Row } from "react-bootstrap";
import Connection from './Connection'
import Teleoperation from "./Teleoperation";

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
                    </Col>
                </Row>
                </main>

                </Container>
            </>
        )
    }
}

export default Home