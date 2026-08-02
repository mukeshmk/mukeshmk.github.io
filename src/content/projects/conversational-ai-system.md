---
title: "Conversational AI System"
description: "A conversational agent that answers natural-language movie questions over the MovieLens dataset, built as a multi-agent LangGraph workflow with SQL tool-calling, an MCP weather server, and a Streamlit chat UI."
tech: ["LangGraph", "LangChain", "FastAPI", "MCP", "SQLite", "Streamlit", "Python"]
links:
  github: "https://github.com/mukeshmk/conversational-ai"
featured: true
order: 1
year: "2025"
draft: false
---

## Overview

ConvAI is a REST API and chat application for a virtual agent that answers
natural-language questions about movies, backed by the MovieLens 100k dataset.
Under the hood it's a service-oriented, multi-agent LangGraph workflow that
routes each query, works out what the user wants, and generates the SQL needed
to answer, with a separate weather capability bolted on through an MCP server.

## The agent graph

Rather than lean on one large prompt, the workload is split across specialised
nodes wired together as a LangGraph state machine:

- **Smart Router**: decides whether a query is about movies, weather, or needs clarification.
- **Intent Extractor**: classifies the intent, such as a recommendation, a specific title, or genre exploration.
- **Entity Extractor**: pulls structured entities like titles, genres, years, ratings, and locations out of the message.
- **Tool-Calling Agent**: generates and executes SQL against the movie database to fetch the answer.
- **Weather Agent**: handles weather queries through the MCP server.
- **Error Handler**: catches failures so the graph degrades gracefully instead of crashing.

## Service layer and memory

A dedicated `ChatService` owns the business logic: creating and tracking
sessions, storing conversation history in SQLite, and coordinating each turn
with the agent graph. Because history is persisted, the agent can answer with
context from earlier in the conversation, and sessions survive restarts.

## MCP weather integration

Weather support lives in a standalone MCP (Model Context Protocol) server that
exposes two tools: forecasts by latitude/longitude and active alerts by US
state, both backed by the National Weather Service API. It speaks HTTP and
stdio transports, which keeps the weather capability decoupled from the core
app and easy to swap out.

## Models and interfaces

Inference is provider-agnostic: it runs against a local Ollama model by default,
with OpenAI and Groq as drop-in alternatives, and the whole graph executes
asynchronously. There are two ways in: a FastAPI REST API (create a session,
post messages, fetch history, plus a health check and Swagger/ReDoc docs) and a
Streamlit chat UI for managing multiple conversations interactively.

## Stack

FastAPI, LangChain with LangGraph, SQLAlchemy over SQLite, Streamlit, MCP, and
Pydantic, running on Python 3.13 with async throughout.
