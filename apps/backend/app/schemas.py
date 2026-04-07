"""Pydantic schemas for API request/response payloads."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PredictionItem(BaseModel):
    """A single prediction entry with confidence score."""

    species: str
    probability: float


class PredictResponse(BaseModel):
    """Response payload for /predict."""

    top_5: list[PredictionItem]
    top_species: str
    probability: float
    is_uncertain: bool
    filepath: str


class SightingResponse(BaseModel):
    """Response payload for persisted sightings."""

    id: int
    filepath: str
    top_species: str
    probability: float
    timestamp: datetime
    is_uncertain: bool

    model_config = ConfigDict(from_attributes=True)
