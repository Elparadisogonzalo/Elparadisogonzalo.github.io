"""A shim to Python 3 unittest.mock."""

import sys
import unittest.mock

sys.modules['mock'] = unittest.mock
