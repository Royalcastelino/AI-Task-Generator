# AI Notes

## Tools Used
- **Antigravity (Google DeepMind)**: Assisted in implementation of specific complex logic, such as the drag-and-drop integration.
- **OpenAI GPT-4o**: Chosen as the primary LLM for the application logic due to its superior performance in maintaining JSON structure and high-quality technical output.

## Manual Verification
- **Drag & Drop**: Verified using `@dnd-kit` to ensure items are reorderable within their categories.
- **Exporting**: Verified the Markdown and TXT export logic creates clean, readable files.
- **Responsive Design**: Manually checked layouts for desktop and mobile viewports.
- **Status Checks**: Verified that the `/api/status` endpoint correctly reports the state of MongoDB and the OpenAI connection.

## Why GPT-4o?
GPT-4o was chosen for this project because:
1. **JSON Mode**: It supports native JSON response formatting, which prevents the common "AI chatter" outside of the payload.
2. **Technical Depth**: It provides more specific engineering tasks (e.g. database indexing, CORS setup) compared to other models.
3. **Speed**: Low latency ensures a smooth user experience during the "generation" phase.