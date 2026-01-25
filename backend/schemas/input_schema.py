from pydantic import BaseModel
from typing import List

class LoanInput(BaseModel):
    features: List[float]
