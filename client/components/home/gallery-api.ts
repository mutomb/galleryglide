const listTopics = async (signal: AbortSignal) => {
    const API_URL = 'https://api.unsplash.com/topics';
    try {
      let response = await fetch(API_URL,{
        method: 'GET',
        signal: signal,
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_API}`,
          'Accept': 'application/json',
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
      return {error: err}
    }
}
const listPhotosByTopic = async (signal: AbortSignal, topic: string) => {
    const API_URL = `https://api.unsplash.com/topics/${topic}/photos`;
    try {
      let response = await fetch(API_URL, 
        {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Client-ID ${process.env.UNSPLASH_API}`,
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
      return {error: err}
    }
}

const searchPhotos = async (signal: AbortSignal, keyword: string, page=1, limit=20) => {
  const API_URL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&page=${page}&per_page=${limit}`;
  try {
    let response = await fetch(API_URL, 
      {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Client-ID ${process.env.UNSPLASH_API}`,
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

export {listTopics, listPhotosByTopic, searchPhotos}