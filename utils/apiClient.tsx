import {BACKEND_URL} from '@env'

async function apiClient(path , options){
    console.log(BACKEND_URL)
    const response  = await fetch(`${BACKEND_URL}${path}` , options)
    const data = await response.json()
    console.log(BACKEND_URL)
    if(response.ok){
        console.log(data)
        return data
    }else{
        console.log(response)
        return null
    }
}

export default apiClient