#!/usr/bin/env python

"""
requests.certs
~~~~~~~~~~~~~~

This module returns the preferred default CA certificate bundle. There is
only one — the one from the certifi package.

If you are packaging Requests, e.g., for a Linux distribution or a managed
environment, you can change the definition of as_str() and where() to return
a separately packaged CA bundle.
"""
from certifi import as_str, where

if __name__ == '__main__':
    print(as_str(), where())
