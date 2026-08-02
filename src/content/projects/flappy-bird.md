---
title: "Flappy Bird"
description: "A Flappy Bird AI that teaches itself to play using NEAT (NeuroEvolution of Augmenting Topologies), evolving small neural-network controllers over successive generations."
tech: ["Python", "NEAT", "pygame", "Neural Networks", "Genetic Algorithm"]
links:
  github: "https://github.com/mukeshmk/flappy-bird-ai"
featured: false
order: 5
year: "2020"
draft: false
---

## Overview

A Flappy Bird agent that learns to play entirely on its own using NEAT
(NeuroEvolution of Augmenting Topologies). Instead of hand-coding the rules or
hand-tuning a network, a population of small neural networks controls the birds
and evolves over generations, with the fittest survivors improving each round.

## The network

Each bird is driven by a tiny feed-forward network with three inputs (the bird's
vertical position and its distance to the top and bottom of the next pipe gap)
and a single output that decides whether to flap. NEAT starts from fully
connected networks with no hidden nodes and grows both the weights and the
topology over time, using tanh activations.

## How it evolves

Each generation holds a population of 20 birds. A bird's fitness grows the
longer it survives and the more pipes it clears, and NEAT selects for maximum
fitness: the top performers are carried over untouched (elitism), the weakest
fraction is culled, and the rest are bred and mutated, adding or removing nodes
and connections, into the next generation. Speciation protects new structural
innovations long enough to prove themselves, and a stagnation limit retires
species that stop improving. Training stops once a bird reaches the target
fitness.

## Replaying the best bird

The best genome from a run is pickled to disk, so the trained network can be
reloaded later to watch it play indefinitely without retraining from scratch.

## Stack

Python with the neat-python library for the neuroevolution and pygame for the
game itself. Built while following Tech With Tim's NEAT Flappy Bird tutorial.
