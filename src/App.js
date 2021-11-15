import React, { useState   } from "react"
import facade from "./facades/apiFacade";
import LoggedIn from "./functions/LoggedIn";
import LogIn from "./functions/LogIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./functions/menuBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }


  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }

  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <Menu facade={facade} logout={logout} />
          <LoggedIn facade={facade} />
        </div>)}
    </div>
  )

}
export default App;

