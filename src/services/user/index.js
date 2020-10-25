// api routes
import {API_ROUTE} from '../../api/routes'

export function getCities(data){
  const url = `${API_ROUTE}/login`;
  const token = localStorage.getItem("token");
  return (
    fetch(url, {
        method:"GET",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  );
}

export function updateCurrentUserProfile(admin_id, data) {
  const url = `${API_ROUTE}/manager/${admin_id}/update`;
  const token = localStorage.getItem("token");
  return (
    fetch(url, {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
    // .then((response)=> checkAuth(response))
    .then((response) => response.json())
    .catch((error) => console.error(error))
  );
}

export function updateCurrentUserPassword(data, managerId) {
  const url = `${API_ROUTE}/manager/${managerId}/password/update`;
  const token = localStorage.getItem("token");
  return (
    fetch(url, {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
    // .then((response)=> checkAuth(response))
    .then((response) => response.json())
    .catch((error) => console.error(error))
  );
}

export async function getUserProfile() {
  const url = `${API_ROUTE}/profile`;
  const token = await localStorage.getItem("token");
  return (
      fetch(url, {
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          }
      })
      // .then((response)=> checkAuth(response))
      .then((response) => response.json())
      .catch((error) => console.error(error))
  );
}

// nouveaux

export function getManagers(){
    const url = `${API_ROUTE}/managers`;
    const token = localStorage.getItem("token");
    return (
        fetch(url,{
            method:"GET",
            headers:{
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        })
        // .then((response)=> checkAuth(response))
        .then((response) => response.json())
        .catch((error) => console.error(error))
    );
}

export function addAdmin(data){
    const url = `${API_ROUTE}/manager`;
    const token = localStorage.getItem("token");
    return (
        fetch(url,{
            method:"POST",
            headers:{
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        // .then((response)=> checkAuth(response))
        .then((response) => response.json())
        .catch((error) => console.error(error))
    );
}

export function updateManager(data, manager_id){
  const url = `${API_ROUTE}/manager/${manager_id}/update`;
  const token = localStorage.getItem("token");
  return (
    fetch(url,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
    // .then((response)=> checkAuth(response))
    .then((response) => response.json())
    .catch((error) => console.error(error))
  );
}

export function deleteAdmin(manager_id){
  const url = `${API_ROUTE}/manager/${manager_id}/delete`;
  const token = localStorage.getItem("token");
  return (
    fetch(url,{
        method:"DELETE",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    })
    // .then((response)=> checkAuth(response))
    .then((response) => response.json())
    .catch((error) => console.error(error))
  );
}
