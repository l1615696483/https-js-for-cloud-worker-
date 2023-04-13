addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  const resuestbody =  await  request.json();
  const headers = request.headers;
  const method = request.method;
  const contentType = headers.get("Content-Type");
  const authorization = headers.get("Authorization");
  // 定义API请求的URL和参数
  const url = 'https://api.openai.com/v1/chat/completions'
  const params = {
    headers: {
      'Content-Type': contentType,
      'Authorization': authorization,
    },
    body:JSON.stringify(resuestbody)
,
    method: method
  }


  // 发送API请求并获取响应
  const response = await fetch(url, params)
  const data = await response.json()

  // 返回响应内容
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json'
    }
  })  
}
