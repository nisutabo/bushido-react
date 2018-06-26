const URL = 'http://localhost:9000/api/v1'


export function signUp(name, username, password, history){
  return function(dispatch){
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({name, username, password, history})
    })
    .then(res => res.json())
    .then(response => {
      localStorage.setItem("token", response.jwt)
      dispatch({
        type: "GET_USER_DATA",
        payload: response
      })
    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function logIn(username, password, history){
  return function(dispatch){
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    .then(res=> res.json())
    .then(response => {
      if (response.error){
        alert(response.error)
      } else {
        localStorage.setItem("token", response.jwt)
        dispatch({
          type: "GET_USER_DATA",
          payload: response
        })
      }

    })
    .then(()=> {
      history.push('/')
    })
  }
}

export function getUser(jwt, history){
  return function(dispatch){
    fetch(`${URL}/get_user`, {
      headers: {
        "Authorization": jwt
      }
    })
    .then(res => res.json())
    .then(response => {

      dispatch({
        type: "GET_USER_DATA",
        payload: response
      })
    })
  }
}


export const fetchEntries = (id) => {
    return (dispatch) => {
      return fetch(`${URL}/users/${id}/entries`)
      .then(resp => resp.json())
      .then(result => {
        dispatch({
          type: 'LOAD_ENTRIES',
          payload: result
        })
      })
    }
  }

export const addAction = (entry) => {
  return (dispatch) => {
    return fetch(`${URL}/entries`, {
      method: 'POST',
      headers: {Accept: 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        user_id: entry.newActionUserID,
        start_date: entry.newActionStart,
        end_date: entry.newActionEnd,
        title: entry.newActionTitle,
        entry: entry.newActionDesc,
        meditation: entry.newActionMeditation,
        important: entry.newActionImportant
      })
    })
    .then(resp => resp.json())
    .then(result => {
      dispatch({
        type: 'ADD_ACTION',
        payload: result
      })
    })
  }
}

export const logOut = (history) => {
  return (dispatch) => {
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export const addMeditation = (entry) => {
  return (dispatch) => {
    return fetch(`${URL}/entries`, {
      method: 'POST',
      headers: {Accept: 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        user_id: entry.newMeditationUserID,
        start_date: entry.newMeditationStart,
        end_date: entry.newMeditationEnd,
        title: entry.newMeditationTitle,
        entry: entry.newMeditationDesc,
        meditation: entry.newMeditation,
        important: entry.newMeditationImportant
      })
    })
    .then(resp => resp.json())
    .then(result => {
      dispatch({
        type: 'ADD_MEDITATION',
        payload: result
      })
    })
  }
}

export const editAction = (id, title, desc) => {
  return (dispatch) => {
    return fetch(`${URL}/entries/${id}`, {
      method: 'PATCH',
      headers: {Accept: 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        title: title,
        entry: desc
      })
    })
    .then(resp => resp.json())
    .then(result => {
      dispatch({
        type: 'PATCH_ENTRY',
        payload: result
      })
    })
  }
}
