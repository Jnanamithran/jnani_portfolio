# EKIP: Building a Local-First Enterprise Knowledge Intelligence Platform

*November 19, 2026 · 8 min read*

---

## The Problem

Organizations accumulate useful knowledge across PDFs, Word documents,
spreadsheets, and scanned files. Finding the right answer often means knowing
where a document lives, searching through it manually, and checking whether
the person asking is allowed to see it.

EKIP (Enterprise Knowledge Intelligence Platform) explores a more direct
workflow: let people ask questions in natural language and receive
context-aware answers grounded in documents they are authorized to access.

## The Approach

EKIP brings document management and AI-powered retrieval together in a
local-first workspace. It ingests PDF, DOCX, XLSX, and TXT files, indexes their
content, and uses semantic and hybrid retrieval to find relevant information.
An LLM then generates an answer with citations to the source documents.

The platform is designed to handle both text-based and scanned material. A
separate, optional visual AI service can process scanned pages, while PDF page
previews help users inspect the original source behind an answer.

## Architecture

```text
Browser
  └── React + Vite
        └── Express + Prisma API
              ├── PostgreSQL — users, workspaces, and document metadata
              └── FastAPI text AI service
                    ├── Qdrant — vector search
                    └── Ollama — local language-model runtime

Optional visual AI service — scanned-page indexing and visual Q&A
```

The main stack separates the user-facing application, organization and
document APIs, and AI retrieval services. This keeps document workflows and
access checks in the backend while allowing the AI components to run locally.

## Grounded Answers and Access Control

An answer is only useful when it can be checked. EKIP returns document
citations alongside generated responses so users can trace information back
to its source.

Access is also part of retrieval, not just the interface. EKIP supports
organization-wide and department-scoped roles, and the backend and document
retrieval services enforce permissions. Department access is limited to the
user's workspace, and document roles must match the target department.

## Document Workflows

The platform supports more than asking questions:

- Create an organization, workspace, default department, and initial Owner
  account during signup.
- Manage users and custom roles at organization or department scope.
- Ingest PDF, DOCX, XLSX, and TXT files for indexing and search.
- Import supported files from Google Drive when OAuth is configured.
- Optionally process scanned pages with the visual AI service.

Google Drive imports use EKIP permissions; existing Google Drive sharing
permissions are not preserved. That boundary matters when planning what data
to import.

## Local-First Development

The text AI stack uses Ollama for local model inference and Qdrant for vector
search. Docker Compose can run the frontend, backend, database, and AI
services together for local development. The optional visual service has
additional GPU and model requirements.

This architecture is intended to make experimentation and local deployment
possible, but local execution by itself does not make a system production
ready. Operational security, backups, monitoring, and recovery still need
careful review.

## Current Scope and Limitations

EKIP is a development prototype, not a production-hardened service. It should
not be used with sensitive or business-critical data without first reviewing
its security, operational, and backup requirements.

Scanned-document processing depends on OCR and model support, and the visual
stack has significant storage and hardware requirements. PPTX and CSV uploads
are not supported. PDF previews require the original PDF to remain
available.

## The Goal

EKIP brings document search, grounded answers, citations, and permissions
into one workspace, with a design that can run locally. The central idea is
straightforward: make organizational knowledge easier to find without
separating answers from their sources or from the access rules that protect
them.
