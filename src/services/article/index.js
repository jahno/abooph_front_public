import {API_ROUTE} from 'api/routes'
import store from 'store'

export function getCategoriesArticles(){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/admin/categoriearticle/all`;
  return (
    fetch(url,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  );
}

export function getDressmakers(){
  const url = `${API_ROUTE}/admin/couturier/all`;
  const token = store.getState().auth.token
  return (
    fetch(url,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  );
}

export function getArticles(){
  const articlesUrl = `${API_ROUTE}/article/all`;
  const categoriesUrl = `${API_ROUTE}/categoriearticle/children`;

  return (
    Promise.all([
      fetch(articlesUrl,{
        method:"GET",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
      }),
      fetch(categoriesUrl,{
        method:"GET",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
      }),
    ]).then(async([res1, res2]) => {
      const a = await res1.json();
      const b = await res2.json();
      return [a, b]
    })
  )

  // Promise.all([
  //   fetch(articlesUrl),
  //   fetch(categoriesUrl)
  // ]).then(async([aa, bb]) => {
  //   const a = await aa.json();
  //   const b = await bb.json();
  //   return [a, b]
  // })
  // .then((responseText) => {
  //   console.log(responseText);

  // }).catch((err) => {
  //   console.log(err);
  // });
}

export function getArticle(id){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/admin/article/${id}`;

  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function addArticle(data){
  const url = `${API_ROUTE}/admin/article`;
  const token = store.getState().auth.token
  
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
  );
}

export function updateArticle({id, data}){
  const url = `${API_ROUTE}/admin/article/${id}`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}

export function deleteArticle(id){
  const url = `${API_ROUTE}/admin/article/${id}`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"DELETE",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  );
}

export function changeState({id, state}){
  const url = `${API_ROUTE}/admin/article/${id}/publish`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({state})
    })
  );
}
