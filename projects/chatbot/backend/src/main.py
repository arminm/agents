from agents.chat_agent import ChatAgent
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
chat_agent = ChatAgent()

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response(), 200
    elif request.method == "POST":
        if request.is_json and request.json:
            # user_input = getattr(request.json, "message", None)
            user_input = request.json.get("message")
            response = chat_agent.get_response(user_input)
            return _corsify_actual_response(jsonify({"response": response}))
        else:
            return _corsify_actual_response(jsonify({"error": "Invalid content type"}), 415)
    return _corsify_actual_response(jsonify({"error": "Method not allowed"}), 405)

def _build_cors_preflight_response():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

def _corsify_actual_response(response, status=200):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, status

if __name__ == "__main__":
    app.run(debug=True)
