---
title: "Home Lab Infrastructure"
description: "A Proxmox-based home lab running around two dozen self-hosted services as version-controlled Docker Compose stacks, with a reverse proxy, local DNS, VPN access, automatic updates, and scripted backups."
tech: ["Proxmox", "Docker", "Docker Compose", "Tailscale", "Nginx", "Self-Hosting"]
links:
  github: "https://github.com/mukeshmk/home-lab"
featured: true
order: 2
year: "2024"
draft: false
---

## Overview

A self-hosted home lab that replaces a stack of paid cloud subscriptions with
services I run and control myself. Everything is defined as code: each service
is its own Docker Compose stack, so the whole setup is reproducible, easy to
version, and quick to rebuild or move between machines.

## Platform

The lab runs on Proxmox. A set of helper shell scripts (an `lxc` command with
bash-completion, plus install and uninstall scripts) spins up and manages LXC
containers consistently, while a shared environment file keeps common
configuration in one place. Portainer provides a UI over the running
containers, and Watchtower keeps images up to date automatically.

## Services

Around two dozen services run across the lab, grouped roughly by purpose:

- **Media**: Jellyfin, the *arr media-automation stack, Navidrome for music, and Audiobookshelf for audiobooks and podcasts.
- **Photos & files**: Immich for photo backup, and OpenCloud with Collabora / OnlyOffice for documents.
- **Productivity**: Paperless for document management, Obsidian LiveSync, Vaultwarden for passwords, and code-server for browser-based development.
- **Home & car**: Home Assistant for automation, plus TeslaMate and an A Better Route Planner integration for vehicle logging.
- **Dashboards & gaming**: Homarr as the landing dashboard and RomM for a game-ROM library.

## Networking

Nginx Proxy Manager sits in front as a reverse proxy, Pi-hole provides local DNS
and network-wide ad-blocking, and Tailscale gives secure remote access to
everything without exposing services to the public internet.

## Backups

A set of rsync and rclone jobs back up the important state, including Immich,
OpenCloud, and the Proxmox host. Each job has its own script alongside a
matching dry-run script, so a backup can be rehearsed safely before it actually
runs.
