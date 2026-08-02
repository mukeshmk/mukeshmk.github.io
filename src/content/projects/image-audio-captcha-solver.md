---
title: "Image & Audio Captcha"
description: "A CNN-based captcha breaker that generates image and audio (text-to-speech) captchas, trains a multi-head convolutional neural network on them, and classifies unseen captchas."
tech: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "gTTS"]
links:
  github: "https://github.com/mukeshmk/image-audio-captcha"
featured: true
order: 3
year: "2020"
draft: false
---

## Overview

A CNN-based project that breaks both image and audio captchas. It covers the
full loop: generating a labelled dataset, training a convolutional neural
network on it, and classifying unseen captchas.

## Generating the dataset

A generation script produces captchas from a configurable symbol set and
length, along with their gTTS text-to-speech audio counterparts, writing the
images into a training folder. Labels are encoded in the filenames, so for
training the names are deliberately left unscrambled: every example needs a
ground-truth label, and the training and validation sets are kept fully
separate so no sample appears in both.

## Preprocessing

Image and audio captchas take slightly different paths. Image captchas run
through an OpenCV pipeline (grayscale, adaptive thresholding, then dilation and
erosion to clean up noise) before being converted back to three channels.
Audio captchas, which are rendered as images, are read directly. In both cases
pixel values are scaled to the 0-1 range before training.

## Model

The network is a multi-head CNN. A stack of five convolutional blocks (with 32,
64, 128, 256, and 256 filters) each apply two 3x3 convolutions with batch
normalisation and ReLU, followed by max-pooling. The features are then
flattened and fed into one softmax head per character position, so a single
forward pass predicts every character in the captcha at once. It trains with
categorical cross-entropy and the Adam optimiser (amsgrad), using early stopping
and model checkpointing.

## Classification

The trained model runs over a directory of captchas and writes its predictions
to an output file, loading the saved architecture (JSON) and weights (H5).

## Stack

Python with TensorFlow and Keras for the CNN, OpenCV for image processing, and
python-captcha plus gTTS for generating the image and audio datasets. Base code
adapted from andrewwja's captcha-demo.
