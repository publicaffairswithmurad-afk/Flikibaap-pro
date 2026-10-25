export async function generateStory(topic: string, apiKey: string){
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: [{role:'user', content: `Write a viral 30-second story script on: ${topic}. Make it hooky.`}],
      max_tokens: 500,
      temperature: 0.8
    })
  })
  if(!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.choices[0].message.content
}
