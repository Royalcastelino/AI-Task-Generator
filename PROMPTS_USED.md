# Prompts Used

## Application Logic: OpenAI Integration
The following prompts are hardcoded into the backend service to structure the AI's output for the end-user.

### System Prompt
> You are a senior product manager and senior software engineer. Always return strict JSON. Do not include explanations outside JSON.

### Generation Prompt Template
> Generate a technical specification for: Goal: {goal}, Target Users: {targetUsers}... Please provide 5-8 user stories, and 10-20 engineering tasks across frontend, backend, and devops categories.

### Response Format (JSON Mode)
```json
{
  "user_stories": [],
  "engineering_tasks": {
    "frontend": [],
    "backend": [],
    "devops": []
  },
  "risks": []
}
```

## Developer Assistance: Minor Snippets
Minimal snippets requested during the development process to assist with specific technical implementation details.

### Snippet 1: CSS Glassmorphism
> How can I create a semi-transparent glass effect with a subtle border and backdrop blur for a dark mode UI?

### Snippet 2: dnd-kit Reordering
> Give me a helper function using `arrayMove` to handle vertical reordering for a list of strings in a React component using `@dnd-kit/sortable`.

### Snippet 3: File Download Logic
> What is the standard way to trigger a browser download for a raw string as a `.md` or `.txt` file using a Blob in a React hook?


