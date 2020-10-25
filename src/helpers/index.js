import { toast  } from 'react-toastify';
import store from 'store'

export function onFetch(method, url, data){
  const token = store.getState().auth.token
  return (
    fetch(url,{
      method:method,
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}

export function handleFetch(method, url, successCb, errorCb, data){
    onFetch(method, url, data)
    .then( (response) => {
        if((parseInt(response.status) >= 200) && (parseInt(response.status) < 300)){
            response.json().then(function(response) {
                if(response.msg === 'token inconnu : :('){
                    localStorage.removeItem('state')
                    window.location="/connexion"
                    return;
                }
                successCb(response)
            })
        }else{
            if(errorCb){
                errorCb()
            }
            response.json().then(function(response) {
                let message = "Une erreur s'est produite, veuillez ressayer !";
        
                if(Array.isArray(response)){
                    message = response[0].message;
                }else if(response){
                    message = response.msg || response.message || response.error.message;
                }
                
                toast.error(message, {
                    autoClose: false,
                });
            })
        }
    })
    .catch((error) => {
        console.log("error", error)
        if(errorCb){
            errorCb()
        }

        const message = "Une erreur s'est produite, veuillez ressayer !";
        toast.error(message, toastConfig)
    })
}

const toastConfig = {
    autoClose: false
}
