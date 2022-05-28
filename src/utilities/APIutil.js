export const API = function(){
  const URLS = [];
  for (var i = 1 ; i <= 10 ; i ++) {
    URLS.push(`https://api.hatchways.io/assessment/sentences/${i}`);
  }

  async function get() {
    try {
      return await Promise.all(URLS.map(async url => {
        const RESPONSE =  await fetch(url);
        const RESULT = await RESPONSE.json();
        return RESULT.data.sentence;
      }))
    } catch(e) {
      console.log('error: ', e);
    }


  }
  return{ get: get }
}();
