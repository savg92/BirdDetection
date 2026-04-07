# General Code Style Principles

This document outlines general coding principles that apply across all languages and frameworks used in this project.

## Source of Truth & Conflict Resolution
- Treat this folder as guidance, not a replacement for configured tooling.
- If there is a conflict between these documents and automated tooling (formatter, linter, type checker), tooling wins.
- If there is a conflict between language-specific guides, prefer the guide that matches the file language.
- For framework-driven conventions (e.g., file-based routing, required defaults), follow framework requirements and document the deviation in code review notes.

## Readability
- Code should be easy to read and understand by humans.
- Avoid overly clever or obscure constructs.

## Consistency
- Follow existing patterns in the codebase.
- Maintain consistent formatting, naming, and structure.

## Simplicity
- Prefer simple solutions over complex ones.
- Break down complex problems into smaller, manageable parts.

## Maintainability
- Write code that is easy to modify and extend.
- Minimize dependencies and coupling.

## Documentation
- Document *why* something is done, not just *what*.
- Keep documentation up-to-date with code changes.

## Practical Rule
- Optimize for readability, consistency, and maintainability over strict dogma.
