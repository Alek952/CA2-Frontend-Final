import { useEffect, useState } from "react"

export default function LoggedIn({facade}) {
    const [dataFromServer, setDataFromServer] = useState("Loading...")
    const [errorMsg, setErrorMsg] = useState('')
    
    useEffect(() => {
        facade.fetchData()
        .then(data=> setDataFromServer(data.msg))
        .catch(err => {
            if(err.status){
              err.fullError.then(e=> setErrorMsg(e.code + ':' + e.message))
            }
            else{console.log("Network error"); }
          });
    }, [facade])
   
    return (
      <div>
        <p>
            {errorMsg}
        </p>
      </div>
    )
   
  }