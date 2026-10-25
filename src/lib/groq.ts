export async function generateStory(topic: string, apiKey: string){
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{role:'user', content: `Write viral story on: ${topic}`}],
      max_tokens: 500
    })
  })
  if(!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.choices[0].message.content
}
