#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the License for the specific
# language governing permissions and limitations under the License.

"""Client Library for Google Cloud Storage."""

__author__ = 'yey@google.com (Ye Yuan)'

# WARNING: This file is externally viewable by our users.  All comments from
# this file will be stripped.  The docstrings will NOT.  Do not put sensitive
# information in docstrings.  If you must communicate internal information in
# this source file, please place them in comments only.

#
# from .api_utils import RetryParams
# from .api_utils import set_default_retry_params
# from .cloudstorage_api import *
# from .common import CSFileStat
# from .common import GCSFileStat
# from .common import validate_bucket_name
# from .common import validate_bucket_path
# from .common import validate_file_path
# from .errors import *
# from .storage_api import *

#from cloudstorage import *
from cloudstorage.api_utils import RetryParams
from cloudstorage.api_utils import set_default_retry_params
from cloudstorage.cloudstorage_api import copy2
from cloudstorage.cloudstorage_api import delete
from cloudstorage.cloudstorage_api import delete_async
from cloudstorage.cloudstorage_api import listbucket
from cloudstorage.cloudstorage_api import open
from cloudstorage.cloudstorage_api import stat
from cloudstorage.cloudstorage_api import stat_async
from cloudstorage.cloudstorage_api import compose
from cloudstorage.cloudstorage_api import get_location
from cloudstorage.cloudstorage_api import get_location_async
from cloudstorage.cloudstorage_api import get_storage_class
from cloudstorage.cloudstorage_api import get_storage_class_async
from cloudstorage.common import CSFileStat
from cloudstorage.common import GCSFileStat
from cloudstorage.common import validate_bucket_name
from cloudstorage.common import validate_bucket_path
from cloudstorage.common import validate_file_path
from cloudstorage.errors import *
from cloudstorage.storage_api import *
