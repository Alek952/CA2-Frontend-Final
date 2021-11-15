import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card'

export default function Menu({facade, logout}) {

    const [menuActive, setMenuActive] = useState("");

    const memes = () => {
        facade.fetchMemes()
        .then(data=> setMenuActive(data.data.memes.map(d => {
            return  <Card className="memes" style={{width: d.width + 10}}> 
                        <Card.Body>
                            <Card.Title>{d.name} </Card.Title>
                        </Card.Body>
                        <Card.Img variant="bottom" src={d.url} style={{width: d.width, height: d.height}}/>
                    </Card>;
        })))
        .catch(err => {
            if(err.status){
              err.fullError.then(e=> setMenuActive(e.code + ':' + e.message))
            }
            else{console.log("Network error"); }
          });
    }

    function changeMenu(evt) {
        evt.preventDefault();
        switch(evt.target.getAttribute("value")) {
            case "memes": 
                setMenuActive("Loading...")
                memes()
                break;
            case "home":
                setMenuActive("");
                break;
            default: 
                break;
        }
    }

    return (
        <div>
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link onClick={changeMenu} value='home'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={changeMenu} value='memes'>Memes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="justify-content-center">
                {menuActive}
            </div>
        </div>
    )
}