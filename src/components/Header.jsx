import React,{Component} from "react";
import {Nav,Form,FormControl,Button,Navbar,Container} from 'react-bootstrap'

class Header extends Component{
    render(){
        return(
            <>
                <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">Intelexa</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
            </>
        )
    }
}


export default Header