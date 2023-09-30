import axios from 'axios'

export async function getCat(): Promise<string> {
    const options = {
        headers: {
          'Content-Type': 'application/json'
        }
    }
    
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', options)
      return response.data[0].url
    } catch (error) {
      console.log(error)
      return 'https://cdn2.thecatapi.com/images/dpo.jpg'
    }
}

export async function sendCat(catUrl: string): Promise<string> {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
  
    const body = {
      url: catUrl
    }
  
    await axios.post('https://en1y51jg4hoph.x.pipedream.net', body, { headers })
    return `send ${catUrl} success`
  } catch (error) {
    console.log(error)
    return `send ${catUrl} failed`
  }
}
