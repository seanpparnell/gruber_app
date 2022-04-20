import { AuthConsumer } from "../../providers/AuthProvider";
import { Link } from 'react-router-dom';
import StepByStep from "./StepByStep";
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import { NavCon } from "../styles/Styles";


const MainNavbar = ({user, handleLogout }) => {
  
  const rightNavItem = () => {
    // links to show up when logged in
    if (user) {
      return (
        <>
        <NavCon>
          <Nav.Link>
            <Link to='/profile'>
              Profile
              {/* <img src={user.image} /> */}
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to='/services'>
              Service
              {/* <img src={user.image} /> */}
            </Link>
          </Nav.Link>
          
          <Nav.Link onClick={() => handleLogout()}>
            Logout
          </Nav.Link>
          </NavCon>
        </>
      )
    } else {
      // links to show up when Not logged in
      return (
        <>
          
          <Nav.Link>

            <Link to='/StepByStep'>
              <li>
                Sign Up
              </li>
            </Link>
            <Link to='/login'>
              {/* <li>
                Login
              </li> */}
              <Button>Login</Button>

            </Link>
          </Nav.Link>
          <Nav.Link>
            
          </Nav.Link>
        </>
      )
    }
  }

  
  // links that show up regardless of login or out
  return (
    <>
    <NavCon>
     <Navbar collapseOnSelect expand="lg">
        
          <Nav className="justify-content-left">
            <Nav.Item>
              <Nav.Link eventKey="link-1">Menu One</Nav.Link>
            </Nav.Item>
             <Nav.Item>
              <Nav.Link eventKey="link-2">Menu Two</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Menu Three</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="justify-content-center">
            <Link to='/'>
              <Navbar.Brand>Gruber</Navbar.Brand>
            </Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {/* Links that show up regardless of login or not */}
              { rightNavItem() }
            </Nav>
          </Navbar.Collapse>
        
      </Navbar>
    </NavCon>
    </>
  )
}


const ConnectedMainNavbar = (props) => (
  <AuthConsumer> 
    { value => <MainNavbar { ...props } { ...value } /> }
  </AuthConsumer>
)
 
export default ConnectedMainNavbar;