"""Database models for bird sightings."""

from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Sighting(Base):
    """A persisted bird sighting generated from inference."""

    __tablename__ = "sightings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    filepath: Mapped[str] = mapped_column(String, nullable=False)
    top_species: Mapped[str] = mapped_column(String, nullable=False)
    probability: Mapped[float] = mapped_column(Float, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC), nullable=False
    )
    is_uncertain: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
