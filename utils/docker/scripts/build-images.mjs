#!/usr/bin/env node
// A robust wrapper around `docker buildx bake` for multi-image builds.
import {execa} from 'execa';
