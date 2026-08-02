---
title: "Connect 4"
description: "A Python and pygame implementation of Connect 4 with five selectable AI bots (random, one-step look-ahead, Minimax, Expectimax, and Monte Carlo Tree Search) that can play a human or each other, plus a win-ratio evaluation across the agents."
tech: ["Python", "pygame", "Minimax", "Expectimax", "MCTS"]
links:
  github: "https://github.com/mukeshmk/connect-4"
featured: false
order: 4
year: "2020"
draft: false
---

## Overview

Connect 4 built in Python with pygame, turned into a testbed for classic
game-playing AI. It's a two-player game on a 6x7 board where players drop discs
to claim the lowest free slot in a column; the agents treat winning as a search
problem over a zero-sum, accessible, deterministic, static, and discrete
environment.

## How it's built

The code is split into clear modules:

- A **board** module holds the game logic, with a separate pygame graphics layer, so the rules are decoupled from rendering.
- A **bots** module implements each agent in its own file behind a common interface, and they share a single board-evaluation heuristic so the algorithms are compared on equal footing.

## The agents

Five bots ship with the game:

- **Random**: picks a legal column at random, as a baseline.
- **One-step look-ahead**: plays the move that scores best on the evaluation heuristic right now.
- **Minimax**: depth-limited adversarial search with alpha-beta pruning.
- **Expectimax**: swaps the adversarial min nodes for expectation nodes to model a non-optimal opponent.
- **Monte Carlo Tree Search**: UCT-guided rollouts that balance exploration and exploitation.

## Play modes and CLI

The game runs player vs player, player vs bot, or bot vs bot, with CLI flags to
choose each side's bot and to hide the UI for fast headless runs. For example:

```bash
python game.py --p1 minimax --p2 montecarlo --ui false
```

## Evaluation

Because the bots share an interface, they can be played off against each other
in bulk to measure win ratios between the algorithms, which are captured in the
project's evaluation results and used to compare how the strategies stack up.

## Context

Built as a group project for Trinity College Dublin's CS7IS2 Artificial
Intelligence module, backed by a written report, a presentation, and a set of
reference papers behind the design. Base game code adapted from KeithGalli's
Connect4-Python.
