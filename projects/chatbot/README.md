# README.md for the Chatbot Project

# Chatbot Project

This project is a chatbot website developed using Next.js for the frontend and Python with the CrewAI framework for the backend. The application aims to provide an interactive chat experience for users.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

### Frontend

The frontend is built with Next.js and contains the following key components:

- **src/app/layout.tsx**: Defines the layout component for the Next.js application.
- **src/app/page.tsx**: Serves as the main entry point for the application.
- **src/components/chat**: Contains components related to the chat functionality.
- **src/styles**: Contains stylesheets for the frontend application.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **next.config.js**: Configuration settings specific to the Next.js application.

### Backend

The backend is developed in Python and utilizes the CrewAI framework. It includes:

- **src/agents**: Contains the chat agent implementation.
- **src/tasks**: Defines task-related functionalities for the chatbot.
- **src/utils**: Utility functions for the backend.
- **src/main.py**: Entry point for the Python backend application.
- **tests**: Contains test cases for the backend functionalities.
- **requirements.txt**: Lists the Python dependencies required for the backend.

## Getting Started

To get started with the project, follow the instructions below:

### Frontend

1. Navigate to the `frontend` directory.
2. Install the dependencies using npm:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory.
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```
   python src/main.py
   ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.