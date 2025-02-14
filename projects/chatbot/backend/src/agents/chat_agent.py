import os
from crewai import Agent, Crew, Task
from crewai_tools import CSVSearchTool, FileReadTool
from pydantic import SecretStr

from langchain_groq import ChatGroq
from langchain_core.rate_limiters import InMemoryRateLimiter

class ChatAgent:
    def __init__(self):
        # Initialize Groq LLM
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            # model="gemma2-9b-it",
            api_key=SecretStr(os.getenv("GROQ_API_KEY", "")),
            max_retries=2,
            timeout=10,
            max_tokens=8192,
            rate_limiter=InMemoryRateLimiter(requests_per_second=10),
        )
        self.context = [
            {
                "role": "system",
                "content": "You are a helpful AI assistant. Provide clear and concise responses."
            }
        ]


    def add_message(self, message):
        self.context.append(message)

    def get_response(self, user_input):
        self.add_message({
                "role": "user",
                "content": user_input
            })
        # Get response from LLM
        print("context:", self.context)
        response = self.llm.invoke(self.context).content
        print("response:", response)
        return response

    def get_chat_history(self):
        return self.context