// api routes
import {API_ROUTE} from '../../api/routes'

export function signIn(data){
  const url = `${API_ROUTE}/auth/login/user`;
  return (
    fetch(url, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body:JSON.stringify(data)
    })
  );
}

export function signUp(data){
  const url = `${API_ROUTE}/user/register`;
  return (
    fetch(url, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body:JSON.stringify(data)
    })
  );
}

export function passwordEmail(data){
  const url = `${API_ROUTE}/auth/reset/user`;
  return (
      fetch(url, {
          method:"POST",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
          },
          body:JSON.stringify(data)
      })
  );
}

export function passwordReset(data){
  const url = `${API_ROUTE}/auth/reset/password/user`;
  return (
      fetch(url, {
          method:"POST",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
          },
          body:JSON.stringify(data)
      })
  );
}
