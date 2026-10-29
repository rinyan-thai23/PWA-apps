curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-proj-mockTokenForClientSideTesting1234567890abcdef" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful and concise coding assistant."
      },
      {
        "role": "user",
        "content": "Write a TypeScript function to debounce an API call."
      }
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
