#!/usr/bin/env bash
# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

set -eo pipefail

HERE=$(pwd)

cd ../../packages/reaction-compiler-runtime && yarn --silent link && cd $HERE
cd ../../packages/babel-plugin-reaction-compiler && yarn --silent link && cd $HERE

yarn --silent link babel-plugin-reaction-compiler
yarn --silent link reaction-compiler-runtime
