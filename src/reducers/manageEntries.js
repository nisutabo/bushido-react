export default function manageEntries (
  state = {
    entries: [],
    loggedIn: false,
    currentUser: {},
    token: '',
    errors: []
  },
  action
){
  switch (action.type) {
    case 'LOAD_ENTRIES':
    return {
      entries: action.payload.entries
    }

    case 'GET_USER_DATA':
    return {
      loggedIn: true,
      token: action.payload.jwt,
      currentUser: action.payload.user,
      entries: action.payload.entries

    }

    case 'RESTORE_USER_DATA':
    return {
      ...state,
      loggedIn: true,
      currentUser: action.payload.user,
      entries: action.payload.entries
    }

    case 'LOG_OUT':
    localStorage.removeItem('token')
    return {
      currentUser: {},
      loggedIn: false,
      token: ''
    }

    case 'ADD_ACTION':
    return {

      entries: [...state.entries, action.payload],
      loggedIn: true
    }

    case 'ADD_MEDITATION':
    return {
      entries: [...state.entries, action.payload],
      loggedIn: true
    }

    case 'PATCH_ENTRY':
    let entry_id = action.payload.id;
    let entry = state.entries.find(entry => parseInt(entry.id, 10) === parseInt(entry_id, 10));
    let indexOfEntry = state.entries.indexOf(entry);
    state.entries.splice(indexOfEntry, 1, action.payload);
    return {
      ...state,
      entries: [...state.entries]
    }

    default:
    return state;
  }
}
