from collections import defaultdict


class MemoryService:

    def __init__(self):
        self.sessions = defaultdict(list)

    def add_message(self, session_id, role, message):

        self.sessions[session_id].append({
            "role": role,
            "message": message
        })

    def get_history(self, session_id):

        return self.sessions.get(session_id, [])

    def clear(self, session_id):

        self.sessions.pop(session_id, None)


memory_service = MemoryService()