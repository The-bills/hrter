import re
import jsonpickle

def set_proper_score_format(score: str):
    match = re.search(r'\{[\s\S]*\}', score)
    if match:
        return jsonpickle.decode(match.group(0))
    else:
        return score
