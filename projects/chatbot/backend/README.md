# README.md for the Backend

# Chatbot Backend

This is the backend component of the Chatbot project, developed using Python and the CrewAI framework. The backend is responsible for handling the chatbot's logic, processing user inputs, and managing interactions with the frontend.

## Project Structure

- **src/**: Contains the source code for the backend.
  - **agents/**: Contains the chat agent responsible for managing chatbot interactions.
  - **tasks/**: Contains task definitions related to the chatbot's functionality.
  - **utils/**: Contains utility functions and helpers.
  - **main.py**: The entry point for the backend application.

- **tests/**: Contains unit tests for the backend components.

- **pyproject.toml**: Lists the Python dependencies and uv project settings for the backend.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chatbot/backend
   ```

2. **Install dependencies**:
   ```bash
   uv venv
   source .venv/bin/activate
   uv pip install .
   ```

3. **Run the application**:
   ```bash
   uv run -v src/main.py
   ```
