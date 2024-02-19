import re

def set_proper_score_format(score: str):
    match = re.search(r'\{[\s\S]*\}', score)
    if match:
        return match.group(0)
    else:
        return score