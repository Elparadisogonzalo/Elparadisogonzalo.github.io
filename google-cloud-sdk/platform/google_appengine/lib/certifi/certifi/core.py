#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""This module returns the installation location of cacert.pem."""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import os
import warnings


class DeprecatedBundleWarning(DeprecationWarning):
  """The weak security bundle is being deprecated.

  Please bother your service provider to get them to stop using cross-signed
  roots.
  """


def where():
  f = os.path.split(__file__)[0]
  return os.path.join(f, "cacert.pem")


def as_str() -> str:
  return "Unimplemented"
  # pem_bytes = resources.GetResource(
  #   'google3/third_party/py/certifi/cacert.pem')
  # return pem_bytes.decode()


def old_where():
  warnings.warn(
      "The weak security bundle is being deprecated.",
      DeprecatedBundleWarning
  )
  f = os.path.split(__file__)[0]
  return os.path.join(f, "cacert.pem")

if __name__ == "__main__":
  print(where())
